import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sun,
  ShieldCheck,
  ThermometerSnowflake,
  EyeOff,
  Sparkles,
  Layers,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ChevronRight,
  Flame,
  Zap,
} from 'lucide-react';
import FaqAccordion from '@/components/FaqAccordion';

export default function HomePage() {
  const faqItems = [
    {
      id: 'diferencia-polarizado',
      question: '¿Cuál es la diferencia entre un polarizado común y una lámina de control solar?',
      answer:
        'Un polarizado tradicional simplemente oscurece el cristal mediante tintes que absorben la luz visible, pero deja pasar gran parte de la radiación infrarroja (el calor real). Las láminas de control solar de alta tecnología de Luminadia incorporan partículas cerámicas o nanotecnología que rechazan selectivamente hasta el 85% del calor infrarrojo y el 99% de los rayos ultravioleta, sin necesidad de oscurecer excesivamente la visibilidad ni afectar señales electrónicas.',
    },
    {
      id: 'calculadora-precios',
      question: '¿La calculadora de materiales me da el precio final de la instalación?',
      answer:
        'No. En Luminadia priorizamos la transparencia técnica: la calculadora estima exclusivamente la superficie neta de tus cristales y los metros lineales de rollo necesarios según el ancho útil y los márgenes de corte. El costo de mano de obra, preparación y terminación se confirma de forma personalizada según el estado de los cristales y la complejidad del proyecto.',
    },
    {
      id: 'instalacion-tiempo',
      question: '¿Cuánto tiempo demora la colocación en un vehículo o en un domicilio?',
      answer:
        'En vehículos estándar, una instalación completa (laterales y luneta) demora entre 2 y 4 horas en nuestro taller. Para instalaciones residenciales o comerciales en Catamarca, coordinamos una visita técnica previa de relevamiento y la colocación se programa según la cantidad de aberturas.',
    },
    {
      id: 'interferencia-senales',
      question: '¿Las láminas interfieren con el GPS, telepeaje o la señal del celular?',
      answer:
        'Nuestras líneas de Nano Cerámica y Carbón son 100% no metálicas, por lo que garantizan cero interferencia con señales de radiofrecuencia, telepeaje, conectividad celular o antenas satelitales.',
    },
    {
      id: 'vidrios-curvos',
      question: '¿Cómo se trabaja en lunetas o parabrisas con pronunciada curvatura?',
      answer:
        'Los cristales curvados exigen un proceso de termoformado térmico con pistola de calor de precisión antes de la instalación interna. Por esta razón, la calculadora de materiales aplica un factor de merma específico para el sector automotriz y recomienda la revisión técnica final en taller.',
    },
  ];

  return (
    <div className="flex flex-col bg-[#0e1110] text-[#f4f3ef]">
      {/* 1. HERO SECTION: High-impact editorial composition */}
      <section className="relative min-h-[92vh] flex items-center justify-center border-b border-[#2a322f] overflow-hidden">
        {/* Background Image with subtle scrim */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="Lámina de control solar instalada en cristal automotriz y arquitectónico"
            fill
            priority
            className="object-cover object-center filter brightness-[0.4] contrast-[1.1]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1110] via-[#0e1110]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="max-w-3xl space-y-6">
            {/* Tagline de ubicación verídica */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#161a19]/90 border border-[#2a322f] text-xs font-medium text-amber-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>San Fernando del Valle de Catamarca</span>
            </div>

            {/* Titular principal en dos líneas seguras */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f4f3ef] leading-[1.08] text-balance">
              Control solar de alta tecnología.
            </h1>

            {/* Párrafo de apoyo claro y directo */}
            <p className="text-lg sm:text-xl text-[#9aa19d] leading-relaxed max-w-2xl">
              Láminas avanzadas para vehículos, residencias y empresas. Rechazo térmico infrarrojo, 99% de protección UV y máxima claridad óptica en cada instalación.
            </p>

            {/* Acciones principales diferenciadas */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/calculadora-materiales"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-lg bg-amber-600 hover:bg-amber-500 text-[#0e1110] font-bold text-base transition-colors shadow-lg focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <Calculator className="w-5 h-5" />
                <span>Calcular Materiales</span>
              </Link>

              <Link
                href="/laminas"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-[#161a19] hover:bg-[#1e2422] border border-[#2a322f] text-[#f4f3ef] font-semibold text-base transition-colors"
              >
                <span>Ver Tipos de Láminas</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
            </div>

            {/* Métricas técnicas comprobables */}
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-[#2a322f]/80 max-w-lg">
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-amber-500 tabular-nums">
                  99%
                </span>
                <span className="text-xs text-[#9aa19d]">Bloqueo UV</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-[#f4f3ef] tabular-nums">
                  85%
                </span>
                <span className="text-xs text-[#9aa19d]">Rechazo Infrarrojo</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-[#f4f3ef] tabular-nums">
                  1.52m
                </span>
                <span className="text-xs text-[#9aa19d]">Ancho de Rollo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IDENTIDAD Y PROPUESTA DE VALOR */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-b border-[#2a322f]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
              Quiénes somos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f3ef] tracking-tight leading-tight">
              Ingeniería óptica para el clima de Catamarca.
            </h2>
            <p className="text-[#9aa19d] text-base leading-relaxed">
              En Luminadia trabajamos con láminas de control solar de última generación diseñadas para soportar la alta radiación térmica y ultravioleta del Valle de Catamarca.
            </p>
            <p className="text-[#9aa19d] text-base leading-relaxed">
              No aplicamos tintes genéricos: seleccionamos películas con tecnología nano-cerámica y partículas de carbón que filtran el calor sin alterar la visibilidad ni provocar deslumbramientos.
            </p>
            <div className="pt-2">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-500 hover:text-amber-400 group"
              >
                <span>Conocé nuestro taller en Padre Zanello 341</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
              <ThermometerSnowflake className="w-6 h-6 text-amber-500" />
              <h3 className="text-lg font-bold text-[#f4f3ef]">Rechazo Térmico Real</h3>
              <p className="text-sm text-[#9aa19d] leading-relaxed">
                Reduce drásticamente la temperatura interior de cabinas y ambientes habitacionales, aliviando la exigencia del aire acondicionado.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
              <ShieldCheck className="w-6 h-6 text-amber-500" />
              <h3 className="text-lg font-bold text-[#f4f3ef]">Filtro Ultravioleta 99%</h3>
              <p className="text-sm text-[#9aa19d] leading-relaxed">
                Protección contra el envejecimiento prematuro de tapizados de cuero, tableros vehiculares, muebles y pisos de madera.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
              <EyeOff className="w-6 h-6 text-amber-500" />
              <h3 className="text-lg font-bold text-[#f4f3ef]">Privacidad y Confort</h3>
              <p className="text-sm text-[#9aa19d] leading-relaxed">
                Distintos grados de transmisión de luz visible (VLT) para resguardar pertenencias de miradas externas manteniendo claridad desde el interior.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
              <Sparkles className="w-6 h-6 text-amber-500" />
              <h3 className="text-lg font-bold text-[#f4f3ef]">Cero Interferencia</h3>
              <p className="text-sm text-[#9aa19d] leading-relaxed">
                Películas no metálicas compatibles con telepeaje, antenas de telefonía móvil, dispositivos GPS y radiofrecuencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRES CATEGORÍAS PRINCIPALES: AUTOMOTRIZ, HOGARES, COMERCIOS */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-b border-[#2a322f]">
        <div className="space-y-4 mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            Áreas de aplicación
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f3ef] tracking-tight">
            Soluciones adaptadas a cada superficie vidriada.
          </h2>
          <p className="text-[#9aa19d] text-base max-w-2xl">
            Cada proyecto responde a requerimientos técnicos específicos de transmisión de luz, seguridad y rechazo de calor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tarjeta 1: Automotriz */}
          <div className="group rounded-xl bg-[#161a19] border border-[#2a322f] overflow-hidden flex flex-col justify-between hover:border-amber-500/50 transition-colors">
            <div className="relative h-56 w-full">
              <Image
                src="/images/automotriz.jpg"
                alt="Instalación de láminas en vehículo en taller Luminadia"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#0e1110]/80 border border-[#2a322f] text-xs font-semibold text-amber-400">
                Automotriz
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[#f4f3ef] group-hover:text-amber-500 transition-colors">
                  Autos, Pick-Ups y Utilitarios
                </h3>
                <p className="text-sm text-[#9aa19d] mt-2 leading-relaxed">
                  Láminas termoformables para parabrisas, laterales y lunetas térmicas. Protección contra el calor agobiante al volante y preservación del interior.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/servicios/automotriz"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f4f3ef] group-hover:text-amber-500 transition-colors"
                >
                  <span>Ver servicio automotriz</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Hogares */}
          <div className="group rounded-xl bg-[#161a19] border border-[#2a322f] overflow-hidden flex flex-col justify-between hover:border-amber-500/50 transition-colors">
            <div className="relative h-56 w-full">
              <Image
                src="/images/hogares.jpg"
                alt="Ventanales residenciales con láminas de control solar"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#0e1110]/80 border border-[#2a322f] text-xs font-semibold text-amber-400">
                Residencial
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[#f4f3ef] group-hover:text-amber-500 transition-colors">
                  Hogares y Ventanales
                </h3>
                <p className="text-sm text-[#9aa19d] mt-2 leading-relaxed">
                  Control térmico y reducción del encandilamiento en puertas balcón, paños fijos y ventanales orientados al sol de la tarde.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/servicios/hogares"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f4f3ef] group-hover:text-amber-500 transition-colors"
                >
                  <span>Ver servicio residencial</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Tarjeta 3: Comercios y Empresas */}
          <div className="group rounded-xl bg-[#161a19] border border-[#2a322f] overflow-hidden flex flex-col justify-between hover:border-amber-500/50 transition-colors">
            <div className="relative h-56 w-full">
              <Image
                src="/images/comercios.jpg"
                alt="Vidrieras de comercios y oficinas tratadas con láminas solares"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#0e1110]/80 border border-[#2a322f] text-xs font-semibold text-amber-400">
                Corporativo
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[#f4f3ef] group-hover:text-amber-500 transition-colors">
                  Comercios y Empresas
                </h3>
                <p className="text-sm text-[#9aa19d] mt-2 leading-relaxed">
                  Protección de vidrieras comerciales contra la decoloración de mercadería y optimización de climatización en oficinas y locales.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/servicios/comercios-empresas"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f4f3ef] group-hover:text-amber-500 transition-colors"
                >
                  <span>Ver comercios y empresas</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TIPOS DE LÁMINAS Y TECNOLOGÍAS */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-b border-[#2a322f]">
        <div className="space-y-4 mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            Catálogo tecnológico
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f3ef] tracking-tight">
            Tecnologías de láminas verificadas.
          </h2>
          <p className="text-[#9aa19d] text-base max-w-2xl">
            Cada producto cuenta con especificaciones técnicas de transmisión de luz y rechazo calórico comprobadas en laboratorio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] flex flex-col justify-between space-y-4">
            <div>
              <div className="text-amber-500 font-mono text-xs uppercase tracking-wider mb-1">
                Serie Nano Cerámica
              </div>
              <h3 className="text-lg font-bold text-[#f4f3ef]">Cerámica Térmica</h3>
              <p className="text-sm text-[#9aa19d] mt-2 leading-relaxed">
                La tecnología más avanzada para control de calor. Rechazo infrarrojo superior al 80% disponible en tonalidades claras u oscuras.
              </p>
            </div>
            <div className="text-xs text-[#636b67] border-t border-[#1c2220] pt-3">
              TSER: hasta 68% · UV: 99%
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] flex flex-col justify-between space-y-4">
            <div>
              <div className="text-amber-500 font-mono text-xs uppercase tracking-wider mb-1">
                Serie Carbón
              </div>
              <h3 className="text-lg font-bold text-[#f4f3ef]">Carbón Estable</h3>
              <p className="text-sm text-[#9aa19d] mt-2 leading-relaxed">
                Color negro grafito profundo que nunca vira a violeta. Cero reflejo metálico interno y excelente nitidez diurna y nocturna.
              </p>
            </div>
            <div className="text-xs text-[#636b67] border-t border-[#1c2220] pt-3">
              TSER: hasta 55% · UV: 99%
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] flex flex-col justify-between space-y-4">
            <div>
              <div className="text-amber-500 font-mono text-xs uppercase tracking-wider mb-1">
                Serie Arquitectónica
              </div>
              <h3 className="text-lg font-bold text-[#f4f3ef]">Dual Reflectiva</h3>
              <p className="text-sm text-[#9aa19d] mt-2 leading-relaxed">
                Especial para fachadas expuestas al sol del oeste. Efecto espejo exterior con transparencia óptima desde el interior durante el día.
              </p>
            </div>
            <div className="text-xs text-[#636b67] border-t border-[#1c2220] pt-3">
              TSER: hasta 78% · UV: 99%
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] flex flex-col justify-between space-y-4">
            <div>
              <div className="text-amber-500 font-mono text-xs uppercase tracking-wider mb-1">
                Serie Protección
              </div>
              <h3 className="text-lg font-bold text-[#f4f3ef]">Seguridad Anti-Impacto</h3>
              <p className="text-sm text-[#9aa19d] mt-2 leading-relaxed">
                Película de poliéster multicapa de alta densidad que mantiene el vidrio unido en caso de rotura vandálica o accidentes.
              </p>
            </div>
            <div className="text-xs text-[#636b67] border-t border-[#1c2220] pt-3">
              Espesor: 4 a 8 milésimas
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALCULADORA DE MATERIALES: CALL TO ACTION CENTRAL */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-b border-[#2a322f]">
        <div className="rounded-2xl bg-gradient-to-br from-[#161a19] to-[#121514] border border-amber-600/30 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400">
              <Calculator className="w-4 h-4" />
              <span>Herramienta técnica de cálculo de insumos</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold text-[#f4f3ef] tracking-tight leading-tight">
              Calculá la cantidad exacta de material para tu proyecto.
            </h2>

            <p className="text-base sm:text-lg text-[#9aa19d] leading-relaxed">
              Ingresá las medidas de tus ventanas o seleccioná tu vehículo para obtener una estimación técnica de superficie en m² y metros lineales de rollo con ancho estándar de 1.52m.
            </p>

            <ul className="space-y-2 text-sm text-[#9aa19d]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Cálculo de aprovechamiento según ancho útil de bobina.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Diferenciación entre superficie neta y merma técnica de corte.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Envío directo del resumen a Luminadia por WhatsApp para asesoramiento.</span>
              </li>
            </ul>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/calculadora-materiales"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-lg bg-amber-600 hover:bg-amber-500 text-[#0e1110] font-bold text-base transition-colors shadow-lg"
              >
                <Calculator className="w-5 h-5" />
                <span>Abrir Calculadora de Materiales</span>
              </Link>
            </div>

            <p className="text-xs text-[#636b67] italic">
              * Nota: Esta herramienta calcula consumos orientativos de material. No muestra presupuestos monetarios automáticos.
            </p>
          </div>
        </div>
      </section>

      {/* 6. PROCESO DE INSTALACIÓN PASO A PASO */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-b border-[#2a322f]">
        <div className="space-y-4 mb-14 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            Metodología de trabajo
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f3ef] tracking-tight">
            Proceso de colocación de alta precisión.
          </h2>
          <p className="text-[#9aa19d] text-base">
            La durabilidad de una lámina solar depende en un 70% de la técnica de descontaminación del cristal y la precisión en el curado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
            <div className="text-amber-500 font-mono text-sm font-bold">FASE 1</div>
            <h3 className="text-lg font-bold text-[#f4f3ef]">Relevamiento Técnico</h3>
            <p className="text-sm text-[#9aa19d] leading-relaxed">
              Medición milimétrica del vano de cristal, verificación de orientación solar y elección del film idóneo.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
            <div className="text-amber-500 font-mono text-sm font-bold">FASE 2</div>
            <h3 className="text-lg font-bold text-[#f4f3ef]">Descontaminación</h3>
            <p className="text-sm text-[#9aa19d] leading-relaxed">
              Limpieza química profunda para remover grasa, siliconas o polvo microscópico en ambiente controlado.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
            <div className="text-amber-500 font-mono text-sm font-bold">FASE 3</div>
            <h3 className="text-lg font-bold text-[#f4f3ef]">Termoformado y Corte</h3>
            <p className="text-sm text-[#9aa19d] leading-relaxed">
              Moldeado térmico para adaptar la lámina a la curvatura del vidrio y corte sin rozar las gomas de sellado.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-3">
            <div className="text-amber-500 font-mono text-sm font-bold">FASE 4</div>
            <h3 className="text-lg font-bold text-[#f4f3ef]">Instalación y Curado</h3>
            <p className="text-sm text-[#9aa19d] leading-relaxed">
              Extracción total del líquido de montaje con espátulas de poliuretano y control de secado óptico.
            </p>
          </div>
        </div>
      </section>

      {/* 7. PREGUNTAS FRECUENTES (FAQ) */}
      <section className="py-20 lg:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-b border-[#2a322f]">
        <div className="space-y-4 mb-10 text-center">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            Respuestas claras
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f3ef] tracking-tight">
            Preguntas frecuentes sobre control solar.
          </h2>
          <p className="text-[#9aa19d] text-base">
            Aclaraciones técnicas sobre las láminas, mantenimiento y cuidados posteriores a la colocación.
          </p>
        </div>

        <FaqAccordion items={faqItems} />
      </section>

      {/* 8. UBICACIÓN Y CONTACTO LOCAL EN CATAMARCA */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
              Atención presional en Catamarca
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f3ef] tracking-tight">
              Visitanos en nuestro taller o consultanos por WhatsApp.
            </h2>
            <p className="text-[#9aa19d] text-base leading-relaxed">
              Atendemos consultas particulares y coordinamos relevamientos en obra para proyectos comerciales y arquitectónicos en toda la provincia.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#161a19] border border-[#2a322f]">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#f4f3ef] text-sm">Dirección</h3>
                  <p className="text-sm text-[#9aa19d]">
                    Padre Zanello 341, San Fernando del Valle de Catamarca, Argentina.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#161a19] border border-[#2a322f]">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#f4f3ef] text-sm">WhatsApp Oficial</h3>
                  <a
                    href="https://wa.me/5493834272000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-emerald-400 hover:underline"
                  >
                    +54 9 383 427-2000
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/5493834272000?text=Hola%20Luminadia,%20deseo%20consultar%20sobre%20l%C3%A1minas%20de%20control%20solar."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Conversar por WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#161a19] border border-[#2a322f] space-y-4">
            <h3 className="text-xl font-bold text-[#f4f3ef]">Horarios y modalidades</h3>
            <div className="space-y-3 text-sm text-[#9aa19d]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>Lunes a Viernes: 08:30 a 13:00 y 16:30 a 20:30 hs.</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>Sábados: 09:00 a 13:00 hs.</span>
              </div>
            </div>
            <p className="text-xs text-[#9aa19d] leading-relaxed pt-2 border-t border-[#1c2220]">
              Para colocaciones en vehículos se recomienda solicitar turno previo. En proyectos residenciales y corporativos, un técnico realiza el relevamiento en obra con muestras físicas de las láminas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
