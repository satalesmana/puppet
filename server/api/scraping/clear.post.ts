import runner from '../../scrapingRunner';

export default defineEventHandler(() => {
  const { clearLogs } = runner as any;
  clearLogs();
  return { cleared: true };
});
