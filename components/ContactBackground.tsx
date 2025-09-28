import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { COLORS } from '../constants';

interface ContactBackgroundProps {
  isMobile: boolean;
}

const ContactBackground: React.FC<ContactBackgroundProps> = ({ isMobile }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouse = useRef(new THREE.Vector2());
  const particlesRef = useRef<THREE.Points | null>(null);
  const uniforms = useRef({
    time: { value: 0 },
    resolution: { value: new THREE.Vector2() },
    mouse: { value: new THREE.Vector2() },
    color1: { value: new THREE.Color(COLORS.blue) },
    color2: { value: new THREE.Color(COLORS.orange) },
    color3: { value: new THREE.Color(COLORS.yellow) },
  });

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

    // Optional: OrbitControls for debugging/testing
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;

    camera.position.z = 5;

    // Shader for animated background gradient
    const gradientMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms.current,
      vertexShader: `
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        uniform vec2 mouse;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;

        void main() {
          vec2 uv = gl_FragCoord.xy / resolution.xy;
          vec2 center = vec2(0.5 + mouse.x * 0.1, 0.5 + mouse.y * 0.1); // Slight mouse influence
          float dist = distance(uv, center);

          // Animated noise for organic movement
          float noise = fract(sin(dot(uv + time * 0.05, vec2(12.9898, 78.233))) * 43758.5453);
          dist += noise * 0.1;

          vec3 finalColor = mix(color1, color2, smoothstep(0.2, 0.7, dist));
          finalColor = mix(finalColor, color3, smoothstep(0.5, 1.0, dist));

          gl_FragColor = vec4(finalColor, 0.8); // Semi-transparent for backdrop-blur
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), gradientMaterial);
    scene.add(plane);

    // Particles
    const particleCount = isMobile ? 500 : 2000;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const color = new THREE.Color();
      if (Math.random() < 0.33) color.set(COLORS.blue);
      else if (Math.random() < 0.66) color.set(COLORS.orange);
      else color.set(COLORS.yellow);
      colors[i * 3 + 0] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 0.1 + 0.05;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png') },
        time: uniforms.current.time,
        mouse: uniforms.current.mouse,
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform vec2 mouse;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Simple mouse interaction for particles
          float distToMouse = distance(mvPosition.xy, mouse * 2.0); // Scale mouse influence
          float repulsion = 0.5 / (distToMouse + 0.1); // Repel particles near mouse
          
          vec3 animatedPosition = position;
          animatedPosition.x += sin(position.y * 0.5 + time * 0.2) * 0.1;
          animatedPosition.y += cos(position.x * 0.5 + time * 0.2) * 0.1;
          
          // Apply repulsion
          vec2 direction = normalize(mvPosition.xy - mouse * 2.0);
          animatedPosition.xy += direction * repulsion * 0.1;

          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(animatedPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec3 vColor;

        void main() {
          gl_FragColor = vec4(vColor, 1.0);
          gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    const animate = () => {
      requestAnimationFrame(animate);
      uniforms.current.time.value += 0.01;
      uniforms.current.mouse.value.copy(mouse.current);

      // controls.update(); // If using OrbitControls
      renderer.render(scene, camera);
    };

    const onResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        uniforms.current.resolution.value.set(currentMount.clientWidth, currentMount.clientHeight);
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
      gradientMaterial.dispose();
      particlesMaterial.dispose();
      particlesGeometry.dispose();
      scene.remove(plane);
      scene.remove(particles);
    };
  }, [isMobile, onMouseMove]);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

export default ContactBackground;