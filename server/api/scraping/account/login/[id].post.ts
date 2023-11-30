import puppeteer from 'puppeteer';

export default defineEventHandler(async (event) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    slowMo: 20,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(1000000);
  await page.setViewport({ width: 1000, height: 600 });
  await page.goto('https://id.employer.seek.com/id/oauth/login/');
  await page.waitForSelector('#emailAddress');
  await page.type('#emailAddress', 'mikaoktamirza@gmail.com');
  await page.waitForSelector('#password');
  await page.type('#password', 'Terusanlama1');
  await page.click(`button[type='submit']`);

  await page.waitForNavigation();
  await page.waitForTimeout(10000);
  const authSession = await page.evaluate(() => {
    let token;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.includes('auth')) {
        const json = localStorage.getItem(key);
        const auth = JSON.parse(json);
        token = auth.body.access_token;
      }
    }
    return token || '';
  });

  console.log(authSession);

  browser.close();
});
