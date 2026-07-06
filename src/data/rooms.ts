export interface Room {
  id: string;
  slug: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
  maxGuests: number;
  beds: string;
  pricePerNight: number;
  amenities: string[];
  photoCount: number;
  hasVideoTour: boolean;
  photoFolder: string;
}

export const rooms: Room[] = [
  {
    id: 'doble-superior',
    slug: 'doble-superior',
    name: { en: 'Double Superior Room', es: 'Habitación Doble Superior' },
    description: {
      en: 'Spacious room with two comfortable single beds, hand-painted Andean murals, and warm ambient lighting. Perfect for friends or colleagues traveling together.',
      es: 'Amplia habitación con dos cómodas camas individuales, murales andinos pintados a mano y cálida iluminación ambiental. Perfecta para amigos o colegas viajando juntos.'
    },
    maxGuests: 2,
    beds: '2 single beds',
    pricePerNight: 45,
    amenities: ['wifi', 'breakfast', 'hot-water', 'heating', 'tv', 'laundry'],
    photoCount: 16,
    hasVideoTour: true,
    photoFolder: 'doble-superior',
  },
  {
    id: 'matrimonial',
    slug: 'matrimonial',
    name: { en: 'Matrimonial Room', es: 'Habitación Matrimonial' },
    description: {
      en: 'Romantic retreat featuring a king-size bed, artisan textiles, and a cozy atmosphere. Ideal for couples exploring the wonders of Cusco.',
      es: 'Refugio romántico con cama king-size, textiles artesanales y atmósfera acogedora. Ideal para parejas explorando las maravillas de Cusco.'
    },
    maxGuests: 2,
    beds: '1 king bed',
    pricePerNight: 50,
    amenities: ['wifi', 'breakfast', 'hot-water', 'heating', 'tv', 'laundry'],
    photoCount: 12,
    hasVideoTour: true,
    photoFolder: 'matrimonial',
  },
  {
    id: 'familiar-superior',
    slug: 'familiar-superior',
    name: { en: 'Family Superior Room', es: 'Habitación Familiar Superior' },
    description: {
      en: 'Our most spacious room, designed for families. Features a king bed and two singles, with room for everyone to relax after a day of adventures.',
      es: 'Nuestra habitación más amplia, diseñada para familias. Cuenta con cama king y dos individuales, espacio para todos después de un día de aventuras.'
    },
    maxGuests: 4,
    beds: '1 king + 2 single beds',
    pricePerNight: 75,
    amenities: ['wifi', 'breakfast', 'hot-water', 'heating', 'tv', 'laundry'],
    photoCount: 0,
    hasVideoTour: true,
    photoFolder: 'familiar-superior',
  },
  {
    id: 'quadruple-superior',
    slug: 'quadruple-superior',
    name: { en: 'Quadruple Superior Room', es: 'Habitación Cuádruple Superior' },
    description: {
      en: 'Perfect for groups of friends or small families. Four comfortable beds in a bright, colorfully decorated space with Andean character.',
      es: 'Perfecta para grupos de amigos o familias pequeñas. Cuatro cómodas camas en un espacio luminoso y decorado con carácter andino.'
    },
    maxGuests: 4,
    beds: '4 single beds',
    pricePerNight: 65,
    amenities: ['wifi', 'breakfast', 'hot-water', 'heating', 'tv', 'laundry'],
    photoCount: 10,
    hasVideoTour: true,
    photoFolder: 'quadruple-superior',
  },
  {
    id: 'triple-standar',
    slug: 'triple-standar',
    name: { en: 'Triple Standard Room', es: 'Habitación Triple Estándar' },
    description: {
      en: 'Comfortable and practical room with three single beds. Great value for small groups wanting to explore Cusco on a budget.',
      es: 'Habitación cómoda y práctica con tres camas individuales. Excelente valor para grupos pequeños que exploran Cusco.'
    },
    maxGuests: 3,
    beds: '3 single beds',
    pricePerNight: 55,
    amenities: ['wifi', 'breakfast', 'hot-water', 'heating', 'tv'],
    photoCount: 0,
    hasVideoTour: true,
    photoFolder: 'triple-standar',
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find(r => r.slug === slug);
}
