export interface TourStop {
  order: string;
  place: string;
  description: string;
}

export interface TourPackage {
  id: number;
  code: string;
  numberLabel: string;
  name: string;
  title: string;
  subtitle: string;
  dailyCapacity: number;
  monthlyCapacity: number;
  includes: string;
  includesList: string[];
  itinerarySummary: string;
  schedule: string;
  priceUSD: number;
  image: string;
  secondaryImage: string;
  stops: TourStop[];
  highlightFood: string;
}

export interface LogoElementMeaning {
  id: string;
  title: string;
  symbolism: string;
  detail: string;
}

export interface GastronomyItem {
  id: string;
  name: string;
  origin: string;
  tourReference: string;
  description: string;
  image: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  location: string;
  category: 'playas' | 'cultura' | 'gastronomia';
  categoryLabel: string;
  description: string;
  relatedPackageId: number;
}

export const ASSETS = {
  logo: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_1.59.19_PM_5579e6a4.jpeg',
  campBayBeach: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_11.33.02_AM__5__a73af0f5.jpeg',
  puntaGordaDock: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_11.33.02_AM__7__352b8587.jpeg',
  garifunaHuts: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_11.33.02_AM__6__970436c9.jpeg',
  mangrovesTunnel: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_11.33.02_AM__3__1524e8c5.jpeg',
  seafoodSoup: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_11.33.02_AM__2__936103c0.jpeg',
  friedFishSalad: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_11.33.02_AM__1__8c1bffad.jpeg',
  friedFishLemon: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_11.33.02_AM_76947191.jpeg',
} as const;

export const LOCAL_DISCOUNT_PERCENT = 10;
export const HNL_EXCHANGE_RATE = 25.4;

export const COMPANY_INFO = {
  name: 'Roatán Auténtica',
  slogan: 'Redescubre tu tierra, enamórate de lo nuestro.',
  whoWeAre:
    'Somos una empresa turística que nace con el propósito de dar a conocer las bellezas y experiencias de nuestra isla, ofreciendo paquetes turísticos a precios accesibles. Buscamos brindar nuevas oportunidades para que más personas puedan descubrir, disfrutar y vivir lo mejor de nuestra isla, impulsando así el turismo local.',
  logoStory:
    'Nuestro logo representa la riqueza cultural, las tradiciones y las bellezas naturales de Roatán. Cada elemento refleja la esencia de nuestra isla: el atardecer y el mar representan sus paisajes, las palmeras y las aves su naturaleza, y la mujer garífuna con su tambor simboliza nuestras raíces, cultura y tradiciones.',
  mission:
    'Ofrecer experiencias turísticas accesibles y de calidad, promoviendo los atractivos de nuestra isla.',
  vision:
    'Convertirnos en una empresa turística reconocida por brindar experiencias únicas, precios accesibles y contribuir al crecimiento del turismo local.',
  valuesText:
    'Compromiso, responsabilidad, honestidad, amabilidad y pasión por el turismo.',
  valuesList: [
    {
      name: 'Compromiso',
      description: 'Dedicación total con nuestros visitantes y con el desarrollo sostenible de las comunidades de Roatán.',
    },
    {
      name: 'Responsabilidad',
      description: 'Puntualidad garantizada en salidas y regresos al muelle de cruceros, cuidando cada entorno natural que visitamos.',
    },
    {
      name: 'Honestidad',
      description: 'Precios transparentes, trato justo con tarifas accesibles y un descuento real del 10% para personas locales.',
    },
    {
      name: 'Amabilidad',
      description: 'Calidez humana isleña en cada recorrido guiado, haciendo que cada viajero se sienta en familia.',
    },
    {
      name: 'Pasión por el turismo',
      description: 'Orgullo profundo por compartir nuestra historia, gastronomía, música, playas y manglares.',
    },
  ],
  whatYouCanFindIntro:
    'Con nosotros podrás descubrir una Roatán llena de aventuras, cultura y sabores. Ofrecemos experiencias para todos los gustos.',
  whatYouCanFindDetail:
    'Conocerás la riqueza cultural de Roatán a través de sus diferentes comunidades: garífunas, misquitas, isleñas y otros grupos que forman parte de nuestra identidad. Descubrirás su historia, costumbres, gastronomía, música, bailes y tradiciones, además de disfrutar de sus playas, manglares y paisajes únicos.',
};

export const LOGO_MEANINGS: LogoElementMeaning[] = [
  {
    id: 'mujer-garifuna',
    title: 'La Mujer Garífuna y su Tambor',
    symbolism: 'Nuestras raíces, cultura viva y tradiciones ancestrales',
    detail:
      'En el corazón del emblema, la mujer garífuna tocando el tambor tradicional (Primero y Segunda) honra la herencia afrocaribeña de Punta Gorda, su música punta, sus danzas y la fuerza cultural de las comunidades de la isla.',
  },
  {
    id: 'atardecer-mar',
    title: 'El Atardecer Cálido y el Mar Caribe',
    symbolism: 'Los paisajes costeros y aguas cristalinas de Roatán',
    detail:
      'El sol poniéndose sobre el horizonte turquesa representa la serenidad de nuestras costas, desde los miradores altos de Las Banderas hasta las aguas tranquilas de Camp Bay y View Bay.',
  },
  {
    id: 'palmeras-aves',
    title: 'Las Palmeras, Guacamayas y Pelícanos',
    symbolism: 'La biodiversidad tropical y flora de nuestra tierra',
    detail:
      'Las aves en vuelo libre y las palmeras cocoteras reflejan la riqueza ecológica que preservamos en nuestros recorridos hacia el Jardín Botánico, Manawikie y los túneles de manglares.',
  },
  {
    id: 'cayuco-arrecife',
    title: 'El Cayuco Tradicional y el Arrecife Coralino',
    symbolism: 'La vida marinera isleña y el tesoro submarino',
    detail:
      'El pescador remando en su cayuco junto a los corales multicolores simboliza el vínculo histórico de las familias isleñas, garífunas y misquitas con el mar y la experiencia de snorkeling en el segundo arrecife más grande del mundo.',
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 1,
    code: 'PAQUETE-01',
    numberLabel: '3.1. Paquete 1',
    name: 'Island Soul Escape',
    title: 'Paquete 1: Island Soul Escape',
    subtitle: 'Las Banderas, West Bay y Punta Gorda con experiencias culturales y gastronómicas',
    dailyCapacity: 15,
    monthlyCapacity: 180,
    includes: 'Transporte, guía turístico y lancha',
    includesList: [
      'Incluye transporte, guía turístico y lancha',
      'Recorrido panorámico por Las Banderas y playa West Bay',
      'Inmersión en Punta Gorda con experiencias culturales y gastronómicas',
      'Cupo exclusivo estimado: 15 clientes diarios (180 mensuales)',
    ],
    itinerarySummary:
      'Ofrece un recorrido por Las Banderas, West Bay y Punta Gorda, incluyendo experiencias culturales y gastronómicas. Salida del muelle y regreso puntual al muelle de cruceros.',
    schedule: '9:00 AM - 2:00 PM',
    priceUSD: 65,
    image: ASSETS.puntaGordaDock,
    secondaryImage: ASSETS.campBayBeach,
    highlightFood: 'Experiencias culturales, música garífuna y gastronomía tradicional en Punta Gorda',
    stops: [
      {
        order: '9:00 AM',
        place: 'Salida del Muelle hacia Las Banderas',
        description:
          'Recepción en el muelle y ascenso hacia el mirador Las Banderas para disfrutar de las vistas panorámicas de la isla.',
      },
      {
        order: '10:30 AM',
        place: 'Playa West Bay y Recorrido en Lancha',
        description:
          'Travesía costera y visita a las aguas cristalinas y arenas blancas de West Bay.',
      },
      {
        order: '12:15 PM',
        place: 'Comunidad Garífuna de Punta Gorda',
        description:
          'Experiencias culturales y gastronómicas en Punta Gorda para disfrutar de la música tradicional en vivo y la comida típica frente al mar.',
      },
      {
        order: '2:00 PM',
        place: 'Regreso al Muelle de Cruceros',
        description:
          'Retorno seguro y puntual al muelle de cruceros.',
      },
    ],
  },
  {
    id: 2,
    code: 'PAQUETE-02',
    numberLabel: '3.2. Paquete 2',
    name: 'Roots & Reefs',
    title: 'Paquete 2: Roots & Reefs',
    subtitle: 'Casa de la Cultura, French Harbour, gastronomía local, manglares y snorkeling',
    dailyCapacity: 12,
    monthlyCapacity: 144,
    includes: 'Transporte y guía turístico',
    includesList: [
      'Incluye transporte y guía turístico durante el recorrido',
      'Visita guiada a la Casa de la Cultura y French Harbour',
      'Degustación de gastronomía local (La Cocina de Don Jorge)',
      'Paseo por los manglares y actividad de snorkeling (Cupo: 12 clientes diarios)',
    ],
    itinerarySummary:
      'Incluye visita a la Casa de la Cultura, French Harbour, gastronomía local (comida en la cocina de Don Jorge), manglares y actividad de snorkeling.',
    schedule: '9:00 AM - 2:00 PM',
    priceUSD: 60,
    image: ASSETS.mangrovesTunnel,
    secondaryImage: ASSETS.garifunaHuts,
    highlightFood: 'Gastronomía local isleña en French Harbour (La Cocina de Don Jorge)',
    stops: [
      {
        order: '9:00 AM',
        place: 'Salida del Muelle hacia la Casa de la Cultura',
        description:
          'Encuentro en el muelle de cruceros y visita a la Casa de la Cultura para conocer nuestras raíces isleñas y garífunas.',
      },
      {
        order: '11:00 AM',
        place: 'French Harbour y Gastronomía Local',
        description:
          'Recorrido por French Harbour y parada gastronómica en La Cocina de Don Jorge para disfrutar del auténtico sabor isleño.',
      },
      {
        order: '12:30 PM',
        place: 'Paseo por los Manglares y Snorkeling',
        description:
          'Navegación por los túneles naturales de manglares y actividad de snorkeling en el arrecife coralino.',
      },
      {
        order: '2:00 PM',
        place: 'Finalización y Retorno al Muelle',
        description:
          'Regreso directo al muelle de cruceros o punto de encuentro.',
      },
    ],
  },
  {
    id: 3,
    code: 'PAQUETE-03',
    numberLabel: '3.3. Paquete 3',
    name: 'Into the Blue',
    title: 'Paquete 3: Into the Blue',
    subtitle: 'Experiencia de naturaleza, recorridos por los manglares, snorkeling y playa',
    dailyCapacity: 12,
    monthlyCapacity: 144,
    includes: 'Transporte y guía turístico',
    includesList: [
      'Incluye transporte y guía turístico durante todo el recorrido',
      'Experiencia de naturaleza por manglares, Jardín Botánico y Manawikie',
      'Actividades de snorkeling en aguas cristalinas del arrecife',
      'Tarde frente al mar en View Bay Beach Grill (Cupo: 12 clientes diarios)',
    ],
    itinerarySummary:
      'Ofrece una experiencia de naturaleza mediante recorridos por los manglares y actividades de snorkeling, complementado con el Jardín Botánico, Manawikie y View Bay Beach Grill.',
    schedule: '9:00 AM - 2:00 PM',
    priceUSD: 55,
    image: ASSETS.campBayBeach,
    secondaryImage: ASSETS.friedFishSalad,
    highlightFood: 'Tarde gastronómica frente al mar en View Bay Beach Grill',
    stops: [
      {
        order: '9:00 AM',
        place: 'Salida del Muelle e Inmersión Natural',
        description:
          'Partida desde el muelle de cruceros hacia el Jardín Botánico y Manawikie para conectar con la flora y fauna de Roatán.',
      },
      {
        order: '10:45 AM',
        place: 'Recorrido por los Manglares y Snorkeling',
        description:
          'Experiencia de naturaleza navegando por los canales de manglares seguida de actividades de snorkeling en aguas turquesas.',
      },
      {
        order: '12:30 PM',
        place: 'View Bay Beach Grill',
        description:
          'Parada en View Bay Beach Grill para alimentarse y disfrutar la tarde frente al mar Caribe.',
      },
      {
        order: '2:00 PM',
        place: 'Regreso al Muelle de Cruceros',
        description:
          'Retorno puntual con acompañamiento del guía turístico.',
      },
    ],
  },
];

export const GASTRONOMY_ITEMS: GastronomyItem[] = [
  {
    id: 'sopa-marinera',
    name: 'Sopa Marinera Isleña con Leche de Coco',
    origin: 'Tradición Garífuna e Isleña · Punta Gorda',
    tourReference: 'Destacado en Paquete 1: Island Soul Escape ($65.00)',
    description:
      'Caldo cremoso preparado a fuego lento con leche de coco recién exprimida, caracol, cangrejo, pescado fresco, plátano, yuca y cilantro ancho.',
    image: ASSETS.seafoodSoup,
  },
  {
    id: 'pescado-don-jorge',
    name: 'Pescado Frito Entero con Rice & Beans y Ensalada',
    origin: 'La Cocina de Don Jorge · French Harbour',
    tourReference: 'Destacado en Paquete 2: Roots & Reefs ($60.00)',
    description:
      'Pargo rojo frito al momento hasta lograr una piel dorada y crujiente, acompañado de arroz con frijoles en leche de coco, tajadas de plátano verde y encurtido fresco.',
    image: ASSETS.friedFishSalad,
  },
  {
    id: 'plato-costero-view-bay',
    name: 'Pescado Dorado Isleño con Tajadas y Limón Criollo',
    origin: 'View Bay Beach Grill & Champas Costeras',
    tourReference: 'Destacado en Paquete 3: Into the Blue ($55.00)',
    description:
      'El clásico sabor de las playas de Roatán: pescado entero sazonado con especias isleñas, servido con casamiento caribeño y plátanos fritos junto a la orilla del mar.',
    image: ASSETS.friedFishLemon,
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'foto-playa-camp-bay',
    src: ASSETS.campBayBeach,
    title: 'Aguas Cristalinas y Arrecife Costero',
    location: 'Camp Bay / Costa Norte de Roatán',
    category: 'playas',
    categoryLabel: 'Playas y Naturaleza',
    description:
      'Vistas inigualables de aguas turquesas y formaciones rocosas naturales donde nuestros visitantes disfrutan de la brisa marina y el paisaje virgen.',
    relatedPackageId: 1,
  },
  {
    id: 'foto-muelle-punta-gorda',
    src: ASSETS.puntaGordaDock,
    title: 'Champas sobre el Mar y Cayuco Tradicional',
    location: 'Punta Gorda, Roatán',
    category: 'cultura',
    categoryLabel: 'Cultura y Comunidades',
    description:
      'Las icónicas champas de palma sobre pilotes de madera en el mar y las lanchas artesanales de los pescadores locales en Punta Gorda.',
    relatedPackageId: 1,
  },
  {
    id: 'foto-manglares',
    src: ASSETS.mangrovesTunnel,
    title: 'Túneles Naturales de Manglares',
    location: 'Canales de French Harbor y Oak Ridge',
    category: 'playas',
    categoryLabel: 'Playas y Naturaleza',
    description:
      'Navegación serena entre las raíces entrelazadas del manglar rojo, un ecosistema vital que protege el arrecife coralino de nuestra isla.',
    relatedPackageId: 2,
  },
  {
    id: 'foto-champas-garifunas',
    src: ASSETS.garifunaHuts,
    title: 'Arquitectura Tradicional de Palma y Cocoteros',
    location: 'Casa de la Cultura / Comunidad Garífuna',
    category: 'cultura',
    categoryLabel: 'Cultura y Comunidades',
    description:
      'Viviendas tradicionales construidas con hojas de palma real y madera local frente al cielo azul del Caribe, símbolo de nuestras comunidades ancestrales.',
    relatedPackageId: 2,
  },
  {
    id: 'foto-sopa-marinera',
    src: ASSETS.seafoodSoup,
    title: 'Sopa Marinera con Leche de Coco y Mariscos',
    location: 'Cocinas Tradicionales de Roatán',
    category: 'gastronomia',
    categoryLabel: 'Gastronomía Isleña',
    description:
      'El sabor inconfundible del coco, plátano y frutos frescos del mar Caribe preparados con recetas transmitidas de generación en generación.',
    relatedPackageId: 1,
  },
  {
    id: 'foto-pescado-ensalada',
    src: ASSETS.friedFishSalad,
    title: 'Pescado Frito Isleño con Rice & Beans',
    location: 'La Cocina de Don Jorge, French Harbor',
    category: 'gastronomia',
    categoryLabel: 'Gastronomía Isleña',
    description:
      'Almuerzo tradicional completo servido durante nuestros recorridos: pescado fresco entero, rice and beans con coco, tajadas de plátano y ensalada fresca.',
    relatedPackageId: 2,
  },
  {
    id: 'foto-pescado-limon',
    src: ASSETS.friedFishLemon,
    title: 'Sazón Costera Frente al Mar',
    location: 'View Bay Beach Grill',
    category: 'gastronomia',
    categoryLabel: 'Gastronomía Isleña',
    description:
      'Plato típico isleño ideal para disfrutar la tarde después de recorrer el Jardín Botánico y Manawikie.',
    relatedPackageId: 3,
  },
];

export const CULTURAL_COMMUNITIES = [
  {
    index: '01.',
    name: 'Comunidad Garífuna',
    settlement: 'Punta Gorda (Desde 1797)',
    description:
      'Guardianes del tambor, el baile punta, la lengua garífuna y recetas ancestrales a base de coco, yuca y mariscos frescos.',
  },
  {
    index: '02.',
    name: 'Comunidad Misquita',
    settlement: 'Herencia Marítima y Costera',
    description:
      'Maestros navegantes y buzos con una profunda conexión espiritual y ecológica con el mar Caribe y los manglares de las Islas de la Bahía.',
  },
  {
    index: '03.',
    name: 'Comunidad Isleña Criolla',
    settlement: 'French Harbor, Coxen Hole y Oak Ridge',
    description:
      'Tradición bilingüe afroantillana y caribeña famosa por su arquitectura sobre pilotes, su hospitalidad y el auténtico Rice and Beans isleño.',
  },
];

export function calculatePrice(
  baseUSD: number,
  isLocal: boolean,
  currency: 'USD' | 'HNL'
): {
  finalAmount: string;
  originalAmount: string;
  savingsAmount: string;
  currencySymbol: string;
  numericFinal: number;
} {
  const discountedUSD = isLocal
    ? baseUSD * (1 - LOCAL_DISCOUNT_PERCENT / 100)
    : baseUSD;
  const savingsUSD = baseUSD - discountedUSD;

  if (currency === 'HNL') {
    const finalHNL = discountedUSD * HNL_EXCHANGE_RATE;
    const origHNL = baseUSD * HNL_EXCHANGE_RATE;
    const saveHNL = savingsUSD * HNL_EXCHANGE_RATE;
    return {
      finalAmount: `L ${finalHNL.toLocaleString('es-HN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      originalAmount: `L ${origHNL.toLocaleString('es-HN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      savingsAmount: `L ${saveHNL.toLocaleString('es-HN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      currencySymbol: 'L',
      numericFinal: finalHNL,
    };
  }

  return {
    finalAmount: `$${discountedUSD.toFixed(2)}`,
    originalAmount: `$${baseUSD.toFixed(2)}`,
    savingsAmount: `$${savingsUSD.toFixed(2)}`,
    currencySymbol: '$',
    numericFinal: discountedUSD,
  };
}
