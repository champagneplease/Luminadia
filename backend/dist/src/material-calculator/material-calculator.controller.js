"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialCalculatorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const calculator_engine_1 = require("./calculator.engine");
class CalculateMaterialDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'hogares' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CalculateMaterialDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nano Cerámica 70' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CalculateMaterialDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1.52 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CalculateMaterialDto.prototype, "rollWidthMeters", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1.50 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CalculateMaterialDto.prototype, "usableWidthMeters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [{ id: '1', width: 120, height: 150, unit: 'cm', quantity: 2 }],
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CalculateMaterialDto.prototype, "pieces", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 2.5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CalculateMaterialDto.prototype, "cuttingMarginCm", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CalculateMaterialDto.prototype, "safetyWastePercent", void 0);
let MaterialCalculatorController = class MaterialCalculatorController {
    estimate(dto) {
        return (0, calculator_engine_1.calculateMaterialEstimationBackend)(dto);
    }
};
exports.MaterialCalculatorController = MaterialCalculatorController;
__decorate([
    (0, common_1.Post)('estimate'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcular superficie neta y metros de rollo necesarios (sin precios)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CalculateMaterialDto]),
    __metadata("design:returntype", void 0)
], MaterialCalculatorController.prototype, "estimate", null);
exports.MaterialCalculatorController = MaterialCalculatorController = __decorate([
    (0, swagger_1.ApiTags)('material-calculator'),
    (0, common_1.Controller)('material-calculator')
], MaterialCalculatorController);
//# sourceMappingURL=material-calculator.controller.js.map