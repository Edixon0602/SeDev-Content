const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const assetsDir = path.join(__dirname, 'contenido', 'reddit_assets');

async function renderAssets() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Render Avatar (500x500)
  const avatarPath = path.join(assetsDir, 'sedev_avatar.svg');
  const avatarUrl = 'file:///' + avatarPath.replace(/\\/g, '/');
  await page.setViewport({ width: 500, height: 500, deviceScaleFactor: 2 });
  await page.goto(avatarUrl, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(assetsDir, 'sedev_avatar.png') });
  console.log('Avatar PNG rendered: sedev_avatar.png');

  // 2. Render Banner (1920x640)
  const bannerPath = path.join(assetsDir, 'sedev_banner.svg');
  const bannerUrl = 'file:///' + bannerPath.replace(/\\/g, '/');
  await page.setViewport({ width: 1920, height: 640, deviceScaleFactor: 2 });
  await page.goto(bannerUrl, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(assetsDir, 'sedev_banner.png') });
  console.log('Banner PNG rendered: sedev_banner.png');

  await browser.close();
  console.log('All PNG assets ready for Reddit upload!');
}

renderAssets().catch(console.error);
