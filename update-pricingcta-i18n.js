import fs from 'fs';

const enPath = './src/locales/en.json';
const esPath = './src/locales/es.json';

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

enData.pricingCta = {
  sectionTitle: "Explore the Web App",
  title: "Your Perfect Match Is One Swipe Away",
  subtitle: "Join over 50,000 real estate singles. Accessible instantly on any device with zero installation or download required.",
  cta: "EXPLORE THE WEB APP",
  indicators: [
    "Instant browser access",
    "No hidden fees",
    "Cancel anytime"
  ]
};

esData.pricingCta = {
  sectionTitle: "Explora la Web App",
  title: "Tu Pareja Perfecta Está a un Deslizamiento",
  subtitle: "Únete a más de 50,000 solteros de bienes raíces. Accesible instantáneamente en cualquier dispositivo sin necesidad de instalación o descarga.",
  cta: "EXPLORAR LA WEB APP",
  indicators: [
    "Acceso instantáneo desde el navegador",
    "Sin tarifas ocultas",
    "Cancela en cualquier momento"
  ]
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2));
console.log('PricingCta JSON updated');
