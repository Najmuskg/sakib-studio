"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Points as DreiPoints,
  PointMaterial,
} from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import { MathUtils } from "three";
import type { Points as ThreePoints, Mesh, Group } from "three";

/* ---------------- PARTICLES ---------------- */

function createParticlePositions() {
  const positions = new Float32Array(3000);
  for (let i = 0; i < positions.length; i++) {
    positions[i] = (Math.random() - 0.5) * 12;
  }
  return positions;
}

function Particles() {
  const ref = useRef<ThreePoints | null>(null);
  const [particles] = useState(createParticlePositions);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0008;
      ref.current.rotation.x += 0.0002;
    }
  });

  return (
    <DreiPoints ref={ref} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        blending={2}
      />
    </DreiPoints>
  );
}

/* ---------------- FLOATING FRAGMENTS ---------------- */

function FloatingFragments() {
  const group = useRef<Group | null>(null);
  const fragmentCount = 6;
  const positions = useMemo(
    () =>
      Array.from({ length: fragmentCount }, (_, index) => {
        const angle = (index / fragmentCount) * Math.PI * 2;
        return [Math.cos(angle) * 2.4, Math.sin(angle) * 0.9, -1.2] as const;
      }),
    [fragmentCount]
  );

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.0025;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={group}>
      {positions.map((position, idx) => (
        <Float key={idx} floatIntensity={1.2} rotationIntensity={0.8} speed={0.9}>
          <mesh position={position}>
            <boxGeometry args={[0.22, 0.22, 0.22]} />
            <meshStandardMaterial
              color="#7c3aed"
              transparent
              opacity={0.6}
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ---------------- CAMERA RIG ---------------- */

function CameraRig() {
  const { camera } = useThree();
  const targetScroll = useRef(0);
  const smoothScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min((window.scrollY || 0) / window.innerHeight, 1);
      targetScroll.current = progress;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    smoothScroll.current += (targetScroll.current - smoothScroll.current) * 0.08;
    const offset = smoothScroll.current;

    camera.position.x = MathUtils.lerp(camera.position.x, offset * 0.24, 0.08);
    camera.position.y = MathUtils.lerp(camera.position.y, -offset * 0.18, 0.08);
    camera.position.z = MathUtils.lerp(camera.position.z, 5 - offset * 1.5, 0.08);
    camera.rotation.y = MathUtils.lerp(camera.rotation.y, offset * 0.08, 0.08);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ---------------- CORE OBJECT ---------------- */

function CoreObject() {
  const coreRef = useRef<Mesh | null>(null);
  const ringRef = useRef<Mesh | null>(null);
  const shellRef = useRef<Mesh | null>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y += 0.012;
      coreRef.current.rotation.x += 0.005;

      const scale = 1 + Math.sin(t * 2) * 0.06;
      coreRef.current.scale.set(scale, scale, scale);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
      ringRef.current.rotation.y += 0.003;
    }

    if (shellRef.current) {
      shellRef.current.rotation.y -= 0.005;
      shellRef.current.rotation.x = Math.sin(t * 0.5) * 0.18;
    }
  });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const coreSize = useMemo(() => (isMobile ? 0.9 : 1.3), [isMobile]);

  return (
    <group>
      <Float floatIntensity={1.5} rotationIntensity={0.6}>
        <mesh ref={shellRef}>
          <icosahedronGeometry args={[coreSize, 5]} />
          <meshStandardMaterial
            color="#3b82f6"
            wireframe
            transparent
            opacity={0.09}
            emissive="#1d4ed8"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>


    </group>
  );
}

/* ---------------- MAIN SCENE ---------------- */

export default function HeroScene() {
  return (
    <Canvas
      className="w-full h-full pointer-events-none"
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <CameraRig />

      <fog attach="fog" args={["#020617", 5, 13]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 5]} intensity={1.4} />
      <pointLight position={[0, 0, 0]} intensity={2.2} color="#3b82f6" />
      <pointLight position={[-3, 2, 3]} intensity={0.45} color="#7c3aed" />

      {/* Scene */}
      <Particles />
      <CoreObject />
    </Canvas>
  );
}