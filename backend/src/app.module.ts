import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FilmProductsModule } from './film-products/film-products.module';
import { RequestsModule } from './requests/requests.module';
import { MaterialCalculatorModule } from './material-calculator/material-calculator.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    FilmProductsModule,
    RequestsModule,
    MaterialCalculatorModule,
    ContentModule,
  ],
})
export class AppModule {}
