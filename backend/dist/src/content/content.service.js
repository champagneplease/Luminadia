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
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ContentService = class ContentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        const settingsCount = await this.prisma.siteSetting.count();
        if (settingsCount === 0) {
            await this.prisma.siteSetting.createMany({
                data: [
                    { key: 'business_name', value: 'Luminadia', description: 'Nombre oficial de la empresa' },
                    { key: 'address', value: 'Padre Zanello 341, San Fernando del Valle de Catamarca', description: 'Dirección física' },
                    { key: 'phone_whatsapp', value: '+5493834272000', description: 'WhatsApp oficial' },
                    { key: 'instagram', value: 'https://www.instagram.com/luminadia_catam/', description: 'Instagram oficial' },
                    { key: 'default_roll_width', value: '1.52', description: 'Ancho estándar de rollos de control solar' },
                ],
            });
            console.log('✔ Configuraciones de sitio de Luminadia inicializadas.');
        }
    }
    async getAllSettings() {
        return this.prisma.siteSetting.findMany();
    }
    async updateSetting(key, value) {
        return this.prisma.siteSetting.upsert({
            where: { key },
            update: { value },
            create: { key, value },
        });
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentService);
//# sourceMappingURL=content.service.js.map