// Editorial Character Face System
// Vector-based expressive face: directed gaze, eyebrows by emotion, and speech visemes

(function(global) {
  const Face = {
    draw(ctx, headCenter, options = {}) {
      const {
        skinColor = '#f5d0b5',
        hairColor = '#1f1d2b',
        accentColor = '#fbbf24',
        gender = 'female', // 'female' (Laura) | 'male' (Marco / Dev)
        emotion = 'worried', // 'neutral' | 'worried' | 'panic' | 'focused' | 'shocked' | 'relieved'
        look = { x: 0, y: 0 }, // gaze direction [-1..1]
        mouthState = 'rest', // 'rest' | 'talk' | 'gasp' | 'smirk' | 'tight'
        talkWeight = 0, // 0..1 phonetic pulse
        blinkProgress = 0, // 0..1 (1 is fully closed)
        scale = 1.0
      } = options;

      ctx.save();
      ctx.translate(headCenter.x, headCenter.y);
      ctx.scale(scale, scale);

      // 1. Head Base Contour (Editorial geometric rounded rectangular head)
      const headW = 130;
      const headH = 160;
      ctx.fillStyle = skinColor;
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(-headW / 2, -headH / 2, headW, headH, [36, 36, 44, 44]);
      ctx.fill();
      ctx.stroke();

      // Stylized Neck Shadow / Chin definition
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.beginPath();
      ctx.roundRect(-headW / 2 + 10, headH / 2 - 18, headW - 20, 14, 6);
      ctx.fill();

      // 2. Hair Geometry (Sharp editorial silhouette)
      ctx.fillStyle = hairColor;
      ctx.beginPath();
      if (gender === 'female') {
        // Laura: Elegant, sharp bob with angled bangs
        ctx.roundRect(-headW / 2 - 8, -headH / 2 - 14, headW + 16, 68, [32, 32, 10, 10]);
        // Side bangs framing face
        ctx.rect(-headW / 2 - 8, -headH / 2 + 20, 22, 90);
        ctx.rect(headW / 2 - 14, -headH / 2 + 20, 22, 90);
      } else {
        // Marco / Dev: Clean modern crop with slight angular volume
        ctx.roundRect(-headW / 2 - 6, -headH / 2 - 16, headW + 12, 54, [26, 26, 8, 8]);
      }
      ctx.fill();
      ctx.stroke();

      // 3. Eyebrows (Driven by emotion)
      const browY = -22;
      const browW = 32;
      const browGap = 16;
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 4.5;
      ctx.lineCap = 'round';

      let lBrowTilt = 0;
      let rBrowTilt = 0;
      let browOffset = 0;

      switch (emotion) {
        case 'worried':
          // Inward ends raised, expressing concern/tension
          lBrowTilt = -0.35;
          rBrowTilt = 0.35;
          browOffset = -4;
          break;
        case 'panic':
        case 'shocked':
          // Arched high up in fear/disbelief
          lBrowTilt = -0.45;
          rBrowTilt = 0.45;
          browOffset = -14;
          break;
        case 'focused':
          // Furrowed down sharp
          lBrowTilt = 0.25;
          rBrowTilt = -0.25;
          browOffset = 4;
          break;
        case 'relieved':
          // Soft relaxed arc
          lBrowTilt = 0.1;
          rBrowTilt = -0.1;
          browOffset = -2;
          break;
        default:
          lBrowTilt = 0;
          rBrowTilt = 0;
          browOffset = 0;
      }

      // Left Eyebrow
      ctx.save();
      ctx.translate(-browGap - browW / 2, browY + browOffset);
      ctx.rotate(lBrowTilt);
      ctx.beginPath();
      ctx.moveTo(-browW / 2, 0);
      ctx.quadraticCurveTo(0, -3, browW / 2, 2);
      ctx.stroke();
      ctx.restore();

      // Right Eyebrow
      ctx.save();
      ctx.translate(browGap + browW / 2, browY + browOffset);
      ctx.rotate(rBrowTilt);
      ctx.beginPath();
      ctx.moveTo(-browW / 2, 2);
      ctx.quadraticCurveTo(0, -3, browW / 2, 0);
      ctx.stroke();
      ctx.restore();

      // 4. Eyes (Geometric sclera + directed pupil gaze)
      const eyeY = -4;
      const eyeW = 24;
      const eyeH = 20 * (1 - blinkProgress);
      const eyeGap = 20;

      [-1, 1].forEach(side => {
        const eyeX = side * (eyeGap + eyeW / 2);

        if (blinkProgress >= 0.85) {
          // Closed eye line
          ctx.strokeStyle = '#18181b';
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(eyeX - eyeW / 2, eyeY);
          ctx.lineTo(eyeX + eyeW / 2, eyeY);
          ctx.stroke();
        } else {
          // Open eye sclera
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#18181b';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY, eyeW / 2, eyeH / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Directed Pupil
          const pupilRadius = 5.5;
          const maxLookX = (eyeW / 2 - pupilRadius) * 0.75;
          const maxLookY = (eyeH / 2 - pupilRadius) * 0.75;
          const pupilX = eyeX + look.x * maxLookX;
          const pupilY = eyeY + look.y * maxLookY;

          ctx.fillStyle = '#18181b';
          ctx.beginPath();
          ctx.arc(pupilX, pupilY, pupilRadius, 0, Math.PI * 2);
          ctx.fill();

          // Catchlight sparkle (single clean dot)
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(pupilX - 1.8, pupilY - 1.8, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 5. Minimalist Nose
      ctx.strokeStyle = 'rgba(24, 24, 27, 0.4)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(4, 22);
      ctx.lineTo(-2, 24);
      ctx.stroke();

      // 6. Mouth / Speech Visemes
      const mouthY = 46;
      ctx.save();
      ctx.translate(0, mouthY);

      if (mouthState === 'gasp') {
        // Open oval of shock/disbelief
        ctx.fillStyle = '#18181b';
        ctx.beginPath();
        ctx.ellipse(0, 0, 10, 16, 0, 0, Math.PI * 2);
        ctx.fill();
        // Inner tongue detail
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.ellipse(0, 8, 7, 5, 0, 0, Math.PI);
        ctx.fill();
      } else if (mouthState === 'talk' && talkWeight > 0.05) {
        // Phonetic mouth pulsing with voice cadence
        const mw = 14 + talkWeight * 14;
        const mh = 4 + talkWeight * 16;
        ctx.fillStyle = '#18181b';
        ctx.beginPath();
        ctx.roundRect(-mw / 2, -mh / 2, mw, mh, [mh / 2]);
        ctx.fill();

        // Upper teeth line
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-mw * 0.35, -mh / 2, mw * 0.7, Math.min(4, mh * 0.4));
      } else if (emotion === 'worried' || mouthState === 'tight') {
        // Tense horizontal squiggly line
        ctx.strokeStyle = '#18181b';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(-14, 0);
        ctx.lineTo(-4, -2);
        ctx.lineTo(4, 1);
        ctx.lineTo(14, -1);
        ctx.stroke();
      } else if (emotion === 'relieved') {
        // Gentle relaxed smile
        ctx.strokeStyle = '#18181b';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(0, -6, 16, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();
      } else {
        // Neutral clean line
        ctx.strokeStyle = '#18181b';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(-12, 0);
        ctx.lineTo(12, 0);
        ctx.stroke();
      }
      ctx.restore();

      // 7. Accessory (Glasses for Dev, Earring for Laura)
      if (gender === 'female') {
        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.arc(-headW / 2 - 2, 10, 5, 0, Math.PI * 2);
        ctx.arc(headW / 2 + 2, 10, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  };

  global.RigFace = Face;
})(typeof window !== 'undefined' ? window : global);
