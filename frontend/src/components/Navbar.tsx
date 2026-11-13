'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Calculator, MapPin } from 'lucide-react';
import VisualEditableText from '@/components/visual-editor/VisualEditableText';
import VisualEditableButton from '@/components/visual-editor/VisualEditableButton';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { useSiteConfig } from '@/context/SiteConfigContext';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const { texts } = useSiteConfig();

  const cleanPhone = texts.phone ? texts.phone.replace(/[^0-9]/g, '') : '5493834272000';
  const instagramUrl = texts.instagram || 'https://www.instagram.com/luminadia_catam/';

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }

  // Close cleanly on Escape, click outside, or resize to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setMobileMenuOpen(false);
      }
    };
    mq.addEventListener('change', handleMediaChange);
    return () => mq.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/servicios/automotriz', label: 'Automotriz' },
    { href: '/servicios/hogares', label: 'Hogares' },
    { href: '/servicios/comercios-empresas', label: 'Comercios y Empresas' },
    { href: '/servicios/mas-servicios', label: '+ Servicios' },
    { href: '/laminas', label: 'Láminas' },
    { href: '/proyectos', label: 'Proyectos' },
    { href: '/contacto', label: 'Contacto' },
  ];

  const isRouteActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-[#1E242B]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Oficial LuminADia */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B3B6B9] rounded-sm"
            aria-label="LuminADia · Inicio"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0">
              <Image
                src="/images/luminadia-logo.png"
                alt="LuminADia"
                width={44}
                height={44}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <VisualEditableText
                contentKey="businessName"
                label="Nombre de la Empresa"
                className="text-xl font-black tracking-tight text-white leading-tight"
              >
                LuminADia
              </VisualEditableText>
              <VisualEditableText
                contentKey="navbarSubtitle"
                label="Subtítulo Navbar"
                className="text-[10px] font-semibold tracking-wider text-[#B3B6B9]"
              >
                LÁMINAS DE CONTROL SOLAR
              </VisualEditableText>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Navegación principal">
            {navLinks.map((link) => {
              const isActive = isRouteActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white font-bold border-b-2 border-white pb-0.5'
                      : 'text-[#B3B6B9] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden lg:flex items-center gap-4">
            <VisualEditableButton
              textKey="navbarCtaCalc"
              urlKey="navbarCtaCalcUrl"
              label="Botón Calculadora (Navbar)"
              defaultText="Calculadora"
              defaultHref="/calculadora-materiales"
              icon={<Calculator className="w-4 h-4 text-[#1E242B]" />}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-[#1E242B] font-bold text-sm transition-colors focus-visible:ring-2 focus-visible:ring-white"
            />
          </div>

          {/* Mobile Controls: Calculadora + Morphing Hamburger */}
          <div className="flex lg:hidden items-center gap-2.5">
            <Link
              href="/calculadora-materiales"
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-xl bg-white hover:bg-neutral-100 text-[#1E242B] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Abrir Calculadora de materiales"
            >
              <Calculator className="w-5 h-5" aria-hidden="true" />
            </Link>

            <button
              ref={toggleButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="mobile-nav-toggle relative w-10 h-10 rounded-lg flex flex-col items-center justify-center gap-1.5 text-[#B3B6B9] hover:text-white hover:bg-[#283039]/80 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span
                aria-hidden="true"
                className={`w-5 h-[2px] rounded-full transition-[transform,background-color] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                  mobileMenuOpen ? 'translate-y-[8px] rotate-45 bg-white' : 'bg-current'
                }`}
              />
              <span
                aria-hidden="true"
                className={`w-5 h-[2px] rounded-full transition-[transform,opacity] duration-150 ease-out origin-center ${
                  mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 bg-current'
                }`}
              />
              <span
                aria-hidden="true"
                className={`w-5 h-[2px] rounded-full transition-[transform,background-color] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                  mobileMenuOpen ? '-translate-y-[8px] -rotate-45 bg-white' : 'bg-current'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with GPU-composited unfolding & snappy staggered item reveal */}
      <div
        id="mobile-navigation"
        data-open={mobileMenuOpen}
        inert={!mobileMenuOpen}
        className={`mobile-drawer lg:hidden absolute top-full inset-x-0 border-b border-white/10 bg-[#1E242B]/[0.97] backdrop-blur-md shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] ${
          mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="px-4 sm:px-6 py-5 space-y-4 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain">
          <nav className="flex flex-col space-y-1 text-sm" aria-label="Navegación móvil">
            {navLinks.map((link, index) => {
              const isActive = isRouteActive(link.href);
              return (
                <div
                  key={link.href}
                  style={{ '--stagger-delay': `${index * 22}ms` } as React.CSSProperties}
                  className="mobile-drawer-item"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`py-2.5 px-3 rounded-lg text-sm transition-colors duration-150 flex items-center ${
                      isActive
                        ? 'text-white font-semibold border-l-2 border-white bg-[#283039]/80 pl-3.5'
                        : 'text-[#B3B6B9] hover:text-white hover:bg-[#283039]/40'
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                </div>
              );
            })}
          </nav>

          <div
            style={{ '--stagger-delay': `${navLinks.length * 22}ms` } as React.CSSProperties}
            className="mobile-drawer-item pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#B3B6B9]"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-1.5 transition-colors"
                aria-label="Instagram de LuminADia"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-1.5 transition-colors"
                aria-label="WhatsApp de LuminADia"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" variant="monochrome" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Padre+Zanello+341,+San+Fernando+del+Valle+de+Catamarca"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-1.5 transition-colors"
                aria-label="Ubicación de LuminADia en Catamarca"
              >
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Ubicación</span>
              </a>
            </div>

            <span className="text-[#B3B6B9]/70 font-mono text-[11px]">LuminADia</span>
          </div>
        </div>
      </div>
    </header>
  );
}
