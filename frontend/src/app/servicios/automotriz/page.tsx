import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Car,
  ShieldCheck,
  ThermometerSnowflake,
  EyeOff,
  Sparkles,
  ArrowRight,
  Calculator,
  Phone,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const metadata = {
  title: 'Láminas de Control Solar Automotriz en Catamarca',
  description:
    'Instalación profesional de láminas de control solar y polarizados de alta tecnología para autos, pick-ups y utilitarios en San Fernando del Valle de Catamarca.',
};

export default function AutomotiveServicePage() {
  return (
    <div className="bg-[#0e1110] text-[#f4f3ef] min-h-screen">
      {/* Hero de servicio */}
      <section className="relative py-20 lg:py-28 border-b border-[#2a322f] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#161a19] border border-[#2a322f] text-xs font-semibold text-amber-500">
                <Car className="w-4 h-4" />
                <span>División Automotriz · Luminadia Catamarca</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f4f3ef] leading-[1.1]">
                Control solar de alta tecnología para tu vehículo.
              </h1>

              <p className="text-lg text-[#9aa19d] leading-relaxed">
                Películas termoformables nano-cerámicas y de carbón diseñadas para combatir la radiación térmica extrema del verano catamarqueño. Bloqueo del 99% de rayos UV sin comprometer la visión nocturna.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/calculadora-materiales"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-[#0e1110] font-bold text-sm transition-colors shadow-lg"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calcular Materiales del Vehículo</span>
                </Link>

                <a
                  href="https://wa.me/5493834272000?text=Hola%20Luminadia,%20deseo%20consultar%20por%20l%C3%A1minas%20para%20mi%20veh%C3%ADculo."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#161a19] hover:bg-[#1e2422] border border-[#2a322f] text-[#f4f3ef] font-semibold text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Consultar Turno por WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#2a322f]">
              <Image
                src="/images/automotriz.jpg"
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
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#2a322f]">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            Ingeniería de cristal
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f3ef] tracking-tight">
            Cristales tratados y compatibilidad técnica.
          </h2>
          <p className="text-[#9aa19d] text-base">
            Cada vidrio de un automóvil posee características ópticas y curvaturas particulares que exigen técnicas de termoformado específicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
            <h3 className="text-lg font-bold text-[#f4f3ef]">Parabrisas Térmico</h3>
            <p className="text-sm text-[#9aa19d] leading-relaxed">
              Instalamos láminas Nano Cerámicas de alta claridad (70% o más de transmisión de luz) que frenan el calor frontal que ingresa directamente al torpedo sin oscurecer la visibilidad reglamentaria.
            </p>
            <div className="text-xs text-amber-500 font-mono pt-2">
              • Rechazo Infrarrojo: hasta 88%
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
            <h3 className="text-lg font-bold text-[#f4f3ef]">Laterales y Ventiletes</h3>
            <p className="text-sm text-[#9aa19d] leading-relaxed">
              Disponibles en tonalidades intermedias (20%) y oscuras (05%). Reducen el resplandor lateral del sol, resguardan bolsos y pertenencias, y protegen la tapicería de la radiación UV.
            </p>
            <div className="text-xs text-amber-500 font-mono pt-2">
              • Privacidad y protección de cuero
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
            <h3 className="text-lg font-bold text-[#f4f3ef]">Luneta Térmica</h3>
            <p className="text-sm text-[#9aa19d] leading-relaxed">
              Termoformado en una sola pieza continua sin cortes visibles, preservando las líneas resistivas del desempañador térmico original y la antena integrada de radio.
            </p>
            <div className="text-xs text-amber-500 font-mono pt-2">
              • Instalación en una sola pieza
            </div>
          </div>
        </div>

        {/* Advertencia técnica de curvatura */}
        <div className="mt-8 p-4 rounded-xl bg-[#161a19] border border-amber-500/30 text-xs text-[#9aa19d] flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Nota técnica de instalación:</strong> Los cristales curvos vehiculares requieren contracción térmica previa con calor antes de ser aplicados en el interior. Por este motivo, nuestra calculadora de materiales contempla una merma de bobina adecuada para garantizar sobrante de manipulación.
          </p>
        </div>
      </section>

      {/* Tonalidades disponibles */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#2a322f]">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            Tonalidades y VLT
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f3ef] tracking-tight">
            Transmisión de luz y privacidad a tu medida.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
            <span className="text-2xl font-bold text-amber-500 font-mono">70% VLT</span>
            <h3 className="text-lg font-bold text-[#f4f3ef]">Tono Claro Óptico</h3>
            <p className="text-sm text-[#9aa19d]">
              Imperceptible a la vista. Diseñado exclusivamente para el rechazo calórico y filtro UV sin perder un ápice de luz natural ni visibilidad nocturna.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
            <span className="text-2xl font-bold text-amber-500 font-mono">20% VLT</span>
            <h3 className="text-lg font-bold text-[#f4f3ef]">Tono Intermedio</h3>
            <p className="text-sm text-[#9aa19d]">
              La elección más equilibrada para laterales de autos. Confort visual ante el sol intenso de Catamarca y excelente definición de los retrovisores en la noche.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
            <span className="text-2xl font-bold text-amber-500 font-mono">05% VLT</span>
            <h3 className="text-lg font-bold text-[#f4f3ef]">Tono Oscuro</h3>
            <p className="text-sm text-[#9aa19d]">
              Máxima privacidad para pasajeros traseros y baúl. Evita que se distingan objetos en el habitáculo desde el exterior.
            </p>
          </div>
        </div>
      </section>

      {/* Llamado a la calculadora adaptada */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f3ef] tracking-tight">
            ¿Querés estimar el material para tu vehículo?
          </h2>
          <p className="text-[#9aa19d] text-base">
            Utilizá nuestra calculadora seleccionando tu tipo de carrocería (sedán, hatchback, SUV o camioneta) para conocer los metros de bobina necesarios.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/calculadora-materiales"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-[#0e1110] font-bold text-sm transition-colors"
            >
              <Calculator className="w-4 h-4" />
              <span>Abrir Calculadora Automotriz</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
