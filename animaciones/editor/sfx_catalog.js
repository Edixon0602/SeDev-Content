// Local SFX catalog: strict metadata + WAV duration validation.
// No network access, no scraping, no unlicensed files.

const fs = require('fs');
const path = require('path');
const { isPlainObject } = require('./utils');

const DEFAULT_CATALOG = path.join(__dirname, 'sfx', 'catalog.json');
const ID_PATTERN = /^[a-z0-9][a-z0-9_-]{1,40}$/;

function readWavInfo(file) {
  const fd = fs.openSync(file, 'r');
  const header = Buffer.alloc(4096);
  try {
    const read = fs.readSync(fd, header, 0, header.length, 0);
    if (read < 44) throw new Error(`WAV demasiado corto: ${file}`);
    if (header.toString('ascii', 0, 4) !== 'RIFF' || header.toString('ascii', 8, 12) !== 'WAVE') {
      throw new Error(`Cabecera WAV inválida: ${file}`);
    }
    let offset = 12;
    let fmt = null;
    let dataSize = 0;
    let pos = 12;
    while (pos + 8 <= read) {
      const id = header.toString('ascii', pos, pos + 4);
      const size = header.readUInt32LE(pos + 4);
      if (id === 'fmt ') {
        fmt = {
          channels: header.readUInt16LE(pos + 10),
          sampleRate: header.readUInt32LE(pos + 12),
          bitsPerSample: header.readUInt16LE(pos + 22)
        };
      } else if (id === 'data') {
        dataSize = size;
        break;
      }
      pos += 8 + size + (size % 2);
    }
    if (!fmt || !dataSize) throw new Error(`WAV sin fmt/data: ${file}`);
    const bytesPerSample = fmt.bitsPerSample / 8;
    const duration = dataSize / (fmt.sampleRate * fmt.channels * bytesPerSample);
    return { ...fmt, duration, dataSize };
  } finally {
    fs.closeSync(fd);
  }
}

function loadCatalog(file = DEFAULT_CATALOG) {
  if (!fs.existsSync(file)) throw new Error(`No existe el catálogo SFX: ${file}`);
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
  } catch (err) {
    throw new Error(`Catálogo SFX inválido: ${err.message}`);
  }
  if (!isPlainObject(raw) || !Array.isArray(raw.sounds)) {
    throw new Error('El catálogo SFX debe tener un array "sounds".');
  }
  const baseDir = path.dirname(file);
  const sounds = [];
  const errors = [];
  const seen = new Set();
  raw.sounds.forEach((entry, index) => {
    const label = `sounds[${index}]`;
    if (!isPlainObject(entry)) { errors.push(`${label} no es un objeto`); return; }
    if (!ID_PATTERN.test(String(entry.id || ''))) errors.push(`${label} id inválido`);
    if (seen.has(entry.id)) errors.push(`${label} id duplicado: ${entry.id}`);
    seen.add(entry.id);
    if (!entry.file || typeof entry.file !== 'string') errors.push(`${label} sin file`);
    if (!Number.isFinite(Number(entry.durationSec)) || Number(entry.durationSec) <= 0) errors.push(`${label} durationSec inválida`);
    if (!entry.category) errors.push(`${label} sin category`);
    if (!Array.isArray(entry.tags)) errors.push(`${label} tags debe ser array`);
    if (!Number.isFinite(Number(entry.defaultGainDb)) || Number(entry.defaultGainDb) > 0 || Number(entry.defaultGainDb) < -40) {
      errors.push(`${label} defaultGainDb fuera de rango (-40..0)`);
    }
    if (!entry.license || typeof entry.license !== 'string') errors.push(`${label} sin licencia`);
    if (!entry.origin || typeof entry.origin !== 'string') errors.push(`${label} sin origen`);
    const abs = path.resolve(baseDir, entry.file || '');
    if (!abs.startsWith(path.resolve(baseDir) + path.sep)) errors.push(`${label} file sale del directorio sfx`);
    if (!fs.existsSync(abs)) {
      errors.push(`${label} no existe el archivo ${entry.file} (ejecuta npm run edit:sfx)`);
    } else {
      try {
        const info = readWavInfo(abs);
        if (Math.abs(info.duration - Number(entry.durationSec)) > 0.05) {
          errors.push(`${label} duración declarada ${entry.durationSec}s != real ${info.duration.toFixed(3)}s`);
        }
        if (info.sampleRate !== 48000 || info.channels !== 1) {
          errors.push(`${label} debe ser mono 48 kHz (real ${info.sampleRate} Hz, ${info.channels} ch)`);
        }
      } catch (err) {
        errors.push(`${label} ${err.message}`);
      }
    }
    sounds.push({
      id: String(entry.id || ''),
      file: abs,
      relativeFile: entry.file,
      durationSec: Number(entry.durationSec),
      category: entry.category,
      tags: entry.tags.map(String),
      defaultGainDb: Number(entry.defaultGainDb),
      license: entry.license,
      origin: entry.origin
    });
  });
  if (errors.length) {
    const err = new Error(`Catálogo SFX inválido:\n- ${errors.join('\n- ')}`);
    err.errors = errors;
    throw err;
  }
  return { version: raw.version || 1, file: path.resolve(file), sounds };
}

function catalogIds(catalog) {
  return catalog.sounds.map((sound) => sound.id);
}

function getSound(catalog, id) {
  return catalog.sounds.find((sound) => sound.id === id) || null;
}

module.exports = {
  DEFAULT_CATALOG,
  readWavInfo,
  loadCatalog,
  catalogIds,
  getSound
};
