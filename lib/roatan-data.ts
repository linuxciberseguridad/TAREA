export type Language = 'es' | 'en';

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

export interface BookingReview {
  id: string;
  authorName: string;
  country: string;
  travelerType: string;
  packageId: number;
  packageName: string;
  date: string;
  score: number; // 1 to 10 scale (Booking.com style)
  categories: {
    guides: number;
    value: number;
    food: number;
    punctuality: number;
  };
  title: string;
  positiveComment: string;
  extraTip?: string;
  helpfulCount: number;
  isUserCreated?: boolean;
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

export const INITIAL_BOOKING_REVIEWS: BookingReview[] = [
  {
    id: 'rev-1',
    authorName: 'Carlos & Elena Mendoza',
    country: 'Tegucigalpa, Honduras',
    travelerType: 'Pareja · Tarifa Local (-10%)',
    packageId: 1,
    packageName: 'Paquete 1: Island Soul Escape',
    date: '2026-11-18',
    score: 9.8,
    categories: {
      guides: 10,
      value: 9.8,
      food: 10,
      punctuality: 9.6,
    },
    title: 'Inolvidable recorrido a Punta Gorda y Las Banderas',
    positiveComment:
      'La atención del guía fue de primera desde las 9:00 AM. Nos encantó el paseo en lancha, las vistas en Las Banderas, la playa en West Bay y terminar bailando punta con sopa marinera fresca en Punta Gorda. Además nos aplicaron el 10% de descuento local al instante.',
    extraTip: 'Lleven protector solar biodegradable y cámara con batería completa.',
    helpfulCount: 14,
  },
  {
    id: 'rev-2',
    authorName: 'Sarah Jenkins',
    country: 'Miami, Estados Unidos',
    travelerType: 'Crucerista · Familia',
    packageId: 2,
    packageName: 'Paquete 2: Roots & Reefs',
    date: '2026-11-14',
    score: 9.6,
    categories: {
      guides: 9.8,
      value: 9.6,
      food: 9.5,
      punctuality: 9.8,
    },
    title: 'Best authentic cultural & mangrove tour in Roatán!',
    positiveComment:
      'We arrived on a cruise ship at 8:30 AM and our guide was waiting right on time. Visiting Casa de la Cultura, eating fried red snapper with rice and beans at Don Jorge’s kitchen in French Harbour, and snorkeling after the mangrove tunnels was magical. Back at the port before 2:00 PM!',
    extraTip: 'Ask for the homemade coconut hot sauce at Don Jorge’s kitchen.',
    helpfulCount: 19,
  },
  {
    id: 'rev-3',
    authorName: 'Roberto Valladares',
    country: 'San Pedro Sula, Honduras',
    travelerType: 'Grupo de Amigos · Tarifa Local (-10%)',
    packageId: 3,
    packageName: 'Paquete 3: Into the Blue',
    date: '2026-11-10',
    score: 9.5,
    categories: {
      guides: 9.6,
      value: 9.8,
      food: 9.4,
      punctuality: 9.5,
    },
    title: 'Naturaleza pura en los manglares y excelente snorkeling',
    positiveComment:
      'A $55 dólares (y $49.50 con el 10% de descuento para locales) el paquete Into the Blue vale cada centavo. El paseo por los túneles de manglares y el snorkeling en el arrecife estuvieron espectaculares, y cerramos con pescado frito frente al mar en View Bay Beach Grill.',
    extraTip: 'Ideal para quienes buscan naturaleza tranquila y arrecifes vírgenes.',
    helpfulCount: 11,
  },
];

export const BILINGUAL_CONTENT: Record<
  Language,
  {
    companyInfo: {
      name: string;
      slogan: string;
      whoWeAre: string;
      logoStory: string;
      mission: string;
      vision: string;
      valuesText: string;
      valuesList: {name: string; description: string}[];
      whatYouCanFindIntro: string;
      whatYouCanFindDetail: string;
    };
    logoMeanings: LogoElementMeaning[];
    tourPackages: TourPackage[];
    gastronomyItems: GastronomyItem[];
    galleryPhotos: GalleryPhoto[];
    culturalCommunities: {
      index: string;
      name: string;
      settlement: string;
      description: string;
    }[];
  }
> = {
  es: {
    companyInfo: {
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
          description:
            'Dedicación total con nuestros visitantes y con el desarrollo sostenible de las comunidades de Roatán.',
        },
        {
          name: 'Responsabilidad',
          description:
            'Puntualidad garantizada en salidas y regresos al muelle de cruceros, cuidando cada entorno natural que visitamos.',
        },
        {
          name: 'Honestidad',
          description:
            'Precios transparentes, trato justo con tarifas accesibles y un descuento real del 10% para personas locales.',
        },
        {
          name: 'Amabilidad',
          description:
            'Calidez humana isleña en cada recorrido guiado, haciendo que cada viajero se sienta en familia.',
        },
        {
          name: 'Pasión por el turismo',
          description:
            'Orgullo profundo por compartir nuestra historia, gastronomía, música, playas y manglares.',
        },
      ],
      whatYouCanFindIntro:
        'Con nosotros podrás descubrir una Roatán llena de aventuras, cultura y sabores. Ofrecemos experiencias para todos los gustos.',
      whatYouCanFindDetail:
        'Conocerás la riqueza cultural de Roatán a través de sus diferentes comunidades: garífunas, misquitas, isleñas y otros grupos que forman parte de nuestra identidad. Descubrirás su historia, costumbres, gastronomía, música, bailes y tradiciones, además de disfrutar de sus playas, manglares y paisajes únicos.',
    },
    logoMeanings: [
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
          'El sol poniéndose sobre el horizonte turquesa representa la serenidad de nuestras costas, desde los miradores altos de Las Banderas hasta las aguas tranquilas de West Bay, Camp Bay y View Bay.',
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
    ],
    tourPackages: [
      {
        id: 1,
        code: 'PAQUETE-01',
        numberLabel: '3.1. Paquete 1',
        name: 'Island Soul Escape',
        title: 'Paquete 1: Island Soul Escape',
        subtitle:
          'Las Banderas, West Bay y Punta Gorda con experiencias culturales y gastronómicas',
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
        highlightFood:
          'Experiencias culturales, música garífuna y gastronomía tradicional en Punta Gorda',
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
            description: 'Retorno seguro y puntual al muelle de cruceros.',
          },
        ],
      },
      {
        id: 2,
        code: 'PAQUETE-02',
        numberLabel: '3.2. Paquete 2',
        name: 'Roots & Reefs',
        title: 'Paquete 2: Roots & Reefs',
        subtitle:
          'Casa de la Cultura, French Harbour, gastronomía local, manglares y snorkeling',
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
        highlightFood:
          'Gastronomía local isleña en French Harbour (La Cocina de Don Jorge)',
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
        subtitle:
          'Experiencia de naturaleza, recorridos por los manglares, snorkeling y playa',
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
        highlightFood:
          'Tarde gastronómica frente al mar en View Bay Beach Grill',
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
    ],
    gastronomyItems: [
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
    ],
    galleryPhotos: [
      {
        id: 'foto-playa-camp-bay',
        src: ASSETS.campBayBeach,
        title: 'Aguas Cristalinas y Arrecife Costero',
        location: 'Costa Turquesa de Roatán',
        category: 'playas',
        categoryLabel: 'Playas y Naturaleza',
        description:
          'Vistas inigualables de aguas turquesas y formaciones rocosas naturales donde nuestros visitantes disfrutan de la brisa marina y el snorkeling.',
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
        location: 'Canales de French Harbour y Oak Ridge',
        category: 'playas',
        categoryLabel: 'Playas y Naturaleza',
        description:
          'Navegación serena entre las raíces entrelazadas del manglar rojo, un ecosistema vital incluido en Roots & Reefs e Into the Blue.',
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
        location: 'La Cocina de Don Jorge, French Harbour',
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
          'Plato típico isleño ideal para disfrutar la tarde frente al mar después de las actividades de manglares y snorkeling.',
        relatedPackageId: 3,
      },
    ],
    culturalCommunities: [
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
        settlement: 'French Harbour, Coxen Hole y Oak Ridge',
        description:
          'Tradición bilingüe afroantillana y caribeña famosa por su arquitectura sobre pilotes, su hospitalidad y el auténtico Rice and Beans isleño.',
      },
    ],
  },
  en: {
    companyInfo: {
      name: 'Roatán Auténtica',
      slogan: 'Rediscover your land, fall in love with what is ours.',
      whoWeAre:
        'We are a local tourism company born with the purpose of showcasing the natural beauty and authentic experiences of our island, offering tour packages at accessible prices. We strive to create new opportunities so more people can discover, enjoy, and live the very best of our island while boosting local community tourism.',
      logoStory:
        'Our logo represents the cultural richness, traditions, and natural beauty of Roatán. Every element reflects the essence of our island: the sunset and sea represent our coastal landscapes, the palm trees and birds our tropical nature, and the Garífuna woman with her drum symbolizes our roots, living culture, and ancestral traditions.',
      mission:
        'To offer accessible, high-quality tourism experiences while promoting the authentic attractions and heritage of our island.',
      vision:
        'To become a recognized tourism company celebrated for delivering unique experiences, accessible prices, and contributing to the growth of local tourism.',
      valuesText:
        'Commitment, responsibility, honesty, kindness, and passion for tourism.',
      valuesList: [
        {
          name: 'Commitment',
          description:
            'Full dedication to our guests and to the sustainable development of Roatán’s local communities.',
        },
        {
          name: 'Responsibility',
          description:
            'Guaranteed punctuality on departures and cruise port returns, protecting every natural ecosystem we visit.',
        },
        {
          name: 'Honesty',
          description:
            'Transparent pricing, fair treatment with accessible rates, and a genuine 10% discount for local residents.',
        },
        {
          name: 'Kindness',
          description:
            'Warm island hospitality on every guided tour, making every traveler feel like family.',
        },
        {
          name: 'Passion for Tourism',
          description:
            'Deep pride in sharing our history, island cuisine, drumming, beaches, and mangrove sanctuaries.',
        },
      ],
      whatYouCanFindIntro:
        'With us you will discover a Roatán full of adventure, living culture, and Caribbean flavors. We offer experiences tailored for every traveler.',
      whatYouCanFindDetail:
        'You will experience the cultural wealth of Roatán through its diverse communities: Garífuna, Miskito, Creole Islanders, and other groups that shape our identity. You will discover their history, customs, gastronomy, music, dances, and traditions, while enjoying crystal-clear beaches, mangrove tunnels, and unique landscapes.',
    },
    logoMeanings: [
      {
        id: 'mujer-garifuna',
        title: 'The Garífuna Woman & Her Drum',
        symbolism: 'Our roots, living culture, and ancestral traditions',
        detail:
          'At the heart of our emblem, the Garífuna woman playing the traditional drum honors the Afro-Caribbean heritage of Punta Gorda, its Punta music, dances, and the cultural spirit of the island’s communities.',
      },
      {
        id: 'atardecer-mar',
        title: 'The Warm Sunset & Caribbean Sea',
        symbolism: 'Roatán’s coastal landscapes and turquoise waters',
        detail:
          'The sun setting over the turquoise horizon represents the serenity of our shores, from the high viewpoints of Las Banderas to the calm waters of West Bay, Camp Bay, and View Bay.',
      },
      {
        id: 'palmeras-aves',
        title: 'Palm Trees, Scarlet Macaws & Pelicans',
        symbolism: 'Tropical biodiversity and native island flora',
        detail:
          'Free-flying tropical birds and coconut palms reflect the ecological wealth we preserve across our tours to the Botanical Garden, Manawikie, and red mangrove tunnels.',
      },
      {
        id: 'cayuco-arrecife',
        title: 'The Traditional Cayuco Canoe & Coral Reef',
        symbolism: 'Island seafaring life and underwater treasure',
        detail:
          'The fisherman paddling his traditional dugout canoe alongside vibrant corals symbolizes the historic bond between Islander, Garífuna, and Miskito families and the sea, as well as snorkeling the world’s second-largest barrier reef.',
      },
    ],
    tourPackages: [
      {
        id: 1,
        code: 'PAQUETE-01',
        numberLabel: '3.1. Package 1',
        name: 'Island Soul Escape',
        title: 'Package 1: Island Soul Escape',
        subtitle:
          'Las Banderas, West Bay & Punta Gorda with cultural and culinary experiences',
        dailyCapacity: 15,
        monthlyCapacity: 180,
        includes: 'Transport, tour guide, and boat ride',
        includesList: [
          'Includes round-trip transport, certified tour guide, and boat ride',
          'Panoramic tour through Las Banderas viewpoint and West Bay Beach',
          'Cultural & culinary immersion in the Garífuna community of Punta Gorda',
          'Estimated capacity: 15 daily guests (180 monthly guests)',
        ],
        itinerarySummary:
          'Offers a scenic tour through Las Banderas, West Bay, and Punta Gorda, including authentic cultural and culinary experiences. Departing from the dock with guaranteed punctual return to the cruise port.',
        schedule: '9:00 AM - 2:00 PM',
        priceUSD: 65,
        image: ASSETS.puntaGordaDock,
        secondaryImage: ASSETS.campBayBeach,
        highlightFood:
          'Cultural experiences, live Garífuna drumming, and traditional seafood cuisine in Punta Gorda',
        stops: [
          {
            order: '9:00 AM',
            place: 'Dock Departure to Las Banderas Viewpoint',
            description:
              'Port pickup and ascent to Las Banderas viewpoint to enjoy panoramic views across both coasts of Roatán.',
          },
          {
            order: '10:30 AM',
            place: 'West Bay Beach & Coastal Boat Ride',
            description:
              'Scenic coastal boat excursion and time to enjoy the crystal-clear turquoise waters and white sands of West Bay.',
          },
          {
            order: '12:15 PM',
            place: 'Punta Gorda Garífuna Community',
            description:
              'Cultural and gastronomic experiences in Punta Gorda featuring live traditional drumming, dancing, and seaside island cuisine.',
          },
          {
            order: '2:00 PM',
            place: 'Return to Cruise Port / Meeting Point',
            description: 'Safe and punctual return to the cruise ship terminal.',
          },
        ],
      },
      {
        id: 2,
        code: 'PAQUETE-02',
        numberLabel: '3.2. Package 2',
        name: 'Roots & Reefs',
        title: 'Package 2: Roots & Reefs',
        subtitle:
          'House of Culture, French Harbour, local cuisine, mangroves, and snorkeling',
        dailyCapacity: 12,
        monthlyCapacity: 144,
        includes: 'Transport and tour guide',
        includesList: [
          'Includes comfortable transport and certified tour guide',
          'Guided visit to Casa de la Cultura (House of Culture) and French Harbour',
          'Authentic local gastronomy stop (Don Jorge’s Kitchen)',
          'Mangrove tunnel boat tour and reef snorkeling activity (12 daily guests est.)',
        ],
        itinerarySummary:
          'Includes a visit to the House of Culture, French Harbour, local gastronomy (lunch at Don Jorge’s Kitchen), mangrove tunnels, and reef snorkeling activity.',
        schedule: '9:00 AM - 2:00 PM',
        priceUSD: 60,
        image: ASSETS.mangrovesTunnel,
        secondaryImage: ASSETS.garifunaHuts,
        highlightFood:
          'Authentic island cuisine in French Harbour (Don Jorge’s Kitchen)',
        stops: [
          {
            order: '9:00 AM',
            place: 'Cruise Port Departure to Casa de la Cultura',
            description:
              'Meet at the cruise port and visit the House of Culture to explore our Islander, Miskito, and Garífuna heritage.',
          },
          {
            order: '11:00 AM',
            place: 'French Harbour & Local Gastronomy',
            description:
              'Tour through French Harbour and culinary stop at Don Jorge’s Kitchen to savor crispy fried fish, coconut rice & beans, and plantains.',
          },
          {
            order: '12:30 PM',
            place: 'Mangrove Tunnels & Snorkeling Activity',
            description:
              'Navigate through natural red mangrove channels followed by a guided snorkeling session over vibrant coral reefs.',
          },
          {
            order: '2:00 PM',
            place: 'Completion & Return to Port',
            description:
              'Direct and punctual return to the cruise terminal or hotel pickup point.',
          },
        ],
      },
      {
        id: 3,
        code: 'PAQUETE-03',
        numberLabel: '3.3. Package 3',
        name: 'Into the Blue',
        title: 'Package 3: Into the Blue',
        subtitle:
          'Nature experience through mangrove tunnels, reef snorkeling, and beach afternoon',
        dailyCapacity: 12,
        monthlyCapacity: 144,
        includes: 'Transport and tour guide',
        includesList: [
          'Includes round-trip transport and dedicated bilingual tour guide',
          'Nature immersion through mangrove channels, Botanical Garden & Manawikie',
          'Guided snorkeling activities in crystal-clear Caribbean reef waters',
          'Seaside afternoon & dining at View Bay Beach Grill (12 daily guests est.)',
        ],
        itinerarySummary:
          'Offers an immersive nature experience featuring tours through mangrove tunnels and coral reef snorkeling activities, complemented by the Botanical Garden, Manawikie, and View Bay Beach Grill.',
        schedule: '9:00 AM - 2:00 PM',
        priceUSD: 55,
        image: ASSETS.campBayBeach,
        secondaryImage: ASSETS.friedFishSalad,
        highlightFood:
          'Seaside dining and relaxing afternoon at View Bay Beach Grill',
        stops: [
          {
            order: '9:00 AM',
            place: 'Port Departure & Tropical Nature Immersion',
            description:
              'Depart from the cruise port toward the Botanical Garden and Manawikie to connect with Roatán’s native flora and wildlife.',
          },
          {
            order: '10:45 AM',
            place: 'Mangrove Tour & Snorkeling Activity',
            description:
              'Nature experience cruising through mangrove waterways followed by guided snorkeling in turquoise reef waters.',
          },
          {
            order: '12:30 PM',
            place: 'View Bay Beach Grill',
            description:
              'Stop at View Bay Beach Grill to enjoy fresh island seafood and relax by the Caribbean breeze.',
          },
          {
            order: '2:00 PM',
            place: 'Return to Cruise Port',
            description:
              'Punctual return escorted by your tour guide straight to the terminal gate.',
          },
        ],
      },
    ],
    gastronomyItems: [
      {
        id: 'sopa-marinera',
        name: 'Island Coconut Seafood Soup (Machuca / Tapado)',
        origin: 'Garífuna & Island Tradition · Punta Gorda',
        tourReference: 'Featured in Package 1: Island Soul Escape ($65.00)',
        description:
          'Rich, slow-simmered broth crafted with freshly pressed coconut milk, queen conch, crab, fresh catch, plantains, cassava, and island culantro.',
        image: ASSETS.seafoodSoup,
      },
      {
        id: 'pescado-don-jorge',
        name: 'Whole Fried Red Snapper with Rice & Beans',
        origin: 'Don Jorge’s Kitchen · French Harbour',
        tourReference: 'Featured in Package 2: Roots & Reefs ($60.00)',
        description:
          'Fresh whole snapper fried golden and crispy to order, served with traditional coconut rice and beans, green plantain slices (tajadas), and fresh slaw.',
        image: ASSETS.friedFishSalad,
      },
      {
        id: 'plato-costero-view-bay',
        name: 'Golden Island Fish with Plantains & Native Lime',
        origin: 'View Bay Beach Grill & Coastal Palapas',
        tourReference: 'Featured in Package 3: Into the Blue ($55.00)',
        description:
          'The classic Roatán beachfront flavor: whole seasoned fish served with Caribbean rice & beans and sweet or green fried plantains right by the water’s edge.',
        image: ASSETS.friedFishLemon,
      },
    ],
    galleryPhotos: [
      {
        id: 'foto-playa-camp-bay',
        src: ASSETS.campBayBeach,
        title: 'Crystal-Clear Waters & Coastal Reef',
        location: 'Roatán Turquoise Coast',
        category: 'playas',
        categoryLabel: 'Beaches & Nature',
        description:
          'Unmatched views of turquoise waters and natural reef formations where guests enjoy the ocean breeze and snorkeling.',
        relatedPackageId: 1,
      },
      {
        id: 'foto-muelle-punta-gorda',
        src: ASSETS.puntaGordaDock,
        title: 'Overwater Palapas & Traditional Cayuco',
        location: 'Punta Gorda, Roatán',
        category: 'cultura',
        categoryLabel: 'Culture & Communities',
        description:
          'Iconic thatched-roof palapas over wooden stilts in the sea alongside traditional wooden fishing boats in Punta Gorda.',
        relatedPackageId: 1,
      },
      {
        id: 'foto-manglares',
        src: ASSETS.mangrovesTunnel,
        title: 'Natural Red Mangrove Tunnels',
        location: 'French Harbour & Oak Ridge Waterways',
        category: 'playas',
        categoryLabel: 'Beaches & Nature',
        description:
          'Serene boat navigation among intertwined red mangrove roots, a vital ecosystem featured in Roots & Reefs and Into the Blue.',
        relatedPackageId: 2,
      },
      {
        id: 'foto-champas-garifunas',
        src: ASSETS.garifunaHuts,
        title: 'Traditional Royal Palm Architecture',
        location: 'House of Culture / Garífuna Community',
        category: 'cultura',
        categoryLabel: 'Culture & Communities',
        description:
          'Traditional homes built with royal palm thatch and local timber under the blue Caribbean sky, symbol of our ancestral communities.',
        relatedPackageId: 2,
      },
      {
        id: 'foto-sopa-marinera',
        src: ASSETS.seafoodSoup,
        title: 'Coconut Milk Seafood Soup',
        location: 'Traditional Kitchens of Roatán',
        category: 'gastronomia',
        categoryLabel: 'Island Gastronomy',
        description:
          'The unmistakable flavor of coconut, plantain, and fresh Caribbean seafood prepared from recipes passed down through generations.',
        relatedPackageId: 1,
      },
      {
        id: 'foto-pescado-ensalada',
        src: ASSETS.friedFishSalad,
        title: 'Island Fried Fish with Coconut Rice & Beans',
        location: 'Don Jorge’s Kitchen, French Harbour',
        category: 'gastronomia',
        categoryLabel: 'Island Gastronomy',
        description:
          'Complete traditional lunch served during our tours: whole fresh fish, coconut rice and beans, fried plantain tajadas, and fresh salad.',
        relatedPackageId: 2,
      },
      {
        id: 'foto-pescado-limon',
        src: ASSETS.friedFishLemon,
        title: 'Seaside Island Seasoning',
        location: 'View Bay Beach Grill',
        category: 'gastronomia',
        categoryLabel: 'Island Gastronomy',
        description:
          'Authentic island dish ideal for enjoying the afternoon by the sea after mangrove and snorkeling activities.',
        relatedPackageId: 3,
      },
    ],
    culturalCommunities: [
      {
        index: '01.',
        name: 'Garífuna Community',
        settlement: 'Punta Gorda (Since 1797)',
        description:
          'Guardians of ancestral drums, Punta dance, the Garífuna language, and heritage recipes crafted with coconut, cassava, and fresh seafood.',
      },
      {
        index: '02.',
        name: 'Miskito Community',
        settlement: 'Maritime & Coastal Heritage',
        description:
          'Master navigators and divers with a deep spiritual and ecological connection to the Caribbean Sea and Bay Islands mangroves.',
      },
      {
        index: '03.',
        name: 'Creole Islander Community',
        settlement: 'French Harbour, Coxen Hole & Oak Ridge',
        description:
          'Bilingual Afro-Caribbean island tradition renowned for overwater stilt architecture, warm hospitality, and authentic island Rice & Beans.',
      },
    ],
  },
};

export const COMPANY_INFO = BILINGUAL_CONTENT.es.companyInfo;
export const LOGO_MEANINGS = BILINGUAL_CONTENT.es.logoMeanings;
export const TOUR_PACKAGES = BILINGUAL_CONTENT.es.tourPackages;
export const GASTRONOMY_ITEMS = BILINGUAL_CONTENT.es.gastronomyItems;
export const GALLERY_PHOTOS = BILINGUAL_CONTENT.es.galleryPhotos;
export const CULTURAL_COMMUNITIES = BILINGUAL_CONTENT.es.culturalCommunities;

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
