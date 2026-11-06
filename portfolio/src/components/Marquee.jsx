/**
 * @file Marquee.jsx
 * @description Infinite scrolling tech keyword marquee strip
 * @module components
 */
const MQ = [
  'ON-DEVICE AI',
  'MODEL QUANTIZATION',
  'SECURE INFERENCE',
  'NPU RUNTIMES',
  'EDGE VISION',
  'TRUSTED EXECUTION',
  'MEMORY BUDGETS',
  'MILLIWATT MATH',
];

export default function Marquee() {
  return (
    <div className="bg-paper/92 backdrop-blur-md border-y border-line/70 py-4 overflow-hidden select-none relative z-10" aria-hidden="true">
      <div className="marquee-track font-mono text-[10px] tracking-[0.34em] uppercase text-ink/50 font-medium">
        {[0, 1].map(k => (
          <div key={k} className="flex shrink-0">
            {MQ.map((m, i) => (
              <span key={i} className="flex items-center">
                <span className="px-7">{m}</span>
                <span className="text-copper/60">*</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
