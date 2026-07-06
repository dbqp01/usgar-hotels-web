export interface FAQItem {
  id: string;
  question: { en: string; es: string };
  answer: { en: string; es: string };
}

export const faqs: FAQItem[] = [
  {
    id: 'check-in-out',
    question: {
      en: 'What are the check-in and check-out times?',
      es: '¿Cuáles son los horarios de check-in y check-out?'
    },
    answer: {
      en: 'Check-in is from 11:30 AM, and check-out is until 10:00 AM. If you arrive earlier, we will gladly store your luggage for free or check you in early if your room is already prepared.',
      es: 'El check-in es a partir de las 11:30 AM y el check-out es hasta las 10:00 AM. Si llega antes, guardaremos su equipaje de forma gratuita o registraremos su entrada temprano si la habitación ya está lista.'
    }
  },
  {
    id: 'altitude-sickness',
    question: {
      en: 'How can I prevent altitude sickness (soroche)?',
      es: '¿Cómo puedo prevenir el mal de altura (soroche)?'
    },
    answer: {
      en: 'Cusco is at 3,400 meters (11,150 feet). To help you acclimatize, we offer complimentary hot Coca tea 24/7 in our lobby. We recommend resting for the first few hours, drinking plenty of water, eating light meals, and avoiding alcohol. We also have oxygen assistance available at the reception if needed.',
      es: 'Cusco se encuentra a 3,400 metros de altitud. Para ayudarle a aclimatarse, ofrecemos mate de Coca caliente de cortesía las 24 horas en nuestro lobby. Recomendamos descansar las primeras horas, beber mucha agua, comer ligero y evitar el alcohol. También contamos con asistencia de oxígeno en recepción si lo requiere.'
    }
  },
  {
    id: 'transfers',
    question: {
      en: 'Do you offer airport or train station transfers?',
      es: '¿Ofrecen traslados desde el aeropuerto o la estación de tren?'
    },
    answer: {
      en: 'Yes, we offer private transfer services. You can arrange a safe, comfortable pickup from Alejandro Velasco Astete Airport (CUZ) or the Poroy/Wanchaq train stations. Please contact us via email or WhatsApp with your flight/train details at least 24 hours in advance to schedule.',
      es: 'Sí, ofrecemos servicios de traslado privado. Puede coordinar un recojo seguro y cómodo desde el Aeropuerto Alejandro Velasco Astete (CUZ) o las estaciones de tren de Poroy/Wanchaq. Por favor, contáctenos por correo o WhatsApp con los detalles de su viaje al menos 24 horas antes.'
    }
  },
  {
    id: 'breakfast',
    question: {
      en: 'Is breakfast included and what time is it served?',
      es: '¿El desayuno está incluido y a qué hora se sirve?'
    },
    answer: {
      en: 'Yes, a fresh buffet breakfast featuring local Andean fruits, breads, cheese, eggs, coffee, and traditional herbal teas is included with all room rates. It is served daily from 6:00 AM to 9:00 AM, allowing plenty of time before you start early day tours to Machu Picchu or the Sacred Valley.',
      es: 'Sí, un desayuno buffet fresco con frutas andinas locales, panes, queso, huevos, café e infusiones tradicionales está incluido en todas nuestras tarifas. Se sirve todos los días de 6:00 AM a 9:00 AM, perfecto para antes de iniciar sus tours tempranos a Machu Picchu o el Valle Sagrado.'
    }
  },
  {
    id: 'luggage-storage',
    question: {
      en: 'Can I leave my luggage at the hotel while visiting Machu Picchu?',
      es: '¿Puedo dejar mi equipaje en el hotel mientras visito Machu Picchu?'
    },
    answer: {
      en: 'Absolutely! We provide free, secure luggage storage for all our guests. You can leave your large suitcases with us while you travel to Machu Picchu or the Sacred Valley with a smaller daypack, and retrieve them when you return.',
      es: '¡Por supuesto! Brindamos almacenamiento de equipaje seguro y gratuito para todos nuestros huéspedes. Puede dejar sus maletas grandes con nosotros mientras viaja a Machu Picchu o al Valle Sagrado con una mochila pequeña, y recogerlas a su regreso.'
    }
  },
  {
    id: 'heating-water',
    question: {
      en: 'Do rooms have heating and 24/7 hot water?',
      es: '¿Las habitaciones cuentan con calefacción y agua caliente las 24 horas?'
    },
    answer: {
      en: 'Yes, all our rooms are equipped with heating units to keep you warm during the chilly Cusco nights. Additionally, we have a reliable high-pressure hot water system available 24 hours a day in all private bathrooms.',
      es: 'Sí, todas nuestras habitaciones están equipadas con sistemas de calefacción para mantener una temperatura acogedora durante las frías noches cusqueñas. Además, contamos con un sistema confiable de agua caliente a alta presión las 24 horas en todos los baños privados.'
    }
  }
];
