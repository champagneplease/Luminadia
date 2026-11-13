'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Calculator, Phone, ArrowUpRight, MapPin } from 'lucide-react';
import VisualEditableText from '@/components/visual-editor/VisualEditableText';
import VisualEditableButton from '@/components/visual-editor/VisualEditableButton';
import VisualEditableImage from '@/components/visual-editor/VisualEditableImage';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
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

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#1E242B]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Oficial LuminADia */}
            <Link
              href="/"
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
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
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

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-3">
              <Link
                href="/calculadora-materiales"
                className="p-2.5 rounded-xl bg-white text-[#1E242B] font-bold text-sm flex items-center justify-center"
                aria-label="Abrir Calculadora de materiales"
              >
                <Calculator className="w-5 h-5" />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-[#283039] text-white hover:text-white focus-visible:ring-2 focus-visible:ring-white"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with smooth slide-down */}
      <div
        id="mobile-navigation"
        className={`fixed inset-x-0 top-20 bottom-0 z-40 bg-[#1E242B] flex flex-col justify-between p-6 overflow-y-auto lg:hidden transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-xs font-bold text-[#B3B6B9] mb-2">
            Navegación
          </span>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-medium py-3 flex items-center justify-between transition-colors ${
                  isActive ? 'text-white font-bold' : 'text-[#B3B6B9] hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-5 h-5 text-[#B3B6B9]" />
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 pt-6">
          <Link
            href="/calculadora-materiales"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white hover:bg-neutral-100 text-[#1E242B] font-bold text-base transition-colors"
          >
            <Calculator className="w-5 h-5" />
            <span>Calculadora de Materiales</span>
          </Link>

          <a
            href="https://wa.me/5493834272000"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#283039] text-white hover:text-white font-medium text-base transition-colors"
          >
            <Phone className="w-4 h-4 text-white" />
            <span>WhatsApp: +54 9 383 427-2000</span>
          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Padre+Zanello+341,+San+Fernando+del+Valle+de+Catamarca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-center text-[#B3B6B9] hover:text-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 shrink-0 text-white/80" />
            <span>Padre Zanello 341, San Fernando del Valle de Catamarca</span>
          </a>
        </div>
      </div>
    </>
  );
}
