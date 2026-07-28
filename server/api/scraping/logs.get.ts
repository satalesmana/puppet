import runner from '../../scrapingRunner';

export default defineEventHandler(() => {
  const { getLogs, getStatus } = runner as any;
  return {
    logs: getLogs(),
    status: getStatus(),
  };
});
