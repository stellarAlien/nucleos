'use client';

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── B-DNA Constants ───────────────────────────────────────
const BP_RISE = 0.34;
const RAD_PER_BP = (36 * Math.PI) / 180;
const HELIX_R = 1.05;
const STRAND_OFF = (120 * Math.PI) / 180;
const NUM_BP = 28;

function strandPos(bp: number, strand: number) {
  const angle = bp * RAD_PER_BP + (strand === 0 ? 0 : STRAND_OFF);
  const y = bp * BP_RISE - (NUM_BP * BP_RISE) / 2;
  return new THREE.Vector3(Math.cos(angle) * HELIX_R, y, Math.sin(angle) * HELIX_R);
}

// ── DNA Helix Mesh Component ──────────────────────────────
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);

  const { geo, mats } = useMemo(() => ({
    geo: {
      pho: new THREE.SphereGeometry(0.32, 32, 32),
      sug: new THREE.SphereGeometry(0.22, 24, 24),
      rung: new THREE.CylinderGeometry(0.06, 0.06, 1, 12),
    },
    mats: {
      // Deep Navy - Professional & Metallic
      phosphate: new THREE.MeshPhysicalMaterial({
        color: "#0f0f61",
        roughness: 0.1,
        metalness: 0.8,
        clearcoat: 1.0,
        envMapIntensity: 1.2,
      }),
      // Mid-Blue - Translucent lab glass effect
      sugar: new THREE.MeshPhysicalMaterial({
        color: "#1d4089",
        roughness: 0.2,
        metalness: 0.1,
        transmission: 0.3, 
        thickness: 0.5,
        envMapIntensity: 0.8,
      }),
      // Green Base (Nucleos Brand Color)
      AT: new THREE.MeshPhysicalMaterial({
        color: "#1a2a8c",
        emissive: "#5dbb8a",
        emissiveIntensity: 2.5, // Increased for Bloom visibility
      }),
      // Teal/Blue Base
      GC: new THREE.MeshPhysicalMaterial({
        color: "#1a2a8c",
        emissive: "#2e8fa3",
        emissiveIntensity: 2.0,
      }),
    }
  }), []);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth slow rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      // Gentle floating bobbing
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  const elements = useMemo(() => {
    const items = [];
    for (let i = 0; i < NUM_BP; i++) {
      for (let s = 0; s < 2; s++) {
        const p = strandPos(i, s);
        items.push(<mesh key={`p-${s}-${i}`} geometry={geo.pho} material={mats.phosphate} position={p} />);
        items.push(<mesh key={`s-${s}-${i}`} geometry={geo.sug} material={mats.sugar} position={[p.x * 0.85, p.y, p.z * 0.85]} />);
      }
      const p0 = strandPos(i, 0);
      const p1 = strandPos(i, 1);
      const mid = new THREE.Vector3().addVectors(p0, p1).multiplyScalar(0.5);
      const direction = new THREE.Vector3().subVectors(p1, p0).normalize();
      const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
      
      items.push(
        <mesh
          key={`r-${i}`}
          geometry={geo.rung}
          material={i % 2 === 0 ? mats.AT : mats.GC}
          position={mid}
          quaternion={quaternion}
          scale={[1, p0.distanceTo(p1) * 0.8, 1]}
        />
      );
    }
    return items;
  }, [geo, mats]);

  return <group ref={groupRef} scale={2.5}>{elements}</group>;
}

// ── Hero Component ────────────────────────────────────────
const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = headlineRef.current?.innerText.split(' ') || [];
      if (headlineRef.current) {
        headlineRef.current.innerHTML = words
          .map(w => `<span class="inline-block overflow-hidden pb-1"><span class="word inline-block">${w}</span></span>`)
          .join(' ');
        
        gsap.fromTo(".word", 
          { y: 60, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.5 }
        );
      }
      gsap.fromTo(subtitleRef.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1.2 }
      );
      gsap.fromTo(ctaRef.current, 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 1.5 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#020617] isolate">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Biotech Laboratory"
          className="w-full h-full object-cover opacity-40" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/90 to-transparent" />
      </div>

      {/* DNA Canvas - Clean & High Fidelity */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 z-10 pointer-events-none">
        <Canvas gl={{ antialias: true, toneMapping: THREE.ReinhardToneMapping }}>
          <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={35} />
          <fog attach="fog" args={["#020617", 10, 35]} />
          
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#5dbb8a" />
          <pointLight position={[-10, -10, -5]} intensity={1} color="#2e8fa3" />

          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <DNAHelix />
          </Float>

          {/* Using 'city' preset for sharp tech reflections */}
          <Environment preset="city" />

          <EffectComposer multisampling={4}>
            {/* Bloom tuned for the emissive rungs */}
            <Bloom 
              intensity={1.2} 
              luminanceThreshold={0.15} 
              mipmapBlur 
              radius={0.4} 
            />
            <ChromaticAberration 
              offset={new THREE.Vector2(0.0006, 0.0004)} 
              blendFunction={BlendFunction.NORMAL} 
            />
            <Noise opacity={0.03} />
            <Vignette offset={0.3} darkness={0.8} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Text Content */}
      <div className="relative z-20 w-full px-6 lg:px-12 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-4xl">
          <h1 ref={headlineRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-sans font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Driving Excellence in Biotech Innovation & Strategic Collaboration
          </h1>

          <p ref={subtitleRef} className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed">
            The GCC's first biotech-focused platform, delivering expert solutions and connecting leading
            organizations to drive innovation and build a thriving ecosystem.
          </p>

          <div ref={ctaRef} className="relative inline-block group">
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#5dbb8a] via-[#2e8fa3] to-[#5dbb8a] opacity-50 blur-sm group-hover:opacity-100 transition-all duration-500" />
            <a
              href="mailto:info@nucleos-biotech.com"
              className="relative flex items-center gap-3 px-8 py-4 rounded-xl bg-[#5dbb8a] font-semibold text-white no-underline shadow-lg hover:-translate-y-1 active:scale-95 transition-all duration-300"
            >
              <span className="relative z-10">Get in Touch</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;