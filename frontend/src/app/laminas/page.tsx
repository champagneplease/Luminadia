import React from 'react';
import Link from 'next/link';
import {
  Layers,
  ShieldCheck,
  ThermometerSnowflake,
  Calculator,
  ArrowRight,
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
    <div className="bg-[#0e1110] text-[#f4f3ef] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Cabecera */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#161a19] border border-[#2a322f] text-xs font-semibold text-amber-500">
            <Layers className="w-4 h-4" />
            <span>Catálogo y Especificaciones Técnicas</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f4f3ef] leading-[1.1]">
            Láminas de control solar con base científica.
          </h1>

          <p className="text-lg text-[#9aa19d] leading-relaxed">
            Todas nuestras películas cuentan con especificaciones ópticas verificadas de transmisión lumínica, rechazo de rayos infrarrojos y bloqueo ultravioleta. Bobinas de 1.52m de ancho estándar.
          </p>
        </div>

        {/* Fichas detalladas de cada producto */}
        <div className="space-y-6">
          {films.map((film) => (
            <div
              key={film.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#161a19] border border-[#2a322f] hover:border-amber-500/40 transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-500 block">
                    {film.series}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#f4f3ef]">
                    {film.name}
                  </h2>
                  <p className="text-sm text-[#9aa19d] leading-relaxed">
                    {film.description}
                  </p>
                  <div className="pt-2 text-xs text-[#636b67]">
                    <strong className="text-[#9aa19d]">Aplicación recomendada:</strong> {film.recommendedFor}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#0e1110] p-5 rounded-xl border border-[#2a322f] space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2.5 rounded-lg bg-[#161a19]">
                      <span className="block text-xl font-bold text-amber-500 tabular-nums">
                        {film.vlt}
                      </span>
                      <span className="text-[10px] text-[#9aa19d] uppercase">Luz Visible</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#161a19]">
                      <span className="block text-xl font-bold text-[#f4f3ef] tabular-nums">
                        {film.irRejection}
                      </span>
                      <span className="text-[10px] text-[#9aa19d] uppercase">Rechazo IR</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#161a19]">
                      <span className="block text-xl font-bold text-[#f4f3ef] tabular-nums">
                        {film.uvRejection}
                      </span>
                      <span className="text-[10px] text-[#9aa19d] uppercase">Filtro UV</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#1c2220]">
                    <span className="text-xs text-[#9aa19d]">
                      Ancho de rollo: <strong className="text-[#f4f3ef]">1.52 m</strong>
                    </span>
                    <Link
                      href="/calculadora-materiales"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 hover:text-amber-400"
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
        <div className="space-y-6 pt-8 border-t border-[#2a322f]">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f4f3ef]">
            Tabla de Rendimiento Óptico Comparativo
          </h2>

          <div className="overflow-x-auto rounded-xl border border-[#2a322f] bg-[#161a19]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#121514] border-b border-[#2a322f] text-xs text-[#9aa19d] uppercase tracking-wider font-semibold">
                <tr>
                  <th scope="col" className="px-6 py-4">Lámina</th>
                  <th scope="col" className="px-6 py-4">Luz Visible (VLT)</th>
                  <th scope="col" className="px-6 py-4">Rechazo Térmico (IR)</th>
                  <th scope="col" className="px-6 py-4">Filtro UV</th>
                  <th scope="col" className="px-6 py-4">Energía Solar Total (TSER)</th>
                  <th scope="col" className="px-6 py-4">Garantía</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c2220] text-[#f4f3ef]">
                {films.map((f) => (
                  <tr key={f.id} className="hover:bg-[#1e2422]/50 transition-colors">
                    <td className="px-6 py-4 font-semibold">{f.name}</td>
                    <td className="px-6 py-4 font-mono tabular-nums text-amber-500">{f.vlt}</td>
                    <td className="px-6 py-4 font-mono tabular-nums text-emerald-400">{f.irRejection}</td>
                    <td className="px-6 py-4 font-mono tabular-nums">{f.uvRejection}</td>
                    <td className="px-6 py-4 font-mono tabular-nums">{f.tser}</td>
                    <td className="px-6 py-4 text-xs text-[#9aa19d]">5 a 10 años</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA final */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#161a19] border border-[#2a322f] text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#f4f3ef]">
            ¿Tenés dudas sobre cuál es la tonalidad adecuada?
          </h2>
          <p className="text-base text-[#9aa19d] max-w-xl mx-auto">
            Podés ver y palpar las muestras físicas de cada lámina en nuestro taller de Padre Zanello 341 o consultar por WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/calculadora-materiales"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-[#0e1110] font-bold text-sm transition-colors"
            >
              <Calculator className="w-4 h-4" />
              <span>Abrir Calculadora de Materiales</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
