import React, { useRef, useEffect, useState, Suspense, lazy, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // Not directly used but good to have for future 3D models
import { COLORS } from '../constants';

// Separate component for the actual Three.js scene to facilitate lazy loading
const GlobeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouse = useRef(new THREE.Vector2());

  const onMouseMove = useCallback((event: MouseEvent) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    camera.position.z = 5;

    // Globe geometry and material
    const globeGeometry = new THREE.SphereGeometry(1.5, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x00a1ff, // Blue color
      transparent: true,
      opacity: 0.8,
      shininess: 100,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Add some "atmosphere" effect
    const atmosphereGeometry = new THREE.SphereGeometry(1.6, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        c: { type: 'f', value: 0.8 },
        p: { type: 'f', value: 5.0 },
        glowColor: { type: 'c', value: new THREE.Color(COLORS.blue) },
      },
      vertexShader: `
        uniform float p;
        uniform float c;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize( normalMatrix * normal );
          vec3 vPosition = normalize( modelViewMatrix * vec4( position, 1.0 ) ).xyz;
          intensity = pow( c - dot( vNormal, vPosition ), p );
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4( glow, 1.0 );
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    const onResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);

    onResize(); // Initial size setup
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      currentMount.removeChild(renderer.domElement);
      renderer.dispose();
      globeMaterial.dispose();
      globeGeometry.dispose();
      atmosphereMaterial.dispose();
      atmosphereGeometry.dispose();
      scene.remove(globe);
      scene.remove(atmosphere);
    };
  }, [onMouseMove]);

  return <div ref={mountRef} className="w-full h-full" />;
};

interface InteractiveGlobeProps {
  isMobile: boolean;
}

const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({ isMobile }) => {
  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <img 
          src="https://images.unsplash.com/photo-1542362567-0d2917dc2391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800" 
          alt="Globo terrestre digital com linhas de conexão" 
          className="w-full h-full object-cover rounded-xl"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full w-full text-gray-400">Carregando Globo 3D...</div>}>
      <GlobeScene />
    </Suspense>
  );
};

export default InteractiveGlobe;