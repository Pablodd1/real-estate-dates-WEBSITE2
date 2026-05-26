import fs from 'fs';

const enPath = './src/locales/en.json';
const esPath = './src/locales/es.json';

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

enData.pricing = {
  sectionTitle: "Simple, Transparent Pricing",
  title: "Choose Your Tier",
  subtitle: "Start free. Upgrade when you're ready for more connections, events, and exclusive access.",
  tiers: {
    free: {
      name: "Free",
      price: "$0",
      period: "/month",
      desc: "Browse the exclusive registry and mutually match with verified real estate industry professionals at no cost.",
      features: [
        "Build your elite professional profile & licensing credentials check",
        "Unlimited swiping and discovery in your local active market",
        "Mutual Match system to unlock comprehensive partner biographies",
        "Read-only profile structure (protects your privacy & limits noise)",
        "Add-On: Direct Text Chat ($1.99 per active match unlock)",
        "Add-On: Video Chat Chemistry Pre-Screen ($2.99 per call unlock)",
        "Add-On: Online Happy Hour Speed Dating Access ($4.99 per event ticket)"
      ],
      cta: "EXPLORE FREE"
    },
    pro: {
      name: "Pro",
      price: "$29",
      period: "/month",
      desc: "Unlock seamless text communication, integrated video features, and gain priority access to local real estate singles.",
      features: [
        "All Core Free tier features included",
        "Unlimited premium Text Chat with all mutual matches",
        "Unlimited high-efficiency in-app Video Dates",
        "Unlimited access to our weekly Online Happy Hour Speed Dating events",
        "Instantly see who swiped right on your profile",
        "Advanced priority matching algorithm placement"
      ],
      cta: "EXPLORE PRO"
    },
    empire: {
      name: "Empire",
      price: "$79",
      period: "/month",
      desc: "Designed for elite industry leaders, high-net-worth investors, and power networkers seeking the highest caliber partnerships.",
      features: [
        "All Pro features & unlimited communication included",
        "Elite VIP matching pool & dedicated curated selections",
        "Exclusive 'Property Walk & Talk' verified date planning",
        "Instant couples mode unlock with shared property wishlists",
        "Personal Concierge Matching & manual profile recommendations",
        "Distinctive, high-profile verified 'Empire' badge",
        "Access to exclusive closed-door lead-sharing network",
        "24/7 Priority support hotline & license protection"
      ],
      cta: "EXPLORE EMPIRE"
    }
  },
  popularBadge: "Most Popular",
  footerNote: "No hidden fees. Cancel anytime. All subscriptions auto-renew. Taxes may apply."
};

esData.pricing = {
  sectionTitle: "Precios Simples y Transparentes",
  title: "Elige tu Nivel",
  subtitle: "Comienza gratis. Sube de nivel cuando estés listo para más conexiones, eventos y acceso exclusivo.",
  tiers: {
    free: {
      name: "Gratis",
      price: "$0",
      period: "/mes",
      desc: "Navega por el registro exclusivo y haz match con profesionales verificados de la industria inmobiliaria sin costo.",
      features: [
        "Construye tu perfil profesional de élite y revisión de credenciales",
        "Deslizamiento y descubrimiento ilimitado en tu mercado local activo",
        "Sistema de Match Mutuo para desbloquear biografías completas de parejas",
        "Estructura de perfil de solo lectura (protege tu privacidad y limita el ruido)",
        "Complemento: Chat de Texto Directo ($1.99 por desbloqueo de match activo)",
        "Complemento: Prueba de Química por Video Chat ($2.99 por desbloqueo de llamada)",
        "Complemento: Acceso a Citas Rápidas Online ($4.99 por boleto de evento)"
      ],
      cta: "EXPLORAR GRATIS"
    },
    pro: {
      name: "Pro",
      price: "$29",
      period: "/mes",
      desc: "Desbloquea comunicación fluida por texto, funciones de video integradas y obtén acceso prioritario a solteros locales.",
      features: [
        "Todas las funciones básicas del nivel Gratis incluidas",
        "Chat de Texto premium ilimitado con todos los matches mutuos",
        "Video Citas ilimitadas y de alta eficiencia dentro de la aplicación",
        "Acceso ilimitado a nuestros eventos semanales de Citas Rápidas Online",
        "Ve al instante quién deslizó a la derecha en tu perfil",
        "Colocación avanzada en el algoritmo de coincidencia prioritaria"
      ],
      cta: "EXPLORAR PRO"
    },
    empire: {
      name: "Empire",
      price: "$79",
      period: "/mes",
      desc: "Diseñado para líderes de élite de la industria, inversores de alto patrimonio y conectores que buscan asociaciones del más alto calibre.",
      features: [
        "Todas las funciones Pro y comunicación ilimitada incluidas",
        "Grupo de coincidencia VIP de élite y selecciones curadas",
        "Planificación de citas verificadas exclusivas 'Caminata y Charla por Propiedades'",
        "Desbloqueo instantáneo de modo pareja con listas de propiedades compartidas",
        "Coincidencia de Conserje Personal y recomendaciones de perfil manuales",
        "Insignia verificada 'Empire' distintiva y de alto perfil",
        "Acceso a una red exclusiva de intercambio de clientes potenciales",
        "Línea de soporte prioritario 24/7 y protección de licencia"
      ],
      cta: "EXPLORAR EMPIRE"
    }
  },
  popularBadge: "Más Popular",
  footerNote: "Sin tarifas ocultas. Cancela en cualquier momento. Todas las suscripciones se renuevan automáticamente. Pueden aplicarse impuestos."
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2));
console.log('Pricing JSON updated');
