"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const calculator_js_1 = require("./calculator.js");
(0, node_test_1.describe)('Calculator Core Engine Tests', () => {
    (0, node_test_1.test)('toCentimeters converts correctly from m, cm and mm', () => {
        node_assert_1.default.strictEqual((0, calculator_js_1.toCentimeters)(1.5, 'm'), 150);
        node_assert_1.default.strictEqual((0, calculator_js_1.toCentimeters)(80, 'cm'), 80);
        node_assert_1.default.strictEqual((0, calculator_js_1.toCentimeters)(1200, 'mm'), 120);
    });
    (0, node_test_1.test)('toCentimeters throws error on zero or negative values', () => {
        node_assert_1.default.throws(() => (0, calculator_js_1.toCentimeters)(0, 'm'), /mayor a cero/);
        node_assert_1.default.throws(() => (0, calculator_js_1.toCentimeters)(-5, 'cm'), /mayor a cero/);
    });
    (0, node_test_1.test)('validatePieceInput rejects out-of-bound dimensions', () => {
        node_assert_1.default.throws(() => {
            (0, calculator_js_1.validatePieceInput)({ id: '1', width: 2, height: 100, unit: 'cm', quantity: 1 });
        }, /demasiado pequeñas/);
        node_assert_1.default.throws(() => {
            (0, calculator_js_1.validatePieceInput)({ id: '1', width: 30, height: 100, unit: 'm', quantity: 1 });
        }, /excesivas/);
        node_assert_1.default.throws(() => {
            (0, calculator_js_1.validatePieceInput)({ id: '1', width: 100, height: 100, unit: 'cm', quantity: 0 });
        }, /cantidad/);
    });
    (0, node_test_1.test)('calculateMaterialEstimation calculates net surface and linear meters accurately', () => {
        const input = {
            category: 'hogares',
            productId: 'Lámina Cerámica Nano 70',
            rollWidthMeters: calculator_js_1.STANDARD_ROLL_WIDTH_METERS, // 1.52m
            usableWidthMeters: 1.50,
            cuttingMarginCm: 2.5,
            safetyWastePercent: 10,
            pieces: [
                // Ventana 1: 120cm ancho x 150cm alto, 2 unidades
                { id: 'p1', label: 'Living', width: 120, height: 150, unit: 'cm', quantity: 2 },
                // Ventana 2: 80cm ancho x 100cm alto, 1 unidad
                { id: 'p2', label: 'Cocina', width: 80, height: 100, unit: 'cm', quantity: 1 },
            ]
        };
        const result = (0, calculator_js_1.calculateMaterialEstimation)(input);
        // Superficie neta esperada:
        // (1.2 * 1.5 * 2) = 3.6 m2
        // (0.8 * 1.0 * 1) = 0.8 m2
        // Total neto = 4.4 m2
        node_assert_1.default.strictEqual(result.netSurfaceAreaM2, 4.4);
        node_assert_1.default.strictEqual(result.piecesCount, 3);
        node_assert_1.default.strictEqual(result.piecesDetails.length, 2);
        // Debe existir un número positivo coherente de metros lineales requeridos
        node_assert_1.default.ok(result.estimatedLinearMetersNeeded > 0);
        node_assert_1.default.ok(result.totalRollAreaConsumedM2 >= result.netSurfaceAreaM2);
        node_assert_1.default.ok(result.yieldEfficiencyPercentage > 0 && result.yieldEfficiencyPercentage <= 100);
        // No debe contener precios en sus supuestos
        for (const assumption of result.assumptions) {
            node_assert_1.default.doesNotMatch(assumption, /\$|pesos|precio|cotización|arancel|tarifa/i);
        }
    });
    (0, node_test_1.test)('calculateMaterialEstimation adds curved glass disclaimer for automotive projects', () => {
        const input = {
            category: 'automotriz',
            productId: 'Lámina Nano Carbón 20',
            rollWidthMeters: 1.52,
            pieces: [
                { id: 'p1', label: 'Parabrisas', width: 140, height: 85, unit: 'cm', quantity: 1 }
            ]
        };
        const result = (0, calculator_js_1.calculateMaterialEstimation)(input);
        node_assert_1.default.strictEqual(result.isCurvedGlassDisclaimer, true);
        node_assert_1.default.ok(result.assumptions.some(a => a.includes('curvados') || a.includes('termoformado')));
    });
    (0, node_test_1.test)('generateWhatsAppConsultationUrl formats properly and includes telephone and message', () => {
        const input = {
            category: 'comercios-empresas',
            productId: 'Lámina Espejada Titanio',
            rollWidthMeters: 1.52,
            pieces: [
                { id: 'p1', label: 'Vidriera Local', width: 2.0, height: 1.8, unit: 'm', quantity: 2 }
            ]
        };
        const result = (0, calculator_js_1.calculateMaterialEstimation)(input);
        const url = (0, calculator_js_1.generateWhatsAppConsultationUrl)(result, 'Juan Pérez', 'Proyecto en centro de Catamarca');
        node_assert_1.default.ok(url.startsWith('https://wa.me/5493834272000?text='));
        const decoded = decodeURIComponent(url);
        node_assert_1.default.ok(decoded.includes('CONSULTA DE MATERIALES — LUMINADIA'));
        node_assert_1.default.ok(decoded.includes('Juan Pérez'));
        node_assert_1.default.ok(decoded.includes('Vidriera Local') || decoded.includes('Comercios'));
        node_assert_1.default.ok(decoded.includes('7.2 m²'));
    });
});
//# sourceMappingURL=calculator.test.js.map