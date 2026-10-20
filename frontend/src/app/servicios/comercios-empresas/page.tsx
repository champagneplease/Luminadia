import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  ShieldCheck,
  Zap,
  Eye,
  ThermometerSnowflake,
  Calculator,
  Phone,
  ArrowRight,
} from 'lucide-react';

export const metadata = {
  title: 'Control Solar para Comercios y Empresas en Catamarca',
  description:
    'Láminas solares para vidrieras de locales, oficinas y edificios comerciales en Catamarca. Protección de mercadería, reducción del calor y ahorro energético.',
};

export default function CommercialServicePage() {
  return (
    <div className="bg-[#0e1110] text-[#f4f3ef] min-h-screen">
      {/* Hero Comercial */}
      <section className="relative py-20 lg:py-28 border-b border-[#2a322f] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#161a19] border border-[#2a322f] text-xs font-semibold text-amber-500">
                <Building2 className="w-4 h-4" />
                <span>División Corporativa y Comercial · Catamarca</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f4f3ef] leading-[1.1]">
                Eficiencia térmica y protección para locales y oficinas.
              </h1>

              <p className="text-lg text-[#9aa19d] leading-relaxed">
                Protegé la mercadería exhibida en vidrieras contra la radiación ultravioleta y mejorá el rendimiento de los equipos de trabajo reduciendo el calor y los reflejos en pantallas de computadoras.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/calculadora-materiales"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-[#0e1110] font-bold text-sm transition-colors shadow-lg"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calcular Metros Cuadrados de Vidriera</span>
                </Link>

                <a
                  href="https://wa.me/5493834272000?text=Hola%20Luminadia,%20deseo%20solicitar%20asesoramiento%20para%20un%20proyecto%20comercial%20en%20Catamarca."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#161a19] hover:bg-[#1e2422] border border-[#2a322f] text-[#f4f3ef] font-semibold text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Atención a Empresas por WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#2a322f]">
              <Image
                src="/images/comercios.jpg"
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
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#2a322f]">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            Retorno de inversión comercial
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f3ef] tracking-tight">
            Ventajas competitivas para tu negocio.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
            <ShieldCheck className="w-6 h-6 text-amber-500" />
            <h3 className="text-lg font-bold text-[#f4f3ef]">Protección de Vidrieras</h3>
            <p className="text-sm text-[#9aa19d] leading-relaxed">
              Evita que el sol dañe, decolore o tueste productos expuestos (ropa, calzados, plásticos, impresos) manteniendo transparencia visual absoluta para los transeúntes.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
            <Eye className="w-6 h-6 text-amber-500" />
            <h3 className="text-lg font-bold text-[#f4f3ef]">Control de Deslumbramiento</h3>
            <p className="text-sm text-[#9aa19d] leading-relaxed">
              En oficinas y locales de atención al público, atenúa el reflejo molesto en monitores de PC y terminales de cobro, disminuyendo la fatiga visual de los empleados.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
            <Zap className="w-6 h-6 text-amber-500" />
            <h3 className="text-lg font-bold text-[#f4f3ef]">Ahorro en Climatización</h3>
            <p className="text-sm text-[#9aa19d] leading-relaxed">
              Reduce la carga térmica sobre los equipos de aire acondicionado en los meses de calor crítico en Catamarca, extendiendo la vida útil de los compresores.
            </p>
          </div>
        </div>
      </section>

      {/* Tipos de proyectos corporativos */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#2a322f]">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            Ámbitos de aplicación
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f3ef] tracking-tight">
            Instalaciones habituales en empresas.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-2">
            <h3 className="font-bold text-[#f4f3ef] text-lg">Locales y Showrooms</h3>
            <p className="text-sm text-[#9aa19d]">
              Vidrieras principales con láminas de alta transparencia óptica y rechazo infrarrojo de hasta el 88%.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-2">
            <h3 className="font-bold text-[#f4f3ef] text-lg">Oficinas y Coworking</h3>
            <p className="text-sm text-[#9aa19d]">
              Separadores de ambientes vidriados con privacidad visual y confort térmico uniforme sin puntos calientes.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-2">
            <h3 className="font-bold text-[#f4f3ef] text-lg">Edificios y Fachadas</h3>
            <p className="text-sm text-[#9aa19d]">
              Láminas espejadas y dual-reflectivas que otorgan estética arquitectónica moderna y privacidad exterior diurna.
            </p>
          </div>
        </div>
      </section>

      {/* CTA a calculadora para proyectos comerciales */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f3ef] tracking-tight">
            Calculá el material para tu local o proyecto
          </h2>
          <p className="text-[#9aa19d] text-base">
            Podés registrar múltiples paños de diferentes dimensiones (vidrieras, puertas de acceso, paneles superiores) para obtener el metraje lineal de bobina total.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              href="/calculadora-materiales"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-[#0e1110] font-bold text-sm transition-colors"
            >
              <Calculator className="w-4 h-4" />
              <span>Abrir Calculadora Comercial</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
