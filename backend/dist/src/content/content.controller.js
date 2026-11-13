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
exports.ContentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const content_service_1 = require("./content.service");
let ContentController = class ContentController {
    constructor(contentService) {
        this.contentService = contentService;
    }
    getSettings() {
        return this.contentService.getAllSettings();
    }
    getDraftSettings() {
        return this.contentService.getDraftSettings();
    }
    updateSetting(key, value) {
        return this.contentService.updateSetting(key, value);
    }
    updateBatch(settings, userId) {
        return this.contentService.updateBatchSettings(settings, userId);
    }
    saveDraft(settings, userId) {
        return this.contentService.saveDraftSettings(settings, userId);
    }
    publishDraft(userId) {
        return this.contentService.publishDraft(userId);
    }
    discardDraft() {
        return this.contentService.discardDraft();
    }
};
exports.ContentController = ContentController;
__decorate([
    (0, common_1.Get)('settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener configuraciones públicas del sitio' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Get)('draft-settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener configuraciones en borrador del editor visual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "getDraftSettings", null);
__decorate([
    (0, common_1.Patch)('settings/:key'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar configuración del sitio (Admin)' }),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Body)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "updateSetting", null);
__decorate([
    (0, common_1.Post)('batch'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar múltiples contenidos del editor visual en una sola operación' }),
    __param(0, (0, common_1.Body)('settings')),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "updateBatch", null);
__decorate([
    (0, common_1.Post)('draft'),
    (0, swagger_1.ApiOperation)({ summary: 'Guardar borrador del editor visual sin alterar la versión pública' }),
    __param(0, (0, common_1.Body)('settings')),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "saveDraft", null);
__decorate([
    (0, common_1.Post)('publish'),
    (0, swagger_1.ApiOperation)({ summary: 'Publicar el borrador del editor visual en la web pública' }),
    __param(0, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "publishDraft", null);
__decorate([
    (0, common_1.Post)('discard-draft'),
    (0, swagger_1.ApiOperation)({ summary: 'Descartar cambios no publicados del borrador' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "discardDraft", null);
exports.ContentController = ContentController = __decorate([
    (0, swagger_1.ApiTags)('content'),
    (0, common_1.Controller)('content'),
    __metadata("design:paramtypes", [content_service_1.ContentService])
], ContentController);
//# sourceMappingURL=content.controller.js.map