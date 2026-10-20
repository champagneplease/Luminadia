import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { FilmProductsService } from './film-products.service';
import { CreateFilmProductDto } from './dto/create-film-product.dto';

@ApiTags('film-products')
@Controller('film-products')
export class FilmProductsController {
  constructor(private readonly filmProductsService: FilmProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener catálogo de láminas activas' })
  @ApiQuery({ name: 'category', required: false, description: 'Filtrar por categoría (automotriz, hogares, comercios-empresas)' })
  findAll(@Query('category') category?: string) {
    return this.filmProductsService.findAll(category);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Obtener detalle técnico de una lámina por slug' })
  findOne(@Param('slug') slug: string) {
    return this.filmProductsService.findOne(slug);
  }

  @Post()
  @ApiOperation({ summary: 'Crear nueva lámina (Admin)' })
  create(@Body() dto: CreateFilmProductDto) {
    return this.filmProductsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar especificaciones de una lámina (Admin)' })
  update(@Param('id') id: string, @Body() dto: Partial<CreateFilmProductDto>) {
    return this.filmProductsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar o desactivar lámina (Admin)' })
  remove(@Param('id') id: string) {
    return this.filmProductsService.remove(id);
  }
}
