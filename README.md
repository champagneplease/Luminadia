# LUMINADIA — Plataforma Web y Calculadora de Materiales

Plataforma digital corporativa y calculadora técnica de insumos para **Luminadia**, empresa de San Fernando del Valle de Catamarca (Argentina), especializada en láminas de control solar con alta tecnología para sectores automotriz, residencial y corporativo.

---

## 1. Arquitectura del Proyecto

El sistema está organizado en una arquitectura modular limpia, mantenible y escalable:

```
LuminADia/
├── frontend/                 # Aplicación Next.js 16 con App Router, Tailwind CSS v4 y TypeScript
│   ├── src/app/              # Rutas públicas, páginas de servicios, calculadora y panel /admin
│   ├── src/components/       # Componentes accesibles (Navbar, Footer, FaqAccordion)
│   └── public/images/        # Recursos multimedia y fotografías de cristal y taller
├── backend/                  # API REST modular desarrollada con NestJS 11 y TypeScript
│   ├── prisma/               # Esquema de base de datos relacional y scripts de seed
│   ├── src/film-products/    # Módulo de catálogo técnico de láminas
│   ├── src/requests/         # Módulo de gestión y persistencia de consultas/cálculos
│   ├── src/material-calculator/# Motor de cálculo técnico en servidor
│   ├── src/auth/             # Autenticación y JWT para administradores
│   └── src/content/          # CMS de configuración y contenidos del sitio
├── packages/shared/          # Motor matemático de cálculo de superficies y rollos con pruebas unitarias
├── docker-compose.yml        # Servicio PostgreSQL 16 local con volumen y healthcheck
└── DESIGN.md                 # Especificación del sistema de diseño (dirección dark-room anti-slop)
```

---

## 2. Información de la Empresa

- **Razón Social:** Luminadia.
- **Actividad:** Láminas de control solar con alta tecnología (nano cerámica, carbón y arquitectónicas).
- **Dirección:** Padre Zanello 341, San Fernando del Valle de Catamarca, Argentina.
- **WhatsApp Oficial:** [+54 9 383 427-2000](https://wa.me/5493834272000)
- **Instagram:** [@luminadia_catam](https://www.instagram.com/luminadia_catam/)

---

## 3. Principio de la Calculadora de Materiales

> **Importante:** La calculadora de Luminadia no es un cotizador comercial. No calcula importes en dinero, tarifas por metro cuadrado ni presupuestos automáticos.

Su objetivo es la **estimación técnica de insumos físicos**:
1. **Superficie neta ($m^2$):** Sumatoria del área exacta de los cristales (ancho $\times$ alto $\times$ cantidad).
2. **Aprovechamiento de bobina:** Cálculo de metros lineales de rollo a retirar según el ancho estándar (1.52 m / ancho útil de 1.50 m) y la orientación de corte.
3. **Mermas técnicas:** Considera margen de recorte perimetral para instalación manual (2.5 cm) y factor de desperdicio técnico (10% a 15% según sea residencial o automotriz).
4. **Integración con WhatsApp:** Genera un mensaje detallado listo para enviar a Luminadia y permite registrar la solicitud formalmente en el servidor.

---

## 4. Requisitos Previos e Instalación

### Requisitos:
- **Node.js:** v20+ o v22+
- **Docker y Docker Compose:** Para la base de datos PostgreSQL

### Pasos de inicialización:

#### 1. Iniciar Base de Datos con Docker
```bash
docker compose up -d
```
El contenedor `luminadia-postgres` se iniciará en el puerto `5433` (mapeado para evitar colisiones con instancias locales preexistentes).

#### 2. Configurar y Ejecutar el Backend (NestJS)
```bash
cd backend
npm install --cache /tmp/npm-cache
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts
npm run start:prod
```
- API REST: `http://localhost:3001/api/v1`
- Documentación interactiva Swagger: `http://localhost:3001/api/docs`

#### 3. Ejecutar el Frontend (Next.js)
```bash
cd ../frontend
npm install
npm run dev
```
- Plataforma pública y calculadora: `http://localhost:3000`
- Panel administrativo CMS: `http://localhost:3000/admin`

---

## 5. Credenciales del Panel Administrativo (`/admin`)

- **URL:** `http://localhost:3000/admin`
- **Usuario:** `admin@luminadia.com.ar`
- **Contraseña:** `Luminadia2026!` (o clave rápida `admin`)

Desde el panel se puede:
- Ver métricas y solicitudes de clientes con filtros de estado (`nueva`, `en_analisis`, `contactado`, `instalado`, `archivado`).
- Consultar los cálculos de material adjuntos (superficie neta, metros de bobina, piezas).
- Modificar textos del Hero, teléfonos, dirección y redes sociales.
- Ajustar anchos estándar de rollo y factores de merma técnica.

---

## 6. Pruebas Automatizadas

El motor de cálculo cuenta con pruebas unitarias que validan conversiones de unidades ($m$, $cm$, $mm$), dimensiones físicas válidas, cálculo de metros lineales, advertencias de cristales curvos y ausencia de importes monetarios:

```bash
cd packages/shared
npm test
```

Para validar la compilación estricta del frontend y del backend:
```bash
# Frontend Next.js build
cd frontend && npm run build

# Backend NestJS build
cd backend && npm run build
```

---

## 7. SEO Técnico y Posicionamiento Local

- Metadatos optimizados por ruta en español argentino (`es-AR`).
- Open Graph cards configuradas.
- Schema estructurado JSON-LD con tipo `LocalBusiness` para San Fernando del Valle de Catamarca.
- Mapa de sitio generado dinámicamente en `/sitemap.xml`.
- Archivo `/robots.txt` protegiendo las rutas del panel administrativo `/admin`.
- Página 404 personalizada con navegación de rescate.
