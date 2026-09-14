"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { chiptune } from "./audio";
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Trophy,
  Target,
  Zap,
  Info,
  CheckCircle2,
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
    description: "Standard issue Devon Corp ballistics model.",
  },
  great: {
    name: "Great Ball",
    topColor: 0x1d4ed8,
    accentColor: 0xef4444,
    multiplier: 1.5,
    description: "Reinforced chassis with +50% capture probability.",
  },
  ultra: {
    name: "Ultra Ball",
    topColor: 0x18181b,
    accentColor: 0xfacc15,
    multiplier: 2.0,
    description: "High-spec titanium casing with 2x field capture rate.",
  },
  master: {
    name: "Master Ball",
    topColor: 0x7e22ce,
    accentColor: 0xf43f5e,
    multiplier: 999.0,
    description: "Prototype Devon capture matrix with guaranteed lock-on.",
  },
};

interface TargetPokemon {
  id: string;
  name: string;
  dexNumber: string;
  color: number;
  ringColor: number;
  radius: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  speed: number;
  pattern: "lissajous" | "sine" | "bounce" | "circle";
  points: number;
  catchRate: number;
}

const TARGETS: TargetPokemon[] = [
  {
    id: "rayquaza",
    name: "Rayquaza",
    dexNumber: "0384",
    color: 0x059669,
    ringColor: 0xf59e0b,
    radius: 0.65,
    baseX: 0,
    baseY: 3.2,
    baseZ: -16,
    speed: 1.6,
    pattern: "lissajous",
    points: 300,
    catchRate: 0.38,
  },
  {
    id: "gastly",
    name: "Gastly",
    dexNumber: "0092",
    color: 0x581c87,
    ringColor: 0xa855f7,
    radius: 0.5,
    baseX: -4.5,
    baseY: 2.6,
    baseZ: -13,
    speed: 1.2,
    pattern: "sine",
    points: 150,
    catchRate: 0.65,
  },
  {
    id: "torchic",
    name: "Torchic",
    dexNumber: "0255",
    color: 0xea580c,
    ringColor: 0xfbbf24,
    radius: 0.42,
    baseX: 4.2,
    baseY: 1.8,
    baseZ: -11,
    speed: 1.8,
    pattern: "bounce",
    points: 100,
    catchRate: 0.85,
  },
  {
    id: "mudkip",
    name: "Mudkip",
    dexNumber: "0258",
    color: 0x0284c7,
    ringColor: 0xf97316,
    radius: 0.42,
    baseX: -2.2,
    baseY: 1.5,
    baseZ: -9,
    speed: 1.4,
    pattern: "circle",
    points: 100,
    catchRate: 0.85,
  },
  {
    id: "treecko",
    name: "Treecko",
    dexNumber: "0252",
    color: 0x16a34a,
    ringColor: 0xef4444,
    radius: 0.42,
    baseX: 2.5,
    baseY: 2.2,
    baseZ: -12,
    speed: 1.3,
    pattern: "sine",
    points: 100,
    catchRate: 0.85,
  },
];

export default function PokedexArcadeGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // UI State
  const [selectedBall, setSelectedBall] = useState<BallType>("poke");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [caughtList, setCaughtList] = useState<string[]>([]);
  const [gameMessage, setGameMessage] = useState<string>("AIM & DRAG OR PRESS SPACE TO LAUNCH");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isAiming, setIsAiming] = useState(true);

  // References for Three.js scene & animation loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isIntersectingRef = useRef<boolean>(true);

  // Game objects & physics refs
  const pokeBallGroupRef = useRef<THREE.Group | null>(null);
  const ballTopMeshRef = useRef<THREE.Mesh | null>(null);
  const buttonCoreMeshRef = useRef<THREE.Mesh | null>(null);
  const ballShadowMeshRef = useRef<THREE.Mesh | null>(null);
  const targetMeshesRef = useRef<{ mesh: THREE.Group; data: TargetPokemon }[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);
  const particlePositionsRef = useRef<Float32Array | null>(null);
  const particleVelocitiesRef = useRef<Float32Array | null>(null);

  // Physics state
  const ballStateRef = useRef<"IDLE" | "THROWN" | "HIT" | "BOUNCING" | "WOBBLING" | "RESULT">("IDLE");
  const ballPosRef = useRef({ x: 0, y: 0.8, z: 2.2 });
  const ballVelRef = useRef({ x: 0, y: 0, z: 0 });
  const hitTargetRef = useRef<TargetPokemon | null>(null);
  const wobbleStepRef = useRef(0);
  const wobbleTimeRef = useRef(0);

  // Drag interaction
  const dragStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const aimAngleRef = useRef({ x: 0, y: 0 });

  // Load high score from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pokedex_arcade_highscore");
      if (saved) setHighScore(parseInt(saved, 10));
    } catch { }
  }, []);

  const updateScore = useCallback((pts: number) => {
    setScore((prev) => {
      const next = prev + pts;
      setHighScore((curHigh) => {
        const higher = Math.max(curHigh, next);
        try {
          localStorage.setItem("pokedex_arcade_highscore", higher.toString());
        } catch { }
        return higher;
      });
      return next;
    });
  }, []);

  const resetBall = useCallback(() => {
    ballStateRef.current = "IDLE";
    ballPosRef.current = { x: 0, y: 0.8, z: 2.2 };
    ballVelRef.current = { x: 0, y: 0, z: 0 };
    hitTargetRef.current = null;
    wobbleStepRef.current = 0;
    wobbleTimeRef.current = 0;

    if (pokeBallGroupRef.current) {
      pokeBallGroupRef.current.position.set(0, 0.8, 2.2);
      pokeBallGroupRef.current.rotation.set(0, 0, 0);
      pokeBallGroupRef.current.scale.set(1, 1, 1);
    }
    if (ballShadowMeshRef.current) {
      ballShadowMeshRef.current.position.set(0, 0.02, 2.2);
      ballShadowMeshRef.current.scale.set(1, 1, 1);
      (ballShadowMeshRef.current.material as THREE.MeshBasicMaterial).opacity = 0.4;
    }
    if (buttonCoreMeshRef.current) {
      (buttonCoreMeshRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(0xffffff);
      (buttonCoreMeshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.8;
    }

    setIsAiming(true);
    setGameMessage("AIM & FLICK / DRAG OR PRESS SPACE TO LAUNCH");
  }, []);

  // Throw ball physics trigger
  const throwBall = useCallback(
    (vx: number, vy: number, vz: number) => {
      if (ballStateRef.current !== "IDLE") return;

      ballStateRef.current = "THROWN";
      ballVelRef.current = { x: vx, y: vy, z: vz };
      setIsAiming(false);
      setGameMessage("POKÉ BALL IN FLIGHT...");
      chiptune.playThrow();
    },
    []
  );

  // Fire with default keyboard/button power
  const launchDefault = useCallback(() => {
    if (ballStateRef.current !== "IDLE") return;
    const vx = aimAngleRef.current.x * 2.8;
    const vy = 5.6 + aimAngleRef.current.y * 1.8;
    const vz = -14.5;
    throwBall(vx, vy, vz);
  }, [throwBall]);

  // Spawn particle burst at position
  const triggerParticles = useCallback((pos: { x: number; y: number; z: number }, colorHex: number) => {
    const pPos = particlePositionsRef.current;
    const pVel = particleVelocitiesRef.current;
    const pts = particlesRef.current;
    if (!pPos || !pVel || !pts) return;

    (pts.material as THREE.PointsMaterial).color.setHex(colorHex);

    const count = pPos.length / 3;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      pPos[idx] = pos.x;
      pPos[idx + 1] = pos.y;
      pPos[idx + 2] = pos.z;

      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4.5;
      pVel[idx] = Math.cos(angle) * speed;
      pVel[idx + 1] = (Math.random() - 0.2) * speed * 1.2;
      pVel[idx + 2] = Math.sin(angle) * speed;
    }
    pts.geometry.attributes.position.needsUpdate = true;
  }, []);

  // Build Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = Math.min(520, Math.max(340, Math.round(width * 0.58)));

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090d16);
    scene.fog = new THREE.FogExp2(0x090d16, 0.035);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 4.8);
    camera.lookAt(0, 2.2, -6);
    cameraRef.current = camera;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // 3. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(5, 12, 6);
    scene.add(dirLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 1.5, 25);
    cyanLight.position.set(0, 1.5, 0);
    scene.add(cyanLight);

    // 4. Ground Grid & Cyber Floor
    const gridHelper = new THREE.GridHelper(50, 50, 0xdc2626, 0x1e293b);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    const floorGeo = new THREE.PlaneGeometry(50, 50);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x05070d,
      roughness: 0.85,
      metalness: 0.2,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    scene.add(floor);

    // 5. Starfield Dust Motes
    const starCount = 350;
    const starGeo = new THREE.BufferGeometry();
    const starCoords = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starCoords[i * 3] = (Math.random() - 0.5) * 45;
      starCoords[i * 3 + 1] = Math.random() * 16 + 0.5;
      starCoords[i * 3 + 2] = -Math.random() * 30 - 2;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x67e8f9,
      size: 0.12,
      transparent: true,
      opacity: 0.75,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 6. Procedural 3D Pokéball Mesh
    const ballGroup = new THREE.Group();
    pokeBallGroupRef.current = ballGroup;

    // Top hemisphere
    const topGeo = new THREE.SphereGeometry(0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const topMat = new THREE.MeshStandardMaterial({
      color: BALL_CONFIGS[selectedBall].topColor,
      roughness: 0.25,
      metalness: 0.15,
    });
    const topMesh = new THREE.Mesh(topGeo, topMat);
    ballTopMeshRef.current = topMesh;
    ballGroup.add(topMesh);

    // Bottom hemisphere
    const btmGeo = new THREE.SphereGeometry(0.35, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    const btmMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.25,
      metalness: 0.1,
    });
    const btmMesh = new THREE.Mesh(btmGeo, btmMat);
    ballGroup.add(btmMesh);

    // Middle dark band
    const bandGeo = new THREE.CylinderGeometry(0.352, 0.352, 0.04, 32);
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.4,
      metalness: 0.8,
    });
    const bandMesh = new THREE.Mesh(bandGeo, bandMat);
    ballGroup.add(bandMesh);

    // Button Ring
    const ringGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 24);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.3,
      metalness: 0.9,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(0, 0, 0.34);
    ballGroup.add(ringMesh);

    // Button Core (illuminated)
    const coreGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.06, 24);
    coreGeo.rotateX(Math.PI / 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.9,
      roughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, 0, 0.345);
    buttonCoreMeshRef.current = coreMesh;
    ballGroup.add(coreMesh);

    ballGroup.position.set(0, 0.8, 2.2);
    scene.add(ballGroup);

    // Ball Floor Shadow
    const shadowGeo = new THREE.CircleGeometry(0.36, 24);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.4,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, 0.02, 2.2);
    ballShadowMeshRef.current = shadowMesh;
    scene.add(shadowMesh);

    // 7. Holographic 3D Pokémon Targets
    targetMeshesRef.current = [];
    TARGETS.forEach((t) => {
      const group = new THREE.Group();

      // Holographic Orb Core
      const orbGeo = new THREE.SphereGeometry(t.radius, 24, 24);
      const orbMat = new THREE.MeshStandardMaterial({
        color: t.color,
        emissive: t.color,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.85,
        roughness: 0.2,
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      group.add(orb);

      // Rotating Aura Ring
      const torusGeo = new THREE.TorusGeometry(t.radius * 1.35, 0.03, 12, 32);
      const torusMat = new THREE.MeshBasicMaterial({
        color: t.ringColor,
        transparent: true,
        opacity: 0.9,
      });
      const torus = new THREE.Mesh(torusGeo, torusMat);
      group.add(torus);

      // Outer Ring
      const torusOuterGeo = new THREE.TorusGeometry(t.radius * 1.6, 0.015, 8, 32);
      const torusOuter = new THREE.Mesh(torusOuterGeo, torusMat);
      torusOuter.rotation.x = Math.PI / 3;
      group.add(torusOuter);

      group.position.set(t.baseX, t.baseY, t.baseZ);
      scene.add(group);

      targetMeshesRef.current.push({ mesh: group, data: t });
    });

    // 8. Particle System for Explosions
    const pCount = 100;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(pCount * 3);
    const pVelocities = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      pPositions[i * 3] = 0;
      pPositions[i * 3 + 1] = -100; // start hidden
      pPositions[i * 3 + 2] = 0;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.25,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const pSystem = new THREE.Points(pGeo, pMat);
    particlesRef.current = pSystem;
    particlePositionsRef.current = pPositions;
    particleVelocitiesRef.current = pVelocities;
    scene.add(pSystem);

    // 9. Resize Handling
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = Math.min(520, Math.max(340, Math.round(w * 0.58)));
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 10. Visibility Observer to Pause Render Loop when out of view
    const observer = new IntersectionObserver(([entry]) => {
      isIntersectingRef.current = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(container);

    // 11. Main 60fps Game Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (!isIntersectingRef.current) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // A. Animate Target Holograms
      targetMeshesRef.current.forEach(({ mesh, data }) => {
        mesh.rotation.y += 0.02;
        mesh.rotation.x += 0.008;

        if (data.pattern === "lissajous") {
          mesh.position.x = data.baseX + Math.sin(time * data.speed) * 3.6;
          mesh.position.y = data.baseY + Math.sin(time * data.speed * 2) * 1.0;
          mesh.position.z = data.baseZ + Math.cos(time * data.speed) * 1.5;
        } else if (data.pattern === "sine") {
          mesh.position.y = data.baseY + Math.sin(time * data.speed * 2) * 0.65;
          mesh.position.x = data.baseX + Math.cos(time * data.speed) * 1.2;
        } else if (data.pattern === "bounce") {
          mesh.position.y = data.baseY + Math.abs(Math.sin(time * data.speed * 2.2)) * 1.2;
        } else if (data.pattern === "circle") {
          mesh.position.x = data.baseX + Math.cos(time * data.speed) * 1.5;
          mesh.position.y = data.baseY + Math.sin(time * data.speed) * 0.8;
        }
      });

      // B. Animate Particle Bursts
      if (particlePositionsRef.current && particleVelocitiesRef.current && particlesRef.current) {
        const pos = particlePositionsRef.current;
        const vel = particleVelocitiesRef.current;
        let active = false;

        for (let i = 0; i < pos.length / 3; i++) {
          const idx = i * 3;
          if (pos[idx + 1] > -50) {
            active = true;
            pos[idx] += vel[idx] * delta;
            pos[idx + 1] += vel[idx + 1] * delta;
            pos[idx + 2] += vel[idx + 2] * delta;
            vel[idx + 1] -= 9.8 * delta; // particle gravity

            if (pos[idx + 1] < 0) {
              pos[idx + 1] = -100; // cleanup
            }
          }
        }
        if (active) {
          particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
      }

      // C. Pokéball Physics & Flight Logic
      const ball = pokeBallGroupRef.current;
      const shadow = ballShadowMeshRef.current;

      if (ball) {
        if (ballStateRef.current === "IDLE") {
          // Subtle idle hover breathing
          ball.position.y = 0.8 + Math.sin(time * 3) * 0.04;
          ball.rotation.y = time * 0.6;
          if (shadow) {
            shadow.position.x = ball.position.x;
            shadow.position.z = ball.position.z;
          }
        } else if (ballStateRef.current === "THROWN") {
          // Parabolic trajectory integration
          const vel = ballVelRef.current;
          const pos = ballPosRef.current;

          pos.x += vel.x * delta;
          pos.y += vel.y * delta;
          pos.z += vel.z * delta;
          vel.y -= 15.5 * delta; // Gravity

          ball.position.set(pos.x, pos.y, pos.z);
          ball.rotation.x += 12 * delta; // Spin

          if (shadow) {
            shadow.position.set(pos.x, 0.02, pos.z);
            const heightScale = Math.max(0.2, 1 - (pos.y / 8));
            shadow.scale.set(heightScale, heightScale, heightScale);
            (shadow.material as THREE.MeshBasicMaterial).opacity = Math.max(0.05, 0.4 - pos.y * 0.05);
          }

          // Check Collision with any active target
          targetMeshesRef.current.forEach(({ mesh, data }) => {
            if (ballStateRef.current !== "THROWN") return;
            const dist = ball.position.distanceTo(mesh.position);

            if (dist < data.radius + 0.45) {
              // HIT TARGET!
              ballStateRef.current = "HIT";
              hitTargetRef.current = data;
              chiptune.playHit();
              triggerParticles(mesh.position, data.color);

              // Pull ball to target position
              ballPosRef.current = { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z };
              ballVelRef.current = { x: 0, y: -2, z: 0 };
              setGameMessage(`HIT ${data.name.toUpperCase()}! INITIATING CAPTURE MATRIX...`);
            }
          });

          // Check Floor Impact
          if (pos.y <= 0.35) {
            pos.y = 0.35;
            if (Math.abs(vel.y) > 2.5) {
              vel.y = -vel.y * 0.45; // Ground bounce
              chiptune.playBounce();
            } else {
              // Settle on ground
              ballStateRef.current = "BOUNCING";
              chiptune.playBounce();
              setTimeout(() => {
                if (ballStateRef.current === "BOUNCING") {
                  setGameMessage("MISSED TARGET. SYSTEM RESETTING...");
                  setTimeout(resetBall, 900);
                }
              }, 400);
            }
          }

          // Out of bounds reset
          if (pos.z < -26 || Math.abs(pos.x) > 10) {
            setGameMessage("OUT OF BOUNDS. RE-ARMING...");
            setTimeout(resetBall, 700);
          }
        } else if (ballStateRef.current === "HIT") {
          // Ball drops to ground after absorbing target
          const pos = ballPosRef.current;
          const vel = ballVelRef.current;

          pos.y += vel.y * delta;
          vel.y -= 14 * delta;
          ball.position.set(pos.x, pos.y, pos.z);

          if (shadow) {
            shadow.position.set(pos.x, 0.02, pos.z);
          }

          if (pos.y <= 0.35) {
            pos.y = 0.35;
            ball.position.y = 0.35;
            chiptune.playBounce();

            // Enter Wobble Sequence
            ballStateRef.current = "WOBBLING";
            wobbleStepRef.current = 1;
            wobbleTimeRef.current = 0;
            setGameMessage("HOLD STILL...");
          }
        } else if (ballStateRef.current === "WOBBLING") {
          wobbleTimeRef.current += delta;
          const step = wobbleStepRef.current;
          const stepDuration = 0.65;

          // Wobble tilt math
          const tilt = Math.sin(wobbleTimeRef.current * 14) * Math.exp(-wobbleTimeRef.current * 3.5) * 0.45;
          ball.rotation.z = tilt;

          // Flash button core red during tilt
          if (buttonCoreMeshRef.current) {
            const isFlashing = Math.sin(wobbleTimeRef.current * 20) > 0;
            (buttonCoreMeshRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(
              isFlashing ? 0xef4444 : 0xffffff
            );
          }

          if (wobbleTimeRef.current >= stepDuration) {
            chiptune.playWobble();
            wobbleTimeRef.current = 0;
            wobbleStepRef.current += 1;

            if (wobbleStepRef.current > 3) {
              // RESOLVE CAPTURE
              ballStateRef.current = "RESULT";
              const target = hitTargetRef.current;
              const ballMultiplier = BALL_CONFIGS[selectedBall].multiplier;
              const finalProb = Math.min(0.99, (target?.catchRate || 0.5) * ballMultiplier);

              const isSuccess = Math.random() < finalProb;

              if (isSuccess && target) {
                // SUCCESSFUL CATCH!
                chiptune.playCatchSuccess();
                if (buttonCoreMeshRef.current) {
                  (buttonCoreMeshRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(0x10b981);
                }
                triggerParticles(ball.position, 0x10b981);

                const streakBonus = streak + 1;
                const earnedPoints = target.points * streakBonus;
                updateScore(earnedPoints);
                setStreak(streakBonus);

                setCaughtList((prev) => (prev.includes(target.id) ? prev : [...prev, target.id]));
                setGameMessage(`GOTCHA! ${target.name.toUpperCase()} WAS CAUGHT! (+${earnedPoints} PTS)`);

                setTimeout(resetBall, 2600);
              } else {
                // BREAKOUT!
                chiptune.playBreakout();
                if (buttonCoreMeshRef.current) {
                  (buttonCoreMeshRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(0xef4444);
                }
                setStreak(0);
                setGameMessage(`OH NO! ${target?.name.toUpperCase() || "POKÉMON"} BROKE FREE!`);
                setTimeout(resetBall, 1600);
              }
            }
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [selectedBall, updateScore, resetBall, triggerParticles, streak]);

  // Update top mesh color when ball type changes
  useEffect(() => {
    if (ballTopMeshRef.current) {
      (ballTopMeshRef.current.material as THREE.MeshStandardMaterial).color.setHex(
        BALL_CONFIGS[selectedBall].topColor
      );
    }
  }, [selectedBall]);

  // Mouse / Touch Drag Throw Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (ballStateRef.current !== "IDLE") return;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    aimAngleRef.current = { x: nx * 2, y: -ny * 2 };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragStartRef.current || ballStateRef.current !== "IDLE") return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const dt = Math.max(50, performance.now() - dragStartRef.current.time);

    dragStartRef.current = null;

    // Upward drag / swipe flick
    if (dy < -20) {
      const speedY = Math.min(9.5, Math.max(4.2, (-dy / dt) * 14));
      const speedX = (dx / dt) * 12;
      const speedZ = -Math.min(22, Math.max(12, (-dy / dt) * 26));

      throwBall(speedX, speedY, speedZ);
    } else {
      // Tap or short click -> launch toward mouse cursor
      launchDefault();
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && ballStateRef.current === "IDLE") {
        e.preventDefault();
        launchDefault();
      } else if (e.key === "r" || e.key === "R") {
        resetBall();
      } else if (e.key === "ArrowLeft") {
        aimAngleRef.current.x = Math.max(-1, aimAngleRef.current.x - 0.2);
      } else if (e.key === "ArrowRight") {
        aimAngleRef.current.x = Math.min(1, aimAngleRef.current.x + 0.2);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [launchDefault, resetBall]);

  return (
    <div className="relative w-full rounded-2xl bg-zinc-950 border-2 border-red-900/80 shadow-2xl overflow-hidden font-mono select-none">
      {/* Top Arcade Hardware Header */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          <span className="font-bold tracking-wider text-zinc-200">
            DEVON CORP. FIELD LAB // 3D CATCH SIMULATOR
          </span>
        </div>

        {/* Score & Multiplier Readouts */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-zinc-950/80 px-2.5 py-1 rounded border border-zinc-800">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-zinc-400">SCORE:</span>
            <span className="font-bold text-white tabular-nums">{score}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 bg-zinc-950/80 px-2.5 py-1 rounded border border-zinc-800">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-zinc-400">STREAK:</span>
            <span className="font-bold text-emerald-400 tabular-nums">x{streak}</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-[11px] text-zinc-400">
            <span>HIGH:</span>
            <span className="text-zinc-200 font-bold tabular-nums">{highScore}</span>
          </div>

          {/* Sound Mute Toggle */}
          <button
            type="button"
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              chiptune.enabled = next;
            }}
            className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
            title={soundEnabled ? "Mute Game Sound" : "Enable Game Sound"}
            aria-label="Toggle Game Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
          </button>
        </div>
      </div>

      {/* Main 3D Interactive Canvas Viewport */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] cursor-grab active:cursor-grabbing touch-none overflow-hidden"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* HUD Crosshair Reticle when Aiming */}
        {isAiming && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-cyan-400/40 flex items-center justify-center animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_cyan]" />
            </div>
          </div>
        )}

        {/* Dynamic Game Notification Toast */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-zinc-950/85 backdrop-blur-md border border-zinc-700/80 text-[11px] sm:text-xs font-bold text-zinc-200 shadow-xl pointer-events-none text-center whitespace-nowrap">
          {gameMessage}
        </div>

        {/* Floating Reset Button */}
        <button
          type="button"
          onClick={resetBall}
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-md bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg transition-colors cursor-pointer"
          title="Reset Poké Ball Position (R)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">RESET</span>
        </button>
      </div>

      {/* Arcade Dashboard & Ball Casing Selector */}
      <div className="p-4 bg-zinc-900/95 border-t border-zinc-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Ball Selector Buttons */}
          <div className="space-y-1">
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold flex items-center gap-1">
              <Target className="w-3 h-3 text-cyan-400" />
              <span>Select Capture Ballistics</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(BALL_CONFIGS) as BallType[]).map((type) => {
                const cfg = BALL_CONFIGS[type];
                const active = selectedBall === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setSelectedBall(type);
                      resetBall();
                    }}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer min-h-[36px] ${active
                        ? "bg-zinc-100 text-zinc-950 shadow-md ring-2 ring-cyan-400 font-black"
                        : "bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-white border border-zinc-700"
                      }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-zinc-400"
                      style={{ backgroundColor: `#${cfg.topColor.toString(16).padStart(6, "0")}` }}
                    />
                    <span>{cfg.name}</span>
                    <span className="text-[10px] text-zinc-500">
                      {cfg.multiplier > 10 ? "100%" : `${cfg.multiplier}x`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Big Launch Trigger Button */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              type="button"
              onClick={launchDefault}
              disabled={!isAiming}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-md font-mono text-xs font-black tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${isAiming
                  ? "bg-[#dc2626] hover:bg-[#b91c1c] text-white border border-red-400 animate-pulse hover:animate-none"
                  : "bg-zinc-800 text-zinc-500 border border-zinc-750 cursor-not-allowed"
                }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>FIRE POKÉ BALL [SPACE]</span>
            </button>
          </div>
        </div>

        {/* Captured Pokédex Field Roster */}
        <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-bold text-[11px]">REGISTERED SPECIES:</span>
            <div className="flex items-center gap-1.5">
              {TARGETS.map((t) => {
                const caught = caughtList.includes(t.id);
                return (
                  <span
                    key={t.id}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono border transition-all ${caught
                        ? "bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold"
                        : "bg-zinc-950 border-zinc-800 text-zinc-600"
                      }`}
                    title={`#${t.dexNumber} ${t.name} (${t.points} pts)`}
                  >
                    {caught ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    )}
                    <span>{t.name}</span>
                  </span>
                );
              })}
            </div>
          </div>

          <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
            <Info className="w-3 h-3 text-zinc-500" />
            <span>Flick or swipe up on screen · Aim with mouse/arrows</span>
          </div>
        </div>
      </div>
    </div>
  );
}

