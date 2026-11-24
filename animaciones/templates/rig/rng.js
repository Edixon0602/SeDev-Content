// Deterministic Mulberry32 Seeded Random Number Generator
// Guarantees zero AI-slop jitter while keeping rendering 100% deterministic

(function(global) {
  function mulberry32(seed) {
    return function() {
      var t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function hashString(str) {
    let hash = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      hash = Math.imul(hash ^ str.charCodeAt(i), 3432918353);
      hash = hash << 13 | hash >>> 19;
    }
    return hash >>> 0;
  }

  global.RigRNG = {
    create(seedInput) {
      const seed = typeof seedInput === 'string' ? hashString(seedInput) : (seedInput || 1337);
      const prng = mulberry32(seed);
      return {
        next() { return prng(); },
        range(min, max) { return min + prng() * (max - min); },
        choice(arr) { return arr[Math.floor(prng() * arr.length)]; }
      };
    }
  };
})(typeof window !== 'undefined' ? window : global);
