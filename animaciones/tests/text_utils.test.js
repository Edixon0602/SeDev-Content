const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function load() {
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  for (const file of ['motion_core.js', 'motion_utils.js']) {
    const abs = path.resolve(__dirname, `../templates/components/${file}`);
    vm.runInContext(fs.readFileSync(abs, 'utf8'), sandbox, { filename: abs });
  }
  return sandbox.window.motionUtils;
}

const mu = load();

function makeCtx() {
  let size = 20;
  const drawn = [];
  return {
    drawn,
    get font() { return `900 ${size}px Fake`; },
    set font(value) {
      const m = /(\d+(?:\.\d+)?)px/.exec(String(value));
      if (m) size = parseFloat(m[1]);
    },
    textAlign: 'left',
    save() {},
    restore() {},
    measureText(text) { return { width: String(text).length * size * 0.58 }; },
    fillText(text, x, y) { drawn.push({ text: String(text), x, y, width: this.measureText(text).width }); }
  };
}

test('fitText never exceeds maxWidth even at minimum size', () => {
  const ctx = makeCtx();
  const width = mu.fitText(ctx, 'X'.repeat(120), 0, 0, 300, 66, 24, 'Fake', '900');
  assert.ok(width <= 300, `fitText drew ${width}px for a 300px limit`);
  assert.equal(ctx.drawn.length, 1);
  assert.ok(ctx.drawn[0].width <= 300);
});

test('fitParagraph hard-breaks a no-space string and keeps 2 lines', () => {
  const ctx = makeCtx();
  const longWord = 'SINEXCELNISINCOPIARNPEGARNCADAERRORCUESTADINERO';
  const res = mu.fitParagraph(ctx, longWord, 0, 0, 300, 28, 2, 24, 14, 'Fake', '700');
  assert.ok(res.lines.length <= 2);
  for (const line of res.lines) {
    assert.ok(ctx.measureText(line).width <= 300, `line "${line}" exceeds 300px`);
  }
  assert.ok(ctx.drawn.every((d) => d.width <= 300));
});

test('wrapText clamps long words and max lines', () => {
  const ctx = makeCtx();
  const text = 'WORD ' + 'A'.repeat(90) + ' TAIL';
  mu.wrapText(ctx, text, 0, 0, 300, 30, 3);
  assert.ok(ctx.drawn.length <= 3);
  for (const d of ctx.drawn) {
    assert.ok(d.width <= 300, `drawn line "${d.text}" exceeds 300px`);
  }
});
