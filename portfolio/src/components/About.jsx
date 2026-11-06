/**
 * @file About.jsx
 * @description About section translated directly from sushant-dogra-portfolio.html
 * @module components
 */

const Section = ({ id, children, className = '' }) => (
  <section id={id} data-mode="neural" className={`relative z-10 ${className}`}>
    <div className="mx-auto max-w-6xl px-6 md:px-10 py-24 md:py-36 relative z-10">{children}</div>
  </section>
);

const Eyebrow = ({ n, children }) => (
  <div className="rv flex items-center gap-4 font-mono text-[11px] tracking-[0.28em] uppercase text-ink/55">
    <span className="text-copper">{n}</span>
    <span className="h-px w-12 bg-ink/25"></span>
    <span>{children}</span>
  </div>
);

const Ghost = ({ children }) => (
  <div
    aria-hidden="true"
    className="hidden md:block pointer-events-none select-none absolute right-8 top-14 font-display text-[190px] leading-none text-ink/[0.05]"
  >
    {children}
  </div>
);

const Colophon = ({ k, v }) => (
  <div className="grid grid-cols-[110px_1fr] gap-4 border-t border-ink/10 py-3.5">
    <dt className="font-mono text-[9.5px] tracking-[0.24em] uppercase text-ink/45 pt-1">{k}</dt>
    <dd className="font-body text-[15px] leading-relaxed text-ink/85">{v}</dd>
  </div>
);

const Principle = ({ n, t, d }) => (
  <div className="rv bg-paper/92 backdrop-blur-md rounded-2xl border border-line/70 p-6 sm:p-8 shadow-sm">
    <div className="font-mono text-[11px] tracking-[0.28em] text-copper font-medium">{n}</div>
    <h4 className="mt-3 font-serif text-2xl leading-snug text-ink">{t}</h4>
    <p className="mt-3 font-body text-[15px] leading-relaxed text-ink/75">{d}</p>
  </div>
);

/**
 * Clean architectural schematic for On-Device AI & Secure Inference
 * Replaces the arbitrary die-map with a real technical system execution flow.
 */
function SystemArch() {
  const specs = [
    { label: 'RUNTIME', value: 'On-Device Zero-Copy NPU Graph' },
    { label: 'QUANT',   value: 'INT4 / INT8 Asymmetric Weight Packing' },
    { label: 'ENCLAVE', value: 'ARM TrustZone · Hardware KeyMint' },
    { label: 'MEMORY',  value: 'Tiled SRAM Cache · Zero DRAM Spills' },
    { label: 'BUDGET',  value: '< 100 mW Steady State · p99 < 40ms' },
  ];

  return (
    <div className="font-mono text-[10.5px] leading-relaxed text-ink/80">
      {/* Schematic diagram */}
      <div className="p-3 bg-paper/60 border border-ink/10 rounded-sm mb-4">
        <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-ink/50 pb-2 border-b border-ink/10">
          <span>HOST UNTRUSTED OS</span>
          <span className="text-copper">ISOLATION BARRIER</span>
          <span>SECURE WORLD</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-[10px] py-3">
          <div className="p-2 border border-ink/15 bg-paper/80">
            <div className="text-copper font-medium">APP / OS</div>
            <div className="text-[8.5px] text-ink/50 mt-0.5">Prompt &amp; IO</div>
          </div>
          <div className="flex flex-col items-center justify-center text-[9px] text-ink/40">
            <span>DMA ➔</span>
            <span className="text-[7.5px] text-copper tracking-wider">[SHMEM]</span>
            <span>➔ TEE</span>
          </div>
          <div className="p-2 border border-copper/40 bg-panel/70">
            <div className="text-copper font-medium">TRUSTZONE</div>
            <div className="text-[8.5px] text-ink/50 mt-0.5">Sealed SRAM</div>
          </div>
        </div>
        <div className="text-center pt-2 border-t border-ink/10 text-[9px] text-ink/50 tracking-wide">
          ▼ &nbsp; ZERO-COPY DIRECT TILE DISPATCH &nbsp; ▼
        </div>
        <div className="mt-2 p-2 border border-ink/20 bg-paper text-center">
          <div className="text-ink font-medium text-[11px]">NPU SYSTOLIC ARRAY [4-TILE]</div>
          <div className="text-[8.5px] text-ink/50 mt-0.5">4-bit INT4 Kernels · Hardware Attested</div>
        </div>
      </div>

      {/* Spec list */}
      <div className="space-y-1.5 pt-1">
        {specs.map((s, i) => (
          <div key={i} className="flex justify-between items-baseline border-b border-ink/[0.06] pb-1 text-[9.5px]">
            <span className="text-ink/45 tracking-[0.2em] uppercase">{s.label}</span>
            <span className="text-ink/85">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <Section id="about">
      <Ghost>01</Ghost>
      <Eyebrow n="01">About</Eyebrow>
      <h2 className="rv mt-10 font-display text-4xl md:text-6xl leading-[1.04] tracking-[-0.01em] max-w-3xl">
        I teach big models to live in <em className="italic">small, guarded</em> places.
      </h2>

      <div className="mt-16 md:mt-20 grid gap-10 lg:gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7 bg-paper/92 backdrop-blur-md rounded-2xl border border-line/70 p-6 sm:p-10 shadow-sm space-y-7">
          <p className="rv font-body text-[17px] md:text-[18px] leading-[1.75] text-ink/85 first-letter:float-left first-letter:font-serif first-letter:text-[64px] first-letter:leading-[0.8] first-letter:mr-3 first-letter:mt-1 first-letter:text-copper">
            By day I'm a senior software engineer at Samsung Research, where the question is never
            <em className="italic"> can it run?</em> — it's <em className="italic">can it run on a phone, offline, in a
            pocket, without draining the battery or leaking a single byte?</em> That question rewires how you
            think about software: every multiply is a budget line, every memory copy a small confession.
          </p>
          <p className="rv font-body text-[17px] md:text-[18px] leading-[1.75] text-ink/75">
            So the work runs the whole squeeze — quantising and compiling models until they fit NPU tiles,
            shaving latency until inference feels like reflexes, and sealing execution inside trusted
            environments so the device can keep a secret. Samsung Research is where I do it; IIT Madras,
            where a dual degree taught me that the hardware always gets a vote.
          </p>
          <p className="rv font-body text-[17px] md:text-[18px] leading-[1.75] text-ink/75">
            Off the clock: schematics read for fun, mechanical keyboards with too few keys, long walks
            that compile.
          </p>

          <div className="rv pt-4 border-t border-line/50">
            <div className="font-mono text-[9.5px] tracking-[0.28em] uppercase text-ink/45 font-medium">Now</div>
            <p className="mt-2 font-body text-[15px] leading-relaxed text-ink/75">
              shipping smaller, safer models — and arguing with profilers about who's right.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 bg-paper/92 backdrop-blur-md rounded-2xl border border-line/70 p-6 sm:p-8 shadow-sm space-y-8">
          <figure className="rv border border-line/60 bg-paper2/80 rounded-xl p-5 md:p-6">
            <figcaption className="flex items-center justify-between font-mono text-[9px] tracking-[0.26em] uppercase text-ink/50 pb-3 border-b border-line/50 font-medium">
              <span>Execution Pipeline</span>
              <span>Secure World Enclave</span>
            </figcaption>
            <div className="pt-5 pb-2">
              <SystemArch />
            </div>
            <figcaption className="pt-3 border-t border-line/50 font-mono text-[9px] tracking-[0.14em] text-ink/50 leading-relaxed">
              fig. 01 — on-device architecture. every block earns its silicon.
            </figcaption>
          </figure>

          <dl className="rv">
            <Colophon k="Focus" v="On-device AI · secure inference" />
            <Colophon k="Education" v="Dual degree — IIT Madras" />
            <Colophon k="Affiliation" v="Samsung Research" />
            <Colophon k="Interests" v="NPUs · TEEs · instruction schedules · paper-white terminals" />
          </dl>
        </div>
      </div>

      <div className="mt-20 md:mt-28 grid gap-10 md:grid-cols-3 md:gap-12">
        <Principle
          n="01"
          t="Latency is a feature."
          d="A model that answers in 40 ms feels alive. One that answers in 400 feels like a form. I work on the wrong side of that line until it moves."
        />
        <Principle
          n="02"
          t="Security is a primitive."
          d="Not a wrapper bolted around the model — a property of where it runs, what it can see, and who it can tell."
        />
        <Principle
          n="03"
          t="The battery is the budget."
          d="Every joule spent computing is a joule not spent being useful tomorrow. Efficiency is the feature users feel but never see."
        />
      </div>
    </Section>
  );
}
