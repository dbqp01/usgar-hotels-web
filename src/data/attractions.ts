export interface Attraction {
  id: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
  distance: string;
  travelTime: string;
  category: 'historical' | 'nature' | 'cultural' | 'adventure';
}

export const attractions: Attraction[] = [
  {
    id: 'machu-picchu',
    name: { en: 'Machu Picchu', es: 'Machu Picchu' },
    description: {
      en: 'The iconic Inca citadel and UNESCO World Heritage Site. One of the New Seven Wonders of the World.',
      es: 'La icónica ciudadela inca y Patrimonio de la Humanidad. Una de las Nuevas Siete Maravillas del Mundo.'
    },
    distance: '112 km',
    travelTime: '~4h by train',
    category: 'historical',
  },
  {
    id: 'sacred-valley',
    name: { en: 'Sacred Valley', es: 'Valle Sagrado' },
    description: {
      en: 'Stunning valley with ancient Inca ruins, colorful markets, and breathtaking landscapes.',
      es: 'Impresionante valle con ruinas incas, mercados coloridos y paisajes espectaculares.'
    },
    distance: '30 km',
    travelTime: '~1h by car',
    category: 'nature',
  },
  {
    id: 'sacsayhuaman',
    name: { en: 'Sacsayhuamán', es: 'Sacsayhuamán' },
    description: {
      en: 'Massive Inca fortress with perfectly fitted stone walls, overlooking Cusco.',
      es: 'Fortaleza inca masiva con muros de piedra perfectamente ensamblados, con vista a Cusco.'
    },
    distance: '2 km',
    travelTime: '~10min by car',
    category: 'historical',
  },
  {
    id: 'rainbow-mountain',
    name: { en: 'Rainbow Mountain', es: 'Montaña de 7 Colores' },
    description: {
      en: 'Vinicunca, the stunning Rainbow Mountain with layers of colorful minerals at 5,200m altitude.',
      es: 'Vinicunca, la impresionante Montaña Arcoíris con capas de minerales coloridos a 5,200m de altitud.'
    },
    distance: '100 km',
    travelTime: '~3h by car',
    category: 'adventure',
  },
  {
    id: 'san-pedro-market',
    name: { en: 'San Pedro Market', es: 'Mercado de San Pedro' },
    description: {
      en: 'The vibrant central market of Cusco — fresh juices, local food, textiles, and souvenirs.',
      es: 'El vibrante mercado central de Cusco — jugos frescos, comida local, textiles y souvenirs.'
    },
    distance: '0.5 km',
    travelTime: '~5min walk',
    category: 'cultural',
  },
  {
    id: 'plaza-de-armas',
    name: { en: 'Plaza de Armas', es: 'Plaza de Armas' },
    description: {
      en: 'The historic main square of Cusco, surrounded by colonial architecture and the Cathedral.',
      es: 'La histórica plaza principal de Cusco, rodeada de arquitectura colonial y la Catedral.'
    },
    distance: '1 km',
    travelTime: '~10min walk',
    category: 'cultural',
  },
];
