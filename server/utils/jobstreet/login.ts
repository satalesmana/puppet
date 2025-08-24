import fs from 'fs';
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
import { useSleep } from '../helpers';

const page: any = {};
const browser: any = {};
export const maxDuration = 50; // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic';

export const jobstreetLoginAccount = async (
  username: string,
  password: string,
  _id: string,
) => {
  try{

    const config = useRuntimeConfig();
    const useCustomeBrowser = fs.existsSync(config.browserPath);
    if (useCustomeBrowser) {
      browser[_id] = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: config.browserPath,
        slowMo: 20,
      });
    } else {
       browser[_id] = await puppeteer.launch({
        headless: false,
        args: [ '--start-maximized'],
        channel: "chrome",
        slowMo: 20,
      });
    }

    page[_id] = await browser[_id].newPage();
    await page[_id].goto('https://id.employer.seek.com/id/oauth/login/',{ waitUntil: "networkidle0" });

    console.log("INFO Chromium:", await browser[_id].version());
    console.log("INFO Page Title:", await page[_id].title());

    await page[_id].waitForSelector('#emailAddress');
    await page[_id].type('#emailAddress', username);
    await page[_id].waitForSelector('#password');
    await page[_id].type('#password', password);
    await page[_id].click(`button[type='submit']`);
    // await page[_id].screenshot({ path: `./public/assets/screenshot/${_id}${new Date()}.jpg` });
    console.log("INFO Chromium:", await browser[_id].version());
    console.log("INFO Page Title:", await page[_id].title());
    await page[_id].waitForSelector('table');
    useSleep();
    const authSession = await page[_id].evaluate(() => {
      let token;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.includes('auth')) {
          const json = localStorage.getItem(key) as string;
          const auth = JSON.parse(json);
          if (auth.body && auth.body.access_token) {
            token = auth.body.access_token;
          }
        }
      }
      return token || '';
    });

    // browser.close();
    return authSession;
  }catch(err){
    console.error('err', err)
  }
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
        if (auth.body && auth.body.access_token) {
          token = auth.body.access_token;
        }
      }
    }
    return token || '';
  });
  return authSession;
};

export const stopSession = async (_id: string) => {
  if (browser[_id]) await browser[_id].close();
};
