// Component: stage_3d_scene
// 3D Mascot Engine: Features a charismatic, cute 3D tech robot ("Astro/Pixar style")
// Expressive digital eyes, real skeletal animations (Wave, Jump, ThumbsUp, No, Idle),
// sleek ceramic & titanium materials, dynamic alert lighting, and kinetic 2D overlays.

window.registerComponent('stage_3d_scene', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-stage-3d-scene" style="position: absolute; top: 0; left: 0; width: 1080px; height: 1920px; overflow: hidden;">
        <canvas id="threeStageCanvas" width="1080" height="1920" style="position: absolute; top: 0; left: 0; width: 1080px; height: 1920px; z-index: 1;"></canvas>
        <canvas id="overlayStageCanvas" width="1080" height="1920" style="position: absolute; top: 0; left: 0; width: 1080px; height: 1920px; z-index: 2; pointer-events: none;"></canvas>
      </div>
    `;

    this.threeCanvas = container.querySelector('#threeStageCanvas');
    this.overlayCanvas = container.querySelector('#overlayStageCanvas');
    this.overlayCtx = this.overlayCanvas.getContext('2d');

    const THREE = window.THREE;
    if (!THREE) {
      console.error('Three.js not loaded!');
      return Promise.resolve();
    }

    // 1. Setup Three.js Scene & Camera
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060609);

    this.camera = new THREE.PerspectiveCamera(32, 1080 / 1920, 0.1, 100);
    this.camera.position.set(0, 1.7, 5.6);
    this.camera.lookAt(0, 1.15, 0);

    // 2. WebGL Renderer with High-End Tone Mapping
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.threeCanvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(1080, 1920);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;

    // 3. Cinematic 3-Point Studio Lighting
    this.ambientLight = new THREE.AmbientLight(0x1a1a24, 1.5);
    this.scene.add(this.ambientLight);

    this.keyLight = new THREE.DirectionalLight(0xfff5ea, 2.8);
    this.keyLight.position.set(-2, 4, 3);
    this.scene.add(this.keyLight);

    this.fillLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    this.fillLight.position.set(3, 2, 2);
    this.scene.add(this.fillLight);

    this.rimLight = new THREE.DirectionalLight(0xfbbf24, 4.0);
    this.rimLight.position.set(0, 3, -3);
    this.scene.add(this.rimLight);

    // 4. Glowing Stage Pedestal
    const pedestalGeo = new THREE.CylinderGeometry(1.4, 1.6, 0.22, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x111116,
      roughness: 0.3,
      metalness: 0.8
    });
    this.pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    this.pedestal.position.set(0, 0.1, 0);
    this.scene.add(this.pedestal);

    const ringGeo = new THREE.TorusGeometry(1.42, 0.025, 16, 64);
    this.ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    this.ring = new THREE.Mesh(ringGeo, this.ringMat);
    this.ring.rotation.x = Math.PI / 2;
    this.ring.position.set(0, 0.21, 0);
    this.scene.add(this.ring);

    // 5. Load Cute Mascot Robot
    this.isLoaded = false;
    this.robot = null;
    this.mixer = null;
    this.headMesh = null;
    this.eyeMaterial = null;

    const loader = new THREE.GLTFLoader();
    const draco = new THREE.DRACOLoader();
    draco.setDecoderPath('lib/draco/');
    loader.setDRACOLoader(draco);

    this.loadingPromise = new Promise((resolve, reject) => {
      loader.load('../assets/models/RobotExpressive.glb', (gltf) => {
        this.robot = gltf.scene;
        this.robot.scale.setScalar(0.36);
        this.robot.position.set(-0.45, 0.2, 0);
        this.robot.rotation.y = 0.22;

        // Apply sleek ceramic white & titanium materials
        this.robot.traverse(child => {
          if (child.isMesh && child.material) {
            if (child.material.name === 'Main') {
              child.material = new THREE.MeshStandardMaterial({
                color: 0xf4f4f5, // Porcelain white
                roughness: 0.18,
                metalness: 0.15
              });
            } else if (child.material.name === 'Grey') {
              child.material = new THREE.MeshStandardMaterial({
                color: 0x181822, // Dark titanium
                roughness: 0.35,
                metalness: 0.85
              });
            } else if (child.material.name === 'Black') {
              // Glowing cyber eyes
              this.eyeMaterial = new THREE.MeshStandardMaterial({
                color: 0x09090e,
                emissive: 0x38bdf8,
                emissiveIntensity: 1.2,
                roughness: 0.1
              });
              child.material = this.eyeMaterial;
            }

            if (child.morphTargetDictionary && child.morphTargetDictionary['Surprised'] !== undefined) {
              this.headMesh = child;
            }
          }
        });

        this.scene.add(this.robot);

        // Bind animation mixer
        this.mixer = new THREE.AnimationMixer(this.robot);
        this.animations = gltf.animations;

        // Choose animation clip
        const clipName = props.clip === 'shock' ? 'Jump' :
                         props.clip === 'success' ? 'ThumbsUp' :
                         props.clip === 'warning' ? 'No' :
                         props.clip === 'wave' ? 'Wave' : 'Idle';

        const clip = this.animations.find(a => a.name === clipName) || this.animations[0];
        this.activeAction = this.mixer.clipAction(clip);
        this.activeAction.play();

        this.isLoaded = true;
        resolve();
      }, undefined, reject);
    });

    // 6. Pre-calculate kinetic captions
    const text = props.voiceover || '';
    const duration = props.duration || 5.0;
    if (window.RigCaptions && text) {
      this.timedWords = window.RigCaptions.computeWordTimings(text, 0, duration);
    }

    return this.loadingPromise;
  },

  render(container, t, duration, props, utils) {
    const { clamp, spring } = utils;

    // 1. Advance 3D Animation & Render Mascot
    if (this.mixer && this.isLoaded) {
      this.mixer.setTime(t);

      // Emergency vs Normal mode styling
      const isEmergency = props.isEmergency !== false;
      if (isEmergency) {
        const pulse = Math.sin(t * 10.0) * 0.5 + 0.5;
        if (this.eyeMaterial) {
          this.eyeMaterial.emissive.setHex(0xef4444); // Red panic eyes
          this.eyeMaterial.emissiveIntensity = 0.8 + pulse * 0.8;
        }
        if (this.ringMat) {
          this.ringMat.color.setHex(pulse > 0.5 ? 0xef4444 : 0xb91c1c);
        }
        this.fillLight.color.setHex(0xef4444);
        this.fillLight.intensity = 1.8 + pulse * 1.2;

        // Set Surprised / Shocked expression
        if (this.headMesh) {
          const dict = this.headMesh.morphTargetDictionary;
          const infl = this.headMesh.morphTargetInfluences;
          if (dict.Surprised !== undefined) infl[dict.Surprised] = 1.0;
          if (dict.Sad !== undefined) infl[dict.Sad] = 0.4;
        }
      } else {
        if (this.eyeMaterial) {
          this.eyeMaterial.emissive.setHex(0x38bdf8); // Cyan calm eyes
          this.eyeMaterial.emissiveIntensity = 1.2;
        }
        if (this.ringMat) this.ringMat.color.setHex(0x38bdf8);
        this.fillLight.color.setHex(0x38bdf8);
        this.fillLight.intensity = 1.4;

        if (this.headMesh) {
          const dict = this.headMesh.morphTargetDictionary;
          const infl = this.headMesh.morphTargetInfluences;
          if (dict.Surprised !== undefined) infl[dict.Surprised] = 0.0;
          if (dict.Sad !== undefined) infl[dict.Sad] = 0.0;
        }
      }

      this.renderer.render(this.scene, this.camera);
    }

    // 2. Render 2D Kinetic Layer & Graphic Overlays
    const ctx = this.overlayCtx;
    if (!ctx) return;
    ctx.clearRect(0, 0, 1080, 1920);

    // Top Narrative Hook Header
    if (props.headerText) {
      const sHeader = spring(clamp(t - 0.1, 0, 1) * 2.0, 22, 0.7);
      ctx.save();
      ctx.translate(540, 200);
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

    // Smartphone Alert Notification (Rendered on lower right, next to the mascot)
    if (props.showAlertCard !== false && window.RigProps) {
      const buzzIntensity = t < 1.8 ? (1.8 - t) : 0;
      window.RigProps.drawPhone(ctx, 770, 1140, {
        scale: 1.15,
        rotation: -0.06,
        buzz: buzzIntensity,
        screenContent: 'notification',
        notificationTitle: props.alertTitle || 'ALERTA CHECKOUT',
        notificationText: props.alertText || '47 min sin ventas: $3,520 perdidos',
        notificationCount: 8
      });
    }

    // Synchronized Word-by-Word Captions (Bottom Safe Zone)
    if ((!this.timedWords || this.currentVoiceover !== props.voiceover) && props.voiceover && window.RigCaptions) {
      this.timedWords = window.RigCaptions.computeWordTimings(props.voiceover, 0, duration);
      this.currentVoiceover = props.voiceover;
    }

    if (this.timedWords && window.RigCaptions) {
      window.RigCaptions.render(ctx, this.timedWords, t, {
        y: 1720,
        fontSize: 38,
        activeColor: '#fbbf24',
        accentHighlight: '#ef4444'
      });
    }
  }
});
