import { Server, Socket } from 'socket.io';
import { connect } from 'mongoose';
import { useLogMessages, useSleep } from './utils/helpers';
import { ScrapingAccount } from './models/ScrapingAccount.model';
import { ScrapingTask } from './models/ScrapingTask.model';
import { jobstreetFetchPelamar } from './utils/jobstreet/getPelamar';
import { jobstreetUpdatePelamar } from './utils/jobstreet/updatePelamar';

connect(
  'mongodb+srv://satalesmana:SY1COKkW7A98vSzk@cluster0.oe59k.mongodb.net/puppet',
);

export default function (io: Server) {
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
            useLogMessages(`${task.code}: collecting data`),
          );

          for (let i = 0; i < task.counter; i++) {
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
              useLogMessages(`${task.code}: moving to NOT_SUITABLE (${i + 1})`),
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
          await updatingTaskStatus(task._id, 'done');
        });
      });

      // io.emit('done scraping');
    });

    socket.on('disconnect', () => {
      io.emit('user disconnected', socket.id);
    });
  });
}
