const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const INSTRUMENT = path.resolve(__dirname, '../templates/components/qa_instrument.js');

test('qa_instrument respects alpha, clip, transforms and paths', async (t) => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--hide-scrollbars']
  });
  try {
    const page = await browser.newPage();
    await page.setContent('<html><body></body></html>');
    await page.evaluate(() => { window.__QA_INSTRUMENT__ = true; });
    await page.addScriptTag({ path: INSTRUMENT });

    const draw = (fn) => page.evaluate((source) => {
      window.__QA_RESET__();
      window.__QA_SET_COMPONENT__('test');
      const canvas = document.createElement('canvas');
      canvas.width = 960;
      canvas.height = 1360;
      const ctx = canvas.getContext('2d');
      // eslint-disable-next-line no-new-func
      new Function('ctx', source)(ctx);
      return window.__QA_BOUNDS__.slice();
    }, fn);

    await t.test('globalAlpha=0 is ignored', async () => {
      const bounds = await draw('ctx.globalAlpha = 0; ctx.fillRect(0, 0, 960, 1360);');
      assert.equal(bounds.length, 0);
    });

    await t.test('transparent fill is ignored', async () => {
      const bounds = await draw('ctx.fillStyle = "rgba(255,255,255,0)"; ctx.fillRect(10, 10, 100, 100);');
      assert.equal(bounds.length, 0);
    });

    await t.test('clip intersects the recorded bounds', async () => {
      const bounds = await draw('ctx.beginPath(); ctx.rect(100, 100, 50, 50); ctx.clip(); ctx.fillRect(0, 0, 960, 1360);');
      assert.equal(bounds.length, 1);
      assert.ok(Math.abs(bounds[0].x - 100) < 0.01);
      assert.ok(Math.abs(bounds[0].y - 100) < 0.01);
      assert.ok(Math.abs(bounds[0].w - 50) < 0.01);
      assert.ok(Math.abs(bounds[0].h - 50) < 0.01);
    });

    await t.test('save/restore restores the clip', async () => {
      const bounds = await draw('ctx.save(); ctx.beginPath(); ctx.rect(100, 100, 50, 50); ctx.clip(); ctx.restore(); ctx.fillRect(0, 0, 10, 20);');
      assert.equal(bounds.length, 1);
      assert.equal(bounds[0].x, 0);
      assert.equal(bounds[0].y, 0);
      assert.equal(bounds[0].w, 10);
      assert.equal(bounds[0].h, 20);
    });

    await t.test('transforms are applied to bounds', async () => {
      const bounds = await draw('ctx.translate(100, 200); ctx.scale(2, 3); ctx.fillRect(0, 0, 10, 20);');
      assert.equal(bounds.length, 1);
      assert.equal(bounds[0].x, 100);
      assert.equal(bounds[0].y, 200);
      assert.equal(bounds[0].w, 20);
      assert.equal(bounds[0].h, 60);
    });

    await t.test('stroked paths are recorded', async () => {
      const bounds = await draw('ctx.lineWidth = 4; ctx.strokeStyle = "#fff"; ctx.beginPath(); ctx.moveTo(10, 10); ctx.lineTo(80, 50); ctx.stroke();');
      assert.equal(bounds.length, 1);
      assert.equal(bounds[0].kind, 'strokePath');
      assert.ok(bounds[0].w >= 70);
      assert.ok(bounds[0].h >= 40);
    });
  } finally {
    await browser.close();
  }
});
