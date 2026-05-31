const fs = require('fs');
const path = require('path');

const enPath = path.join('src', 'locales', 'en.json');
const esPath = path.join('src', 'locales', 'es.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const es = JSON.parse(fs.readFileSync(esPath, 'utf8'));

en.howItWorks = {
  journey: 'The Escrow of Love',
  title: 'From Open House, to Key Turned, to Marriage (or Friends Forever)',
  subtitle: 'Skip the generic apps. Experience a streamlined pipeline to finding your ultimate co-investor in life and business.',
  step1: {
    title: 'List Your Professional Profile',
    desc: 'Put your best asset on the market. Showcase your real estate niche—whether you are closing commercial deals, flipping residential, or syndicating multifamily. Set your "cap rate" for what you are looking for in a partner, and let your profile be your premier digital handshake.'
  },
  step2: {
    title: 'Tour Verified Prospects',
    desc: 'Navigate a curated, secure MLS of active industry players. We filter out the window-shoppers with rigorous ID checks. Browse profiles, assess the ROI of potential connections, and see who meets your strict underwriting criteria for lifestyle and ambition.'
  },
  step3: {
    title: 'Turn the Key (Match) & Unlock Bios',
    desc: 'Forget generic swiping—here, you "Turn Key" to show interest. If you are unsure, hold them in "Pending", or "Reject" to pass on the listing. When both parties Turn Key, it is a Mutual Match! This instantly unlocks deep-dive biographies so you can run your due diligence before chatting.'
  },
  step4: {
    title: 'Enter the Option Period (Chat & Video)',
    desc: 'Move seamlessly from a Mutual Match into active negotiations. Start with direct text chat or leverage built-in Video Chat to check the structural integrity of your chemistry. Plus, join our exclusive Online Happy Hour Speed Dating to meet multiple prospects face-to-face in rapid 3-minute virtual showings.'
  },
  step5: {
    title: 'In-Person Walkthroughs (Real Dates)',
    desc: 'Take the connection from digital to physical. Skip the awkward setups and meet where you thrive—coordinate twilight walkthrough dates at active listings, grab espresso near a new development, or meet at an industry gala to see if the foundation is solid.'
  },
  step6: {
    title: 'Close the Deal (Go Exclusive)',
    desc: 'When you have found the ultimate co-founder for your personal life, take yourselves off the market. Going exclusive hides both your profiles from the registry and unlocks couples-only features: share collaborative property wishlists, integrate your showing schedules, and build your empire together.'
  }
};

es.howItWorks = {
  journey: 'El Cierre Perfecto',
  title: 'De Casa Abierta, a Llave Girada, a Matrimonio (o Amigos para Siempre)',
  subtitle: 'Olvídate de las apps genéricas. Experimenta un pipeline optimizado para encontrar a tu co-inversor ideal en la vida y los negocios.',
  step1: {
    title: 'Anuncia tu Perfil Profesional',
    desc: 'Pon tu mejor activo en el mercado. Muestra tu nicho en bienes raíces, ya sea que cierres tratos comerciales, remodeles residencias o sindiques multifamiliares. Establece tu "cap rate" de lo que buscas en una pareja y deja que tu perfil sea tu apretón de manos digital.'
  },
  step2: {
    title: 'Recorre Prospectos Verificados',
    desc: 'Navega por un MLS curado y seguro de profesionales activos en la industria. Filtramos a los curiosos con controles de identidad rigurosos. Revisa perfiles, evalúa el ROI de conexiones potenciales y mira quién cumple con tus estrictos criterios de suscripción para estilo de vida y ambición.'
  },
  step3: {
    title: 'Gira la Llave (Match) y Desbloquea Biografías',
    desc: 'Olvídate de los swipes genéricos; aquí "Giras la Llave" para mostrar interés. Si no estás seguro, ponlos en "Pendiente", o dales "Rechazar" para descartar la propiedad. ¡Cuando ambos Giran la Llave, es un Match Mutuo! Esto desbloquea biografías profundas para que hagas tu due diligence antes de hablar.'
  },
  step4: {
    title: 'Entra al Periodo de Opción (Chat y Video)',
    desc: 'Pasa sin problemas de un Match Mutuo a negociaciones activas. Comienza con chat de texto directo o usa Video Chat integrado para revisar la integridad estructural de su química. Además, únete a nuestro Speed Dating en línea para conocer prospectos cara a cara en rápidos recorridos virtuales de 3 minutos.'
  },
  step5: {
    title: 'Recorridos en Persona (Citas Reales)',
    desc: 'Lleva la conexión de lo digital a lo físico. Evita las citas incómodas y reúnanse donde prosperan: coordinen recorridos al atardecer en propiedades activas, tomen un espresso cerca de un nuevo desarrollo o véanse en una gala de la industria para ver si la base es sólida.'
  },
  step6: {
    title: 'Cierra el Trato (Exclusividad)',
    desc: 'Cuando hayas encontrado al co-fundador definitivo para tu vida personal, sáquense del mercado. Ser exclusivos oculta ambos perfiles del registro y desbloquea funciones para parejas: compartan listas de propiedades colaborativas, integren sus horarios de recorridos y construyan su imperio juntos.'
  }
};

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(esPath, JSON.stringify(es, null, 2));
console.log('JSON files updated successfully');
