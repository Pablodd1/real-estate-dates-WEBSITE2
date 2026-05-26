import fs from 'fs';

const enPath = './src/locales/en.json';
const esPath = './src/locales/es.json';

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

enData.social = {
  sectionTitle: "More Than Dating",
  title: "Build Your Circle",
  subtitle: "Real Estate Dates is built for connection in all its forms. Some members find love. Most find friends, co-investors, mentors, and deal partners.",
  points: {
    p1: {
      title: "Find Your Person",
      desc: "This is a dating app first. Browse singles, couples, and people open to romance who also happen to love real estate."
    },
    p2: {
      title: "Couples Welcome",
      desc: "Already in a relationship? Join as a couple looking for other couples to double-date, co-invest, or socialize with."
    },
    p3: {
      title: "Real Dates",
      desc: "Coffee at that new café downtown. A walk through an open house. Dinner at a restaurant you discovered while showing properties. Real dates for real people."
    },
    p4: {
      title: "Date & Invest",
      desc: "Many couples on Estate Match buy their first investment property together. Find someone who shares your ambition AND your heart."
    },
    p5: {
      title: "Couples Chat",
      desc: "Already matched? Join couples-only chat rooms. Share date ideas, property leads, or just vent about difficult clients together."
    },
    p6: {
      title: "Friends Too",
      desc: "Not feeling romantic vibes? Toggle to friendship mode. Expand your professional circle while keeping the door open for something more."
    }
  }
};

esData.social = {
  sectionTitle: "Más Que Citas",
  title: "Construye Tu Círculo",
  subtitle: "Real Estate Dates está diseñado para conexiones en todas sus formas. Algunos miembros encuentran el amor. La mayoría encuentra amigos, coinversores, mentores y socios comerciales.",
  points: {
    p1: {
      title: "Encuentra a Tu Persona",
      desc: "Esta es una aplicación de citas en primer lugar. Explora solteros, parejas y personas abiertas al romance que también aman los bienes raíces."
    },
    p2: {
      title: "Parejas Bienvenidas",
      desc: "¿Ya estás en una relación? Únete como pareja buscando otras parejas para citas dobles, coinvertir o socializar."
    },
    p3: {
      title: "Citas Reales",
      desc: "Café en ese nuevo café del centro. Un paseo por una casa abierta. Cena en un restaurante que descubriste mostrando propiedades. Citas reales para personas reales."
    },
    p4: {
      title: "Citas e Inversión",
      desc: "Muchas parejas en Estate Match compran su primera propiedad de inversión juntas. Encuentra a alguien que comparta tu ambición Y tu corazón."
    },
    p5: {
      title: "Chat de Parejas",
      desc: "¿Ya hicieron match? Únete a salas de chat solo para parejas. Compartan ideas para citas, clientes potenciales o simplemente desahóguense sobre clientes difíciles juntos."
    },
    p6: {
      title: "También Amigos",
      desc: "¿No sientes vibraciones románticas? Cambia al modo amistad. Amplía tu círculo profesional mientras mantienes la puerta abierta para algo más."
    }
  }
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2));
console.log('Social JSON updated');
