import fs from 'fs';
import { launch } from 'puppeteer';
import { useSleep } from '../helpers';

const page: any = {};
const browser: any = {};

export const jobstreetLoginAccount = async (
  username: string,
  password: string,
  _id: string,
) => {
  const headless = false; // new , false, true
  if (fs.existsSync('/usr/bin/chromium')) {
    browser[_id] = await launch({
      headless: headless,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: '/usr/bin/chromium',
      slowMo: 20,
    });
  } else {
    browser[_id] = await launch({
      headless: headless,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      slowMo: 20,
    });
  }

  page[_id] = await browser[_id].newPage();
  if(headless){
    const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36';
    await page[_id].setUserAgent(USER_AGENT);
  }
  await page[_id].setJavaScriptEnabled(true);

  await page[_id].setDefaultNavigationTimeout(1000000);
  await page[_id].setViewport({ width: 1000, height: 600 });
  await page[_id].goto('https://id.employer.seek.com/id/oauth/login/');
  await page[_id].waitForSelector('#emailAddress');
  await page[_id].type('#emailAddress', username);
  await page[_id].waitForSelector('#password');
  await page[_id].type('#password', password);
  await page[_id].click(`button[type='submit']`);
  useSleep();
  await page[_id].screenshot({ path: `./public/assets/screenshot/${_id}.jpg` });

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
