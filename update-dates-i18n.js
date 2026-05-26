import fs from 'fs';

const enPath = './src/locales/en.json';
const esPath = './src/locales/es.json';

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

enData.dates = {
  sectionTitle: "Experience Properties",
  title: "Play Dates & Speed Dates",
  subtitle: "We believe finding a home should be an experience, not a chore.",
  features: {
    feature1: {
      title: "Real Dates at Open Houses",
      description: "Turn house hunting into a date! Browse open homes happening this weekend, RSVP with your match, and explore beautiful spaces together. Free wine, great conversation, and maybe your future home.",
      tags: ["Couples Welcome", "Free Entry", "Wine & Snacks"]
    },
    feature2: {
      title: "Video Dates Before You Meet",
      description: "Nervous about that first in-person date? Start with a 5-minute video call. See their smile, hear their laugh, feel the chemistry — all from the safety of your couch.",
      tags: ["5-Min Video", "No Phone Exchange", "Safe & Easy"]
    }
  },
  cta: "Book Your First Play Date"
};

esData.dates = {
  sectionTitle: "Experimenta Propiedades",
  title: "Citas de Juego y Citas Rápidas",
  subtitle: "Creemos que encontrar un hogar debe ser una experiencia, no una tarea.",
  features: {
    feature1: {
      title: "Citas Reales en Casas Abiertas",
      description: "¡Convierte la búsqueda de casas en una cita! Explora las casas abiertas de este fin de semana, confirma tu asistencia con tu pareja y exploren hermosos espacios juntos. Vino gratis, buena conversación y tal vez su futuro hogar.",
      tags: ["Parejas Bienvenidas", "Entrada Gratis", "Vino y Bocadillos"]
    },
    feature2: {
      title: "Video Citas Antes de Conocerse",
      description: "¿Nervioso por esa primera cita en persona? Comienza con una videollamada de 5 minutos. Ve su sonrisa, escucha su risa, siente la química, todo desde la seguridad de tu sofá.",
      tags: ["Video de 5 Min", "Sin Intercambio de Teléfono", "Seguro y Fácil"]
    }
  },
  cta: "Reserva Tu Primera Cita de Juego"
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2));
console.log('Dates JSON updated');
