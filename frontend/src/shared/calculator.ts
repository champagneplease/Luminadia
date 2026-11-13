import {
  CalculatorCalculationInput,
  MeasurementUnit,
  PieceCalculationDetail,
  ProjectCategory,
  RollEstimationResult,
  SurfacePieceInput,
  AutomotiveTemplate
} from './types';

export const STANDARD_ROLL_WIDTH_METERS = 1.52; // 1.52 m (60 pulgadas), estándar mundial en láminas solares
export const STANDARD_USABLE_WIDTH_METERS = 1.50; // Margen técnico de orillo de 1 cm por lado
export const DEFAULT_CUTTING_MARGIN_CM = 2.5; // Margen de recorte perimetral para instalación manual
export const DEFAULT_RESIDENTIAL_WASTE_PERCENT = 10.0; // 10% merma estimada en arquitectura
export const DEFAULT_AUTOMOTIVE_WASTE_PERCENT = 15.0; // 15% merma estimada en automotor por curvaturas

/**
 * Normaliza cualquier medida a centímetros
 */
export function toCentimeters(val: number, unit: MeasurementUnit): number {
  if (val <= 0 || isNaN(val)) {
    throw new Error(`La dimensión debe ser un número positivo mayor a cero (recibido: ${val}).`);
  }
  switch (unit) {
    case 'cm':
      return Math.round(val * 100) / 100;
    case 'm':
      return Math.round(val * 10000) / 100;
    case 'mm':
      return Math.round((val / 10) * 100) / 100;
    default:
      return val;
  }
}

/**
 * Valida los límites físicos de una superficie
 */
export function validatePieceInput(piece: SurfacePieceInput): void {
  const widthCm = toCentimeters(piece.width, piece.unit);
  const heightCm = toCentimeters(piece.height, piece.unit);

  if (widthCm < 5 || heightCm < 5) {
    throw new Error(`Dimensiones demasiado pequeñas (${widthCm} x ${heightCm} cm). El mínimo físico es 5 cm.`);
  }

  if (widthCm > 2500 || heightCm > 2500) {
    throw new Error(`Dimensiones excesivas (${widthCm} x ${heightCm} cm). Verifique si la unidad de medida es correcta.`);
  }

  if (!Number.isInteger(piece.quantity) || piece.quantity < 1 || piece.quantity > 500) {
    throw new Error(`La cantidad de piezas debe ser un número entero entre 1 y 500 (recibido: ${piece.quantity}).`);
  }
}

/**
 * Calcula el aprovechamiento del rollo y la estimación de material
 */
export function calculateMaterialEstimation(input: CalculatorCalculationInput): RollEstimationResult {
  if (!input.pieces || input.pieces.length === 0) {
    throw new Error('Debe ingresar al menos una superficie a cubrir.');
  }

  const rollWidthM = input.rollWidthMeters > 0 ? input.rollWidthMeters : STANDARD_ROLL_WIDTH_METERS;
  const usableWidthM = input.usableWidthMeters && input.usableWidthMeters > 0 
    ? input.usableWidthMeters 
    : Math.max(0.5, rollWidthM - 0.02);
  const usableWidthCm = usableWidthM * 100;

  const cuttingMarginCm = input.cuttingMarginCm !== undefined ? input.cuttingMarginCm : DEFAULT_CUTTING_MARGIN_CM;
  const safetyWastePercent = input.safetyWastePercent !== undefined 
    ? input.safetyWastePercent 
    : (input.category === 'automotriz' ? DEFAULT_AUTOMOTIVE_WASTE_PERCENT : DEFAULT_RESIDENTIAL_WASTE_PERCENT);

  const assumptions: string[] = [];
  const piecesDetails: PieceCalculationDetail[] = [];
  let totalNetAreaM2 = 0;
  let totalWithMarginAreaM2 = 0;
  let hasPiecesExceedingRollWidth = false;

  // Procesar cada superficie
  for (let i = 0; i < input.pieces.length; i++) {
    const rawPiece = input.pieces[i];
    validatePieceInput(rawPiece);

    const baseWidthCm = toCentimeters(rawPiece.width, rawPiece.unit);
    const baseHeightCm = toCentimeters(rawPiece.height, rawPiece.unit);

    // Margen de recorte para colocación
    const cutWidthCm = baseWidthCm + (cuttingMarginCm * 2);
    const cutHeightCm = baseHeightCm + (cuttingMarginCm * 2);

    const areaPerPieceM2 = (baseWidthCm * baseHeightCm) / 10000;
    const totalAreaPieceM2 = areaPerPieceM2 * rawPiece.quantity;

    const areaWithMarginPerPieceM2 = (cutWidthCm * cutHeightCm) / 10000;
    const totalAreaWithMarginPieceM2 = areaWithMarginPerPieceM2 * rawPiece.quantity;

    totalNetAreaM2 += totalAreaPieceM2;
    totalWithMarginAreaM2 += totalAreaWithMarginPieceM2;

    // Verificar si alguna orientación cabe en el ancho del rollo
    const fitsNormal = cutWidthCm <= usableWidthCm;
    const fitsRotated = cutHeightCm <= usableWidthCm;

    if (!fitsNormal && !fitsRotated) {
      hasPiecesExceedingRollWidth = true;
    }

    piecesDetails.push({
      id: rawPiece.id || `piece-${i + 1}`,
      label: rawPiece.label || `Superficie #${i + 1}`,
      widthCm: baseWidthCm,
      heightCm: baseHeightCm,
      quantity: rawPiece.quantity,
      areaPerPieceM2: Number(areaPerPieceM2.toFixed(4)),
      totalAreaM2: Number(totalAreaPieceM2.toFixed(4)),
    });
  }

  // Algoritmo de distribución lineal en el ancho del rollo (Strip / Bin-packing 1D simplificado)
  // Desplegamos todas las unidades individuales con su margen de corte
  interface CutUnit {
    w: number;
    h: number;
  }
  const allCuts: CutUnit[] = [];
  for (const rawPiece of input.pieces) {
    const w = toCentimeters(rawPiece.width, rawPiece.unit) + (cuttingMarginCm * 2);
    const h = toCentimeters(rawPiece.height, rawPiece.unit) + (cuttingMarginCm * 2);
    for (let q = 0; q < rawPiece.quantity; q++) {
      allCuts.push({ w, h });
    }
  }

  // Ordenamos piezas de mayor a menor dimensión crítica para empaquetado más eficiente
  allCuts.sort((a, b) => Math.max(b.w, b.h) - Math.max(a.w, a.h));

  // Simulación por hileras (Shelves along roll length)
  let currentShelfLengthCm = 0;
  let currentShelfWidthUsedCm = 0;
  let totalLengthCm = 0;

  for (const cut of allCuts) {
    // Si se permite rotación, elegimos la orientación que optimice el uso del ancho del rollo
    let itemW = cut.w;
    let itemL = cut.h;

    if (input.allowPieceRotation !== false) {
      // Elegir orientación tal que el ancho quepa en el rollo y minimice longitud
      const normalFits = cut.w <= usableWidthCm;
      const rotFits = cut.h <= usableWidthCm;

      if (normalFits && rotFits) {
        // Ambas entran: preferimos poner el lado más chico a lo ancho para meter más en la misma hilera si es posible
        if (cut.w <= cut.h) {
          itemW = cut.w;
          itemL = cut.h;
        } else {
          itemW = cut.h;
          itemL = cut.w;
        }
      } else if (rotFits) {
        itemW = cut.h;
        itemL = cut.w;
      }
    }

    // Si entra en la hilera actual a lo ancho del rollo
    if (currentShelfWidthUsedCm + itemW <= usableWidthCm) {
      currentShelfWidthUsedCm += itemW;
      currentShelfLengthCm = Math.max(currentShelfLengthCm, itemL);
    } else {
      // Pasamos a una nueva hilera del rollo
      totalLengthCm += currentShelfLengthCm;
      currentShelfLengthCm = itemL;
      currentShelfWidthUsedCm = itemW;
    }
  }
  totalLengthCm += currentShelfLengthCm;

  // Convertimos a metros lineales
  let rawLinearMeters = totalLengthCm / 100;

  // Si alguna pieza excede el ancho útil del rollo, se requiere fraccionamiento o empalme técnico
  if (hasPiecesExceedingRollWidth) {
    assumptions.push(
      `Existen superficies cuyas dimensiones superan el ancho útil del rollo (${usableWidthM} m). Se requerirá empalme técnico profesional en obra.`
    );
  }

  // Aplicación del factor de merma de seguridad configurable
  const wasteMultiplier = 1 + (safetyWastePercent / 100);
  const estimatedLinearMeters = Number((rawLinearMeters * wasteMultiplier).toFixed(2));

  // Consumo total de rollo en m2
  const totalRollAreaConsumedM2 = Number((estimatedLinearMeters * rollWidthM).toFixed(3));
  const netSurfaceAreaM2 = Number(totalNetAreaM2.toFixed(3));
  const estimatedScrapAreaM2 = Math.max(0, Number((totalRollAreaConsumedM2 - netSurfaceAreaM2).toFixed(3)));
  const estimatedWastePercentage = Number(((estimatedScrapAreaM2 / totalRollAreaConsumedM2) * 100).toFixed(1));
  const yieldEfficiencyPercentage = Number(((netSurfaceAreaM2 / totalRollAreaConsumedM2) * 100).toFixed(1));

  // Supuestos y limitaciones técnicas
  assumptions.push(`Ancho de rollo considerado: ${rollWidthM.toFixed(2)} m (ancho útil utilizable: ${usableWidthM.toFixed(2)} m).`);
  assumptions.push(`Margen técnico perimetral de recorte: ${cuttingMarginCm.toFixed(1)} cm por arista.`);
  assumptions.push(`Factor de merma por corte y acomodamiento: ${safetyWastePercent.toFixed(1)}%.`);
  assumptions.push(`Este cálculo es orientativo para estimación de insumos y no constituye presupuesto comercial.`);

  const isCurvedGlassDisclaimer = Boolean(
    input.category === 'automotriz' || 
    (input.automotiveData && input.automotiveData.hasCurvedGlass)
  );

  if (isCurvedGlassDisclaimer) {
    assumptions.push(
      `Los cristales curvados (parabrisas/lunetas de vehículos) requieren termoformado con calor y mayor excedente. La medida final debe ser auditada por un técnico instalador.`
    );
  }

  return {
    category: input.category,
    productName: input.productId || 'Lámina de control solar',
    rollWidthMeters: rollWidthM,
    usableWidthMeters: usableWidthM,
    piecesCount: piecesDetails.reduce((acc, p) => acc + p.quantity, 0),
    piecesDetails,
    netSurfaceAreaM2,
    surfaceWithCuttingMarginM2: Number(totalWithMarginAreaM2.toFixed(3)),
    estimatedLinearMetersNeeded: estimatedLinearMeters,
    totalRollAreaConsumedM2,
    estimatedScrapAreaM2,
    estimatedWastePercentage,
    yieldEfficiencyPercentage,
    assumptions,
    isCurvedGlassDisclaimer,
    calculatedAt: '2026-10-20T00:00:00.000Z'
  };
}

/**
 * Plantillas estándar automotrices de referencia verídica
 */
export const AUTOMOTIVE_PRESET_TEMPLATES: Record<string, AutomotiveTemplate> = {
  sedan: {
    vehicleType: 'sedan',
    label: 'Sedán (4 Puertas)',
    recommendedMarginPercent: 15,
    typicalGlasses: [
      { zone: 'parabrisas', label: 'Parabrisas delantero', approxWidthCm: 140, approxHeightCm: 85, quantity: 1, isCurved: true },
      { zone: 'laterales_delanteros', label: 'Laterales delanteros (conductor y acompañante)', approxWidthCm: 85, approxHeightCm: 50, quantity: 2, isCurved: false },
      { zone: 'laterales_traseros', label: 'Laterales traseros', approxWidthCm: 80, approxHeightCm: 48, quantity: 2, isCurved: false },
      { zone: 'deflectores_ventiletes', label: 'Ventiletes o deflectores fijos', approxWidthCm: 30, approxHeightCm: 25, quantity: 2, isCurved: false },
      { zone: 'luneta', label: 'Luneta trasera térmica', approxWidthCm: 125, approxHeightCm: 70, quantity: 1, isCurved: true },
    ]
  },
  hatchback: {
    vehicleType: 'hatchback',
    label: 'Hatchback (3 o 5 Puertas)',
    recommendedMarginPercent: 15,
    typicalGlasses: [
      { zone: 'parabrisas', label: 'Parabrisas delantero', approxWidthCm: 135, approxHeightCm: 80, quantity: 1, isCurved: true },
      { zone: 'laterales_delanteros', label: 'Laterales delanteros', approxWidthCm: 85, approxHeightCm: 50, quantity: 2, isCurved: false },
      { zone: 'laterales_traseros', label: 'Laterales traseros', approxWidthCm: 75, approxHeightCm: 45, quantity: 2, isCurved: false },
      { zone: 'luneta', label: 'Luneta portón trasero', approxWidthCm: 110, approxHeightCm: 60, quantity: 1, isCurved: true },
    ]
  },
  suv: {
    vehicleType: 'suv',
    label: 'SUV / Utilitario Deportivo',
    recommendedMarginPercent: 16,
    typicalGlasses: [
      { zone: 'parabrisas', label: 'Parabrisas delantero amplio', approxWidthCm: 145, approxHeightCm: 90, quantity: 1, isCurved: true },
      { zone: 'laterales_delanteros', label: 'Laterales delanteros', approxWidthCm: 90, approxHeightCm: 55, quantity: 2, isCurved: false },
      { zone: 'laterales_traseros', label: 'Laterales traseros', approxWidthCm: 85, approxHeightCm: 52, quantity: 2, isCurved: false },
      { zone: 'deflectores_ventiletes', label: 'Custodias / Tercera fila', approxWidthCm: 45, approxHeightCm: 35, quantity: 2, isCurved: false },
      { zone: 'luneta', label: 'Luneta trasera', approxWidthCm: 120, approxHeightCm: 65, quantity: 1, isCurved: true },
    ]
  },
  pickup: {
    vehicleType: 'pickup',
    label: 'Pick-Up (Doble Cabina)',
    recommendedMarginPercent: 14,
    typicalGlasses: [
      { zone: 'parabrisas', label: 'Parabrisas delantero', approxWidthCm: 150, approxHeightCm: 85, quantity: 1, isCurved: true },
      { zone: 'laterales_delanteros', label: 'Laterales delanteros', approxWidthCm: 90, approxHeightCm: 55, quantity: 2, isCurved: false },
      { zone: 'laterales_traseros', label: 'Laterales traseros', approxWidthCm: 85, approxHeightCm: 50, quantity: 2, isCurved: false },
      { zone: 'luneta', label: 'Luneta trasera recta / corrediza', approxWidthCm: 135, approxHeightCm: 45, quantity: 1, isCurved: false },
    ]
  }
};

/**
 * Genera el enlace y mensaje URL codificado para WhatsApp oficial de Luminadia (+54 9 383 427-2000)
 */
export function generateWhatsAppConsultationUrl(
  result: RollEstimationResult,
  clientName?: string,
  extraNotes?: string,
  clientPhone?: string
): string {
  const phone = '5493834272000';
  const categoryNames: Record<ProjectCategory, string> = {
    'automotriz': 'Automotriz',
    'hogares': 'Residencial / Hogares',
    'comercios-empresas': 'Comercios y Empresas'
  };

  const lines: string[] = [
    `*CONSULTA DE MATERIALES — LUMINADIA*`,
    `Hola Luminadia, estuve utilizando la calculadora de su sitio web y deseo solicitar asesoramiento técnico para mi proyecto.`,
    ``,
    `*Categoría:* ${categoryNames[result.category] || result.category}`,
    `*Material seleccionado:* ${result.productName}`,
    `*Superficie total neta:* ${result.netSurfaceAreaM2} m²`,
    `*Cantidad de piezas:* ${result.piecesCount}`,
    `*Ancho de rollo utilizado:* ${result.rollWidthMeters} m`,
    `*Estimación de material a retirar:* ~${result.estimatedLinearMetersNeeded} metros lineales (${result.totalRollAreaConsumedM2} m² de lámina)`,
    `*Aprovechamiento estimado:* ${result.yieldEfficiencyPercentage}% (merma técnica ~${result.estimatedWastePercentage}%)`,
  ];

  if (clientName) {
    lines.push(`*Contacto:* ${clientName}`);
  }

  if (clientPhone) {
    lines.push(`*Teléfono:* ${clientPhone}`);
  }

  if (extraNotes) {
    lines.push(`*Observaciones:* ${extraNotes}`);
  }

  lines.push(``);
  lines.push(`_Nota: Esta estimación no contiene precios ni importes. Solicito confirmación de disponibilidad y turno de asesoramiento técnico en Catamarca._`);

  const text = lines.join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
