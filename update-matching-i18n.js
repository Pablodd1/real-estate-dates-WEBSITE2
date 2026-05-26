import fs from 'fs';

const enPath = './src/locales/en.json';
const esPath = './src/locales/es.json';

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

enData.matching = {
  sectionTitle: "How Matching Works",
  title: "Mutual Matches Unlock Biographies",
  subtitle: "It is all about bringing people together who actually like each other. Once you like someone and they like you back, you both unlock full biographies to really know each other. Depending on your membership tier, you can seamlessly text chat, schedule video chats, and move to the next level.",
  features: [
    "AI learns your dating preferences",
    "Filter by age, location, and relationship goals",
    "Save matches to your favorites",
    "Get notified when someone likes you back"
  ],
  cta: "EXPLORE THE WEB APP",
  mockup: {
    name: "Jessica, 31",
    profession: "Luxury Broker · Miami Beach",
    status: "Looking for someone who understands late closings and early showings. Love beach walks and investment properties."
  }
};

esData.matching = {
  sectionTitle: "Cómo Funciona el Emparejamiento",
  title: "Los Matches Mutuos Desbloquean Biografías",
  subtitle: "Se trata de reunir a personas que realmente se agradan mutuamente. Una vez que te gusta alguien y tú le gustas, ambos desbloquean biografías completas para conocerse de verdad. Dependiendo de tu nivel de membresía, puedes chatear por texto de manera fluida, programar chats de video y pasar al siguiente nivel.",
  features: [
    "La IA aprende tus preferencias de citas",
    "Filtra por edad, ubicación y objetivos de relación",
    "Guarda matches en tus favoritos",
    "Recibe notificaciones cuando a alguien le gustas"
  ],
  cta: "EXPLORAR LA WEB APP",
  mockup: {
    name: "Jessica, 31",
    profession: "Corredora de Lujo · Miami Beach",
    status: "Busco a alguien que entienda cierres tardíos y muestras tempranas. Me encantan los paseos por la playa y las propiedades de inversión."
  }
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2));
console.log('Matching JSON updated');
