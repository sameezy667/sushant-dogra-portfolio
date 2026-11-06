/**
 * @file Experience.jsx
 * @description Experience section featuring scroll-driven outlined company signatures
 *   styled with our Earthy Elegance palette and editorial typography stack.
 * @module components
 */
import { useEffect, useRef } from 'react';

const Section = ({ id, children, className = '' }) => (
  <section id={id} data-mode="cipher" className={`relative z-10 ${className}`}>
    <div className="mx-auto max-w-6xl px-6 md:px-10 py-24 md:py-36 relative z-10">{children}</div>
  </section>
);

const Ghost = ({ children }) => (
  <div
    aria-hidden="true"
    className="hidden md:block pointer-events-none select-none absolute right-8 top-14 font-display text-[190px] leading-none text-ink/[0.05]"
  >
    {children}
  </div>
);

/**
 * OutlinedName component
 * Displays a massive outlined typography signature that fills with solid ink
 * as the user scrolls past the entry.
 */
function OutlinedName({ name, fs }) {
  const wrap = useRef(null);
  const fill = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const update = () => {
      rafRef.current = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p = (vh * 0.9 - r.top) / (vh * 0.65);
      p = Math.max(0, Math.min(1, p));
      const f = p * 0.65; // ink sweeps dynamically through the letters
      if (fill.current) {
        fill.current.style.clipPath = `inset(-0.08em ${((1 - f) * 100).toFixed(2)}% -0.08em 0)`;
      }
    };

    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const base = 'font-serif font-medium tracking-[-0.015em] whitespace-nowrap leading-[0.88] block';

  return (
    <div ref={wrap} className="relative select-none w-full max-w-full overflow-hidden" style={{ fontSize: fs }}>
      <span className="sr-only">{name}</span>
      <h3 aria-hidden="true" className={`${base} stroke`}>
        {name}
        <span className="text-amber">.</span>
      </h3>
      <div
        ref={fill}
        aria-hidden="true"
        className={`${base} clipfill absolute inset-0 text-ink`}
      >
        {name}
        <span className="text-amber">.</span>
      </div>
    </div>
  );
}

const JOBS = [
  {
    name: 'SAMSUNG',
    fs: 'clamp(2.4rem, 6.8vw, 6.2rem)',
    idx: '01',
    role: 'SENIOR SOFTWARE ENGINEER',
    period: '2022 — PRESENT',
    current: true,
    title: 'Senior Software Engineer',
    sub: 'ON-DEVICE AI & SECURITY',
    loc: 'SAMSUNG RESEARCH INSTITUTE — BENGALURU',
    desc: 'I make flagship AI run with the network off — quantised language and vision models compiled down onto the NPU, with integrity rooted in TrustZone, shipped on Samsung flagships worldwide.',
    points: [
      'On-device generative AI — quantised LLM and vision pipelines running entirely on the flagship NPU',
      'Secure deployment — model integrity, key attestation and execution walled off inside TrustZone',
      'Latency and memory budgets — first-token and steady-state optimization for offline inference',
      'Cross-layer ownership — from NPU compiler output to Knox and framework integration',
    ],
    tags: ['C++', 'Python', 'TFLite', 'ONNX Runtime', 'Android NDK', 'TrustZone', 'Kotlin'],
  },
  {
    name: 'SAMSUNG',
    fs: 'clamp(2.4rem, 6.8vw, 6.2rem)',
    idx: '02',
    role: 'SOFTWARE ENGINEER',
    period: '2019 — 2022',
    current: false,
    title: 'Software Engineer',
    sub: 'SYSTEMS & MACHINE LEARNING',
    loc: 'SAMSUNG R&D INSTITUTE — BENGALURU',
    desc: 'The grounding years — camera and sensing pipelines, ML in constrained environments, and the unglamorous C++ that everything glamorous stands on. Learned to profile first and guess never.',
    points: [
      'Camera and on-device perception features across flagship launches',
      'Inference inside tight envelopes — thermal, power and memory',
      'Performance archaeology — profiling and fixing HAL and framework layers',
    ],
    tags: ['C++', 'Java', 'Android Framework', 'AOSP', 'OpenCV', 'CMake'],
  },
  {
    name: 'IIT MADRAS',
    fs: 'clamp(2.1rem, 5.8vw, 5.4rem)',
    idx: '03',
    role: 'DUAL DEGREE',
    period: '2014 — 2019',
    current: false,
    title: 'Dual Degree — B.Tech + M.Tech',
    sub: 'INDIAN INSTITUTE OF TECHNOLOGY',
    loc: 'CHENNAI, INDIA',
    desc: 'Five years of fundamentals by the beach in Chennai — systems, signals and computation, and a campus culture that turns engineers into problem-solvers.',
    points: [
      'Integrated five-year dual degree programme',
      'Coursework across systems, machine learning and security',
      'Competitions, clubs and late-night builds',
    ],
    tags: ['C', 'Systems', 'Signals', 'Mathematics'],
  },
];

function Job({ j }) {
  return (
    <article className="entry group bg-paper/92 backdrop-blur-md rounded-2xl border border-line/70 p-6 sm:p-10 md:p-12 shadow-sm my-8 transition-shadow duration-300 hover:shadow-md">
      <div className="rv flex items-baseline justify-between gap-4 mb-4 font-mono text-[10px] md:text-[11px] tracking-[0.25em]">
        <span>
          <span className="text-copper font-medium">/{j.idx}</span>
          <span className="text-ink/50"> — {j.role}</span>
        </span>
        <span className="text-ink/65 whitespace-nowrap">
          {j.period}
          {j.current && (
            <span
              className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-copper align-[1px]"
              style={{ animation: 'pulseDot 2.4s ease-in-out infinite' }}
            />
          )}
        </span>
      </div>

      <div className="rv mb-6 md:mb-8">
        <OutlinedName name={j.name} fs={j.fs} />
      </div>

      <div className="grid md:grid-cols-12 gap-x-10 lg:gap-x-16 gap-y-7 pt-6 border-t border-line/50">
        <div className="md:col-span-4">
          <div className="rv">
            <h4 className="font-serif italic font-normal text-[24px] md:text-[28px] leading-snug text-ink">
              {j.title}
            </h4>
            <p className="font-mono text-[10px] tracking-[0.22em] text-copper mt-2.5 font-medium">
              {j.sub}
            </p>
            <p className="font-mono text-[10px] tracking-[0.16em] text-ink/45 mt-3 leading-relaxed">
              {j.loc}
            </p>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="rv">
            <p className="max-w-[64ch] font-body text-[15px] md:text-[16.5px] leading-[1.85] text-ink/85">
              {j.desc}
            </p>
          </div>

          <div className="rv">
            <ul className="mt-6 space-y-3.5 max-w-[64ch]">
              {j.points.map(p => (
                <li key={p} className="flex gap-4 font-body text-[14px] md:text-[15px] leading-relaxed text-ink/80">
                  <span className="mt-[0.6em] h-px w-4 bg-copper shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rv">
            <div className="mt-7 flex flex-wrap gap-2">
              {j.tags.map(t => (
                <span
                  key={t}
                  className="font-mono text-[10px] tracking-[0.14em] uppercase border border-line/80 bg-paper/60 px-2.5 py-1.5 text-ink/65 transition-colors duration-300 group-hover:border-ink/40 group-hover:text-ink"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Experience() {
  return (
    <Section id="experience" className="bg-panel/40 border-y border-ink/[0.08]">
      <Ghost>02</Ghost>

      <div className="rv flex items-center gap-4 mb-6">
        <span className="font-mono text-[11px] tracking-[0.3em] text-copper">02 — EXPERIENCE</span>
        <span className="h-px flex-1 bg-ink/10" />
        <span className="font-mono text-[10px] tracking-[0.2em] text-ink/40 hidden sm:block">
          2019 — PRESENT
        </span>
      </div>

      <h2 className="rv font-display text-4xl md:text-6xl leading-[1.05] text-ink max-w-2xl mb-12 md:mb-16">
        Where the work happened<span className="text-copper">.</span>
      </h2>

      <div>
        {JOBS.map((j, i) => (
          <Job key={j.idx} j={j} i={i} />
        ))}
      </div>
    </Section>
  );
}
