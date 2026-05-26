import fs from 'fs';

const enPath = './src/locales/en.json';
const esPath = './src/locales/es.json';

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

enData.blog = {
  sectionTitle: "Insights & Tips",
  title: "Love Stories & Tips",
  viewAll: "View All Articles",
  readMore: "Read More",
  posts: {
    p1: {
      category: "Dating Tips",
      title: "Dating in the Real Estate World: How to Find Time for Love",
      excerpt: "Between showings, closings, and open houses — how do successful agents make time for relationships? We asked 50 couples who met on Real Estate Dates."
    },
    p2: {
      category: "Couple Stories",
      title: "From First Swipe to First Closing: How We Built a Life Together",
      excerpt: "Sarah and Mike matched on Real Estate Dates in 2024. Today they are married, running a brokerage together, and expecting their first child."
    },
    p3: {
      category: "Date Ideas",
      title: "10 Date Ideas Every Real Estate Couple Will Love",
      excerpt: "From touring historic homes to sunset walks at new developments — creative date ideas that combine your passion for properties with romance."
    }
  },
  newsletter: {
    title: "Get Dating Tips Delivered",
    subtitle: "Weekly relationship advice, date ideas, and success stories from real estate couples. No spam, just love.",
    placeholder: "Enter your email address",
    button: "Subscribe",
    disclaimer: "By subscribing, you agree to our Privacy Policy."
  }
};

esData.blog = {
  sectionTitle: "Ideas y Consejos",
  title: "Historias de Amor y Consejos",
  viewAll: "Ver Todos los Artículos",
  readMore: "Leer Más",
  posts: {
    p1: {
      category: "Consejos de Citas",
      title: "Citas en el Mundo Inmobiliario: Cómo Encontrar Tiempo para el Amor",
      excerpt: "Entre exhibiciones, cierres y casas abiertas: ¿cómo hacen tiempo para las relaciones los agentes exitosos? Le preguntamos a 50 parejas que se conocieron en Real Estate Dates."
    },
    p2: {
      category: "Historias de Parejas",
      title: "Desde el Primer Deslizamiento hasta el Primer Cierre: Cómo Construimos una Vida Juntos",
      excerpt: "Sarah y Mike hicieron match en Real Estate Dates en 2024. Hoy están casados, dirigen una agencia juntos y esperan su primer hijo."
    },
    p3: {
      category: "Ideas para Citas",
      title: "10 Ideas para Citas que Toda Pareja Inmobiliaria Amará",
      excerpt: "Desde recorrer casas históricas hasta caminatas al atardecer en nuevos desarrollos: ideas creativas para citas que combinan tu pasión por las propiedades con el romance."
    }
  },
  newsletter: {
    title: "Recibe Consejos para Citas",
    subtitle: "Consejos de relaciones semanales, ideas para citas e historias de éxito de parejas de bienes raíces. Sin spam, solo amor.",
    placeholder: "Ingresa tu correo electrónico",
    button: "Suscribirse",
    disclaimer: "Al suscribirte, aceptas nuestra Política de Privacidad."
  }
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2));
console.log('Blog JSON updated');
