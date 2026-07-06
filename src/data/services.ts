export interface Service {
  id: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
  icon: string;
}

export const services: Service[] = [
  {
    id: 'wifi',
    name: { en: 'Free Wi-Fi', es: 'Wi-Fi Gratuito' },
    description: { en: 'High-speed internet throughout the hotel', es: 'Internet de alta velocidad en todo el hotel' },
    icon: '📶',
  },
  {
    id: 'breakfast',
    name: { en: 'Breakfast Included', es: 'Desayuno Incluido' },
    description: { en: 'Fresh local and international breakfast daily', es: 'Desayuno fresco local e internacional diario' },
    icon: '🍳',
  },
  {
    id: 'hot-water',
    name: { en: 'Hot Water 24h', es: 'Agua Caliente 24h' },
    description: { en: 'Hot water available around the clock', es: 'Agua caliente disponible las 24 horas' },
    icon: '🚿',
  },
  {
    id: 'heating',
    name: { en: 'Heating', es: 'Calefacción' },
    description: { en: 'Central heating for cold Andean nights', es: 'Calefacción para las frías noches andinas' },
    icon: '🔥',
  },
  {
    id: 'tv',
    name: { en: 'Cable TV', es: 'TV Cable' },
    description: { en: 'Flat-screen TV with cable channels', es: 'TV pantalla plana con canales por cable' },
    icon: '📺',
  },
  {
    id: 'laundry',
    name: { en: 'Laundry Service', es: 'Servicio de Lavandería' },
    description: { en: 'Same-day laundry and dry cleaning', es: 'Lavandería y limpieza en seco el mismo día' },
    icon: '👔',
  },
  {
    id: 'transfer',
    name: { en: 'Airport/Station Transfer', es: 'Traslado Aeropuerto/Estación' },
    description: { en: 'Comfortable pickup from airport or train station', es: 'Recogida cómoda desde aeropuerto o estación de tren' },
    icon: '🚐',
  },
  {
    id: 'tours',
    name: { en: 'Tours & Excursions', es: 'Tours y Excursiones' },
    description: { en: 'Guided tours to Machu Picchu and Sacred Valley', es: 'Tours guiados a Machu Picchu y Valle Sagrado' },
    icon: '🏔️',
  },
  {
    id: 'restaurant',
    name: { en: 'Restaurant & Café', es: 'Restaurante y Cafetería' },
    description: { en: 'On-site dining with local and international cuisine', es: 'Restaurante con cocina local e internacional' },
    icon: '🍽️',
  },
  {
    id: 'spa',
    name: { en: 'Spa & Massages', es: 'Spa y Masajes' },
    description: { en: 'Relax with traditional Andean massage therapies', es: 'Relájate con terapias de masaje andino tradicional' },
    icon: '💆',
  },
  {
    id: 'parking',
    name: { en: 'Parking', es: 'Estacionamiento' },
    description: { en: 'Free private parking on premises', es: 'Estacionamiento privado gratuito en el hotel' },
    icon: '🅿️',
  },
];
