'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, GraduationCap, Microscope, X, ArrowUpRight } from 'lucide-react';
import { Logo } from '../components/Logo';

// ── Brand tokens ──────────────────────────────────────────
const B = {
  green: '#5DBB8A',
  teal: '#2E8FA3',
  navy: '#1E2F44',
  white: '#F4F6F5',
};

const services = [
  {
    id: 1,
    title: 'Events Organization',
    description:
      'We orchestrate premier scientific conferences, symposiums, and networking events that connect industry leaders, foster collaboration, and showcase cutting-edge research in biotechnology and CGT.',
    image: '/images/service-events.jpg',
    icon: Calendar,
    features: ['Scientific Conferences', 'Industry Summits', 'Networking Events', 'Workshop Coordination'],
    accent: B.green,
    accentDim: 'rgba(93,187,138,0.15)',
    index: '01',
  },
  {
    id: 2,
    title: 'Training',
    description:
      'Comprehensive training programs designed to equip your team with the knowledge and skills needed to excel in biotech innovation, regulatory compliance, and advanced therapeutic development.',
    image: '/images/service-training.jpg',
    icon: GraduationCap,
    features: ['Regulatory Training', 'Technical Workshops', 'Leadership Programs', 'Certification Courses'],
    accent: B.teal,
    accentDim: 'rgba(46,143,163,0.15)',
    index: '02',
  },
  {
    id: 3,
    title: 'Strategic Consultancy',
    description:
      'End-to-end consultancy in biotech innovation, from early-stage research to commercialization. We provide strategic guidance for CGT development, manufacturing, and market entry.',
    image: '/images/service-cgt.jpg',
    icon: Microscope,
    features: ['Strategic Consulting', 'Process Development', 'Market Access'],
    accent: B.green,
    accentDim: 'rgba(93,187,138,0.15)',
    index: '03',
  },
];

// ── Popover card ──────────────────────────────────────────
function ServiceCard({
  service,
  layout,
  delay,
}: {
  service: typeof services[0];
  layout: 'hero' | 'stacked';
  delay: number;
}) {
  const Icon = service.icon;
  const popoverId = `svc-pop-${service.id}`;

  const isHero = layout === 'hero';

  return (
    <motion.div
      className="relative group"
      style={{ height: isHero ? '100%' : '100%' }}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {/* ── Trigger button ── */}
      <button
        popoverTarget={popoverId}
        className="relative w-full h-full rounded-[2rem] overflow-hidden text-left cursor-pointer block"
        style={{
          border: `1px solid rgba(46,143,163,0.2)`,
          boxShadow: `0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)`,
        }}
      >
        {/* Image */}
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {/* Color wash */}
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${service.accent}55 0%, ${B.teal}33 100%)`, mixBlendMode: 'multiply' }} />
          {/* Dark gradient */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(8,16,31,0.97) 0%, rgba(8,16,31,0.6) 45%, rgba(8,16,31,0.15) 100%)' }} />
        </div>

        {/* Ghost index number — large decorative */}
        <div className="absolute top-6 right-7 font-display font-black select-none pointer-events-none leading-none"
          style={{
            fontSize: isHero ? '9rem' : '6rem',
            color: 'rgba(255,255,255,0.04)',
            lineHeight: 1,
          }}>
          {service.index}
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-7 sm:p-9 text-white">

          {/* Icon badge */}
          <div className="mb-4 sm:mb-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${service.accent}30, ${B.teal}18)`,
                border: `1px solid ${service.accent}50`,
                backdropFilter: 'blur(8px)',
                boxShadow: `0 0 24px ${service.accent}30`,
              }}>
              <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: service.accent }} />
            </div>
          </div>

          <h3
            className="font-display font-extrabold leading-[1.05] mb-3 tracking-tight text-white"
            style={{ fontSize: isHero ? 'clamp(1.75rem, 3vw, 2.5rem)' : 'clamp(1.4rem, 2.2vw, 1.9rem)' }}
          >
            {service.title}
          </h3>

          <p className={`leading-relaxed mb-5 font-sans ${isHero ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} line-clamp-3`}
            style={{ color: 'rgba(244,246,245,0.6)' }}>
            {service.description}
          </p>

          {/* Divider */}
          <div className="w-full h-px mb-4"
            style={{ background: `linear-gradient(90deg, ${service.accent}50, transparent)` }} />

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {service.features.slice(0, isHero ? 4 : 2).map((f, i) => (
              <span key={i} className="px-2.5 py-1 text-[0.65rem] font-bold rounded-full tracking-wide uppercase"
                style={{
                  background: `${service.accent}18`,
                  border: `1px solid ${service.accent}35`,
                  color: service.accent,
                  backdropFilter: 'blur(4px)',
                }}>
                {f}
              </span>
            ))}
          </div>

          {/* CTA hint */}
          <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-[0.6rem] font-black uppercase tracking-[0.2em]" style={{ color: service.accent }}>
              Explore
            </span>
            <ArrowUpRight className="w-3 h-3" style={{ color: service.accent }} />
          </div>
        </div>

        {/* Hover glow rim */}
        <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${service.accent}40, 0 0 60px ${service.accent}15` }} />
      </button>

      {/* ── Popover panel ── */}
      <style>{`
        #${popoverId} {
          border: none; padding: 0; background: transparent;
          width: min(680px, 92vw); max-height: 88vh; overflow: visible;
          position: fixed; inset: 0; margin: auto;
          opacity: 0; scale: 0.95; translate: 0 12px;
          transition: opacity 0.35s ease, scale 0.35s ease, translate 0.35s ease,
            overlay 0.35s ease allow-discrete, display 0.35s ease allow-discrete;
        }
        #${popoverId}:popover-open { opacity: 1; scale: 1; translate: 0 0; }
        @starting-style { #${popoverId}:popover-open { opacity: 0; scale: 0.95; translate: 0 12px; } }
        #${popoverId}::backdrop {
          background: rgba(8,16,31,0.8); backdrop-filter: blur(8px);
          opacity: 0;
          transition: opacity 0.35s ease, overlay 0.35s ease allow-discrete, display 0.35s ease allow-discrete;
        }
        #${popoverId}:popover-open::backdrop { opacity: 1; }
        @starting-style { #${popoverId}:popover-open::backdrop { opacity: 0; } }
      `}</style>

      <div
        id={popoverId}
        popover="auto"
        className="rounded-[2rem] overflow-hidden cursor-pointer"
        style={{
          boxShadow: `0 48px 96px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)`,
        }}
        onClick={(e) => {
          const el = e.currentTarget as HTMLElement & { hidePopover?: () => void };
          el.hidePopover?.();
        }}
      >
        {/* Blurred bg */}
        <div className="absolute inset-0">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${service.accent}44, ${B.teal}22)`, mixBlendMode: 'multiply' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(8,16,31,0.97) 0%, rgba(8,16,31,0.75) 60%, rgba(8,16,31,0.45) 100%)' }} />
          {/* Glass overlay */}
          <div className="absolute inset-0"
            style={{ backdropFilter: 'blur(2px)', background: 'rgba(8,16,31,0.25)' }} />
        </div>

        {/* Close hint */}
        <div className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center pointer-events-none"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <X className="w-4 h-4 text-white/70" />
        </div>

        {/* Expanded content */}
        <div className="relative z-10 p-8 sm:p-10 text-white pointer-events-none">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${service.accent}30, ${B.teal}18)`,
                border: `1px solid ${service.accent}50`,
                boxShadow: `0 0 32px ${service.accent}30`,
              }}>
              <Icon className="w-8 h-8" style={{ color: service.accent }} />
            </div>
            <div>
              <p className="text-[0.6rem] font-black uppercase tracking-[0.25em] mb-1" style={{ color: service.accent }}>
                Service {service.index}
              </p>
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold leading-tight text-white">
                {service.title}
              </h3>
            </div>
          </div>

          <p className="text-base leading-[1.85] mb-8 font-sans" style={{ color: 'rgba(244,246,245,0.75)' }}>
            {service.description}
          </p>

          <div className="w-full h-px mb-6"
            style={{ background: `linear-gradient(90deg, ${service.accent}50, transparent)` }} />

          <div className="flex flex-wrap gap-2.5">
            {service.features.map((f, i) => (
              <span key={i} className="px-4 py-2 text-sm font-bold rounded-full tracking-wide"
                style={{
                  background: `${service.accent}18`,
                  border: `1px solid ${service.accent}40`,
                  color: service.accent,
                }}>
                {f}
              </span>
            ))}
          </div>

          <p className="mt-8 text-[0.65rem] font-black uppercase tracking-[0.2em] opacity-40 text-center">
            Click anywhere to close
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────
const Services = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <>
      <section
        id="services"
        className="relative overflow-hidden py-24 lg:py-36"
        style={{ background: 'linear-gradient(180deg, #0D1F2E 0%, #0A1A28 50%, #081018 100%)' }}
      >
        {/* Anchors for nav */}
        <div id="events" className="absolute top-0 pointer-events-none" />
        <div id="training" className="absolute top-1/2 pointer-events-none" />

        {/* ── Background atmosphere ── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Large ambient glow top-left */}
          <div className="absolute top-[-15%] left-[-10%] w-[700px] h-[700px] rounded-full blur-[160px] opacity-30"
            style={{ background: B.teal }} />
          {/* Glow bottom-right */}
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-20"
            style={{ background: B.green }} />
          {/* SVG wave */}
          <svg viewBox="0 0 1000 800" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-30">
            <defs>
              <linearGradient id="svcWave" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={B.green} stopOpacity="0.0" />
                <stop offset="35%" stopColor={B.green} stopOpacity="0.18" />
                <stop offset="65%" stopColor={B.teal} stopOpacity="0.35" />
                <stop offset="100%" stopColor="#0D1F2E" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <path fill="url(#svcWave)"
              d="M0,800 C150,760 320,720 480,640 C660,550 820,420 940,220 C980,130 995,55 1000,0 L1000,800Z" />
          </svg>
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(${B.teal} 1px, transparent 1px), linear-gradient(90deg, ${B.teal} 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">

          {/* ── Section header ── */}
          <div ref={headerRef} className="mb-16 lg:mb-24 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7"
              style={{
                background: 'linear-gradient(135deg, rgba(46,143,163,0.18) 0%, rgba(93,187,138,0.12) 100%)',
                border: '1px solid rgba(93,187,138,0.35)',
                boxShadow: '0 0 20px rgba(93,187,138,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <Logo className="h-6 w-auto" style={{ filter: 'brightness(1.4) saturate(1.3)' }} />
              <div className="w-px h-4 mx-0.5" style={{ background: 'rgba(93,187,138,0.3)' }} />
              <span className="text-[0.65rem] font-black uppercase tracking-[0.22em]" style={{ color: B.green }}>
                What We Offer
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display font-extrabold text-white leading-[1.06] tracking-tight mb-5"
            >
              Our{' '}
              <span
                className="relative inline-block"
                style={{
                  WebkitTextStroke: '1px transparent',
                  backgroundImage: `linear-gradient(135deg, ${B.green} 0%, ${B.teal} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Services
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="text-base sm:text-lg leading-relaxed font-sans max-w-xl"
              style={{ color: 'rgba(244,246,245,0.5)' }}
            >
              Strategic solutions engineered for biotech excellence — from discovery to commercialization.
            </motion.p>
          </div>

          {/* ── Asymmetric layout ── */}
          {/* Mobile: single column stack. Desktop: hero left + 2 stacked right */}
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-6" style={{ minHeight: '680px' }}>

            {/* Hero card — left, full height */}
            <div className="w-full lg:w-[52%] min-h-[480px] lg:min-h-0">
              <ServiceCard service={services[0]} layout="hero" delay={0} />
            </div>

            {/* Two stacked cards — right column */}
            <div className="w-full lg:w-[48%] flex flex-col gap-5 lg:gap-6">
              <div className="flex-1 min-h-[300px]">
                <ServiceCard service={services[1]} layout="stacked" delay={0.12} />
              </div>
              <div className="flex-1 min-h-[300px]">
                <ServiceCard service={services[2]} layout="stacked" delay={0.22} />
              </div>
            </div>

          </div>

          {/* ── Bottom label row ── */}
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-between gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-6">
              {services.map((s) => (
                <div key={s.id} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.accent }} />
                  <span className="text-[0.6rem] font-black uppercase tracking-[0.18em]"
                    style={{ color: 'rgba(244,246,245,0.3)' }}>
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default Services;