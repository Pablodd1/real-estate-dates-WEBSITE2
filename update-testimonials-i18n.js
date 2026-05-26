import fs from 'fs';

const enPath = './src/locales/en.json';
const esPath = './src/locales/es.json';

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

enData.testimonials = {
  sectionTitle: "Success Stories",
  title: "Love at First Swipe",
  subtitle: "Thousands of happy home hunters found their perfect match with Estate Match.",
  list: {
    t1: {
      quote: "We both worked in real estate but never crossed paths. Estate Match changed that. We bonded over our love for historic renovations, had our first date at an open house, and now we are engaged!",
      name: "Sarah & Tom",
      role: "Matched 2023 · Engaged 2025"
    },
    t2: {
      quote: "I was tired of dating apps where no one understood my schedule. On Estate Match, everyone gets the 24/7 nature of real estate. I met my girlfriend at a broker happy hour the app organized!",
      name: "Michael R.",
      role: "Commercial Broker · Dating 8 months"
    },
    t3: {
      quote: "As a single mom and agent, I thought dating was impossible. Estate Match connected me with another single parent in the industry. We co-parent, co-list, and are genuinely happy.",
      name: "Priya K.",
      role: "Residential Agent · In a Relationship"
    }
  },
  stats: {
    s1: { value: "12,500+", label: "Happy Matches" },
    s2: { value: "8,200+", label: "Play Dates Booked" },
    s3: { value: "15,000+", label: "Video Speed Dates" },
    s4: { value: "4.9", label: "App Store Rating" }
  }
};

esData.testimonials = {
  sectionTitle: "Historias de Éxito",
  title: "Amor a Primer Deslizamiento",
  subtitle: "Miles de felices buscadores de casas encontraron su pareja perfecta con Estate Match.",
  list: {
    t1: {
      quote: "Ambos trabajábamos en bienes raíces pero nunca nos cruzamos. Estate Match cambió eso. Nos unió nuestro amor por las renovaciones históricas, tuvimos nuestra primera cita en una casa abierta, ¡y ahora estamos comprometidos!",
      name: "Sarah y Tom",
      role: "Hicieron match en 2023 · Comprometidos para 2025"
    },
    t2: {
      quote: "Estaba cansado de las aplicaciones de citas donde nadie entendía mi horario. En Estate Match, todos entienden la naturaleza 24/7 de los bienes raíces. ¡Conocí a mi novia en un happy hour de corredores organizado por la app!",
      name: "Michael R.",
      role: "Corredor Comercial · Saliendo hace 8 meses"
    },
    t3: {
      quote: "Como madre soltera y agente, pensé que tener citas era imposible. Estate Match me conectó con otro padre soltero en la industria. Compartimos la crianza, listamos juntos y somos genuinamente felices.",
      name: "Priya K.",
      role: "Agente Residencial · En una Relación"
    }
  },
  stats: {
    s1: { value: "12,500+", label: "Matches Felices" },
    s2: { value: "8,200+", label: "Citas de Juego Reservadas" },
    s3: { value: "15,000+", label: "Video Citas Rápidas" },
    s4: { value: "4.9", label: "Calificación en App Store" }
  }
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2));
console.log('Testimonials JSON updated');
