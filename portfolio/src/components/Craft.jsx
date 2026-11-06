/**
 * @file Craft.jsx
 * @description Stack / craft section translated directly from sushant-dogra-portfolio.html
 * @module components
 */

const Section = ({ id, children, className = '' }) => (
  <section id={id} data-mode="oscillo" className={`relative z-10 ${className}`}>
    <div className="mx-auto max-w-6xl px-6 md:px-10 py-24 md:py-36 relative z-10">{children}</div>
  </section>
);

const Eyebrow = ({ n, children }) => (
  <div className="rv flex items-center gap-4 font-mono text-[11px] tracking-[0.28em] uppercase text-ink/55">
    <span className="text-copper font-medium">{n}</span>
    <span className="h-px w-12 bg-ink/25"></span>
    <span>{children}</span>
  </div>
);

const CraftCol = ({ title, items }) => (
  <div className="rv bg-paper/92 backdrop-blur-md rounded-2xl border border-line/70 p-6 sm:p-7 shadow-sm transition-shadow duration-300 hover:shadow-md">
    <div className="font-mono text-[9.5px] tracking-[0.26em] uppercase text-copper font-medium pb-3 border-b border-line/50">{title}</div>
    <ul className="mt-4 space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="font-mono text-[12px] text-ink/80 hover:text-ink transition-colors cursor-default">
          <span className="text-copper mr-2 font-bold">·</span>
          {it}
        </li>
      ))}
    </ul>
  </div>
);

export default function Craft() {
  return (
    <Section id="craft" className="bg-panel/50 border-y border-ink/[0.07]">
      <Eyebrow n="04">Stack</Eyebrow>
      <h2 className="rv mt-10 font-display text-4xl md:text-5xl leading-[1.05] text-ink">
        Tools of the <em className="italic">squeeze.</em>
      </h2>
      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 md:gap-12">
        <CraftCol title="Languages" items={['C++', 'Python', 'Rust', 'Kotlin / Java', 'C · ARM asm']} />
        <CraftCol
          title="ML & runtimes"
          items={['LiteRT / TFLite', 'ONNX Runtime', 'NNAPI · NPU SDKs', 'Quantization tooling', 'Distillation pipelines']}
        />
        <CraftCol
          title="Security"
          items={['ARM TrustZone', 'KeyMint / Keymaster', 'mbedTLS · OpenSSL', 'Secure boot', 'Attestation flows']}
        />
        <CraftCol
          title="Tools"
          items={['Android NDK', 'Perfetto · Systrace', 'Bazel', 'Power monitors', 'Oscilloscope, honestly']}
        />
      </div>
    </Section>
  );
}
