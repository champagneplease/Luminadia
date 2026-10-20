import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFilmProductDto } from './dto/create-film-product.dto';

@Injectable()
export class FilmProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(category?: string) {
    if (category) {
      return this.prisma.filmProduct.findMany({
        where: {
          active: true,
          categories: { has: category },
        },
        orderBy: { order: 'asc' },
      });
    }
    return this.prisma.filmProduct.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(slug: string) {
    const product = await this.prisma.filmProduct.findUnique({
      where: { slug },
    });
    if (!product) {
      throw new NotFoundException(`Lámina con slug ${slug} no encontrada.`);
    }
    return product;
  }

  async create(dto: CreateFilmProductDto) {
    return this.prisma.filmProduct.create({
      data: dto,
    });
  }

  async update(id: string, dto: Partial<CreateFilmProductDto>) {
    return this.prisma.filmProduct.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.filmProduct.delete({
      where: { id },
    });
  }
}
