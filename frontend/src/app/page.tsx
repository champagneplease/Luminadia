'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import ParticipationsRibbon from '@/components/ParticipationsRibbon';
import { useSiteConfig } from '@/context/SiteConfigContext';
import {
  MapPin,
  Calculator,
  ArrowRight,
  ChevronRight,
  Phone,
  Clock,
  CheckCircle2,
  Car,
  Home,
  Building2,
  Briefcase,
} from 'lucide-react';
import LocationMap, { LocationLink } from '@/components/LocationMap';
import TextReveal from '@/components/TextReveal';
import VisualEditableText from '@/components/visual-editor/VisualEditableText';
import VisualEditableButton from '@/components/visual-editor/VisualEditableButton';
import VisualEditableImage from '@/components/visual-editor/VisualEditableImage';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function HomePage() {
  const { images, texts, calculator } = useSiteConfig();

  // Mini simulador técnico interactivo en la portada
  const [quickCategory, setQuickCategory] = useState<'automotriz' | 'hogares' | 'comercios'>('automotriz');
  const [vehicleType, setVehicleType] = useState<'sedan' | 'suv' | 'utilitario'>('sedan');
  const [windowWidth, setWindowWidth] = useState<number>(1.2);
  const [windowHeight, setWindowHeight] = useState<number>(1.5);
  const [windowCount, setWindowCount] = useState<number>(2);
  const [commWidth, setCommWidth] = useState<number>(2.4);
  const [commHeight, setCommHeight] = useState<number>(2.0);
  const [commCount, setCommCount] = useState<number>(2);

  // Cálculos dinámicos sincronizados con los parámetros configurados por el administrador
  let currentNetM2 = 0;
  let currentLinearMeters = '0';
  let currentMermaPercent = 0;
  let currentMermaLabel = '';

  if (quickCategory === 'automotriz') {
    currentMermaPercent = calculator?.automotiveSafetyMarginPercent ?? 15;
    currentMermaLabel = 'Termoformado luneta y cristales curvos';
    if (vehicleType === 'sedan') {
      currentNetM2 = 2.35;
      currentLinearMeters = '3.2';
    } else if (vehicleType === 'suv') {
      currentNetM2 = 3.10;
      currentLinearMeters = '4.1';
    } else {
      currentNetM2 = 1.90;
      currentLinearMeters = '2.6';
    }
  } else if (quickCategory === 'hogares') {
    currentMermaPercent = calculator?.residentialSafetyMarginPercent ?? 10;
    currentMermaLabel = 'Sobrante paños planos residenciales';
    currentNetM2 = Number((windowWidth * windowHeight * windowCount).toFixed(2));
    const factor = 1 + currentMermaPercent / 100;
    const usableW = calculator?.usableWidthMeters ?? 1.50;
    currentLinearMeters = Math.max(1, (currentNetM2 * factor) / usableW).toFixed(1);
  } else {
    currentMermaPercent = calculator?.commercialSafetyMarginPercent ?? 12;
    currentMermaLabel = 'Vidrieras comerciales gran formato';
    currentNetM2 = Number((commWidth * commHeight * commCount).toFixed(2));
    const factor = 1 + currentMermaPercent / 100;
    const usableW = calculator?.usableWidthMeters ?? 1.50;
    currentLinearMeters = Math.max(1, (currentNetM2 * factor) / usableW).toFixed(1);
  }

  const getQuickWhatsAppUrl = () => {
    let catName = 'Automotriz';
    let details = '';
    if (quickCategory === 'automotriz') {
      catName = 'Vehículo Automotriz';
      details =
        vehicleType === 'sedan'
          ? 'Sedán / Hatchback (5 cristales)'
          : vehicleType === 'suv'
          ? 'SUV / Pickup (7 cristales)'
          : 'Utilitario / Furgón (3 cristales)';
    } else if (quickCategory === 'hogares') {
      catName = 'Residencial / Hogar';
      details = `${windowCount} paños de ${windowWidth}m x ${windowHeight}m`;
    } else {
      catName = 'Comercial / Empresa';
      details = `${commCount} vidrieras de ${commWidth}m x ${commHeight}m`;
    }

    const text = `Hola Luminadia, estuve usando el simulador técnico en su sitio web:\n· Categoría: ${catName}\n· Detalle: ${details}\n· Superficie neta: ${currentNetM2} m²\n· Estimado de rollo: ~${currentLinearMeters} m lineales\nQuisiera consultar por presupuesto e instalación en Catamarca.`;
    return `https://wa.me/5493834272000?text=${encodeURIComponent(text)}`;
  };

  const faqItems = [
    {
      id: 'vlt-calor',
      question: '¿Cómo influye el porcentaje de tonalidad (VLT) en el rechazo térmico?',
      answer:
        'El porcentaje de transmisión de luz visible (VLT) define cuán clara u oscura se percibe la película, pero no determina por sí solo el calor que bloquea. Gracias a la tecnología nano-cerámica, una lámina casi imperceptible como la Cerámica 70% puede rechazar hasta un 88% de los rayos infrarrojos solares sin restar visibilidad nocturna ni oscurecer vidrieras.',
    },
    {
      id: 'claras-vs-oscuras',
      question: '¿Es necesario oscurecer el cristal para lograr máxima protección térmica?',
      answer:
        'No. En láminas tradicionales tintadas se dependía del oscurecimiento para frenar la radiación. Nuestras láminas nano-cerámicas pulverizadas con partículas cerámicas de titanio bloquean selectivamente la longitud de onda infrarroja y el 99% de los rayos UV manteniendo transparencia óptica total si el usuario lo requiere.',
    },
    {
      id: 'interferencia-senales',
      question: '¿Las láminas instaladas afectan telepeaje, telefonía celular o señal GPS?',
      answer:
        'Ninguna de nuestras líneas nano-cerámicas o carbón genera interferencia electromagnética. Son 100% dieléctricas (no metálicas), por lo que las antenas integradas en luneta, dispositivos de telepeaje vial, chips de acceso y receptores satelitales funcionan con total normalidad.',
    },
    {
      id: 'tiempo-secado',
      question: '¿Cuánto tiempo se debe aguardar antes de bajar ventanillas o limpiar vidrios?',
      answer:
        'Recomendamos no accionar los levantavidrios durante las 48 horas posteriores a la colocación para garantizar la evaporación completa del agua de fijación y el anclaje del adhesivo sensible a la presión (PSA). Para limpieza superficial, se aconseja utilizar paño de microfibra y agua desmineralizada sin alcohol.',
    },
    {
      id: 'vidrios-curvos',
      question: '¿Cómo se aborda la curvatura pronunciada de lunetas o parabrisas?',
      answer:
        'Los cristales curvados exigen un termoformado térmico previo con calor de precisión antes de la instalación interna, logrando que el film copie la forma del cristal en una sola pieza sin empalmes. La calculadora técnica contempla la merma de rollo correspondiente para este sobrante de manipulación.',
    },
  ];

  return (
    <div className="flex flex-col bg-white text-[#1E242B]">
      {/* 0. BARRA DE ANUNCIO SUPERIOR DINÁMICA */}
      {texts.announcementActive && texts.announcementText && (
        <div data-ui="true" className="bg-[#1E242B] text-white py-2.5 px-4 text-center text-xs font-semibold border-b border-[#B3B6B9]/40 flex items-center justify-center gap-2">
          <VisualEditableText contentKey="announcementText" label="Texto del Anuncio Superior">
            {texts.announcementText}
          </VisualEditableText>
        </div>
      )}

      {/* 1. HERO SECTION: Monumental architectural headline with authentic spatial clarity */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Real Architectural & Automotive Glass Background with crisp scrim */}
        <VisualEditableImage
          imageKey="hero"
          label="Foto de Portada (Hero)"
          defaultSrc={images.hero || '/images/hero-fachada.jpg'}
          alt="Fachada de edificio con láminas de control solar instaladas en cristales · Luminadia Catamarca"
          fill
          priority
          sizes="100vw"
          imageClassName="object-cover object-center filter brightness-[0.98] contrast-[1.04] animate-hero-bg"
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-white/80 backdrop-none pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 w-full">
          <div className="max-w-4xl space-y-8">
            {/* Ubicación y autoridad territorial con enlace directo a Google Maps */}
            <LocationLink
              showPin={true}
              showExternalIcon={true}
              className="animate-hero-location inline-flex items-center gap-2 text-sm font-semibold text-[#1E242B] hover:text-[#2E3742]"
            >
              <VisualEditableText contentKey="heroBadge" label="Insignia de Ubicación (Hero)">
                {texts.heroBadge || 'San Fernando del Valle de Catamarca · Taller y Relevamiento en Obra'}
              </VisualEditableText>
            </LocationLink>

            {/* Titular monumental en dos líneas seguras con escala arquitectónica */}
            <h1 className="animate-hero-title text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.035em] text-[#1E242B] leading-[1.02] text-balance">
              <VisualEditableText
                contentKey="heroTitle"
                label="Título Principal (Hero)"
                as="span"
              >
                {texts.heroTitle || 'Control solar de alta tecnología.'}
              </VisualEditableText>
            </h1>

            {/* Párrafo de apoyo en tinta completa con cuerpo legible */}
            <VisualEditableText
              contentKey="heroSubtitle"
              label="Subtítulo Principal (Hero)"
              multiline={true}
              as="p"
              className="animate-hero-subtitle text-lg sm:text-xl text-[#4A545E] leading-relaxed max-w-2xl font-normal text-balance"
            >
              {texts.heroSubtitle || 'Láminas avanzadas para vehículos, residencias y empresas. Rechazo térmico infrarrojo, 99% de protección UV y máxima claridad óptica en cada instalación.'}
            </VisualEditableText>

            {/* Acciones principales directas y sobrias */}
            <div className="animate-hero-actions pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <VisualEditableButton
                textKey="heroCtaCalculator"
                urlKey="heroCtaCalculatorUrl"
                label="Botón Calcular Materiales"
                defaultText="Calcular Materiales"
                defaultHref="/calculadora-materiales"
                icon={<Calculator className="w-5 h-5 text-white" />}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#1E242B] hover:bg-[#2E3742] text-white font-bold text-base transition-colors"
              />

              <VisualEditableButton
                textKey="heroCtaCatalog"
                urlKey="heroCtaCatalogUrl"
                label="Botón Ver Catálogo"
                defaultText="Ver Catálogo de Láminas"
                defaultHref="/laminas"
                icon={<ArrowRight className="w-4 h-4 text-[#1E242B]" />}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#F8F9FA] hover:bg-[#F1F3F5] text-[#1E242B] font-semibold text-base transition-colors"
              />

              <a
                href="#calculadora"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-bold text-[#1E242B] hover:text-[#4A545E] transition-colors"
              >
                <span>Simulador en vivo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Métricas técnicas comprobables en cifras de escala noble */}
            <div className="animate-hero-stats pt-10 grid grid-cols-3 gap-8 max-w-xl">
              <div>
                <VisualEditableText
                  contentKey="heroStat1Number"
                  label="Métrica 1 Cifra"
                  className="block text-3xl sm:text-4xl font-black text-[#1E242B] tabular-nums tracking-tight"
                >
                  {texts.heroStat1Number || '99%'}
                </VisualEditableText>
                <VisualEditableText
                  contentKey="heroStat1Label"
                  label="Métrica 1 Etiqueta"
                  className="text-xs text-[#4A545E] font-medium block mt-1"
                >
                  {texts.heroStat1Label || 'Bloqueo UV Total'}
                </VisualEditableText>
              </div>
              <div>
                <VisualEditableText
                  contentKey="heroStat2Number"
                  label="Métrica 2 Cifra"
                  className="block text-3xl sm:text-4xl font-black text-[#1E242B] tabular-nums tracking-tight"
                >
                  {texts.heroStat2Number || '88%'}
                </VisualEditableText>
                <VisualEditableText
                  contentKey="heroStat2Label"
                  label="Métrica 2 Etiqueta"
                  className="text-xs text-[#4A545E] font-medium block mt-1"
                >
                  {texts.heroStat2Label || 'Rechazo Térmico IR'}
                </VisualEditableText>
              </div>
              <div>
                <VisualEditableText
                  contentKey="heroStat3Number"
                  label="Métrica 3 Cifra"
                  className="block text-3xl sm:text-4xl font-black text-[#1E242B] tabular-nums tracking-tight"
                >
                  {texts.heroStat3Number || '1.52m'}
                </VisualEditableText>
                <VisualEditableText
                  contentKey="heroStat3Label"
                  label="Métrica 3 Etiqueta"
                  className="text-xs text-[#4A545E] font-medium block mt-1"
                >
                  {texts.heroStat3Label || 'Ancho Útil de Rollo'}
                </VisualEditableText>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IDENTIDAD Y FUNDAMENTO TÉCNICO: Pruebas de ingeniería sin tarjetas genéricas */}
      <section className="py-24 lg:py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <ScrollReveal direction="left" blur={true} durationMs={950} className="lg:col-span-5 space-y-6">
            <span className="text-sm font-semibold text-[#1E242B] block">
              <VisualEditableText contentKey="aboutBadge" label="Insignia Quiénes Somos">
                {texts.aboutBadge || 'Quiénes somos y cómo trabajamos'}
              </VisualEditableText>
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E242B] tracking-[-0.03em] leading-[1.08] text-balance">
              <VisualEditableText
                contentKey="aboutTitle"
                label="Título Quiénes Somos"
                as="span"
              >
                {texts.aboutTitle || 'Ingeniería óptica para el clima de Catamarca.'}
              </VisualEditableText>
            </h2>
            <VisualEditableText
              contentKey="aboutParagraph1"
              label="Párrafo 1 Quiénes Somos"
              multiline={true}
              as="p"
              className="text-[#4A545E] text-base leading-relaxed"
            >
              {texts.aboutParagraph1 || 'En Luminadia trabajamos con láminas de control solar de última generación diseñadas para soportar la alta radiación térmica y ultravioleta del Valle de Catamarca.'}
            </VisualEditableText>
            <VisualEditableText
              contentKey="aboutParagraph2"
              label="Párrafo 2 Quiénes Somos"
              multiline={true}
              as="p"
              className="text-[#4A545E] text-base leading-relaxed"
            >
              {texts.aboutParagraph2 || 'No aplicamos tintes genéricos: seleccionamos películas con tecnología nano-cerámica y partículas de carbón que filtran el calor sin alterar la visibilidad ni provocar deslumbramientos.'}
            </VisualEditableText>
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <LocationLink className="inline-flex items-center gap-2 text-sm font-bold text-[#1E242B] hover:text-[#2E3742] group underline-offset-4 hover:underline">
                <span>Conocé nuestro taller en Padre Zanello 341</span>
              </LocationLink>
              <Link
                href="/laminas"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A545E] hover:text-[#1E242B] transition-colors"
              >
                <span>Ver catálogo American Tint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Referencia técnica a American Tint Surface Innovation */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-medium text-[#4A545E]">
              <span className="px-2.5 py-1 rounded-md bg-[#F8F9FA] text-[#1E242B] font-bold">
                American Tint · Surface Innovation
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#F8F9FA]">Window Films</span>
              <span className="px-2.5 py-1 rounded-md bg-[#F8F9FA]">Smart Film</span>
              <span className="px-2.5 py-1 rounded-md bg-[#F8F9FA]">PPF</span>
              <span className="px-2.5 py-1 rounded-md bg-[#F8F9FA]">Vinilos</span>
            </div>
          </ScrollReveal>

          {/* Grilla editorial con números de escala contundente en superficies blancas puras */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ScrollReveal delayMs={50}>
              <div className="card-hover-effect p-7 sm:p-8 rounded-2xl bg-white space-y-3">
                <span className="block text-4xl sm:text-5xl font-black text-[#1E242B] tabular-nums tracking-tight">
                  88%
                </span>
                <h3 className="text-base font-bold text-[#1E242B]">Rechazo Infrarrojo Térmico</h3>
                <p className="text-sm text-[#4A545E] leading-relaxed">
                  Frena la radiación calórica solar directa antes de ingresar a la cabina o ambiente, reduciendo la exigencia del aire acondicionado.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={120}>
              <div className="card-hover-effect p-7 sm:p-8 rounded-2xl bg-white space-y-3">
                <span className="block text-4xl sm:text-5xl font-black text-[#1E242B] tabular-nums tracking-tight">
                  99%
                </span>
                <h3 className="text-base font-bold text-[#1E242B]">Filtro Ultravioleta Total</h3>
                <p className="text-sm text-[#4A545E] leading-relaxed">
                  Barrera protectora contra el envejecimiento prematuro de tapicería, cueros vehiculares, cortinados y pisos de madera.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={190}>
              <div className="card-hover-effect p-7 sm:p-8 rounded-2xl bg-white space-y-3">
                <span className="block text-4xl sm:text-5xl font-black text-[#1E242B] tabular-nums tracking-tight">
                  0%
                </span>
                <h3 className="text-base font-bold text-[#1E242B]">Interferencia de Señal</h3>
                <p className="text-sm text-[#4A545E] leading-relaxed">
                  Composición nano-cerámica no metálica: compatibilidad absoluta con telepeaje, radiofrecuencia, telefonía celular y GPS.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={260}>
              <div className="card-hover-effect p-7 sm:p-8 rounded-2xl bg-white space-y-3">
                <span className="block text-4xl sm:text-5xl font-black text-[#1E242B] tabular-nums tracking-tight">
                  1.52m
                </span>
                <h3 className="text-base font-bold text-[#1E242B]">Ancho Útil Continuo</h3>
                <p className="text-sm text-[#4A545E] leading-relaxed">
                  Instalación en paños continuos de gran escala y lunetas térmicas termoformadas en una sola pieza sin empalmes.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2.5 PARTICIPACIONES & EXPOSICIONES OFICIALES (CINTA CONTINUA EN MOVIMIENTO) */}
      <ParticipationsRibbon />

      {/* 3. ÁMBITOS DE APLICACIÓN: Fotografía arquitectónica y servicios profesionales */}
      <section className="py-24 lg:py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <ScrollReveal blur={true} durationMs={950} className="space-y-4 mb-14">
          <span className="text-sm font-semibold text-[#1E242B] block">
            Áreas de aplicación
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E242B] tracking-[-0.03em] leading-[1.08] text-balance">
            <VisualEditableText
              contentKey="servicesTitle"
              label="Título Áreas de Aplicación"
              as="span"
            >
              {texts.servicesTitle || 'Soluciones adaptadas a cada superficie vidriada.'}
            </VisualEditableText>
          </h2>
          <VisualEditableText
            contentKey="servicesSubtitle"
            label="Subtítulo Áreas de Aplicación"
            multiline={true}
            as="p"
            className="text-[#4A545E] text-base sm:text-lg max-w-2xl leading-relaxed"
          >
            {texts.servicesSubtitle || 'Cada proyecto responde a requerimientos técnicos específicos de transmisión de luz, seguridad y rechazo de calor.'}
          </VisualEditableText>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tarjeta 1: Automotriz */}
          <ScrollReveal delayMs={60}>
            <div className="card-hover-effect group rounded-2xl bg-white overflow-hidden flex flex-col justify-between h-full">
              <div className="relative h-60 w-full overflow-hidden">
                <VisualEditableImage
                  imageKey="automotriz"
                  label="Foto Automotriz"
                  defaultSrc={images.automotriz || '/images/automotriz.jpg'}
                  alt="Instalación de láminas en vehículo en taller Luminadia"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  imageClassName="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  className="w-full h-full"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#1E242B] text-xs font-semibold text-white pointer-events-none z-10">
                  Automotriz
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#1E242B]">
                    <VisualEditableText contentKey="serviceAutoTitle" label="Título Tarjeta Automotriz">
                      {texts.serviceAutoTitle || 'Autos, Pick-Ups y Utilitarios'}
                    </VisualEditableText>
                  </h3>
                  <VisualEditableText
                    contentKey="serviceAutoDesc"
                    label="Descripción Tarjeta Automotriz"
                    multiline={true}
                    as="p"
                    className="text-xs text-[#4A545E] mt-2 leading-relaxed"
                  >
                    {texts.serviceAutoDesc || 'Láminas termoformables para parabrisas, laterales y lunetas térmicas.'}
                  </VisualEditableText>
                </div>
                <div className="pt-2">
                  <Link
                    href="/servicios/automotriz"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1E242B] group-hover:text-[#2E3742] transition-colors"
                  >
                    <span>Ver servicio automotriz</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Tarjeta 2: Hogares */}
          <ScrollReveal delayMs={140}>
            <div className="card-hover-effect group rounded-2xl bg-white overflow-hidden flex flex-col justify-between h-full">
              <div className="relative h-60 w-full overflow-hidden">
                <VisualEditableImage
                  imageKey="hogares"
                  label="Foto Residencial"
                  defaultSrc={images.hogares || '/images/hogares.jpg'}
                  alt="Ventanales residenciales con láminas de control solar"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  imageClassName="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  className="w-full h-full"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#1E242B] text-xs font-semibold text-white pointer-events-none z-10">
                  Residencial
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#1E242B]">
                    <VisualEditableText contentKey="serviceHomeTitle" label="Título Tarjeta Residencial">
                      {texts.serviceHomeTitle || 'Hogares y Ventanales'}
                    </VisualEditableText>
                  </h3>
                  <VisualEditableText
                    contentKey="serviceHomeDesc"
                    label="Descripción Tarjeta Residencial"
                    multiline={true}
                    as="p"
                    className="text-xs text-[#4A545E] mt-2 leading-relaxed"
                  >
                    {texts.serviceHomeDesc || 'Control térmico y reducción del encandilamiento en puertas balcón y paños fijos.'}
                  </VisualEditableText>
                </div>
                <div className="pt-2">
                  <Link
                    href="/servicios/hogares"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1E242B] group-hover:text-[#2E3742] transition-colors"
                  >
                    <span>Ver servicio residencial</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Tarjeta 3: Comercios y Empresas */}
          <ScrollReveal delayMs={220}>
            <div className="card-hover-effect group rounded-2xl bg-white overflow-hidden flex flex-col justify-between h-full">
              <div className="relative h-60 w-full overflow-hidden">
                <VisualEditableImage
                  imageKey="comercios"
                  label="Foto Corporativo"
                  defaultSrc={images.comercios || '/images/comercios.jpg'}
                  alt="Vidrieras de comercios y oficinas tratadas con láminas solares"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  imageClassName="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  className="w-full h-full"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#1E242B] text-xs font-semibold text-white pointer-events-none z-10">
                  Corporativo
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#1E242B]">
                    <VisualEditableText contentKey="serviceCommTitle" label="Título Tarjeta Corporativa">
                      {texts.serviceCommTitle || 'Comercios y Empresas'}
                    </VisualEditableText>
                  </h3>
                  <VisualEditableText
                    contentKey="serviceCommDesc"
                    label="Descripción Tarjeta Corporativa"
                    multiline={true}
                    as="p"
                    className="text-xs text-[#4A545E] mt-2 leading-relaxed"
                  >
                    {texts.serviceCommDesc || 'Protección de vidrieras contra decoloración y ahorro en climatización.'}
                  </VisualEditableText>
                </div>
                <div className="pt-2">
                  <Link
                    href="/servicios/comercios-empresas"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1E242B] group-hover:text-[#2E3742] transition-colors"
                  >
                    <span>Ver comercios y empresas</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Tarjeta 4: + Servicios Profesionales */}
          <ScrollReveal delayMs={300}>
            <div className="card-hover-effect group rounded-2xl bg-white overflow-hidden flex flex-col justify-between h-full">
              <div className="relative h-60 w-full overflow-hidden">
                <VisualEditableImage
                  imageKey="servicios_profesionales"
                  label="Foto + Servicios Profesionales"
                  defaultSrc="/images/servicios-profesionales.jpg"
                  alt="Consultoría profesional en arquitectura y control térmico"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  imageClassName="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  className="w-full h-full"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#1E242B] text-xs font-semibold text-white flex items-center gap-1 pointer-events-none z-10">
                  <Briefcase className="w-3 h-3 text-white" />
                  <span>{texts.masServiciosBadge || '+ Servicios'}</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#1E242B]">
                    {texts.masServiciosTitle || 'Arquitectura & Asesoría'}
                  </h3>
                  <p className="text-xs text-[#4A545E] mt-2 leading-relaxed">
                    {texts.masServiciosSubtitle || 'Estudios de asoleamiento para arquitectos, cómputos métricos de obra y licitaciones.'}
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href="/servicios/mas-servicios"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1E242B] group-hover:text-[#2E3742] transition-colors"
                  >
                    <span>Ver servicios profesionales</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. CALCULADORA DE MATERIALES & SIMULADOR EN VIVO (ESTILO GRIS OSCURO INSTITUCIONAL DE MÁXIMA LEGIBILIDAD) */}
      <section id="calculadora" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full scroll-mt-24">
        <div
          data-ui="true"
          className="rounded-3xl bg-[#1E242B] text-white p-6 sm:p-10 lg:p-14 relative overflow-hidden space-y-8"
        >
          {/* Cinta superior técnica */}
          <div data-ui="true" className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#2E3742]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[#1E242B] text-xs font-bold tracking-wide">
              <Calculator className="w-3.5 h-3.5 text-[#1E242B]" />
              <span>SIMULADOR TÉCNICO EN VIVO</span>
            </div>
            <span className="text-xs text-[#B3B6B9] font-medium">
              Parámetros de bobina: {calculator?.rollWidthMeters || 1.52} m ({calculator?.usableWidthMeters || 1.50} m útil)
            </span>
          </div>

          {/* Encabezado Monumental en Blanco Puro y Alto Contraste */}
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-[#B3B6B9] block">
              Herramienta oficial de precisión
            </span>
            <h2
              style={{ color: '#FFFFFF' }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black !text-white text-white tracking-[-0.035em] leading-[1.06] text-balance"
            >
              <TextReveal as="span" staggerMs={30}>
                Calculá la cantidad exacta de material para tu proyecto.
              </TextReveal>
            </h2>
            <p className="text-sm sm:text-base text-[#B3B6B9] leading-relaxed max-w-2xl font-normal">
              Seleccioná tu tipo de vehículo o ingresá las dimensiones de tus ventanales para obtener al instante la superficie neta en m², el consumo estimado de rollo de 1.52m y el porcentaje de merma técnica.
            </p>
          </div>

          {/* Selector de Ámbito / Categoría */}
          <div data-ui="true" className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setQuickCategory('automotriz')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
                quickCategory === 'automotriz'
                  ? 'bg-white text-[#1E242B]'
                  : 'bg-[#283039] hover:bg-[#323D48] text-[#B3B6B9] hover:text-white border border-[#3A4450]'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Vehículo Automotriz</span>
            </button>

            <button
              type="button"
              onClick={() => setQuickCategory('hogares')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
                quickCategory === 'hogares'
                  ? 'bg-white text-[#1E242B]'
                  : 'bg-[#283039] hover:bg-[#323D48] text-[#B3B6B9] hover:text-white border border-[#3A4450]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Residencial / Hogar</span>
            </button>

            <button
              type="button"
              onClick={() => setQuickCategory('comercios')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
                quickCategory === 'comercios'
                  ? 'bg-white text-[#1E242B]'
                  : 'bg-[#283039] hover:bg-[#323D48] text-[#B3B6B9] hover:text-white border border-[#3A4450]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Comercios & Vidrieras</span>
            </button>
          </div>

          {/* Grilla: Controles a la izquierda, Métricas y Acciones a la derecha */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Panel de Controles Interactivos en Tono Gris Intermedio */}
            <div data-ui="true" className="lg:col-span-7 p-6 rounded-2xl bg-[#283039] border border-[#3A4450] space-y-5 text-white">
              {quickCategory === 'automotriz' && (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-white block">
                    Seleccioná la tipología del vehículo:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setVehicleType('sedan')}
                      className={`p-3.5 rounded-xl text-left border transition-colors space-y-1.5 ${
                        vehicleType === 'sedan'
                          ? 'bg-white text-[#1E242B] border-white'
                          : 'bg-[#1E242B] border-[#3A4450] hover:bg-[#232A32] text-white'
                      }`}
                    >
                      <strong className={`block text-xs font-bold ${vehicleType === 'sedan' ? 'text-[#1E242B]' : 'text-white'}`}>
                        Sedán / Compacto
                      </strong>
                      <span className={`text-[11px] block leading-tight ${vehicleType === 'sedan' ? 'text-[#4A545E]' : 'text-[#B3B6B9]'}`}>
                        5 cristales: laterales y luneta trasera.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVehicleType('suv')}
                      className={`p-3.5 rounded-xl text-left border transition-colors space-y-1.5 ${
                        vehicleType === 'suv'
                          ? 'bg-white text-[#1E242B] border-white'
                          : 'bg-[#1E242B] border-[#3A4450] hover:bg-[#232A32] text-white'
                      }`}
                    >
                      <strong className={`block text-xs font-bold ${vehicleType === 'suv' ? 'text-[#1E242B]' : 'text-white'}`}>
                        SUV / Camioneta
                      </strong>
                      <span className={`text-[11px] block leading-tight ${vehicleType === 'suv' ? 'text-[#4A545E]' : 'text-[#B3B6B9]'}`}>
                        7 cristales con ventiletes y luneta térmica.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVehicleType('utilitario')}
                      className={`p-3.5 rounded-xl text-left border transition-colors space-y-1.5 ${
                        vehicleType === 'utilitario'
                          ? 'bg-white text-[#1E242B] border-white'
                          : 'bg-[#1E242B] border-[#3A4450] hover:bg-[#232A32] text-white'
                      }`}
                    >
                      <strong className={`block text-xs font-bold ${vehicleType === 'utilitario' ? 'text-[#1E242B]' : 'text-white'}`}>
                        Utilitario / Furgón
                      </strong>
                      <span className={`text-[11px] block leading-tight ${vehicleType === 'utilitario' ? 'text-[#4A545E]' : 'text-[#B3B6B9]'}`}>
                        3 cristales: cabina y luneta vidriada.
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {quickCategory === 'hogares' && (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-white block">
                    Dimensiones aproximadas de los ventanales:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-medium text-[#B3B6B9] mb-1">
                        Cantidad de Paños: <strong className="text-white font-bold">{windowCount}</strong>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={windowCount}
                        onChange={(e) => setWindowCount(parseInt(e.target.value, 10) || 1)}
                        className="w-full accent-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#B3B6B9] mb-1">
                        Ancho por Paño: <strong className="text-white font-bold">{windowWidth} m</strong>
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="3.0"
                        step="0.1"
                        value={windowWidth}
                        onChange={(e) => setWindowWidth(parseFloat(e.target.value) || 1.0)}
                        className="w-full accent-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#B3B6B9] mb-1">
                        Alto por Paño: <strong className="text-white font-bold">{windowHeight} m</strong>
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="3.0"
                        step="0.1"
                        value={windowHeight}
                        onChange={(e) => setWindowHeight(parseFloat(e.target.value) || 1.0)}
                        className="w-full accent-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {quickCategory === 'comercios' && (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-white block">
                    Dimensiones de vidrieras o frentes vidriados:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-medium text-[#B3B6B9] mb-1">
                        Cantidad de Vidrieras: <strong className="text-white font-bold">{commCount}</strong>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="8"
                        step="1"
                        value={commCount}
                        onChange={(e) => setCommCount(parseInt(e.target.value, 10) || 1)}
                        className="w-full accent-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#B3B6B9] mb-1">
                        Ancho de Vidriera: <strong className="text-white font-bold">{commWidth} m</strong>
                      </label>
                      <input
                        type="range"
                        min="1.0"
                        max="6.0"
                        step="0.2"
                        value={commWidth}
                        onChange={(e) => setCommWidth(parseFloat(e.target.value) || 2.0)}
                        className="w-full accent-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#B3B6B9] mb-1">
                        Alto de Vidriera: <strong className="text-white font-bold">{commHeight} m</strong>
                      </label>
                      <input
                        type="range"
                        min="1.5"
                        max="4.0"
                        step="0.1"
                        value={commHeight}
                        onChange={(e) => setCommHeight(parseFloat(e.target.value) || 2.0)}
                        className="w-full accent-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div data-ui="true" className="pt-2 border-t border-[#3A4450] flex items-center justify-between text-xs text-[#B3B6B9]">
                <span>Margen perimetral: +{calculator?.cuttingMarginCm || 2.5} cm / arista</span>
                <span>Ancho útil bobina: {calculator?.usableWidthMeters || 1.50} m</span>
              </div>
            </div>

            {/* Panel de Métricas y Llamados a la Acción */}
            <div data-ui="true" className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#15191E] border border-[#2E3742] text-white space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <span className="text-xs font-semibold text-[#B3B6B9] block">
                  Estimación técnica resultante
                </span>

                <div className="grid grid-cols-2 gap-4">
                  <div data-ui="true" className="p-3.5 rounded-xl bg-[#1E242B] border border-[#2E3742] space-y-1">
                    <span className="text-[11px] text-[#B3B6B9] block">Superficie Neta</span>
                    <strong className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight">
                      {currentNetM2} m²
                    </strong>
                  </div>

                  <div data-ui="true" className="p-3.5 rounded-xl bg-[#1E242B] border border-[#2E3742] space-y-1">
                    <span className="text-[11px] text-[#B3B6B9] block">Largo Estimado Rollo</span>
                    <strong className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight">
                      ~{currentLinearMeters} m
                    </strong>
                  </div>
                </div>

                <div data-ui="true" className="p-3 rounded-lg bg-[#1E242B] border border-[#2E3742] text-xs text-[#B3B6B9] space-y-1">
                  <div className="flex justify-between items-center text-white font-semibold">
                    <span>Merma técnica contemplada:</span>
                    <span>{currentMermaPercent}%</span>
                  </div>
                  <span className="text-[11px] text-[#B3B6B9] block leading-tight">
                    {currentMermaLabel}
                  </span>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="space-y-3 pt-2">
                <Link
                  href="/calculadora-materiales"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-neutral-100 text-[#1E242B] font-bold text-xs sm:text-sm transition-colors text-center"
                >
                  <Calculator className="w-4 h-4 text-[#1E242B]" />
                  <span>Abrir Calculadora Completa (Multi-Piezas)</span>
                  <ArrowRight className="w-4 h-4 text-[#1E242B]" />
                </Link>

                <a
                  href={getQuickWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#283039] hover:bg-[#323D48] text-white font-semibold text-xs transition-colors border border-[#3A4450] text-center"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" variant="color" />
                  <span>Consultar este Cálculo por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Nota técnica y disclaimer administrable */}
          <div data-ui="true" className="pt-4 border-t border-[#2E3742]">
            <p className="text-xs text-[#B3B6B9] leading-relaxed">
              {calculator?.disclaimer ||
                'Aviso técnico: Esta herramienta estima consumos físicos de película en función del ancho útil de corte y sobrante perimetral para manipulación. Las medidas finales deben ser ratificadas en relevamiento técnico de taller antes de su instalación definitiva.'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. TIPOS DE LÁMINAS Y TECNOLOGÍAS EN SUPERFICIES BLANCAS */}
      <section className="py-24 lg:py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <ScrollReveal blur={true} durationMs={950} className="space-y-4 mb-14">
          <span className="text-sm font-semibold text-[#1E242B] block">
            Catálogo tecnológico
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E242B] tracking-[-0.03em] leading-[1.08] text-balance">
            Tecnologías de láminas verificadas.
          </h2>
          <p className="text-[#4A545E] text-base sm:text-lg max-w-2xl leading-relaxed">
            Cada producto cuenta con especificaciones técnicas de transmisión de luz y rechazo calórico comprobadas en laboratorio.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ScrollReveal delayMs={50}>
            <div className="card-hover-effect p-7 sm:p-8 rounded-2xl bg-white flex flex-col justify-between space-y-5 h-full">
              <div>
                <span className="text-[#1E242B] text-xs font-semibold block mb-1">
                  Serie Nano Cerámica
                </span>
                <h3 className="text-lg font-bold text-[#1E242B]">Cerámica Térmica</h3>
                <p className="text-sm text-[#4A545E] mt-2.5 leading-relaxed">
                  La tecnología más avanzada para control de calor. Rechazo infrarrojo de hasta el 88% en tonalidades claras u oscuras.
                </p>
              </div>
              <div className="text-xs font-semibold text-[#1E242B] pt-3">
                TSER: hasta 68% · UV: 99%
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={120}>
            <div className="card-hover-effect p-7 sm:p-8 rounded-2xl bg-white flex flex-col justify-between space-y-5 h-full">
              <div>
                <span className="text-[#1E242B] text-xs font-semibold block mb-1">
                  Serie Carbón
                </span>
                <h3 className="text-lg font-bold text-[#1E242B]">Carbón Estable</h3>
                <p className="text-sm text-[#4A545E] mt-2.5 leading-relaxed">
                  Color negro grafito profundo que nunca vira a violeta. Cero reflejo metálico interno y excelente nitidez diurna y nocturna.
                </p>
              </div>
              <div className="text-xs font-semibold text-[#1E242B] pt-3">
                TSER: hasta 55% · UV: 99%
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={190}>
            <div className="card-hover-effect p-7 sm:p-8 rounded-2xl bg-white flex flex-col justify-between space-y-5 h-full">
              <div>
                <span className="text-[#1E242B] text-xs font-semibold block mb-1">
                  Serie Arquitectónica
                </span>
                <h3 className="text-lg font-bold text-[#1E242B]">Dual Reflectiva</h3>
                <p className="text-sm text-[#4A545E] mt-2.5 leading-relaxed">
                  Especial para fachadas expuestas al sol del oeste. Efecto espejo exterior con transparencia óptima desde el interior durante el día.
                </p>
              </div>
              <div className="text-xs font-semibold text-[#1E242B] pt-3">
                TSER: hasta 78% · UV: 99%
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={260}>
            <div className="card-hover-effect p-7 sm:p-8 rounded-2xl bg-white flex flex-col justify-between space-y-5 h-full">
              <div>
                <span className="text-[#1E242B] text-xs font-semibold block mb-1">
                  Serie Protección
                </span>
                <h3 className="text-lg font-bold text-[#1E242B]">Seguridad Anti-Impacto</h3>
                <p className="text-sm text-[#4A545E] mt-2.5 leading-relaxed">
                  Película de poliéster multicapa de alta densidad que mantiene el vidrio unido en caso de rotura violenta o accidentes.
                </p>
              </div>
              <div className="text-xs font-semibold text-[#1E242B] pt-3">
                Espesor: 4 a 8 milésimas
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>



      {/* 6. PROCESO DE INSTALACIÓN: Paso a paso con títulos claros y sin números decorativos */}
      <section className="py-24 lg:py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <ScrollReveal blur={true} durationMs={950} className="space-y-4 mb-14 text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold text-[#1E242B] block">
            Metodología de trabajo
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E242B] tracking-[-0.03em] leading-[1.08] text-balance">
            Proceso de colocación de alta precisión.
          </h2>
          <p className="text-[#4A545E] text-base sm:text-lg leading-relaxed">
            La durabilidad de una lámina solar depende en un 70% de la técnica de descontaminación del cristal y la precisión en el curado.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ScrollReveal delayMs={50}>
            <div className="card-hover-effect p-7 sm:p-8 rounded-2xl bg-white space-y-3 h-full">
              <span className="text-xs font-bold text-[#1E242B] block">Paso 1</span>
              <h3 className="text-lg font-bold text-[#1E242B]">Relevamiento Técnico</h3>
              <p className="text-sm text-[#4A545E] leading-relaxed">
                Medición milimétrica del vano de cristal, verificación de orientación solar y elección del film idóneo.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={130}>
            <div className="card-hover-effect p-7 sm:p-8 rounded-2xl bg-white space-y-3 h-full">
              <span className="text-xs font-bold text-[#1E242B] block">Paso 2</span>
              <h3 className="text-lg font-bold text-[#1E242B]">Descontaminación</h3>
              <p className="text-sm text-[#4A545E] leading-relaxed">
                Limpieza química profunda para remover grasa, siliconas o polvo microscópico en ambiente controlado.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={210}>
            <div className="card-hover-effect p-7 sm:p-8 rounded-2xl bg-white space-y-3 h-full">
              <span className="text-xs font-bold text-[#1E242B] block">Paso 3</span>
              <h3 className="text-lg font-bold text-[#1E242B]">Termoformado de Curva</h3>
              <p className="text-sm text-[#4A545E] leading-relaxed">
                Moldeado térmico para adaptar la lámina a la curvatura del vidrio y corte sin rozar las gomas de sellado.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={290}>
            <div className="card-hover-effect p-7 sm:p-8 rounded-2xl bg-white space-y-3 h-full">
              <span className="text-xs font-bold text-[#1E242B] block">Paso 4</span>
              <h3 className="text-lg font-bold text-[#1E242B]">Instalación y Curado</h3>
              <p className="text-sm text-[#4A545E] leading-relaxed">
                Extracción total del líquido de montaje con espátulas de poliuretano y control de secado óptico.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. PREGUNTAS FRECUENTES: Tabla arquitectónica abierta de 12 columnas */}
      <section className="py-24 lg:py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <ScrollReveal blur={true} durationMs={950} className="space-y-4 mb-16 max-w-3xl">
          <span className="text-sm font-semibold text-[#1E242B] block">
            Aclaraciones técnicas
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E242B] tracking-[-0.03em] leading-[1.08] text-balance">
            Preguntas frecuentes sobre control solar.
          </h2>
          <p className="text-[#4A545E] text-base sm:text-lg leading-relaxed">
            Detalles técnicos sobre tonalidades, mantenimiento y cuidados posteriores a la colocación.
          </p>
        </ScrollReveal>

        <div className="space-y-16">
          {faqItems.map((item, index) => (
            <ScrollReveal key={`faq-${item.id || index}-${index}`} delayMs={index * 50}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline">
                <div className="lg:col-span-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1E242B] leading-snug">
                    {item.question}
                  </h3>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-base text-[#4A545E] leading-relaxed font-normal">
                    {item.answer}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 8. UBICACIÓN Y CONTACTO LOCAL EN CATAMARCA: Espacio limpio y digno */}
      <section className="py-24 lg:py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <ScrollReveal direction="left" blur={true} durationMs={950} className="lg:col-span-7 space-y-6">
            <span className="text-sm font-semibold text-[#1E242B] block">
              Atención presencial en Catamarca
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E242B] tracking-[-0.03em] leading-[1.08] text-balance">
              <TextReveal as="span" staggerMs={30}>
                Visitanos en nuestro taller o consultanos por WhatsApp.
              </TextReveal>
            </h2>
            <p className="text-[#4A545E] text-base sm:text-lg leading-relaxed">
              Atendemos consultas particulares y coordinamos visitas de relevamiento en obra para proyectos comerciales y arquitectónicos en toda la provincia.
            </p>

            <div className="space-y-4 pt-4">
              <div className="p-6 rounded-2xl bg-white space-y-1">
                <span className="text-xs font-semibold text-[#1E242B] block">Taller de Instalaciones</span>
                <LocationLink className="text-base text-[#1E242B] font-bold group">
                  <VisualEditableText contentKey="address" label="Dirección del Taller">
                    {texts.address || 'Padre Zanello 341, San Fernando del Valle de Catamarca, Argentina.'}
                  </VisualEditableText>
                </LocationLink>
              </div>

              <div className="p-6 rounded-2xl bg-white space-y-1">
                <span className="text-xs font-semibold text-[#1E242B] block">Canal Directo de WhatsApp</span>
                <VisualEditableText
                  contentKey="phone"
                  label="Teléfono WhatsApp"
                  className="text-base text-[#1E242B] font-bold hover:underline tabular-nums"
                >
                  {texts.phone || '+54 9 383 427-2000'}
                </VisualEditableText>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/5493834272000?text=Hola%20Luminadia,%20deseo%20consultar%20sobre%20l%C3%A1minas%20de%20control%20solar."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#1E242B] hover:bg-[#283039] text-white font-bold text-base transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" variant="color" />
                <span>Conversar por WhatsApp</span>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delayMs={150} className="lg:col-span-5 space-y-6">
            <div className="card-hover-effect p-8 sm:p-10 rounded-3xl bg-white space-y-6">
              <h3 className="text-2xl font-bold text-[#1E242B]">Horarios de Taller</h3>
              <div className="space-y-4 text-sm text-[#4A545E]">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#1E242B] shrink-0" />
                  <span>Lunes a Viernes: 08:30 a 13:00 y 16:30 a 20:30 hs.</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#1E242B] shrink-0" />
                  <span>Sábados: 09:00 a 13:00 hs.</span>
                </div>
              </div>
              <p className="text-xs text-[#6C7680] leading-relaxed pt-4">
                Para colocaciones en vehículos se recomienda coordinar turno con antelación. En obras residenciales o locales comerciales, un especialista realiza el relevamiento con muestrarios físicos de las películas.
              </p>
            </div>

            {/* Mapa interactivo de Google Maps */}
            <LocationMap variant="card" height="h-56 sm:h-64" />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
