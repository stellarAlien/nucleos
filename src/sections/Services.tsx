'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Calendar, 
  GraduationCap, 
  Microscope, 
  X, 
  ArrowUpRight 
} from 'lucide-react';
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
      'We orchestrate premier scientific conferences, symposiums, and networking events that connect industry leaders, foster collaboration, and showcase research in biotechnology.',
    image: '/images/service-events.jpg',
    icon: Calendar,
    features: ['Scientific Conferences', 'Industry Summits', 'Networking Events'],
    accent: B.green,
    index: '01',
  },
  {
    id: 2,
    title: 'Training',
    description:
      'Comprehensive training programs designed to equip your team with the skills needed to excel in biotech innovation and regulatory compliance.',
    image: '/images/service-training.jpg',
    icon: GraduationCap,
    features: ['Regulatory Training', 'Technical Workshops'],
    accent: B.green,
    index: '02',
  },
  {
    id: 3,
    title: 'Strategic Consultancy',
    description:
      'End-to-end consultancy in biotech innovation, from early-stage research to commercialization and market entry.',
    image: '/images/service-cgt.jpg',
    icon: Microscope,
    features: ['Strategic Consulting', 'Process Development'],
    accent: B.green,
    index: '03',
  },
];

// ── Service Card ──────────────────────────────────────────
function ServiceCard({ service, layout, delay }: { service: typeof services[0]; layout: 'hero' | 'stacked'; delay: number }) {
  const Icon = service.icon;
  const popoverId = `svc-pop-${service.id}`;

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      <button
        popoverTarget={popoverId}
        className="relative w-full h-full rounded-[2.5rem] overflow-hidden text-left cursor-pointer border border-white/5 shadow-2xl group min-h-[300px]"
      >
        <div className="absolute inset-0">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081018] via-[#081018]/60 to-transparent" />
        </div>

        <div className="relative h-full flex flex-col justify-end p-8 sm:p-10 text-white z-10">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" 
               style={{ background: `${service.accent}20`, border: `1px solid ${service.accent}40`, backdropFilter: 'blur(8px)' }}>
            <Icon size={24} style={{ color: service.accent }} />
          </div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl mb-2">{service.title}</h3>
          <p className="text-sm opacity-60 line-clamp-2 mb-4">{service.description}</p>
          <div className="flex items-center gap-2 text-[0.6rem] font-black uppercase tracking-widest" style={{ color: service.accent }}>
            Explore <ArrowUpRight size={14} />
          </div>
        </div>
      </button>

      {/* Popover */}
      <div id={popoverId} popover="auto" className="rounded-[2rem] bg-[#0A1A28] text-white p-10 border border-white/10 shadow-2xl backdrop-blur-xl max-w-2xl">
         <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-display font-bold">{service.title}</h2>
            <X className="cursor-pointer opacity-50 hover:opacity-100" onClick={(e: any) => e.target.closest('[popover]').hidePopover()} />
         </div>
         <p className="text-white/70 leading-relaxed mb-6">{service.description}</p>
         <div className="flex flex-wrap gap-2">
            {service.features.map((f, i) => (
                <span key={i} className="px-4 py-2 rounded-full text-xs font-bold border border-white/10 bg-white/5">{f}</span>
            ))}
         </div>
      </div>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────
const Services = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="services" className="relative flex items-center justify-center overflow-hidden py-24 lg:py-36 bg-[#081018]">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full blur-[150px] opacity-20" style={{ background: B.teal }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[130px] opacity-15" style={{ background: B.green }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-16 flex flex-col items-center">
        
        {/* ── Centered Header ── */}
        <div ref={headerRef} className="mb-20 lg:mb-24 w-full max-w-4xl text-center flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-3 px-6 py-2.5 bg-white rounded-full mb-8 shadow-2xl"
          >
            <Logo className="h-7 w-auto" />
            <div className="w-px h-4 bg-slate-200 mx-1" />
            <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-600">
              What We Offer
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="text-5xl lg:text-[4.5rem] font-display font-extrabold text-white leading-tight mb-6"
          >
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5DBB8A] to-[#2E8FA3]">
              Services
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/50 max-w-2xl font-sans"
          >
            Strategic solutions engineered for biotech excellence — from discovery to commercialization.
          </motion.p>
        </div>

        {/* ── Grid Layout ── */}
        <div className="grid lg:grid-cols-12 gap-6 w-full max-w-7xl">
          <div className="lg:col-span-7">
            <ServiceCard service={services[0]} layout="hero" delay={0.1} />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ServiceCard service={services[1]} layout="stacked" delay={0.2} />
            <ServiceCard service={services[2]} layout="stacked" delay={0.3} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;