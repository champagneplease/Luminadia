export type ProjectCategory = 'automotriz' | 'hogares' | 'comercios-empresas';

export type MeasurementUnit = 'cm' | 'm' | 'mm';

export interface SurfacePieceInput {
  id: string;
  label?: string;
  width: number;
  height: number;
  unit: MeasurementUnit;
  quantity: number;
}

export type VehicleType = 
  | 'sedan'
  | 'suv'
  | 'hatchback'
  | 'pickup'
  | 'coupe'
  | 'utilitario';

export type AutomotiveGlassZone = 
  | 'parabrisas'
  | 'laterales_delanteros'
  | 'laterales_traseros'
  | 'luneta'
  | 'techo_solar'
  | 'deflectores_ventiletes';

export interface AutomotiveTemplateGlass {
  zone: AutomotiveGlassZone;
  label: string;
  approxWidthCm: number;
  approxHeightCm: number;
  quantity: number;
  isCurved: boolean;
  notes?: string;
}

export interface AutomotiveTemplate {
  vehicleType: VehicleType;
  label: string;
  typicalGlasses: AutomotiveTemplateGlass[];
  recommendedMarginPercent: number;
}

export interface FilmProduct {
  id: string;
  name: string;
  slug: string;
  code?: string;
  description: string;
  category: ProjectCategory[];
  rollWidthMeters: number;
  usableWidthMeters: number;
  standardRollLengthMeters: number;
  vltPercent?: number; // Transmisión de Luz Visible (ej. 5, 20, 35, 70)
  uvRejectionPercent?: number; // Rechazo Rayos UV (ej. 99)
  irRejectionPercent?: number; // Rechazo Rayos Infrarrojos (ej. 85)
  totalSolarEnergyRejectedPercent?: number; // TSER
  colorShade?: string; // Tonalidad (ej. Carbón oscuro, Humo intermedio, Claro térmico)
  technology?: string; // Cerámica nano, Carbón, Metalizada, etc.
  warrantyYears?: number;
  active: boolean;
}

export interface CalculatorCalculationInput {
  category: ProjectCategory;
  productId: string;
  rollWidthMeters: number;
  usableWidthMeters?: number;
  pieces: SurfacePieceInput[];
  cuttingMarginCm?: number; // Margen de corte por lado (ej. 2cm)
  safetyWastePercent?: number; // Porcentaje de merma técnica de seguridad
  allowPieceRotation?: boolean; // Si se permite girar piezas para optimizar el ancho
  automotiveData?: {
    vehicleType: VehicleType;
    make?: string;
    model?: string;
    year?: number;
    selectedZones: AutomotiveGlassZone[];
    hasCurvedGlass: boolean;
    needsProfessionalReview: boolean;
  };
}

export interface PieceCalculationDetail {
  id: string;
  label: string;
  widthCm: number;
  heightCm: number;
  quantity: number;
  areaPerPieceM2: number;
  totalAreaM2: number;
}

export interface RollEstimationResult {
  category: ProjectCategory;
  productName: string;
  rollWidthMeters: number;
  usableWidthMeters: number;
  piecesCount: number;
  piecesDetails: PieceCalculationDetail[];
  netSurfaceAreaM2: number;
  surfaceWithCuttingMarginM2: number;
  estimatedLinearMetersNeeded: number;
  totalRollAreaConsumedM2: number;
  estimatedScrapAreaM2: number;
  estimatedWastePercentage: number;
  yieldEfficiencyPercentage: number;
  assumptions: string[];
  isCurvedGlassDisclaimer: boolean;
  calculatedAt: string;
}

export interface ConsultationRequestInput {
  category: ProjectCategory;
  productId?: string;
  productName?: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  contactLocation?: string;
  vehicleDetails?: string;
  notes?: string;
  calculationSummary: RollEstimationResult;
}
