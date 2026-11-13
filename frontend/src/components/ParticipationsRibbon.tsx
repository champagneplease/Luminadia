'use client';

import React from 'react';
import { Award, MapPin } from 'lucide-react';
import { useSiteConfig, DEFAULT_PARTICIPATIONS } from '@/context/SiteConfigContext';

export default function ParticipationsRibbon() {
  const { participations } = useSiteConfig();

  const activeParticipations = participations && participations.length > 0 ? participations : DEFAULT_PARTICIPATIONS;

  // Cuadruplicamos los elementos para garantizar una cinta continua infinita sin huecos
  const marqueeItems = [
    ...activeParticipations,
    ...activeParticipations,
    ...activeParticipations,
    ...activeParticipations,
  ];

  return (
    <div data-ui="true" className="w-full max-w-full bg-[#1E242B] border-y border-[#2E3742] overflow-hidden py-5 sm:py-6 md:py-7 relative select-none">
      <div className="flex flex-col md:flex-row md:items-center w-full max-w-full overflow-hidden">
        {/* Cabecera / Etiqueta institucional: destacada y clara en móviles, fija al lateral en desktop */}
        <div
          data-ui="true"
          className="shrink-0 z-20 px-5 py-3 md:py-0 md:pl-8 md:pr-8 bg-[#1E242B] border-b md:border-b-0 md:border-r border-[#2E3742] flex items-center justify-between md:justify-start gap-4"
        >
          <div className="flex items-center gap-3">
            <div
              data-ui="true"
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10"
            >
              <Award className="w-5 h-5 text-white shrink-0" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base md:text-lg font-black text-white tracking-normal whitespace-nowrap">
                Expos & Trayectoria
              </span>
              <span className="text-xs text-[#B3B6B9] font-medium tracking-normal whitespace-nowrap">
                Presencia Oficial en Eventos
              </span>
            </div>
          </div>

          {/* Indicador visual en móvil */}
          <span className="md:hidden text-xs text-[#868E96] font-medium flex items-center gap-1.5">
            <span>En movimiento</span>
            <span className="text-sm">→</span>
          </span>
        </div>

        {/* Cinta animada continua: amplia, visible y con tipografía grande y legible en móviles */}
        <div className="overflow-hidden flex-1 min-w-0 max-w-full relative flex pt-3.5 md:pt-0">
          <div className="animate-marquee-ribbon flex items-center gap-7 sm:gap-10 md:gap-14 pl-5 sm:pl-8">
            {marqueeItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="shrink-0 flex items-center gap-3 sm:gap-4 text-sm sm:text-base whitespace-nowrap cursor-default hover:opacity-95 transition-opacity"
              >
                <span className="px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white text-[#1E242B] text-xs sm:text-sm font-black tracking-normal shrink-0">
                  {item.year} · {item.city}
                </span>

                <strong className="text-white font-extrabold text-sm sm:text-base md:text-lg tracking-tight shrink-0">
                  {item.title}
                </strong>

                {item.badge && (
                  <span className="text-[#94A3B8] text-xs sm:text-sm font-medium flex items-center gap-1 shrink-0">
                    <span>({item.badge})</span>
                  </span>
                )}

                <span className="text-[#64748B] pl-4 sm:pl-8 font-black text-sm sm:text-base shrink-0">◆</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
