import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateFilmProductDto {
  @ApiProperty({ example: 'Nano Cerámica 70' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'nano-ceramica-70' })
  @IsString()
  slug: string;

  @ApiPropertyOptional({ example: 'NC-70' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ example: 'Máximo rechazo térmico con alta transmisión de luz.' })
  @IsString()
  description: string;

  @ApiProperty({ example: ['automotriz', 'hogares', 'comercios-empresas'] })
  @IsArray()
  categories: string[];

  @ApiPropertyOptional({ default: 1.52 })
  @IsOptional()
  @IsNumber()
  rollWidthMeters?: number;

  @ApiPropertyOptional({ default: 1.50 })
  @IsOptional()
  @IsNumber()
  usableWidthMeters?: number;

  @ApiPropertyOptional({ example: 70 })
  @IsOptional()
  @IsNumber()
  vltPercent?: number;

  @ApiPropertyOptional({ example: 88 })
  @IsOptional()
  @IsNumber()
  irRejectionPercent?: number;

  @ApiPropertyOptional({ example: 99 })
  @IsOptional()
  @IsNumber()
  uvRejectionPercent?: number;

  @ApiPropertyOptional({ example: 'Claro óptico' })
  @IsOptional()
  @IsString()
  colorShade?: string;

  @ApiPropertyOptional({ example: 'Nano Cerámica de Titanio' })
  @IsOptional()
  @IsString()
  technology?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
