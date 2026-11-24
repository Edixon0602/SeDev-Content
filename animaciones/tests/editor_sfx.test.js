const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const { loadCatalog, catalogIds, getSound, readWavInfo } = require('../editor/sfx_catalog');
const { generate, SOUNDS } = require('../editor/sfx/generate_sfx');

const ROOT = path.resolve(__dirname, '../..');

function hash(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

test('SFX catalog loads, is local, licensed and original', () => {
  const catalog = loadCatalog();
  assert.ok(catalog.sounds.length >= 18, `expected >= 18 sounds, got ${catalog.sounds.length}`);
  const ids = new Set(catalogIds(catalog));
  for (const required of [
    'hook_impact', 'cinematic_boom', 'bass_drop_clean', 'pop_spring', 'card_snap',
    'ui_pop_double', 'sticker_slap', 'camera_punch', 'shutter_click', 'whip_pan',
    'glitch_tech', 'data_burst', 'keyboard_burst', 'counter_tick', 'riser_short',
    'soft_whoosh', 'ui_tick', 'low_impact', 'paper_turn', 'digital_chime', 'notification_ding',
    'censor_beep', 'ding_real', 'huh_cat', 'keyboard_meme', 'keyboard_typing',
    'money_kaching', 'punch_hit', 'rizz_stinger', 'vine_boom'
  ]) {
    assert.ok(ids.has(required), `missing required SFX id: ${required}`);
  }
  assert.deepEqual(catalogIds(catalog), catalog.sounds.map((s) => s.id));
  for (const sound of catalog.sounds) {
    assert.ok(fs.existsSync(sound.file), `${sound.id} missing`);
    assert.ok(path.resolve(sound.file).startsWith(path.resolve(ROOT, 'animaciones/editor/sfx')));
    assert.ok(sound.license.length > 0);
    assert.ok(
      sound.origin.includes('Sintetizado') ||
      sound.origin.includes('internamente') ||
      sound.origin.includes('Importado')
    );
    assert.ok(sound.tags.length > 0);
    assert.ok(sound.defaultGainDb <= 0);
    const info = readWavInfo(sound.file);
    assert.equal(info.sampleRate, 48000);
    assert.equal(info.channels, 1);
    assert.equal(info.bitsPerSample, 16);
  }
});

test('catalog ids resolve to sound files', () => {
  const catalog = loadCatalog();
  assert.equal(getSound(catalog, 'soft_whoosh').id, 'soft_whoosh');
  assert.equal(getSound(catalog, 'missing'), null);
});

test('synthesis is deterministic byte-for-byte', () => {
  const temp = path.join(ROOT, 'animaciones/editor_runs/_sfx_check');
  fs.mkdirSync(temp, { recursive: true });
  try {
    generate(temp);
    for (const sound of SOUNDS) {
      const committed = path.join(ROOT, 'animaciones/editor/sfx', sound.file);
      const regenerated = path.join(temp, sound.file);
      assert.equal(hash(committed), hash(regenerated), `${sound.file} differs from its source`);
    }
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
});
