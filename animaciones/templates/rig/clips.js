// Clip and Motion Library
// Procedural character actions: wake_jolt, check_phone, idle, talk, facepalm, point

(function(global) {
  const Clips = {
    // 1. Idle Breathing and micro-sway
    idle(t, options = {}) {
      const breath = Math.sin(t * 2.2) * 0.03;
      const sway = Math.sin(t * 1.1) * 6;
      return {
        skeletonOverrides: {
          rootY: sway * 0.5,
          spine: breath * 0.5,
          chest: breath * 0.5,
          headTilt: Math.sin(t * 1.5) * 0.04
        },
        look: { x: Math.sin(t * 0.8) * 0.3, y: 0.1 },
        blinkProgress: (t % 3.8 > 3.65) ? 1 : 0
      };
    },

    // 2. Sudden Wake Jolt (Shock / Alert reaction -> Look right towards buzzing phone)
    wakeJolt(t, duration = 3.0) {
      const u = global.RigTimeline;
      const progress = u.clamp(t / 0.5, 0, 1);
      const jolt = u.easeOutElastic(progress);

      // Phase 2: After shock settles (t > 0.8s), transition attention to phone on desk
      const settleProgress = u.smooth(u.clamp((t - 0.7) / 0.8, 0, 1));
      const breath = Math.sin(t * 3.0) * 0.025;

      const spineAngle = u.lerp(-0.15 * jolt, 0.08 + breath, settleProgress);
      const headTiltAngle = u.lerp(-0.2 * jolt, 0.22, settleProgress);
      const lookX = u.lerp(0.1, 0.65, settleProgress);
      const lookY = u.lerp(-0.25, 0.45, settleProgress);

      return {
        skeletonOverrides: {
          rootY: (1 - jolt) * 50 + Math.sin(t * 2.5) * 3,
          spine: spineAngle,
          chest: -0.06 * jolt,
          neck: u.lerp(0, 0.12, settleProgress),
          headTilt: headTiltAngle,
          leftShoulder: u.lerp(-0.4 * jolt, 0.15, settleProgress),
          leftElbow: u.lerp(-0.8 * jolt, 0.35, settleProgress),
          rightShoulder: u.lerp(-0.3 * jolt, 0.2, settleProgress),
          rightElbow: u.lerp(-0.7 * jolt, 0.45, settleProgress)
        },
        emotion: settleProgress > 0.4 ? 'worried' : (progress > 0.3 ? 'shocked' : 'worried'),
        mouthState: settleProgress > 0.6 ? 'tight' : (progress > 0.4 ? 'gasp' : 'tight'),
        look: { x: lookX, y: lookY },
        blinkProgress: (t > 2.0 && t % 3.6 > 3.45) ? 1 : 0
      };
    },

    // 3. Check Phone (Holding phone, head tilted down reading notifications)
    checkPhone(t, options = {}) {
      const u = global.RigTimeline;
      const breath = Math.sin(t * 2.0) * 0.02;

      // IK Hand targets holding the phone in front of chest
      const phonePos = options.phonePos || { x: 440, y: 1100 };

      return {
        skeletonOverrides: {
          spine: 0.12 + breath,
          chest: 0.08,
          neck: 0.2,
          headTilt: 0.35, // tilted down looking at screen
          leftHandTarget: { x: phonePos.x - 45, y: phonePos.y + 40 },
          rightHandTarget: { x: phonePos.x + 45, y: phonePos.y + 40 }
        },
        emotion: 'worried',
        mouthState: 'tight',
        look: { x: 0.1, y: 0.9 }, // gaze fixed down at phone screen
        blinkProgress: (t % 4.2 > 4.05) ? 1 : 0
      };
    },

    // 4. Talking with natural gestures & cadence
    talk(t, options = {}) {
      const u = global.RigTimeline;
      const wordPulse = options.talkWeight || (Math.abs(Math.sin(t * 8.5)) * 0.8 + 0.2);
      const headNod = Math.sin(t * 4.2) * 0.06;

      return {
        skeletonOverrides: {
          spine: Math.sin(t * 1.8) * 0.04,
          chest: Math.sin(t * 2.0) * 0.03,
          headTilt: headNod,
          leftShoulder: 0.2 + Math.sin(t * 2.5) * 0.15,
          leftElbow: 0.4 + Math.sin(t * 3.0) * 0.2,
          rightShoulder: -0.2 - Math.sin(t * 2.2) * 0.15,
          rightElbow: -0.4 - Math.sin(t * 2.8) * 0.2
        },
        emotion: options.emotion || 'focused',
        mouthState: 'talk',
        talkWeight: wordPulse,
        look: options.look || { x: Math.sin(t * 1.2) * 0.3, y: 0 },
        blinkProgress: (t % 3.5 > 3.35) ? 1 : 0
      };
    },

    // 5. Pointing towards embedded data/screen
    point(t, target = { x: 700, y: 800 }) {
      return {
        skeletonOverrides: {
          spine: -0.08,
          headTilt: -0.1,
          rightHandTarget: target,
          leftShoulder: 0.1,
          leftElbow: 0.2
        },
        emotion: 'focused',
        mouthState: 'talk',
        look: { x: 0.6, y: -0.2 },
        blinkProgress: (t % 4.0 > 3.85) ? 1 : 0
      };
    }
  };

  global.RigClips = Clips;
})(typeof window !== 'undefined' ? window : global);
