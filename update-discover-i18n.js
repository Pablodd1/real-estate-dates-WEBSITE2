import fs from 'fs';

const enPath = './src/locales/en.json';
const esPath = './src/locales/es.json';

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

enData.discover = {
  sectionTitle: "Discover",
  title: "App Ready Design",
  subtitle: "Swipe through verified professionals. Find love and secure your future with virtual speed dating.",
  instruction: "Drag the card left or right, or click the buttons. Match with potential partners via fast video speed dates.",
  pass: "Pass",
  match: "Match",
  eliteBadge: "Elite",
  profiles: {
    p1: {
      name: "Valentina & Marco",
      role: "Power Couple",
      location: "Miami Beach",
      bio: "We met at an open house 3 years ago. Now we flip luxury condos together and are looking for another couple to double date with!",
      intel: ["Couples", "Flipping"]
    },
    p2: {
      name: "James, 34",
      role: "Looking for Love",
      location: "New York",
      bio: "Commercial broker by day, hopeless romantic by night. Looking for someone who understands late closings and early showings.",
      intel: ["Single", "NYC"]
    },
    p3: {
      name: "Isabella, 29",
      role: "Seeking Partner",
      location: "Los Angeles",
      bio: "Interior designer who loves staging homes and romantic dinners. Swipe right if you want to tour open houses together!",
      intel: ["Design", "Foodie"]
    },
    p4: {
      name: "David & Sarah",
      role: "Married 5 Years",
      location: "Austin",
      bio: "Met on Real Estate Dates in 2020! We invest in rental properties together. Here to mentor new couples in the community.",
      intel: ["Mentors", "Investors"]
    }
  }
};

esData.discover = {
  sectionTitle: "Descubrir",
  title: "Diseño Listo para App",
  subtitle: "Desliza entre profesionales verificados. Encuentra el amor y asegura tu futuro con citas rápidas virtuales.",
  instruction: "Arrastra la tarjeta a izquierda o derecha, o haz clic en los botones. Haz match con parejas potenciales a través de video citas rápidas.",
  pass: "Pasar",
  match: "Conectar",
  eliteBadge: "Élite",
  profiles: {
    p1: {
      name: "Valentina y Marco",
      role: "Pareja Poderosa",
      location: "Miami Beach",
      bio: "Nos conocimos en una casa abierta hace 3 años. ¡Ahora renovamos condominios de lujo juntos y buscamos otra pareja para una cita doble!",
      intel: ["Parejas", "Renovación"]
    },
    p2: {
      name: "James, 34",
      role: "Buscando el Amor",
      location: "Nueva York",
      bio: "Corredor comercial de día, romántico empedernido de noche. Busco a alguien que entienda de cierres tardíos y muestras tempranas.",
      intel: ["Soltero", "NYC"]
    },
    p3: {
      name: "Isabella, 29",
      role: "Buscando Pareja",
      location: "Los Ángeles",
      bio: "Diseñadora de interiores que ama montar casas y las cenas románticas. ¡Desliza a la derecha si quieres recorrer casas abiertas juntos!",
      intel: ["Diseño", "Comida"]
    },
    p4: {
      name: "David y Sarah",
      role: "Casados 5 Años",
      location: "Austin",
      bio: "¡Nos conocimos en Real Estate Dates en 2020! Invertimos juntos en propiedades de alquiler. Estamos aquí para guiar a nuevas parejas en la comunidad.",
      intel: ["Mentores", "Inversores"]
    }
  }
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2));
console.log('Discover JSON updated');
