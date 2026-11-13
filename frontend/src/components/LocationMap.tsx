'use client';

import React from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

export const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.7523603574036!2d-65.75576298834427!3d-28.456880559386622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94242f4ec1d5aa93%3A0x3273394fb2a17cb8!2sPadre%20Zanello%20341%2C%20K4700%20San%20Fernando%20del%20Valle%20de%20Catamarca%2C%20Catamarca!5e0!3m2!1ses-419!2sar!4v1792520386930!5m2!1ses-419!2sar';

export const GOOGLE_MAPS_DIRECT_URL =
  'https://www.google.com/maps/search/?api=1&query=Padre+Zanello+341,+San+Fernando+del+Valle+de+Catamarca';

export const LOCATION_ADDRESS = 'Padre Zanello 341, San Fernando del Valle de Catamarca';

/**
 * Enlace con icono a Google Maps
 */
export function LocationLink({
  children,
  className = '',
  showPin = true,
  showExternalIcon = true,
}: {
  children?: React.ReactNode;
  className?: string;
  showPin?: boolean;
  showExternalIcon?: boolean;
}) {
  return (
    <a
      href={GOOGLE_MAPS_DIRECT_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Abrir ubicación en Google Maps"
      className={`inline-flex items-center gap-1.5 hover:underline transition-colors ${className}`}
    >
      {showPin && <MapPin className="w-3.5 h-3.5 shrink-0" />}
      <span>{children || LOCATION_ADDRESS}</span>
      {showExternalIcon && <ExternalLink className="w-3 h-3 shrink-0 opacity-70 group-hover:opacity-100" />}
    </a>
  );
}

/**
 * Mapa embebido responsive con botón directo a Google Maps
 */
export default function LocationMap({
  variant = 'card',
  height = 'h-64 sm:h-72',
  className = '',
}: {
  variant?: 'compact' | 'card' | 'full';
  height?: string;
  className?: string;
}) {
  if (variant === 'compact') {
    return (
      <div data-ui="true" className={`rounded-2xl overflow-hidden bg-[#F8F9FA] border border-[#B3B6B9]/40 ${className}`}>
        <div className="relative w-full h-48 sm:h-56">
          <iframe
            src={GOOGLE_MAPS_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Mapa de ubicación en Padre Zanello 341, Catamarca"
            className="w-full h-full grayscale-[0.2] contrast-[1.05]"
          />
        </div>
        <div className="p-3 bg-white flex items-center justify-between text-xs gap-2">
          <span className="font-semibold text-[#1E242B] truncate">Padre Zanello 341</span>
          <a
            href={GOOGLE_MAPS_DIRECT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#1E242B] font-bold hover:underline shrink-0"
          >
            <span>Ver mapa</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      data-ui="true"
      className={`rounded-3xl overflow-hidden bg-white border border-[#B3B6B9]/40 flex flex-col ${className}`}
    >
      {/* Encabezado del mapa */}
      <div data-ui="true" className="p-4 sm:p-5 flex items-center justify-between gap-3 bg-[#F8F9FA]/80 border-b border-[#B3B6B9]/30">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#1E242B] text-white flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-bold text-[#1E242B]">
              Taller Central Luminadia
            </span>
            <p className="text-xs sm:text-sm text-[#4A545E] truncate">
              Padre Zanello 341, Catamarca
            </p>
          </div>
        </div>

        <a
          href={GOOGLE_MAPS_DIRECT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#1E242B] hover:bg-[#2E3742] text-white text-xs font-bold shrink-0 transition-colors"
        >
          <Navigation className="w-3.5 h-3.5 text-white" />
          <span className="hidden sm:inline">Cómo llegar</span>
          <span className="sm:hidden">Mapa</span>
          <ExternalLink className="w-3 h-3 text-white/80" />
        </a>
      </div>

      {/* Iframe del mapa de Google */}
      <div className={`relative w-full ${height}`}>
        <iframe
          src={GOOGLE_MAPS_EMBED_URL}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Ubicación de Luminadia en Google Maps - Padre Zanello 341"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
