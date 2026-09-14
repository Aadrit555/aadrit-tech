"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import Image from "next/image";
import { chiptune } from "./audio";
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Trophy,
  Zap,
  CheckCircle2,
  X,
  Crosshair,
} from "lucide-react";

type BallType = "poke" | "great" | "ultra" | "master";

interface BallConfig {
  name: string;
  topColor: number;
  multiplier: number;
  accentColor?: number;
  description: string;
}

const BALL_CONFIGS: Record<BallType, BallConfig> = {
  poke: {
    name: "Poké Ball",
    topColor: 0xee1515,
    multiplier: 1.0,
    description: "Standard field ballistics model (1.0x).",
  },
  great: {
    name: "Great Ball",
    topColor: 0x1d4ed8,
    accentColor: 0xef4444,
    multiplier: 1.6,
    description: "Reinforced matrix with +60% catch rate.",
  },
  ultra: {
    name: "Ultra Ball",
    topColor: 0x18181b,
    accentColor: 0xfacc15,
    multiplier: 2.2,
    description: "High-spec titanium casing (2.2x rate).",
  },
  master: {
    name: "Master Ball",
    topColor: 0x7e22ce,
    accentColor: 0xf43f5e,
    multiplier: 999.0,
    description: "Devon prototype with 100% capture lock.",
  },
};

interface TargetPokemon {
  id: string;
  dexNumber: string;
  name: string;
  type: string;
  difficulty: "Legendary" | "Hard" | "Medium" | "Starter";
  baseCatchRate: number; // 0.0 to 1.0
  points: number;
  spriteUrl: string;
  thumbUrl: string;
  initialPos: [number, number, number];
  size: [number, number]; // width, height in 3D units
  color: number;
}

const TARGETS: TargetPokemon[] = [
  {
    id: "rayquaza",
    dexNumber: "0384",
    name: "Rayquaza",
    type: "Dragon / Flying",
    difficulty: "Legendary",
    baseCatchRate: 0.18,
    points: 1000,
    spriteUrl: "/images/pokemon/rayquaza.png",
    thumbUrl: "/images/pokemon/rayquaza_thumb.png",
    initialPos: [0, 4.2, -14],
    size: [4.2, 4.2],
    color: 0x10b981,
  },
  {
    id: "gastly",
    dexNumber: "0092",
    name: "Gastly",
    type: "Ghost / Poison",
    difficulty: "Medium",
    baseCatchRate: 0.45,
    points: 400,
    spriteUrl: "/images/pokemon/gastly.png",
    thumbUrl: "/images/pokemon/gastly_thumb.png",
    initialPos: [-4.5, 3.2, -10.5],
    size: [2.6, 2.6],
    color: 0xa855f7,
  },
  {
    id: "torchic",
    dexNumber: "0255",
    name: "Torchic",
    type: "Fire",
    difficulty: "Starter",
    baseCatchRate: 0.65,
    points: 250,
    spriteUrl: "/images/pokemon/torchic.png",
    thumbUrl: "/images/pokemon/torchic_thumb.png",
    initialPos: [4.6, 2.4, -9.5],
    size: [2.2, 2.2],
    color: 0xf97316,
  },
  {
    id: "mudkip",
    dexNumber: "0258",
    name: "Mudkip",
    type: "Water",
    difficulty: "Starter",
    baseCatchRate: 0.65,
    points: 250,
    spriteUrl: "/images/pokemon/mudkip.png",
    thumbUrl: "/images/pokemon/mudkip_thumb.png",
    initialPos: [-2.2, 1.8, -7.5],
    size: [2.1, 2.1],
    color: 0x0ea5e9,
  },
  {
    id: "treecko",
    dexNumber: "0252",
    name: "Treecko",
    type: "Grass",
    difficulty: "Starter",
    baseCatchRate: 0.65,
    points: 250,
    spriteUrl: "/images/pokemon/treecko.png",
    thumbUrl: "/images/pokemon/treecko_thumb.png",
    initialPos: [2.4, 2.1, -8.0],
    size: [2.2, 2.2],
    color: 0x22c55e,
  },
];

interface PokedexArcadeGameProps {
  onClose?: () => void;
}

export default function PokedexArcadeGame({ onClose }: PokedexArcadeGameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Game state
  const [selectedBall, setSelectedBall] = useState<BallType>("poke");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [caughtList, setCaughtList] = useState<string[]>([]);
  const [announcement, setAnnouncement] = useState<string>("AIM & LAUNCH TO INITIATE CAPTURE");
  const [announcementType, setAnnouncementType] = useState<"normal" | "success" | "warning">("normal");

  // Three.js internal references
  const gameRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    ballGroup: THREE.Group;
    ballLed: THREE.Mesh;
    trajectoryLine: THREE.Line;
    sprites: Map<string, {
      sprite: THREE.Sprite;
      pedestal: THREE.Mesh;
      basePos: THREE.Vector3;
      speed: number;
      caught: boolean;
      data: TargetPokemon;
    }>;
    particles: THREE.Points;
    particleGeo: THREE.BufferGeometry;
    particlePositions: Float32Array;
    particleVelocities: Float32Array;
    particleLife: Float32Array;
    aimTarget: THREE.Vector2; // -1 to 1 screen coords
    isAiming: boolean;
    ballState: "idle" | "flying" | "bouncing" | "wobbling" | "captured" | "breakout";
    ballVelocity: THREE.Vector3;
    wobbleCount: number;
    wobbleTimer: number;
    targetCaptured: TargetPokemon | null;
    animFrameId: number;
  } | null>(null);

  // Load high score and caught roster from localStorage
  useEffect(() => {
    try {
      const savedHigh = localStorage.getItem("pokedex_high_score");
      if (savedHigh) setHighScore(parseInt(savedHigh, 10));
      const savedCaught = localStorage.getItem("pokedex_caught_species");
      if (savedCaught) setCaughtList(JSON.parse(savedCaught));
    } catch { }
  }, []);

  // Update sound synthesizer state
  useEffect(() => {
    chiptune.enabled = soundEnabled;
  }, [soundEnabled]);

  // Create procedural 3D Pokéball mesh
  const createBallMesh = useCallback((type: BallType) => {
    const config = BALL_CONFIGS[type];
    const group = new THREE.Group();
    const radius = 0.42;

    // Top hemisphere
    const topGeo = new THREE.SphereGeometry(
      radius,
      32,
      16,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2
    );
    const topMat = new THREE.MeshStandardMaterial({
      color: config.topColor,
      metalness: 0.35,
      roughness: 0.25,
    });
    const topMesh = new THREE.Mesh(topGeo, topMat);
    group.add(topMesh);

    // Accent markings (e.g. Great Ball red fins, Ultra Ball yellow strips)
    if (config.accentColor) {
      const accentGeo = new THREE.TorusGeometry(radius * 0.98, 0.04, 16, 32, Math.PI);
      const accentMat = new THREE.MeshStandardMaterial({
        color: config.accentColor,
        metalness: 0.4,
        roughness: 0.2,
      });
      const accentMesh = new THREE.Mesh(accentGeo, accentMat);
      accentMesh.rotation.x = Math.PI / 2;
      accentMesh.position.y = 0.12;
      group.add(accentMesh);
    }

    // Bottom hemisphere (white porcelain)
    const btmGeo = new THREE.SphereGeometry(
      radius,
      32,
      16,
      0,
      Math.PI * 2,
      Math.PI / 2,
      Math.PI / 2
    );
    const btmMat = new THREE.MeshStandardMaterial({
      color: 0xf4f4f5,
      metalness: 0.15,
      roughness: 0.3,
    });
    const btmMesh = new THREE.Mesh(btmGeo, btmMat);
    group.add(btmMesh);

    // Dark metallic central equator band
    const bandGeo = new THREE.CylinderGeometry(radius * 1.01, radius * 1.01, 0.06, 32);
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.8,
      roughness: 0.2,
    });
    const bandMesh = new THREE.Mesh(bandGeo, bandMat);
    group.add(bandMesh);

    // Center release button housing
    const buttonRingGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 24);
    const buttonRingMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.8,
      roughness: 0.3,
    });
    const buttonRing = new THREE.Mesh(buttonRingGeo, buttonRingMat);
    buttonRing.rotation.x = Math.PI / 2;
    buttonRing.position.z = radius * 0.95;
    group.add(buttonRing);

    // Center illuminated LED trigger button
    const buttonCenterGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.09, 24);
    const buttonCenterMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.5,
      roughness: 0.2,
    });
    const buttonCenter = new THREE.Mesh(buttonCenterGeo, buttonCenterMat);
    buttonCenter.rotation.x = Math.PI / 2;
    buttonCenter.position.z = radius * 0.97;
    group.add(buttonCenter);

    return { group, led: buttonCenter };
  }, []);

  // Initialize Three.js 3D Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 540;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090d16);
    scene.fog = new THREE.FogExp2(0x090d16, 0.028);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 4.8);
    camera.lookAt(0, 2.0, -8);

    // 3. Renderer with antialiasing
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // 4. Studio & Hologram Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight.position.set(5, 12, 8);
    scene.add(dirLight);

    // Emerald horizon light for Hoenn theme
    const fieldLight = new THREE.PointLight(0x10b981, 2.5, 30);
    fieldLight.position.set(0, 1.5, -12);
    scene.add(fieldLight);

    // 5. Retro Digital Holographic Grid Floor
    const gridHelper = new THREE.GridHelper(40, 40, 0x059669, 0x1e293b);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // Floor reflector plane
    const floorGeo = new THREE.PlaneGeometry(40, 40);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x060911,
      transparent: true,
      opacity: 0.85,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.01;
    scene.add(floorMesh);

    // 6. Launch platform ring
    const padGeo = new THREE.RingGeometry(0.7, 0.9, 32);
    const padMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const padMesh = new THREE.Mesh(padGeo, padMat);
    padMesh.rotation.x = -Math.PI / 2;
    padMesh.position.set(0, 0.02, 1.2);
    scene.add(padMesh);

    // 7. Aiming Trajectory Line
    const trajectoryGeo = new THREE.BufferGeometry();
    const maxPoints = 50;
    const trajectoryPositions = new Float32Array(maxPoints * 3);
    trajectoryGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(trajectoryPositions, 3)
    );
    const trajectoryMat = new THREE.LineDashedMaterial({
      color: 0xef4444,
      dashSize: 0.3,
      gapSize: 0.15,
      transparent: true,
      opacity: 0.7,
    });
    const trajectoryLine = new THREE.Line(trajectoryGeo, trajectoryMat);
    scene.add(trajectoryLine);

    // 8. 3D Particle Burst System for Catches and Breakouts
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);
    const particleLife = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 1] = -100;
      particleLife[i] = 0;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.18,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 9. Load Real Pokémon Sprites using TextureLoader
    const textureLoader = new THREE.TextureLoader();
    const spriteMap = new Map<
      string,
      {
        sprite: THREE.Sprite;
        pedestal: THREE.Mesh;
        basePos: THREE.Vector3;
        speed: number;
        caught: boolean;
        data: TargetPokemon;
      }
    >();

    TARGETS.forEach((target) => {
      const tex = textureLoader.load(target.spriteUrl);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;

      const spriteMat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        depthTest: true,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(target.size[0], target.size[1], 1);
      sprite.position.set(...target.initialPos);
      scene.add(sprite);

      // Holographic glowing pedestal on the floor under each Pokémon
      const pedGeo = new THREE.RingGeometry(target.size[0] * 0.35, target.size[0] * 0.48, 24);
      const pedMat = new THREE.MeshBasicMaterial({
        color: target.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
      });
      const pedestal = new THREE.Mesh(pedGeo, pedMat);
      pedestal.rotation.x = -Math.PI / 2;
      pedestal.position.set(target.initialPos[0], 0.03, target.initialPos[2]);
      scene.add(pedestal);

      spriteMap.set(target.id, {
        sprite,
        pedestal,
        basePos: new THREE.Vector3(...target.initialPos),
        speed: 0.8 + Math.random() * 0.6,
        caught: false,
        data: target,
      });
    });

    // 10. Create initial Pokéball
    const { group: ballGroup, led: ballLed } = createBallMesh("poke");
    ballGroup.position.set(0, 0.42, 1.2);
    scene.add(ballGroup);

    // Store game instance
    gameRef.current = {
      scene,
      camera,
      renderer,
      ballGroup,
      ballLed,
      trajectoryLine,
      sprites: spriteMap,
      particles,
      particleGeo,
      particlePositions,
      particleVelocities,
      particleLife,
      aimTarget: new THREE.Vector2(0, 0),
      isAiming: false,
      ballState: "idle",
      ballVelocity: new THREE.Vector3(),
      wobbleCount: 0,
      wobbleTimer: 0,
      targetCaptured: null,
      animFrameId: 0,
    };

    // Update trajectory preview
    const updateTrajectory = () => {
      const g = gameRef.current;
      if (!g) return;

      const origin = new THREE.Vector3(0, 0.42, 1.2);
      const targetX = g.aimTarget.x * 6.5;
      const targetY = 2.5 + g.aimTarget.y * 3.0;
      const targetZ = -11;

      // Estimate initial ballistic velocity
      const dt = 1.0;
      const vx = (targetX - origin.x) / dt;
      const vz = (targetZ - origin.z) / dt;
      const vy = (targetY - origin.y + 0.5 * 9.8 * dt * dt) / dt;

      const posArray = g.trajectoryLine.geometry.attributes.position.array as Float32Array;
      const steps = 40;
      const timeStep = dt / steps;

      let cx = origin.x;
      let cy = origin.y;
      let cz = origin.z;
      let cvy = vy;

      for (let i = 0; i < steps; i++) {
        posArray[i * 3] = cx;
        posArray[i * 3 + 1] = cy;
        posArray[i * 3 + 2] = cz;

        cx += vx * timeStep;
        cz += vz * timeStep;
        cvy -= 9.8 * timeStep;
        cy += cvy * timeStep;
      }

      g.trajectoryLine.geometry.attributes.position.needsUpdate = true;
      g.trajectoryLine.computeLineDistances();
    };

    // Resize Handler
    const handleResize = () => {
      if (!container || !gameRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Render Loop (60 FPS)
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const g = gameRef.current;
      if (!g) return;

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Animate hovering Pokémon targets
      g.sprites.forEach((item) => {
        if (!item.caught) {
          const t = currentTime * 0.001 * item.speed;
          item.sprite.position.y = item.basePos.y + Math.sin(t) * 0.35;
          item.sprite.position.x = item.basePos.x + Math.cos(t * 0.6) * 0.4;
          item.pedestal.position.x = item.sprite.position.x;
        }
      });

      // Animate Ball Physics
      if (g.ballState === "flying") {
        g.ballGroup.position.addScaledVector(g.ballVelocity, delta);
        g.ballVelocity.y -= 9.8 * delta; // Gravity
        g.ballGroup.rotation.x += 12 * delta; // Forward spin

        // Collision detection against floating real Pokémon
        g.sprites.forEach((item) => {
          if (item.caught || g.ballState !== "flying") return;

          const dist = g.ballGroup.position.distanceTo(item.sprite.position);
          const hitRadius = item.data.size[0] * 0.45;

          if (dist < hitRadius) {
            // Target Hit!
            chiptune.playHit();
            g.ballState = "bouncing";
            g.targetCaptured = item.data;

            // Trigger absorption animation
            item.sprite.scale.set(0, 0, 0); // Absorb into ball
            item.caught = true;

            // Particle burst at hit point
            triggerParticleBurst(
              item.sprite.position.x,
              item.sprite.position.y,
              item.sprite.position.z,
              item.data.color
            );

            // Bounce ball downward
            g.ballVelocity.set(0, -1.8, -0.5);
            setAnnouncement(`TARGET ACQUIRED: ${item.data.name.toUpperCase()}`);
            setAnnouncementType("warning");
          }
        });

        // Ground collision (floor level is y = 0.42)
        if (g.ballGroup.position.y <= 0.42) {
          g.ballGroup.position.y = 0.42;

          if (g.targetCaptured) {
            // Transition to Wobble phase
            chiptune.playBounce();
            g.ballState = "wobbling";
            g.ballVelocity.set(0, 0, 0);
            g.wobbleCount = 0;
            g.wobbleTimer = 0;
            setAnnouncement(`TESTING MATRIX LOCK-ON...`);
          } else {
            // Missed throw - bounce with friction
            chiptune.playBounce();
            g.ballVelocity.y = Math.abs(g.ballVelocity.y) * 0.42;
            g.ballVelocity.x *= 0.6;
            g.ballVelocity.z *= 0.6;

            if (g.ballVelocity.y < 0.3) {
              // Settle on ground and reset
              g.ballState = "idle";
              resetBallPosition();
              setStreak(0);
              setAnnouncement("TARGET MISSED — RE-CALIBRATING");
              setAnnouncementType("normal");
            }
          }
        }
      } else if (g.ballState === "wobbling") {
        g.wobbleTimer += delta;

        // Flash center LED indicator
        const ledMat = g.ballLed.material as THREE.MeshStandardMaterial;
        ledMat.emissive.setHex(0xef4444);
        ledMat.emissiveIntensity = 0.5 + Math.sin(g.wobbleTimer * 14) * 0.5;

        // Physical left/right tilt wobble
        const wobbleCycle = (g.wobbleTimer % 0.7) / 0.7;
        if (wobbleCycle < 0.5) {
          g.ballGroup.rotation.z = Math.sin(wobbleCycle * Math.PI * 2) * 0.35;
        } else {
          g.ballGroup.rotation.z = 0;
        }

        // Each 0.7s, perform one wobble
        if (g.wobbleTimer >= (g.wobbleCount + 1) * 0.7) {
          g.wobbleCount++;
          chiptune.playWobble();

          if (g.wobbleCount >= 3) {
            // 3 wobbles completed — evaluate capture formula!
            const target = g.targetCaptured!;
            const ballMult = BALL_CONFIGS[selectedBall].multiplier;
            const captureProb = Math.min(target.baseCatchRate * ballMult, 1.0);
            const roll = Math.random();

            if (roll <= captureProb || selectedBall === "master") {
              // SUCCESSFUL CATCH!
              chiptune.playCatchSuccess();
              g.ballState = "captured";
              ledMat.emissive.setHex(0x10b981);
              ledMat.emissiveIntensity = 1.0;

              // Golden star burst
              triggerParticleBurst(
                g.ballGroup.position.x,
                g.ballGroup.position.y + 0.4,
                g.ballGroup.position.z,
                0xfacc15
              );

              // Update scores
              setScore((prev) => {
                const newScore = prev + target.points * (streak + 1);
                setHighScore((oldHigh) => {
                  const highest = Math.max(oldHigh, newScore);
                  try {
                    localStorage.setItem("pokedex_high_score", highest.toString());
                  } catch { }
                  return highest;
                });
                return newScore;
              });

              setStreak((prev) => prev + 1);

              setCaughtList((prev) => {
                if (!prev.includes(target.id)) {
                  const updated = [...prev, target.id];
                  try {
                    localStorage.setItem("pokedex_caught_species", JSON.stringify(updated));
                  } catch { }
                  return updated;
                }
                return prev;
              });

              setAnnouncement(`${target.name.toUpperCase()} REGISTERED IN DEX!`);
              setAnnouncementType("success");

              setTimeout(() => {
                resetBallPosition();
                respawnTarget(target.id);
              }, 2200);
            } else {
              // BREAKOUT!
              chiptune.playBreakout();
              g.ballState = "breakout";
              ledMat.emissive.setHex(0x3f3f46);

              // Red puff particle burst
              triggerParticleBurst(
                g.ballGroup.position.x,
                g.ballGroup.position.y + 0.3,
                g.ballGroup.position.z,
                0xef4444
              );

              // Respawn Pokémon target
              respawnTarget(target.id);
              setStreak(0);
              setAnnouncement(`${target.name.toUpperCase()} BROKE FREE!`);
              setAnnouncementType("warning");

              setTimeout(() => {
                resetBallPosition();
              }, 1400);
            }
          }
        }
      }

      // Update Particle Physics
      const pPos = g.particlePositions;
      const pVel = g.particleVelocities;
      const pLife = g.particleLife;

      for (let i = 0; i < particleCount; i++) {
        if (pLife[i] > 0) {
          pLife[i] -= delta * 1.5;
          pPos[i * 3] += pVel[i * 3] * delta;
          pPos[i * 3 + 1] += pVel[i * 3 + 1] * delta;
          pPos[i * 3 + 2] += pVel[i * 3 + 2] * delta;
          pVel[i * 3 + 1] -= 3.5 * delta; // particle gravity
        } else {
          pPos[i * 3 + 1] = -100;
        }
      }
      g.particleGeo.attributes.position.needsUpdate = true;

      // Render
      renderer.render(scene, camera);
      g.animFrameId = requestAnimationFrame(animate);
    };

    // Helper: Trigger 3D Particle Burst
    const triggerParticleBurst = (x: number, y: number, z: number, colorHex: number) => {
      const g = gameRef.current;
      if (!g) return;

      const pPos = g.particlePositions;
      const pVel = g.particleVelocities;
      const pLife = g.particleLife;

      (g.particles.material as THREE.PointsMaterial).color.setHex(colorHex);

      for (let i = 0; i < 40; i++) {
        pPos[i * 3] = x;
        pPos[i * 3 + 1] = y;
        pPos[i * 3 + 2] = z;

        pLife[i] = 1.0;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const speed = 2.5 + Math.random() * 3.5;

        pVel[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
        pVel[i * 3 + 1] = Math.cos(phi) * speed + 1.2;
        pVel[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * speed;
      }
      g.particleGeo.attributes.position.needsUpdate = true;
    };

    // Helper: Reset Ball to Launch Pad
    const resetBallPosition = () => {
      const g = gameRef.current;
      if (!g) return;
      g.ballGroup.position.set(0, 0.42, 1.2);
      g.ballGroup.rotation.set(0, 0, 0);
      g.ballVelocity.set(0, 0, 0);
      g.ballState = "idle";
      g.targetCaptured = null;
      (g.ballLed.material as THREE.MeshStandardMaterial).emissive.setHex(0xffffff);
      (g.ballLed.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5;
    };

    // Helper: Respawn Pokémon target sprite
    const respawnTarget = (id: string) => {
      const g = gameRef.current;
      if (!g) return;
      const item = g.sprites.get(id);
      if (item) {
        item.caught = false;
        item.sprite.scale.set(item.data.size[0], item.data.size[1], 1);
        item.sprite.position.copy(item.basePos);
      }
    };

    updateTrajectory();
    if (gameRef.current) {
      gameRef.current.animFrameId = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (gameRef.current) {
        cancelAnimationFrame(gameRef.current.animFrameId);
        renderer.dispose();
      }
    };
  }, [createBallMesh, selectedBall, streak]);

  // Handle Ball Type Switch
  const handleSelectBall = (type: BallType) => {
    setSelectedBall(type);
    const g = gameRef.current;
    if (!g || g.ballState !== "idle") return;

    g.scene.remove(g.ballGroup);
    const { group: newGroup, led: newLed } = createBallMesh(type);
    newGroup.position.copy(g.ballGroup.position);
    g.scene.add(newGroup);
    g.ballGroup = newGroup;
    g.ballLed = newLed;
  };

  // Launch the Pokéball
  const launchBall = useCallback(() => {
    const g = gameRef.current;
    if (!g || g.ballState !== "idle") return;

    chiptune.playThrow();

    const origin = g.ballGroup.position;
    const targetX = g.aimTarget.x * 6.5;
    const targetY = 2.5 + g.aimTarget.y * 3.0;
    const targetZ = -11;

    const dt = 1.0;
    const vx = (targetX - origin.x) / dt;
    const vz = (targetZ - origin.z) / dt;
    const vy = (targetY - origin.y + 0.5 * 9.8 * dt * dt) / dt;

    g.ballVelocity.set(vx, vy, vz);
    g.ballState = "flying";
    setAnnouncement(`LAUNCHED ${BALL_CONFIGS[selectedBall].name.toUpperCase()}!`);
    setAnnouncementType("normal");
  }, [selectedBall]);

  // Pointer / Touch Aiming
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    const g = gameRef.current;
    if (!rect || !g) return;

    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const nx = (clientX / rect.width) * 2 - 1;
    const ny = -((clientY / rect.height) * 2 - 1);

    g.aimTarget.set(nx, Math.max(-0.4, Math.min(ny, 0.8)));

    // Recalculate trajectory arc
    const origin = new THREE.Vector3(0, 0.42, 1.2);
    const targetX = g.aimTarget.x * 6.5;
    const targetY = 2.5 + g.aimTarget.y * 3.0;
    const targetZ = -11;

    const dt = 1.0;
    const vx = (targetX - origin.x) / dt;
    const vz = (targetZ - origin.z) / dt;
    const vy = (targetY - origin.y + 0.5 * 9.8 * dt * dt) / dt;

    const posArray = g.trajectoryLine.geometry.attributes.position.array as Float32Array;
    const steps = 40;
    const timeStep = dt / steps;

    let cx = origin.x;
    let cy = origin.y;
    let cz = origin.z;
    let cvy = vy;

    for (let i = 0; i < steps; i++) {
      posArray[i * 3] = cx;
      posArray[i * 3 + 1] = cy;
      posArray[i * 3 + 2] = cz;

      cx += vx * timeStep;
      cz += vz * timeStep;
      cvy -= 9.8 * timeStep;
      cy += cvy * timeStep;
    }

    g.trajectoryLine.geometry.attributes.position.needsUpdate = true;
    g.trajectoryLine.computeLineDistances();
  };

  // Keyboard Spacebar Trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        launchBall();
      } else if (e.code === "Escape" && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [launchBall, onClose]);

  const handleResetGame = () => {
    setScore(0);
    setStreak(0);
    const g = gameRef.current;
    if (!g) return;

    g.sprites.forEach((item) => {
      item.caught = false;
      item.sprite.scale.set(item.data.size[0], item.data.size[1], 1);
      item.sprite.position.copy(item.basePos);
    });

    g.ballGroup.position.set(0, 0.42, 1.2);
    g.ballGroup.rotation.set(0, 0, 0);
    g.ballVelocity.set(0, 0, 0);
    g.ballState = "idle";
    g.targetCaptured = null;
    setAnnouncement("SIMULATION MATRIX RESET");
    setAnnouncementType("normal");
  };

  return (
    <div className="w-full flex flex-col rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden text-zinc-100 font-mono select-none">
      {/* Top Telemetry HUD */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-zinc-900/95 border-b border-zinc-800 text-xs gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          <span className="font-bold text-zinc-200">DEVON CORP. // 3D CATCH LAB</span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 text-[10px]">
            REAL POKÉMON FIELD TEST
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Score & Streak */}
          <div className="flex items-center gap-3 px-3 py-1 rounded bg-zinc-950 border border-zinc-800 text-xs">
            <span className="flex items-center gap-1 text-amber-400">
              <Trophy className="w-3.5 h-3.5" />
              <span>{score}</span>
            </span>
            <span className="text-zinc-600">|</span>
            <span className="flex items-center gap-1 text-cyan-400">
              <Zap className="w-3.5 h-3.5" />
              <span>x{streak}</span>
            </span>
            <span className="hidden md:inline-block text-zinc-500 text-[10px]">
              BEST: {highScore}
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
            title={soundEnabled ? "Mute chiptune synthesizer" : "Enable sound"}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
            )}
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={handleResetGame}
            className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Close Modal Button */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 rounded bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800 text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
              title="Close Simulation Chamber"
            >
              <X className="w-3.5 h-3.5" />
              <span>Close</span>
            </button>
          )}
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        className="relative w-full h-[420px] sm:h-[500px] md:h-[560px] bg-[#090d16] overflow-hidden cursor-crosshair"
      >
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onClick={launchBall}
          className="w-full h-full block"
        />

        {/* Dynamic Holographic Announcement Banner */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 text-center">
          <div
            className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider backdrop-blur-md border shadow-lg transition-all ${
              announcementType === "success"
                ? "bg-emerald-950/90 text-emerald-300 border-emerald-500 animate-bounce"
                : announcementType === "warning"
                ? "bg-amber-950/90 text-amber-300 border-amber-500"
                : "bg-zinc-900/80 text-zinc-300 border-zinc-700/80"
            }`}
          >
            {announcement}
          </div>
        </div>

        {/* Central Aiming Reticle Hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-[11px] text-zinc-400">
          <Crosshair className="w-3 h-3 text-emerald-400 animate-spin duration-3000" />
          <span>Click viewport or press Space to launch</span>
        </div>
      </div>

      {/* Tactical Controller Footer */}
      <div className="p-4 bg-zinc-900/95 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Ball Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-zinc-500 font-bold uppercase mr-1 hidden sm:inline">
            BALLISTICS:
          </span>
          {(Object.keys(BALL_CONFIGS) as BallType[]).map((type) => {
            const isSelected = selectedBall === type;
            const cfg = BALL_CONFIGS[type];
            return (
              <button
                key={type}
                type="button"
                onClick={() => handleSelectBall(type)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isSelected
                    ? "bg-zinc-100 text-zinc-950 border-white shadow-sm"
                    : "bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 border-zinc-700"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: `#${cfg.topColor.toString(16).padStart(6, "0")}` }}
                />
                <span>{cfg.name}</span>
                <span className="text-[10px] opacity-75">
                  {type === "master" ? "100%" : `${cfg.multiplier}x`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Big Launch Button */}
        <button
          type="button"
          onClick={launchBall}
          className="w-full md:w-auto px-6 py-2 rounded-md bg-[#dc2626] hover:bg-[#b91c1c] active:scale-95 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>FIRE POKÉ BALL [SPACE]</span>
        </button>
      </div>

      {/* Real Pokémon Roster Strip */}
      <div className="px-4 py-2.5 bg-zinc-950 border-t border-zinc-850 flex flex-wrap items-center justify-between text-[11px] text-zinc-400 gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-zinc-300">REGISTERED TARGETS:</span>
          <div className="flex flex-wrap items-center gap-2">
            {TARGETS.map((t) => {
              const isCaught = caughtList.includes(t.id);
              return (
                <span
                  key={t.id}
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border transition-colors ${
                    isCaught
                      ? "bg-emerald-950/60 border-emerald-700 text-emerald-300 font-bold"
                      : "bg-zinc-900 border-zinc-800 text-zinc-500"
                  }`}
                >
                  <Image
                    src={t.thumbUrl}
                    alt=""
                    width={18}
                    height={18}
                    className="w-4 h-4 object-contain pixelated"
                    unoptimized
                  />
                  <span>{t.name}</span>
                  {isCaught && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                </span>
              );
            })}
          </div>
        </div>

        <div className="text-[10px] text-zinc-500">
          Aim with cursor · Space to throw · Esc to close
        </div>
      </div>
    </div>
  );
}
