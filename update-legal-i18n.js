import fs from 'fs';

const enPath = './src/locales/en.json';
const esPath = './src/locales/es.json';

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

enData.legal = {
  sectionTitle: "Safety & Compliance",
  title: "Trust & Transparency",
  subtitle: "We built this platform with safety first. Every policy is backed by legal research across $136.5M+ in competitor litigation settlements. We learned from their mistakes.",
  policies: {
    policy1: {
      title: "Age Verification Protocol",
      content: "Maintaining a mature, safe, and professional ecosystem is paramount. To ensure 100% compliance with federal age-restriction guidelines (including COPPA), every user onboarding on Real Estate Dates must be strictly 18 years of age or older. During the initial webapp registration, we require third-party identity age-checks utilizing modern secure databases. We maintain a zero-tolerance policy towards underage profiles, ensuring all connections are built on mature, adult business and romantic partnerships."
    },
    policy2: {
      title: "Identity Verification & Anti-Catfishing",
      content: "Dumping catfishing is built into our core protocols. Every user who registers is verified using government-issued identification (such as a Driver's License or Passport) combined with real-time biometric facial-matching scanning. This process ensures that the person you see on screen is precisely the person you are communicating with. Real estate professionals can also connect their NMLS, REALTOR® ID, or corporate broker credentials to receive a verified elite badge, confirming their professional status to the entire community."
    },
    policy3: {
      title: "Explicit Consent & Communication Control",
      content: "Your comfort and boundaries are strictly protected. We operate on a foundation of explicit consent. Joining the platform means you are under your own control; you choose who can interact with you. In-app features like Text Chat, Video Chat, and Location Sharing require clear, proactive double-opt-in agreements from both matched parties. No features are ever turned on automatically, and consent can be immediately revoked at any time with a single click, putting you in absolute control of your digital footprint."
    },
    policy4: {
      title: "Anti-Discrimination & Fair Housing Act Alignment",
      content: "We are fully committed to equity, professional integrity, and respect. Real Estate Dates complies strictly with the federal Fair Housing Act (FHA) and all applicable state-level anti-discrimination legislation. Our proprietary matchmaking and recommendation algorithms operate entirely on professional criteria, including investment portfolios, transactional specializations, location preferences, and shared industry networking interests. We never match or filter profiles based on race, religion, gender, color, disability, familial status, or national origin. We support a diverse and thriving community of industry leaders."
    },
    policy5: {
      title: "Data Privacy & Cryptographic Security",
      content: "Your personal and financial data belongs to you. We employ state-of-the-art AES-256 end-to-end encryption for all in-app communications, text logs, and virtual date streams. Real Estate Dates will never sell, lease, or distribute your private contact details or profile history to third-party advertisers or lead-aggregators. We are fully CCPA and GDPR compliant. Users retain absolute data rights, including the ability to request a complete and permanent deletion of their account history and biometric data directly from the settings panel."
    },
    policy6: {
      title: "Transparent Matching Metrics",
      content: "We believe in complete transparency. Our matching algorithms utilize objective, professional parameters that you choose—such as geographical market coordinates, commercial or residential focus, preferred investment models (e.g., BRRRR, wholesaling, passive syndication), and calendar availability for local events. There are no demographic bias variables, hidden penalties, or shadow-bans. If you feel a matching decision or algorithm placement is incorrect, you can request an instant review from our technical support team."
    },
    policy7: {
      title: "Zero Tolerance Harassment Policy",
      content: "We protect the elite caliber of our professional network. Any form of harassment, intimidation, hate speech, unsolicited explicit content, or unprofessional behavior will result in an immediate, permanent, non-refundable ban. In addition, because our community consists of licensed brokers, realtors, NMLS lenders, and corporate investors, we reserve the right to report severe harassment or fraudulent behavior to relevant state licensing boards, professional ethics committees (such as local NAR boards), and local law enforcement."
    },
    policy8: {
      title: "Continuous Moderation & Event Safety",
      content: "Our dedicated safety teams work round-the-clock to maintain the community's integrity. Every user report or flag is reviewed by a live moderator within 24 hours. We use advanced, privacy-respecting automated detection models to intercept spam links, financial scams, or fraudulent broker profiles. Additionally, all organizers of our in-person networking mixers, twilight walkthroughs, and speed-dating happy hours undergo comprehensive professional background screening to guarantee secure, elite physical meeting spaces."
    }
  },
  highlights: {
    item1: { label: "COPPA", value: "Fully Exempt", note: "18+ only = no child users" },
    item2: { label: "Fair Housing Act", value: "Compliant", note: "Algorithm uses only professional criteria" },
    item3: { label: "CCPA / GDPR", value: "Compliant", note: "Full data rights + deletion" },
    item4: { label: "Biometric Data", value: "Protected", note: "Separate consent, no resale" },
    item5: { label: "FTC Marketing", value: "SAFE Certified", note: "No false claims or deceptive language" },
    item6: { label: "State Laws", value: "50-State Ready", note: "Age verification + refund compliance" }
  },
  notice: {
    title: "Why This Matters",
    content: "Dating apps have faced $136.5M+ in settlements since 2019. Tinder paid $60.5M for age discrimination. Bumble paid $40M for biometric privacy violations. Match Group paid $14M to the FTC for fake notifications. We built Real Estate Dates to avoid every mistake they made. Our legal framework is compliance-first, not catch-up. You deserve a platform that takes your safety seriously from day one."
  }
};

esData.legal = {
  sectionTitle: "Seguridad y Cumplimiento",
  title: "Confianza y Transparencia",
  subtitle: "Construimos esta plataforma con la seguridad como prioridad. Cada política está respaldada por investigaciones legales a través de $136.5M+ en acuerdos de litigios de competidores. Aprendimos de sus errores.",
  policies: {
    policy1: {
      title: "Protocolo de Verificación de Edad",
      content: "Mantener un ecosistema maduro, seguro y profesional es primordial. Para garantizar el cumplimiento del 100% con las pautas federales, todos los usuarios deben tener 18 años o más. Mantenemos una política de tolerancia cero hacia perfiles de menores."
    },
    policy2: {
      title: "Verificación de Identidad y Anti-Catfishing",
      content: "La eliminación del catfishing es parte de nuestros protocolos principales. Cada usuario es verificado utilizando una identificación emitida por el gobierno combinada con escaneo biométrico. Los profesionales también pueden conectar sus credenciales NMLS o REALTOR® ID."
    },
    policy3: {
      title: "Consentimiento Explícito y Control",
      content: "Su comodidad y límites están estrictamente protegidos. Operamos sobre una base de consentimiento explícito. Unirse a la plataforma significa que tiene el control; elige quién puede interactuar con usted."
    },
    policy4: {
      title: "Alineación con la Ley de Vivienda Justa",
      content: "Estamos totalmente comprometidos con la equidad, la integridad profesional y el respeto. Cumplimos estrictamente con la Ley Federal de Vivienda Justa (FHA). Nunca filtramos perfiles por raza, religión, género, color, discapacidad o estado familiar."
    },
    policy5: {
      title: "Privacidad de Datos y Seguridad Criptográfica",
      content: "Sus datos personales y financieros le pertenecen a usted. Empleamos encriptación de extremo a extremo AES-256. Somos totalmente compatibles con CCPA y GDPR. Los usuarios conservan derechos absolutos sobre sus datos."
    },
    policy6: {
      title: "Métricas de Emparejamiento Transparentes",
      content: "Creemos en la total transparencia. Nuestros algoritmos utilizan parámetros objetivos y profesionales que usted elige. No hay variables de sesgo demográfico, penalizaciones ocultas ni prohibiciones encubiertas."
    },
    policy7: {
      title: "Política de Tolerancia Cero al Acoso",
      content: "Protegemos el calibre élite de nuestra red profesional. Cualquier forma de acoso, intimidación, discurso de odio u comportamiento no profesional resultará en una prohibición inmediata y permanente."
    },
    policy8: {
      title: "Moderación Continua y Seguridad de Eventos",
      content: "Nuestros equipos de seguridad dedicados trabajan las 24 horas. Cada reporte de usuario es revisado por un moderador en vivo dentro de 24 horas. Utilizamos modelos avanzados de detección para interceptar enlaces no deseados o fraudes."
    }
  },
  highlights: {
    item1: { label: "COPPA", value: "Exento", note: "Solo mayores de 18 = sin niños" },
    item2: { label: "Vivienda Justa", value: "Cumple", note: "El algoritmo usa solo criterios profesionales" },
    item3: { label: "CCPA / GDPR", value: "Cumple", note: "Derechos plenos de datos + eliminación" },
    item4: { label: "Datos Biométricos", value: "Protegidos", note: "Consentimiento separado, sin reventa" },
    item5: { label: "Marketing FTC", value: "Certificado", note: "Sin afirmaciones falsas" },
    item6: { label: "Leyes Estatales", value: "Listo", note: "Verificación de edad + reembolsos" }
  },
  notice: {
    title: "Por Qué Esto Importa",
    content: "Las aplicaciones de citas han enfrentado más de $136.5M en demandas desde 2019. Nosotros construimos Real Estate Dates para evitar cada error que ellos cometieron. Nuestro marco legal es primero el cumplimiento, no la recuperación. Mereces una plataforma que tome tu seguridad en serio."
  }
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2));
console.log('Legal JSON updated');
