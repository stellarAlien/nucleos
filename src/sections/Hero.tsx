import { useEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   DNA Canvas  (Three.js double-helix)
───────────────────────────────────────────── */
const DNACanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 16);

    // ── Lighting ──────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const keyLight = new THREE.PointLight(0x5dbb8a, 3.5, 50);
    keyLight.position.set(4, 6, 8);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0x2e8fa3, 2.0, 50);
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);
    const rimLight = new THREE.PointLight(0xd4e79e, 1.2, 40);
    rimLight.position.set(0, -8, -4);
    scene.add(rimLight);

    // ── DNA helix parameters ──────────────────
    const STRAND_STEPS = 80;    // nucleotide pairs along the helix
    const HELIX_RADIUS = 2.2;   // radius of each strand backbone
    const HELIX_HEIGHT = 14;    // total vertical span
    const TURNS = 4;     // full rotations over total height
    const STEP_HEIGHT = HELIX_HEIGHT / STRAND_STEPS;

    // ── Materials ─────────────────────────────
    const matGreen = new THREE.MeshPhongMaterial({ color: 0x5dbb8a, emissive: 0x5dbb8a, emissiveIntensity: 0.3, shininess: 160 });
    const matTeal = new THREE.MeshPhongMaterial({ color: 0x2e8fa3, emissive: 0x2e8fa3, emissiveIntensity: 0.25, shininess: 140 });
    const matLight = new THREE.MeshPhongMaterial({ color: 0xd4e79e, emissive: 0xd4e79e, emissiveIntensity: 0.2, shininess: 100 });
    const matWhite = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.1, shininess: 80, transparent: true, opacity: 0.85 });
    const baseMats = [matGreen, matTeal, matLight, matWhite];

    // Backbone tube material
    const backboneMat = new THREE.MeshPhongMaterial({ color: 0x5dbb8a, emissive: 0x5dbb8a, emissiveIntensity: 0.15, shininess: 80, transparent: true, opacity: 0.7 });
    const backboneMatB = new THREE.MeshPhongMaterial({ color: 0x2e8fa3, emissive: 0x2e8fa3, emissiveIntensity: 0.15, shininess: 80, transparent: true, opacity: 0.7 });

    // Rung (base-pair bridge) material
    const rungMat = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.08, shininess: 60, transparent: true, opacity: 0.35 });

    // ── DNA group (so we can rotate it as one) ─
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    // Helper: position on helix A (strand 1) and B (strand 2)
    const helixPos = (i: number, strand: 0 | 1): THREE.Vector3 => {
      const t = i / STRAND_STEPS;
      const y = t * HELIX_HEIGHT - HELIX_HEIGHT / 2;
      const angle = t * Math.PI * 2 * TURNS + (strand === 1 ? Math.PI : 0);
      return new THREE.Vector3(
        Math.cos(angle) * HELIX_RADIUS,
        y,
        Math.sin(angle) * HELIX_RADIUS
      );
    };

    // ── Backbone: smooth CatmullRom tubes ────
    const buildBackbone = (strand: 0 | 1, mat: THREE.Material) => {
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= STRAND_STEPS; i++) points.push(helixPos(i, strand));
      const curve = new THREE.CatmullRomCurve3(points);
      const geo = new THREE.TubeGeometry(curve, STRAND_STEPS * 3, 0.12, 10, false);
      dnaGroup.add(new THREE.Mesh(geo, mat));
    };
    buildBackbone(0, backboneMat);
    buildBackbone(1, backboneMatB);

    // ── Nucleotide spheres + rungs ────────────
    const sphereGeo = new THREE.SphereGeometry(0.28, 20, 20);
    const rungGeo = new THREE.CylinderGeometry(0.07, 0.07, 1, 8);

    for (let i = 0; i < STRAND_STEPS; i++) {
      const posA = helixPos(i, 0);
      const posB = helixPos(i, 1);
      const mat = baseMats[i % baseMats.length];

      // Sphere A
      const sphA = new THREE.Mesh(sphereGeo, mat);
      sphA.position.copy(posA);
      dnaGroup.add(sphA);

      // Sphere B
      const sphB = new THREE.Mesh(sphereGeo, mat);
      sphB.position.copy(posB);
      dnaGroup.add(sphB);

      // Rung (bridge) every 2 steps for cleaner look
      if (i % 2 === 0) {
        const mid = posA.clone().lerp(posB, 0.5);
        const dir = posB.clone().sub(posA);
        const length = dir.length();
        const rung = new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.06, length, 8),
          rungMat
        );
        rung.position.copy(mid);
        // Orient cylinder from A to B
        const axis = new THREE.Vector3(0, 1, 0);
        rung.quaternion.setFromUnitVectors(axis, dir.normalize());
        dnaGroup.add(rung);
      }
    }

    // ── Floating particles ────────────────────
    const pCount = 220;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 22;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x5dbb8a, size: 0.06, transparent: true, opacity: 0.45 });
    scene.add(new THREE.Points(pGeo, pMat));

    // ── Resize ────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Mouse parallax ────────────────────────
    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    // ── Animate ───────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Slow Y rotation + gentle sway
      dnaGroup.rotation.y = t * 0.25 + mouseX * 0.18;
      dnaGroup.rotation.x = Math.sin(t * 0.15) * 0.08 - mouseY * 0.07;

      // Key light orbit for dynamic specular highlights
      keyLight.position.x = Math.sin(t * 0.4) * 6;
      keyLight.position.z = Math.cos(t * 0.4) * 6;

      // Subtle camera breathe
      camera.position.y = Math.sin(t * 0.2) * 0.4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

/* ─────────────────────────────────────────────
   Hero Component
───────────────────────────────────────────── */
const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const wave = waveRef.current;
    const content = contentRef.current;
    const canvasCol = canvasColRef.current;

    if (!section || !headline || !subtitle || !cta || !wave || !content) return;

    const ctx = gsap.context(() => {
      // 1. Word-by-word headline reveal
      const words = headline.innerText.split(' ');
      headline.innerHTML = words
        .map(w => `<span class="inline-block overflow-hidden"><span class="word inline-block">${w}</span></span>`)
        .join(' ');
      gsap.fromTo(
        headline.querySelectorAll('.word'),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.5 }
      );

      // 2. Subtitle + CTA entrance
      gsap.fromTo(subtitle, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1.2 });
      gsap.fromTo(cta, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 1.5 });

      // 3. DNA canvas slide in
      if (canvasCol) {
        gsap.fromTo(canvasCol, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.6 });
      }

      // 4. Wave parallax scrub
      gsap.to(wave, {
        y: -50,
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 1 },
      });

      // 5. Smart scroll-direction hide/show for hero content
      const showAnim = gsap.from(content, {
        yPercent: -8, opacity: 0, paused: true, duration: 0.4, ease: 'power2.out',
      }).progress(1);
      ScrollTrigger.create({
        start: 'top top', end: 'max',
        onUpdate: (self) => { self.direction === 1 ? showAnim.reverse() : showAnim.play(); },
      });

      // 6. Background image parallax
      const bgImg = section.querySelector<HTMLImageElement>('.hero-bg-img');
      if (bgImg) {
        gsap.to(bgImg, {
          yPercent: 20, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Biotech Laboratory"
          className="hero-bg-img w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* DNA Canvas — full right-half, transparent, sits above bg */}
      <div
        ref={canvasColRef}
        className="absolute inset-y-0 right-0 w-1/2 z-10 hidden lg:block pointer-events-none"
      >
        <DNACanvas />
      </div>

      {/* Decorative Wave SVG */}
      <svg
        ref={waveRef}
        className="hero-wave absolute bottom-0 left-0 right-0 w-full h-[350px] z-10 pointer-events-none"
        viewBox="0 0 1440 350"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4E79E" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#5DBB8A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2E8FA3" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="waveMain" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5DBB8A" />
            <stop offset="40%" stopColor="#2E8FA3" />
            <stop offset="100%" stopColor="#1E2F44" />
          </linearGradient>
          <linearGradient id="waveDeep" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2E8FA3" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1E2F44" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path d="M0,350 L0,220 C300,320 600,150 900,280 C1100,360 1300,200 1440,250 L1440,350 Z" fill="url(#waveDeep)" fillOpacity="0.4" />
        <path d="M0,350 L0,260 C360,180 720,380 1080,260 C1260,200 1380,240 1440,280 L1440,350 Z" fill="url(#waveMain)" fillOpacity="0.7" />
        <path d="M0,350 L0,280 C400,250 800,400 1440,220 L1440,350 Z" fill="url(#waveHighlight)" />
        <rect x="0" y="348" width="1440" height="2" fill="white" />
      </svg>

      {/* Content */}
      <div ref={contentRef} className="relative z-20 w-full section-padding pt-32 pb-48">
        <div className="max-w-4xl">
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6"
          >
            Driving Excellence in Biotech Innovation &amp; Strategic Collaboration
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed"
          >
            The GCC's first biotech-focused platform, delivering expert solutions and connecting leading
            organizations to drive innovation and build a thriving ecosystem.
          </p>

          {/* CTA with glowing border + shimmer */}
          <div ref={ctaRef} className="relative inline-block group">
            {/* Glow layer */}
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-brand-green via-brand-teal to-brand-green opacity-50 blur-sm group-hover:opacity-80 group-hover:blur-md transition-all duration-500" />
            <a
              href="mailto:info@nucleos-biotech.com"
              className="relative flex items-center gap-3 px-8 py-4 rounded-xl bg-brand-green font-semibold text-white text-base overflow-hidden no-underline
                         shadow-lg shadow-brand-green/20 hover:shadow-xl hover:shadow-brand-green/30 hover:-translate-y-1 active:scale-95 transition-all duration-300"
            >
              {/* Shimmer sweep */}
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)' }}
              />
              {/* Label */}
              <span className="relative z-10 bg-gradient-to-r from-white to-white/80 bg-clip-text">Get in Touch</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Floating decorative blobs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-brand-green/10 rounded-full blur-3xl animate-pulse animation-delay-500 pointer-events-none" />
    </section>
  );
};

export default Hero;