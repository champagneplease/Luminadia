'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Plus,
  Trash2,
  Car,
  Home,
  Building2,
  ShieldAlert,
  Share2,
  Check,
  Send,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Info,
  ExternalLink,
} from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import {
  ProjectCategory,
  MeasurementUnit,
  SurfacePieceInput,
  VehicleType,
  AutomotiveGlassZone,
  FilmProduct,
  calculateMaterialEstimation,
  generateWhatsAppConsultationUrl,
  AUTOMOTIVE_PRESET_TEMPLATES,
  STANDARD_ROLL_WIDTH_METERS,
  RollEstimationResult,
} from '@/shared';
import { useSiteConfig } from '@/context/SiteConfigContext';
import TextReveal from '@/components/TextReveal';

// Catálogo de láminas verídicas de Luminadia
const MOCK_PRODUCTS: FilmProduct[] = [
  {
    id: 'prod-nano-70',
    name: 'Nano Cerámica Térmica 70 (Clara)',
    slug: 'nano-ceramica-70',
    description: 'Máximo rechazo térmico con alta transmisión de luz. Ideal para parabrisas y vidrieras comerciales.',
    category: ['automotriz', 'hogares', 'comercios-empresas'],
    rollWidthMeters: 1.52,
    usableWidthMeters: 1.50,
    standardRollLengthMeters: 30,
    vltPercent: 70,
    uvRejectionPercent: 99,
    irRejectionPercent: 88,
    colorShade: 'Tono claro imperceptible',
    technology: 'Nano Cerámica de Titanio',
    warrantyYears: 10,
    active: true,
  },
  {
    id: 'prod-nano-20',
    name: 'Nano Cerámica Carbón 20 (Intermedia)',
    slug: 'nano-ceramica-carbon-20',
    description: 'Equilibrio perfecto entre privacidad, reducción de resplandor y confort térmico superior.',
    category: ['automotriz', 'hogares', 'comercios-empresas'],
    rollWidthMeters: 1.52,
    usableWidthMeters: 1.50,
    standardRollLengthMeters: 30,
    vltPercent: 20,
    uvRejectionPercent: 99,
    irRejectionPercent: 82,
    colorShade: 'Negro grafito intermedio',
    technology: 'Nano Cerámica / Carbón',
    warrantyYears: 10,
    active: true,
  },
  {
    id: 'prod-nano-05',
    name: 'Nano Cerámica Carbón 05 (Oscura / Privacidad)',
    slug: 'nano-ceramica-carbon-05',
    description: 'Máxima privacidad exterior y rechazo solar para ventanales expuestos y laterales vehiculares.',
    category: ['automotriz', 'hogares', 'comercios-empresas'],
    rollWidthMeters: 1.52,
    usableWidthMeters: 1.50,
    standardRollLengthMeters: 30,
    vltPercent: 5,
    uvRejectionPercent: 99,
    irRejectionPercent: 85,
    colorShade: 'Negro grafito profundo',
    technology: 'Carbón Estable',
    warrantyYears: 10,
    active: true,
  },
  {
    id: 'prod-arq-espejada',
    name: 'Arquitectónica Dual Reflectiva (Plata / Humo)',
    slug: 'arquitectonica-dual-reflectiva',
    description: 'Especial para control térmico exterior en fachadas comerciales y ventanales residenciales oeste.',
    category: ['hogares', 'comercios-empresas'],
    rollWidthMeters: 1.52,
    usableWidthMeters: 1.50,
    standardRollLengthMeters: 30,
    vltPercent: 15,
    uvRejectionPercent: 99,
    irRejectionPercent: 78,
    colorShade: 'Espejado exterior / Neutro interior',
    technology: 'Metalizada pulverizada',
    warrantyYears: 7,
    active: true,
  },
  {
    id: 'prod-seguridad-4mil',
    name: 'Seguridad Antivandálica 4 Milésimas',
    slug: 'seguridad-antivandalica-4mil',
    description: 'Lámina transparente de protección que retiene fragmentos de vidrio ante roturas o impactos.',
    category: ['automotriz', 'comercios-empresas'],
    rollWidthMeters: 1.52,
    usableWidthMeters: 1.50,
    standardRollLengthMeters: 30,
    vltPercent: 88,
    uvRejectionPercent: 99,
    irRejectionPercent: 35,
    colorShade: 'Transparente cristal',
    technology: 'Poliéster Multicapa Ultra Resistente',
    warrantyYears: 5,
    active: true,
  },
];

export default function MaterialCalculatorPage() {
  const { calculator, texts } = useSiteConfig();

  // Paso 1: Categoría de proyecto
  const [category, setCategory] = useState<ProjectCategory>('hogares');

  // Paso 2: Selección de producto
  const availableProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => p.category.includes(category));
  }, [category]);

  const [selectedProductId, setSelectedProductId] = useState<string>(
    availableProducts[0]?.id || MOCK_PRODUCTS[0].id
  );

  // Paso 3: Piezas para Hogares y Comercios
  const [pieces, setPieces] = useState<SurfacePieceInput[]>([
    { id: '1', label: 'Ventanale principal', width: 150, height: 180, unit: 'cm', quantity: 1 },
    { id: '2', label: 'Ventana lateral', width: 120, height: 100, unit: 'cm', quantity: 2 },
  ]);

  // Parámetros para Automotriz
  const [vehicleType, setVehicleType] = useState<VehicleType>('sedan');
  const [selectedAutomotiveZones, setSelectedAutomotiveZones] = useState<AutomotiveGlassZone[]>([
    'parabrisas',
    'laterales_delanteros',
    'laterales_traseros',
    'luneta',
  ]);
  const [customVehicleMake, setCustomVehicleMake] = useState('');
  const [customVehicleModel, setCustomVehicleModel] = useState('');

  // Parámetros técnicos de corte configurables alimentados dinámicamente por el Administrador
  const [cuttingMarginCm, setCuttingMarginCm] = useState(2.5);
  const [safetyWastePercent, setSafetyWastePercent] = useState(10);

  // Sincronizar dinámicamente cuando el administrador modifica parámetros o cambia categoría
  useEffect(() => {
    if (calculator) {
      setCuttingMarginCm(calculator.cuttingMarginCm ?? 2.5);
      if (category === 'automotriz') {
        setSafetyWastePercent(calculator.automotiveSafetyMarginPercent ?? 15);
      } else if (category === 'comercios-empresas') {
        setSafetyWastePercent(calculator.commercialSafetyMarginPercent ?? 12);
      } else {
        setSafetyWastePercent(calculator.residentialSafetyMarginPercent ?? 10);
      }
    }
  }, [category, calculator]);

  // Formulario de consulta a Luminadia
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    phone?: string;
    notes?: string;
  }>({});
  const [waSentUrl, setWaSentUrl] = useState<string | null>(null);
  const [savedSuccessMessage, setSavedSuccessMessage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Cambiar categoría resetea el producto si no es compatible
  const handleCategoryChange = (newCat: ProjectCategory) => {
    setCategory(newCat);
    const compatible = MOCK_PRODUCTS.filter((p) => p.category.includes(newCat));
    if (compatible.length > 0 && !compatible.some((p) => p.id === selectedProductId)) {
      setSelectedProductId(compatible[0].id);
    }
  };

  // Manejo de filas de piezas rectangulares
  const addPieceRow = () => {
    setPieces([
      ...pieces,
      {
        id: Math.random().toString(36).substring(2, 9),
        label: `Superficie #${pieces.length + 1}`,
        width: 100,
        height: 100,
        unit: 'cm',
        quantity: 1,
      },
    ]);
  };

  const removePieceRow = (id: string) => {
    if (pieces.length <= 1) return;
    setPieces(pieces.filter((p) => p.id !== id));
  };

  const updatePieceRow = (
    id: string,
    field: keyof SurfacePieceInput,
    value: string | number
  ) => {
    setPieces(
      pieces.map((p) => {
        if (p.id !== id) return p;
        return {
          ...p,
          [field]: value,
        };
      })
    );
  };

  // Toggle zona de cristales de vehículo
  const toggleAutomotiveZone = (zone: AutomotiveGlassZone) => {
    if (selectedAutomotiveZones.includes(zone)) {
      if (selectedAutomotiveZones.length === 1) return; // al menos 1
      setSelectedAutomotiveZones(selectedAutomotiveZones.filter((z) => z !== zone));
    } else {
      setSelectedAutomotiveZones([...selectedAutomotiveZones, zone]);
    }
  };

  // Generar lista de piezas según categoría
  const effectivePieces: SurfacePieceInput[] = useMemo(() => {
    if (category !== 'automotriz') {
      return pieces;
    }

    const template = AUTOMOTIVE_PRESET_TEMPLATES[vehicleType];
    if (!template) return [];

    return template.typicalGlasses
      .filter((g) => selectedAutomotiveZones.includes(g.zone))
      .map((g, idx) => ({
        id: `auto-${idx}-${g.zone}`,
        label: g.label,
        width: g.approxWidthCm,
        height: g.approxHeightCm,
        unit: 'cm' as MeasurementUnit,
        quantity: g.quantity,
      }));
  }, [category, pieces, vehicleType, selectedAutomotiveZones]);

  // Producto seleccionado
  const selectedProduct = useMemo(() => {
    return MOCK_PRODUCTS.find((p) => p.id === selectedProductId) || MOCK_PRODUCTS[0];
  }, [selectedProductId]);

  // Ejecución del cálculo en tiempo real
  const calculationResult: { result: RollEstimationResult | null; error: string | null } =
    useMemo(() => {
      try {
        if (effectivePieces.length === 0) {
          return { result: null, error: 'Seleccioná al menos un cristal o ingresá una superficie.' };
        }

        const res = calculateMaterialEstimation({
          category,
          productId: selectedProduct.name,
          rollWidthMeters: calculator.rollWidthMeters || selectedProduct.rollWidthMeters,
          usableWidthMeters: calculator.usableWidthMeters || selectedProduct.usableWidthMeters,
          pieces: effectivePieces,
          cuttingMarginCm,
          safetyWastePercent,
          allowPieceRotation: true,
          automotiveData:
            category === 'automotriz'
              ? {
                  vehicleType,
                  make: customVehicleMake,
                  model: customVehicleModel,
                  selectedZones: selectedAutomotiveZones,
                  hasCurvedGlass: selectedAutomotiveZones.includes('luneta') || selectedAutomotiveZones.includes('parabrisas'),
                  needsProfessionalReview: true,
                }
              : undefined,
        });

        return { result: res, error: null };
      } catch (err: any) {
        return { result: null, error: err.message || 'Error al calcular medidas.' };
      }
    }, [
      category,
      selectedProduct,
      effectivePieces,
      cuttingMarginCm,
      safetyWastePercent,
      vehicleType,
      customVehicleMake,
      customVehicleModel,
      selectedAutomotiveZones,
    ]);

  // Generar URL de WhatsApp oficial dinámico
  const whatsAppUrl = useMemo(() => {
    if (!calculationResult.result) return '';
    const cleanPhone = clientPhone.replace(/\D/g, '');
    const combinedNotes = [
      category === 'automotriz' && (customVehicleMake || customVehicleModel)
        ? `Vehículo: ${customVehicleMake.trim()} ${customVehicleModel.trim()} (${vehicleType})`
        : null,
      clientNotes.trim() || null,
    ].filter(Boolean).join(' · ');

    return generateWhatsAppConsultationUrl(
      calculationResult.result,
      clientName.trim() || undefined,
      combinedNotes || undefined,
      cleanPhone || undefined
    );
  }, [calculationResult.result, clientName, clientPhone, clientNotes, category, customVehicleMake, customVehicleModel, vehicleType]);

  // Copiar resumen al portapapeles
  const handleCopySummary = () => {
    if (!calculationResult.result) return;
    const r = calculationResult.result;
    const summaryText = `RESUMEN DE ESTIMACIÓN · LUMINADIA (Catamarca)
Categoría: ${r.category}
Producto: ${r.productName}
Superficie Neta: ${r.netSurfaceAreaM2} m²
Piezas totales: ${r.piecesCount}
Ancho de bobina: ${r.rollWidthMeters} m
Largo de rollo estimado: ~${r.estimatedLinearMetersNeeded} m lineales (${r.totalRollAreaConsumedM2} m² de lámina)
Rendimiento aproximado: ${r.yieldEfficiencyPercentage}% (merma técnica ~${r.estimatedWastePercentage}%)
Nota: Estimación técnica de insumos sin importes monetarios.`;

    navigator.clipboard.writeText(summaryText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Enviar consulta técnica directamente al WhatsApp del encargado
  const handleSendWhatsAppConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calculationResult.result) return;

    const newErrors: typeof formErrors = {};
    const trimmedName = clientName.trim();
    if (!trimmedName) {
      newErrors.name = 'El nombre o empresa es obligatorio (hasta 30 caracteres).';
    } else if (trimmedName.length > 30) {
      newErrors.name = 'El nombre no puede superar los 30 caracteres.';
    }

    const cleanPhone = clientPhone.replace(/\D/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'El teléfono celular es obligatorio.';
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = 'Ingresá 10 dígitos: código de área (característica) + número restante, sin 0 ni 15.';
    }

    const trimmedNotes = clientNotes.trim();
    if (trimmedNotes.length > 250) {
      newErrors.notes = 'Las observaciones no pueden superar los 250 caracteres.';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    setFormErrors({});

    const combinedNotes = [
      category === 'automotriz' && (customVehicleMake || customVehicleModel)
        ? `Vehículo: ${customVehicleMake.trim()} ${customVehicleModel.trim()} (${vehicleType})`
        : null,
      trimmedNotes || null,
    ].filter(Boolean).join(' · ');

    const targetUrl = generateWhatsAppConsultationUrl(
      calculationResult.result,
      trimmedName,
      combinedNotes || undefined,
      cleanPhone
    );

    setWaSentUrl(targetUrl);

    // Respaldo silencioso en segundo plano
    const payload = {
      category,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      contactName: trimmedName,
      contactPhone: cleanPhone,
      vehicleDetails: category === 'automotriz' ? `${customVehicleMake} ${customVehicleModel} (${vehicleType})` : undefined,
      notes: combinedNotes,
      calculationSummary: calculationResult.result,
    };
    fetch('http://localhost:3001/api/v1/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => null);

    if (typeof window !== 'undefined') {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }

    setSavedSuccessMessage('¡Estimación enviada al WhatsApp del encargado! Si tu navegador bloqueó la ventana emergente, hacé clic en el botón verde.');
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-white text-[#1E242B] min-h-[100dvh] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado editorial de la calculadora */}
        <div className="max-w-3xl space-y-4 mb-12">
          <p className="animate-hero-location text-xs font-bold text-[#1E242B]/70 tracking-normal flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#1E242B]" />
            <span>Herramienta de Cómputo Métrico</span>
          </p>
          <TextReveal
            as="h1"
            text="Calculadora de materiales para control solar."
            className="animate-hero-title text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.035em] text-[#1E242B] leading-[1.04] text-balance"
          />
          <p className="animate-hero-subtitle text-base sm:text-lg text-[#4A545E] leading-relaxed max-w-2xl text-balance">
            Ingresá las medidas de tus superficies para estimar la superficie neta a cubrir y la cantidad de metros lineales de bobina necesarios.
          </p>
          <div className="p-4 rounded-2xl bg-white text-xs text-[#4A545E] flex items-start gap-3">
            <Info className="w-4 h-4 text-[#1E242B] shrink-0 mt-0.5" />
            <span>
              <strong>Aviso de transparencia:</strong> Esta herramienta calcula insumos físicos de lámina y mermas de corte. No genera cotizaciones comerciales, aranceles de mano de obra ni importes monetarios.
            </span>
          </div>
        </div>

        {/* Layout de 2 columnas: Formulario de cálculo a la izquierda, Resumen técnico a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* COLUMNA IZQUIERDA: PASOS 1, 2, 3 */}
          <div className="lg:col-span-7 space-y-8">
            {/* PASO 1: SELECCIÓN DE CATEGORÍA */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1E242B]">
                  Paso 01
                </span>
                <span className="text-xs text-[#4A545E]">Tipo de proyecto</span>
              </div>
              <h2 className="text-xl font-bold text-[#1E242B]">¿Dónde aplicarás el control solar?</h2>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleCategoryChange('automotriz')}
                  className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition-[background-color,color] ${
                    category === 'automotriz'
                      ? 'bg-[#1E242B] text-white font-bold'
                      : 'bg-[#F8F9FA] text-[#4A545E] hover:text-[#1E242B] hover:bg-[#F1F3F5]'
                  }`}
                >
                  <Car className="w-6 h-6" />
                  <span className="text-sm">Automotriz</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCategoryChange('hogares')}
                  className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition-[background-color,color] ${
                    category === 'hogares'
                      ? 'bg-[#1E242B] text-white font-bold'
                      : 'bg-[#F8F9FA] text-[#4A545E] hover:text-[#1E242B] hover:bg-[#F1F3F5]'
                  }`}
                >
                  <Home className="w-6 h-6" />
                  <span className="text-sm">Hogares</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCategoryChange('comercios-empresas')}
                  className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition-[background-color,color] ${
                    category === 'comercios-empresas'
                      ? 'bg-[#1E242B] text-white font-bold'
                      : 'bg-[#F8F9FA] text-[#4A545E] hover:text-[#1E242B] hover:bg-[#F1F3F5]'
                  }`}
                >
                  <Building2 className="w-6 h-6" />
                  <span className="text-sm">Comercios</span>
                </button>
              </div>
            </div>

            {/* PASO 2: SELECCIÓN DEL MATERIAL DEL CATÁLOGO REAL */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1E242B]">
                  Paso 02
                </span>
                <span className="text-xs text-[#4A545E]">Lámina y características</span>
              </div>
              <h2 className="text-xl font-bold text-[#1E242B]">Elegí el producto del catálogo</h2>

              <div className="space-y-3">
                {availableProducts.map((prod, idx) => {
                  const isSelected = prod.id === selectedProductId;
                  return (
                    <label
                      key={`prod-${prod.id}-${idx}`}
                      className={`block p-4 sm:p-5 rounded-2xl cursor-pointer transition-[background-color,color] ${
                        isSelected
                          ? 'bg-[#F8F9FA] ring-2 ring-[#1E242B]'
                          : 'bg-[#F8F9FA]/60 hover:bg-[#F8F9FA]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="film-product"
                          value={prod.id}
                          checked={isSelected}
                          onChange={() => setSelectedProductId(prod.id)}
                          className="mt-1 w-4 h-4 text-[#1E242B] accent-[#1E242B] focus:ring-[#1E242B]"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-base font-bold text-[#1E242B]">{prod.name}</span>
                            <span className="text-xs tabular-nums font-semibold px-2.5 py-1 rounded-md bg-white text-[#1E242B]">
                              Bobina {prod.rollWidthMeters} m
                            </span>
                          </div>
                          <p className="text-xs text-[#4A545E] leading-relaxed">
                            {prod.description}
                          </p>
                          <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-[#6C7680] tabular-nums">
                            <span>VLT: {prod.vltPercent}%</span>
                            <span>•</span>
                            <span>Rechazo IR: {prod.irRejectionPercent}%</span>
                            <span>•</span>
                            <span>Filtro UV: {prod.uvRejectionPercent}%</span>
                          </div>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* PASO 3: INGRESO DE MEDIDAS O SELECCIÓN DE CRISTALES */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1E242B]">
                  Paso 03
                </span>
                <span className="text-xs text-[#4A545E]">
                  {category === 'automotriz' ? 'Cristales vehiculares' : 'Dimensiones de aberturas'}
                </span>
              </div>

              {category === 'automotriz' ? (
                /* Configuración vehicular */
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-[#1E242B]">Detalles del vehículo</h2>

                  {/* Silueta / Tipo de vehículo */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {(['sedan', 'hatchback', 'suv', 'pickup'] as VehicleType[]).map((type) => {
                      const isSel = vehicleType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setVehicleType(type)}
                          className={`py-3 px-2 rounded-xl text-xs font-bold transition-colors ${
                            isSel
                              ? 'bg-[#1E242B] text-white'
                              : 'bg-[#F8F9FA] text-[#4A545E] hover:text-[#1E242B] hover:bg-[#F1F3F5]'
                          }`}
                        >
                          {AUTOMOTIVE_PRESET_TEMPLATES[type]?.label || type}
                        </button>
                      );
                    })}
                  </div>

                  {/* Campos opcionales de marca y modelo */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="make-input" className="block text-xs font-medium text-[#4A545E]">
                          Marca del auto (opcional)
                        </label>
                        <span className="text-[11px] text-[#6C7680] tabular-nums font-medium">
                          {30 - customVehicleMake.length} restantes
                        </span>
                      </div>
                      <input
                        id="make-input"
                        type="text"
                        maxLength={30}
                        value={customVehicleMake}
                        onChange={(e) => setCustomVehicleMake(e.target.value.slice(0, 30))}
                        placeholder="Ej. Toyota, Volkswagen, Fiat..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] text-[#1E242B] text-sm focus:outline-none focus:ring-1 focus:ring-[#1E242B]"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="model-input" className="block text-xs font-medium text-[#4A545E]">
                          Modelo y año (opcional)
                        </label>
                        <span className="text-[11px] text-[#6C7680] tabular-nums font-medium">
                          {30 - customVehicleModel.length} restantes
                        </span>
                      </div>
                      <input
                        id="model-input"
                        type="text"
                        maxLength={30}
                        value={customVehicleModel}
                        onChange={(e) => setCustomVehicleModel(e.target.value.slice(0, 30))}
                        placeholder="Ej. Corolla 2023, Hilux..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] text-[#1E242B] text-sm focus:outline-none focus:ring-1 focus:ring-[#1E242B]"
                      />
                    </div>
                  </div>

                  {/* Zonas de cristales a polarizar */}
                  <div className="pt-2 space-y-2">
                    <label className="block text-xs font-bold text-[#1E242B]">
                      Cristales a cubrir:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { zone: 'parabrisas', label: 'Parabrisas delantero (termoformado)' },
                        { zone: 'laterales_delanteros', label: 'Laterales delanteros (conductor / acompañante)' },
                        { zone: 'laterales_traseros', label: 'Laterales traseros' },
                        { zone: 'luneta', label: 'Luneta trasera (con desempañador)' },
                        { zone: 'deflectores_ventiletes', label: 'Ventiletes / deflectores fijos' },
                      ].map(({ zone, label }) => {
                        const isChecked = selectedAutomotiveZones.includes(zone as AutomotiveGlassZone);
                        return (
                          <label
                            key={zone}
                            className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer text-xs font-medium transition-colors ${
                              isChecked
                                ? 'bg-[#F8F9FA] text-[#1E242B] font-semibold ring-1 ring-[#1E242B]'
                                : 'bg-[#F8F9FA]/60 text-[#4A545E] hover:bg-[#F8F9FA]'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleAutomotiveZone(zone as AutomotiveGlassZone)}
                              className="w-4 h-4 text-[#1E242B] accent-[#1E242B] rounded focus:ring-0"
                            />
                            <span>{label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                /* Ingreso de superficies para Hogares y Comercios */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#1E242B]">Medidas de las superficies</h2>
                    <button
                      type="button"
                      onClick={addPieceRow}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F9FA] hover:bg-[#F1F3F5] text-xs font-semibold text-[#1E242B] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar paño</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {pieces.map((piece, index) => (
                      <div
                        key={`piece-${piece.id || index}-${index}`}
                        className="p-4 rounded-2xl bg-[#F8F9FA] space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3"
                      >
                        {/* Etiqueta / Nombre */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <label
                              htmlFor={`label-${piece.id}`}
                              className="block text-xs font-semibold text-[#4A545E]"
                            >
                              Ubicación #{index + 1}
                            </label>
                            <span className="text-[10px] text-[#6C7680] tabular-nums font-medium">
                              {30 - (piece.label?.length || 0)} restantes
                            </span>
                          </div>
                          <input
                            id={`label-${piece.id}`}
                            type="text"
                            maxLength={30}
                            value={piece.label || ''}
                            onChange={(e) => updatePieceRow(piece.id, 'label', e.target.value.slice(0, 30))}
                            className="w-full px-3 py-2 rounded-xl bg-white text-sm text-[#1E242B] focus:outline-none focus:ring-1 focus:ring-[#1E242B]"
                            placeholder="Ej. Living, Balcón..."
                          />
                        </div>

                        {/* Ancho */}
                        <div className="w-full sm:w-28">
                          <label
                            htmlFor={`width-${piece.id}`}
                            className="block text-xs font-semibold text-[#4A545E] mb-1"
                          >
                            Ancho ({piece.unit})
                          </label>
                          <input
                            id={`width-${piece.id}`}
                            type="number"
                            min="1"
                            max="2500"
                            value={piece.width}
                            onChange={(e) =>
                              updatePieceRow(piece.id, 'width', parseFloat(e.target.value) || 0)
                            }
                            className="w-full px-3 py-2 rounded-xl bg-white text-sm text-[#1E242B] tabular-nums focus:outline-none focus:ring-1 focus:ring-[#1E242B]"
                          />
                        </div>

                        {/* Alto */}
                        <div className="w-full sm:w-28">
                          <label
                            htmlFor={`height-${piece.id}`}
                            className="block text-xs font-semibold text-[#4A545E] mb-1"
                          >
                            Alto ({piece.unit})
                          </label>
                          <input
                            id={`height-${piece.id}`}
                            type="number"
                            min="1"
                            max="2500"
                            value={piece.height}
                            onChange={(e) =>
                              updatePieceRow(piece.id, 'height', parseFloat(e.target.value) || 0)
                            }
                            className="w-full px-3 py-2 rounded-xl bg-white text-sm text-[#1E242B] tabular-nums focus:outline-none focus:ring-1 focus:ring-[#1E242B]"
                          />
                        </div>

                        {/* Cantidad */}
                        <div className="w-full sm:w-20">
                          <label
                            htmlFor={`qty-${piece.id}`}
                            className="block text-xs font-semibold text-[#4A545E] mb-1"
                          >
                            Cant.
                          </label>
                          <input
                            id={`qty-${piece.id}`}
                            type="number"
                            min="1"
                            max="100"
                            value={piece.quantity}
                            onChange={(e) =>
                              updatePieceRow(piece.id, 'quantity', parseInt(e.target.value, 10) || 1)
                            }
                            className="w-full px-3 py-2 rounded-xl bg-white text-sm text-[#1E242B] tabular-nums focus:outline-none focus:ring-1 focus:ring-[#1E242B]"
                          />
                        </div>

                        {/* Botón eliminar */}
                        <div className="sm:pt-5">
                          <button
                            type="button"
                            onClick={() => removePieceRow(piece.id)}
                            disabled={pieces.length <= 1}
                            className="p-2 rounded-lg text-[#6C7680] hover:text-red-600 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            aria-label={`Eliminar fila ${index + 1}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ajustes técnicos de instalación */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label htmlFor="cutting-margin" className="block text-[#4A545E] mb-1">
                    Margen de recorte perimetral: <span className="text-[#1E242B] tabular-nums font-bold">{cuttingMarginCm} cm</span>
                  </label>
                  <input
                    id="cutting-margin"
                    type="range"
                    min="1"
                    max="5"
                    step="0.5"
                    value={cuttingMarginCm}
                    onChange={(e) => setCuttingMarginCm(parseFloat(e.target.value))}
                    className="w-full accent-[#1E242B]"
                  />
                  <span className="text-[10px] text-[#6C7680]">
                    Sobrante para ajuste manual con cutter en obra.
                  </span>
                </div>

                <div>
                  <label htmlFor="safety-waste" className="block text-[#4A545E] mb-1">
                    Merma técnica estimada: <span className="text-[#1E242B] tabular-nums font-bold">{safetyWastePercent}%</span>
                  </label>
                  <input
                    id="safety-waste"
                    type="range"
                    min="5"
                    max="25"
                    step="1"
                    value={safetyWastePercent}
                    onChange={(e) => setSafetyWastePercent(parseInt(e.target.value, 10))}
                    className="w-full accent-[#1E242B]"
                  />
                  <span className="text-[10px] text-[#6C7680]">
                    Factor de desperdicio por corte y acomodamiento en bobina.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: RESULTADOS (PASOS 4, 5, 6, 7) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {calculationResult.error ? (
              <div className="p-6 rounded-3xl bg-red-50 text-red-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-red-700">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Atención en las medidas</span>
                </div>
                <p className="text-sm">{calculationResult.error}</p>
              </div>
            ) : calculationResult.result ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-white space-y-6">
                {/* Cabecera del cálculo */}
                <div className="pb-2">
                  <span className="text-xs font-bold text-[#1E242B] block mb-1">
                    Estimación de Insumos
                  </span>
                  <h3 className="text-2xl font-black tracking-tight text-[#1E242B]">
                    {calculationResult.result.productName}
                  </h3>
                  <p className="text-xs text-[#4A545E] mt-1">
                    Ancho de rollo: <strong className="text-[#1E242B] tabular-nums">{calculationResult.result.rollWidthMeters} m</strong> (útil: <span className="tabular-nums">{calculationResult.result.usableWidthMeters} m</span>)
                  </p>
                </div>

                {/* Métricas principales comparativas */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Superficie Neta */}
                  <div className="p-4 rounded-2xl bg-[#F8F9FA]">
                    <span className="text-xs text-[#4A545E] block mb-1">Superficie neta de cristal</span>
                    <div className="text-2xl sm:text-3xl font-black text-[#1E242B] tabular-nums">
                      {calculationResult.result.netSurfaceAreaM2} <span className="text-sm font-normal text-[#4A545E]">m²</span>
                    </div>
                    <span className="text-[11px] text-[#6C7680] mt-1 block">
                      {calculationResult.result.piecesCount} {calculationResult.result.piecesCount === 1 ? 'paño' : 'paños'} en total
                    </span>
                  </div>

                  {/* Metros lineales de rollo a retirar */}
                  <div className="p-4 rounded-2xl bg-[#1E242B] text-white">
                    <span className="text-xs text-[#B3B6B9] block mb-1">Largo de rollo a retirar</span>
                    <div className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                      ~{calculationResult.result.estimatedLinearMetersNeeded} <span className="text-sm font-normal text-[#B3B6B9]">m</span>
                    </div>
                    <span className="text-[11px] text-[#B3B6B9] mt-1 block">
                      Bobina de {calculationResult.result.rollWidthMeters} m
                    </span>
                  </div>
                </div>

                {/* Desglose de rendimiento */}
                <div className="p-4 rounded-2xl bg-[#F8F9FA] space-y-2 text-xs">
                  <div className="flex justify-between text-[#4A545E]">
                    <span>Área total de rollo consumido:</span>
                    <strong className="text-[#1E242B] tabular-nums">
                      {calculationResult.result.totalRollAreaConsumedM2} m²
                    </strong>
                  </div>
                  <div className="flex justify-between text-[#4A545E]">
                    <span>Aprovechamiento teórico de bobina:</span>
                    <strong className="text-[#1E242B] font-bold tabular-nums">
                      {calculationResult.result.yieldEfficiencyPercentage}%
                    </strong>
                  </div>
                  <div className="flex justify-between text-[#4A545E]">
                    <span>Merma técnica y márgenes de corte:</span>
                    <strong className="text-[#1E242B] tabular-nums">
                      ~{calculationResult.result.estimatedWastePercentage}% ({calculationResult.result.estimatedScrapAreaM2} m²)
                    </strong>
                  </div>
                </div>

                {/* Supuestos y Limitaciones Técnicas */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-[#1E242B] block">
                    Supuestos del cálculo:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#4A545E]">
                    {calculationResult.result.assumptions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#1E242B]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {calculator.disclaimer && (
                    <div data-ui="true" className="p-3 rounded-xl bg-white border border-[#B3B6B9] text-[11px] text-[#4A545E] italic">
                      {calculator.disclaimer}
                    </div>
                  )}
                </div>

                {/* PASO 7: CONSULTA Y ENVÍO A LUMINADIA */}
                <div className="pt-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1E242B] block">
                      Paso 07: Enviar Estimación por WhatsApp
                    </span>
                    <span className="text-[11px] text-[#6C7680] font-medium">
                      Atención técnica directa
                    </span>
                  </div>

                  <p className="text-xs text-[#4A545E] leading-relaxed">
                    Completá tus datos para enviar esta estimación técnica directamente al WhatsApp oficial del encargado de Luminadia (+54 9 383 427-2000).
                  </p>

                  <form onSubmit={handleSendWhatsAppConsultation} noValidate className="space-y-3.5">
                    {/* Campo Nombre completo (Obligatorio, máx 30 caracteres) */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="client-name" className="block text-xs font-medium text-[#1E242B]">
                          Nombre completo o Empresa *
                        </label>
                        <span className={`text-[11px] tabular-nums font-medium ${30 - clientName.length === 0 ? 'text-amber-600 font-bold' : 'text-[#6C7680]'}`}>
                          {30 - clientName.length} restantes
                        </span>
                      </div>
                      <input
                        id="client-name"
                        type="text"
                        maxLength={30}
                        value={clientName}
                        onChange={(e) => {
                          setClientName(e.target.value.slice(0, 30));
                          if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                        }}
                        placeholder="Ej. Martín Gómez"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] text-xs text-[#1E242B] border focus:bg-white focus:outline-none transition-colors ${
                          formErrors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-[#B3B6B9] focus:border-[#1E242B]'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>{formErrors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Campo Teléfono (Obligatorio, máx 10 dígitos) */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="client-phone" className="block text-xs font-medium text-[#1E242B]">
                          Teléfono celular / WhatsApp (10 dígitos) *
                        </label>
                        <span className={`text-[11px] tabular-nums font-medium ${10 - clientPhone.length === 0 ? 'text-emerald-700 font-bold' : 'text-[#6C7680]'}`}>
                          {10 - clientPhone.length} restantes
                        </span>
                      </div>
                      <input
                        id="client-phone"
                        type="tel"
                        maxLength={10}
                        value={clientPhone}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setClientPhone(digits);
                          if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                        }}
                        placeholder="Ej. 3834272000"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] text-xs text-[#1E242B] border focus:bg-white focus:outline-none transition-colors ${
                          formErrors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-[#B3B6B9] focus:border-[#1E242B]'
                        }`}
                      />
                      <p className="mt-1 text-[11px] text-[#6C7680] leading-tight">
                        Ej: <strong>3834272000</strong>. Ingresá código de área (característica) + número restante, sin el 0 ni el 15.
                      </p>
                      {formErrors.phone && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>{formErrors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Campo Observaciones (Opcional, máx 250 caracteres) */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="client-notes" className="block text-xs font-medium text-[#1E242B]">
                          Observaciones o detalles adicionales (opcional)
                        </label>
                        <span className={`text-[11px] tabular-nums font-medium ${250 - clientNotes.length === 0 ? 'text-amber-600 font-bold' : 'text-[#6C7680]'}`}>
                          {250 - clientNotes.length} restantes
                        </span>
                      </div>
                      <textarea
                        id="client-notes"
                        maxLength={250}
                        value={clientNotes}
                        onChange={(e) => {
                          setClientNotes(e.target.value.slice(0, 250));
                          if (formErrors.notes) setFormErrors({ ...formErrors, notes: undefined });
                        }}
                        rows={2}
                        placeholder="Ej. Necesito colocación en taller el sábado por la mañana..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] text-xs text-[#1E242B] border border-[#B3B6B9] focus:border-[#1E242B] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="pt-2 flex flex-col gap-2.5">
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm transition-all shadow-md shadow-[#25D366]/20"
                      >
                        <WhatsAppIcon className="w-5 h-5 text-white" variant="white" />
                        <span>Enviar Consulta por WhatsApp</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#F8F9FA] hover:bg-[#F1F3F5] text-xs font-semibold text-[#1E242B] transition-colors border border-[#B3B6B9]/40"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-[#1E242B]" />}
                        <span>{copiedLink ? '¡Resumen copiado al portapapeles!' : 'Copiar Resumen de Estimación'}</span>
                      </button>
                    </div>

                    {savedSuccessMessage && (
                      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 mt-2">
                        <p className="text-xs font-semibold flex items-center gap-1.5 text-emerald-800">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{savedSuccessMessage}</span>
                        </p>
                        {waSentUrl && (
                          <a
                            href={waSentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
                          >
                            <span>Hacé clic aquí para abrir WhatsApp manualmente</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
