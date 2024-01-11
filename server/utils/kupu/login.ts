import { launch } from 'puppeteer';
const page: any = {};
const browser: any = {};

export const kupuLoginAccount = async (_id: string, phone: string) => {
  browser[_id] = await launch({
    headless: 'new',
    args: ['--enable-gpu'],
    slowMo: 20,
  });

  page[_id] = await browser[_id].newPage();

  await page[_id].setDefaultNavigationTimeout(1000000);
  await page[_id].setViewport({ width: 1000, height: 600 });
  await page[_id].goto('https://bisnis.kupu.id/#/login?redirect=/');

  await page[_id].waitForSelector(
    '#app > div > div.login-right > div.login-form-warp > form > div:nth-child(1) > div > div.form-input > div > input',
  );

  await page[_id].type(
    '#app > div > div.login-right > div.login-form-warp > form > div:nth-child(1) > div > div.form-input > div > input',
    phone,
  );

  await page[_id].waitForSelector('.send-code');
  await page[_id].click('.send-code');
};

export const kupuSendOTP = async (_id: string, otp: string) => {
  await page[_id].waitForSelector(
    '#app > div > div.login-right > div.login-form-warp > form > div:nth-child(2) > div > div.form-input > div > input',
  );
  await page[_id].type(
    '#app > div > div.login-right > div.login-form-warp > form > div:nth-child(2) > div > div.form-input > div > input',
    otp,
  );

  await page[_id].waitForSelector(
    '#app > div > div.login-right > div.login-form-warp > form > div.login-btn > button',
  );
  await page[_id].click(
    '#app > div > div.login-right > div.login-form-warp > form > div.login-btn > button',
  );

  await page[_id].waitForNavigation();
  await page[_id].waitForTimeout(10000);

  const cookies = await page[_id].cookies();
  let token;
  cookies.forEach((item: any) => {
    if (item.name === 'token_employer') {
      token = item.value;
    }
  });

  browser[_id].close();
  return token || '';
};
