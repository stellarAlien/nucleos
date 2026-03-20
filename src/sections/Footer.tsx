'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Mail, Phone, Linkedin, Twitter, Facebook, Instagram, ArrowUpRight, ExternalLink } from 'lucide-react';
import { Logo } from '../components/Logo';

const B = { green: '#5DBB8A', teal: '#2E8FA3', warmWhite: '#F4F6F5', navy: '#1E2F44' };

const quickLinks = [
  { label: 'Home',     href: '/#home' },
  { label: 'Services', href: '/#services' },
  { label: 'About Us', href: '/about' },
  { label: 'News',     href: '/#news' },
  { label: 'Contact',  href: '/#contact' },
];

const services = [
  { label: 'Events Organization', href: '/#events' },
  { label: 'Training Programs',   href: '/#training' },
  { label: 'Consulting',          href: '/#services' },
];

const socialLinks = [
  { icon: Linkedin,  href: 'https://www.linkedin.com/company/nucleosbiotech/', label: 'LinkedIn' },
  { icon: Twitter,   href: '#',                                                  label: 'Twitter' },
  { icon: Facebook,  href: '#',                                                  label: 'Facebook' },
  { icon: Instagram, href: '#',                                                  label: 'Instagram' },
  {
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    href: 'https://wa.me/971501984551',
    label: 'WhatsApp',
    isWhatsApp: true,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE, delay } },
});

const handleNavClick = (href: string) => {
  if (href.startsWith('/#')) {
    const el = document.getElementById(href.split('#')[1]);
    el?.scrollIntoView({ behavior: 'smooth' });
  }
};

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative overflow-hidden text-white"
      style={{ background: '#07131C' }}
    >
      {/* ── Top wave ── */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
          <path
            d="M0,0V32c60,18,140,28,220,24C380,48,500,12,640,8c130-4,260,20,380,28,60,4,120,0,180-8V0Z"
            style={{ fill: '#0D1F2E' }}
          />
        </svg>
      </div>

      {/* ── Gradient mesh background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Base: very dark navy, slightly warm */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, #0A1E2C 0%, #07121C 50%, #050D16 100%)' }} />

        {/* TEAL — large dominant bloom, top-right corner */}
        <div className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full"
          style={{ background: B.teal, opacity: 0.18, filter: 'blur(90px)' }} />

        {/* GREEN — large dominant bloom, bottom-left corner */}
        <div className="absolute bottom-[-15%] left-[-8%] w-[650px] h-[650px] rounded-full"
          style={{ background: B.green, opacity: 0.14, filter: 'blur(100px)' }} />

        {/* TEAL — secondary mid-bloom, center-left */}
        <div className="absolute top-[35%] left-[10%] w-[380px] h-[280px] rounded-full"
          style={{ background: B.teal, opacity: 0.1, filter: 'blur(80px)' }} />

        {/* GREEN — secondary accent, center-right */}
        <div className="absolute top-[20%] right-[18%] w-[320px] h-[280px] rounded-full"
          style={{ background: B.green, opacity: 0.09, filter: 'blur(70px)' }} />

        {/* Diagonal brand gradient wash across the whole footer */}
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${B.teal}1A 0%, transparent 35%, ${B.green}12 65%, transparent 100%)` }} />

        {/* Grid overlay — slightly more visible */}
        <div className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: `linear-gradient(${B.teal} 1px, transparent 1px), linear-gradient(90deg, ${B.teal} 1px, transparent 1px)`,
            backgroundSize: '72px 72px',
          }} />

        {/* Noise grain */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
          }} />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 pt-28 sm:pt-36 pb-10 px-4 sm:px-6 lg:px-10 xl:px-16 container mx-auto">

        {/* Top divider with brand accent */}
        <motion.div
          className="w-full h-px mb-14 sm:mb-20"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1, ease: EASE }}
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${B.teal}60 30%, ${B.green}80 55%, ${B.teal}40 80%, transparent 100%)`,
            transformOrigin: 'left',
          }}
        />

        {/* ── 4-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 sm:mb-20">

          {/* Col 1 — Brand */}
          <motion.div
            variants={fadeUp(0)} initial="hidden" animate={inView ? 'show' : 'hidden'}
            className="sm:col-span-2 lg:col-span-1"
          >
            {/* Logo — forced white so navy "Nucleos" text is readable on dark background */}
            <a href="/#home" className="inline-block mb-6 group" onClick={(e) => { e.preventDefault(); handleNavClick('/#home'); }}>
              <Logo
                className="h-14 w-auto transition-all duration-300"
                style={{
                  filter: 'brightness(0) invert(1) drop-shadow(0 0 10px rgba(93,187,138,0.3))',
                }}
              />
            </a>

            <p className="text-sm leading-[1.85] mb-7 max-w-[280px]"
              style={{ color: 'rgba(244,246,245,0.45)' }}>
              Driving excellence in Strategic Consultancy. We partner with leading biotech organizations to accelerate innovation and achieve success.
            </p>

            {/* Social icons */}
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                if (s.isWhatsApp) {
                  return (
                    <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group"
                      style={{
                        background: 'rgba(37,211,102,0.12)',
                        border: '1px solid rgba(37,211,102,0.25)',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#25D366'; (e.currentTarget as HTMLElement).style.borderColor = '#25D366'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.25)'; }}
                    >
                      <Icon className="w-4 h-4 transition-colors duration-300" style={{ color: '#25D366' }} />
                    </a>
                  );
                }
                return (
                  <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: `rgba(46,143,163,0.1)`,
                      border: `1px solid rgba(46,143,163,0.2)`,
                      color: 'rgba(244,246,245,0.45)',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = `${B.teal}30`;
                      el.style.borderColor = `${B.teal}60`;
                      el.style.color = B.green;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = `rgba(46,143,163,0.1)`;
                      el.style.borderColor = `rgba(46,143,163,0.2)`;
                      el.style.color = 'rgba(244,246,245,0.45)';
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Col 2 — Quick Links */}
          <motion.div variants={fadeUp(0.1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <p className="text-[0.6rem] font-black uppercase tracking-[0.25em] mb-1" style={{ color: B.green }}>
              Navigate
            </p>
            <h4 className="font-display font-bold text-white text-base mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { if (link.href.startsWith('/#')) { e.preventDefault(); handleNavClick(link.href); } }}
                    className="text-sm flex items-center gap-2.5 group transition-colors duration-200"
                    style={{ color: 'rgba(244,246,245,0.45)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = B.warmWhite}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(244,246,245,0.45)'}
                  >
                    <span className="w-3 h-px flex-shrink-0 transition-all duration-300 group-hover:w-5"
                      style={{ background: B.teal }} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Services */}
          <motion.div variants={fadeUp(0.18)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <p className="text-[0.6rem] font-black uppercase tracking-[0.25em] mb-1" style={{ color: B.green }}>
              Capabilities
            </p>
            <h4 className="font-display font-bold text-white text-base mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    onClick={(e) => { if (s.href.startsWith('/#')) { e.preventDefault(); handleNavClick(s.href); } }}
                    className="text-sm flex items-center gap-2.5 group transition-colors duration-200"
                    style={{ color: 'rgba(244,246,245,0.45)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = B.warmWhite}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(244,246,245,0.45)'}
                  >
                    <span className="w-3 h-px flex-shrink-0 transition-all duration-300 group-hover:w-5"
                      style={{ background: B.green }} />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Small location badge */}
            <div className="mt-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.65rem] font-semibold"
              style={{
                background: `rgba(46,143,163,0.08)`,
                border: `1px solid rgba(46,143,163,0.18)`,
                color: 'rgba(244,246,245,0.4)',
              }}>
              <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: B.teal }} />
              Masdar City, Abu Dhabi, UAE
            </div>
          </motion.div>

          {/* Col 4 — Contact */}
          <motion.div variants={fadeUp(0.26)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <p className="text-[0.6rem] font-black uppercase tracking-[0.25em] mb-1" style={{ color: B.green }}>
              Reach Us
            </p>
            <h4 className="font-display font-bold text-white text-base mb-6">Contact Us</h4>

            <ul className="space-y-4 mb-8">
              <li>
                <a href="mailto:info@nucleos-biotech.com"
                  className="flex items-center gap-3 text-sm group transition-colors duration-200"
                  style={{ color: 'rgba(244,246,245,0.5)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = B.warmWhite}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(244,246,245,0.5)'}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${B.teal}15`, border: `1px solid ${B.teal}30` }}>
                    <Mail className="w-3.5 h-3.5" style={{ color: B.teal }} />
                  </div>
                  info@nucleos-biotech.com
                </a>
              </li>
              <li>
                <a href="tel:+971501984551"
                  className="flex items-center gap-3 text-sm group transition-colors duration-200"
                  style={{ color: 'rgba(244,246,245,0.5)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = B.warmWhite}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(244,246,245,0.5)'}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${B.green}15`, border: `1px solid ${B.green}30` }}>
                    <Phone className="w-3.5 h-3.5" style={{ color: B.green }} />
                  </div>
                  +971 50 198 4551
                </a>
              </li>
            </ul>

            {/* CTA button */}
            <a
              href="mailto:info@nucleos-biotech.com"
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-300 group relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${B.green} 0%, ${B.teal} 100%)`,
                boxShadow: `0 8px 32px rgba(93,187,138,0.25), 0 2px 8px rgba(0,0,0,0.3)`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px rgba(93,187,138,0.4), 0 2px 8px rgba(0,0,0,0.3)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px rgba(93,187,138,0.25), 0 2px 8px rgba(0,0,0,0.3)`; }}
            >
              {/* Sheen */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)' }} />
              Get in Touch
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 relative z-10" />
            </a>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: `1px solid rgba(46,143,163,0.12)` }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-xs text-center sm:text-left" style={{ color: 'rgba(244,246,245,0.25)' }}>
            © {new Date().getFullYear()} Nucleos Biotech. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
              <span key={item} className="flex items-center">
                {i > 0 && <span className="mx-3 w-px h-3 inline-block opacity-20"
                  style={{ background: B.teal }} />}
                <a href="#"
                  className="text-xs transition-colors duration-200"
                  style={{ color: 'rgba(244,246,245,0.25)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = B.teal}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(244,246,245,0.25)'}
                >
                  {item}
                </a>
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;