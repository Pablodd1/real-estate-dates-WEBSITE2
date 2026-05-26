import fs from 'fs';

const enPath = './src/locales/en.json';
const esPath = './src/locales/es.json';

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

enData.download = {
  sectionTitle: "Explore the Web App",
  title: "Your Empire Awaits",
  subtitle: "Join thousands of active real estate professionals who are already building connections and scaling portfolios. Real Estate Dates is a fully responsive web application, accessible instantly on any device with zero installation or download required.",
  cta: "EXPLORE THE WEB APP INSTANTLY",
  benefitsTitle: "Web App Benefits",
  benefits: [
    "Instant browser access",
    "Zero download or setup required",
    "Fully responsive on all screens",
    "Verified professionals only"
  ],
  mockup: {
    name: "Jessica, 29",
    profession: "Real Estate Agent",
    status: "Looking for my perfect match"
  }
};

esData.download = {
  sectionTitle: "Explora la Web App",
  title: "Tu Imperio te Espera",
  subtitle: "Únete a miles de profesionales inmobiliarios activos que ya están construyendo conexiones y escalando portafolios. Real Estate Dates es una aplicación web totalmente receptiva, accesible instantáneamente en cualquier dispositivo sin necesidad de instalación o descarga.",
  cta: "EXPLORA LA WEB APP AL INSTANTE",
  benefitsTitle: "Beneficios de la Web App",
  benefits: [
    "Acceso instantáneo desde el navegador",
    "No requiere descarga ni configuración",
    "Totalmente responsiva en todas las pantallas",
    "Solo profesionales verificados"
  ],
  mockup: {
    name: "Jessica, 29",
    profession: "Agente de Bienes Raíces",
    status: "Buscando a mi pareja perfecta"
  }
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2));
console.log('Download JSON updated');
