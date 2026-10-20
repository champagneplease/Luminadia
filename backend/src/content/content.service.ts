import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    // Seed default site settings if empty
    const settingsCount = await this.prisma.siteSetting.count();
    if (settingsCount === 0) {
      await this.prisma.siteSetting.createMany({
        data: [
          { key: 'business_name', value: 'Luminadia', description: 'Nombre oficial de la empresa' },
          { key: 'address', value: 'Padre Zanello 341, San Fernando del Valle de Catamarca', description: 'Dirección física' },
          { key: 'phone_whatsapp', value: '+5493834272000', description: 'WhatsApp oficial' },
          { key: 'instagram', value: 'https://www.instagram.com/luminadia_catam/', description: 'Instagram oficial' },
          { key: 'default_roll_width', value: '1.52', description: 'Ancho estándar de rollos de control solar' },
        ],
      });
      console.log('✔ Configuraciones de sitio de Luminadia inicializadas.');
    }
  }

  async getAllSettings() {
    return this.prisma.siteSetting.findMany();
  }

  async updateSetting(key: string, value: string) {
    return this.prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
}
