import { test, describe } from 'node:test';
import assert from 'node:assert';
import {
  toCentimeters,
  validatePieceInput,
  calculateMaterialEstimation,
  generateWhatsAppConsultationUrl,
  STANDARD_ROLL_WIDTH_METERS
} from './calculator.js';
import { CalculatorCalculationInput } from './types.js';

describe('Calculator Core Engine Tests', () => {
  test('toCentimeters converts correctly from m, cm and mm', () => {
    assert.strictEqual(toCentimeters(1.5, 'm'), 150);
    assert.strictEqual(toCentimeters(80, 'cm'), 80);
    assert.strictEqual(toCentimeters(1200, 'mm'), 120);
  });

  test('toCentimeters throws error on zero or negative values', () => {
    assert.throws(() => toCentimeters(0, 'm'), /mayor a cero/);
    assert.throws(() => toCentimeters(-5, 'cm'), /mayor a cero/);
  });

  test('validatePieceInput rejects out-of-bound dimensions', () => {
    assert.throws(() => {
      validatePieceInput({ id: '1', width: 2, height: 100, unit: 'cm', quantity: 1 });
    }, /demasiado pequeñas/);

    assert.throws(() => {
      validatePieceInput({ id: '1', width: 30, height: 100, unit: 'm', quantity: 1 });
    }, /excesivas/);

    assert.throws(() => {
      validatePieceInput({ id: '1', width: 100, height: 100, unit: 'cm', quantity: 0 });
    }, /cantidad/);
  });

  test('calculateMaterialEstimation calculates net surface and linear meters accurately', () => {
    const input: CalculatorCalculationInput = {
      category: 'hogares',
      productId: 'Lámina Cerámica Nano 70',
      rollWidthMeters: STANDARD_ROLL_WIDTH_METERS, // 1.52m
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

    const result = calculateMaterialEstimation(input);

    // Superficie neta esperada:
    // (1.2 * 1.5 * 2) = 3.6 m2
    // (0.8 * 1.0 * 1) = 0.8 m2
    // Total neto = 4.4 m2
    assert.strictEqual(result.netSurfaceAreaM2, 4.4);
    assert.strictEqual(result.piecesCount, 3);
    assert.strictEqual(result.piecesDetails.length, 2);

    // Debe existir un número positivo coherente de metros lineales requeridos
    assert.ok(result.estimatedLinearMetersNeeded > 0);
    assert.ok(result.totalRollAreaConsumedM2 >= result.netSurfaceAreaM2);
    assert.ok(result.yieldEfficiencyPercentage > 0 && result.yieldEfficiencyPercentage <= 100);

    // No debe contener precios en sus supuestos
    for (const assumption of result.assumptions) {
      assert.doesNotMatch(assumption, /\$|pesos|precio|cotización|arancel|tarifa/i);
    }
  });

  test('calculateMaterialEstimation adds curved glass disclaimer for automotive projects', () => {
    const input: CalculatorCalculationInput = {
      category: 'automotriz',
      productId: 'Lámina Nano Carbón 20',
      rollWidthMeters: 1.52,
      pieces: [
        { id: 'p1', label: 'Parabrisas', width: 140, height: 85, unit: 'cm', quantity: 1 }
      ]
    };

    const result = calculateMaterialEstimation(input);
    assert.strictEqual(result.isCurvedGlassDisclaimer, true);
    assert.ok(result.assumptions.some(a => a.includes('curvados') || a.includes('termoformado')));
  });

  test('generateWhatsAppConsultationUrl formats properly and includes telephone and message', () => {
    const input: CalculatorCalculationInput = {
      category: 'comercios-empresas',
      productId: 'Lámina Espejada Titanio',
      rollWidthMeters: 1.52,
      pieces: [
        { id: 'p1', label: 'Vidriera Local', width: 2.0, height: 1.8, unit: 'm', quantity: 2 }
      ]
    };

    const result = calculateMaterialEstimation(input);
    const url = generateWhatsAppConsultationUrl(result, 'Juan Pérez', 'Proyecto en centro de Catamarca');

    assert.ok(url.startsWith('https://wa.me/5493834272000?text='));
    const decoded = decodeURIComponent(url);
    assert.ok(decoded.includes('CONSULTA DE MATERIALES · LUMINADIA'));
    assert.ok(decoded.includes('Juan Pérez'));
    assert.ok(decoded.includes('Vidriera Local') || decoded.includes('Comercios'));
    assert.ok(decoded.includes('7.2 m²'));
  });
});
