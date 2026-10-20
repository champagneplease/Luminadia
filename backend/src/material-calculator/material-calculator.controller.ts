import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, IsNumber } from 'class-validator';
import { calculateMaterialEstimationBackend, SurfacePieceInput } from './calculator.engine';

class CalculateMaterialDto {
  @ApiProperty({ example: 'hogares' })
  @IsString()
  category: string;

  @ApiProperty({ example: 'Nano Cerámica 70' })
  @IsString()
  productName: string;

  @ApiPropertyOptional({ default: 1.52 })
  @IsOptional()
  @IsNumber()
  rollWidthMeters?: number;

  @ApiPropertyOptional({ default: 1.50 })
  @IsOptional()
  @IsNumber()
  usableWidthMeters?: number;

  @ApiProperty({
    example: [{ id: '1', width: 120, height: 150, unit: 'cm', quantity: 2 }],
  })
  @IsArray()
  pieces: SurfacePieceInput[];

  @ApiPropertyOptional({ default: 2.5 })
  @IsOptional()
  @IsNumber()
  cuttingMarginCm?: number;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @IsNumber()
  safetyWastePercent?: number;
}

@ApiTags('material-calculator')
@Controller('material-calculator')
export class MaterialCalculatorController {
  @Post('estimate')
  @ApiOperation({ summary: 'Calcular superficie neta y metros de rollo necesarios (sin precios)' })
  estimate(@Body() dto: CalculateMaterialDto) {
    return calculateMaterialEstimationBackend(dto);
  }
}
