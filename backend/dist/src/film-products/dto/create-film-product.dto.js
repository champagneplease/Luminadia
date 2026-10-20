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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFilmProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateFilmProductDto {
}
exports.CreateFilmProductDto = CreateFilmProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nano Cerámica 70' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFilmProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'nano-ceramica-70' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFilmProductDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'NC-70' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFilmProductDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Máximo rechazo térmico con alta transmisión de luz.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFilmProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['automotriz', 'hogares', 'comercios-empresas'] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateFilmProductDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1.52 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFilmProductDto.prototype, "rollWidthMeters", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1.50 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFilmProductDto.prototype, "usableWidthMeters", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 70 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFilmProductDto.prototype, "vltPercent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 88 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFilmProductDto.prototype, "irRejectionPercent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 99 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFilmProductDto.prototype, "uvRejectionPercent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Claro óptico' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFilmProductDto.prototype, "colorShade", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Nano Cerámica de Titanio' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFilmProductDto.prototype, "technology", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateFilmProductDto.prototype, "active", void 0);
//# sourceMappingURL=create-film-product.dto.js.map