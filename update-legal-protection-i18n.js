import fs from 'fs';

const enPath = './src/locales/en.json';
const esPath = './src/locales/es.json';

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

enData.legalProtection = {
  sectionTitle: "Legal Protection",
  title: "Built Different",
  subtitle: "We studied every major dating app lawsuit. Then we built a platform that avoids every single pitfall.",
  rules: {
    r1: {
      title: "Pricing Neutrality",
      description: "We never use demographic-based pricing tiers. All users pay the same regardless of age, gender, or background.",
      rule: "RULE #1"
    },
    r2: {
      title: "Notification Integrity",
      description: "Every engagement notification is verified before sending. No fake 'someone liked you' messages.",
      rule: "RULE #2"
    },
    r3: {
      title: "Guarantee Transparency",
      description: "All success guarantees have clear, conspicuous conditions. No hidden terms or misleading promises.",
      rule: "RULE #3"
    },
    r4: {
      title: "Cancellation Simplicity",
      description: "Cancel in 2 clicks maximum. No surveys, no retention calls, no dark patterns.",
      rule: "RULE #4"
    },
    r5: {
      title: "Gender Neutrality",
      description: "No gender-based feature restrictions. Equal platform access for all users.",
      rule: "RULE #5"
    },
    r6: {
      title: "Zero Tolerance Policy",
      description: "Immediate ban for discriminatory professionals. We report violations to licensing boards.",
      rule: "RULE #6"
    }
  },
  litigation: {
    titlePrefix: "What We Learned From",
    titleAmount: "$136.5M+",
    titleSuffix: "in Settlements",
    cases: {
      c1: {
        company: "Tinder",
        amount: "$60.5M",
        issue: "Age discrimination in pricing (Candelore v. Tinder, Unruh Act)",
        year: "2018"
      },
      c2: {
        company: "Match Group",
        amount: "$14M",
        issue: "FTC settlement for fake notifications and false guarantees",
        year: "2019"
      },
      c3: {
        company: "Bumble",
        amount: "$40M+",
        issue: "BIPA biometric privacy + gender discrimination lawsuits",
        year: "2021-2024"
      },
      c4: {
        company: "OkCupid/Match",
        amount: "Undisclosed",
        issue: "FTC privacy deception - sharing 3M users' data without consent",
        year: "2019"
      }
    }
  },
  framework: {
    title: "Our Compliance Framework",
    items: {
      i1: { label: "COPPA Compliant", desc: "Minimum age 18+ with NO exceptions" },
      i2: { label: "CCPA Ready", desc: "Full data transparency and deletion rights" },
      i3: { label: "BIPA Safe", desc: "No biometric collection without explicit consent" },
      i4: { label: "FHA Compliant", desc: "Algorithm only uses property preferences, never demographics" },
      i5: { label: "FTC Clean", desc: "No fake notifications, no false guarantees, no deceptive marketing" },
      i6: { label: "SOC 2 Aligned", desc: "Enterprise-grade security and data handling" }
    },
    costTitle: "$78K-$173K to Comply",
    costDesc: "One-time setup cost for full legal protection vs. $40M-$60M per major settlement.",
    prevention: "Prevention > Cure"
  },
  footer: "Real Estate Dates is built on the lessons from 6 major legal research documents analyzing competitor litigation, privacy frameworks, age verification laws, fair housing discrimination, FTC marketing rules, and implementation checklists."
};

esData.legalProtection = {
  sectionTitle: "Protección Legal",
  title: "Construido Diferente",
  subtitle: "Estudiamos todas las demandas importantes contra aplicaciones de citas. Luego construimos una plataforma que evita cada uno de los problemas.",
  rules: {
    r1: {
      title: "Neutralidad de Precios",
      description: "Nunca usamos niveles de precios basados en la demografía. Todos los usuarios pagan lo mismo, independientemente de su edad, género o antecedentes.",
      rule: "REGLA #1"
    },
    r2: {
      title: "Integridad de Notificaciones",
      description: "Cada notificación de interacción se verifica antes de enviarla. Cero mensajes falsos de 'le gustas a alguien'.",
      rule: "REGLA #2"
    },
    r3: {
      title: "Transparencia de Garantía",
      description: "Todas las garantías de éxito tienen condiciones claras y visibles. Sin términos ocultos o promesas engañosas.",
      rule: "REGLA #3"
    },
    r4: {
      title: "Simplicidad de Cancelación",
      description: "Cancela en 2 clics máximo. Sin encuestas, sin llamadas de retención, sin patrones oscuros.",
      rule: "REGLA #4"
    },
    r5: {
      title: "Neutralidad de Género",
      description: "Sin restricciones de funciones basadas en el género. Acceso igualitario a la plataforma para todos los usuarios.",
      rule: "REGLA #5"
    },
    r6: {
      title: "Política de Tolerancia Cero",
      description: "Prohibición inmediata para profesionales discriminatorios. Reportamos las violaciones a las juntas de licencias.",
      rule: "REGLA #6"
    }
  },
  litigation: {
    titlePrefix: "Lo que Aprendimos de",
    titleAmount: "$136.5M+",
    titleSuffix: "en Acuerdos",
    cases: {
      c1: {
        company: "Tinder",
        amount: "$60.5M",
        issue: "Discriminación de edad en los precios (Candelore v. Tinder, Ley Unruh)",
        year: "2018"
      },
      c2: {
        company: "Match Group",
        amount: "$14M",
        issue: "Acuerdo con la FTC por notificaciones falsas y garantías falsas",
        year: "2019"
      },
      c3: {
        company: "Bumble",
        amount: "$40M+",
        issue: "Demandas de privacidad biométrica BIPA + discriminación de género",
        year: "2021-2024"
      },
      c4: {
        company: "OkCupid/Match",
        amount: "No revelado",
        issue: "Engaño de privacidad de la FTC: compartir datos de 3 millones de usuarios sin consentimiento",
        year: "2019"
      }
    }
  },
  framework: {
    title: "Nuestro Marco de Cumplimiento",
    items: {
      i1: { label: "Cumple con COPPA", desc: "Edad mínima de 18+ SIN excepciones" },
      i2: { label: "Listo para CCPA", desc: "Transparencia total de datos y derechos de eliminación" },
      i3: { label: "Seguro para BIPA", desc: "No hay recopilación biométrica sin consentimiento explícito" },
      i4: { label: "Cumple con la FHA", desc: "El algoritmo solo utiliza las preferencias de propiedad, nunca datos demográficos" },
      i5: { label: "Limpio de la FTC", desc: "Sin notificaciones falsas, ni garantías falsas, ni marketing engañoso" },
      i6: { label: "Alineado con SOC 2", desc: "Seguridad y manejo de datos de nivel empresarial" }
    },
    costTitle: "$78K-$173K para Cumplir",
    costDesc: "Costo de configuración único para protección legal completa frente a $40M-$60M por cada gran acuerdo.",
    prevention: "Prevenir > Curar"
  },
  footer: "Real Estate Dates se basa en las lecciones de 6 documentos de investigación legal importantes que analizan litigios de competidores, marcos de privacidad, leyes de verificación de edad, discriminación de vivienda justa, reglas de marketing de la FTC y listas de verificación de implementación."
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2));
console.log('LegalProtection JSON updated');
