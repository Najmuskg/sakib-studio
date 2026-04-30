"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Points as DreiPoints,
  PointMaterial,
} from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import type { Points as ThreePoints, Mesh } from "three";

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
      ref.current.rotation.y += 0.0006;
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
        blending={2} // glow effect
      />
    </DreiPoints>
  );
}

/* ---------------- CORE OBJECT ---------------- */

function CoreObject() {
  const coreRef = useRef<Mesh | null>(null);
  const ringRef = useRef<Mesh | null>(null);
  const shellRef = useRef<Mesh | null>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y += 0.01;
      coreRef.current.rotation.x += 0.004;

      const scale = 1 + Math.sin(t * 2) * 0.06;
      coreRef.current.scale.set(scale, scale, scale);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += 0.008;
      ringRef.current.rotation.y += 0.002;
    }

    if (shellRef.current) {
      shellRef.current.rotation.y -= 0.004;
      shellRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
  });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const coreSize = useMemo(() => (isMobile ? 1 : 1.3), [isMobile]);

  return (
    <group>
      {/* OUTER ENERGY SHELL */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[coreSize, 5]} />
        <meshStandardMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.08}
          emissive="#1d4ed8"
          emissiveIntensity={0.6}
        />
      </mesh>

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
      {/* Fog for depth */}
      <fog attach="fog" args={["#020617", 5, 12]} />

      {/* Lights */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#3b82f6" />

      {/* Scene */}
      <Particles />
      <CoreObject />
    </Canvas>
  );
}