'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Building,
  Calculator,
  ShieldCheck,
  FileSpreadsheet,
  ArrowRight,
  Phone,
  CheckCircle2,
  HardHat,
  Sparkles,
} from 'lucide-react';
import LocationMap, { LocationLink } from '@/components/LocationMap';
import TextReveal from '@/components/TextReveal';
import { useSiteConfig } from '@/context/SiteConfigContext';

export default function MasServiciosPage() {
  const { texts } = useSiteConfig();

  const servicesList = [
    {
      id: 'asoleamiento',
      icon: Compass,
      title: 'Consultoría en Arquitectura & Asoleamiento',
      badge: 'Arquitectura & Obra',
      description:
        'Estudio de cartas solares, orientación de fachadas y análisis de incidencia calórica según la estación del año en Catamarca. Especificación técnica de películas en planos y memorias descriptivas de obra para estudios de arquitectura y constructoras.',
      highlights: [
        'Cálculo de ángulo cenital y azimut solar',
        'Especificación técnica para pliegos de licitación',
        'Selección de lámina según tipo de vidrio (monolítico o DVH)',
      ],
    },
    {
      id: 'eficiencia',
      icon: Building,
      title: 'Auditoría Energética & Confort Térmico',
      badge: 'Eficiencia Energética',
      description:
        'Diagnóstico del coeficiente de ganancia de calor solar (SHGC) y transmitancia térmica (Valor U) en envolventes vidriadas. Determinación de la reducción en consumo de climatización artificial (aire acondicionado) en oficinas y edificios residenciales.',
      highlights: [
        'Medición óptica in situ con instrumental calibrado',
        'Cálculo de amortización por ahorro en tarifa eléctrica',
        'Mitigación del efecto invernadero en atrios y lucarnas',
      ],
    },
    {
      id: 'computos',
      icon: FileSpreadsheet,
      title: 'Gestión Contable, Cómputos & Licitaciones',
      badge: 'Económico & Financiero',
      description:
        'Gracias a la formación contable del equipo directivo, estructuramos presupuestos detallados por cómputo métrico sobre planos ejecutivos, optimización de compras por rollo cerrado (30m x 1.52m) y documentación formal para licitaciones públicas y privadas.',
      highlights: [
        'Desglose metódico de mermas y aprovechamiento de bobina',
        'Facturación corporativa A y B con cumplimiento impositivo',
        'Presupuestos congelados por acopio de materiales',
      ],
    },
    {
      id: 'altura',
      icon: HardHat,
      title: 'Instalaciones Especiales en Doble Altura',
      badge: 'Ingeniería de Instalación',
      description:
        'Protocolo de colocación en superficies de difícil acceso: techos vidriados, pirámides, lucarnas cenitales y frentes integrales continuos. Trabajo con andamios tubulares homologados, arneses de seguridad y técnicos matriculados.',
      highlights: [
        'Seguridad e higiene laboral bajo normas vigentes',
        'Colocaciones interiores y exteriores según necesidad técnica',
        'Terminaciones perimetrales con selladores siliconados UV',
      ],
    },
    {
      id: 'smart-film',
      icon: Sparkles,
      title: 'Smart Film & Superficies Tecnológicas American Tint',
      badge: 'Surface Innovation',
      description:
        'Instalación de láminas inteligentes conmutables (Smart Film PDLC) que transicionan de transparente a opaco al instante mediante control de pared o domótica. Ideal para privacidad bajo demanda en salas de reuniones corporativas, despachos y residencias de diseño.',
      highlights: [
        'Tecnología oficial American Tint · Surface Innovation',
        'Compatibilidad con vidrios existentes o nuevas aberturas',
        'Alternativa arquitectónica a cortinas en divisorios y ventanales',
      ],
    },
  ];

  return (
    <div className="flex flex-col bg-white text-[#1E242B]">
      {/* 1. HERO DE + SERVICIOS */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E242B] text-white text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-white" />
            <span>{texts.masServiciosBadge || 'Equipo Interdisciplinario · Arquitectura, Contabilidad & Obra'}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#1E242B] tracking-[-0.035em] leading-[1.05] text-balance">
            <TextReveal as="span" staggerMs={35}>
              {texts.masServiciosTitle || '+ Servicios Profesionales & Consultoría Especializada'}
            </TextReveal>
          </h1>

          <p className="text-lg sm:text-xl text-[#4A545E] leading-relaxed font-normal text-balance">
            {texts.masServiciosSubtitle ||
              'Respaldados por profesionales de la arquitectura y las ciencias económicas para brindar soluciones integrales en proyectos residenciales, comerciales e industriales.'}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#1E242B] hover:bg-[#2E3742] text-white font-bold text-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Solicitar Asesoramiento Técnico</span>
            </Link>

            <Link
              href="/calculadora-materiales"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#F8F9FA] hover:bg-[#F1F3F5] text-[#1E242B] border border-[#B3B6B9] font-bold text-sm transition-colors"
            >
              <Calculator className="w-4 h-4 text-[#1E242B]" />
              <span>Calcular Materiales</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. EL VALOR DIFERENCIAL INTERDISCIPLINARIO */}
      <section className="py-16 bg-[#F8F9FA] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#1E242B] block">
              Enfoque Profesional Integral
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1E242B] tracking-tight">
              Más que instaladores: ingenio proyectual y rigor contable
            </h2>
            <p className="text-sm sm:text-base text-[#4A545E] leading-relaxed">
              {texts.masServiciosDesc ||
                'Los titulares de Luminadia aúnan formación en arquitectura, diseño y finanzas, lo que permite abordar no solo la instalación técnica de láminas, sino el diagnóstico integral de asoleamiento, balance térmico, optimización energética y planificación de costos para desarrollos constructivos y licitaciones.'}
            </p>
          </div>
        </div>
      </section>

      {/* 3. GRILLA DE SERVICIOS ESPECIALIZADOS */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={`srv-${srv.id || idx}-${idx}`}
                data-ui="true"
                className="p-8 rounded-2xl bg-white border border-[#B3B6B9] flex flex-col justify-between space-y-6 hover:border-[#1E242B] transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-12 h-12 rounded-xl bg-[#1E242B] text-white flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F8F9FA] text-[#1E242B] border border-[#B3B6B9]/60">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#1E242B]">
                    {srv.title}
                  </h3>

                  <p className="text-sm text-[#4A545E] leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="pt-2 space-y-2">
                    {srv.highlights.map((h, i) => (
                      <div key={`srv-${srv.id || idx}-hl-${i}`} className="flex items-center gap-2 text-xs font-medium text-[#1E242B]">
                        <CheckCircle2 className="w-4 h-4 text-[#1E242B] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div data-ui="true" className="pt-4 border-t border-[#B3B6B9]/40">
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#1E242B] hover:text-[#2E3742] transition-colors"
                  >
                    <span>Coordinar relevamiento o consulta profesional</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3.5 UBICACIÓN DEL TALLER Y REUNIONES */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-[#1E242B] block">
              Taller & Asesoría Presencial
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1E242B] tracking-[-0.025em]">
              Visitanos en Padre Zanello 341.
            </h2>
            <p className="text-sm text-[#4A545E] leading-relaxed">
              Disponemos de muestras físicas de toda la línea American Tint (Window Films, Smart Film, PPF y Vinilos) y mesa de trabajo para revisar planos junto a profesionales y constructores.
            </p>
            <div className="pt-2">
              <LocationLink className="text-sm font-bold text-[#1E242B] underline-offset-4">
                Padre Zanello 341, Catamarca
              </LocationLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <LocationMap variant="card" height="h-60 sm:h-72" />
          </div>
        </div>
      </section>

      {/* 4. LLAMADO DE ACCIÓN (CON LA CAJA OSCURA SIN TEXTOS OCULTOS) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <div data-ui="true" className="p-10 sm:p-14 rounded-3xl bg-[#1E242B] text-white space-y-6 max-w-3xl mx-auto">
          <h2
            style={{ color: '#FFFFFF' }}
            className="text-3xl sm:text-5xl font-extrabold !text-white text-white tracking-[-0.03em] leading-[1.08] text-balance block"
          >
            ¿Sos arquitecto, constructor o desarrollador?
          </h2>
          <p className="text-base text-[#B3B6B9] font-normal leading-relaxed">
            Te invitamos a coordinar una reunión técnica en nuestro taller o en tu estudio. Proveemos muestras físicas, fichas de laboratorio y asesoramiento contable-técnico para optimizar tus proyectos.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-neutral-100 text-[#1E242B] font-bold text-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-[#1E242B]" />
              <span>Contactar al Equipo Profesional</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
