import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InitialPreloader from '@/components/InitialPreloader';
import PageTransition from '@/components/PageTransition';
import { SiteConfigProvider } from '@/context/SiteConfigContext';
import { VisualEditorProvider } from '@/context/VisualEditorContext';
import VisualEditorToolbar from '@/components/visual-editor/VisualEditorToolbar';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Luminadia · Láminas de Control Solar con Alta Tecnología en Catamarca',
    template: '%s | Luminadia Catamarca',
  },
  description:
    'Láminas de control solar con alta tecnología para vehículos, hogares y empresas en San Fernando del Valle de Catamarca. Rechazo térmico, protección UV, privacidad y calculadora técnica de materiales.',
  keywords: [
    'láminas de control solar catamarca',
    'polarizados catamarca',
    'control solar automotriz',
    'control solar ventanas catamarca',
    'láminas para vidrieras',
    'luminadia catamarca',
    'rechazo uv catamarca',
    'calculadora de láminas',
  ],
  authors: [{ name: 'Luminadia' }],
  creator: 'Luminadia',
  metadataBase: new URL('https://luminadia.com.ar'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/images/luminadia-logo.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/images/luminadia-logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://luminadia.com.ar',
    title: 'Luminadia · Láminas de Control Solar con Alta Tecnología',
    description:
      'Soluciones en láminas de control solar para automotores, residencias y comercios en Catamarca. Calculá los materiales necesarios para tu proyecto.',
    siteName: 'Luminadia',
    images: [
      {
        url: '/images/luminadia-logo.png',
        width: 1024,
        height: 1024,
        alt: 'Luminadia · Láminas de Control Solar',
      },
    ],
  },
  alternates: {
    canonical: 'https://luminadia.com.ar',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Luminadia',
    description: 'Láminas de control solar con alta tecnología para automotores, hogares y empresas.',
    url: 'https://luminadia.com.ar',
    telephone: '+5493834272000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Padre Zanello 341',
      addressLocality: 'San Fernando del Valle de Catamarca',
      addressRegion: 'Catamarca',
      postalCode: 'K4700',
      addressCountry: 'AR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -28.4696,
      longitude: -65.7852,
    },
    sameAs: ['https://www.instagram.com/luminadia_catam/'],
    priceRange: 'Consultar estimación',
  };

  return (
    <html lang="es-AR" className={jakarta.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="min-h-[100dvh] w-full max-w-full overflow-x-hidden flex flex-col bg-white text-[#1E242B] font-sans antialiased selection:bg-[#1E242B] selection:text-white">
        <SiteConfigProvider>
          <VisualEditorProvider>
            {/* Barra flotante administrativa cuando el editor visual está activo */}
            <VisualEditorToolbar />

            {/* Preloader de arranque suave e instantáneo */}
            <InitialPreloader />

            {/* Skip Link para accesibilidad */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#1E242B] text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B3B6B9]"
            >
              Saltar al contenido principal
            </a>

            <Navbar />

            <main id="main-content" className="flex-1 pt-20 w-full max-w-full overflow-x-hidden">
              <PageTransition>
                {children}
              </PageTransition>
            </main>

            <Footer />
          </VisualEditorProvider>
        </SiteConfigProvider>
      </body>
    </html>
  );
}
