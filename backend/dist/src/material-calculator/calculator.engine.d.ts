export interface SurfacePieceInput {
    id: string;
    label?: string;
    width: number;
    height: number;
    unit: 'cm' | 'm' | 'mm';
    quantity: number;
}
export declare function toCentimeters(val: number, unit: 'cm' | 'm' | 'mm'): number;
export declare function calculateMaterialEstimationBackend(input: {
    category: string;
    productName: string;
    rollWidthMeters?: number;
    usableWidthMeters?: number;
    pieces: SurfacePieceInput[];
    cuttingMarginCm?: number;
    safetyWastePercent?: number;
}): {
    category: string;
    productName: string;
    rollWidthMeters: number;
    usableWidthMeters: number;
    piecesCount: any;
    piecesDetails: any[];
    netSurfaceAreaM2: number;
    estimatedLinearMetersNeeded: number;
    totalRollAreaConsumedM2: number;
    estimatedScrapAreaM2: number;
    estimatedWastePercentage: number;
    yieldEfficiencyPercentage: number;
};
