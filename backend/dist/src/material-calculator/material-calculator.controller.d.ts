import { SurfacePieceInput } from './calculator.engine';
declare class CalculateMaterialDto {
    category: string;
    productName: string;
    rollWidthMeters?: number;
    usableWidthMeters?: number;
    pieces: SurfacePieceInput[];
    cuttingMarginCm?: number;
    safetyWastePercent?: number;
}
export declare class MaterialCalculatorController {
    estimate(dto: CalculateMaterialDto): {
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
}
export {};
