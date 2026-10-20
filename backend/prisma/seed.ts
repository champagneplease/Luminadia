import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed de base de datos...');

  // 1. Admin inicial
  const adminPasswordHash = await bcrypt.hash('Luminadia2026!', 10);
  await prisma.user.upsert({
    where: { email: 'admin@luminadia.com.ar' },
    update: {},
    create: {
      email: 'admin@luminadia.com.ar',
      name: 'Administrador Luminadia',
      passwordHash: adminPasswordHash,
      role: Role.SUPERADMIN,
    },
  });
  console.log('✔ Usuario administrador seed completado.');

  // 2. Catálogo de productos
  const films = [
    {
      id: 'prod-nano-70',
      name: 'Nano Cerámica Térmica 70 (Clara)',
      slug: 'nano-ceramica-70',
      code: 'NC-70',
      description: 'Máximo rechazo térmico con alta transmisión de luz. Ideal para parabrisas y vidrieras comerciales.',
      categories: ['automotriz', 'hogares', 'comercios-empresas'],
      rollWidthMeters: 1.52,
      usableWidthMeters: 1.50,
      standardRollLengthMeters: 30,
      vltPercent: 70,
      uvRejectionPercent: 99,
      irRejectionPercent: 88,
      tserPercent: 52,
      colorShade: 'Tono claro imperceptible',
      technology: 'Nano Cerámica de Titanio',
      warrantyYears: 10,
      active: true,
      order: 1,
    },
    {
      id: 'prod-nano-20',
      name: 'Nano Cerámica Carbón 20 (Intermedia)',
      slug: 'nano-ceramica-carbon-20',
      code: 'NC-20',
      description: 'Equilibrio perfecto entre privacidad, reducción de resplandor y confort térmico superior.',
      categories: ['automotriz', 'hogares', 'comercios-empresas'],
      rollWidthMeters: 1.52,
      usableWidthMeters: 1.50,
      standardRollLengthMeters: 30,
      vltPercent: 20,
      uvRejectionPercent: 99,
      irRejectionPercent: 82,
      tserPercent: 64,
      colorShade: 'Negro grafito intermedio',
      technology: 'Nano Cerámica / Carbón',
      warrantyYears: 10,
      active: true,
      order: 2,
    },
    {
      id: 'prod-nano-05',
      name: 'Nano Cerámica Carbón 05 (Oscura / Privacidad)',
      slug: 'nano-ceramica-carbon-05',
      code: 'NC-05',
      description: 'Máxima privacidad exterior y rechazo solar para ventanales expuestos y laterales vehiculares.',
      categories: ['automotriz', 'hogares', 'comercios-empresas'],
      rollWidthMeters: 1.52,
      usableWidthMeters: 1.50,
      standardRollLengthMeters: 30,
      vltPercent: 5,
      uvRejectionPercent: 99,
      irRejectionPercent: 85,
      tserPercent: 68,
      colorShade: 'Negro grafito profundo',
      technology: 'Carbón Estable',
      warrantyYears: 10,
      active: true,
      order: 3,
    },
    {
      id: 'prod-arq-espejada',
      name: 'Arquitectónica Dual Reflectiva (Plata / Humo)',
      slug: 'arquitectonica-dual-reflectiva',
      code: 'ARQ-15',
      description: 'Especial para control térmico exterior en fachadas comerciales y ventanales residenciales oeste.',
      categories: ['hogares', 'comercios-empresas'],
      rollWidthMeters: 1.52,
      usableWidthMeters: 1.50,
      standardRollLengthMeters: 30,
      vltPercent: 15,
      uvRejectionPercent: 99,
      irRejectionPercent: 78,
      tserPercent: 72,
      colorShade: 'Espejado exterior / Neutro interior',
      technology: 'Metalizada pulverizada',
      warrantyYears: 7,
      active: true,
      order: 4,
    },
    {
      id: 'prod-seguridad-4mil',
      name: 'Seguridad Antivandálica 4 Milésimas',
      slug: 'seguridad-antivandalica-4mil',
      code: 'SEG-4M',
      description: 'Lámina transparente de protección que retiene fragmentos de vidrio ante roturas o impactos.',
      categories: ['automotriz', 'comercios-empresas'],
      rollWidthMeters: 1.52,
      usableWidthMeters: 1.50,
      standardRollLengthMeters: 30,
      vltPercent: 88,
      uvRejectionPercent: 99,
      irRejectionPercent: 35,
      tserPercent: 38,
      colorShade: 'Transparente cristal',
      technology: 'Poliéster Multicapa Ultra Resistente',
      warrantyYears: 5,
      active: true,
      order: 5,
    },
  ];

  for (const film of films) {
    await prisma.filmProduct.upsert({
      where: { slug: film.slug },
      update: film,
      create: film,
    });
  }
  console.log(`✔ ${films.length} láminas del catálogo sincronizadas.`);

  // 3. Solicitud inicial de demostración
  await prisma.calculatorRequest.create({
    data: {
      category: 'automotriz',
      productName: 'Nano Cerámica Carbón 20',
      contactName: 'Carlos Bazán',
      contactPhone: '+54 9 383 456-7890',
      contactEmail: 'carlos.bazan@gmail.com',
      vehicleDetails: 'Toyota Hilux 2022 (Doble Cabina)',
      notes: 'Consulta por colocación de lámina nano cerámica en laterales y luneta trasera. Prioridad rechazo calórico.',
      netSurfaceAreaM2: 2.35,
      estimatedLinearMeters: 3.2,
      rollWidthUsed: 1.52,
      piecesCount: 5,
    },
  });
  console.log('✔ Solicitud de prueba inicial creada.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
