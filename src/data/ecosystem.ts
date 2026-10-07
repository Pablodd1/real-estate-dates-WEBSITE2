export interface EcosystemPlatform {
  name: string;
  short: string;
  category: string;
  url: string;
}

/**
 * The 8-platform innovation ecosystem. This registry is the single source
 * of truth — it powers the on-site footer showcase, and public/ecosystem.json
 * (kept in sync) is the public registry other network sites can fetch.
 */
export const ECOSYSTEM: EcosystemPlatform[] = [
  { name: 'AI Dynamic Pro', short: 'AI Dynamic', category: 'Enterprise AI', url: 'https://www.aidynamic.pro/' },
  { name: 'Chat Building Innovation', short: 'Chat Building', category: 'AEC Tech', url: 'https://www.chatbuildinginnovation.us/' },
  { name: 'PocketScribe', short: 'PocketScribe', category: 'Clinical AI', url: 'https://pocketscribe.online/' },
  { name: 'Real Estate Dates', short: 'Real Estate Dates', category: 'PropTech', url: 'https://realestatedates.com/' },
  { name: 'JAS Miami Method', short: 'JAS Miami', category: 'Human Performance', url: 'https://jasmiamimethod.fit/' },
  { name: 'Unitec USA Design', short: 'Unitec Design', category: 'Architectural 3D', url: 'https://www.unitecusadesign.com/' },
  { name: '305business', short: '305business', category: 'Business Advisory', url: 'https://305business-llc.vercel.app/' },
  { name: 'Medical Billing Miami Beach', short: 'Medical Billing MB', category: 'Healthcare RevOps', url: 'https://medicalbillingmb.com/' },
];

export const UTM = 'utm_source=ecosystem_network&utm_medium=cross_promo&utm_campaign=shared_network';

/** Links for sites OTHER than the current one (each site badges itself). */
export function ecosystemLinks(currentUrl: string): EcosystemPlatform[] {
  return ECOSYSTEM.filter((p) => !currentUrl.includes(new URL(p.url).hostname.replace('www.', '')));
}
