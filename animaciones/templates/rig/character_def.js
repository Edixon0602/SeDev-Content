// Character Definition & Vector Body Rendering
// Implements "Editorial Plano" aesthetic: solid geometric silhouettes, tailored clothing, zero gradients

(function(global) {
  const CHARACTERS = {
    laura: {
      id: 'laura',
      name: 'Laura (Founder)',
      gender: 'female',
      skinColor: '#fcd5b8',
      hairColor: '#18181b',
      jacketColor: '#e11d48', // Coral Red blazer
      shirtColor: '#ffffff',
      pantsColor: '#18181b',
      accentColor: '#fbbf24'
    },
    marco: {
      id: 'marco',
      name: 'Marco (CEO / Owner)',
      gender: 'male',
      skinColor: '#f5cba7',
      hairColor: '#27272a',
      jacketColor: '#2563eb', // Royal Navy blazer
      shirtColor: '#f4f4f5',
      pantsColor: '#18181b',
      accentColor: '#38bdf8'
    },
    el_dev: {
      id: 'el_dev',
      name: 'El Dev (Ingeniero / Consultor)',
      gender: 'male',
      skinColor: '#f2c9ac',
      hairColor: '#09090b',
      jacketColor: '#18181b', // Obsidian hoodie
      shirtColor: '#27272a',
      pantsColor: '#09090b',
      accentColor: '#10b981'
    }
  };

  class Character {
    constructor(charId = 'laura', seed = 1337) {
      this.def = CHARACTERS[charId] || CHARACTERS.laura;
      this.skeleton = new global.RigSkeleton();
      this.rng = global.RigRNG ? global.RigRNG.create(seed) : null;
    }

    draw(ctx, rootPos, poseData = {}) {
      const def = this.def;
      const pose = this.skeleton.solvePose(rootPos, poseData.skeletonOverrides || {});
      const emo = poseData.emotion || 'neutral';
      const look = poseData.look || { x: 0, y: 0 };
      const mouth = poseData.mouthState || 'rest';
      const talkWeight = poseData.talkWeight || 0;
      const blink = poseData.blinkProgress || 0;
      const scale = poseData.scale || 1.0;

      ctx.save();
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      // 1. Neck (Drawn first so blazer and shirt collar naturally overlap it)
      ctx.fillStyle = def.skinColor;
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(pose.chest.x - 22, pose.chest.y + 16);
      ctx.lineTo(pose.chest.x + 22, pose.chest.y + 16);
      ctx.lineTo(pose.headBase.x + 18, pose.headBase.y);
      ctx.lineTo(pose.headBase.x - 18, pose.headBase.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // 2. Torso & Jacket / Shirt
      this.drawTorso(ctx, pose, def);

      // 3. Arms & Hands
      this.drawArm(ctx, pose.leftShoulder, pose.leftElbow, pose.leftHand, def, poseData.leftHandItem);
      this.drawArm(ctx, pose.rightShoulder, pose.rightElbow, pose.rightHand, def, poseData.rightHandItem);

      // 4. Head & Expressive Face
      if (global.RigFace) {
        global.RigFace.draw(ctx, pose.headCenter, {
          skinColor: def.skinColor,
          hairColor: def.hairColor,
          accentColor: def.accentColor,
          gender: def.gender,
          emotion: emo,
          look: look,
          mouthState: mouth,
          talkWeight: talkWeight,
          blinkProgress: blink,
          scale: scale
        });
      }

      ctx.restore();
    }

    drawTorso(ctx, pose, def) {
      const topW = 160;
      const botW = 140;
      const h = Math.hypot(pose.chest.x - pose.hip.x, pose.chest.y - pose.hip.y);

      ctx.save();
      ctx.translate(pose.hip.x, pose.hip.y);
      const angle = Math.atan2(pose.chest.y - pose.hip.y, pose.chest.x - pose.hip.x) + Math.PI / 2;
      ctx.rotate(angle);

      // Shirt base
      ctx.fillStyle = def.shirtColor;
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-topW * 0.45, -h);
      ctx.lineTo(topW * 0.45, -h);
      ctx.lineTo(botW * 0.45, 0);
      ctx.lineTo(-botW * 0.45, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Jacket / Blazer Overlay
      ctx.fillStyle = def.jacketColor;
      ctx.beginPath();
      // Left Lapel
      ctx.moveTo(-topW * 0.52, -h);
      ctx.lineTo(-topW * 0.15, -h);
      ctx.lineTo(-topW * 0.1, -h * 0.4);
      ctx.lineTo(-botW * 0.5, 0);
      ctx.lineTo(-botW * 0.52, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right Lapel
      ctx.beginPath();
      ctx.moveTo(topW * 0.52, -h);
      ctx.lineTo(topW * 0.15, -h);
      ctx.lineTo(topW * 0.1, -h * 0.4);
      ctx.lineTo(botW * 0.5, 0);
      ctx.lineTo(botW * 0.52, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Collar V-Neck line
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-topW * 0.15, -h);
      ctx.lineTo(0, -h * 0.55);
      ctx.lineTo(topW * 0.15, -h);
      ctx.stroke();

      ctx.restore();
    }

    drawArm(ctx, shoulder, elbow, hand, def, item = null) {
      const armW = 42;
      const sleeveW = 46;

      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 3;

      // Shoulder round joint
      ctx.fillStyle = def.jacketColor;
      ctx.beginPath();
      ctx.arc(shoulder.x, shoulder.y, sleeveW * 0.48, 0, Math.PI * 2);
      ctx.fill();

      // 1. Upper Arm (Jacket sleeve)
      this.drawLimbSegment(ctx, shoulder, elbow, sleeveW, sleeveW * 0.85);

      // Elbow round joint cap for seamless connection
      ctx.beginPath();
      ctx.arc(elbow.x, elbow.y, sleeveW * 0.42, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 2. Forearm (Jacket sleeve + cuff)
      this.drawLimbSegment(ctx, elbow, hand, sleeveW * 0.85, sleeveW * 0.72);

      // Shirt cuff accent
      ctx.fillStyle = def.shirtColor;
      ctx.beginPath();
      const angle = Math.atan2(hand.y - elbow.y, hand.x - elbow.x);
      ctx.arc(hand.x - Math.cos(angle) * 8, hand.y - Math.sin(angle) * 8, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 3. Hand (Stylized 4-finger geometric glove/hand)
      ctx.fillStyle = def.skinColor;
      ctx.beginPath();
      ctx.arc(hand.x, hand.y, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Thumb / Finger grip indication
      ctx.fillStyle = def.skinColor;
      ctx.beginPath();
      ctx.arc(hand.x + Math.cos(angle + 0.8) * 14, hand.y + Math.sin(angle + 0.8) * 14, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    drawLimbSegment(ctx, p1, p2, w1, w2) {
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
      const perp = angle + Math.PI / 2;

      const p1a = { x: p1.x + Math.cos(perp) * (w1 / 2), y: p1.y + Math.sin(perp) * (w1 / 2) };
      const p1b = { x: p1.x - Math.cos(perp) * (w1 / 2), y: p1.y - Math.sin(perp) * (w1 / 2) };
      const p2a = { x: p2.x + Math.cos(perp) * (w2 / 2), y: p2.y + Math.sin(perp) * (w2 / 2) };
      const p2b = { x: p2.x - Math.cos(perp) * (w2 / 2), y: p2.y - Math.sin(perp) * (w2 / 2) };

      ctx.beginPath();
      ctx.moveTo(p1a.x, p1a.y);
      ctx.lineTo(p2a.x, p2a.y);
      ctx.lineTo(p2b.x, p2b.y);
      ctx.lineTo(p1b.x, p1b.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }

  global.RigCharacter = Character;
  global.RigCharactersCatalog = CHARACTERS;
})(typeof window !== 'undefined' ? window : global);
