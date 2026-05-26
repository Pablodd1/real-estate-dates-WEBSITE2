import fs from 'fs';

const enPath = './src/locales/en.json';
const esPath = './src/locales/es.json';

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

enData.events = {
  sectionTitle: "Real Connections, Real Venues",
  title: "Events & Happy Hours",
  subtitle: "We host curated mixers where you meet face-to-face. From rooftop happy hours to property walk-throughs — every event is designed for natural connection.",
  list: {
    event1: {
      title: "Online Happy Hour Speed Dating",
      desc: "Experience our original, brand-new Online Happy Hour Speed Dating. Nobody else has this! Skip the commute and meet multiple real estate singles face-to-face in rapid, exciting video sessions right from your living room.",
      time: "Thursdays, 6:00–9:00 PM",
      location: "Brickell & South Beach",
      attendees: "20–40 singles"
    },
    event2: {
      title: "Video Speed Dates",
      desc: "5-minute one-on-one video dates from your couch. No pressure, no dressing up — just real conversation and real chemistry.",
      time: "Tuesdays & Saturdays",
      location: "In-app video rooms",
      attendees: "10–15 per session"
    },
    event3: {
      title: "Open House Dates",
      desc: "Tour beautiful listings together. It is like a museum date, but with better conversation starters and free snacks.",
      time: "Weekends, 11:00 AM",
      location: "Featured listings",
      attendees: "Couples & singles"
    },
    event4: {
      title: "Couples Brunch",
      desc: "Already matched? Bring your partner to our monthly couples brunch. Meet other real estate couples and build your circle.",
      time: "Sundays, 11:00 AM",
      location: "Rooftop venues",
      attendees: "Couples only"
    }
  },
  disclaimer: "All events include ID verification and safety protocols",
  viewPolicies: "View Event Policies"
};

esData.events = {
  sectionTitle: "Conexiones Reales, Lugares Reales",
  title: "Eventos y Happy Hours",
  subtitle: "Organizamos reuniones seleccionadas donde te encuentras cara a cara. Desde happy hours en terrazas hasta recorridos por propiedades, cada evento está diseñado para una conexión natural.",
  list: {
    event1: {
      title: "Citas Rápidas Online en Happy Hour",
      desc: "Experimenta nuestras nuevas y originales Citas Rápidas Online en Happy Hour. ¡Nadie más tiene esto! Evita el tráfico y conoce a múltiples solteros del sector inmobiliario cara a cara en sesiones de video rápidas y emocionantes directamente desde tu sala de estar.",
      time: "Jueves, 6:00–9:00 PM",
      location: "Brickell y South Beach",
      attendees: "20–40 solteros"
    },
    event2: {
      title: "Video Citas Rápidas",
      desc: "Video citas uno a uno de 5 minutos desde tu sofá. Sin presión, sin arreglarse: solo conversación y química reales.",
      time: "Martes y Sábados",
      location: "Salas de video en la app",
      attendees: "10–15 por sesión"
    },
    event3: {
      title: "Citas en Casas Abiertas",
      desc: "Recorran hermosos listados juntos. Es como una cita en el museo, pero con mejores temas de conversación y bocadillos gratis.",
      time: "Fines de semana, 11:00 AM",
      location: "Listados destacados",
      attendees: "Parejas y solteros"
    },
    event4: {
      title: "Brunch para Parejas",
      desc: "¿Ya hiciste match? Trae a tu pareja a nuestro brunch mensual. Conoce a otras parejas de bienes raíces y amplía tu círculo.",
      time: "Domingos, 11:00 AM",
      location: "Terrazas exclusivas",
      attendees: "Solo parejas"
    }
  },
  disclaimer: "Todos los eventos incluyen verificación de identidad y protocolos de seguridad",
  viewPolicies: "Ver Políticas de Eventos"
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2));
console.log('Events JSON updated');
