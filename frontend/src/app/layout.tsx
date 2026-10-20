import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Luminadia — Láminas de Control Solar con Alta Tecnología en Catamarca',
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
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://luminadia.com.ar',
    title: 'Luminadia — Láminas de Control Solar con Alta Tecnología',
    description:
      'Soluciones en láminas de control solar para automotores, residencias y comercios en Catamarca. Calculá los materiales necesarios para tu proyecto.',
    siteName: 'Luminadia',
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
    <html lang="es-AR" className={`${jakarta.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0e1110] text-[#f4f3ef] font-sans antialiased selection:bg-amber-600 selection:text-black">
        {/* Skip Link para accesibilidad */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-amber-600 text-black font-bold rounded-lg focus:outline-none"
        >
          Saltar al contenido principal
        </a>

        <Navbar />

        <main id="main-content" className="flex-1 pt-20">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
