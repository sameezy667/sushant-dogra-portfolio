/**
 * @file Footer.jsx
 * @description Contact dossier and interactive ANSI block letter ASCII signature footer.
 *   Faithfully translated from sushant-dogra-portfolio-footer.html.
 *   Features:
 *     - Giant block letter ASCII signature (SUSHANT DOGRA)
 *     - Responsive auto-scaling typography probe (fitSig)
 *     - Interactive pointer fire trail (.c.lit)
 *     - Amber scanline row sweep (.c.scan)
 *     - Random glyph flicker & staggered row reveals
 *     - Back to top smooth scroll
 * @module components
 */
import { useEffect, useRef } from 'react';

const SIG_A = `███████╗██╗   ██╗███████╗██╗  ██╗ █████╗ ███╗   ██╗████████╗
██╔════╝██║   ██║██╔════╝██║  ██║██╔══██╗████╗  ██║╚══██╔══╝
███████╗██║   ██║███████╗███████║███████║██╔██╗ ██║   ██║
╚════██║██║   ██║╚════██║██╔══██║██╔══██║██║╚██╗██║   ██║
███████║╚██████╔╝███████║██║  ██║██║  ██║██║ ╚████║   ██║
╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝`;

const SIG_B = `██████╗  ██████╗  ██████╗ ██████╗  █████╗
██╔══██╗██╔═══██╗██╔════╝ ██╔══██╗██╔══██╗
██║  ██║██║   ██║██║  ███╗██████╔╝███████║
██║  ██║██║   ██║██║   ██║██╔══██╗██╔══██║
██████╔╝╚██████╔╝╚██████╔╝██║  ██║██║  ██║
╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝`;

function prepSig(art) {
  let lines = art.split('\n').map(l => l.replace(/\s+$/, ''));
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  const max = Math.max.apply(null, lines.map(l => l.length));
  return lines.map(l => ' '.repeat(((max - l.length) / 2) | 0) + l);
}

export default function Footer() {
  const footerRef = useRef(null);
  const sigRef = useRef(null);
  const spRef = useRef(0);

  useEffect(() => {
    const pre = sigRef.current;
    const foot = footerRef.current;
    if (!pre || !foot) return;

    const lines = [].concat(prepSig(SIG_A), [''], prepSig(SIG_B));
    const maxCols = Math.max.apply(null, lines.map(l => l.length));

    // Render signature HTML with individual interactive character spans
    pre.innerHTML = lines
      .map((l, li) => {
        const spans = [].map
          .call(l, (ch, ci) => (ch === ' ' ? ' ' : `<span class="c" data-c="${ci}">${ch}</span>`))
          .join('');
        if (!l.trim()) return '<span class="sig-row gap"></span>';
        return `<span class="sig-row" data-len="${l.length}" style="--d:${Math.min(li * 85, 850)}ms">${spans}</span>`;
      })
      .join('');

    // Probe element for responsive font size calculation
    const probe = document.createElement('span');
    probe.style.cssText =
      'position:absolute;visibility:hidden;white-space:pre;left:-9999px;top:0;font-family:"JetBrains Mono",ui-monospace,monospace';
    document.body.appendChild(probe);

    const fitSig = () => {
      probe.style.font = '400 100px "JetBrains Mono", ui-monospace, monospace';
      probe.textContent = 'M'.repeat(maxCols);
      const w = probe.getBoundingClientRect().width || 1;
      const target = Math.min(window.innerWidth * 0.92, 1230);
      pre.style.fontSize = Math.max(9, Math.min(46, (100 * target) / w)) + 'px';
    };
    fitSig();

    window.addEventListener('resize', fitSig);

    // Pointer hover: glyphs catch fire under the cursor
    const onPointerMove = (e) => {
      const s = e.target;
      if (s && s.classList && s.classList.contains('c') && !s._lit) {
        s._lit = 1;
        s.classList.add('lit');
        setTimeout(() => {
          s.classList.remove('lit');
          s._lit = 0;
        }, 700);
      }
    };
    pre.addEventListener('pointermove', onPointerMove);

    // Amber scanline sweeping each row
    const scanInterval = setInterval(() => {
      const rs = pre.querySelectorAll('.sig-row');
      const currentSp = spRef.current;
      for (let ri = 0; ri < rs.length; ri++) {
        const row = rs[ri];
        const len = +row.dataset.len || 1;
        if (len < 3) continue;
        const head = (currentSp + ri * 9) % len;
        const cs = row.querySelectorAll('.c');
        for (let ci = 0; ci < cs.length; ci++) {
          const c = +cs[ci].dataset.c;
          let on = c >= head && c < head + 3;
          if (head + 3 > len) on = on || c < head + 3 - len;
          cs[ci].classList.toggle('scan', on);
        }
      }
      spRef.current += 2;
    }, 130);

    // Occasional subtle random flicker
    const flickerInterval = setInterval(() => {
      const cs = pre.querySelectorAll('.c');
      if (!cs.length) return;
      const s = cs[(Math.random() * cs.length) | 0];
      s.classList.add('lit');
      setTimeout(() => s.classList.remove('lit'), 420);
    }, 1100);

    // Intersection observer to trigger entry reveal
    const fio = new IntersectionObserver(
      entries => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            foot.classList.add('on');
            fio.unobserve(foot);
          }
        });
      },
      { threshold: 0.12 }
    );
    fio.observe(foot);

    return () => {
      window.removeEventListener('resize', fitSig);
      pre.removeEventListener('pointermove', onPointerMove);
      clearInterval(scanInterval);
      clearInterval(flickerInterval);
      fio.disconnect();
      if (probe.parentNode) probe.parentNode.removeChild(probe);
    };
  }, []);

  function scrollToTop(e) {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <>
      {/* Contact Section */}
      <section className="sec relative z-10 py-24 md:py-36" id="contact" data-mode="oscillo">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-11">
          <div className="bg-paper/92 backdrop-blur-md rounded-2xl border border-line/70 p-8 sm:p-12 md:p-16 shadow-sm">
            <header className="rv flex items-baseline gap-4 mb-10 md:mb-14">
              <span className="text-amber font-mono text-[11px] tracking-[0.18em] font-medium">03</span>
              <span className="font-mono text-[11px] tracking-[0.24em] text-ink/65 uppercase">CONTACT</span>
              <span className="flex-1 h-px bg-line" />
            </header>

            <h2 className="rv font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.015em] text-ink max-w-3xl leading-[1.08]">
              Intelligence, <em className="italic font-serif">off the cloud.</em>
            </h2>

            <p className="rv mt-6 font-serif text-[clamp(1.05rem,1.5vw,1.25rem)] text-ink/75 max-w-2xl leading-relaxed" style={{ '--d': '80ms' }}>
              Open to conversations about on-device AI, edge runtimes and security architecture — the harder the constraint, the better.
            </p>

            <div className="rv mt-10 md:mt-12 flex flex-wrap gap-6 sm:gap-10 font-mono text-[11.5px] tracking-[0.14em]" style={{ '--d': '160ms' }}>
              <a
                href="mailto:hello@sushantdogra.dev"
                className="text-ink border-b border-line pb-1.5 hover:border-amber hover:text-amber transition-colors"
              >
                EMAIL ↗ hello@sushantdogra.dev
              </a>
              <a
                href="https://www.linkedin.com/in/sushantdogra"
                target="_blank"
                rel="noreferrer"
                className="text-ink border-b border-line pb-1.5 hover:border-amber hover:text-amber transition-colors"
              >
                LINKEDIN ↗
              </a>
              <a
                href="https://github.com/sushantdogra"
                target="_blank"
                rel="noreferrer"
                className="text-ink border-b border-line pb-1.5 hover:border-amber hover:text-amber transition-colors"
              >
                GITHUB ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER · ASCII SIGNATURE ============ */}
      <footer
        ref={footerRef}
        className="footer relative z-10 pt-16 md:pt-28 pb-16 text-center overflow-hidden"
        id="footer"
        data-mode="surface"
      >
        {/* Soft radial backdrop veil */}
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background:
              'radial-gradient(ellipse 72% 66% at 50% 32%, rgba(247,243,234,0.94), rgba(247,243,234,0.62) 60%, rgba(247,243,234,0) 86%), linear-gradient(180deg, rgba(247,243,234,0) 48%, rgba(247,243,234,0.96) 76%, rgba(247,243,234,0.96) 100%)'
          }}
        />

        {/* ASCII Signature Block Canvas Container */}
        <div className="max-w-[1280px] mx-auto px-4 overflow-x-hidden">
          <pre
            id="sig"
            ref={sigRef}
            role="img"
            aria-label="SUSHANT DOGRA"
            className="font-mono font-normal leading-[1.02] text-ink/90 whitespace-pre table mx-auto select-none"
          />
        </div>

        <div className="foot-rule h-px bg-line max-w-[1180px] mx-auto mt-12 md:mt-20 mb-6 px-5" />

        <div className="colophon flex flex-col sm:flex-row justify-between items-center gap-4 max-w-[1180px] mx-auto px-5 sm:px-8 md:px-11 font-mono text-[10.5px] tracking-[0.16em] text-ink/75">
          <span>© 2026 SUSHANT DOGRA</span>
          <button
            id="totop"
            type="button"
            onClick={scrollToTop}
            className="cursor-pointer hover:text-amber transition-colors bg-transparent border-0 py-1"
          >
            BACK TO TOP ↑
          </button>
        </div>
      </footer>
    </>
  );
}
