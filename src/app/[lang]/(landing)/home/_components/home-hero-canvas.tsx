"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function readThemeColor(varName: string, fallbackVar: string): THREE.Color {
  if (typeof window === "undefined") return new THREE.Color();
  const root = document.documentElement;
  const raw =
    getComputedStyle(root).getPropertyValue(varName).trim() ||
    getComputedStyle(root).getPropertyValue(fallbackVar).trim();
  if (!raw) return new THREE.Color();
  try {
    return new THREE.Color(raw);
  } catch {
    return new THREE.Color();
  }
}

function FloatingShapes() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [primary, secondary, accent] = useThemeTriple();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.12;
    g.rotation.x += delta * 0.06;
    const px = pointer.current.x * 2.2;
    const py = pointer.current.y * 1.6;
    g.position.x += (px - g.position.x) * 0.04;
    g.position.y += (py - g.position.y) * 0.04;
  });

  const [mat1, mat2, mat3] = useMemo(
    () => [
      new THREE.MeshStandardMaterial({
        metalness: 0.25,
        roughness: 0.35,
        emissiveIntensity: 0.45,
      }),
      new THREE.MeshStandardMaterial({
        metalness: 0.2,
        roughness: 0.4,
        emissiveIntensity: 0.4,
      }),
      new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.3,
        emissiveIntensity: 0.35,
      }),
    ],
    [],
  );

  useEffect(() => {
    mat1.color.copy(primary);
    mat1.emissive.copy(primary);
    mat2.color.copy(secondary);
    mat2.emissive.copy(secondary);
    mat3.color.copy(accent);
    mat3.emissive.copy(accent);
  }, [primary, secondary, accent, mat1, mat2, mat3]);

  return (
    <group ref={group}>
      <mesh position={[-2.2, 0.4, 0]} material={mat1}>
        <icosahedronGeometry args={[1.05, 0]} />
      </mesh>
      <mesh
        position={[2.1, -0.3, -0.5]}
        material={mat2}
        rotation={[0.4, 0.2, 0]}
      >
        <torusGeometry args={[0.85, 0.28, 24, 48]} />
      </mesh>
      <mesh position={[0.2, -0.8, 1.2]} material={mat3}>
        <sphereGeometry args={[0.75, 32, 32]} />
      </mesh>
    </group>
  );
}

function useThemeTriple() {
  const [colors, setColors] = useState(() => ({
    primary: readThemeColor("--color-primary", "--primary"),
    secondary: readThemeColor("--color-secondary", "--secondary"),
    accent: readThemeColor("--color-accent", "--accent"),
  }));

  useEffect(() => {
    const sync = () => {
      setColors({
        primary: readThemeColor("--color-primary", "--primary"),
        secondary: readThemeColor("--color-secondary", "--secondary"),
        accent: readThemeColor("--color-accent", "--accent"),
      });
    };
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });
    window.addEventListener("resize", sync);
    return () => {
      mo.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  return [colors.primary, colors.secondary, colors.accent] as const;
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[8, 10, 6]} intensity={1.1} />
      <pointLight position={[-6, -4, 4]} intensity={0.6} />
    </>
  );
}

export default function HomeHeroCanvas() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearAlpha(0);
  }, [gl]);
  return (
    <>
      <SceneLights />
      <FloatingShapes />
    </>
  );
}

export function HomeHeroCanvasRoot() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 h-full min-h-[100svh] w-full">
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0, 9], fov: 42 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        aria-hidden
      >
        <HomeHeroCanvas />
      </Canvas>
    </div>
  );
}
