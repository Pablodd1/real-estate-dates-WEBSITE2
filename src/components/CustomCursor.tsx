import { useEffect, useRef } from 'react';
import { KeyRound } from 'lucide-react';

/**
 * Key-only cursor. No trailing ring, no lerp loop, no transitions on
 * movement — the key is pinned to the pointer on every mousemove, so it
 * feels instant. Hover feedback is a quick scale, not a follow animation.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Touch devices keep the native cursor
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const cursor = cursorRef.current;
    const hover = hoverRef.current;
    if (!cursor || !hover) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [role="button"], input, textarea, select, label');
      hover.dataset.hovering = interactive ? 'true' : 'false';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9998] pointer-events-none hidden sm:block"
      style={{ willChange: 'transform' }}
    >
      <div
        ref={hoverRef}
        data-hovering="false"
        className="-translate-x-1/2 -translate-y-1/2 cursor-key"
      >
        <KeyRound className="w-5 h-5 text-gold drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]" strokeWidth={2.5} />
      </div>
    </div>
  );
}
