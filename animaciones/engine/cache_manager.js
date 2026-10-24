const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

class CacheManager {
  constructor(cacheDir) {
    this.cacheDir = cacheDir;
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  computeSceneHash(scene, templatePath, componentPath) {
    const hash = crypto.createHash('md5');
    hash.update(JSON.stringify(scene));

    if (fs.existsSync(templatePath)) {
      hash.update(fs.readFileSync(templatePath));
    }
    if (fs.existsSync(componentPath)) {
      hash.update(fs.readFileSync(componentPath));
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

module.exports = CacheManager;
