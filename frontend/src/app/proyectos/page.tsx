'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Layers, MapPin, Calculator, ArrowRight } from 'lucide-react';

export default function ProjectsGalleryPage() {
  const [filter, setFilter] = useState<'todos' | 'automotriz' | 'hogares' | 'comercios'>('todos');

  const projects = [
    {
      id: 'p1',
      title: 'Pick-Up Toyota Hilux — Blindaje Térmico Completo',
      category: 'automotriz',
      film: 'Nano Cerámica Carbón 20 + Parabrisas Cerámica 70',
      location: 'Valle Central, Catamarca',
      image: '/images/automotriz.jpg',
      description: 'Instalación completa de control solar térmico para uso en zonas mineras y rurales con alta exposición solar. Termoformado de luneta en una sola pieza.',
    },
    {
      id: 'p2',
      title: 'Residencia en Falda de la Montaña — Ventanales Oeste',
      category: 'hogares',
      film: 'Nano Cerámica 70 & Dual Reflectiva 15',
      location: 'San Fernando del Valle de Catamarca',
      image: '/images/hogares.jpg',
      description: 'Tratamiento de 48 m² de ventanales con vista a las sierras. Reducción de 8°C en el interior de la sala principal en horario de verano.',
    },
    {
      id: 'p3',
      title: 'Showroom Comercial & Oficinas en Centro',
      category: 'comercios',
      film: 'Nano Cerámica Térmica 70 (Clara)',
      location: 'Centro Comercial, Catamarca',
      image: '/images/comercios.jpg',
      description: 'Protección integral de vidrieras de indumentaria contra rayos UV evitando decoloración de prendas y resplandor sobre puestos de trabajo.',
    },
    {
      id: 'p4',
      title: 'Sedán Volkswagen Vento — Confort Acústico y Térmico',
      category: 'automotriz',
      film: 'Nano Cerámica 20 en laterales y luneta',
      location: 'Padre Zanello 341, Catamarca',
      image: '/images/hero.jpg',
      description: 'Aplicación de tono grafito intermedio de alta nitidez para conductor y acompañantes sin interferencia en telepeaje ni señal satelital.',
    },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'todos') return true;
    return p.category === filter;
  });

  return (
    <div className="bg-[#0e1110] text-[#f4f3ef] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Cabecera */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#161a19] border border-[#2a322f] text-xs font-semibold text-amber-500">
            <Layers className="w-4 h-4" />
            <span>Trabajos Realizados</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f4f3ef] leading-[1.1]">
            Galería de proyectos en Catamarca.
          </h1>
          <p className="text-base sm:text-lg text-[#9aa19d] leading-relaxed">
            Una selección de instalaciones realizadas en vehículos particulares, residencias y locales comerciales de la provincia.
          </p>
        </div>

        {/* Filtros por categoría */}
        <div className="flex flex-wrap gap-2.5 border-b border-[#2a322f] pb-4">
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
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isSel
                    ? 'bg-amber-600 text-[#0e1110] font-bold'
                    : 'bg-[#161a19] text-[#9aa19d] border border-[#2a322f] hover:text-[#f4f3ef]'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-2xl bg-[#161a19] border border-[#2a322f] overflow-hidden flex flex-col justify-between group hover:border-amber-500/40 transition-colors"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#0e1110]/80 border border-[#2a322f] text-xs font-medium text-amber-400 capitalize">
                  {proj.category}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#9aa19d]">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{proj.location}</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#f4f3ef]">
                    {proj.title}
                  </h2>
                  <p className="text-sm text-[#9aa19d] leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1c2220] text-xs text-[#636b67]">
                  <strong className="text-[#9aa19d]">Material:</strong> {proj.film}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#161a19] border border-[#2a322f] text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f4f3ef]">
            ¿Tenés un proyecto similar en mente?
          </h2>
          <p className="text-sm text-[#9aa19d] max-w-lg mx-auto">
            Estimá el consumo de material necesario ingresando las medidas en nuestra calculadora técnica.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              href="/calculadora-materiales"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-[#0e1110] font-bold text-sm transition-colors"
            >
              <Calculator className="w-4 h-4" />
              <span>Calcular Materiales</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
