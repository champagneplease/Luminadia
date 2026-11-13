import React from 'react';
import Link from 'next/link';
import DynamicSectionImage from '@/components/DynamicSectionImage';
import ScrollReveal from '@/components/ScrollReveal';
import { LocationLink } from '@/components/LocationMap';
import TextReveal from '@/components/TextReveal';
import {
  Home,
  ShieldCheck,
  EyeOff,
  ThermometerSnowflake,
  Calculator,
  Phone,
} from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export const metadata = {
  title: 'Control Solar y Películas para Hogares en Catamarca · American Tint',
  description:
    'Láminas de control térmico American Tint · Surface Innovation (Window Films y Vinilos) para ventanas y ventanales residenciales en Catamarca.',
};

export default function HomeServicePage() {
  return (
    <div className="bg-white text-[#1E242B] min-h-[100dvh]">
      {/* Hero Residencial */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="animate-hero-location flex items-center gap-2 text-sm font-semibold text-[#1E242B]">
                <Home className="w-4 h-4 text-[#1E242B]" />
                <span>División Residencial · Relevamiento en Domicilio & Taller</span>
              </div>

              <h1 className="animate-hero-title text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.035em] text-[#1E242B] leading-[1.04] text-balance">
                <TextReveal as="span" staggerMs={35}>
                  Confort térmico y luz natural en tu hogar.
                </TextReveal>
              </h1>

              <p className="animate-hero-subtitle text-lg text-[#4A545E] leading-relaxed max-w-2xl text-balance">
                Línea oficial <strong>American Tint · Surface Innovation</strong> (Window Films nano-cerámicas y vinilos arquitectónicos). Reducí hasta 8°C la temperatura ambiente interior y protegé pisos, muebles y cortinas sin necesidad de vivir a oscuras. Consultanos en nuestro taller de{' '}
                <LocationLink className="text-[#1E242B] font-semibold underline-offset-4">
                  Padre Zanello 341
                </LocationLink>{' '}
                o coordiná un relevamiento en obra.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/calculadora-materiales"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#1E242B] hover:bg-[#2E3742] text-white font-bold text-sm transition-colors"
                >
                  <Calculator className="w-4 h-4 text-white" />
                  <span>Calcular Medidas de Ventanas</span>
                </Link>

                <a
                  href="https://wa.me/5493834272000?text=Hola%20Luminadia,%20deseo%20solicitar%20un%20relevamiento%20para%20las%20ventanas%20de%20mi%20hogar."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#F8F9FA] hover:bg-[#F1F3F5] text-[#1E242B] font-semibold text-sm transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" variant="color" />
                  <span>Coordinar Visita Técnica</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-3xl overflow-hidden">
              <DynamicSectionImage
                section="hogares"
                fallbackSrc="/images/hogares.jpg"
                alt="Ventanales residenciales tratados con láminas Luminadia"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios residenciales clave */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 space-y-4">
          <span className="text-sm font-semibold text-[#1E242B] block">
            Calidad de vida en casa
          </span>
          <ScrollReveal blur={true} durationMs={950}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E242B] tracking-[-0.03em] leading-[1.08] text-balance">
              ¿Por qué instalar control solar en ventanales?
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-hover-effect p-8 rounded-3xl bg-white space-y-3">
            <ThermometerSnowflake className="w-6 h-6 text-[#1E242B]" />
            <h3 className="text-xl font-bold text-[#1E242B]">Reducción del Calor</h3>
            <p className="text-sm text-[#4A545E] leading-relaxed">
              Frena hasta un 82% del calor infrarrojo solar directo antes de que ingrese al ambiente, bajando sensiblemente el consumo eléctrico del aire acondicionado.
            </p>
          </div>

          <div className="card-hover-effect p-8 rounded-3xl bg-white space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#1E242B]" />
            <h3 className="text-xl font-bold text-[#1E242B]">Protección de Interiores</h3>
            <p className="text-sm text-[#4A545E] leading-relaxed">
              El 99% de bloqueo UV impide que el sol decolore pisos de madera, sillones, cortinados, cuadros y revestimientos interiores.
            </p>
          </div>

          <div className="card-hover-effect p-8 rounded-3xl bg-white space-y-3">
            <EyeOff className="w-6 h-6 text-[#1E242B]" />
            <h3 className="text-xl font-bold text-[#1E242B]">Privacidad Diurna</h3>
            <p className="text-sm text-[#4A545E] leading-relaxed">
              Impedí que se vea hacia el interior durante el día manteniendo la vista limpia hacia el jardín o la montaña sin necesidad de cortinas pesadas.
            </p>
          </div>
        </div>
      </section>

      {/* Aplicaciones en la vivienda */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 space-y-4">
          <span className="text-sm font-semibold text-[#1E242B] block">
            Superficies compatibles
          </span>
          <ScrollReveal blur={true} durationMs={950}>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E242B] tracking-[-0.03em] leading-[1.08] text-balance">
              Aberturas y espacios residenciales habituales.
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-hover-effect p-7 rounded-2xl bg-white space-y-2">
            <h3 className="font-bold text-[#1E242B] text-base">Puertas Balcón</h3>
            <p className="text-xs text-[#4A545E] leading-relaxed">
              Paños corredizos de gran formato que reciben sol directo gran parte de la tarde.
            </p>
          </div>

          <div className="card-hover-effect p-7 rounded-2xl bg-white space-y-2">
            <h3 className="font-bold text-[#1E242B] text-base">Paños Fijos y Doble Altura</h3>
            <p className="text-xs text-[#4A545E] leading-relaxed">
              Vidrios difíciles de cubrir con cortinas donde el calor acumulado en el techo se vuelve sofocante.
            </p>
          </div>

          <div className="card-hover-effect p-7 rounded-2xl bg-white space-y-2">
            <h3 className="font-bold text-[#1E242B] text-base">Ventanas de Dormitorios</h3>
            <p className="text-xs text-[#4A545E] leading-relaxed">
              Tonalidades intermedias para descanso óptimo y atenuación del resplandor matinal.
            </p>
          </div>

          <div className="card-hover-effect p-7 rounded-2xl bg-white space-y-2">
            <h3 className="font-bold text-[#1E242B] text-base">Galerías y Quinchos</h3>
            <p className="text-xs text-[#4A545E] leading-relaxed">
              Protección para disfrutar de espacios semi-cubiertos todo el año.
            </p>
          </div>
        </div>
      </section>

      {/* CTA a calculadora */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-ui="true" className="p-10 sm:p-14 rounded-3xl bg-[#1E242B] text-white space-y-6 max-w-3xl mx-auto">
          <h2
            style={{ color: '#FFFFFF' }}
            className="text-3xl sm:text-5xl font-extrabold !text-white text-white tracking-[-0.03em] leading-[1.08] text-balance block"
          >
            Calculá las dimensiones de tus ventanas
          </h2>
          <p className="text-base text-[#B3B6B9] font-normal leading-relaxed">
            Ingresá el ancho y alto de cada paño en centímetros o metros. El sistema calculará la superficie total neta y los metros lineales de rollo de 1.52m necesarios.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              href="/calculadora-materiales"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-neutral-100 text-[#1E242B] font-bold text-sm transition-colors"
            >
              <Calculator className="w-4 h-4 text-[#1E242B]" />
              <span>Abrir Calculadora Residencial</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
