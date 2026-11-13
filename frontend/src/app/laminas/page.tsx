import React from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import LocationMap, { LocationLink } from '@/components/LocationMap';
import TextReveal from '@/components/TextReveal';
import {
  Layers,
  Calculator,
  ArrowRight,
  Shield,
  Sparkles,
  Sun,
  Eye,
} from 'lucide-react';

export const metadata = {
  title: 'Catálogo de Láminas de Control Solar en Catamarca',
  description:
    'Especificaciones técnicas, tonalidades y niveles de rechazo calórico de nuestras láminas nano cerámicas, carbón, espejadas y de seguridad en Catamarca.',
};

export default function FilmsCatalogPage() {
  const films = [
    {
      id: 'nano-70',
      name: 'Nano Cerámica 70',
      series: 'Nano Cerámica de Titanio',
      vlt: '70%',
      irRejection: '88%',
      uvRejection: '99%',
      tser: '52%',
      shade: 'Claro imperceptible',
      description: 'Máximo rechazo térmico con transparencia total. Permite circular de noche sin ninguna reducción de visibilidad. Ideal para parabrisas de vehículos y vidrieras comerciales.',
      recommendedFor: 'Parabrisas, vidrieras comerciales, paños residenciales norte/oeste.',
    },
    {
      id: 'nano-20',
      name: 'Nano Cerámica Carbón 20',
      series: 'Nano Cerámica Híbrida',
      vlt: '20%',
      irRejection: '82%',
      uvRejection: '99%',
      tser: '64%',
      shade: 'Negro grafito medio',
      description: 'El balance ideal entre confort visual, atenuación del encandilamiento solar y privacidad en ventanillas laterales y ventanales residenciales.',
      recommendedFor: 'Laterales de autos y camionetas, puertas balcón, quinchos vidriados.',
    },
    {
      id: 'nano-05',
      name: 'Nano Cerámica Carbón 05',
      series: 'Carbón Estable',
      vlt: '5%',
      irRejection: '85%',
      uvRejection: '99%',
      tser: '68%',
      shade: 'Negro grafito oscuro',
      description: 'Máxima privacidad exterior y rechazo solar contundente. Impide que se distingan objetos en el interior durante el día.',
      recommendedFor: 'Laterales traseros y luneta, ventanas de dormitorios expuestos.',
    },
    {
      id: 'arq-dual-15',
      name: 'Arquitectónica Dual Reflectiva 15',
      series: 'Metalizada Pulverizada',
      vlt: '15%',
      irRejection: '78%',
      uvRejection: '99%',
      tser: '72%',
      shade: 'Espejado exterior / Neutro interior',
      description: 'Reflexión exterior diurna de alto impacto estético que repele la radiación antes de ingresar al cristal, manteniendo transparencia limpia desde adentro hacia afuera.',
      recommendedFor: 'Edificios corporativos, fachadas de oficinas, paños fijos en doble altura.',
    },
    {
      id: 'seguridad-4mil',
      name: 'Seguridad Antivandálica 4 Milésimas',
      series: 'Poliéster Multicapa Ultra Resistente',
      vlt: '88%',
      irRejection: '35%',
      uvRejection: '99%',
      tser: '38%',
      shade: 'Transparente cristal',
      description: 'Película de alta tenacidad que contiene el cristal ante impactos o roturas violentas, evitando que los fragmentos lesionen a los ocupantes o permitan accesos rápidos.',
      recommendedFor: 'Ventanillas delanteras de vehículos, puertas comerciales de ingreso.',
    },
  ];

  return (
    <div className="bg-white text-[#1E242B] min-h-[100dvh] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Cabecera */}
        <div className="max-w-3xl space-y-6">
          <div className="animate-hero-location flex items-center gap-2 text-sm font-semibold text-[#1E242B]">
            <Layers className="w-4 h-4 text-[#1E242B]" />
            <span>Línea Oficial American Tint · Surface Innovation</span>
          </div>

          <h1 className="animate-hero-title text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.035em] text-[#1E242B] leading-[1.04] text-balance">
            <TextReveal as="span" staggerMs={35}>
              Láminas de control solar con base científica.
            </TextReveal>
          </h1>

          <p className="animate-hero-subtitle text-lg text-[#4A545E] leading-relaxed max-w-2xl text-balance">
            Instalador y distribuidor oficial de <strong>American Tint · Surface Innovation</strong> en Catamarca. Cuatro familias de tecnología para superficies vidriadas y carrocerías: <strong>Window Films · Smart Film · PPF · Vinilos</strong>.
          </p>
        </div>

        {/* 4 Pilares de American Tint Surface Innovation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-hover-effect p-7 rounded-3xl bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E242B] text-white flex items-center justify-center">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold text-[#1E242B] block">American Tint</span>
            <h2 className="text-xl font-bold text-[#1E242B]">Window Films</h2>
            <p className="text-xs text-[#4A545E] leading-relaxed">
              Películas nano-cerámicas y de carbón para control solar, térmico y seguridad en arquitectura y vehículos. Bobinas de 1.52m con hasta 88% de rechazo infrarrojo.
            </p>
          </div>

          <div className="card-hover-effect p-7 rounded-3xl bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E242B] text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold text-[#1E242B] block">American Tint</span>
            <h2 className="text-xl font-bold text-[#1E242B]">Smart Film</h2>
            <p className="text-xs text-[#4A545E] leading-relaxed">
              Film conmutable electrónico (tecnología PDLC). Alterna entre cristal transparente y esmerilado opaco mediante switch o domótica para privacidad instantánea.
            </p>
          </div>

          <div className="card-hover-effect p-7 rounded-3xl bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E242B] text-white flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold text-[#1E242B] block">American Tint</span>
            <h2 className="text-xl font-bold text-[#1E242B]">PPF (Pintura)</h2>
            <p className="text-xs text-[#4A545E] leading-relaxed">
              Paint Protection Film de poliuretano autorregenerable. Blindaje transparente de alta absorción contra impacto de piedras, arena y rayones vehiculares.
            </p>
          </div>

          <div className="card-hover-effect p-7 rounded-3xl bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E242B] text-white flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold text-[#1E242B] block">American Tint</span>
            <h2 className="text-xl font-bold text-[#1E242B]">Vinilos</h2>
            <p className="text-xs text-[#4A545E] leading-relaxed">
              Vinilos esmerilados de privacidad, vinilos microperforados y de corte arquitectónico para oficinas, locales comerciales y diseño de frentes.
            </p>
          </div>
        </div>

        {/* Fichas detalladas de cada producto en superficies blancas de alta presencia */}
        <div className="space-y-8">
          {films.map((film) => (
            <div
              key={film.id}
              className="card-hover-effect p-8 sm:p-10 rounded-3xl bg-white"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs text-[#1E242B] font-bold block">
                    {film.series}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E242B] tracking-tight">
                    {film.name}
                  </h2>
                  <p className="text-sm sm:text-base text-[#4A545E] leading-relaxed">
                    {film.description}
                  </p>
                  <div className="pt-2 text-xs text-[#6C7680]">
                    <strong className="text-[#1E242B]">Aplicación recomendada:</strong> {film.recommendedFor}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#F8F9FA] p-6 rounded-2xl space-y-5">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-white">
                      <span className="block text-2xl font-black text-[#1E242B] tabular-nums">
                        {film.vlt}
                      </span>
                      <span className="text-[11px] text-[#4A545E] font-medium block mt-1">Luz Visible</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white">
                      <span className="block text-2xl font-black text-[#1E242B] tabular-nums">
                        {film.irRejection}
                      </span>
                      <span className="text-[11px] text-[#4A545E] font-medium block mt-1">Rechazo IR</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white">
                      <span className="block text-2xl font-black text-[#1E242B] tabular-nums">
                        {film.uvRejection}
                      </span>
                      <span className="text-[11px] text-[#4A545E] font-medium block mt-1">Filtro UV</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-[#4A545E]">
                      Ancho de rollo: <strong className="text-[#1E242B]">1.52 m</strong>
                    </span>
                    <Link
                      href="/calculadora-materiales"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E242B] hover:text-[#2E3742]"
                    >
                      <span>Calcular con este film</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabla comparativa técnica accesible */}
        <div className="space-y-8 pt-4">
          <ScrollReveal blur={true} durationMs={950}>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E242B] tracking-[-0.03em] leading-[1.08] text-balance">
              Tabla de Rendimiento Óptico Comparativo
            </h2>
          </ScrollReveal>

          <div className="overflow-x-auto rounded-2xl bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8F9FA] text-xs text-[#1E242B] font-bold">
                <tr>
                  <th scope="col" className="px-6 py-4">Lámina</th>
                  <th scope="col" className="px-6 py-4">Luz Visible (VLT)</th>
                  <th scope="col" className="px-6 py-4">Rechazo Térmico (IR)</th>
                  <th scope="col" className="px-6 py-4">Filtro UV</th>
                  <th scope="col" className="px-6 py-4">Energía Solar Total (TSER)</th>
                  <th scope="col" className="px-6 py-4">Garantía</th>
                </tr>
              </thead>
              <tbody className="text-[#1E242B]">
                {films.map((f) => (
                  <tr key={f.id} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="px-6 py-4 font-semibold">{f.name}</td>
                    <td className="px-6 py-4 tabular-nums text-[#1E242B] font-bold">{f.vlt}</td>
                    <td className="px-6 py-4 tabular-nums text-[#1E242B] font-black">{f.irRejection}</td>
                    <td className="px-6 py-4 tabular-nums font-semibold">{f.uvRejection}</td>
                    <td className="px-6 py-4 tabular-nums font-semibold">{f.tser}</td>
                    <td className="px-6 py-4 text-xs text-[#4A545E]">5 a 10 años</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Muestrario presencial y mapa */}
        <section className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-[#1E242B] block">
                Muestras Físicas en Catamarca
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1E242B] tracking-[-0.025em]">
                Comprobá la claridad óptica en nuestro taller.
              </h2>
              <p className="text-sm text-[#4A545E] leading-relaxed">
                Podés ver y palpar las muestras físicas de cada lámina American Tint (Window Films, Smart Film, PPF y Vinilos) sobre cristal real en Padre Zanello 341.
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

        {/* CTA final */}
        <div data-ui="true" className="p-10 sm:p-14 rounded-3xl bg-[#1E242B] text-white text-center space-y-6">
          <h2
            style={{ color: '#FFFFFF' }}
            className="text-3xl sm:text-5xl font-extrabold !text-white text-white tracking-[-0.03em] leading-[1.08] text-balance block"
          >
            ¿Tenés dudas sobre cuál es la tonalidad adecuada?
          </h2>
          <p className="text-base text-[#B3B6B9] max-w-xl mx-auto font-normal">
            Podés ver y palpar las muestras físicas de cada lámina en nuestro taller de{' '}
            <LocationLink className="text-white hover:text-white underline underline-offset-4 font-semibold">
              Padre Zanello 341
            </LocationLink>{' '}
            o consultar por WhatsApp con un asesor técnico.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/calculadora-materiales"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-neutral-100 text-[#1E242B] font-bold text-sm transition-colors"
            >
              <Calculator className="w-4 h-4 text-[#1E242B]" />
              <span>Abrir Calculadora de Materiales</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
