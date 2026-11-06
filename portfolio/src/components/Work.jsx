/**
 * @file Work.jsx
 * @description Selected work section presented as a clean research archive placeholder
 * @module components
 */

const Section = ({ id, children, className = '' }) => (
  <section id={id} data-mode="oscillo" className={`relative z-10 ${className}`}>
    <div className="mx-auto max-w-6xl px-6 md:px-10 py-24 md:py-36 relative z-10">{children}</div>
  </section>
);

const Eyebrow = ({ n, children, badge }) => (
  <div className="rv flex items-center gap-4 font-mono text-[11px] tracking-[0.28em] uppercase text-ink/55">
    <span className="text-copper font-medium">{n}</span>
    <span className="h-px w-12 bg-ink/25" />
    <span>{children}</span>
    {badge && (
      <span className="hidden sm:inline-block font-mono text-[9px] tracking-[0.16em] uppercase px-2 py-0.5 rounded border border-copper/30 text-copper bg-copper/5">
        {badge}
      </span>
    )}
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

const ProjectPlaceholder = ({ n, title, desc, tags }) => (
  <div className="rv bg-paper/92 backdrop-blur-md rounded-2xl border border-line/70 p-6 sm:p-8 my-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-amber/40">
    <div className="grid md:grid-cols-12 items-baseline gap-3 md:gap-6">
      <span className="md:col-span-1 font-mono text-[11px] tracking-[0.2em] text-copper font-medium">
        {n}
      </span>
      <div className="md:col-span-5">
        <h3 className="font-serif text-[24px] md:text-[28px] leading-tight text-ink font-normal">
          {title}
        </h3>
      </div>
      <p className="md:col-span-4 font-body text-[15px] leading-relaxed text-ink/75">
        {desc}
      </p>
      <div className="md:col-span-2 flex md:justify-end items-baseline">
        <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-ink/55 md:text-right border border-line/70 px-2.5 py-1 bg-paper2/80 rounded">
          {tags}
        </span>
      </div>
    </div>
  </div>
);

export default function Work() {
  return (
    <Section id="work" className="border-t border-ink/[0.08]">
      <Ghost>03</Ghost>
      <Eyebrow n="03" badge="ARCHIVE · PLACEHOLDER">
        Selected work
      </Eyebrow>

      <h2 className="rv mt-10 font-display text-4xl md:text-6xl leading-[1.04] text-ink max-w-3xl">
        Shipped <em className="italic">small</em>, on purpose<span className="text-copper">.</span>
      </h2>

      <p className="rv mt-6 font-body text-[16px] md:text-[17px] leading-[1.75] text-ink/65 max-w-2xl">
        Representative systems archive and focus areas — intelligence that fits, runs cold,
        and executes securely on constrained silicon.
      </p>

      <div className="mt-14 md:mt-16 border-b border-ink/10">
        <ProjectPlaceholder
          n="01"
          title="Pocket LLM Runtime"
          desc="4-bit on-device generative inference: weight layouts shaped for NPU systolic tiles, shared SRAM KV-cache, sub-40ms first token."
          tags="NPU · INT4 · RUNTIME"
        />
        <ProjectPlaceholder
          n="02"
          title="Sealed Inference"
          desc="Model execution inside the secure world — encrypted weights sealed at rest, decrypted only in TEE, zero DRAM leakage to host OS."
          tags="TEE · TRUSTZONE · CRYPTO"
        />
        <ProjectPlaceholder
          n="03"
          title="Milliwatt Vision"
          desc="Always-on visual intelligence pipeline: cascaded hierarchical models, event-gated wake-up, sub-100mW steady-state envelope."
          tags="VISION · EDGE · LOW-POWER"
        />
        <ProjectPlaceholder
          n="04"
          title="Bench, the Edge Harness"
          desc="Automated SoC benchmarking rig measuring what mobile hardware actually feels: p99 tail latency, joules per token, and thermal throttling."
          tags="TOOLING · PROFILING · ENERGY"
        />
      </div>

      <div className="rv mt-6 flex items-center justify-between font-mono text-[9.5px] tracking-[0.18em] uppercase text-ink/40">
        <span>* REPRESENTATIVE SYSTEMS DOSSIER · ARCHIVE PLACEHOLDER</span>
        <span className="hidden sm:inline">NDA PROTECTED · ON-DEVICE SILICON IP</span>
      </div>
    </Section>
  );
}
