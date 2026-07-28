import { useLogMessages, useSleep } from './utils/helpers';
import { ScrapingAccount } from './models/ScrapingAccount.model';
import { ScrapingTask } from './models/ScrapingTask.model';
import { jobstreetFetchPelamar } from './utils/jobstreet/getPelamar';
import { jobstreetUpdatePelamar } from './utils/jobstreet/updatePelamar';
import { getResumeList } from './utils/kupu/appliedResumeList';
import { getResumeDetail } from './utils/kupu/resumeDetail';
import { onFetchGlintsAplicant, onUpdateGlintsAplicant } from './utils/glins/index';
import { getSaveRecord } from './utils/kupu/saveRecord';
import { ScrapingPelamarKupu } from './models/ScrapingPelamarKupu.model';
import { indeedFetchPelamar } from './utils/indeed/fetchPelamar';
import { indeedUpdatePelamar } from './utils/indeed/updatePelamar';

let logs: string[] = [];
let status: string = 'idle';

const pushLog = (message: string) => {
  logs.push(useLogMessages(message));
};

export const getLogs = () => logs.slice();
export const clearLogs = () => {
  logs = [];
  status = 'idle';
};
export const getStatus = () => status;

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

const updatingTaskStatus = async (taskId: String, newStatus: String) => {
  const res = await ScrapingTask.updateOne({ _id: taskId }, { status: newStatus });
  return res;
};

export const runScraping = async () => {
  try {
    status = 'running';
    pushLog(': starting...\n');
    useSleep();
    pushLog(': finding active accout\n');
    const resAccount = await getActiveAccount();

    pushLog(`: found ${resAccount.length} account\n`);

    // LOOP BY ACTIVE ACCOUT
    for (const account of resAccount) {
      pushLog(`: finding active task by account ${account.name}\n`);

      pushLog('loading start');
      const resTask = await findTaskByAccount(account._id);
      pushLog('loading end');

      pushLog(`${account.name}: found ${resTask.length} task\n`);

      // LOOP WHEN FOUND TASK OPEN
      for (const task of resTask) {
        await updatingTaskStatus(task._id, 'in progress');

        pushLog(`${task.code}: collecting data \n`);

        for (let i = 0; i < task.counter; i++) {
          if (task.scraping_account.type === 'jobstreet') {
            pushLog('loading start');
            const pelamar = await jobstreetFetchPelamar({
              initialId: task.initial_id,
              billerId: task.biller_id,
              cookies: account.cookies,
              taskId: task._id,
              positionId: task.positionId,
            });
            pushLog('loading end');

            pushLog(`${task.code}: moving to NOT_SUITABLE (${i + 1})`);

            pushLog('loading start');
            const res = await jobstreetUpdatePelamar({
              prospectData: pelamar?.data,
              positionId: task.positionId,
              cookies: account.cookies,
            });
            pushLog('loading end');
            pushLog(`${task.code}: ${res} \n`);
          }

          if (task.scraping_account.type === 'kupu') {
            const kupuList = await getResumeList({
              cookies: account.cookies,
              jobId: task.initial_id,
            });

            pushLog(`${task.code}: found ${kupuList.length} rows \n`);

            for (const resume of kupuList) {
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

              pushLog(`${task.code}: saving data ${resume.realName} \n`);

              await getSaveRecord({
                cookies: account.cookies,
                applyId: resume.applyJobId,
                jobId: task.initial_id,
              });

              pushLog(`${task.code}: mark as read ${resume.realName} \n`);
            }
          }

          if (task.scraping_account.type === 'glints') {
            const glintsData = await onFetchGlintsAplicant({
              cookies: account.cookies,
              jobId: task.initial_id,
              taskId: task._id,
              status: 'NEW',
            });

            if (glintsData?.data.length > 0) {
              pushLog(`${task.code}: moving to IN_REVIEW (${i + 1})`);

              const res = await onUpdateGlintsAplicant({
                cookies: account.cookies,
                jobId: task.initial_id,
                applicationIds: glintsData?.data,
                status: 'IN_REVIEW',
              });
              pushLog('loading end');
              pushLog(`${task.code}: ${JSON.stringify(res)} \n`);
            }

            const glintsDataInReview = await onFetchGlintsAplicant({
              cookies: account.cookies,
              jobId: task.initial_id,
              taskId: task._id,
              status: 'IN_REVIEW',
            });

            if (glintsDataInReview?.data.length > 0) {
              pushLog(`${task.code}: moving to REJECTED (${i + 1})`);

              const resReject = await onUpdateGlintsAplicant({
                cookies: account.cookies,
                jobId: task.initial_id,
                applicationIds: glintsData?.data,
                status: 'REJECTED',
              });
              pushLog('loading end');
              pushLog(`${task.code}: ${JSON.stringify(resReject)} \n`);
            }
          }

          if (task.scraping_account.type === 'indeed') {
            const resIndeed = await indeedFetchPelamar({
              cookies: account.cookies,
              positionId: task.positionId,
              initial_id: task.initial_id,
              taskId: task._id,
            });

            if (resIndeed.length > 0) {
              pushLog(`${task.code}: moving to REJECTED (${i + 1})`);
              const resRejectIndeed = await indeedUpdatePelamar({
                cookies: account.cookies,
                candidateSubmissionEmployerJobIdPairs: resIndeed,
              });

              pushLog('loading end');
              pushLog(`${task.code}: ${JSON.stringify(resRejectIndeed)} \n`);
            }
          }
        }
        await updatingTaskStatus(task._id, 'done');
      }
    }

    status = 'done';
    pushLog('done scraping');
  } catch (err: any) {
    status = 'error';
    pushLog(`error ${err?.message || err}`);
    throw err;
  }
};

export default {
  runScraping,
  getLogs,
  clearLogs,
  getStatus,
};
