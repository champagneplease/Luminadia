'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calculator, ShieldCheck, Sun, Phone, ArrowUpRight } from 'lucide-react';

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
    { href: '/laminas', label: 'Láminas' },
    { href: '/proyectos', label: 'Proyectos' },
    { href: '/contacto', label: 'Contacto' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 border-b ${
          scrolled
            ? 'bg-[#0e1110]/95 backdrop-blur-md border-[#2a322f]'
            : 'bg-[#0e1110] border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
              aria-label="Luminadia — Inicio"
            >
              <div className="w-10 h-10 rounded-lg bg-[#161a19] border border-[#2a322f] flex items-center justify-center text-amber-500 group-hover:border-amber-500/50 transition-colors">
                <Sun className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[#f4f3ef] leading-tight">
                  LUMINADIA
                </span>
                <span className="text-[11px] font-medium tracking-widest text-[#9aa19d] uppercase">
                  Control Solar · Catamarca
                </span>
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
                        ? 'text-amber-500 font-semibold'
                        : 'text-[#9aa19d] hover:text-[#f4f3ef]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA Action */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/calculadora-materiales"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-[#0e1110] font-semibold text-sm transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculadora</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-3">
              <Link
                href="/calculadora-materiales"
                className="p-2.5 rounded-lg bg-amber-600 text-[#0e1110] font-medium text-sm flex items-center justify-center"
                aria-label="Abrir Calculadora de materiales"
              >
                <Calculator className="w-5 h-5" />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-lg bg-[#161a19] border border-[#2a322f] text-[#f4f3ef] hover:text-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500"
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

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 top-20 z-40 bg-[#0e1110] flex flex-col justify-between p-6 overflow-y-auto lg:hidden"
        >
          <div className="flex flex-col gap-2 pt-2">
            <span className="text-xs uppercase tracking-wider text-[#9aa19d] font-semibold mb-2">
              Menú de navegación
            </span>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-medium py-3 border-b border-[#1c2220] flex items-center justify-between ${
                    isActive ? 'text-amber-500 font-bold' : 'text-[#f4f3ef] hover:text-amber-400'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#9aa19d]" />
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-[#2a322f]">
            <Link
              href="/calculadora-materiales"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-[#0e1110] font-bold text-base transition-colors"
            >
              <Calculator className="w-5 h-5" />
              <span>Calculadora de Materiales</span>
            </Link>

            <a
              href="https://wa.me/5493834272000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#161a19] border border-[#2a322f] text-[#f4f3ef] hover:text-amber-500 font-medium text-base transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-500" />
              <span>WhatsApp: +54 9 383 427-2000</span>
            </a>

            <p className="text-xs text-center text-[#9aa19d]">
              Padre Zanello 341, San Fernando del Valle de Catamarca
            </p>
          </div>
        </div>
      )}
    </>
  );
}
