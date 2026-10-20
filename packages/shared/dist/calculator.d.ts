import { CalculatorCalculationInput, MeasurementUnit, RollEstimationResult, SurfacePieceInput, AutomotiveTemplate } from './types.js';
export declare const STANDARD_ROLL_WIDTH_METERS = 1.52;
export declare const STANDARD_USABLE_WIDTH_METERS = 1.5;
export declare const DEFAULT_CUTTING_MARGIN_CM = 2.5;
export declare const DEFAULT_RESIDENTIAL_WASTE_PERCENT = 10;
export declare const DEFAULT_AUTOMOTIVE_WASTE_PERCENT = 15;
/**
 * Normaliza cualquier medida a centímetros
 */
export declare function toCentimeters(val: number, unit: MeasurementUnit): number;
/**
 * Valida los límites físicos de una superficie
 */
export declare function validatePieceInput(piece: SurfacePieceInput): void;
/**
 * Calcula el aprovechamiento del rollo y la estimación de material
 */
export declare function calculateMaterialEstimation(input: CalculatorCalculationInput): RollEstimationResult;
/**
 * Plantillas estándar automotrices de referencia verídica
 */
export declare const AUTOMOTIVE_PRESET_TEMPLATES: Record<string, AutomotiveTemplate>;
/**
 * Genera el enlace y mensaje URL codificado para WhatsApp oficial de Luminadia (+54 9 383 427-2000)
 */
export declare function generateWhatsAppConsultationUrl(result: RollEstimationResult, clientName?: string, extraNotes?: string): string;
//# sourceMappingURL=calculator.d.ts.map