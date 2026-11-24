// 2D Skeleton Hierarchy & 2-Bone Analytical Inverse Kinematics (IK)
// Ensures characters can interact deterministically with props (phones, desks, laptops)

(function(global) {
  class Skeleton {
    constructor() {
      // Base anatomical proportions (Editorial stylized ratio: expressive head, lean torso)
      this.boneLengths = {
        torso: 220,
        neck: 45,
        head: 140,
        shoulderWidth: 160,
        upperArm: 140,
        foreArm: 130,
        hand: 55,
        upperLeg: 180,
        lowerLeg: 170,
        foot: 65
      };

      // FK angles (in radians)
      this.angles = {
        rootX: 0,
        rootY: 0,
        spine: 0,
        chest: 0,
        neck: 0,
        headTilt: 0,
        // Arms
        leftShoulder: 0.2,
        leftElbow: 0.3,
        rightShoulder: -0.2,
        rightElbow: -0.3,
        // Legs
        leftHip: 0.1,
        leftKnee: 0.1,
        rightHip: -0.1,
        rightKnee: 0.1
      };
    }

    // Analytical 2-bone IK solver
    // origin: {x, y}, target: {x, y}, l1: upper length, l2: lower length, bend: 1 or -1
    solve2BoneIK(origin, target, l1, l2, bend = 1) {
      const dx = target.x - origin.x;
      const dy = target.y - origin.y;
      const distSq = dx * dx + dy * dy;
      let dist = Math.sqrt(distSq);

      // Max reachable limit (with tiny margin to prevent snapping)
      const maxDist = (l1 + l2) * 0.999;
      if (dist > maxDist) dist = maxDist;
      const minDist = Math.abs(l1 - l2) * 1.01;
      if (dist < minDist) dist = minDist;

      const baseAngle = Math.atan2(dy, dx);

      // Law of cosines
      const cosA = (l1 * l1 + dist * dist - l2 * l2) / (2 * l1 * dist);
      const angleA = Math.acos(Math.max(-1, Math.min(1, cosA)));

      const cosB = (l1 * l1 + l2 * l2 - dist * dist) / (2 * l1 * l2);
      const angleB = Math.acos(Math.max(-1, Math.min(1, cosB)));

      const shoulderAngle = baseAngle + bend * angleA;
      const elbowAngle = shoulderAngle - bend * (Math.PI - angleB);

      const midJoint = {
        x: origin.x + Math.cos(shoulderAngle) * l1,
        y: origin.y + Math.sin(shoulderAngle) * l1
      };

      const endEffector = {
        x: midJoint.x + Math.cos(elbowAngle) * l2,
        y: midJoint.y + Math.sin(elbowAngle) * l2
      };

      return {
        shoulderAngle,
        elbowAngle,
        midJoint,
        endEffector
      };
    }

    // Compute all joint global transforms
    solvePose(root = { x: 0, y: 0 }, overrides = {}) {
      const a = Object.assign({}, this.angles, overrides);
      const b = this.boneLengths;

      // Pelvis / Hip Root
      const hip = { x: root.x + a.rootX, y: root.y + a.rootY };

      // Spine & Chest
      const chest = {
        x: hip.x + Math.sin(a.spine) * b.torso,
        y: hip.y - Math.cos(a.spine) * b.torso
      };

      // Neck & Head
      const headBase = {
        x: chest.x + Math.sin(a.spine + a.chest) * b.neck,
        y: chest.y - Math.cos(a.spine + a.chest) * b.neck
      };

      const headCenter = {
        x: headBase.x + Math.sin(a.spine + a.chest + a.neck + a.headTilt) * (b.head * 0.5),
        y: headBase.y - Math.cos(a.spine + a.chest + a.neck + a.headTilt) * (b.head * 0.5)
      };

      // Shoulders
      const perpX = Math.cos(a.spine + a.chest) * (b.shoulderWidth * 0.5);
      const perpY = Math.sin(a.spine + a.chest) * (b.shoulderWidth * 0.5);

      const leftShoulder = { x: chest.x - perpX, y: chest.y - perpY };
      const rightShoulder = { x: chest.x + perpX, y: chest.y + perpY };

      // Left Arm FK (or IK if target provided in overrides.leftHandTarget)
      let leftElbow, leftHand;
      if (overrides.leftHandTarget) {
        const ik = this.solve2BoneIK(leftShoulder, overrides.leftHandTarget, b.upperArm, b.foreArm, -1);
        leftElbow = ik.midJoint;
        leftHand = ik.endEffector;
      } else {
        const ang1 = a.spine + Math.PI / 2 + a.leftShoulder;
        leftElbow = {
          x: leftShoulder.x + Math.cos(ang1) * b.upperArm,
          y: leftShoulder.y + Math.sin(ang1) * b.upperArm
        };
        const ang2 = ang1 + a.leftElbow;
        leftHand = {
          x: leftElbow.x + Math.cos(ang2) * b.foreArm,
          y: leftElbow.y + Math.sin(ang2) * b.foreArm
        };
      }

      // Right Arm FK (or IK if target provided in overrides.rightHandTarget)
      let rightElbow, rightHand;
      if (overrides.rightHandTarget) {
        const ik = this.solve2BoneIK(rightShoulder, overrides.rightHandTarget, b.upperArm, b.foreArm, 1);
        rightElbow = ik.midJoint;
        rightHand = ik.endEffector;
      } else {
        const ang1 = a.spine + Math.PI / 2 + a.rightShoulder;
        rightElbow = {
          x: rightShoulder.x + Math.cos(ang1) * b.upperArm,
          y: rightShoulder.y + Math.sin(ang1) * b.upperArm
        };
        const ang2 = ang1 + a.rightElbow;
        rightHand = {
          x: rightElbow.x + Math.cos(ang2) * b.foreArm,
          y: rightElbow.y + Math.sin(ang2) * b.foreArm
        };
      }

      return {
        hip,
        chest,
        headBase,
        headCenter,
        leftShoulder,
        rightShoulder,
        leftElbow,
        rightElbow,
        leftHand,
        rightHand
      };
    }
  }

  global.RigSkeleton = Skeleton;
})(typeof window !== 'undefined' ? window : global);
