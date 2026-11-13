'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Calculator, Phone, ArrowUpRight, MapPin } from 'lucide-react';
import VisualEditableText from '@/components/visual-editor/VisualEditableText';
import VisualEditableButton from '@/components/visual-editor/VisualEditableButton';

type MenuState = 'closed' | 'opening' | 'open' | 'closing';

export default function Navbar() {
  const [menuState, setMenuState] = useState<MenuState>('closed');
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (menuState === 'opening' || menuState === 'open') {
      setMenuState('closing');
    }
  }

  const isMenuActive = menuState === 'opening' || menuState === 'open';
  const isRendered = menuState !== 'closed';

  const openMenu = useCallback(() => {
    setMenuState((prev) => {
      if (prev === 'open' || prev === 'opening') return prev;
      if (prev === 'closing') return 'open';
      return 'opening';
    });
  }, []);

  const closeMenu = useCallback(() => {
    setMenuState((prev) => {
      if (prev === 'closed' || prev === 'closing') return prev;
      return 'closing';
    });
  }, []);

  const toggleMenu = useCallback(() => {
    if (isMenuActive) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [isMenuActive, closeMenu, openMenu]);

  // Coordinate opening double-rAF commit and closing animation completion
  useEffect(() => {
    if (menuState === 'opening') {
      let frame1 = 0;
      let frame2 = 0;
      frame1 = requestAnimationFrame(() => {
        frame2 = requestAnimationFrame(() => {
          setMenuState('open');
        });
      });
      return () => {
        cancelAnimationFrame(frame1);
        cancelAnimationFrame(frame2);
      };
    }

    if (menuState === 'closing') {
      let cancelled = false;
      const finishClose = () => {
        if (!cancelled) {
          setMenuState('closed');
        }
      };

      const panel = mobileNavRef.current;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const animations =
        panel && typeof panel.getAnimations === 'function'
          ? panel.getAnimations({ subtree: true })
          : [];

      if (animations.length === 0) {
        const frame = requestAnimationFrame(finishClose);
        return () => {
          cancelled = true;
          cancelAnimationFrame(frame);
        };
      }

      const fallbackMs = prefersReduced ? 150 : 420;
      const timer = window.setTimeout(finishClose, fallbackMs);

      Promise.allSettled(animations.map((a) => a.finished)).then(() => {
        window.clearTimeout(timer);
        finishClose();
      });

      return () => {
        cancelled = true;
        window.clearTimeout(timer);
      };
    }
  }, [menuState]);

  // Close cleanly if viewport expands to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setMenuState('closed');
      }
    };
    mq.addEventListener('change', handleMediaChange);
    return () => mq.removeEventListener('change', handleMediaChange);
  }, []);

  // Make underlying page landmarks inert while menu is open and handle Escape key
  useEffect(() => {
    const main = document.getElementById('main-content');
    const footer = document.querySelector('footer');

    if (isMenuActive) {
      if (main) main.inert = true;
      if (footer instanceof HTMLElement) footer.inert = true;
    } else {
      if (main) main.inert = false;
      if (footer instanceof HTMLElement) footer.inert = false;
    }

    if (!isMenuActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        toggleButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (main) main.inert = false;
      if (footer instanceof HTMLElement) footer.inert = false;
    };
  }, [isMenuActive, closeMenu]);

  const navLinks = [
    { href: '/servicios/automotriz', label: 'Automotriz', group: 'servicios' },
    { href: '/servicios/hogares', label: 'Hogares', group: 'servicios' },
    { href: '/servicios/comercios-empresas', label: 'Comercios y Empresas', group: 'servicios' },
    { href: '/servicios/mas-servicios', label: '+ Servicios', group: 'servicios' },
    { href: '/laminas', label: 'Láminas', group: 'catalogo' },
    { href: '/proyectos', label: 'Proyectos', group: 'catalogo' },
    { href: '/contacto', label: 'Contacto', group: 'catalogo' },
  ] as const;

  const isRouteActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  const serviceLinks = navLinks.filter((l) => l.group === 'servicios');
  const catalogLinks = navLinks.filter((l) => l.group === 'catalogo');
  const mobileSections = [
    { label: 'Servicios', links: serviceLinks, startIndex: 0, headerItemIndex: 0 },
    {
      label: 'Catálogo y Contacto',
      links: catalogLinks,
      startIndex: serviceLinks.length,
      headerItemIndex: serviceLinks.length + 1,
    },
  ];
  const isCalculatorActive = isRouteActive('/calculadora-materiales');

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
              onClick={closeMenu}
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

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2.5">
              <Link
                href="/calculadora-materiales"
                onClick={closeMenu}
                className="w-11 h-11 rounded-xl bg-white hover:bg-neutral-100 text-[#1E242B] font-bold text-sm flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Abrir Calculadora de materiales"
              >
                <Calculator className="w-5 h-5" aria-hidden="true" />
              </Link>

              <button
                ref={toggleButtonRef}
                type="button"
                onClick={toggleMenu}
                className={`mobile-nav-toggle w-11 h-11 rounded-xl border flex items-center justify-center text-white transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-white ${
                  isMenuActive
                    ? 'bg-[#323B46] border-white/25'
                    : 'bg-[#283039] border-white/10 hover:bg-[#303944]'
                }`}
                aria-expanded={isMenuActive}
                aria-controls="mobile-navigation"
                aria-label={isMenuActive ? 'Cerrar menú' : 'Abrir menú'}
              >
                <span className="relative w-[18px] h-[14px] block" aria-hidden="true">
                  <span
                    className={`mobile-nav-bar absolute top-0 left-0 w-full h-[1.75px] rounded-full bg-current origin-center ${
                      isMenuActive ? 'translate-y-[6.125px] rotate-45' : 'translate-y-0 rotate-0'
                    }`}
                  />
                  <span
                    className={`mobile-nav-bar absolute top-[6.125px] right-0 h-[1.75px] rounded-full bg-current origin-right ${
                      isMenuActive ? 'w-full opacity-0 scale-x-0' : 'w-[13px] opacity-100 scale-x-100'
                    }`}
                  />
                  <span
                    className={`mobile-nav-bar absolute bottom-0 left-0 w-full h-[1.75px] rounded-full bg-current origin-center ${
                      isMenuActive ? '-translate-y-[6.125px] -rotate-45' : 'translate-y-0 rotate-0'
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with architectural curtain reveal & staggered items */}
      <div
        ref={mobileNavRef}
        id="mobile-navigation"
        data-state={menuState}
        hidden={!isRendered}
        className="mobile-nav-overlay fixed inset-x-0 top-20 bottom-0 z-40 lg:hidden"
      >
        {/* Atmospheric scrim */}
        <div
          className="mobile-nav-backdrop absolute inset-0 bg-[#0D1116]/75"
          onClick={closeMenu}
          aria-hidden="true"
        />

        {/* Sliding architectural panel */}
        <nav
          aria-label="Navegación móvil"
          className="mobile-nav-sheet relative w-full h-full bg-[#1E242B] flex flex-col justify-between px-5 sm:px-6 pt-5 pb-8 overflow-y-auto"
        >
          {/* Precision horizontal hairline seam */}
          <span
            className="mobile-nav-seam pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-white/30 via-white/15 to-transparent"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-5 pt-1">
            {mobileSections.map((section) => (
              <section key={section.label} aria-label={section.label}>
                <div
                  style={{ '--item-index': section.headerItemIndex } as React.CSSProperties}
                  className="mobile-nav-item flex items-center gap-3 mb-2.5 px-1"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B3B6B9]/75">
                    {section.label}
                  </span>
                  <span className="h-px flex-1 bg-white/[0.08]" aria-hidden="true" />
                </div>
                <ul className="flex flex-col gap-1.5">
                  {section.links.map((link, idx) => {
                    const globalIndex = section.startIndex + idx;
                    const itemIndex = section.headerItemIndex + idx + 1;
                    const isActive = isRouteActive(link.href);
                    return (
                      <li
                        key={link.href}
                        style={{ '--item-index': itemIndex } as React.CSSProperties}
                        className="mobile-nav-item"
                      >
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          aria-current={isActive ? 'page' : undefined}
                          className={`group relative overflow-hidden min-h-[50px] px-3.5 py-2.5 rounded-xl border flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                            isActive
                              ? 'bg-[#283039] border-white/20 text-white shadow-[0_10px_28px_-12px_rgba(0,0,0,0.65)]'
                              : 'bg-white/[0.025] border-white/[0.06] text-[#E5E7EB]/85 hover:bg-white/[0.06] hover:border-white/[0.14] hover:text-white'
                          }`}
                        >
                          <span className="flex items-center gap-3 min-w-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">
                            <span
                              className={`w-6 h-6 rounded-md text-[10px] font-mono tabular-nums flex items-center justify-center shrink-0 border transition-colors duration-300 ${
                                isActive
                                  ? 'bg-white/15 border-white/20 text-white font-bold'
                                  : 'bg-white/[0.04] border-white/[0.06] text-[#B3B6B9]/70 group-hover:text-white group-hover:bg-white/[0.08]'
                              }`}
                            >
                              {String(globalIndex + 1).padStart(2, '0')}
                            </span>
                            <span className={`text-[16px] tracking-[-0.01em] truncate ${isActive ? 'font-bold' : 'font-medium'}`}>
                              {link.label}
                            </span>
                          </span>

                          <span className="flex items-center gap-2 shrink-0">
                            {isActive && (
                              <span className="px-2 py-0.5 rounded-md bg-white/12 border border-white/15 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/95">
                                Actual
                              </span>
                            )}
                            <span
                              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                isActive
                                  ? 'bg-white text-[#1E242B]'
                                  : 'bg-white/[0.04] text-[#B3B6B9]/75 group-hover:bg-white/10 group-hover:text-white'
                              }`}
                              aria-hidden="true"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                          </span>

                          {isActive ? (
                            <span
                              className="mobile-nav-active-bar pointer-events-none absolute bottom-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-white via-white/90 to-white/35"
                              aria-hidden="true"
                            />
                          ) : (
                            <span
                              className="pointer-events-none absolute bottom-0 inset-x-0 h-[1.5px] bg-white/30 origin-left scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                              aria-hidden="true"
                            />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>

          <div
            style={{ '--item-index': navLinks.length + 2 } as React.CSSProperties}
            className="mobile-nav-item flex flex-col gap-3 pt-5 mt-5 border-t border-white/[0.08]"
          >
            <Link
              href="/calculadora-materiales"
              onClick={closeMenu}
              aria-current={isCalculatorActive ? 'page' : undefined}
              className={`relative overflow-hidden w-full min-h-[48px] flex items-center justify-center gap-2.5 py-3 rounded-xl bg-white hover:bg-neutral-100 text-[#1E242B] font-bold text-base transition-all duration-200 active:scale-[0.98] ${
                isCalculatorActive ? 'ring-2 ring-white/40 ring-offset-2 ring-offset-[#1E242B]' : ''
              }`}
            >
              <Calculator className="w-5 h-5" aria-hidden="true" />
              <span>Calculadora de Materiales</span>
              {isCalculatorActive && (
                <span className="px-2 py-0.5 rounded-md bg-[#1E242B]/10 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1E242B]">
                  Actual
                </span>
              )}
            </Link>

            <a
              href="https://wa.me/5493834272000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[46px] flex items-center justify-center gap-2 py-3 rounded-xl bg-[#283039] hover:bg-[#323B46] border border-white/[0.08] text-white font-medium text-base transition-all duration-200 active:scale-[0.98]"
            >
              <Phone className="w-4 h-4 text-white" aria-hidden="true" />
              <span>WhatsApp: +54 9 383 427-2000</span>
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Padre+Zanello+341,+San+Fernando+del+Valle+de+Catamarca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-center text-[#B3B6B9] hover:text-white flex items-center justify-center gap-1.5 py-1 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 shrink-0 text-white/80" aria-hidden="true" />
              <span>Padre Zanello 341, San Fernando del Valle de Catamarca</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
