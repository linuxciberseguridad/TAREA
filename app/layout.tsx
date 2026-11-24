import type {Metadata} from 'next';
import {Fraunces, Plus_Jakarta_Sans, JetBrains_Mono} from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Roatán Auténtica — Turismo Cultural y Ecológico',
  description:
    'Redescubre tu tierra, enamórate de lo nuestro. Paquetes turísticos accesibles en Roatán con recorridos culturales, playas, manglares, gastronomía isleña y 56% de descuento para locales.',
  openGraph: {
    title: 'Roatán Auténtica — Turismo Cultural y Ecológico',
    description:
      'Redescubre tu tierra, enamórate de lo nuestro. Paquetes turísticos accesibles en Roatán con recorridos culturales, playas, manglares, gastronomía isleña y 56% de descuento para locales.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roatán Auténtica — Turismo Cultural y Ecológico',
    description:
      'Redescubre tu tierra, enamórate de lo nuestro. Paquetes turísticos accesibles en Roatán con recorridos culturales, playas, manglares, gastronomía isleña y 56% de descuento para locales.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#FAF8F5] text-stone-900 antialiased selection:bg-teal-700 selection:text-white"
        style={{fontFamily: 'var(--font-sans), sans-serif'}}
      >
        {children}
      </body>
    </html>
  );
}
