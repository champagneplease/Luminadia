import React from 'react';
import Link from 'next/link';
import DynamicSectionImage from '@/components/DynamicSectionImage';
import ScrollReveal from '@/components/ScrollReveal';
import LocationMap, { LocationLink } from '@/components/LocationMap';
import TextReveal from '@/components/TextReveal';
import {
  Car,
  Calculator,
  Phone,
  AlertTriangle,
  Shield,
  ExternalLink,
  MapPin,
} from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export const metadata = {
  title: 'Láminas de Control Solar Automotriz y PPF en Catamarca',
  description:
    'Instalación profesional de láminas American Tint · Surface Innovation (Window Films y PPF) para autos, pick-ups y utilitarios en San Fernando del Valle de Catamarca.',
};

export default function AutomotiveServicePage() {
  return (
    <div className="bg-white text-[#1E242B] min-h-[100dvh]">
      {/* Hero de servicio */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <LocationLink
                showPin={false}
                showExternalIcon={true}
                className="animate-hero-location inline-flex items-center gap-2 text-sm font-semibold text-[#1E242B] hover:text-[#2E3742]"
              >
                <Car className="w-4 h-4 text-[#1E242B]" />
                <span>División Automotriz · Taller en Padre Zanello 341</span>
              </LocationLink>

              <h1 className="animate-hero-title text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.035em] text-[#1E242B] leading-[1.04] text-balance">
                <TextReveal as="span" staggerMs={35}>
                  Control solar y protección de alta tecnología para tu vehículo.
                </TextReveal>
              </h1>

              <p className="animate-hero-subtitle text-lg text-[#4A545E] leading-relaxed max-w-2xl text-balance">
                Línea oficial <strong>American Tint · Surface Innovation</strong> (Window Films nano-cerámicas y películas de protección de pintura <strong>PPF</strong>). Diseñadas para combatir la radiación térmica extrema del verano catamarqueño con bloqueo del 99% de rayos UV.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/calculadora-materiales"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#1E242B] hover:bg-[#2E3742] text-white font-bold text-sm transition-colors"
                >
                  <Calculator className="w-4 h-4 text-white" />
                  <span>Calcular Materiales del Vehículo</span>
                </Link>

                <a
                  href="https://wa.me/5493834272000?text=Hola%20Luminadia,%20deseo%20consultar%20por%20l%C3%A1minas%20American%20Tint%20para%20mi%20veh%C3%ADculo."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#F8F9FA] hover:bg-[#F1F3F5] text-[#1E242B] font-semibold text-sm transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" variant="color" />
                  <span>Consultar Turno por WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-3xl overflow-hidden">
              <DynamicSectionImage
                section="automotriz"
                fallbackSrc="/images/automotriz.jpg"
                alt="Instalación de lámina automotriz en taller Luminadia"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Características y cristales compatibles */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 space-y-4">
          <span className="text-sm font-semibold text-[#1E242B] block">
            Ingeniería de cristal
          </span>
          <ScrollReveal blur={true} durationMs={950}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E242B] tracking-[-0.03em] leading-[1.08] text-balance">
              Cristales tratados y compatibilidad técnica.
            </h2>
          </ScrollReveal>
          <p className="text-[#4A545E] text-base sm:text-lg leading-relaxed">
            Cada vidrio de un automóvil posee características ópticas y curvaturas particulares que exigen técnicas de termoformado específicas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-hover-effect p-8 rounded-3xl bg-white space-y-3">
            <h3 className="text-xl font-bold text-[#1E242B]">Parabrisas Térmico</h3>
            <p className="text-sm text-[#4A545E] leading-relaxed">
              Láminas Nano Cerámicas American Tint de alta claridad (70% VLT) que frenan la radiación calórica frontal directa sin alterar la visión nocturna.
            </p>
            <div className="text-xs text-[#1E242B] font-bold tabular-nums pt-2">
              Rechazo Infrarrojo: hasta 88%
            </div>
          </div>

          <div className="card-hover-effect p-8 rounded-3xl bg-white space-y-3">
            <h3 className="text-xl font-bold text-[#1E242B]">Laterales y Ventiletes</h3>
            <p className="text-sm text-[#4A545E] leading-relaxed">
              Window Films American Tint en 20% y 05%. Reducen el resplandor lateral del sol, brindan privacidad y protegen el cuero y tapizados contra rayos UV.
            </p>
            <div className="text-xs text-[#1E242B] font-bold pt-2">
              Privacidad y protección UV 99%
            </div>
          </div>

          <div className="card-hover-effect p-8 rounded-3xl bg-white space-y-3">
            <h3 className="text-xl font-bold text-[#1E242B]">Luneta Térmica</h3>
            <p className="text-sm text-[#4A545E] leading-relaxed">
              Termoformado en una sola pieza continua sin cortes visibles, preservando las líneas resistivas del desempañador térmico y la antena de radio.
            </p>
            <div className="text-xs text-[#1E242B] font-bold pt-2">
              Instalación continua sin cortes
            </div>
          </div>

          <div className="card-hover-effect p-8 rounded-3xl bg-white space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#1E242B]" />
              <h3 className="text-xl font-bold text-[#1E242B]">PPF (Pintura)</h3>
            </div>
            <p className="text-sm text-[#4A545E] leading-relaxed">
              Paint Protection Film American Tint. Película de poliuretano autorregenerable contra impactos de gravilla, arena y rayones en ópticas y trompa.
            </p>
            <div className="text-xs text-[#1E242B] font-bold pt-2">
              Blindaje transparente contra impactos
            </div>
          </div>
        </div>

        {/* Advertencia técnica de curvatura */}
        <div className="mt-8 p-6 rounded-2xl bg-[#F8F9FA] text-xs sm:text-sm text-[#4A545E] flex items-start gap-4">
          <AlertTriangle className="w-5 h-5 text-[#1E242B] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#1E242B]">Nota técnica de instalación:</strong> Los cristales curvos vehiculares requieren contracción térmica previa con calor antes de ser aplicados en el interior. Por este motivo, nuestra calculadora de materiales contempla una merma de bobina adecuada para garantizar sobrante de manipulación.
          </p>
        </div>
      </section>

      {/* Tonalidades disponibles */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 space-y-4">
          <span className="text-sm font-semibold text-[#1E242B] block">
            Tonalidades y Transmisión de Luz
          </span>
          <ScrollReveal blur={true} durationMs={950}>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E242B] tracking-[-0.03em] leading-[1.08] text-balance">
              Transmisión de luz y privacidad a tu medida.
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="card-hover-effect p-8 rounded-3xl bg-white space-y-3">
            <span className="text-3xl font-black text-[#1E242B] tabular-nums block">70% VLT</span>
            <h3 className="text-lg font-bold text-[#1E242B]">Tono Claro Óptico</h3>
            <p className="text-sm text-[#4A545E] leading-relaxed">
              Imperceptible a la vista. Diseñado exclusivamente para el rechazo calórico y filtro UV sin perder luz natural ni visibilidad nocturna.
            </p>
          </div>

          <div className="card-hover-effect p-8 rounded-3xl bg-white space-y-3">
            <span className="text-3xl font-black text-[#1E242B] tabular-nums block">20% VLT</span>
            <h3 className="text-lg font-bold text-[#1E242B]">Tono Intermedio</h3>
            <p className="text-sm text-[#4A545E] leading-relaxed">
              La elección más equilibrada para laterales de autos. Confort visual ante el sol intenso de Catamarca y excelente definición de los retrovisores en la noche.
            </p>
          </div>

          <div className="card-hover-effect p-8 rounded-3xl bg-white space-y-3">
            <span className="text-3xl font-black text-[#1E242B] tabular-nums block">05% VLT</span>
            <h3 className="text-lg font-bold text-[#1E242B]">Tono Oscuro</h3>
            <p className="text-sm text-[#4A545E] leading-relaxed">
              Máxima privacidad para pasajeros traseros y baúl. Evita que se distingan objetos en el habitáculo desde el exterior.
            </p>
          </div>
        </div>
      </section>

      {/* Ubicación y Turnos en Taller */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-[#1E242B] block">
              Instalación Presencial en Catamarca
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1E242B] tracking-[-0.025em]">
              Turnos en nuestro taller de Padre Zanello 341.
            </h2>
            <p className="text-sm text-[#4A545E] leading-relaxed">
              Las colocaciones automotrices de Window Films y PPF se realizan en ambiente cerrado libre de polvo para garantizar una adhesión libre de impurezas. Turnos en el día previa reserva.
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

      {/* Llamado a la calculadora adaptada */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-ui="true" className="p-10 sm:p-14 rounded-3xl bg-[#1E242B] text-white space-y-6 max-w-3xl mx-auto">
          <h2
            style={{ color: '#FFFFFF' }}
            className="text-3xl sm:text-5xl font-extrabold !text-white text-white tracking-[-0.03em] leading-[1.08] text-balance block"
          >
            ¿Querés estimar el material para tu vehículo?
          </h2>
          <p className="text-base text-[#B3B6B9] font-normal leading-relaxed">
            Utilizá nuestra calculadora seleccionando tu tipo de carrocería (sedán, hatchback, SUV o camioneta) para conocer los metros de bobina necesarios.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/calculadora-materiales"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-neutral-100 text-[#1E242B] font-bold text-sm transition-colors"
            >
              <Calculator className="w-4 h-4 text-[#1E242B]" />
              <span>Abrir Calculadora Automotriz</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
