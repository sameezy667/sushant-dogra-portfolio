/**
 * @file Hero.jsx
 * @description Full-viewport Hero with Sushant Dogra title at bottom-left,
 *   unobstructed view of the ASCII hero silicon art, and vertical scroll cue at bottom-right.
 * @module components
 */

export default function Hero() {
  function scrollToAbout(e) {
    e.preventDefault();
    const el = document.querySelector('#about');
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { duration: 1.4, offset: -70 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section
      id="hero"
      data-mode="mainboard"
      className="hero relative z-10 w-full h-[100vh] h-[100svh] min-h-[640px] overflow-hidden select-none"
    >
      {/* Name block — positioned at bottom-left so it never obstructs the ASCII silicon die */}
      <div
        id="hero-name"
        className="absolute left-6 sm:left-10 md:left-16 bottom-16 sm:bottom-20 md:bottom-24 z-10 max-w-[85vw] sm:max-w-[70vw] md:max-w-[620px]"
      >
        <h1
          className="font-serif font-semibold text-ink leading-[0.92] tracking-[-0.025em] m-0"
          style={{ fontSize: 'clamp(3.5rem, 10.5vw, 8.2rem)' }}
        >
          <span className="block overflow-hidden">
            <span className="block animate-rise" style={{ animationDelay: '0.1s' }}>
              Sushant
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.35em] -mb-[0.35em] pr-3">
            <span className="block italic animate-rise font-normal" style={{ animationDelay: '0.24s' }}>
              Dogra<span className="text-amber not-italic">.</span>
            </span>
          </span>
        </h1>

        <p className="mt-5 sm:mt-6 font-mono text-[9px] sm:text-[10px] md:text-[11.5px] tracking-[0.22em] uppercase text-ink/85 leading-relaxed">
          <span className="inline-block bg-paper/70 px-2.5 py-1 -mx-2.5 border border-line/40 rounded-sm">
            Senior Software Engineer — On-Device AI &amp; Security
          </span>
        </p>

        <p className="mt-2 font-mono text-[8.5px] sm:text-[9.5px] md:text-[10.5px] tracking-[0.22em] uppercase text-ink/60">
          <span className="inline-block bg-paper/60 px-2 py-0.5 -mx-2">
            Samsung Research&nbsp;&nbsp;·&nbsp;&nbsp;IIT Madras
          </span>
        </p>
      </div>

      {/* Scroll cue — vertical indicator on bottom-right */}
      <a
        href="#about"
        onClick={scrollToAbout}
        aria-label="Scroll to About section"
        className="absolute right-6 sm:right-10 md:right-16 bottom-16 sm:bottom-20 md:bottom-24 z-10 pointer-events-auto flex flex-col items-center gap-3 group cursor-pointer"
      >
        <span
          className="font-mono text-[9px] tracking-[0.34em] uppercase text-ink/65 group-hover:text-amber transition-colors"
          style={{ writingMode: 'vertical-rl' }}
        >
          SCROLL
        </span>
        <span className="relative block w-px h-12 bg-line overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-4 bg-amber animate-drip" />
        </span>
      </a>
    </section>
  );
}
