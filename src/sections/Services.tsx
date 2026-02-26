'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, GraduationCap, Microscope, X } from 'lucide-react';
import { Logo } from '../components/Logo';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: 'Events Organization',
    description:
      'We orchestrate premier scientific conferences, symposiums, and networking events that connect industry leaders, foster collaboration, and showcase cutting-edge research in biotechnology and CGT.',
    image: '/images/service-events.jpg',
    icon: Calendar,
    features: ['Scientific Conferences', 'Industry Summits', 'Networking Events', 'Workshop Coordination'],
    color: 'from-emerald-400 to-cyan-600',
  },
  {
    id: 2,
    title: 'Training',
    description:
      'Comprehensive training programs designed to equip your team with the knowledge and skills needed to excel in biotech innovation, regulatory compliance, and advanced therapeutic development.',
    image: '/images/service-training.jpg',
    icon: GraduationCap,
    features: ['Regulatory Training', 'Technical Workshops', 'Leadership Programs', 'Certification Courses'],
    color: 'from-teal-400 to-emerald-600',
  },
  {
    id: 3,
    title: 'Strategic Consultancy',
    description:
      'End-to-end consultancy in biotech innovation, from early-stage research to commercialization. We provide strategic guidance for CGT development, manufacturing, and market entry.',
    image: '/images/service-cgt.jpg',
    icon: Microscope,
    features: ['Strategic Consulting', 'Process Development', 'Market Access'],
    color: 'from-cyan-400 to-blue-600',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <>
      <style>{`
        [popover] {
          border: none;
          padding: 0;
          background: transparent;
          width: min(680px, 92vw);
          max-height: 90vh;
          overflow: visible;
          position: fixed;
          inset: 0;
          margin: auto;

          opacity: 0;
          scale: 0.94;
          translate: 0 10px;
          transition:
            opacity 0.3s ease,
            scale 0.3s ease,
            translate 0.3s ease,
            overlay 0.3s ease allow-discrete,
            display 0.3s ease allow-discrete;
        }
        [popover]:popover-open {
          opacity: 1;
          scale: 1;
          translate: 0 0;
        }
        @starting-style {
          [popover]:popover-open {
            opacity: 0;
            scale: 0.94;
            translate: 0 10px;
          }
        }
        [popover]::backdrop {
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(5px);
          opacity: 0;
          transition:
            opacity 0.3s ease,
            overlay 0.3s ease allow-discrete,
            display 0.3s ease allow-discrete;
        }
        [popover]:popover-open::backdrop {
          opacity: 1;
        }
        @starting-style {
          [popover]:popover-open::backdrop {
            opacity: 0;
          }
        }
      `}</style>

      <section ref={sectionRef} id="services" className="relative bg-white overflow-hidden py-20 lg:py-32">
        <div id="events" className="absolute top-0 pointer-events-none" />
        <div id="training" className="absolute top-1/2 pointer-events-none" />
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-teal-50 blur-[140px] opacity-80" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle, #2e8fa3 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="relative z-10 section-padding container mx-auto">
          {/* Section Header */}
          <div ref={titleRef} className="text-center max-w-4xl mx-auto mb-16 lg:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-teal-100 rounded-full mb-6 shadow-sm">
              <Logo className="h-7 w-auto" />
              <span className="text-sm font-semibold text-teal-700 tracking-wide uppercase">
                What We Offer
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Services</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Strategic solutions engineered for biotech excellence. Explore our specialized capabilities.
            </p>
          </div>

          {/* Services Grid */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const popoverId = `service-popover-${service.id}`;

              return (
                <div key={service.id} className="service-card group relative h-[500px] flex-shrink-0">

                  {/* ── Card — acts as the popover trigger ── */}
                  <button
                    popoverTarget={popoverId}
                    className="relative w-full h-full bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 text-left cursor-pointer"
                  >
                    {/* Image layer */}
                    <div className="absolute inset-0">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-70 mix-blend-multiply`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-800/30" />
                    </div>

                    {/* Card content */}
                    <div className="relative h-full flex flex-col justify-end p-8 text-white">
                      {/* Index */}
                      <div className="absolute top-6 right-6 flex items-start gap-1 opacity-30">
                        <span className="text-5xl font-display font-bold text-white/40">0</span>
                        <span className="text-5xl font-display font-bold text-white/60">{index + 1}</span>
                      </div>

                      {/* Icon */}
                      <div className="mb-5">
                        <div className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                      </div>

                      <h3 className="text-3xl font-display font-bold mb-3 leading-tight">
                        {service.title}
                      </h3>

                      <p className="text-white/60 text-sm leading-relaxed mb-5 line-clamp-3">
                        {service.description}
                      </p>

                      <div className="w-full h-px bg-white/15 mb-4" />

                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white/90 text-xs font-semibold rounded-full border border-white/30 tracking-wide"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Expand hint */}
                      <p className="mt-5 text-white/35 text-xs tracking-widest uppercase">
                        Click to expand
                      </p>
                    </div>
                  </button>

                  {/* ── Popover panel ── */}
                  <div
                    id={popoverId}
                    // @ts-expect-error
                    popover="auto"
                    onClick={(e) => {
                      // Close when clicking anywhere inside the popover
                      const popover = e.currentTarget as HTMLDivElement & { hidePopover: () => void };
                      if (typeof popover.hidePopover === 'function') {
                        popover.hidePopover();
                      }
                    }}
                    className="rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer"
                  >
                    {/* Background */}
                    <div className="absolute inset-0">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-60 mix-blend-multiply`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/85 to-slate-800/60" />
                    </div>

                    {/* X icon indicator */}
                    <div className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white pointer-events-none">
                      <X className="w-5 h-5" />
                    </div>

                    {/* Expanded content */}
                    <div className="relative z-10 p-10 text-white pointer-events-none">
                      {/* Icon + title */}
                      <div className="flex items-center gap-5 mb-6">
                        <div className="w-16 h-16 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg flex-shrink-0">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-4xl font-display font-bold leading-tight">
                          {service.title}
                        </h3>
                      </div>

                      {/* Full description */}
                      <p className="text-white/75 text-base leading-relaxed mb-8">
                        {service.description}
                      </p>

                      <div className="w-full h-px bg-white/15 mb-6" />

                      {/* Tags — larger in expanded view */}
                      <div className="flex flex-wrap gap-3">
                        {service.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/30 tracking-wide"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;