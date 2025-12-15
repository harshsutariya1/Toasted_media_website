"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// --- Shader Definition ---
const FluidShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        uMouse: new THREE.Vector2(0.5, 0.5),
        uResolution: new THREE.Vector2(1, 1),
        // Colors: Teal, Purple, Yellow, Orange, Blue -> Normalized RGB
        uColor1: new THREE.Color("#00E5FF"),
        uColor2: new THREE.Color("#9D00FF"),
        uColor3: new THREE.Color("#FFEA00"),
        uColor4: new THREE.Color("#FF5E00"),
        uColor5: new THREE.Color("#2979FF"),
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader
    `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;
    uniform vec3 uColor5;
    varying vec2 vUv;

    // Simplex Noise Function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
              -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      
      // Calculate aspect ratio correction
      // Assuming plane fills screen roughly
      
      // Slow swirl
      float time = uTime * 0.2;
      
      // Noise layers
      float n1 = snoise(uv * 1.5 + time);
      float n2 = snoise(uv * 2.5 - time * 0.5 + n1);
      float n3 = snoise(uv * 3.5 + time * 1.2 + n2);
      
      // Mouse interaction distortion
      // Map uMouse (0..1) to uv space
      float dist = distance(uv, uMouse);
      float mouseEffect = smoothstep(0.4, 0.0, dist) * 0.15;
      
      vec2 distortedUV = uv + vec2(n1, n2) * 0.1 + (uv - uMouse) * mouseEffect;

      // Color Mixing
      vec3 c = mix(uColor1, uColor2, smoothstep(-1.0, 1.0, n1));
      c = mix(c, uColor3, smoothstep(-0.5, 0.5, n2));
      c = mix(c, uColor4, smoothstep(-0.5, 0.5, n3 + mouseEffect * 2.0));
      // Add splash of blue
      c = mix(c, uColor5, smoothstep(0.6, 0.9, n3));
      
      // Vignette / Darkness
      c *= 1.2; 
      
      gl_FragColor = vec4(c, 1.0);
    }
  `
);

extend({ FluidShaderMaterial });

// --- R3F Scene ---
function FluidScene() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport, size } = useThree();

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
            // Mouse interaction interpolation
            const targetX = (state.mouse.x + 1) / 2;
            const targetY = (state.mouse.y + 1) / 2; // R3F mouse is -1 to 1, UV is 0 to 1

            materialRef.current.uniforms.uMouse.value.lerp(
                new THREE.Vector2(targetX, targetY),
                0.1
            );
        }
    });

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            {/* @ts-ignore */}
            <fluidShaderMaterial ref={materialRef} />
        </mesh>
    );
}

// --- Main Hero Component ---
export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // GSAP Animation for text entrance
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(".hero-line-1",
                { y: 120, opacity: 0, rotateX: -20 },
                { y: 0, opacity: 1, rotateX: 0, duration: 1.4, delay: 0.2 }
            )
                .fromTo(".hero-line-2",
                    { y: 120, opacity: 0, scale: 0.9, rotateX: -20 },
                    { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 1.4 },
                    "-=1.1"
                )
                .fromTo(".hero-est",
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 1 },
                    "-=0.5"
                );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-toasted-black perspective-[1200px]">
            {/* R3F Canvas */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <FluidScene />
                </Canvas>
            </div>

            {/* HTML Content Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                <div className="mix-blend-overlay text-center">
                    {/* Overflow hidden for text reveal effect */}
                    <div className="overflow-hidden">
                        <h1 className="hero-line-1 text-[12vw] sm:text-[18vw] font-black leading-none tracking-tighter text-white opacity-90 select-none origin-bottom block">
                            GET
                        </h1>
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="hero-line-2 text-[12vw] sm:text-[18vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-white/20 select-none origin-bottom block">
                            TOASTED
                        </h1>
                    </div>
                </div>
            </div>

            <div className="hero-est absolute bottom-10 left-10 z-20 pointer-events-none text-xs tracking-[0.2em] font-bold text-white/50">
                DIGITAL HEAT<br />EST. 2025
            </div>
        </section>
    );
}
