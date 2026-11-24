const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const FILES = [
  { file: 'animaciones/assets/fonts/OFL-PlusJakartaSans.txt', font: 'Plus Jakarta Sans' },
  { file: 'animaciones/assets/fonts/OFL-JetBrainsMono.txt', font: 'JetBrains Mono' }
];

test('OFL license texts for redistributed local fonts exist and are valid', () => {
  for (const entry of FILES) {
    const file = path.join(ROOT, entry.file);
    assert.ok(fs.existsSync(file), `${entry.file} missing`);
    const text = fs.readFileSync(file, 'utf8');
    assert.ok(text.length > 3000, `${entry.file} too short`);
    assert.match(text, /SIL OPEN FONT LICENSE Version 1\.1/);
    assert.match(text, /Copyright 2020 The .+ Project Authors/);
    assert.match(text, new RegExp(entry.font.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});
