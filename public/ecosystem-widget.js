/*!
 * Innovation Ecosystem widget — universal cross-network promotion.
 *
 * Usage (any site, one line before </body>):
 *   <script src="https://realestatedates.com/ecosystem-widget.js" defer></script>
 *
 * - Detects the current site and badges it "You are here"
 * - Bottom-left pill opens a drawer listing the other 7 platforms
 * - All outbound links carry UTM tags for cross-property analytics
 * - Shadow DOM: fully style-isolated, zero dependencies
 * - Registry embedded — update by re-deploying this file
 */
(function () {
  'use strict';

  var UTM = 'utm_source=ecosystem_network&utm_medium=cross_promo&utm_campaign=shared_network';
  var PLATFORMS = [
    { name: 'AI Dynamic Pro', category: 'Enterprise AI', url: 'https://www.aidynamic.pro/' },
    { name: 'Chat Building Innovation', category: 'AEC Tech', url: 'https://www.chatbuildinginnovation.us/' },
    { name: 'PocketScribe', category: 'Clinical AI', url: 'https://pocketscribe.online/' },
    { name: 'Real Estate Dates', category: 'PropTech', url: 'https://realestatedates.com/' },
    { name: 'JAS Miami Method', category: 'Human Performance', url: 'https://jasmiamimethod.fit/' },
    { name: 'Unitec USA Design', category: 'Architectural 3D', url: 'https://www.unitecusadesign.com/' },
    { name: '305business', category: 'Business Advisory', url: 'https://305business-llc.vercel.app/' },
    { name: 'Medical Billing Miami Beach', category: 'Healthcare RevOps', url: 'https://medicalbillingmb.com/' }
  ];

  var here = location.hostname.replace(/^www\./, '');
  var isMember = PLATFORMS.some(function (p) {
    return p.url.indexOf(here) !== -1;
  });
  var others = PLATFORMS.filter(function (p) { return p.url.indexOf(here) === -1; });
  if (!isMember || others.length === 0) return; // only render on network sites

  var host = document.createElement('div');
  host.id = 'ecosystem-widget';
  var root = host.attachShadow({ mode: 'open' });
  root.innerHTML =
    '<style>' +
    ':host{all:initial;font-family:Inter,system-ui,sans-serif}' +
    '.pill{position:fixed;bottom:18px;left:18px;z-index:2147483000;display:flex;align-items:center;gap:8px;' +
    'background:rgba(10,10,15,.92);border:1px solid rgba(197,160,89,.35);border-radius:999px;' +
    'padding:9px 16px;color:#c5a059;font-size:12px;font-weight:600;letter-spacing:.04em;cursor:pointer;' +
    'backdrop-filter:blur(8px);box-shadow:0 4px 24px rgba(0,0,0,.4);transition:transform .2s,border-color .2s}' +
    '.pill:hover{transform:translateY(-2px);border-color:#c5a059}' +
    '.dot{width:6px;height:6px;border-radius:50%;background:#c5a059;animation:ecoPulse 2.4s infinite}' +
    '@keyframes ecoPulse{0%,100%{opacity:.5}50%{opacity:1}}' +
    '.drawer{position:fixed;bottom:74px;left:18px;z-index:2147483000;width:300px;max-width:calc(100vw - 36px);' +
    'background:rgba(12,12,18,.97);border:1px solid rgba(197,160,89,.3);border-radius:16px;padding:18px;' +
    'box-shadow:0 12px 48px rgba(0,0,0,.6);display:none}' +
    '.drawer.open{display:block}' +
    '.drawer h4{margin:0 0 4px;color:#fff;font-size:13px;font-weight:700;letter-spacing:.02em}' +
    '.drawer p{margin:0 0 14px;color:rgba(255,255,255,.45);font-size:11px}' +
    '.drawer a{display:flex;justify-content:space-between;align-items:baseline;gap:8px;padding:9px 10px;' +
    'border-radius:10px;color:rgba(255,255,255,.75);text-decoration:none;font-size:12.5px;font-weight:600}' +
    '.drawer a:hover{background:rgba(197,160,89,.12);color:#c5a059}' +
    '.drawer a small{color:rgba(255,255,255,.35);font-size:10.5px;font-weight:500;white-space:nowrap}' +
    '.foot{margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,.08);' +
    'color:rgba(255,255,255,.3);font-size:10px;text-align:center}' +
    '</style>' +
    '<div class="pill" role="button" tabindex="0" aria-label="Open innovation ecosystem">' +
    '<span class="dot"></span>Innovation Ecosystem · ' + PLATFORMS.length + ' Platforms</div>' +
    '<div class="drawer" role="dialog" aria-label="Innovation ecosystem platforms">' +
    '<h4>Connected Innovation Ecosystem</h4>' +
    '<p>Cross-industry ventures, one network</p>' +
    others.map(function (p) {
      var sep = p.url.indexOf('?') === -1 ? '?' : '&';
      return '<a href="' + p.url + sep + UTM + '" target="_blank" rel="noopener noreferrer">' +
        p.name + '<small>' + p.category + '</small></a>';
    }).join('') +
    '<div class="foot">You are on a network platform — links open in a new tab</div>' +
    '</div>';

  var pill = root.querySelector('.pill');
  var drawer = root.querySelector('.drawer');
  function toggle() { drawer.classList.toggle('open'); }
  pill.addEventListener('click', toggle);
  pill.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
  document.addEventListener('click', function (e) {
    if (drawer.classList.contains('open') && !e.composedPath().includes(host)) {
      drawer.classList.remove('open');
    }
  });

  function mount() { document.body.appendChild(host); }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
