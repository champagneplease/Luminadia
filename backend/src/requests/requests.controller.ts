import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestStatus } from '@prisma/client';

@ApiTags('requests')
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @ApiOperation({ summary: 'Guardar solicitud de consulta o cálculo de materiales' })
  create(@Body() dto: CreateRequestDto) {
    return this.requestsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar solicitudes recibidas con filtros (Admin)' })
  @ApiQuery({ name: 'status', required: false, enum: RequestStatus })
  @ApiQuery({ name: 'category', required: false })
  findAll(
    @Query('status') status?: RequestStatus,
    @Query('category') category?: string,
  ) {
    return this.requestsService.findAll(status, category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver detalle de una solicitud (Admin)' })
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Actualizar estado y notas de una solicitud (Admin)' })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: RequestStatus,
    @Body('internalNotes') internalNotes?: string,
  ) {
    return this.requestsService.updateStatus(id, status, internalNotes);
  }
}
