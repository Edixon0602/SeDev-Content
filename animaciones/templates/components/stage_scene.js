// Component: stage_scene
// Combines Animated Character Rig, Vector Props, Environments, and Kinetic Subtitles

window.registerComponent('stage_scene', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-stage-scene">
        <canvas id="stageSceneCanvas" width="1080" height="1920"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#stageSceneCanvas');
    this.ctx = this.canvas.getContext('2d');

    // Create character instance
    const charId = props.character || 'laura';
    const seed = props.seed || 'sedev_b2b_demo';
    this.character = new window.RigCharacter(charId, seed);

    // Pre-calculate timed words for captions
    const text = props.voiceover || '';
    const duration = props.duration || 5.0;
    if (window.RigCaptions && text) {
      this.timedWords = window.RigCaptions.computeWordTimings(text, 0, duration);
    }
  },

  render(container, t, duration, props, utils) {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.clearRect(0, 0, 1080, 1920);

    const { clamp, spring } = utils;
    const tl = window.RigTimeline;

    // Ensure captions are computed if voiceover provided in props
    if ((!this.timedWords || this.currentVoiceover !== props.voiceover) && props.voiceover && window.RigCaptions) {
      this.timedWords = window.RigCaptions.computeWordTimings(props.voiceover, 0, duration);
      this.currentVoiceover = props.voiceover;
    }

    // 1. Draw Set / Background
    const setType = props.set || 'oficina_noche';
    window.RigSets.draw(ctx, 1080, 1920, t, setType);

    // 2. Character Animation (Quantized on Twos at 12fps)
    const tTwos = tl.twos(t, 12);
    const clipType = props.clip || 'wake_jolt';

    let pose = {};
    const phonePos = { x: 740, y: 1140 };

    if (clipType === 'wake_jolt') {
      pose = window.RigClips.wakeJolt(tTwos, duration);
    } else if (clipType === 'check_phone') {
      pose = window.RigClips.checkPhone(tTwos, { phonePos });
    } else if (clipType === 'talk') {
      pose = window.RigClips.talk(tTwos, {
        emotion: props.emotion || 'worried',
        talkWeight: Math.abs(Math.sin(t * 8.0))
      });
    } else {
      pose = window.RigClips.idle(tTwos);
    }

    // Custom overrides if specified in props
    if (props.emotion) pose.emotion = props.emotion;

    // 3. Draw Character (Seated behind desk on left side, facing work area)
    const charRoot = { x: 420, y: 1240 };
    this.character.draw(ctx, charRoot, pose);

    // 4. Draw Props (Desk Surface + Smartphone resting on right side)
    const deskY = 1260;
    window.RigProps.drawDesk(ctx, deskY, { deskColor: '#0e0e13', edgeColor: '#27272a' });

    // Draw Smartphone angled slightly towards Laura on desk
    if (props.showPhone !== false) {
      const buzzIntensity = t < 1.8 ? (1.8 - t) : 0;
      window.RigProps.drawPhone(ctx, phonePos.x, phonePos.y, {
        scale: 1.15,
        rotation: -0.06,
        buzz: buzzIntensity,
        screenContent: 'notification',
        notificationTitle: props.alertTitle || 'ALERTA CHECKOUT',
        notificationText: props.alertText || '47 min sin ventas: $3,520 perdidos',
        notificationCount: 8
      });
    }

    // 5. Draw Top Narrative Hook Header (Clean, Zero AI-Slop)
    if (props.headerText) {
      const sHeader = spring(clamp(t - 0.1, 0, 1) * 2.0, 22, 0.7);
      ctx.save();
      ctx.translate(540, 220);
      ctx.scale(sHeader, sHeader);

      ctx.fillStyle = '#f87171';
      ctx.font = '800 24px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(props.headerCategory || 'INCIDENTE DE PRODUCCIÓN', 0, 0);

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 62px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(props.headerText, 0, 72);

      if (props.headerStat) {
        ctx.fillStyle = '#ef4444';
        ctx.font = '800 36px "JetBrains Mono", monospace';
        ctx.fillText(props.headerStat, 0, 134);
      }
      ctx.restore();
    }

    // 6. Draw Synchronized Word-by-Word Captions (Bottom Safe Zone)
    if (props.voiceover && this.timedWords) {
      window.RigCaptions.render(ctx, this.timedWords, t, {
        y: 1720,
        fontSize: 36,
        activeColor: '#fbbf24',
        accentHighlight: '#ef4444'
      });
    }
  }
});
