import { Server as EngineServer } from 'engine.io';
import { Server, Socket } from 'socket.io';
import { connect } from 'mongoose';
import { useLogMessages, useSleep } from './utils/helpers';
import { ScrapingAccount } from './models/ScrapingAccount.model';
import { ScrapingTask } from './models/ScrapingTask.model';
import { jobstreetFetchPelamar } from './utils/jobstreet/getPelamar';
import { jobstreetUpdatePelamar } from './utils/jobstreet/updatePelamar';
import { useSendMail } from './utils/mailer/sendMail';
import { MailMessages, MailStatus } from './models/MailMessages.model';
import { getResumeList } from './utils/kupu/appliedResumeList';
import { getResumeDetail } from './utils/kupu/resumeDetail';
import { onFetchGlintsAplicant, onUpdateGlintsAplicant } from './utils/glins/index';
import { getSaveRecord } from './utils/kupu/saveRecord';
import { ScrapingPelamarKupu } from './models/ScrapingPelamarKupu.model';
import { indeedFetchPelamar } from './utils/indeed/fetchPelamar';
import { indeedUpdatePelamar } from './utils/indeed/updatePelamar';


const mongoUri = process.env.NUXT_MONGODB_URI;

if (!mongoUri) {
  throw new Error(
    'Missing MongoDB connection string. Set NUXT_MONGODB_URI or MONGODB_URI in your environment.',
  );
}

connect(mongoUri).catch((error) => {
  console.error('MongoDB connection failed:', error);
});

const socketDisabled = Boolean(
  process.env.VERCEL ||
    process.env.VERCEL_ENV ||
    process.env.NUXT_DISABLE_SOCKET === 'true',
);

// Nitro's production HTTP server is created outside of Nuxt's `listen` hook,
// so this can't rely on a host server being handed to us. Instead we bind our
// own engine.io instance and forward requests to it manually from a Nitro
// plugin (server/plugins/socket.ts), using long-polling only since that
// requires no access to the raw HTTP server's `upgrade` event. On Vercel and
// other serverless platforms, this transport cannot stay alive across requests,
// so we disable it there and keep the client in a safe no-op mode.
export const io: any = socketDisabled
  ? {
      emit: () => undefined,
      on: () => undefined,
      engine: {
        handleRequest: () => undefined,
      },
    }
  : new Server();

export const socketServerEnabled = !socketDisabled;

if (!socketDisabled) {
  io.bind(
    new EngineServer({
      transports: ['polling'],
    }),
  );
}

const getActiveAccount = async () => {
  const res = await ScrapingAccount.find({ cookies: { $ne: null } });
  return res;
};

const findTaskByAccount = async (account: String) => {
  const res = await ScrapingTask.find({
    'scraping_account._id': account,
    status: 'open',
  });
  return res;
};

const updatingTaskStatus = async (taskId: String, status: String) => {
  const res = await ScrapingTask.updateOne({ _id: taskId }, { status });
  return res;
};

if (!socketDisabled) {
  io.on('connection', (socket: Socket) => {
    socket.on('start scraping', async () => {
      io.emit('create logs', useLogMessages(': starting...\n'));
      useSleep();
      io.emit('create logs', useLogMessages(': finding active accout\n'));
      const resAccount = await getActiveAccount();

      io.emit(
        'create logs',
        useLogMessages(`: found ${resAccount.length} account\n`),
      );

      // LOOP BY ACTIVE ACCOUT
      resAccount.forEach(async (account: any) => {
        io.emit(
          'create logs',
          useLogMessages(`: finding active task by account ${account.name}\n`),
        );

        io.emit('loading start');
        const resTask = await findTaskByAccount(account._id);
        io.emit('loading end');

        io.emit(
          'create logs',
          useLogMessages(`${account.name}: found ${resTask.length} task\n`),
        );

        // LOOP WHEN FOUND TASK OPEN
        resTask.forEach(async (task: any) => {
          await updatingTaskStatus(task._id, 'in progress');
          io.emit('update antrian');

          io.emit(
            'create logs',
            useLogMessages(`${task.code}: collecting data \n`),
          );

          for (let i = 0; i < task.counter; i++) {
            if (task.scraping_account.type === 'jobstreet') {
              io.emit('loading start');
              const pelamar = await jobstreetFetchPelamar({
                initialId: task.initial_id,
                billerId: task.biller_id,
                cookies: account.cookies,
                taskId: task._id,
                positionId: task.positionId,
              });
              io.emit('loading end');

              io.emit(
                'create logs',
                useLogMessages(
                  `${task.code}: moving to NOT_SUITABLE (${i + 1})`,
                ),
              );

              io.emit('loading start');
              const res = await jobstreetUpdatePelamar({
                prospectData: pelamar?.data,
                positionId: task.positionId,
                cookies: account.cookies,
              });
              io.emit('loading end');
              io.emit('create logs', useLogMessages(`${task.code}: ${res} \n`));
            }

            if (task.scraping_account.type === 'kupu') {
              const kupuList = await getResumeList({
                cookies: account.cookies,
                jobId: task.initial_id,
              });

              io.emit(
                'create logs',
                useLogMessages(
                  `${task.code}: found ${kupuList.length} rows \n`,
                ),
              );

              kupuList.forEach(async (resume: any) => {
                const kupuData = await getResumeDetail({
                  cookies: account.cookies,
                  jobId: task.initial_id,
                  userId: resume.userRoleId,
                });

                if (kupuData) {
                  await ScrapingPelamarKupu.create({
                    ...kupuData,
                    scraping_task: task,
                  });
                }

                io.emit(
                  'create logs',
                  useLogMessages(
                    `${task.code}: saving data ${resume.realName} \n`,
                  ),
                );

                await getSaveRecord({
                  cookies: account.cookies,
                  applyId: resume.applyJobId,
                  jobId: task.initial_id,
                });

                io.emit(
                  'create logs',
                  useLogMessages(
                    `${task.code}: mark as read ${resume.realName} \n`,
                  ),
                );
              });
            }

            if (task.scraping_account.type === 'glints') {
              const glintsData = await onFetchGlintsAplicant({
                cookies: account.cookies,
                jobId: task.initial_id,
                taskId: task._id,
                status: "NEW"
              });

              if(glintsData?.data.length > 0){
                io.emit(
                  'create logs',
                  useLogMessages(
                    `${task.code}: moving to IN_REVIEW (${i + 1})`,
                  ),
                );

               const res =  await onUpdateGlintsAplicant({
                  cookies: account.cookies,
                  jobId: task.initial_id,
                  applicationIds: glintsData?.data,
                  status: "IN_REVIEW"
                });
                io.emit('loading end');
                io.emit('create logs', useLogMessages(`${task.code}: ${JSON.stringify(res)} \n`));
              }

              const glintsDataInReview = await onFetchGlintsAplicant({
                cookies: account.cookies,
                jobId: task.initial_id,
                taskId: task._id,
                status: "IN_REVIEW"
              });

              if(glintsDataInReview?.data.length > 0){
                io.emit(
                  'create logs',
                  useLogMessages(
                    `${task.code}: moving to REJECTED (${i + 1})`,
                  ),
                );

               const resReject =  await onUpdateGlintsAplicant({
                  cookies: account.cookies,
                  jobId: task.initial_id,
                  applicationIds: glintsData?.data,
                  status: "REJECTED"
                });
                io.emit('loading end');
                io.emit('create logs', useLogMessages(`${task.code}: ${JSON.stringify(resReject)} \n`));
              }

            }

            if(task.scraping_account.type ==='indeed'){
             const resIndeed =  await indeedFetchPelamar({
                cookies: account.cookies,
                positionId: task.positionId,
                initial_id: task.initial_id,
                taskId: task._id,
              })

              if(resIndeed.length > 0){
                io.emit(
                  'create logs',
                  useLogMessages(
                    `${task.code}: moving to REJECTED (${i + 1})`,
                  ),
                );
                const resRejectIndeed = await indeedUpdatePelamar({
                  cookies: account.cookies,
                  candidateSubmissionEmployerJobIdPairs: resIndeed
                })

                io.emit('loading end');
                io.emit('create logs', useLogMessages(`${task.code}: ${JSON.stringify(resRejectIndeed)} \n`));
              }
            }
          }
          await updatingTaskStatus(task._id, 'done');
        });
      });

      // io.emit('done scraping');
    });

    socket.on('disconnect', () => {
      io.emit('user disconnected', socket.id);
    });

    socket.on('start sendmail', async () => {
      const mailMessages = await MailMessages.find({ status: MailStatus[0] });

      mailMessages.map(async (item: any) => {
        io.emit(
          'create logs',
          useLogMessages(`${item.task.code}: sending mail to ${item.to} \n`),
        );

        await useSendMail({
          to: item.to,
          subject: item.subject,
          messages: item.message,
        });

        await MailMessages.updateOne(
          { _id: item._id },
          { status: MailStatus[1] },
        );

        useSleep();
      });
    });
  });
}

export default io;
