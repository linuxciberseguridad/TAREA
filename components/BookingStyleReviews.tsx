'use client';

import React, {useState, useEffect} from 'react';
import {
  ThumbsUp,
  Plus,
  Trash2,
  Check,
  MessageSquare,
} from 'lucide-react';
import {
  BookingReview,
  INITIAL_BOOKING_REVIEWS,
  Language,
  BILINGUAL_CONTENT,
} from '@/lib/roatan-data';

const REVIEWS_STORAGE_KEY = 'roatan_autentica_reviews_v1';
const HELPFUL_VOTES_STORAGE_KEY = 'roatan_autentica_helpful_votes_v1';

interface BookingStyleReviewsProps {
  lang: Language;
}

export default function BookingStyleReviews({lang}: BookingStyleReviewsProps) {
  const [reviews, setReviews] = useState<BookingReview[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(REVIEWS_STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as BookingReview[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {
        // fallback
      }
    }
    return INITIAL_BOOKING_REVIEWS;
  });

  const [votedIds, setVotedIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cachedVotes = localStorage.getItem(HELPFUL_VOTES_STORAGE_KEY);
        if (cachedVotes) {
          const parsedVotes = JSON.parse(cachedVotes) as string[];
          if (Array.isArray(parsedVotes)) {
            return parsedVotes;
          }
        }
      } catch {
        // fallback
      }
    }
    return [];
  });

  const [packageFilter, setPackageFilter] = useState<number | 'all'>('all');
  const [showForm, setShowForm] = useState<boolean>(false);

  // Form fields for new Booking-style review
  const [authorName, setAuthorName] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [travelerType, setTravelerType] = useState<string>(
    lang === 'es' ? 'Pareja · Tarifa Local (-10%)' : 'Couple · Local Rate (-10%)'
  );
  const [selectedPkgId, setSelectedPkgId] = useState<number>(1);
  const [guidesScore, setGuidesScore] = useState<number>(10);
  const [valueScore, setValueScore] = useState<number>(10);
  const [foodScore, setFoodScore] = useState<number>(9.5);
  const [punctualityScore, setPunctualityScore] = useState<number>(10);
  const [reviewTitle, setReviewTitle] = useState<string>('');
  const [positiveComment, setPositiveComment] = useState<string>('');
  const [extraTip, setExtraTip] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [justSaved, setJustSaved] = useState<boolean>(false);

  // Sync across tabs via storage event
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === REVIEWS_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue) as BookingReview[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            setReviews(parsed);
          }
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const saveReviewsToCache = (updated: BookingReview[]) => {
    setReviews(updated);
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage quota errors
    }
  };

  const handleHelpfulVote = (reviewId: string) => {
    if (votedIds.includes(reviewId)) return;
    const updatedReviews = reviews.map((rev) =>
      rev.id === reviewId ? {...rev, helpfulCount: rev.helpfulCount + 1} : rev
    );
    const updatedVotes = [...votedIds, reviewId];
    setVotedIds(updatedVotes);
    saveReviewsToCache(updatedReviews);
    try {
      localStorage.setItem(
        HELPFUL_VOTES_STORAGE_KEY,
        JSON.stringify(updatedVotes)
      );
    } catch {
      // ignore
    }
  };

  const handleDeleteUserReview = (reviewId: string) => {
    const updated = reviews.filter((rev) => rev.id !== reviewId);
    saveReviewsToCache(
      updated.length > 0 ? updated : INITIAL_BOOKING_REVIEWS
    );
  };

  // Compute averages dynamically
  const totalReviews = reviews.length;
  const avgOverall =
    totalReviews > 0
      ? reviews.reduce((acc, r) => acc + r.score, 0) / totalReviews
      : 9.6;

  const avgGuides =
    totalReviews > 0
      ? reviews.reduce((acc, r) => acc + r.categories.guides, 0) / totalReviews
      : 9.8;
  const avgValue =
    totalReviews > 0
      ? reviews.reduce((acc, r) => acc + r.categories.value, 0) / totalReviews
      : 9.7;
  const avgFood =
    totalReviews > 0
      ? reviews.reduce((acc, r) => acc + r.categories.food, 0) / totalReviews
      : 9.6;
  const avgPunctuality =
    totalReviews > 0
      ? reviews.reduce((acc, r) => acc + r.categories.punctuality, 0) /
        totalReviews
      : 9.7;

  const getBookingRatingWord = (score: number) => {
    if (score >= 9.5)
      return lang === 'es' ? 'Excepcional' : 'Exceptional';
    if (score >= 9.0)
      return lang === 'es' ? 'Fantástico' : 'Wonderful';
    if (score >= 8.5)
      return lang === 'es' ? 'Fabuloso' : 'Fabulous';
    if (score >= 8.0) return lang === 'es' ? 'Muy bien' : 'Very Good';
    return lang === 'es' ? 'Bien' : 'Good';
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || authorName.trim().length < 2) {
      setFormError(
        lang === 'es'
          ? 'Por favor ingresa tu nombre.'
          : 'Please enter your name.'
      );
      return;
    }
    if (!positiveComment.trim() || positiveComment.trim().length < 10) {
      setFormError(
        lang === 'es'
          ? 'Por favor escribe tu comentario sobre la experiencia (mínimo 10 caracteres).'
          : 'Please write your review comment about the experience (at least 10 characters).'
      );
      return;
    }
    setFormError('');

    const pkgs = BILINGUAL_CONTENT[lang].tourPackages;
    const chosenPkg =
      pkgs.find((p) => p.id === selectedPkgId) || pkgs[0];

    const computedScore = Number(
      (
        (guidesScore + valueScore + foodScore + punctualityScore) /
        4
      ).toFixed(1)
    );

    const todayStr = new Date().toISOString().split('T')[0];

    const newReview: BookingReview = {
      id: `user-rev-${Date.now()}`,
      authorName: authorName.trim(),
      country:
        country.trim() ||
        (lang === 'es' ? 'Roatán, Honduras' : 'Roatán, Honduras'),
      travelerType,
      packageId: chosenPkg.id,
      packageName: `Paquete ${chosenPkg.id}: ${chosenPkg.name}`,
      date: todayStr,
      score: computedScore,
      categories: {
        guides: guidesScore,
        value: valueScore,
        food: foodScore,
        punctuality: punctualityScore,
      },
      title:
        reviewTitle.trim() ||
        (lang === 'es'
          ? `Excelente experiencia en ${chosenPkg.name}`
          : `Amazing experience on ${chosenPkg.name}`),
      positiveComment: positiveComment.trim(),
      extraTip: extraTip.trim() || undefined,
      helpfulCount: 1,
      isUserCreated: true,
    };

    const updated = [newReview, ...reviews];
    saveReviewsToCache(updated);

    // Reset form
    setAuthorName('');
    setCountry('');
    setReviewTitle('');
    setPositiveComment('');
    setExtraTip('');
    setJustSaved(true);
    setShowForm(false);
    setTimeout(() => setJustSaved(false), 4000);
  };

  const filteredReviews =
    packageFilter === 'all'
      ? reviews
      : reviews.filter((r) => r.packageId === packageFilter);

  const packagesList = BILINGUAL_CONTENT[lang].tourPackages;

  return (
    <section
      id="comentarios"
      className="py-16 border-t border-stone-200/80 bg-[#FAF8F5]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-teal-800 mb-3">
              <span>
                {lang === 'es'
                  ? '05. Opiniones Verificadas de Viajeros'
                  : '05. Verified Traveler Reviews'}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {lang === 'es'
                  ? 'Guardado en Caché del Navegador'
                  : 'Saved in Browser Cache'}
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-stone-950 tracking-tight"
              style={{
                fontFamily: 'var(--font-display), serif',
                textWrap: 'balance',
              }}
            >
              {lang === 'es'
                ? 'Comentarios y valoraciones de nuestros visitantes'
                : 'Guest reviews & ratings for Roatán Auténtica'}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#003580] hover:bg-[#00224f] text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>
              {showForm
                ? lang === 'es'
                  ? 'Cerrar Formulario'
                  : 'Close Review Form'
                : lang === 'es'
                ? 'Escribir un Comentario'
                : 'Write a Guest Review'}
            </span>
          </button>
        </div>

        {justSaved && (
          <div className="mb-8 p-4 rounded-xl bg-teal-50 border border-teal-300 text-teal-900 text-xs font-medium flex items-center gap-2">
            <Check className="w-4 h-4 text-teal-700 shrink-0" />
            <span>
              {lang === 'es'
                ? '¡Tu comentario ha sido publicado y guardado en la memoria caché del navegador!'
                : 'Your review has been published and saved in the browser cache!'}
            </span>
          </div>
        )}

        {/* BOOKING.COM STYLE OVERALL SCORE SUMMARY & CATEGORY PROGRESS BARS */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Booking.com Iconic Blue Score Badge */}
            <div className="lg:col-span-4 flex items-center gap-5 pb-6 lg:pb-0 lg:border-r border-stone-200/80">
              <div className="w-20 h-20 rounded-t-2xl rounded-br-2xl bg-[#003580] text-white flex flex-col items-center justify-center shrink-0">
                <span className="text-2xl font-bold font-mono tabular-nums">
                  {avgOverall.toFixed(1)}
                </span>
                <span className="text-[10px] text-blue-200 font-mono">
                  / 10
                </span>
              </div>
              <div>
                <div className="text-xl font-bold text-stone-950">
                  {getBookingRatingWord(avgOverall)}
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  {lang === 'es'
                    ? `Basado en ${totalReviews} comentarios reales guardados`
                    : `Based on ${totalReviews} verified guest reviews`}
                </div>
                <div className="text-xs text-[#003580] font-semibold mt-2">
                  {lang === 'es'
                    ? '100% reseñas de visitantes y locales'
                    : '100% authentic visitor & local reviews'}
                </div>
              </div>
            </div>

            {/* Right: 4 Category Breakdown Bars (1–10 Scale) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {/* Bar 1 */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-1.5">
                  <span>
                    {lang === 'es'
                      ? 'Guías Turísticos y Atención'
                      : 'Tour Guides & Hospitality'}
                  </span>
                  <span className="font-mono tabular-nums text-stone-950">
                    {avgGuides.toFixed(1)}
                  </span>
                </div>
                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#003580] rounded-full"
                    style={{width: `${Math.min(100, avgGuides * 10)}%`}}
                  />
                </div>
              </div>

              {/* Bar 2 */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-1.5">
                  <span>
                    {lang === 'es'
                      ? 'Relación Calidad-Precio (y 10% Local)'
                      : 'Value for Money (& 10% Local Rate)'}
                  </span>
                  <span className="font-mono tabular-nums text-stone-950">
                    {avgValue.toFixed(1)}
                  </span>
                </div>
                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#003580] rounded-full"
                    style={{width: `${Math.min(100, avgValue * 10)}%`}}
                  />
                </div>
              </div>

              {/* Bar 3 */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-1.5">
                  <span>
                    {lang === 'es'
                      ? 'Gastronomía Isleña y Cultura'
                      : 'Island Gastronomy & Culture'}
                  </span>
                  <span className="font-mono tabular-nums text-stone-950">
                    {avgFood.toFixed(1)}
                  </span>
                </div>
                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#003580] rounded-full"
                    style={{width: `${Math.min(100, avgFood * 10)}%`}}
                  />
                </div>
              </div>

              {/* Bar 4 */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-1.5">
                  <span>
                    {lang === 'es'
                      ? 'Puntualidad (9:00 AM - 2:00 PM) y Transporte'
                      : 'Punctuality (9:00 AM - 2:00 PM) & Transport'}
                  </span>
                  <span className="font-mono tabular-nums text-stone-950">
                    {avgPunctuality.toFixed(1)}
                  </span>
                </div>
                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#003580] rounded-full"
                    style={{width: `${Math.min(100, avgPunctuality * 10)}%`}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLLAPSIBLE INTERACTIVE NEW REVIEW FORM (SAVED IN LOCALSTORAGE CACHE) */}
        {showForm && (
          <form
            onSubmit={handleAddReview}
            className="bg-white border border-[#003580]/30 rounded-2xl p-6 sm:p-8 mb-8 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h3
                  className="text-xl font-bold text-stone-950"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  {lang === 'es'
                    ? 'Comparte tu experiencia con Roatán Auténtica'
                    : 'Share your experience with Roatán Auténtica'}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {lang === 'es'
                    ? 'Tu comentario quedará guardado inmediatamente en la caché de la web y actualizará el puntaje general.'
                    : 'Your review will be saved directly in the browser cache and update the overall score.'}
                </p>
              </div>
              <div className="w-12 h-12 rounded-t-xl rounded-br-xl bg-[#003580] text-white flex flex-col items-center justify-center font-mono tabular-nums font-bold text-sm">
                {(
                  (guidesScore + valueScore + foodScore + punctualityScore) /
                  4
                ).toFixed(1)}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  {lang === 'es' ? 'Tu Nombre *' : 'Your Name *'}
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder={
                    lang === 'es' ? 'Ej. Andrea Morales' : 'e.g. John Davis'
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#003580]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  {lang === 'es'
                    ? 'Ciudad o País'
                    : 'City or Country'}
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder={
                    lang === 'es'
                      ? 'Ej. Roatán, Honduras'
                      : 'e.g. Houston, USA'
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#003580]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  {lang === 'es'
                    ? 'Paquete Realizado'
                    : 'Tour Package Taken'}
                </label>
                <select
                  value={selectedPkgId}
                  onChange={(e) =>
                    setSelectedPkgId(parseInt(e.target.value, 10))
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#003580]"
                >
                  {packagesList.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} (${p.priceUSD}.00)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  {lang === 'es' ? 'Tipo de Viajero' : 'Traveler Type'}
                </label>
                <select
                  value={travelerType}
                  onChange={(e) => setTravelerType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#003580]"
                >
                  <option value="Pareja · Tarifa Local (-10%)">
                    {lang === 'es'
                      ? 'Pareja · Tarifa Local (-10%)'
                      : 'Couple · Local Rate (-10%)'}
                  </option>
                  <option value="Familia · Tarifa Local (-10%)">
                    {lang === 'es'
                      ? 'Familia · Tarifa Local (-10%)'
                      : 'Family · Local Rate (-10%)'}
                  </option>
                  <option value="Crucerista · Familia">
                    {lang === 'es'
                      ? 'Crucerista · Familia'
                      : 'Cruise Guest · Family'}
                  </option>
                  <option value="Grupo de Amigos">
                    {lang === 'es'
                      ? 'Grupo de Amigos'
                      : 'Group of Friends'}
                  </option>
                  <option value="Viajero Solo">
                    {lang === 'es' ? 'Viajero Solo' : 'Solo Traveler'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  {lang === 'es'
                    ? 'Título de tu Comentario'
                    : 'Review Headline'}
                </label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder={
                    lang === 'es'
                      ? 'Ej. Increíble paseo a Punta Gorda y West Bay'
                      : 'e.g. Unforgettable day in Punta Gorda & West Bay'
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#003580]"
                />
              </div>
            </div>

            {/* Category Rating Sliders (1 to 10 Booking style) */}
            <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>{lang === 'es' ? 'Guías y Atención' : 'Guides'}</span>
                  <span className="font-mono tabular-nums text-[#003580]">
                    {guidesScore}/10
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={10}
                  step={0.5}
                  value={guidesScore}
                  onChange={(e) => setGuidesScore(parseFloat(e.target.value))}
                  className="w-full accent-[#003580]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>{lang === 'es' ? 'Calidad / Precio' : 'Value'}</span>
                  <span className="font-mono tabular-nums text-[#003580]">
                    {valueScore}/10
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={10}
                  step={0.5}
                  value={valueScore}
                  onChange={(e) => setValueScore(parseFloat(e.target.value))}
                  className="w-full accent-[#003580]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>
                    {lang === 'es' ? 'Comida y Cultura' : 'Food & Culture'}
                  </span>
                  <span className="font-mono tabular-nums text-[#003580]">
                    {foodScore}/10
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={10}
                  step={0.5}
                  value={foodScore}
                  onChange={(e) => setFoodScore(parseFloat(e.target.value))}
                  className="w-full accent-[#003580]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>{lang === 'es' ? 'Puntualidad' : 'Punctuality'}</span>
                  <span className="font-mono tabular-nums text-[#003580]">
                    {punctualityScore}/10
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={10}
                  step={0.5}
                  value={punctualityScore}
                  onChange={(e) =>
                    setPunctualityScore(parseFloat(e.target.value))
                  }
                  className="w-full accent-[#003580]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  {lang === 'es'
                    ? 'Lo que más te gustó del recorrido *'
                    : 'What you liked most about the tour *'}
                </label>
                <textarea
                  rows={3}
                  value={positiveComment}
                  onChange={(e) => setPositiveComment(e.target.value)}
                  placeholder={
                    lang === 'es'
                      ? 'Escribe tu experiencia con el guía, la comida, las playas o los manglares...'
                      : 'Describe your experience with the tour guide, island food, beaches, or mangroves...'
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#003580]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  {lang === 'es'
                    ? 'Recomendación o consejo para otros viajeros (Opcional)'
                    : 'Tip or recommendation for future guests (Optional)'}
                </label>
                <textarea
                  rows={3}
                  value={extraTip}
                  onChange={(e) => setExtraTip(e.target.value)}
                  placeholder={
                    lang === 'es'
                      ? 'Ej. Pidan la sopa marinera o lleven cámara acuática para el snorkeling...'
                      : 'e.g. Try the coconut seafood soup or bring an underwater camera for snorkeling...'
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#003580]"
                />
              </div>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                {formError}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 border border-stone-300 text-stone-700 text-xs font-semibold rounded-xl hover:bg-stone-100 transition-colors"
              >
                {lang === 'es' ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#003580] hover:bg-[#00224f] text-white text-xs font-semibold rounded-xl transition-colors"
              >
                {lang === 'es'
                  ? 'Publicar Comentario en la Web'
                  : 'Publish Review'}
              </button>
            </div>
          </form>
        )}

        {/* Filter Bar by Package */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-200/80 rounded-xl"
            role="group"
          >
            <button
              type="button"
              onClick={() => setPackageFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                packageFilter === 'all'
                  ? 'bg-white text-stone-950 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              {lang === 'es'
                ? `Todos los Comentarios (${reviews.length})`
                : `All Reviews (${reviews.length})`}
            </button>
            {packagesList.map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setPackageFilter(pkg.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  packageFilter === pkg.id
                    ? 'bg-white text-stone-950 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                {pkg.name}
              </button>
            ))}
          </div>
        </div>

        {/* BOOKING.COM STYLE GUEST REVIEW CARDS */}
        <div className="space-y-4">
          {filteredReviews.map((rev) => {
            const hasVoted = votedIds.includes(rev.id);
            const initials = rev.authorName
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 2)
              .toUpperCase();

            return (
              <article
                key={rev.id}
                className="bg-white border border-stone-200/80 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              >
                {/* Left Column: Guest Profile & Package Info (Booking Style) */}
                <div className="lg:col-span-4 flex flex-col justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-[#003580]/10 text-[#003580] font-bold text-sm flex items-center justify-center shrink-0">
                      {initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-stone-950">
                        {rev.authorName}
                      </div>
                      <div className="text-xs text-stone-500">
                        {rev.country}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-stone-600 pt-2 border-t border-stone-100">
                    <div className="font-semibold text-teal-800">
                      {rev.packageName}
                    </div>
                    <div>{rev.travelerType}</div>
                    <div className="text-stone-400 font-mono tabular-nums">
                      {lang === 'es' ? 'Fecha:' : 'Date:'} {rev.date}
                    </div>
                  </div>
                </div>

                {/* Right Column: Review Headline, Score Badge, Positive & Tip */}
                <div className="lg:col-span-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="text-xs text-stone-400 mb-0.5">
                          {getBookingRatingWord(rev.score)}
                        </div>
                        <h3
                          className="text-lg font-bold text-stone-950"
                          style={{fontFamily: 'var(--font-display), serif'}}
                        >
                          “{rev.title}”
                        </h3>
                      </div>

                      {/* Booking Blue Score Badge */}
                      <div className="w-11 h-11 rounded-t-xl rounded-br-xl bg-[#003580] text-white font-mono tabular-nums font-bold text-sm flex items-center justify-center shrink-0">
                        {rev.score.toFixed(1)}
                      </div>
                    </div>

                    {/* Positive comment block */}
                    <div className="space-y-2.5 text-sm text-stone-700 leading-relaxed mb-4">
                      <p>
                        <strong className="text-teal-800 font-semibold">
                          {lang === 'es' ? 'Lo que más gustó: ' : 'Liked most: '}
                        </strong>
                        {rev.positiveComment}
                      </p>
                      {rev.extraTip && (
                        <p className="text-xs text-stone-600 bg-[#FAF8F5] border border-stone-200/80 rounded-xl p-3">
                          <strong className="text-stone-900 font-semibold">
                            {lang === 'es'
                              ? 'Consejo del viajero: '
                              : 'Traveler tip: '}
                          </strong>
                          {rev.extraTip}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Sub-scores & Helpful Button */}
                  <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
                    <div className="flex flex-wrap items-center gap-2 font-mono tabular-nums">
                      <span>
                        {lang === 'es' ? 'Guía' : 'Guide'}:{' '}
                        {rev.categories.guides}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {lang === 'es' ? 'Precio' : 'Value'}:{' '}
                        {rev.categories.value}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {lang === 'es' ? 'Comida' : 'Food'}:{' '}
                        {rev.categories.food}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleHelpfulVote(rev.id)}
                        disabled={hasVoted}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          hasVoted
                            ? 'bg-teal-50 border-teal-200 text-teal-800'
                            : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>
                          {lang === 'es' ? 'Útil' : 'Helpful'} (
                          {rev.helpfulCount})
                        </span>
                      </button>

                      {rev.isUserCreated && (
                        <button
                          type="button"
                          onClick={() => handleDeleteUserReview(rev.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 text-xs font-medium transition-colors"
                          title={
                            lang === 'es'
                              ? 'Eliminar mi comentario de la caché'
                              : 'Delete my review from cache'
                          }
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
