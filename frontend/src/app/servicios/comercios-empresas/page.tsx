import React from 'react';
import Link from 'next/link';
import DynamicSectionImage from '@/components/DynamicSectionImage';
import ScrollReveal from '@/components/ScrollReveal';
import { LocationLink } from '@/components/LocationMap';
import TextReveal from '@/components/TextReveal';
import {
  Building2,
  ShieldCheck,
  Zap,
  Eye,
  Calculator,
  Phone,
} from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export const metadata = {
  title: 'Control Solar Corporativo y Películas en Catamarca · American Tint',
  description:
    'Láminas solares American Tint · Surface Innovation (Window Films, Vinilos y Smart Film) para locales, oficinas y empresas en Catamarca.',
};

export default function CommercialServicePage() {
  return (
    <div className="bg-white text-[#1E242B] min-h-[100dvh]">
      {/* Hero Comercial */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="animate-hero-location flex items-center gap-2 text-sm font-semibold text-[#1E242B]">
                <Building2 className="w-4 h-4 text-[#1E242B]" />
                <span>División Corporativa y Comercial · Catamarca</span>
              </div>

              <h1 className="animate-hero-title text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.035em] text-[#1E242B] leading-[1.04] text-balance">
                <TextReveal as="span" staggerMs={35}>
                  Eficiencia térmica y protección para locales y oficinas.
                </TextReveal>
              </h1>

              <p className="animate-hero-subtitle text-lg text-[#4A545E] leading-relaxed max-w-2xl text-balance">
                Línea oficial <strong>American Tint · Surface Innovation</strong> (Window Films de alto rechazo, vinilos corporativos y Smart Film conmutable). Protegé mercadería contra rayos UV y optimizá el consumo eléctrico de climatización. Atención técnica en nuestro taller de{' '}
                <LocationLink className="text-[#1E242B] font-semibold underline-offset-4">
                  Padre Zanello 341
                </LocationLink>{' '}
                y visitas a obras comerciales.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/calculadora-materiales"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#1E242B] hover:bg-[#2E3742] text-white font-bold text-sm transition-colors"
                >
                  <Calculator className="w-4 h-4 text-white" />
                  <span>Calcular Metros Cuadrados de Vidriera</span>
                </Link>

                <a
                  href="https://wa.me/5493834272000?text=Hola%20Luminadia,%20deseo%20solicitar%20asesoramiento%20para%20un%20proyecto%20comercial%20en%20Catamarca."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#F8F9FA] hover:bg-[#F1F3F5] text-[#1E242B] font-semibold text-sm transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" variant="color" />
                  <span>Atención a Empresas por WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-3xl overflow-hidden">
              <DynamicSectionImage
                section="comercios"
                fallbackSrc="/images/comercios.jpg"
                alt="Fachada de oficinas y vidrieras comerciales con láminas Luminadia"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Soluciones para negocios */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 space-y-4">
          <span className="text-sm font-semibold text-[#1E242B] block">
            Retorno de inversión comercial
          </span>
          <ScrollReveal blur={true} durationMs={950}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E242B] tracking-[-0.03em] leading-[1.08] text-balance">
              Ventajas competitivas para tu negocio.
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-hover-effect p-8 rounded-3xl bg-white space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#1E242B]" />
            <h3 className="text-xl font-bold text-[#1E242B]">Protección de Vidrieras</h3>
            <p className="text-sm text-[#4A545E] leading-relaxed">
              Evita que el sol dañe, decolore o tueste productos expuestos (ropa, calzados, plásticos, impresos) manteniendo transparencia visual absoluta para los transeúntes.
            </p>
          </div>

          <div className="card-hover-effect p-8 rounded-3xl bg-white space-y-3">
            <Eye className="w-6 h-6 text-[#1E242B]" />
            <h3 className="text-xl font-bold text-[#1E242B]">Control de Deslumbramiento</h3>
            <p className="text-sm text-[#4A545E] leading-relaxed">
              En oficinas y locales de atención al público, atenúa el reflejo molesto en monitores de PC y terminales de cobro, disminuyendo la fatiga visual de los empleados.
            </p>
          </div>

          <div className="card-hover-effect p-8 rounded-3xl bg-white space-y-3">
            <Zap className="w-6 h-6 text-[#1E242B]" />
            <h3 className="text-xl font-bold text-[#1E242B]">Ahorro en Climatización</h3>
            <p className="text-sm text-[#4A545E] leading-relaxed">
              Reduce la carga térmica sobre los equipos de aire acondicionado en los meses de calor crítico en Catamarca, extendiendo la vida útil de los compresores.
            </p>
          </div>
        </div>
      </section>

      {/* Tipos de proyectos corporativos */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 space-y-4">
          <span className="text-sm font-semibold text-[#1E242B] block">
            Ámbitos de aplicación
          </span>
          <ScrollReveal blur={true} durationMs={950}>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E242B] tracking-[-0.03em] leading-[1.08] text-balance">
              Instalaciones habituales en empresas.
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card-hover-effect p-8 rounded-3xl bg-white space-y-2">
            <h3 className="font-bold text-[#1E242B] text-lg">Locales y Showrooms</h3>
            <p className="text-sm text-[#4A545E] leading-relaxed">
              Vidrieras principales con láminas de alta transparencia óptica y rechazo infrarrojo de hasta el 88%.
            </p>
          </div>

          <div className="card-hover-effect p-8 rounded-3xl bg-white space-y-2">
            <h3 className="font-bold text-[#1E242B] text-lg">Oficinas y Coworking</h3>
            <p className="text-sm text-[#4A545E] leading-relaxed">
              Separadores de ambientes vidriados con privacidad visual y confort térmico uniforme sin puntos calientes.
            </p>
          </div>

          <div className="card-hover-effect p-8 rounded-3xl bg-white space-y-2">
            <h3 className="font-bold text-[#1E242B] text-lg">Edificios y Fachadas</h3>
            <p className="text-sm text-[#4A545E] leading-relaxed">
              Láminas espejadas y dual-reflectivas que otorgan estética arquitectónica moderna y privacidad exterior diurna.
            </p>
          </div>
        </div>
      </section>

      {/* CTA a calculadora para proyectos comerciales */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-ui="true" className="p-10 sm:p-14 rounded-3xl bg-[#1E242B] text-white space-y-6 max-w-3xl mx-auto">
          <h2
            style={{ color: '#FFFFFF' }}
            className="text-3xl sm:text-5xl font-extrabold !text-white text-white tracking-[-0.03em] leading-[1.08] text-balance block"
          >
            Calculá el material para tu local o proyecto
          </h2>
          <p className="text-base text-[#B3B6B9] font-normal leading-relaxed">
            Podés registrar múltiples paños de diferentes dimensiones (vidrieras, puertas de acceso, paneles superiores) para obtener el metraje lineal de bobina total.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              href="/calculadora-materiales"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-neutral-100 text-[#1E242B] font-bold text-sm transition-colors"
            >
              <Calculator className="w-4 h-4 text-[#1E242B]" />
              <span>Abrir Calculadora Comercial</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
