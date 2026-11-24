'use client';

import React, {useState} from 'react';
import {
  Compass,
  Clock,
  MapPin,
  Users,
  Check,
  ArrowRight,
  Utensils,
  Anchor,
  Trees,
  Sparkles,
  Calendar,
  Phone,
  Mail,
  Copy,
  X,
  ChevronRight,
} from 'lucide-react';
import ResilientImage from './ResilientImage';
import {
  ASSETS,
  COMPANY_INFO,
  LOGO_MEANINGS,
  TOUR_PACKAGES,
  GASTRONOMY_ITEMS,
  GALLERY_PHOTOS,
  CULTURAL_COMMUNITIES,
  LOCAL_DISCOUNT_PERCENT,
  calculatePrice,
  GalleryPhoto,
} from '@/lib/roatan-data';

export default function RoatanAutenticaPortal() {
  // Pricing & Tariff interactive states
  const [isLocalTariff, setIsLocalTariff] = useState<boolean>(false);
  const [currency, setCurrency] = useState<'USD' | 'HNL'>('USD');

  // Logo interactive element state
  const [activeLogoElementId, setActiveLogoElementId] = useState<string>(
    LOGO_MEANINGS[0].id
  );

  // Expanded package itinerary tabs
  const [activePackageTab, setActivePackageTab] = useState<Record<number, 'recorrido' | 'incluye'>>({
    1: 'recorrido',
    2: 'recorrido',
    3: 'recorrido',
  });

  // Gallery filter & lightbox modal state
  const [galleryFilter, setGalleryFilter] = useState<
    'todos' | 'playas' | 'cultura' | 'gastronomia'
  >('todos');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  // Interactive Booking & Quote Calculator states
  const [selectedPackageId, setSelectedPackageId] = useState<number>(1);
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [tourDate, setTourDate] = useState<string>('2026-12-05');
  const [pickupPoint, setPickupPoint] = useState<string>(
    'Muelle de Cruceros (Port of Roatán / Coxen Hole)'
  );
  const [customerName, setCustomerName] = useState<string>('');
  const [customerContact, setCustomerContact] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<{
    code: string;
    packageTitle: string;
    schedule: string;
    guests: number;
    isLocal: boolean;
    totalFormatted: string;
    savingsFormatted: string;
    pickup: string;
    date: string;
    name: string;
    contact: string;
  } | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const activeLogoMeaning =
    LOGO_MEANINGS.find((item) => item.id === activeLogoElementId) ||
    LOGO_MEANINGS[0];

  const filteredGallery =
    galleryFilter === 'todos'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === galleryFilter);

  const currentBookingPackage =
    TOUR_PACKAGES.find((pkg) => pkg.id === selectedPackageId) ||
    TOUR_PACKAGES[0];

  const unitPricing = calculatePrice(
    currentBookingPackage.priceUSD,
    isLocalTariff,
    currency
  );
  const totalPricing = calculatePrice(
    currentBookingPackage.priceUSD * guestsCount,
    isLocalTariff,
    currency
  );

  const handleSelectPackageForBooking = (pkgId: number) => {
    setSelectedPackageId(pkgId);
    setBookingConfirmed(null);
    const el = document.getElementById('reservar');
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || customerName.trim().length < 3) {
      setFormError('Por favor ingresa tu nombre completo para la reserva.');
      return;
    }
    if (!customerContact.trim() || customerContact.trim().length < 6) {
      setFormError(
        'Por favor ingresa un número de teléfono (WhatsApp) o correo electrónico válido.'
      );
      return;
    }
    setFormError('');

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const code = `RA-2026-${selectedPackageId}${randomDigits}`;

    setBookingConfirmed({
      code,
      packageTitle: `Paquete ${currentBookingPackage.id}: ${currentBookingPackage.title}`,
      schedule: currentBookingPackage.schedule,
      guests: guestsCount,
      isLocal: isLocalTariff,
      totalFormatted: totalPricing.finalAmount,
      savingsFormatted: totalPricing.savingsAmount,
      pickup: pickupPoint,
      date: tourDate,
      name: customerName.trim(),
      contact: customerContact.trim(),
    });
  };

  const handleCopyReservation = () => {
    if (!bookingConfirmed) return;
    const summaryText = `Reserva Roatán Auténtica (${bookingConfirmed.code}) - ${bookingConfirmed.packageTitle} | Fecha: ${bookingConfirmed.date} | Hora: ${bookingConfirmed.schedule} | Pasajeros: ${bookingConfirmed.guests} | Total: ${bookingConfirmed.totalFormatted}`;
    navigator.clipboard.writeText(summaryText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900">
      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#inicio"
            className="text-xl font-bold tracking-tight text-stone-950 whitespace-nowrap shrink-0"
            style={{fontFamily: 'var(--font-display), serif'}}
          >
            Roatán Auténtica
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <a
              href="#nosotros"
              className="hover:text-teal-800 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Nosotros
            </a>
            <a
              href="#paquetes"
              className="hover:text-teal-800 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Paquetes
            </a>
            <a
              href="#cultura"
              className="hover:text-teal-800 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Cultura y Sabores
            </a>
            <a
              href="#galeria"
              className="hover:text-teal-800 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Galería
            </a>
            <a
              href="#reservar"
              className="hover:text-teal-800 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Reservar
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <a
              href="#reservar"
              className="px-4 py-2 text-xs font-semibold text-white bg-teal-800 rounded-lg hover:bg-teal-900 transition-colors whitespace-nowrap shrink-0"
            >
              Reservar Tour
            </a>
          </div>
        </div>
      </header>

      <main id="inicio" className="flex-1">
        {/* HERO SECTION — 2-COLUMN BALANCED SPLIT + FULL-WIDTH KPI STRIP */}
        <section className="max-w-7xl mx-auto px-6 pt-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Brand Proposition + Official Logo Showcase */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-stone-200/80 rounded-2xl p-8 lg:p-10">
              <div>
                {/* Clean unboxed metadata with typographic separators */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-teal-800 mb-6">
                  <span>Roatán, Islas de la Bahía</span>
                  <span aria-hidden="true">·</span>
                  <span>Turismo Cultural y Ecológico</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    56% Descuento para Locales
                  </span>
                </div>

                {/* Official Logo + Headline Lockup */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-stone-200 shrink-0 bg-[#F6F3EC] p-1">
                    <ResilientImage
                      src={ASSETS.logo}
                      alt="Logo Oficial de Roatán Auténtica — Mujer garífuna con tambor, cayuco y atardecer caribeño"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-stone-500 mb-1">
                      Agencia y Operadora Turística Local
                    </p>
                    <h1
                      className="text-stone-950 font-bold tracking-tight leading-[1.12]"
                      style={{
                        fontFamily: 'var(--font-display), serif',
                        fontSize: 'clamp(2.15rem, 3.6vw, 3.4rem)',
                        textWrap: 'balance',
                      }}
                    >
                      Redescubre tu tierra, enamórate de lo nuestro.
                    </h1>
                  </div>
                </div>

                <p className="text-base text-stone-600 leading-relaxed max-w-[65ch] mb-8">
                  {COMPANY_INFO.whoWeAre}
                </p>
              </div>

              {/* Hero Actions & Quick Tariff Preview */}
              <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#paquetes"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-teal-800 rounded-lg hover:bg-teal-900 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Ver Paquetes Turísticos</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#nosotros"
                    className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-stone-700 hover:text-stone-950 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Conocer Nuestro Logo e Historia</span>
                  </a>
                </div>

                <div className="text-xs text-stone-500">
                  <span>Salidas desde Muelle de Cruceros</span>
                  <span aria-hidden="true"> · </span>
                  <span className="font-mono tabular-nums font-semibold text-stone-800">
                    9:00 AM – 2:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Impact Authentic Roatán Visual Carrier */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-stone-200/80 min-h-[380px] lg:h-full">
              <ResilientImage
                src={ASSETS.campBayBeach}
                alt="Playa cristalina de Camp Bay en Roatán con aguas turquesas y arrecife rocoso"
                className="w-full h-full object-cover"
              />
              {/* Measured Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-8">
                <div className="flex items-center gap-2 text-xs text-amber-300 font-medium mb-2">
                  <span>Costa Virgen de Camp Bay</span>
                  <span aria-hidden="true">·</span>
                  <span>Incluido en Paquete 1</span>
                </div>
                <p
                  className="text-xl font-bold text-white leading-snug mb-2"
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    textWrap: 'balance',
                  }}
                >
                  Playas cristalinas, túneles de manglares y herencia garífuna en un solo recorrido.
                </p>
                <p className="text-xs text-stone-200 leading-relaxed">
                  Experiencias guiadas de 5 horas con transporte, gastronomía isleña y trato cálido por anfitriones de nuestra isla.
                </p>
              </div>
            </div>
          </div>

          {/* Full-Width 4-Column Key Highlights Strip Below Hero Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-white border border-stone-200/80 rounded-xl p-5">
              <div className="text-xs text-stone-500 mb-1">
                Horario Oficial de Recorridos
              </div>
              <div className="text-xl font-bold text-stone-950 font-mono tabular-nums">
                9:00 AM – 2:00 PM
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Salida y retorno puntual al muelle de cruceros garantizados.
              </p>
            </div>

            <div className="bg-white border border-stone-200/80 rounded-xl p-5">
              <div className="text-xs text-stone-500 mb-1">
                Descuento para Personas Locales
              </div>
              <div className="text-xl font-bold text-teal-800 font-mono tabular-nums">
                56% de Descuento
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Tarifas especiales desde $30.80 USD para residentes y locales.
              </p>
            </div>

            <div className="bg-white border border-stone-200/80 rounded-xl p-5">
              <div className="text-xs text-stone-500 mb-1">
                Paquetes Todo Organizado
              </div>
              <div className="text-xl font-bold text-stone-950 font-mono tabular-nums">
                $70 – $85 USD
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Incluyen transporte, guía turístico certificado y paradas gastronómicas.
              </p>
            </div>

            <div className="bg-white border border-stone-200/80 rounded-xl p-5">
              <div className="text-xs text-stone-500 mb-1">
                Identidad Cultural Viva
              </div>
              <div className="text-xl font-bold text-stone-950">
                3 Comunidades
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Encuentro auténtico con raíces garífunas, misquitas e isleñas.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 1: ¿QUIÉNES SOMOS?, SIGNIFICADO DEL LOGO, MISIÓN, VISIÓN Y VALORES */}
        <section
          id="nosotros"
          className="py-16 border-t border-stone-200/80 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className="max-w-3xl mb-12">
              <div className="flex items-center gap-2 text-xs font-medium text-teal-800 mb-3">
                <span>01. Nuestra Identidad</span>
                <span aria-hidden="true">·</span>
                <span>Roatán Auténtica</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold text-stone-950 tracking-tight mb-4"
                style={{
                  fontFamily: 'var(--font-display), serif',
                  textWrap: 'balance',
                }}
              >
                ¿Quiénes somos y qué representa nuestro emblema?
              </h2>
              <p className="text-base text-stone-600 leading-relaxed">
                {COMPANY_INFO.whoWeAre}
              </p>
            </div>

            {/* Interactive Logo Symbolism Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">
              {/* Left: High-res Official Logo + Official Story */}
              <div className="lg:col-span-5 bg-[#FAF8F5] border border-stone-200/80 rounded-2xl p-8 flex flex-col items-center text-center justify-between">
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border border-stone-200 bg-[#F5F2EB] p-2 mb-6">
                  <ResilientImage
                    src={ASSETS.logo}
                    alt="Emblema Oficial de Roatán Auténtica"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div>
                  <div className="text-xs font-medium text-teal-800 mb-2">
                    Simbolismo Oficial de Roatán Auténtica
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {COMPANY_INFO.logoStory}
                  </p>
                </div>
              </div>

              {/* Right: Interactive Breakdown of the 4 Elements in the Logo */}
              <div className="lg:col-span-7 bg-[#FAF8F5] border border-stone-200/80 rounded-2xl p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                      <h3
                        className="text-xl font-bold text-stone-950"
                        style={{fontFamily: 'var(--font-display), serif'}}
                      >
                        Explora cada elemento de nuestro logo
                      </h3>
                      <p className="text-xs text-stone-500 mt-1">
                        Selecciona un elemento para conocer cómo inspira nuestros recorridos por la isla.
                      </p>
                    </div>
                  </div>

                  {/* Interactive Selector Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {LOGO_MEANINGS.map((item, idx) => {
                      const isActive = item.id === activeLogoElementId;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveLogoElementId(item.id)}
                          className={`text-left p-4 rounded-xl border transition-colors ${
                            isActive
                              ? 'bg-teal-800 text-white border-teal-800'
                              : 'bg-white text-stone-800 border-stone-200/80 hover:border-stone-300'
                          }`}
                        >
                          <div
                            className={`text-xs font-mono tabular-nums mb-1 ${
                              isActive ? 'text-teal-200' : 'text-teal-800'
                            }`}
                          >
                            0{idx + 1}. Elemento Cultural
                          </div>
                          <div className="text-sm font-semibold">
                            {item.title}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Element Detailed Card */}
                  <div className="bg-white border border-stone-200/80 rounded-xl p-6">
                    <div className="text-xs font-medium text-teal-800 mb-1">
                      {activeLogoMeaning.symbolism}
                    </div>
                    <h4
                      className="text-lg font-bold text-stone-950 mb-2"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      {activeLogoMeaning.title}
                    </h4>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {activeLogoMeaning.detail}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
                  <span>
                    Identidad isleña presente en cada paquete turístico
                  </span>
                  <a
                    href="#cultura"
                    className="font-semibold text-teal-800 hover:underline inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                  >
                    <span>Ver Comunidades y Gastronomía</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Misión, Visión y Nuestros Valores + Authentic Cultural Photo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Misión */}
                <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-2xl p-7 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono tabular-nums text-teal-800 mb-2">
                      01. Propósito Diario
                    </div>
                    <h3
                      className="text-xl font-bold text-stone-950 mb-3"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      Misión
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {COMPANY_INFO.mission}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-200/60 text-xs text-stone-500">
                    Calidad y accesibilidad en cada salida desde el muelle.
                  </div>
                </div>

                {/* Visión */}
                <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-2xl p-7 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono tabular-nums text-teal-800 mb-2">
                      02. Proyección Regional
                    </div>
                    <h3
                      className="text-xl font-bold text-stone-950 mb-3"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      Visión
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {COMPANY_INFO.vision}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-200/60 text-xs text-stone-500">
                    Impulsando el crecimiento económico y cultural de Roatán.
                  </div>
                </div>

                {/* Nuestros Valores (Spans 2 columns) */}
                <div className="sm:col-span-2 bg-[#FAF8F5] border border-stone-200/80 rounded-2xl p-7">
                  <div className="text-xs font-mono tabular-nums text-teal-800 mb-2">
                    03. Principios que nos Guían
                  </div>
                  <h3
                    className="text-xl font-bold text-stone-950 mb-2"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Nuestros Valores
                  </h3>
                  <p className="text-sm font-medium text-stone-700 mb-5">
                    {COMPANY_INFO.valuesText}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-4 border-t border-stone-200/80">
                    {COMPANY_INFO.valuesList.map((val, i) => (
                      <div key={val.name}>
                        <div className="text-xs font-mono tabular-nums text-stone-400 mb-0.5">
                          0{i + 1}
                        </div>
                        <div className="text-sm font-semibold text-stone-900 mb-1">
                          {val.name}
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {val.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Photo Column: Authentic Garífuna Palm Huts */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-stone-200/80 min-h-[340px]">
                <ResilientImage
                  src={ASSETS.garifunaHuts}
                  alt="Champas tradicionales garífunas construidas con palma real y cocoteros en Roatán"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8">
                  <div className="flex items-center gap-2 text-xs text-amber-300 font-medium mb-1">
                    <span>Arquitectura y Raíces Isleñas</span>
                    <span aria-hidden="true">·</span>
                    <span>Casa de la Cultura y Punta Gorda</span>
                  </div>
                  <p
                    className="text-lg font-bold text-white leading-snug"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Preservamos las costumbres, música y hospitalidad de nuestras comunidades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PAQUETES TURÍSTICOS DE ROATÁN AUTÉNTICA (CON CALCULADORA LOCAL -56%) */}
        <section
          id="paquetes"
          className="py-16 border-t border-stone-200/80 bg-[#FAF8F5]"
        >
          <div className="max-w-7xl mx-auto px-6">
            {/* Header + Interactive Tariff & Currency Controls */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-medium text-teal-800 mb-3">
                  <span>02. Paquetes Turísticos Oficiales</span>
                  <span aria-hidden="true">·</span>
                  <span>Salidas 9:00 AM – 2:00 PM</span>
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-stone-950 tracking-tight mb-3"
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    textWrap: 'balance',
                  }}
                >
                  Paquetes turísticos de Roatán Auténtica
                </h2>
                <p className="text-base text-stone-600 leading-relaxed">
                  Elige entre nuestras 3 rutas diseñadas para descubrir playas vírgenes, historia garífuna, manglares y la mejor gastronomía local. Activa la tarifa local para aplicar automáticamente el{' '}
                  <strong className="text-teal-800 font-semibold">
                    {LOCAL_DISCOUNT_PERCENT}% de descuento para personas locales
                  </strong>
                  .
                </p>
              </div>

              {/* Interactive Controls: Tariff Selector + Currency Selector */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Tariff Segmented Control */}
                <div
                  className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-xl"
                  role="group"
                  aria-label="Selector de tarifa"
                >
                  <button
                    type="button"
                    onClick={() => setIsLocalTariff(false)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      !isLocalTariff
                        ? 'bg-white text-stone-950 shadow-xs'
                        : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    Tarifa Visitante
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsLocalTariff(true)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      isLocalTariff
                        ? 'bg-teal-800 text-white shadow-xs'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    Persona Local (-56%)
                  </button>
                </div>

                {/* Currency Segmented Control */}
                <div
                  className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-xl"
                  role="group"
                  aria-label="Selector de moneda"
                >
                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`px-3 py-2 text-xs font-mono font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      currency === 'USD'
                        ? 'bg-white text-stone-950 shadow-xs'
                        : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('HNL')}
                    className={`px-3 py-2 text-xs font-mono font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      currency === 'HNL'
                        ? 'bg-white text-stone-950 shadow-xs'
                        : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    HNL (L)
                  </button>
                </div>
              </div>
            </div>

            {/* 3 Tour Package Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
              {TOUR_PACKAGES.map((pkg) => {
                const priceInfo = calculatePrice(
                  pkg.priceUSD,
                  isLocalTariff,
                  currency
                );
                const currentTab = activePackageTab[pkg.id] || 'recorrido';

                return (
                  <article
                    key={pkg.id}
                    className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Header */}
                      <div className="relative h-56 overflow-hidden border-b border-stone-200/80">
                        <ResilientImage
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-5">
                          <div className="flex items-center justify-between gap-2 text-xs text-amber-300 font-mono tabular-nums">
                            <span>{pkg.numberLabel}</span>
                            <span>{pkg.schedule}</span>
                          </div>
                          <h3
                            className="text-lg font-bold text-white leading-snug mt-1"
                            style={{fontFamily: 'var(--font-display), serif'}}
                          >
                            {pkg.title}
                          </h3>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        {/* Clean Unboxed Metadata */}
                        <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 mb-4">
                          <span className="font-semibold text-teal-800">
                            Incluye:
                          </span>
                          <span>{pkg.includes}</span>
                        </div>

                        {/* Price Block with Tabular Numerals */}
                        <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-xl p-4 mb-5 flex items-baseline justify-between gap-4">
                          <div>
                            <div className="text-xs text-stone-500">
                              {isLocalTariff
                                ? 'Precio con 56% Descuento Local'
                                : 'Precio Estándar por Persona'}
                            </div>
                            <div className="flex items-baseline gap-2 mt-0.5">
                              <span className="text-2xl font-bold text-stone-950 font-mono tabular-nums">
                                {priceInfo.finalAmount}
                              </span>
                              {isLocalTariff && (
                                <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                                  {priceInfo.originalAmount}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-mono tabular-nums text-teal-800 font-semibold">
                              {isLocalTariff
                                ? `Ahorras ${priceInfo.savingsAmount}`
                                : '5 Horas'}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Segmented Tab inside Package Card */}
                        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg mb-4">
                          <button
                            type="button"
                            onClick={() =>
                              setActivePackageTab((prev) => ({
                                ...prev,
                                [pkg.id]: 'recorrido',
                              }))
                            }
                            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                              currentTab === 'recorrido'
                                ? 'bg-white text-stone-950 shadow-2xs'
                                : 'text-stone-600 hover:text-stone-900'
                            }`}
                          >
                            Recorrido Paso a Paso
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setActivePackageTab((prev) => ({
                                ...prev,
                                [pkg.id]: 'incluye',
                              }))
                            }
                            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                              currentTab === 'incluye'
                                ? 'bg-white text-stone-950 shadow-2xs'
                                : 'text-stone-600 hover:text-stone-900'
                            }`}
                          >
                            Qué Incluye ({pkg.includesList.length})
                          </button>
                        </div>

                        {currentTab === 'recorrido' ? (
                          <div>
                            <p className="text-xs text-stone-600 leading-relaxed mb-4">
                              {pkg.itinerarySummary}
                            </p>
                            <div className="space-y-3">
                              {pkg.stops.map((stop) => (
                                <div
                                  key={stop.place}
                                  className="flex items-start gap-3 text-xs"
                                >
                                  <span className="font-mono tabular-nums font-semibold text-teal-800 shrink-0 w-16 pt-0.5">
                                    {stop.order}
                                  </span>
                                  <div>
                                    <div className="font-semibold text-stone-900">
                                      {stop.place}
                                    </div>
                                    <p className="text-stone-500 leading-relaxed mt-0.5">
                                      {stop.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3 py-1">
                            {pkg.includesList.map((inc) => (
                              <div
                                key={inc}
                                className="flex items-start gap-2.5 text-xs text-stone-700"
                              >
                                <Check className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                                <span>{inc}</span>
                              </div>
                            ))}
                            <div className="pt-3 mt-3 border-t border-stone-200/80 text-xs text-stone-600">
                              <span className="font-semibold text-stone-900">
                                Experiencia Culinaria:{' '}
                              </span>
                              {pkg.highlightFood}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer CTA */}
                    <div className="p-6 pt-0">
                      <button
                        type="button"
                        onClick={() => handleSelectPackageForBooking(pkg.id)}
                        className="w-full py-3 px-4 bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                      >
                        <span>
                          Seleccionar Paquete {pkg.id} ({priceInfo.finalAmount})
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* OFFICIAL SUMMARY TABLE (Exact reproduction of the user's package table with interactive selection) */}
            <div className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3
                    className="text-xl font-bold text-stone-950"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Cuadro Comparativo Oficial — Paquetes Turísticos de Roatán Auténtica
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Descuento oficial para personas locales: 56% sobre el precio de lista en todos nuestros recorridos.
                  </p>
                </div>
                <div className="text-xs font-mono tabular-nums text-teal-800 font-semibold">
                  Horario Único: 9:00 AM - 2:00 PM
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200/80 bg-[#FAF8F5] text-xs font-semibold text-stone-600">
                      <th className="py-3.5 px-6">Paquete</th>
                      <th className="py-3.5 px-6">Incluye</th>
                      <th className="py-3.5 px-6">Recorrido Oficial</th>
                      <th className="py-3.5 px-6 whitespace-nowrap">Hora</th>
                      <th className="py-3.5 px-6 whitespace-nowrap">
                        Precio Visitante
                      </th>
                      <th className="py-3.5 px-6 whitespace-nowrap">
                        Precio Local (-56%)
                      </th>
                      <th className="py-3.5 px-6 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200/80 text-sm">
                    {TOUR_PACKAGES.map((pkg) => {
                      const stdPrice = calculatePrice(
                        pkg.priceUSD,
                        false,
                        currency
                      );
                      const locPrice = calculatePrice(
                        pkg.priceUSD,
                        true,
                        currency
                      );
                      return (
                        <tr
                          key={pkg.id}
                          className="hover:bg-stone-50/80 transition-colors"
                        >
                          <td className="py-4 px-6 font-mono tabular-nums font-bold text-stone-950 whitespace-nowrap">
                            Paquete {pkg.id}
                          </td>
                          <td className="py-4 px-6 text-stone-700 min-w-[180px]">
                            {pkg.includes}
                          </td>
                          <td className="py-4 px-6 text-stone-600 text-xs leading-relaxed max-w-md">
                            {pkg.itinerarySummary}
                          </td>
                          <td className="py-4 px-6 font-mono tabular-nums text-xs text-stone-700 whitespace-nowrap">
                            {pkg.schedule}
                          </td>
                          <td className="py-4 px-6 font-mono tabular-nums font-semibold text-stone-900 whitespace-nowrap">
                            {stdPrice.finalAmount}
                          </td>
                          <td className="py-4 px-6 font-mono tabular-nums font-bold text-teal-800 whitespace-nowrap">
                            {locPrice.finalAmount}
                          </td>
                          <td className="py-4 px-6 text-right whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() =>
                                handleSelectPackageForBooking(pkg.id)
                              }
                              className="px-3.5 py-1.5 text-xs font-semibold text-teal-800 hover:text-white border border-teal-800 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                            >
                              Reservar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ¿QUÉ PUEDES ENCONTRAR CON NOSOTROS? (COMUNIDADES, CULTURA Y GASTRONOMÍA ISLEÑA) */}
        <section
          id="cultura"
          className="py-16 border-t border-stone-200/80 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Intro */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
              <div className="lg:col-span-6">
                <div className="flex items-center gap-2 text-xs font-medium text-teal-800 mb-3">
                  <span>03. Cultura, Comunidades y Sabores</span>
                  <span aria-hidden="true">·</span>
                  <span>Identidad de Roatán</span>
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-stone-950 tracking-tight mb-4"
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    textWrap: 'balance',
                  }}
                >
                  ¿Qué puedes encontrar con nosotros?
                </h2>
                <p className="text-base text-stone-700 font-medium leading-relaxed mb-4">
                  {COMPANY_INFO.whatYouCanFindIntro}
                </p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {COMPANY_INFO.whatYouCanFindDetail}
                </p>
              </div>

              {/* 3 Cultural Communities List */}
              <div className="lg:col-span-6 grid grid-cols-1 gap-4">
                {CULTURAL_COMMUNITIES.map((comm) => (
                  <div
                    key={comm.name}
                    className="bg-[#FAF8F5] border border-stone-200/80 rounded-xl p-5 flex items-start gap-4"
                  >
                    <span className="font-mono tabular-nums text-sm font-bold text-teal-800 shrink-0 pt-0.5">
                      {comm.index}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3
                          className="text-base font-bold text-stone-950"
                          style={{fontFamily: 'var(--font-display), serif'}}
                        >
                          {comm.name}
                        </h3>
                        <span className="text-xs text-stone-400" aria-hidden="true">
                          ·
                        </span>
                        <span className="text-xs text-stone-500">
                          {comm.settlement}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {comm.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GASTRONOMY SHOWCASE WITH THE 3 AUTHENTIC FOOD PHOTOS */}
            <div className="pt-8 border-t border-stone-200/80">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="text-xs font-medium text-teal-800 mb-1">
                    Gastronomía Tradicional en Nuestros Recorridos
                  </div>
                  <h3
                    className="text-2xl font-bold text-stone-950"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Sabores auténticos de Punta Gorda, La Cocina de Don Jorge y View Bay
                  </h3>
                </div>
                <p className="text-xs text-stone-500 max-w-md">
                  Fotografías reales de los platillos tradicionales que degustarás durante nuestras paradas gastronómicas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {GASTRONOMY_ITEMS.map((dish) => (
                  <div
                    key={dish.id}
                    className="bg-[#FAF8F5] border border-stone-200/80 rounded-2xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-60 overflow-hidden border-b border-stone-200/80">
                        <ResilientImage
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-xs text-teal-800 font-medium mb-1">
                          {dish.origin}
                        </div>
                        <h4
                          className="text-lg font-bold text-stone-950 mb-2"
                          style={{fontFamily: 'var(--font-display), serif'}}
                        >
                          {dish.name}
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {dish.description}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 py-4 border-t border-stone-200/80 text-xs font-medium text-stone-500">
                      {dish.tourReference}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: GALERÍA FOTOGRÁFICA AUTÉNTICA CON FILTROS Y LIGHTBOX */}
        <section
          id="galeria"
          className="py-16 border-t border-stone-200/80 bg-[#FAF8F5]"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-teal-800 mb-3">
                  <span>04. Galería Real de Roatán</span>
                  <span aria-hidden="true">·</span>
                  <span>Paisajes, Cultura y Sazón</span>
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-stone-950 tracking-tight"
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    textWrap: 'balance',
                  }}
                >
                  Postales reales de nuestros recorridos
                </h2>
              </div>

              {/* Interactive Category Filter Buttons */}
              <div
                className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-200/80 rounded-xl"
                role="group"
                aria-label="Filtrar galería por categoría"
              >
                <button
                  type="button"
                  onClick={() => setGalleryFilter('todos')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    galleryFilter === 'todos'
                      ? 'bg-white text-stone-950 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  Todos ({GALLERY_PHOTOS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryFilter('playas')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    galleryFilter === 'playas'
                      ? 'bg-white text-stone-950 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  Playas y Manglares
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryFilter('cultura')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    galleryFilter === 'cultura'
                      ? 'bg-white text-stone-950 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  Cultura y Comunidades
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryFilter('gastronomia')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    galleryFilter === 'gastronomia'
                      ? 'bg-white text-stone-950 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  Gastronomía Isleña
                </button>
              </div>
            </div>

            {/* Asymmetric Bento Photo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {filteredGallery.map((photo, index) => {
                // Dynamic span for visual rhythm
                const spanClass =
                  index === 0
                    ? 'md:col-span-7'
                    : index === 1
                    ? 'md:col-span-5'
                    : index === 2
                    ? 'md:col-span-5'
                    : index === 3
                    ? 'md:col-span-7'
                    : 'md:col-span-4';

                return (
                  <div
                    key={photo.id}
                    className={`${spanClass} group relative rounded-2xl overflow-hidden border border-stone-200/80 bg-white flex flex-col justify-between`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedPhoto(photo)}
                      className="text-left w-full h-full flex flex-col justify-between focus:outline-none"
                    >
                      <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                        <ResilientImage
                          src={photo.src}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6">
                          <div className="flex items-center gap-2 text-xs text-amber-300 font-medium mb-1">
                            <span>{photo.categoryLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span>{photo.location}</span>
                          </div>
                          <h3
                            className="text-lg font-bold text-white leading-snug"
                            style={{fontFamily: 'var(--font-display), serif'}}
                          >
                            {photo.title}
                          </h3>
                          <p className="text-xs text-stone-200 mt-1 line-clamp-2">
                            {photo.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 5: COTIZADOR INTERACTIVO Y RESERVA DIRECTA */}
        <section
          id="reservar"
          className="py-16 border-t border-stone-200/80 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Booking Instructions & Direct Benefits */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-2 text-xs font-medium text-teal-800 mb-3">
                  <span>05. Reservación y Cotizador</span>
                  <span aria-hidden="true">·</span>
                  <span>Confirmación Inmediata</span>
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-stone-950 tracking-tight mb-4"
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    textWrap: 'balance',
                  }}
                >
                  Reserva tu experiencia con Roatán Auténtica
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed mb-6">
                  Calcula tu tarifa exacta en dólares o lempiras, aplica el{' '}
                  <strong className="text-stone-900">
                    descuento del 56% para personas locales
                  </strong>{' '}
                  y genera tu código de reserva para salir desde el muelle de cruceros o punto de encuentro en la isla.
                </p>

                {/* Summary Box of Selected Package */}
                <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-stone-200 shrink-0">
                      <ResilientImage
                        src={currentBookingPackage.image}
                        alt={currentBookingPackage.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-mono tabular-nums text-teal-800 font-semibold">
                        {currentBookingPackage.numberLabel} ·{' '}
                        {currentBookingPackage.schedule}
                      </div>
                      <h3
                        className="text-base font-bold text-stone-950 leading-snug"
                        style={{fontFamily: 'var(--font-display), serif'}}
                      >
                        {currentBookingPackage.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {currentBookingPackage.itinerarySummary}
                  </p>

                  <div className="pt-4 border-t border-stone-200/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Incluye:</span>
                      <span className="font-medium text-stone-900">
                        {currentBookingPackage.includes}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">
                        Tarifa por persona ({isLocalTariff ? 'Local -56%' : 'Estándar'}):
                      </span>
                      <span className="font-mono tabular-nums font-bold text-stone-950">
                        {unitPricing.finalAmount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">
                        Total por {guestsCount}{' '}
                        {guestsCount === 1 ? 'persona' : 'personas'}:
                      </span>
                      <span className="font-mono tabular-nums text-base font-bold text-teal-800">
                        {totalPricing.finalAmount}
                      </span>
                    </div>
                    {isLocalTariff && (
                      <div className="flex items-center justify-between text-teal-800 pt-1">
                        <span>Ahorro total aplicado (56%):</span>
                        <span className="font-mono tabular-nums font-semibold">
                          -{totalPricing.savingsAmount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Official Logo Stamp */}
                <div className="flex items-center gap-4 p-4 rounded-xl border border-stone-200/80 bg-[#FAF8F5]">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-stone-200 shrink-0 bg-white">
                    <ResilientImage
                      src={ASSETS.logo}
                      alt="Logo Roatán Auténtica"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-xs text-stone-600">
                    <div className="font-semibold text-stone-900">
                      Garantía de Puntualidad Roatán Auténtica
                    </div>
                    <div>
                      Todos los paquetes operan de 9:00 AM a 2:00 PM con retorno seguro al muelle de cruceros.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Form or Confirmation Receipt */}
              <div className="lg:col-span-7">
                {bookingConfirmed ? (
                  <div className="bg-[#FAF8F5] border border-teal-800/30 rounded-2xl p-8">
                    <div className="flex items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
                      <div>
                        <div className="text-xs font-semibold text-teal-800 mb-1">
                          Solicitud de Reserva Registrada
                        </div>
                        <h3
                          className="text-2xl font-bold text-stone-950"
                          style={{fontFamily: 'var(--font-display), serif'}}
                        >
                          ¡Gracias por elegir Roatán Auténtica,{' '}
                          {bookingConfirmed.name}!
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-stone-500">Código</div>
                        <div className="font-mono tabular-nums text-sm font-bold text-teal-800">
                          {bookingConfirmed.code}
                        </div>
                      </div>
                    </div>

                    <div className="py-6 space-y-3 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-stone-500">Paquete Seleccionado:</span>
                        <span className="font-semibold text-stone-900 text-right">
                          {bookingConfirmed.packageTitle}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-stone-500">Fecha y Horario:</span>
                        <span className="font-mono tabular-nums font-medium text-stone-900">
                          {bookingConfirmed.date} · {bookingConfirmed.schedule}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-stone-500">Punto de Salida:</span>
                        <span className="text-stone-900 text-right">
                          {bookingConfirmed.pickup}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-stone-500">Cantidad de Pasajeros:</span>
                        <span className="font-mono tabular-nums text-stone-900">
                          {bookingConfirmed.guests}{' '}
                          {bookingConfirmed.guests === 1 ? 'persona' : 'personas'}{' '}
                          ({bookingConfirmed.isLocal ? 'Tarifa Local -56%' : 'Tarifa Estándar'})
                        </span>
                      </div>
                      <div className="flex justify-between gap-4 pt-3 border-t border-stone-200/80">
                        <span className="font-semibold text-stone-900">
                          Total Estimado a Pagar:
                        </span>
                        <span className="font-mono tabular-nums text-xl font-bold text-teal-800">
                          {bookingConfirmed.totalFormatted}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-stone-200/80">
                      <button
                        type="button"
                        onClick={handleCopyReservation}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0"
                      >
                        <Copy className="w-4 h-4" />
                        <span>
                          {copiedCode
                            ? 'Comprobante Copiado'
                            : 'Copiar Resumen de Reserva'}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setBookingConfirmed(null)}
                        className="px-4 py-2.5 border border-stone-300 hover:border-stone-400 text-stone-700 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0"
                      >
                        Modificar o Hacer Otra Reserva
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleBookingSubmit}
                    className="bg-[#FAF8F5] border border-stone-200/80 rounded-2xl p-6 sm:p-8 space-y-6"
                  >
                    {/* Step 1: Select Package */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-800 mb-2">
                        1. Selecciona tu Paquete Turístico (9:00 AM - 2:00 PM)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {TOUR_PACKAGES.map((pkg) => {
                          const pInfo = calculatePrice(
                            pkg.priceUSD,
                            isLocalTariff,
                            currency
                          );
                          const isSelected = selectedPackageId === pkg.id;
                          return (
                            <button
                              key={pkg.id}
                              type="button"
                              onClick={() => setSelectedPackageId(pkg.id)}
                              className={`p-3.5 rounded-xl border text-left transition-colors ${
                                isSelected
                                  ? 'bg-teal-800 text-white border-teal-800'
                                  : 'bg-white text-stone-800 border-stone-200/80 hover:border-stone-300'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="font-mono tabular-nums text-xs font-bold">
                                  Paquete {pkg.id}
                                </span>
                                <span
                                  className={`font-mono tabular-nums text-xs font-bold ${
                                    isSelected ? 'text-amber-300' : 'text-teal-800'
                                  }`}
                                >
                                  {pInfo.finalAmount}
                                </span>
                              </div>
                              <div
                                className={`text-xs line-clamp-1 ${
                                  isSelected ? 'text-stone-100' : 'text-stone-500'
                                }`}
                              >
                                {pkg.includes}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 2: Tariff Type & Number of Guests */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-800 mb-2">
                          2. Tipo de Tarifa
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setIsLocalTariff(false)}
                            className={`py-2.5 px-3 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 ${
                              !isLocalTariff
                                ? 'bg-stone-900 text-white border-stone-900'
                                : 'bg-white text-stone-700 border-stone-200'
                            }`}
                          >
                            Visitante
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsLocalTariff(true)}
                            className={`py-2.5 px-3 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 ${
                              isLocalTariff
                                ? 'bg-teal-800 text-white border-teal-800'
                                : 'bg-white text-stone-700 border-stone-200'
                            }`}
                          >
                            Local (-56%)
                          </button>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="guests-input"
                          className="block text-xs font-semibold text-stone-800 mb-2"
                        >
                          3. Número de Personas
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setGuestsCount((c) => Math.max(1, c - 1))
                            }
                            className="w-10 h-10 rounded-xl bg-white border border-stone-200 text-stone-800 font-bold hover:bg-stone-100 transition-colors"
                            aria-label="Disminuir pasajeros"
                          >
                            -
                          </button>
                          <input
                            id="guests-input"
                            type="number"
                            min={1}
                            max={30}
                            value={guestsCount}
                            onChange={(e) =>
                              setGuestsCount(
                                Math.max(1, parseInt(e.target.value, 10) || 1)
                              )
                            }
                            className="w-full h-10 text-center bg-white border border-stone-200 rounded-xl font-mono tabular-nums text-sm font-semibold text-stone-900"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setGuestsCount((c) => Math.min(30, c + 1))
                            }
                            className="w-10 h-10 rounded-xl bg-white border border-stone-200 text-stone-800 font-bold hover:bg-stone-100 transition-colors"
                            aria-label="Aumentar pasajeros"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Date & Pickup Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="tour-date"
                          className="block text-xs font-semibold text-stone-800 mb-2"
                        >
                          4. Fecha del Recorrido
                        </label>
                        <input
                          id="tour-date"
                          type="date"
                          value={tourDate}
                          onChange={(e) => setTourDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-mono text-stone-900 focus:outline-none focus:border-teal-800"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="pickup-point"
                          className="block text-xs font-semibold text-stone-800 mb-2"
                        >
                          5. Punto de Salida (9:00 AM)
                        </label>
                        <select
                          id="pickup-point"
                          value={pickupPoint}
                          onChange={(e) => setPickupPoint(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-teal-800"
                        >
                          <option value="Muelle de Cruceros (Port of Roatán / Coxen Hole)">
                            Muelle de Cruceros (Port of Roatán / Coxen Hole)
                          </option>
                          <option value="Muelle de Cruceros Mahogany Bay">
                            Muelle de Cruceros Mahogany Bay
                          </option>
                          <option value="Punto de Encuentro Local / Hotel en Roatán">
                            Punto de Encuentro Local / Hotel en Roatán
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Step 4: Contact Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="customer-name"
                          className="block text-xs font-semibold text-stone-800 mb-2"
                        >
                          Nombre Completo
                        </label>
                        <input
                          id="customer-name"
                          type="text"
                          placeholder="Ej. María Fernanda López"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-teal-800"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="customer-contact"
                          className="block text-xs font-semibold text-stone-800 mb-2"
                        >
                          Teléfono (WhatsApp) o Correo
                        </label>
                        <input
                          id="customer-contact"
                          type="text"
                          placeholder="Ej. +504 9900-0000 o correo@ejemplo.com"
                          value={customerContact}
                          onChange={(e) => setCustomerContact(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-teal-800"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="customer-notes"
                        className="block text-xs font-semibold text-stone-800 mb-2"
                      >
                        Comentarios o Preferencias Alimenticias (Opcional)
                      </label>
                      <input
                        id="customer-notes"
                        type="text"
                        placeholder="Ej. Nombre del crucero, preferencia entre pescado frito o sopa marinera..."
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-teal-800"
                      />
                    </div>

                    {formError && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                        {formError}
                      </div>
                    )}

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="text-xs text-stone-500">
                          Total a Pagar ({guestsCount}{' '}
                          {guestsCount === 1 ? 'pasajero' : 'pasajeros'}):
                        </div>
                        <div className="text-2xl font-bold text-teal-800 font-mono tabular-nums">
                          {totalPricing.finalAmount}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-3.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0"
                      >
                        Confirmar Reserva de Paquete {selectedPackageId}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET FOOTER */}
      <footer className="bg-stone-950 text-stone-400 border-t border-stone-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-stone-800">
            <div className="md:col-span-5 flex items-start gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-stone-700 shrink-0 bg-[#F5F2EB] p-1">
                <ResilientImage
                  src={ASSETS.logo}
                  alt="Logo Oficial Roatán Auténtica"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <div
                  className="text-lg font-bold text-white"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  Roatán Auténtica
                </div>
                <p className="text-xs text-amber-300/90 mt-0.5 mb-2">
                  {COMPANY_INFO.slogan}
                </p>
                <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
                  Experiencias turísticas accesibles y de calidad promoviendo la cultura garífuna, misquita e isleña de Roatán, Islas de la Bahía.
                </p>
              </div>
            </div>

            <div className="md:col-span-4 space-y-2 text-xs">
              <div className="font-semibold text-white mb-2">
                Nuestros Recorridos (9:00 AM – 2:00 PM)
              </div>
              <div>Paquete 1: Las Banderas, Camp Bay y Punta Gorda ($85)</div>
              <div>
                Paquete 2: Casa de la Cultura, Cocina de Don Jorge y Manglares ($70)
              </div>
              <div>
                Paquete 3: Jardín Botánico, Manawikie y View Bay Beach Grill ($80)
              </div>
              <div className="text-teal-400 font-medium pt-1">
                Descuento para personas locales: 56% en todos los paquetes.
              </div>
            </div>

            <div className="md:col-span-3 space-y-2 text-xs">
              <div className="font-semibold text-white mb-2">Navegación</div>
              <div className="flex flex-col space-y-1.5">
                <a href="#nosotros" className="hover:text-white transition-colors">
                  ¿Quiénes Somos? & Misión
                </a>
                <a href="#paquetes" className="hover:text-white transition-colors">
                  Paquetes y Tarifas
                </a>
                <a href="#cultura" className="hover:text-white transition-colors">
                  Cultura y Gastronomía
                </a>
                <a href="#galeria" className="hover:text-white transition-colors">
                  Galería Fotográfica
                </a>
                <a href="#reservar" className="hover:text-white transition-colors">
                  Reservar Recorrido
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <div>
              © {new Date().getFullYear()} Roatán Auténtica. Todos los derechos reservados.
            </div>
            <div>
              Roatán, Islas de la Bahía, Honduras · Compromiso, responsabilidad, honestidad, amabilidad y pasión por el turismo.
            </div>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX MODAL FOR PHOTO GALLERY */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.title}
        >
          <div className="bg-white border border-stone-200 rounded-2xl max-w-3xl w-full overflow-hidden shadow-xl">
            <div className="relative h-80 sm:h-[420px] bg-stone-950">
              <ResilientImage
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Cerrar vista ampliada"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-teal-800 font-medium mb-1">
                  {selectedPhoto.categoryLabel} · {selectedPhoto.location}
                </div>
                <h3
                  className="text-xl font-bold text-stone-950"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1 max-w-xl">
                  {selectedPhoto.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const pkgId = selectedPhoto.relatedPackageId;
                  setSelectedPhoto(null);
                  handleSelectPackageForBooking(pkgId);
                }}
                className="px-4 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                Reservar Paquete {selectedPhoto.relatedPackageId}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
