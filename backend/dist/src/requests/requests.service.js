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
exports.RequestsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let RequestsService = class RequestsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const calc = dto.calculationSummary;
        return this.prisma.calculatorRequest.create({
            data: {
                category: dto.category,
                productName: dto.productName || calc?.productName,
                contactName: dto.contactName,
                contactPhone: dto.contactPhone,
                contactEmail: dto.contactEmail,
                vehicleDetails: dto.vehicleDetails,
                notes: dto.notes,
                netSurfaceAreaM2: dto.netSurfaceAreaM2 || calc?.netSurfaceAreaM2,
                estimatedLinearMeters: dto.estimatedLinearMeters || calc?.estimatedLinearMetersNeeded,
                rollWidthUsed: dto.rollWidthUsed || calc?.rollWidthMeters,
                piecesCount: dto.piecesCount || calc?.piecesCount,
                calculationDetailJson: calc || null,
                status: client_1.RequestStatus.NUEVA,
            },
        });
    }
    async findAll(status, category) {
        const where = {};
        if (status)
            where.status = status;
        if (category)
            where.category = category;
        return this.prisma.calculatorRequest.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const request = await this.prisma.calculatorRequest.findUnique({
            where: { id },
        });
        if (!request) {
            throw new common_1.NotFoundException(`Solicitud con ID ${id} no encontrada.`);
        }
        return request;
    }
    async updateStatus(id, status, internalNotes) {
        return this.prisma.calculatorRequest.update({
            where: { id },
            data: {
                status,
                ...(internalNotes !== undefined && { internalNotes }),
            },
        });
    }
};
exports.RequestsService = RequestsService;
exports.RequestsService = RequestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RequestsService);
//# sourceMappingURL=requests.service.js.map