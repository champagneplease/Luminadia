import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@luminadia.com.ar' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Luminadia2026!' })
  @IsString()
  @MinLength(4)
  password: string;
}
