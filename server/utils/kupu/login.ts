import { launch } from 'puppeteer';
const page: any = {};
const browser: any = {};

export const kupuLoginAccount = async (_id: string) => {
  browser[_id] = await launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    slowMo: 20,
  });

  page[_id] = await browser[_id].newPage();

  await page[_id].setDefaultNavigationTimeout(1000000);
  await page[_id].setViewport({ width: 1000, height: 600 });
  await page[_id].goto('https://bisnis.kupu.id/#/login?redirect=/');
};
