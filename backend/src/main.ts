import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global de API versionada
  app.setGlobalPrefix('api/v1');

  // Validación estricta de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  // CORS configurado para el frontend de Next.js
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ],
    credentials: true,
  });

  // Configuración de OpenAPI / Swagger
  const config = new DocumentBuilder()
    .setTitle('Luminadia API')
    .setDescription(
      'API REST para la plataforma web y calculadora de materiales de Luminadia (Catamarca, Argentina).',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Luminadia API Backend corriendo en: http://localhost:${port}/api/v1`);
  console.log(`📚 Documentación OpenAPI Swagger en: http://localhost:${port}/api/docs`);
}

bootstrap();
