import React, { useRef, useMemo } from 'react';
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
    meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
    // Lerp mouse position for smoothness
    meshRef.current.material.uniforms.uMouse.value.x += (mouse.x * 0.5 + 0.5 - meshRef.current.material.uniforms.uMouse.value.x) * 0.05;
    meshRef.current.material.uniforms.uMouse.value.y += (mouse.y * 0.5 + 0.5 - meshRef.current.material.uniforms.uMouse.value.y) * 0.05;
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
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    varying vec2 vUv;

    // Simple noise function
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 p = vUv;
      float d = distance(p, uMouse);
      
      // Fluid colors based on palette
      vec3 color1 = vec3(0.0, 0.63, 1.0); // Blue
      vec3 color2 = vec3(0.98, 0.34, 0.15); // Orange
      vec3 color3 = vec3(0.0, 0.0, 0.0); // Black

      float noiseVal = sin(p.x * 10.0 + uTime * 0.5) * cos(p.y * 10.0 + uTime * 0.5);
      float finalNoise = smoothstep(0.4, 0.6, d + noiseVal * 0.1);
      
      vec3 finalColor = mix(color1, color2, finalNoise);
      finalColor = mix(finalColor, color3, smoothstep(0.3, 0.9, d));

      gl_FragColor = vec4(finalColor * 0.15, 1.0);
    }
  `;

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
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
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <FluidBackground />
      </Canvas>
    </div>
  );
};

export default HeroBackground;