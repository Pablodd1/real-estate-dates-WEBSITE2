/**
 * Self-rotating 3D gold key — pure CSS 3D via layered SVG extrusion.
 * No WebGL, no dependencies. Respects prefers-reduced-motion.
 */

// Skeleton-key silhouette: bow (with hole), collar, stem, two teeth.
// Subpaths rely on fill-rule="evenodd" so the bow hole subtracts.
const KEY_PATH =
  'M16,62 a44,44 0 1,0 88,0 a44,44 0 1,0 -88,0 Z ' +
  'M40,62 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0 Z ' +
  'M50,102 h20 v12 h-20 Z ' +
  'M54,114 h12 v150 a6,6 0 0,1 -12,0 Z ' +
  'M66,218 h30 v11 a5,5 0 0,1 -5,5 h-25 Z ' +
  'M66,242 h24 v11 a5,5 0 0,1 -5,5 h-19 Z';

const LAYER_COUNT = 24;
const DEPTH = 11; // half-thickness in px

export default function GoldKey3D({ className = '' }: { className?: string }) {
  const layers = Array.from({ length: LAYER_COUNT }, (_, i) => {
    const edge = i === 0 || i === LAYER_COUNT - 1;
    const z = -DEPTH + (i / (LAYER_COUNT - 1)) * DEPTH * 2;
    return { z, edge };
  });

  return (
    <div className={`key3d-stage relative flex items-center justify-center ${className}`}>
      {/* hidden shared gradient definition */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="gk3d-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF3B0" />
            <stop offset="25%" stopColor="#FFE44D" />
            <stop offset="55%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>
      </svg>

      {/* ambient gold glow */}
      <div
        className="absolute inset-[10%] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.16) 0%, rgba(255,215,0,0.05) 45%, transparent 70%)' }}
      />

      {/* floating, spinning key */}
      <div className="key3d-float relative w-full" style={{ aspectRatio: '120 / 300' }}>
        <div className="key3d absolute inset-0" role="img" aria-label="Golden key">
          {layers.map(({ z, edge }, i) => (
            <div key={i} className="absolute inset-0" style={{ transform: `translateZ(${z.toFixed(2)}px)` }}>
              <svg viewBox="0 0 120 300" className="w-full h-full" aria-hidden="true">
                <path d={KEY_PATH} fill={edge ? 'url(#gk3d-grad)' : '#C49A1C'} fillRule="evenodd" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* floor shadow */}
      <div className="key3d-shadow absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[62%] h-[7%] rounded-[50%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 70%)' }}
      />
    </div>
  );
}
