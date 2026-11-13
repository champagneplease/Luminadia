'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, ArrowRight, ExternalLink } from 'lucide-react';

import { useSiteConfig } from '@/context/SiteConfigContext';
import VisualEditableText from '@/components/visual-editor/VisualEditableText';
import WhatsAppIcon from '@/components/WhatsAppIcon';

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
  const { images, texts } = useSiteConfig();
  const cleanPhone = texts.phone ? texts.phone.replace(/[^0-9]/g, '') : '5493834272000';

  return (
    <footer className="w-full max-w-full overflow-hidden bg-[#1E242B] text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Columna 1: Identidad */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0">
                <Image
                  src={images.logo || '/images/luminadia-logo.png'}
                  alt={texts.businessName || 'LuminADia'}
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <VisualEditableText
                  contentKey="businessName"
                  label="Nombre de Empresa (Footer)"
                  className="text-xl font-black tracking-tight text-white leading-tight"
                >
                  {texts.businessName || 'LuminADia'}
                </VisualEditableText>
                <span className="text-[10px] font-semibold tracking-wider text-[#B3B6B9]">
                  LÁMINAS DE CONTROL SOLAR
                </span>
              </div>
            </div>
            <VisualEditableText
              contentKey="footerDescription"
              label="Descripción del Footer"
              multiline={true}
              as="p"
              className="text-sm text-[#B3B6B9] leading-relaxed"
            >
              {texts.footerDescription || 'Especialistas en láminas de control solar con alta tecnología. Soluciones avanzadas de rechazo térmico, protección UV y privacidad para vehículos, residencias y empresas en Catamarca.'}
            </VisualEditableText>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={texts.instagram || 'https://www.instagram.com/luminadia_catam/'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#283039] border border-[#B3B6B9]/40 flex items-center justify-center text-[#B3B6B9] hover:text-white hover:border-white transition-colors"
                aria-label="Perfil de Instagram de Luminadia"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#283039] border border-[#B3B6B9]/40 flex items-center justify-center text-[#B3B6B9] hover:text-white hover:border-white transition-colors"
                aria-label="Contactar a Luminadia por WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" variant="white" />
              </a>
            </div>
          </div>

          {/* Columna 2: Servicios */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-white">
              Servicios Especializados
            </h2>
            <ul className="space-y-2.5 text-sm text-[#B3B6B9]">
              <li>
                <Link
                  href="/servicios/automotriz"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#B3B6B9]" />
                  <span>Control Solar Automotriz</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/hogares"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#B3B6B9]" />
                  <span>Láminas para Hogares y Ventanales</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/comercios-empresas"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#B3B6B9]" />
                  <span>Comercios, Oficinas y Empresas</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/mas-servicios"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#B3B6B9]" />
                  <span>+ Servicios & Consultoría Arquitectónica</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/laminas"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#B3B6B9]" />
                  <span>Catálogo de Láminas y Tecnologías</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/proyectos"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#B3B6B9]" />
                  <span>Galería de Trabajos Realizados</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Ubicación y Contacto */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-white">
              Ubicación y Atención
            </h2>
            <div className="space-y-3 text-sm text-[#B3B6B9]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div className="hover:text-white transition-colors group flex items-start gap-1">
                  <VisualEditableText
                    contentKey="address"
                    label="Dirección (Footer)"
                    className="text-sm text-[#B3B6B9]"
                  >
                    {texts.address || 'Padre Zanello 341, San Fernando del Valle de Catamarca, Argentina.'}
                  </VisualEditableText>
                  <ExternalLink className="w-3 h-3 text-[#B3B6B9] group-hover:text-white shrink-0 mt-1 transition-colors" />
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <VisualEditableText
                  contentKey="phone"
                  label="Teléfono WhatsApp (Footer)"
                  className="hover:text-white transition-colors text-sm text-[#B3B6B9]"
                >
                  {texts.phone || '+54 9 383 427-2000'}
                </VisualEditableText>
              </div>
              <div className="flex items-center gap-2.5">
                <InstagramIcon className="w-4 h-4 text-white shrink-0" />
                <a
                  href={texts.instagram || 'https://www.instagram.com/luminadia_catam/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {texts.instagram?.replace('https://www.instagram.com/', '@') || '@luminadia_catam'}
                </a>
              </div>
            </div>
          </div>

          {/* Columna 4: Herramienta de Cálculo */}
          <div className="space-y-4 bg-[#283039] p-6 rounded-2xl">
            <h2 className="text-sm font-bold text-white">
              Calculadora de Materiales
            </h2>
            <p className="text-xs text-[#B3B6B9] leading-relaxed">
              Herramienta técnica para calcular superficies y metros lineales de rollo necesarios según las dimensiones de tus vidrios.
            </p>
            <Link
              href="/calculadora-materiales"
              className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-white hover:bg-neutral-100 text-[#1E242B] font-bold text-sm transition-colors"
            >
              Calcular Materiales
            </Link>
            <p className="text-[11px] text-[#B3B6B9]/70 italic">
              * Estimación orientativa de material. No constituye cotización ni presupuesto monetario.
            </p>
          </div>
        </div>

        {/* Barra inferior de copyright y enlaces */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B3B6B9]">
          <p>
            © 2026 Luminadia. Todos los derechos reservados. San Fernando del Valle de Catamarca.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/laminas" className="hover:text-white transition-colors">
              Catálogo
            </Link>
            <Link href="/contacto" className="hover:text-white transition-colors">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
