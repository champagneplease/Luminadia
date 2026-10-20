import { Module } from '@nestjs/common';
import { FilmProductsService } from './film-products.service';
import { FilmProductsController } from './film-products.controller';

@Module({
  controllers: [FilmProductsController],
  providers: [FilmProductsService],
  exports: [FilmProductsService],
})
export class FilmProductsModule {}
