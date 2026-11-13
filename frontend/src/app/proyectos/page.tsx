'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';
import { Layers, MapPin, Calculator, Play } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';

export default function ProjectsGalleryPage() {
  const [filter, setFilter] = useState<'todos' | 'automotriz' | 'hogares' | 'comercios'>('todos');
  const { projects } = useSiteConfig();

  const filteredProjects = projects.filter((p) => {
    if (filter === 'todos') return true;
    return p.category === filter;
  });

  return (
    <div className="bg-white text-[#1E242B] min-h-[100dvh] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Cabecera */}
        <div className="max-w-3xl space-y-6">
          <div className="animate-hero-location flex items-center gap-2 text-sm font-semibold text-[#1E242B]">
            <Layers className="w-4 h-4 text-[#1E242B]" />
            <span>Trabajos Realizados · Casos en Catamarca</span>
          </div>
          <TextReveal
            as="h1"
            className="animate-hero-title text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.035em] text-[#1E242B] leading-[1.04] text-balance"
          >
            Galería de proyectos en Catamarca.
          </TextReveal>
          <p className="animate-hero-subtitle text-base sm:text-lg text-[#4A545E] leading-relaxed max-w-2xl text-balance">
            Una selección de instalaciones realizadas en vehículos particulares, residencias y locales comerciales de la provincia. Demostración en fotos y videos en movimiento.
          </p>
        </div>

        {/* Filtros por categoría en botones planos */}
        <div className="flex flex-wrap gap-3 pb-2">
          {[
            { id: 'todos', label: 'Todos los proyectos' },
            { id: 'automotriz', label: 'Automotores' },
            { id: 'hogares', label: 'Residencias' },
            { id: 'comercios', label: 'Comercios y Empresas' },
          ].map((f) => {
            const isSel = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isSel
                    ? 'bg-[#1E242B] text-white'
                    : 'bg-[#F8F9FA] text-[#4A545E] hover:text-[#1E242B] hover:bg-[#F1F3F5]'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid de proyectos en tarjetas limpias */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj, idx) => {
            const isVideo = proj.videoUrl || /\.(mp4|webm|mov|ogg)$/i.test(proj.image);
            const mediaSrc = proj.videoUrl || proj.image;

            return (
              <div
                key={`proj-${proj.id || idx}-${idx}`}
                className="card-hover-effect rounded-3xl bg-white overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#1E242B]">
                  {isVideo ? (
                    <video
                      src={mediaSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <Image
                      src={proj.image || `/images/${proj.category === 'hogares' ? 'hogares' : proj.category === 'comercios' ? 'comercios' : 'automotriz'}.jpg`}
                      alt={proj.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#1E242B] text-xs font-semibold text-white capitalize">
                    {proj.category}
                  </div>
                  {isVideo && (
                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-[#1E242B]/90 text-white text-[11px] font-semibold flex items-center gap-1.5">
                      <Play className="w-3 h-3 fill-white text-white" />
                      <span>Video</span>
                    </div>
                  )}
                </div>

              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#4A545E]">
                    <MapPin className="w-3.5 h-3.5 text-[#1E242B] shrink-0" />
                    <span>{proj.location}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1E242B]">
                    {proj.title}
                  </h2>
                  <p className="text-sm text-[#4A545E] leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-4 text-xs text-[#6C7680]">
                  <strong className="text-[#1E242B]">Material:</strong> {proj.film}
                </div>
              </div>
            </div>
          );
        })}
        </div>

        {/* CTA final en bloque arquitectónico de pizarra oscura */}
        <div data-ui="true" className="p-10 sm:p-14 rounded-3xl bg-[#1E242B] text-white text-center space-y-6">
          <h2
            style={{ color: '#FFFFFF' }}
            className="text-3xl sm:text-5xl font-extrabold !text-white text-white tracking-[-0.03em] leading-[1.08] text-balance block"
          >
            ¿Tenés un proyecto similar en mente?
          </h2>
          <p className="text-sm sm:text-base text-[#B3B6B9] max-w-lg mx-auto font-normal">
            Estimá el consumo de material necesario ingresando las medidas en nuestra calculadora técnica.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              href="/calculadora-materiales"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-neutral-100 text-[#1E242B] font-bold text-sm transition-colors"
            >
              <Calculator className="w-4 h-4 text-[#1E242B]" />
              <span>Calcular Materiales</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
