const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Everything that can affect a rendered frame. Directories are walked
// recursively, so new nested motion cores, bundled libs, GLB models, textures
// and self-hosted font files invalidate the cache automatically.
const SHARED_DEPENDENCY_DIRS = [
  { dir: 'animaciones/templates/components', extensions: ['.js', '.css'] },
  { dir: 'animaciones/templates/rig', extensions: ['.js'] },
  { dir: 'animaciones/templates/lib', extensions: null },
  { dir: 'animaciones/assets', extensions: null }
];

function normalize(p) {
  return path.resolve(p).replace(/\\/g, '/');
}

function walk(dir, extensions, out) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    return;
  }
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(abs, extensions, out);
    } else if (entry.isFile()) {
      if (!extensions || extensions.indexOf(path.extname(entry.name).toLowerCase()) >= 0) {
        out.push(abs);
      }
    }
  }
}

class CacheManager {
  constructor(cacheDir, options = {}) {
    this.cacheDir = cacheDir;
    this.projectRoot = options.projectRoot || path.resolve(__dirname, '..', '..');
    this.explicitSharedDependencies = options.sharedDependencies || null;
    this._digestCache = new Map();
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  // Returns all shared dependency files that participate in every scene hash.
  resolveSharedDependencies() {
    if (this.explicitSharedDependencies) {
      return this.explicitSharedDependencies.map((p) => path.resolve(p));
    }
    const files = [];
    for (const entry of SHARED_DEPENDENCY_DIRS) {
      const absDir = path.resolve(this.projectRoot, entry.dir);
      if (!fs.existsSync(absDir)) continue;
      walk(absDir, entry.extensions, files);
    }
    return files.sort();
  }

  _digest(file) {
    let stat = null;
    try { stat = fs.statSync(file); } catch (err) { stat = null; }
    const key = `${file}:${stat ? stat.mtimeMs : 'missing'}:${stat ? stat.ctimeMs : 0}:${stat ? stat.size : 0}`;
    if (this._digestCache.has(key)) return this._digestCache.get(key);
    let digest = null;
    try {
      digest = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
    } catch (err) {
      digest = null;
    }
    this._digestCache.set(key, digest);
    return digest;
  }

  // `identity` carries render parameters that are not part of the scene object,
  // most notably fps. Keeping it optional preserves the old 3-arg call style.
  computeSceneHash(scene, templatePath, componentPath, extraDependencies = [], identity = {}) {
    const hash = crypto.createHash('sha256');
    hash.update('sedev-scene-v3\n');
    hash.update(JSON.stringify(scene));
    try {
      hash.update('\nidentity:');
      hash.update(JSON.stringify(identity || {}));
    } catch (err) {
      hash.update('\nidentity:unserializable');
    }

    const dependencies = [
      templatePath,
      componentPath,
      ...this.resolveSharedDependencies(),
      ...(extraDependencies || [])
    ].filter(Boolean);

    const unique = Array.from(new Set(dependencies.map(normalize))).sort();
    const root = normalize(this.projectRoot);

    for (const dep of unique) {
      const relative = dep.startsWith(root + '/') ? dep.slice(root.length + 1) : dep;
      hash.update(`\n<<${relative}>>\n`);
      const digest = this._digest(dep);
      // Distinguishes "missing now" from every possible file content, so
      // creating or deleting a dependency always invalidates cached clips.
      hash.update(digest || '\u0000missing-dependency');
    }

    return hash.digest('hex').substring(0, 12);
  }

  getCachePath(scene, hash) {
    return path.join(this.cacheDir, `${scene.id}_${hash}.mp4`);
  }

  isCached(cachePath) {
    return fs.existsSync(cachePath) && fs.statSync(cachePath).size > 1000;
  }
}

CacheManager.SHARED_DEPENDENCY_DIRS = SHARED_DEPENDENCY_DIRS;
module.exports = CacheManager;
