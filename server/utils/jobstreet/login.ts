import fs from 'fs';
import { launch } from 'puppeteer';
const page: any = {};
const browser: any = {};

export const jobstreetLoginAccount = async (
  username: string,
  password: string,
  _id: string,
) => {
  if (fs.existsSync('/usr/bin/chromium')) {
    console.log('tes-browser');

    browser[_id] = await launch({
      // headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: '/usr/bin/chromium',
      // slowMo: 20,
    });
  } else {
    browser[_id] = await launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      slowMo: 20,
    });
  }

  page[_id] = await browser[_id].newPage();
  await page[_id].setDefaultNavigationTimeout(1000000);
  await page[_id].setViewport({ width: 1000, height: 600 });
  await page[_id].goto('https://id.employer.seek.com/id/oauth/login/');
  await page[_id].waitForSelector('#emailAddress');
  await page[_id].type('#emailAddress', username);
  await page[_id].waitForSelector('#password');
  await page[_id].type('#password', password);
  await page[_id].click(`button[type='submit']`);

  await page[_id].waitForNavigation();
  await page[_id].waitForTimeout(10000);
  const authSession = await page[_id].evaluate(() => {
    let token;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.includes('auth')) {
        const json = localStorage.getItem(key) as string;
        const auth = JSON.parse(json);
        token = auth.body.access_token;
      }
    }
    return token || '';
  });

  // browser.close();
  return authSession;
};

export const jobstreetReloadAccount = async (_id: string) => {
  await page[_id].reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
  // await page[_id].waitForNavigation();
  await page[_id].waitForTimeout(10000);
  const authSession = await page[_id].evaluate(() => {
    let token;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.includes('auth')) {
        const json = localStorage.getItem(key) as string;
        const auth = JSON.parse(json);
        token = auth.body.access_token;
      }
    }
    return token || '';
  });
  return authSession;
};

export const stopSession = async (_id: string) => {
  if (browser[_id]) await browser[_id].close();
};
