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
  { label: 'Training', href: '/#training' },
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
          <div className="hidden lg:block nav-item flex-shrink-0">
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