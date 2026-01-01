"use client";

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const FluidBackground: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  useFrame((state) => {
    const { clock, mouse } = state;
    if (!meshRef.current || !meshRef.current.material) return;
    
    const material = meshRef.current.material as THREE.ShaderMaterial;
    if (material.uniforms) {
      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uMouse.value.x += (mouse.x * 0.5 + 0.5 - material.uniforms.uMouse.value.x) * 0.05;
      material.uniforms.uMouse.value.y += (mouse.y * 0.5 + 0.5 - material.uniforms.uMouse.value.y) * 0.05;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;

    void main() {
      vec2 p = vUv;
      float d = distance(p, uMouse);
      
      vec3 color1 = vec3(0.0, 0.39, 1.0); 
      vec3 color2 = vec3(0.98, 0.34, 0.15); 
      vec3 color3 = vec3(0.0, 0.0, 0.0); 

      float noiseVal = sin(p.x * 8.0 + uTime * 0.3) * cos(p.y * 8.0 + uTime * 0.3);
      float finalNoise = smoothstep(0.3, 0.7, d + noiseVal * 0.15);
      
      vec3 finalColor = mix(color1, color2, finalNoise);
      finalColor = mix(finalColor, color3, smoothstep(0.2, 1.0, d));

      gl_FragColor = vec4(finalColor * 0.12, 1.0);
    }
  `;

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
};

const HeroBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="absolute inset-0 bg-black" />;

  return (
    <div className="absolute inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 2]}
      >
        <FluidBackground />
      </Canvas>
    </div>
  );
};

export default HeroBackground;