import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContentService } from './content.service';

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('settings')
  @ApiOperation({ summary: 'Obtener configuraciones públicas del sitio' })
  getSettings() {
    return this.contentService.getAllSettings();
  }

  @Patch('settings/:key')
  @ApiOperation({ summary: 'Actualizar configuración del sitio (Admin)' })
  updateSetting(@Param('key') key: string, @Body('value') value: string) {
    return this.contentService.updateSetting(key, value);
  }
}
