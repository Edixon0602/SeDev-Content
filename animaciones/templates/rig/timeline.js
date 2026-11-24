// Rig Timeline & Animation Utilities
// Handles easing, interpolation, and "Animation on Twos" (12 fps character rate)

(function(global) {
  const RigTimeline = {
    // Quantize time to 12fps (animation on twos inside a 30fps/60fps camera)
    twos(t, fps = 12) {
      if (fps <= 0) return t;
      return Math.floor(t * fps) / fps;
    },

    clamp(v, min, max) {
      return Math.max(min, Math.min(max, v));
    },

    lerp(a, b, t) {
      return a + (b - a) * t;
    },

    // Smoothstep interpolation
    smooth(t) {
      t = this.clamp(t, 0, 1);
      return t * t * (3 - 2 * t);
    },

    // Snappy overshoot for cartoony / punchy reactions
    easeOutBack(t, s = 1.70158) {
      t = this.clamp(t, 0, 1) - 1;
      return (t * t * ((s + 1) * t + s) + 1);
    },

    // Elastic bounce for drops or impacts
    easeOutElastic(t) {
      t = this.clamp(t, 0, 1);
      if (t === 0 || t === 1) return t;
      const p = 0.3;
      return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
    },

    // Step function for sharp pop-in
    step(t, threshold = 0.5) {
      return t >= threshold ? 1 : 0;
    },

    // Spring calculation
    spring(dt, omega = 24, zeta = 0.65) {
      if (dt <= 0) return 0;
      const decay = Math.exp(-zeta * omega * dt);
      const beta = omega * Math.sqrt(1 - zeta * zeta);
      return 1 - decay * (Math.cos(beta * dt) + (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(beta * dt));
    }
  };

  global.RigTimeline = RigTimeline;
})(typeof window !== 'undefined' ? window : global);
