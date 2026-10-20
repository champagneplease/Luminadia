import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestStatus } from '@prisma/client';

@Injectable()
export class RequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRequestDto) {
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
        status: RequestStatus.NUEVA,
      },
    });
  }

  async findAll(status?: RequestStatus, category?: string) {
    const where: any = {};
    if (status) where.status = status;
    if (category) where.category = category;

    return this.prisma.calculatorRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const request = await this.prisma.calculatorRequest.findUnique({
      where: { id },
    });
    if (!request) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada.`);
    }
    return request;
  }

  async updateStatus(id: string, status: RequestStatus, internalNotes?: string) {
    return this.prisma.calculatorRequest.update({
      where: { id },
      data: {
        status,
        ...(internalNotes !== undefined && { internalNotes }),
      },
    });
  }
}
