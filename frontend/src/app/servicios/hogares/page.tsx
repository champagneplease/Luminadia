import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  ShieldCheck,
  Sun,
  EyeOff,
  ThermometerSnowflake,
  ArrowRight,
  Calculator,
  Phone,
  CheckCircle2,
} from 'lucide-react';

export const metadata = {
  title: 'Control Solar para Hogares y Residencias en Catamarca',
  description:
    'Láminas de control térmico y protección solar para ventanas, puertas balcón y ventanales residenciales en Catamarca. Rechazo del calor y ahorro energético.',
};

export default function HomeServicePage() {
  return (
    <div className="bg-[#0e1110] text-[#f4f3ef] min-h-screen">
      {/* Hero Residencial */}
      <section className="relative py-20 lg:py-28 border-b border-[#2a322f] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#161a19] border border-[#2a322f] text-xs font-semibold text-amber-500">
                <Home className="w-4 h-4" />
                <span>División Residencial · Luminadia Catamarca</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f4f3ef] leading-[1.1]">
                Confort térmico y luz natural en tu hogar.
              </h1>

              <p className="text-lg text-[#9aa19d] leading-relaxed">
                Transformá los ambientes expuestos al sol de la tarde en espacios frescos y habitables. Nuestras láminas arquitectónicas reducen la temperatura ambiente sin necesidad de oscurecer tus ambientes con persianas cerradas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/calculadora-materiales"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-[#0e1110] font-bold text-sm transition-colors shadow-lg"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calcular Medidas de Ventanas</span>
                </Link>

                <a
                  href="https://wa.me/5493834272000?text=Hola%20Luminadia,%20deseo%20solicitar%20un%20relevamiento%20para%20las%20ventanas%20de%20mi%20hogar."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#161a19] hover:bg-[#1e2422] border border-[#2a322f] text-[#f4f3ef] font-semibold text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Coordinar Visita Técnica</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#2a322f]">
              <Image
                src="/images/hogares.jpg"
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
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#2a322f]">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            Calidad de vida en casa
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f3ef] tracking-tight">
            ¿Por qué instalar control solar en ventanales?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
            <ThermometerSnowflake className="w-6 h-6 text-amber-500" />
            <h3 className="text-lg font-bold text-[#f4f3ef]">Reducción del Calor</h3>
            <p className="text-sm text-[#9aa19d] leading-relaxed">
              Frena hasta un 82% del calor infrarrojo solar directo antes de que ingrese al ambiente, bajando sensiblemente el consumo eléctrico del aire acondicionado.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
            <ShieldCheck className="w-6 h-6 text-amber-500" />
            <h3 className="text-lg font-bold text-[#f4f3ef]">Protección de Interiores</h3>
            <p className="text-sm text-[#9aa19d] leading-relaxed">
              El 99% de bloqueo UV impide que el sol decolore pisos de madera, sillones, cortinados, cuadros y revestimientos interiores.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
            <EyeOff className="w-6 h-6 text-amber-500" />
            <h3 className="text-lg font-bold text-[#f4f3ef]">Privacidad Diurna</h3>
            <p className="text-sm text-[#9aa19d] leading-relaxed">
              Impedí que se vea hacia el interior durante el día manteniendo la vista limpia hacia el jardín o la montaña sin necesidad de cortinas pesadas.
            </p>
          </div>
        </div>
      </section>

      {/* Aplicaciones en la vivienda */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#2a322f]">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            Superficies compatibles
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f3ef] tracking-tight">
            Aberturas y espacios residenciales habituales.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-2">
            <h3 className="font-bold text-[#f4f3ef] text-base">Puertas Balcón</h3>
            <p className="text-xs text-[#9aa19d]">
              Paños corredizos de gran formato que reciben sol directo gran parte de la tarde.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-2">
            <h3 className="font-bold text-[#f4f3ef] text-base">Paños Fijos y Doble Altura</h3>
            <p className="text-xs text-[#9aa19d]">
              Vidrios difíciles de cubrir con cortinas donde el calor acumulado en el techo se vuelve sofocante.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-2">
            <h3 className="font-bold text-[#f4f3ef] text-base">Ventanas de Dormitorios</h3>
            <p className="text-xs text-[#9aa19d]">
              Tonalidades intermedias para descanso óptimo y atenuación del resplandor matinal.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-2">
            <h3 className="font-bold text-[#f4f3ef] text-base">Galerías y Quinchos Vidriados</h3>
            <p className="text-xs text-[#9aa19d]">
              Protección para disfrutar de espacios semi-cubiertos todo el año.
            </p>
          </div>
        </div>
      </section>

      {/* CTA a calculadora */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f3ef] tracking-tight">
            Calculá las dimensiones de tus ventanas
          </h2>
          <p className="text-[#9aa19d] text-base">
            Ingresá el ancho y alto de cada paño en centímetros o metros. El sistema calculará la superficie total neta y los metros lineales de rollo de 1.52m necesarios.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              href="/calculadora-materiales"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-[#0e1110] font-bold text-sm transition-colors"
            >
              <Calculator className="w-4 h-4" />
              <span>Abrir Calculadora Residencial</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
