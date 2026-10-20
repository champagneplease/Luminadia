"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCentimeters = toCentimeters;
exports.calculateMaterialEstimationBackend = calculateMaterialEstimationBackend;
function toCentimeters(val, unit) {
    if (val <= 0 || isNaN(val)) {
        throw new Error(`La dimensión debe ser mayor a cero (recibido: ${val}).`);
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
function calculateMaterialEstimationBackend(input) {
    const rollWidthM = input.rollWidthMeters || 1.52;
    const usableWidthM = input.usableWidthMeters || 1.50;
    const usableWidthCm = usableWidthM * 100;
    const cuttingMarginCm = input.cuttingMarginCm !== undefined ? input.cuttingMarginCm : 2.5;
    const safetyWastePercent = input.safetyWastePercent !== undefined
        ? input.safetyWastePercent
        : (input.category === 'automotriz' ? 15 : 10);
    let totalNetAreaM2 = 0;
    const piecesDetails = [];
    for (let i = 0; i < input.pieces.length; i++) {
        const p = input.pieces[i];
        const wCm = toCentimeters(p.width, p.unit);
        const hCm = toCentimeters(p.height, p.unit);
        const areaPerPiece = (wCm * hCm) / 10000;
        const totalPieceArea = areaPerPiece * p.quantity;
        totalNetAreaM2 += totalPieceArea;
        piecesDetails.push({
            id: p.id || `piece-${i + 1}`,
            label: p.label || `Superficie #${i + 1}`,
            widthCm: wCm,
            heightCm: hCm,
            quantity: p.quantity,
            areaPerPieceM2: Number(areaPerPiece.toFixed(4)),
            totalAreaM2: Number(totalPieceArea.toFixed(4)),
        });
    }
    let totalLengthCm = 0;
    let currentShelfLength = 0;
    let currentShelfWidthUsed = 0;
    for (const p of input.pieces) {
        const w = toCentimeters(p.width, p.unit) + (cuttingMarginCm * 2);
        const h = toCentimeters(p.height, p.unit) + (cuttingMarginCm * 2);
        for (let q = 0; q < p.quantity; q++) {
            const itemW = Math.min(w, h) <= usableWidthCm ? Math.min(w, h) : Math.max(w, h);
            const itemL = itemW === Math.min(w, h) ? Math.max(w, h) : Math.min(w, h);
            if (currentShelfWidthUsed + itemW <= usableWidthCm) {
                currentShelfWidthUsed += itemW;
                currentShelfLength = Math.max(currentShelfLength, itemL);
            }
            else {
                totalLengthCm += currentShelfLength;
                currentShelfLength = itemL;
                currentShelfWidthUsed = itemW;
            }
        }
    }
    totalLengthCm += currentShelfLength;
    const rawLinearMeters = totalLengthCm / 100;
    const wasteMultiplier = 1 + (safetyWastePercent / 100);
    const estimatedLinearMeters = Number((rawLinearMeters * wasteMultiplier).toFixed(2));
    const totalRollAreaConsumedM2 = Number((estimatedLinearMeters * rollWidthM).toFixed(3));
    const netSurfaceAreaM2 = Number(totalNetAreaM2.toFixed(3));
    const estimatedScrapAreaM2 = Math.max(0, Number((totalRollAreaConsumedM2 - netSurfaceAreaM2).toFixed(3)));
    const estimatedWastePercentage = Number(((estimatedScrapAreaM2 / totalRollAreaConsumedM2) * 100).toFixed(1));
    const yieldEfficiencyPercentage = Number(((netSurfaceAreaM2 / totalRollAreaConsumedM2) * 100).toFixed(1));
    return {
        category: input.category,
        productName: input.productName,
        rollWidthMeters: rollWidthM,
        usableWidthMeters: usableWidthM,
        piecesCount: piecesDetails.reduce((acc, p) => acc + p.quantity, 0),
        piecesDetails,
        netSurfaceAreaM2,
        estimatedLinearMetersNeeded: estimatedLinearMeters,
        totalRollAreaConsumedM2,
        estimatedScrapAreaM2,
        estimatedWastePercentage,
        yieldEfficiencyPercentage,
    };
}
//# sourceMappingURL=calculator.engine.js.map