'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Logo } from '../components/Logo';

interface SubItem {
  label: string;
  href: string;
  description?: string;
}

interface NavLink {
  label: string;
  href: string;
  children?: SubItem[];
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '/#home' },
  { label: 'About Us', href: '/about' },
  { label: 'Consulting Services', href: '/#services' },
  { label: 'Events', href: '/#events' },
  { label: 'Training', href: '/training' },
  { label: 'News', href: '/news' },
  { label: 'Our Ecosystem', href: '/ecosystem' },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const pathname = usePathname();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(
      nav,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );

    const navItems = nav.querySelectorAll('.nav-item');
    gsap.fromTo(
      navItems,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.5 }
    );
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith('/#')) {
      return pathname === '/' && (typeof window !== 'undefined' && window.location.hash === href.substring(1));
    }
    return pathname === href;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      const targetId = href.split('#')[1];
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    }
  };


  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg py-3"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/#home"
            onClick={(e) => handleNavClick(e, '/#home')}
            className="flex items-center gap-2 nav-item flex-shrink-0"
          >
            <Logo
              className="h-8 w-auto lg:h-10 transition-all duration-300"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`nav-item px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${isActive(link.href)
                  ? 'text-brand-teal bg-teal-50/50'
                  : 'text-navy/70 hover:text-navy hover:bg-slate-50'
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-6 nav-item flex-shrink-0">
            <a
              href="https://wa.me/971501984551"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#128C7E] font-semibold text-sm transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <a
              href="mailto:info@nucleos-biotech.com"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 no-underline bg-brand-teal text-white hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/20"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors duration-300 text-navy"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${isMobileMenuOpen ? 'max-h-[80vh] opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[70vh] border border-slate-100">
            {navLinks.map((link) => (
              <div key={link.label} className="border-b border-slate-100 last:border-0">
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`w-full flex items-center justify-between px-6 py-4 font-semibold transition-colors ${isActive(link.href) ? 'text-brand-teal bg-teal-50' : 'text-navy hover:bg-teal-50'
                    }`}
                >
                  <span>{link.label}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;