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
    if (fs.existsSync(config.browserPath)) {
      browser[_id] = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: config.browserPath,
        slowMo: 20,
      });
    } else {
      browser[_id] = await puppeteer.launch({
        args: chromium.args,
        ignoreDefaultArgs: ['--disable-extensions','--single-process'],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(
          "https://github.com/Sparticuz/chromium/releases/download/v110.0.1/chromium-v110.0.1-pack.tar"
        ),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });
    }

    page[_id] = await browser[_id].newPage();

    // await page[_id].setJavaScriptEnabled(true);
    // await page[_id].setDefaultNavigationTimeout(1000000);
    // useSleep();
    // await page[_id].setViewport({ width: 1000, height: 600 });
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
    useSleep();
    // await page[_id].screenshot({ path: `./public/assets/screenshot/${_id}${new Date()}.jpg` });

    // await page[_id].waitForNavigation();
    // await page[_id].waitForTimeout(10000);
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
