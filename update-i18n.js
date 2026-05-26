import fs from 'fs';

const enPath = './src/locales/en.json';
const esPath = './src/locales/es.json';

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

const enFeatures = {
  sectionTitle: "Features",
  mainTitle: "Built for the Industry",
  subtitle: "Every feature speaks your language. We replaced dating clichés with real estate terminology you already know.",
  items: {
    feature1: {
      title: "Dumping Catfish (Verification)",
      desc: "Catfishing is the enemy of authentic connection. We require a mandatory government-issued ID upload coupled with a real-time biometric selfie scan during onboarding. Our background validation matches your professional licensing credentials (NMLS, REALTOR® ID, or active corporate registries) to ensure you are meeting verified, licensed, active real estate industry professionals. If you aren't real, you don't get in."
    },
    feature2: {
      title: "Smart Matching (Filters)",
      desc: "We don't just match on superficial attributes. Our advanced matching algorithm factors in your professional specialization (e.g., commercial development, residential sales, property management, wholesaling, or passive syndication) alongside location, age, and relationship goals. Find someone who understands the demands of a 70-hour work week, client meetings, and weekend open houses."
    },
    feature3: {
      title: "Market-Focused Icebreakers",
      desc: "Break the ice without the awkward small talk. Our intelligent system automatically generates relevant, market-focused conversation starters based on your shared geographical markets, investment interests, or favorite local architectural styles. Spark conversations that naturally bridge the professional and the personal."
    },
    feature4: {
      title: "Date Planning & Spots",
      desc: "We take the friction out of scheduling. Based on your shared calendar availability and location preferences, we suggest curated date spots designed for busy professionals. From quiet coffee shops next to new developments to upscale rooftop bars perfect for celebrating a closed deal, we help you plan seamless, sophisticated in-person meetups."
    },
    feature5: {
      title: "Couples Mode & Portfolio",
      desc: "When you find your perfect match, transition into a dedicated joint space. Unlock collaborative tools tailored for power couples: share local property wishlists, coordinate busy professional schedules with a shared calendar, track relationship milestones, and collaborate on investment ideas. It's the ultimate toolkit for building your empire together."
    },
    feature6: {
      title: "In-App Video Dates",
      desc: "Pre-screen chemistry without giving away your private phone number or social media handles. Our fully integrated, secure in-app Video Chat lets you hop on 3-minute or 5-minute virtual dates. It's high-efficiency dating designed to fit into your busy schedule—perfect for a quick lunch break or in between showings."
    },
    feature7: {
      title: "Safety First (24/7 Moderation)",
      desc: "Your personal safety and privacy are our top priorities. Real Estate Dates features an active, round-the-clock moderation team that reviews all reports within 24 hours. We employ state-of-the-art automated scanners to detect offensive content, scam behavior, or licensing fraud, maintaining an ultra-premium, respectful community."
    },
    feature8: {
      title: "Go Exclusive (Profile Lock)",
      desc: "Ready to take the plunge? When you both decide to go exclusive, activate the profile lock. Your profiles will be automatically hidden from the active matching pool, protecting your relationship from external distractions. Focus 100% of your energy on co-authoring your personal and professional future."
    }
  },
  admin: {
    sectionTitle: "App Ready",
    title: "More Than Just Swiping",
    subtitle: "Our ecosystem includes powerful tools for safety and success.",
    item1: {
      title: "Admin Dashboard",
      desc: "Our powerful admin panel allows for 24/7 moderation, manual user verification, and safety reporting to keep the community elite and secure."
    },
    item2: {
      title: "Real Estate Dating Guide",
      desc: "Access our exclusive guide on how to ace your 3-minute video dates, handle rejection professionally, and transition to in-person meetups."
    }
  },
  compliance: {
    sectionTitle: "Compliance & Safety",
    title: "Lessons from $136.5M in Lawsuits",
    subtitle: "We studied every major dating app lawsuit to build compliance into our DNA. From Tinder's $60.5M age discrimination to Bumble's $40M biometric fine.",
    item1: {
      title: "Age Verification",
      desc: "18+ only with multi-layer verification. COPPA compliant by design."
    },
    item2: {
      title: "Biometric Consent",
      desc: "Separate consent flow for facial data with retention/destruction policies. BIPA compliant."
    },
    item3: {
      title: "Fair Housing",
      desc: "Algorithm uses property preferences only. Zero tolerance for discriminatory behavior. FHA compliant."
    },
    item4: {
      title: "Transparent Pricing",
      desc: "No demographic-based tiers. Simple cancellation (2 clicks max). No hidden fees."
    },
    item5: {
      title: "Notification Integrity",
      desc: "Verified notifications only. No fake engagement alerts. FTC compliant marketing."
    },
    item6: {
      title: "50-State Compliance",
      desc: "Dating Service Refund Act compliant in all states. Automatic refund policy."
    }
  }
};

const esFeatures = {
  sectionTitle: "Características",
  mainTitle: "Diseñado para la Industria",
  subtitle: "Cada característica habla tu idioma. Reemplazamos los clichés de citas con terminología de bienes raíces que ya conoces.",
  items: {
    feature1: {
      title: "Eliminación de Catfish (Verificación)",
      desc: "El catfishing es el enemigo de la conexión auténtica. Requerimos una carga obligatoria de identificación emitida por el gobierno junto con un escaneo de selfie biométrico en tiempo real durante la incorporación. Nuestra validación de antecedentes coincide con tus credenciales de licencia profesional para asegurar que conoces a profesionales activos de la industria. Si no eres real, no entras."
    },
    feature2: {
      title: "Emparejamiento Inteligente (Filtros)",
      desc: "No solo emparejamos por atributos superficiales. Nuestro algoritmo avanzado considera tu especialización profesional junto con la ubicación, la edad y los objetivos de la relación. Encuentra a alguien que entienda las demandas de una semana laboral de 70 horas, reuniones con clientes y casas abiertas los fines de semana."
    },
    feature3: {
      title: "Rompehielos Enfocados en el Mercado",
      desc: "Rompe el hielo sin las incómodas charlas triviales. Nuestro sistema inteligente genera automáticamente temas de conversación relevantes basados en tus mercados geográficos compartidos, intereses de inversión o estilos arquitectónicos locales favoritos."
    },
    feature4: {
      title: "Planificación de Citas y Lugares",
      desc: "Eliminamos la fricción de la programación. Según la disponibilidad compartida en su calendario y preferencias de ubicación, sugerimos lugares para citas seleccionados y diseñados para profesionales ocupados."
    },
    feature5: {
      title: "Modo Pareja y Portafolio",
      desc: "Cuando encuentres a tu pareja perfecta, haz la transición a un espacio conjunto dedicado. Desbloquea herramientas colaborativas diseñadas para parejas de poder: compartan listas de propiedades deseadas, coordinen horarios ocupados y colaboren en ideas de inversión."
    },
    feature6: {
      title: "Video Citas Integradas",
      desc: "Prueba la química sin revelar tu número de teléfono privado o redes sociales. Nuestro Video Chat integrado te permite tener citas virtuales de 3 o 5 minutos. Es un sistema diseñado para encajar en tu apretada agenda."
    },
    feature7: {
      title: "La Seguridad es Primero (Moderación 24/7)",
      desc: "Tu seguridad personal y privacidad son nuestras principales prioridades. Real Estate Dates cuenta con un equipo activo que revisa todos los informes dentro de 24 horas. Empleamos escáneres automatizados para detectar comportamiento fraudulento."
    },
    feature8: {
      title: "Sé Exclusivo (Bloqueo de Perfil)",
      desc: "¿Listo para dar el paso? Cuando ambos decidan ser exclusivos, activen el bloqueo de perfil. Sus perfiles se ocultarán automáticamente del grupo de emparejamiento activo, protegiendo su relación de distracciones externas."
    }
  },
  admin: {
    sectionTitle: "App Lista",
    title: "Más que solo deslizar",
    subtitle: "Nuestro ecosistema incluye potentes herramientas para la seguridad y el éxito.",
    item1: {
      title: "Panel de Administración",
      desc: "Nuestro potente panel de administración permite moderación 24/7, verificación manual de usuarios y reportes de seguridad."
    },
    item2: {
      title: "Guía de Citas Inmobiliarias",
      desc: "Accede a nuestra guía exclusiva sobre cómo dominar tus video citas de 3 minutos, manejar el rechazo profesionalmente y más."
    }
  },
  compliance: {
    sectionTitle: "Cumplimiento y Seguridad",
    title: "Lecciones de $136.5M en Demandas",
    subtitle: "Estudiamos cada demanda importante de aplicaciones de citas para integrar el cumplimiento en nuestro ADN. Desde discriminación por edad hasta multas biométricas.",
    item1: {
      title: "Verificación de Edad",
      desc: "Solo mayores de 18 años con verificación de múltiples capas. Cumple con COPPA por diseño."
    },
    item2: {
      title: "Consentimiento Biométrico",
      desc: "Flujo de consentimiento separado para datos faciales con políticas de retención. Cumple con BIPA."
    },
    item3: {
      title: "Vivienda Justa",
      desc: "El algoritmo utiliza solo preferencias de propiedad. Cero tolerancia al comportamiento discriminatorio. Cumple con FHA."
    },
    item4: {
      title: "Precios Transparentes",
      desc: "Sin niveles basados en demografía. Cancelación sencilla (máximo 2 clics). Sin cargos ocultos."
    },
    item5: {
      title: "Integridad de Notificaciones",
      desc: "Solo notificaciones verificadas. Sin alertas de interacción falsas. Cumple con la FTC."
    },
    item6: {
      title: "Cumplimiento de 50 Estados",
      desc: "Cumple con la Ley de Reembolso de Servicios de Citas en todos los estados. Política de reembolso automático."
    }
  }
};

enData.features = enFeatures;
esData.features = esFeatures;

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2));
console.log('JSON files updated.');
