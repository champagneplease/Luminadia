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
exports.FilmProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const film_products_service_1 = require("./film-products.service");
const create_film_product_dto_1 = require("./dto/create-film-product.dto");
let FilmProductsController = class FilmProductsController {
    constructor(filmProductsService) {
        this.filmProductsService = filmProductsService;
    }
    findAll(category) {
        return this.filmProductsService.findAll(category);
    }
    findOne(slug) {
        return this.filmProductsService.findOne(slug);
    }
    create(dto) {
        return this.filmProductsService.create(dto);
    }
    update(id, dto) {
        return this.filmProductsService.update(id, dto);
    }
    remove(id) {
        return this.filmProductsService.remove(id);
    }
};
exports.FilmProductsController = FilmProductsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener catálogo de láminas activas' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, description: 'Filtrar por categoría (automotriz, hogares, comercios-empresas)' }),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FilmProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener detalle técnico de una lámina por slug' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FilmProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear nueva lámina (Admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_film_product_dto_1.CreateFilmProductDto]),
    __metadata("design:returntype", void 0)
], FilmProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar especificaciones de una lámina (Admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FilmProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar o desactivar lámina (Admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FilmProductsController.prototype, "remove", null);
exports.FilmProductsController = FilmProductsController = __decorate([
    (0, swagger_1.ApiTags)('film-products'),
    (0, common_1.Controller)('film-products'),
    __metadata("design:paramtypes", [film_products_service_1.FilmProductsService])
], FilmProductsController);
//# sourceMappingURL=film-products.controller.js.map