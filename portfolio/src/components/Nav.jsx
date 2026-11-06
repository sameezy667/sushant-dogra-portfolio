/**
 * @file Nav.jsx
 * @description Fixed navigation header with scroll progress hairline and frosted glass aesthetic
 * @module components
 */
import { useEffect, useRef } from 'react';

export default function Nav() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    function onScroll() {
      const y = window.scrollY || 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollTo(sel, e) {
    e.preventDefault();
    if (sel === 'top') {
      if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(sel);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { duration: 1.4, offset: -76 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      {/* progress hairline */}
      <div
        id="progress"
        ref={barRef}
        className="fixed top-0 left-0 right-0 h-[2px] z-[80] bg-copper"
      />

      <header className="fixed top-0 inset-x-0 z-50 bg-paper/75 backdrop-blur-xl border-b border-line/60 shadow-[0_4px_24px_rgba(38,35,29,0.04)]">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="flex h-14 items-center justify-between">
            <a
              href="#hero"
              onClick={e => scrollTo('top', e)}
              className="font-mono text-[11px] tracking-[0.28em] uppercase text-ink/80 hover:text-copper transition-colors"
            >
              Sushant&nbsp;Dogra
            </a>

            <nav className="flex items-center gap-5 sm:gap-8 font-mono text-[9.5px] sm:text-[10px] tracking-[0.26em] uppercase">
              <a
                href="#about"
                onClick={e => scrollTo('#about', e)}
                className="text-ink/60 hover:text-ink transition-colors"
              >
                About
              </a>
              <a
                href="#experience"
                onClick={e => scrollTo('#experience', e)}
                className="text-ink/60 hover:text-ink transition-colors"
              >
                Experience
              </a>
              <a
                href="#work"
                onClick={e => scrollTo('#work', e)}
                className="text-ink/60 hover:text-ink transition-colors"
              >
                Work
              </a>
              <a
                href="#contact"
                onClick={e => scrollTo('#contact', e)}
                className="text-ink/60 hover:text-ink transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
