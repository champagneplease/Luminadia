import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject, IsNumber } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({ example: 'automotriz' })
  @IsString()
  category: string;

  @ApiPropertyOptional({ example: 'Nano Cerámica 20' })
  @IsOptional()
  @IsString()
  productName?: string;

  @ApiProperty({ example: 'Carlos Bazán' })
  @IsString()
  contactName: string;

  @ApiProperty({ example: '+54 9 383 456-7890' })
  @IsString()
  contactPhone: string;

  @ApiPropertyOptional({ example: 'carlos@ejemplo.com' })
  @IsOptional()
  @IsString()
  contactEmail?: string;

  @ApiPropertyOptional({ example: 'Toyota Hilux 2022' })
  @IsOptional()
  @IsString()
  vehicleDetails?: string;

  @ApiPropertyOptional({ example: 'Consulta por colocación de lámina térmica' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  netSurfaceAreaM2?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  estimatedLinearMeters?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  rollWidthUsed?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  piecesCount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  calculationSummary?: any;
}
