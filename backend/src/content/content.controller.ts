import { Controller, Get, Patch, Post, Param, Body, Headers, UnauthorizedException } from '@nestjs/common';
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

  @Get('draft-settings')
  @ApiOperation({ summary: 'Obtener configuraciones en borrador del editor visual' })
  getDraftSettings() {
    return this.contentService.getDraftSettings();
  }

  @Patch('settings/:key')
  @ApiOperation({ summary: 'Actualizar configuración del sitio (Admin)' })
  updateSetting(@Param('key') key: string, @Body('value') value: string) {
    return this.contentService.updateSetting(key, value);
  }

  @Post('batch')
  @ApiOperation({ summary: 'Actualizar múltiples contenidos del editor visual en una sola operación' })
  updateBatch(
    @Body('settings') settings: Record<string, string>,
    @Body('userId') userId?: string,
  ) {
    return this.contentService.updateBatchSettings(settings, userId);
  }

  @Post('draft')
  @ApiOperation({ summary: 'Guardar borrador del editor visual sin alterar la versión pública' })
  saveDraft(
    @Body('settings') settings: Record<string, string>,
    @Body('userId') userId?: string,
  ) {
    return this.contentService.saveDraftSettings(settings, userId);
  }

  @Post('publish')
  @ApiOperation({ summary: 'Publicar el borrador del editor visual en la web pública' })
  publishDraft(@Body('userId') userId?: string) {
    return this.contentService.publishDraft(userId);
  }

  @Post('discard-draft')
  @ApiOperation({ summary: 'Descartar cambios no publicados del borrador' })
  discardDraft() {
    return this.contentService.discardDraft();
  }
}
