import { runScraping } from '../../scrapingRunner';

export default defineEventHandler(async (event) => {
  try {
    // start scraping in background
    void runScraping();
    return { started: true };
  } catch (err: any) {
    event.node.res.statusCode = 500;
    return { error: err?.message || 'failed to start' };
  }
});
