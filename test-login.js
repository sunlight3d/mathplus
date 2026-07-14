const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3001/admin/login');
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', 'mathplusvolamcaithe');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
  console.log('Current URL:', page.url());
  const errorText = await page.evaluate(() => document.body.innerText);
  if (errorText.includes('Đang xử lý')) console.log('Stuck on loading');
  await browser.close();
})();
