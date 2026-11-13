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
    async updateBatchSettings(settings, userId) {
        const keys = Object.keys(settings);
        if (keys.length === 0)
            return { success: true, count: 0 };
        const operations = keys.map((key) => this.prisma.siteSetting.upsert({
            where: { key },
            update: { value: settings[key] },
            create: { key, value: settings[key] },
        }));
        const results = await this.prisma.$transaction(operations);
        if (userId) {
            await this.prisma.auditLog
                .create({
                data: {
                    userId,
                    action: 'UPDATE_VISUAL_EDITOR_CONTENT',
                    entity: 'site_settings',
                    detailsJson: { updatedKeys: keys },
                },
            })
                .catch(() => { });
        }
        return { success: true, count: results.length };
    }
    async saveDraftSettings(settings, userId) {
        const keys = Object.keys(settings);
        if (keys.length === 0)
            return { success: true, count: 0 };
        const operations = keys.map((key) => {
            const draftKey = key.startsWith('draft_') ? key : `draft_${key}`;
            return this.prisma.siteSetting.upsert({
                where: { key: draftKey },
                update: { value: settings[key] },
                create: { key: draftKey, value: settings[key] },
            });
        });
        const results = await this.prisma.$transaction(operations);
        return { success: true, count: results.length };
    }
    async getDraftSettings() {
        return this.prisma.siteSetting.findMany({
            where: { key: { startsWith: 'draft_' } },
        });
    }
    async publishDraft(userId) {
        const drafts = await this.prisma.siteSetting.findMany({
            where: { key: { startsWith: 'draft_' } },
        });
        if (drafts.length === 0) {
            return { success: true, publishedCount: 0 };
        }
        const publishOps = drafts.map((d) => {
            const targetKey = d.key.replace(/^draft_/, '');
            return this.prisma.siteSetting.upsert({
                where: { key: targetKey },
                update: { value: d.value },
                create: { key: targetKey, value: d.value },
            });
        });
        await this.prisma.$transaction(publishOps);
        await this.prisma.siteSetting.deleteMany({
            where: { key: { startsWith: 'draft_' } },
        });
        if (userId) {
            await this.prisma.auditLog
                .create({
                data: {
                    userId,
                    action: 'PUBLISH_VISUAL_EDITOR_DRAFT',
                    entity: 'site_settings',
                    detailsJson: { publishedKeys: drafts.map((d) => d.key.replace(/^draft_/, '')) },
                },
            })
                .catch(() => { });
        }
        return { success: true, publishedCount: publishOps.length };
    }
    async discardDraft() {
        const deleted = await this.prisma.siteSetting.deleteMany({
            where: { key: { startsWith: 'draft_' } },
        });
        return { success: true, discardedCount: deleted.count };
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentService);
//# sourceMappingURL=content.service.js.map