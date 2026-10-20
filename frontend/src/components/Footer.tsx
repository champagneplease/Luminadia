'use client';

import React from 'react';
import Link from 'next/link';
import { Sun, Phone, MapPin, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#111413] border-t border-[#2a322f] text-[#f4f3ef] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2a322f]">
          {/* Columna 1: Identidad */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#161a19] border border-[#2a322f] flex items-center justify-center text-amber-500">
                <Sun className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#f4f3ef]">
                LUMINADIA
              </span>
            </div>
            <p className="text-sm text-[#9aa19d] leading-relaxed">
              Especialistas en láminas de control solar con alta tecnología. Soluciones avanzadas de rechazo térmico, protección UV y privacidad para vehículos, residencias y empresas en Catamarca.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/luminadia_catam/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#161a19] border border-[#2a322f] flex items-center justify-center text-[#9aa19d] hover:text-amber-500 hover:border-amber-500/50 transition-colors"
                aria-label="Perfil de Instagram de Luminadia"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/5493834272000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#161a19] border border-[#2a322f] flex items-center justify-center text-[#9aa19d] hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
                aria-label="Contactar a Luminadia por WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Columna 2: Servicios */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#f4f3ef]">
              Servicios Especializados
            </h2>
            <ul className="space-y-2.5 text-sm text-[#9aa19d]">
              <li>
                <Link
                  href="/servicios/automotriz"
                  className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#636b67]" />
                  <span>Control Solar Automotriz</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/hogares"
                  className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#636b67]" />
                  <span>Láminas para Hogares y Ventanales</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/comercios-empresas"
                  className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#636b67]" />
                  <span>Comercios, Oficinas y Empresas</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/laminas"
                  className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#636b67]" />
                  <span>Catálogo de Láminas y Tecnologías</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/proyectos"
                  className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#636b67]" />
                  <span>Galería de Trabajos Realizados</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Ubicación y Contacto */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#f4f3ef]">
              Ubicación y Atención
            </h2>
            <div className="space-y-3 text-sm text-[#9aa19d]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Padre Zanello 341, San Fernando del Valle de Catamarca, Argentina.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href="https://wa.me/5493834272000"
                  className="hover:text-white transition-colors"
                >
                  +54 9 383 427-2000
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <InstagramIcon className="w-4 h-4 text-pink-400 shrink-0" />
                <a
                  href="https://www.instagram.com/luminadia_catam/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @luminadia_catam
                </a>
              </div>
            </div>
          </div>

          {/* Columna 4: Herramienta de Cálculo */}
          <div className="space-y-4 bg-[#161a19] p-5 rounded-xl border border-[#2a322f]">
            <h2 className="text-sm font-semibold text-amber-500 uppercase tracking-wide">
              Calculadora de Materiales
            </h2>
            <p className="text-xs text-[#9aa19d] leading-relaxed">
              Herramienta técnica para calcular superficies y metros lineales de rollo necesarios según las dimensiones de tus vidrios.
            </p>
            <Link
              href="/calculadora-materiales"
              className="inline-flex items-center justify-center w-full py-2.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-[#0e1110] font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Calcular Materiales
            </Link>
            <p className="text-[11px] text-[#636b67] italic">
              * Estimación orientativa de material. No constituye cotización ni presupuesto monetario.
            </p>
          </div>
        </div>

        {/* Barra inferior de copyright y acceso administrativo */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9aa19d]">
          <p>
            © 2026 Luminadia. Todos los derechos reservados. San Fernando del Valle de Catamarca.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/contacto" className="hover:text-[#f4f3ef] transition-colors">
              Contacto
            </Link>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 hover:text-amber-500 transition-colors"
              title="Acceso al panel administrativo"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Administración</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
