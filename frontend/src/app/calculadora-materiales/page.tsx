'use client';

import React, { useState, useMemo } from 'react';
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
} from 'lucide-react';
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

  // Parámetros técnicos de corte configurables
  const [cuttingMarginCm, setCuttingMarginCm] = useState(2.5);
  const [safetyWastePercent, setSafetyWastePercent] = useState(12);

  // Formulario de consulta a Luminadia
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
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
          rollWidthMeters: selectedProduct.rollWidthMeters,
          usableWidthMeters: selectedProduct.usableWidthMeters,
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

  // Generar URL de WhatsApp oficial
  const whatsAppUrl = useMemo(() => {
    if (!calculationResult.result) return '';
    return generateWhatsAppConsultationUrl(
      calculationResult.result,
      clientName || undefined,
      clientNotes || (category === 'automotriz' ? `Vehículo: ${customVehicleMake} ${customVehicleModel} (${vehicleType})` : undefined)
    );
  }, [calculationResult.result, clientName, clientNotes, category, customVehicleMake, customVehicleModel, vehicleType]);

  // Copiar resumen al portapapeles
  const handleCopySummary = () => {
    if (!calculationResult.result) return;
    const r = calculationResult.result;
    const summaryText = `RESUMEN DE ESTIMACIÓN — LUMINADIA (Catamarca)
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

  // Guardar solicitud en el backend
  const handleSaveRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calculationResult.result) return;

    try {
      const payload = {
        category,
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        contactName: clientName || 'Consulta web',
        contactPhone: clientPhone || 'No informado',
        vehicleDetails: category === 'automotriz' ? `${customVehicleMake} ${customVehicleModel} (${vehicleType})` : undefined,
        notes: clientNotes,
        calculationSummary: calculationResult.result,
      };

      // Intentar enviar al endpoint de backend local (o fallback local)
      const res = await fetch('http://localhost:3001/api/v1/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (res && res.ok) {
        setSavedSuccessMessage('¡Solicitud guardada en el sistema! Un asesor de Luminadia la revisará en breve.');
      } else {
        // En caso de que el backend esté en proceso de inicio, guardar en localStorage y notificar
        const localHistory = JSON.parse(localStorage.getItem('luminadia_requests') || '[]');
        localHistory.push({ ...payload, createdAt: new Date().toISOString() });
        localStorage.setItem('luminadia_requests', JSON.stringify(localHistory));
        setSavedSuccessMessage('¡Solicitud registrada localmente! Podés enviarla también por WhatsApp para atención inmediata.');
      }
    } catch {
      setSavedSuccessMessage('¡Consulta preparada! Hacé clic en enviar por WhatsApp.');
    }
  };

  return (
    <div className="bg-[#0e1110] text-[#f4f3ef] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado editorial de la calculadora */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#161a19] border border-[#2a322f] text-xs font-semibold text-amber-500">
            <Calculator className="w-4 h-4" />
            <span>Herramienta Técnica</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f3ef] leading-tight">
            Calculadora de materiales para control solar.
          </h1>
          <p className="text-base sm:text-lg text-[#9aa19d] leading-relaxed">
            Ingresá las medidas de tus superficies para estimar la superficie neta a cubrir y la cantidad de metros lineales de bobina necesarios.
          </p>
          <div className="p-3.5 rounded-lg bg-[#161a19] border border-amber-600/30 text-xs text-[#9aa19d] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
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
            <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-amber-500 font-bold">
                  Paso 1
                </span>
                <span className="text-xs text-[#9aa19d]">Tipo de proyecto</span>
              </div>
              <h2 className="text-xl font-bold text-[#f4f3ef]">¿Dónde aplicarás el control solar?</h2>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleCategoryChange('automotriz')}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                    category === 'automotriz'
                      ? 'bg-amber-600/10 border-amber-500 text-amber-400 font-bold'
                      : 'bg-[#1e2422]/60 border-[#2a322f] text-[#9aa19d] hover:text-[#f4f3ef]'
                  }`}
                >
                  <Car className="w-6 h-6" />
                  <span className="text-sm">Automotriz</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCategoryChange('hogares')}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                    category === 'hogares'
                      ? 'bg-amber-600/10 border-amber-500 text-amber-400 font-bold'
                      : 'bg-[#1e2422]/60 border-[#2a322f] text-[#9aa19d] hover:text-[#f4f3ef]'
                  }`}
                >
                  <Home className="w-6 h-6" />
                  <span className="text-sm">Hogares</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCategoryChange('comercios-empresas')}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                    category === 'comercios-empresas'
                      ? 'bg-amber-600/10 border-amber-500 text-amber-400 font-bold'
                      : 'bg-[#1e2422]/60 border-[#2a322f] text-[#9aa19d] hover:text-[#f4f3ef]'
                  }`}
                >
                  <Building2 className="w-6 h-6" />
                  <span className="text-sm">Comercios</span>
                </button>
              </div>
            </div>

            {/* PASO 2: SELECCIÓN DEL MATERIAL DEL CATÁLOGO REAL */}
            <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-amber-500 font-bold">
                  Paso 2
                </span>
                <span className="text-xs text-[#9aa19d]">Lámina y características</span>
              </div>
              <h2 className="text-xl font-bold text-[#f4f3ef]">Elegí el producto del catálogo</h2>

              <div className="space-y-3">
                {availableProducts.map((prod) => {
                  const isSelected = prod.id === selectedProductId;
                  return (
                    <label
                      key={prod.id}
                      className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-600/10 border-amber-500'
                          : 'bg-[#1e2422]/40 border-[#2a322f] hover:border-[#636b67]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="film-product"
                          value={prod.id}
                          checked={isSelected}
                          onChange={() => setSelectedProductId(prod.id)}
                          className="mt-1 w-4 h-4 text-amber-600 focus:ring-amber-500 focus:ring-offset-0 bg-[#0e1110] border-[#2a322f]"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-base font-bold text-[#f4f3ef]">{prod.name}</span>
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#161a19] text-[#9aa19d]">
                              Ancho: {prod.rollWidthMeters}m
                            </span>
                          </div>
                          <p className="text-xs text-[#9aa19d] leading-relaxed">
                            {prod.description}
                          </p>
                          <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-[#636b67]">
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
            <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-amber-500 font-bold">
                  Paso 3
                </span>
                <span className="text-xs text-[#9aa19d]">
                  {category === 'automotriz' ? 'Cristales vehiculares' : 'Dimensiones de aberturas'}
                </span>
              </div>

              {category === 'automotriz' ? (
                /* Configuración vehicular */
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-[#f4f3ef]">Detalles del vehículo</h2>

                  {/* Silueta / Tipo de vehículo */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {(['sedan', 'hatchback', 'suv', 'pickup'] as VehicleType[]).map((type) => {
                      const isSel = vehicleType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setVehicleType(type)}
                          className={`py-3 px-2 rounded-lg border text-xs font-semibold uppercase tracking-wider transition-colors ${
                            isSel
                              ? 'bg-amber-600 text-[#0e1110] border-amber-500'
                              : 'bg-[#1e2422]/60 text-[#9aa19d] border-[#2a322f] hover:text-[#f4f3ef]'
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
                      <label htmlFor="make-input" className="block text-xs font-medium text-[#9aa19d] mb-1">
                        Marca del auto (opcional)
                      </label>
                      <input
                        id="make-input"
                        type="text"
                        value={customVehicleMake}
                        onChange={(e) => setCustomVehicleMake(e.target.value)}
                        placeholder="Ej. Toyota, Volkswagen, Fiat..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1110] border border-[#2a322f] text-[#f4f3ef] text-sm focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="model-input" className="block text-xs font-medium text-[#9aa19d] mb-1">
                        Modelo y año (opcional)
                      </label>
                      <input
                        id="model-input"
                        type="text"
                        value={customVehicleModel}
                        onChange={(e) => setCustomVehicleModel(e.target.value)}
                        placeholder="Ej. Corolla 2023, Hilux..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1110] border border-[#2a322f] text-[#f4f3ef] text-sm focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Zonas de cristales a polarizar */}
                  <div className="pt-2 space-y-2">
                    <label className="block text-xs font-semibold text-[#9aa19d] uppercase tracking-wider">
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
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer text-xs font-medium transition-colors ${
                              isChecked
                                ? 'bg-amber-600/10 border-amber-500/50 text-[#f4f3ef]'
                                : 'bg-[#1e2422]/40 border-[#2a322f] text-[#9aa19d]'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleAutomotiveZone(zone as AutomotiveGlassZone)}
                              className="w-4 h-4 text-amber-600 rounded bg-[#0e1110] border-[#2a322f] focus:ring-0"
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
                    <h2 className="text-xl font-bold text-[#f4f3ef]">Medidas de las superficies</h2>
                    <button
                      type="button"
                      onClick={addPieceRow}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e2422] border border-[#2a322f] hover:border-amber-500 text-xs font-semibold text-amber-400 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar paño</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {pieces.map((piece, index) => (
                      <div
                        key={piece.id}
                        className="p-3.5 rounded-xl bg-[#0e1110] border border-[#2a322f] space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3"
                      >
                        {/* Etiqueta / Nombre */}
                        <div className="flex-1">
                          <label
                            htmlFor={`label-${piece.id}`}
                            className="block text-[11px] text-[#636b67] uppercase tracking-wider mb-1"
                          >
                            Ubicación #{index + 1}
                          </label>
                          <input
                            id={`label-${piece.id}`}
                            type="text"
                            value={piece.label}
                            onChange={(e) => updatePieceRow(piece.id, 'label', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-[#161a19] border border-[#2a322f] text-sm text-[#f4f3ef] focus:border-amber-500 focus:outline-none"
                            placeholder="Ej. Living, Balcón..."
                          />
                        </div>

                        {/* Ancho */}
                        <div className="w-full sm:w-28">
                          <label
                            htmlFor={`width-${piece.id}`}
                            className="block text-[11px] text-[#636b67] uppercase tracking-wider mb-1"
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
                            className="w-full px-3 py-1.5 rounded-lg bg-[#161a19] border border-[#2a322f] text-sm text-[#f4f3ef] tabular-nums focus:border-amber-500 focus:outline-none"
                          />
                        </div>

                        {/* Alto */}
                        <div className="w-full sm:w-28">
                          <label
                            htmlFor={`height-${piece.id}`}
                            className="block text-[11px] text-[#636b67] uppercase tracking-wider mb-1"
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
                            className="w-full px-3 py-1.5 rounded-lg bg-[#161a19] border border-[#2a322f] text-sm text-[#f4f3ef] tabular-nums focus:border-amber-500 focus:outline-none"
                          />
                        </div>

                        {/* Cantidad */}
                        <div className="w-full sm:w-20">
                          <label
                            htmlFor={`qty-${piece.id}`}
                            className="block text-[11px] text-[#636b67] uppercase tracking-wider mb-1"
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
                            className="w-full px-3 py-1.5 rounded-lg bg-[#161a19] border border-[#2a322f] text-sm text-[#f4f3ef] tabular-nums focus:border-amber-500 focus:outline-none"
                          />
                        </div>

                        {/* Botón eliminar */}
                        <div className="sm:pt-5">
                          <button
                            type="button"
                            onClick={() => removePieceRow(piece.id)}
                            disabled={pieces.length <= 1}
                            className="p-2 rounded-lg text-[#9aa19d] hover:text-red-400 hover:bg-[#1e2422] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
              <div className="pt-4 border-t border-[#2a322f] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label htmlFor="cutting-margin" className="block text-[#9aa19d] mb-1">
                    Margen de recorte perimetral: <span className="text-[#f4f3ef] font-mono">{cuttingMarginCm} cm</span>
                  </label>
                  <input
                    id="cutting-margin"
                    type="range"
                    min="1"
                    max="5"
                    step="0.5"
                    value={cuttingMarginCm}
                    onChange={(e) => setCuttingMarginCm(parseFloat(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <span className="text-[10px] text-[#636b67]">
                    Sobrante para ajuste manual con cutter en obra.
                  </span>
                </div>

                <div>
                  <label htmlFor="safety-waste" className="block text-[#9aa19d] mb-1">
                    Merma técnica estimada: <span className="text-[#f4f3ef] font-mono">{safetyWastePercent}%</span>
                  </label>
                  <input
                    id="safety-waste"
                    type="range"
                    min="5"
                    max="25"
                    step="1"
                    value={safetyWastePercent}
                    onChange={(e) => setSafetyWastePercent(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-500"
                  />
                  <span className="text-[10px] text-[#636b67]">
                    Factor de desperdicio por corte y acomodamiento en bobina.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: RESULTADOS (PASOS 4, 5, 6, 7) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {calculationResult.error ? (
              <div className="p-6 rounded-xl bg-red-950/20 border border-red-500/50 text-red-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Atención en las medidas</span>
                </div>
                <p className="text-sm">{calculationResult.error}</p>
              </div>
            ) : calculationResult.result ? (
              <div className="p-6 rounded-2xl bg-[#161a19] border border-[#2a322f] space-y-6 shadow-xl">
                {/* Cabecera del cálculo */}
                <div className="border-b border-[#2a322f] pb-4">
                  <span className="text-xs uppercase tracking-wider text-amber-500 font-bold block mb-1">
                    Estimación de Insumos
                  </span>
                  <h3 className="text-xl font-bold text-[#f4f3ef]">
                    {calculationResult.result.productName}
                  </h3>
                  <p className="text-xs text-[#9aa19d] mt-1">
                    Ancho de rollo: <strong className="text-[#f4f3ef]">{calculationResult.result.rollWidthMeters} m</strong> (útil: {calculationResult.result.usableWidthMeters} m)
                  </p>
                </div>

                {/* Métricas principales comparativas */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Superficie Neta */}
                  <div className="p-4 rounded-xl bg-[#0e1110] border border-[#2a322f]">
                    <span className="text-xs text-[#9aa19d] block mb-1">Superficie neta de cristal</span>
                    <div className="text-2xl sm:text-3xl font-bold text-[#f4f3ef] tabular-nums">
                      {calculationResult.result.netSurfaceAreaM2} <span className="text-sm font-normal text-[#9aa19d]">m²</span>
                    </div>
                    <span className="text-[11px] text-[#636b67] mt-1 block">
                      {calculationResult.result.piecesCount} {calculationResult.result.piecesCount === 1 ? 'paño' : 'paños'} en total
                    </span>
                  </div>

                  {/* Metros lineales de rollo a retirar */}
                  <div className="p-4 rounded-xl bg-[#0e1110] border border-amber-600/40">
                    <span className="text-xs text-amber-400 block mb-1">Largo de rollo a retirar</span>
                    <div className="text-2xl sm:text-3xl font-bold text-amber-500 tabular-nums">
                      ~{calculationResult.result.estimatedLinearMetersNeeded} <span className="text-sm font-normal text-amber-400">m</span>
                    </div>
                    <span className="text-[11px] text-[#9aa19d] mt-1 block">
                      Bobina de {calculationResult.result.rollWidthMeters}m ancho
                    </span>
                  </div>
                </div>

                {/* Desglose de rendimiento */}
                <div className="p-4 rounded-xl bg-[#0e1110] border border-[#2a322f] space-y-2 text-xs">
                  <div className="flex justify-between text-[#9aa19d]">
                    <span>Área total de rollo consumido:</span>
                    <strong className="text-[#f4f3ef] tabular-nums">
                      {calculationResult.result.totalRollAreaConsumedM2} m²
                    </strong>
                  </div>
                  <div className="flex justify-between text-[#9aa19d]">
                    <span>Aprovechamiento teórico de bobina:</span>
                    <strong className="text-emerald-400 tabular-nums">
                      {calculationResult.result.yieldEfficiencyPercentage}%
                    </strong>
                  </div>
                  <div className="flex justify-between text-[#9aa19d]">
                    <span>Merma técnica y márgenes de corte:</span>
                    <strong className="text-amber-400 tabular-nums">
                      ~{calculationResult.result.estimatedWastePercentage}% ({calculationResult.result.estimatedScrapAreaM2} m²)
                    </strong>
                  </div>
                </div>

                {/* Supuestos y Limitaciones Técnicas */}
                <div className="space-y-2 border-t border-[#2a322f] pt-4">
                  <span className="text-xs font-semibold text-[#f4f3ef] uppercase tracking-wide block">
                    Supuestos del cálculo:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#9aa19d]">
                    {calculationResult.result.assumptions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* PASO 7: CONSULTA Y ENVÍO A LUMINADIA */}
                <div className="border-t border-[#2a322f] pt-5 space-y-4">
                  <span className="text-xs uppercase tracking-wider text-amber-500 font-bold block">
                    Paso 7: Solicitar Asesoramiento
                  </span>

                  <p className="text-xs text-[#9aa19d]">
                    Podés compartir esta estimación directamente al WhatsApp oficial de Luminadia para coordinar relevamiento o consultar stock:
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors shadow-md"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar por WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#1e2422] border border-[#2a322f] hover:border-amber-500 text-sm font-semibold text-[#f4f3ef] transition-colors"
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                      <span>{copiedLink ? 'Copiado' : 'Copiar Resumen'}</span>
                    </button>
                  </div>

                  {/* Formulario opcional para registrar solicitud en backend */}
                  <form onSubmit={handleSaveRequest} className="pt-3 border-t border-[#1c2220] space-y-3">
                    <span className="text-xs font-medium text-[#9aa19d] block">
                      O dejá tus datos para que un técnico te contacte:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Tu nombre o empresa"
                        className="w-full px-3 py-2 rounded-lg bg-[#0e1110] border border-[#2a322f] text-xs text-[#f4f3ef] focus:border-amber-500 focus:outline-none"
                      />
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="Teléfono / WhatsApp"
                        className="w-full px-3 py-2 rounded-lg bg-[#0e1110] border border-[#2a322f] text-xs text-[#f4f3ef] focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <textarea
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      rows={2}
                      placeholder="Observaciones adicionales sobre tu proyecto..."
                      className="w-full px-3 py-2 rounded-lg bg-[#0e1110] border border-[#2a322f] text-xs text-[#f4f3ef] focus:border-amber-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-[#0e1110] font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      Registrar Consulta Técnica
                    </button>

                    {savedSuccessMessage && (
                      <p className="text-xs text-emerald-400 text-center font-medium pt-1">
                        {savedSuccessMessage}
                      </p>
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
