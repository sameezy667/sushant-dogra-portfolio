# context.md — Sushant Dogra Portfolio

## Project Overview
Production-grade personal portfolio for Sushant Dogra (Senior SWE, Samsung Research) translated into a modular React + Bun (Vite) application.
Features:
- Transforming 5-stage living ASCII background engine (`mainboard` → `neural` → `cipher` → `oscillo` → `surface`) adapted from `sushant-dogra-portfolio-footer.html`.
- Full, crisp, unobstructed ASCII background visibility across the entire viewport (removed all full-section veils).
- Hero section: "Sushant Dogra." title positioned at the bottom-left with zero blur backgrounds, leaving the central/right CPU SoC ASCII die completely visible and unobstructed. Full Fraunces italic 'g' descender preserved without clipping. Top HUD banners removed for maximum cleanliness.
- Refined frosted glass navbar (`bg-paper/75 backdrop-blur-xl border-b border-line/60 shadow-[0_4px_24px_rgba(38,35,29,0.04)]`) with streamlined brand on left and nav links on right.
- Frosted glass cards applied exclusively to content cards (`bg-paper/92 backdrop-blur-md rounded-2xl border border-line/70 shadow-sm`), guaranteeing 100% legibility for all text while showing the full ASCII simulation flowing around the cards.
- Fixed Experience card width and responsive `SAMSUNG.` / `IIT MADRAS.` typography sizing to prevent any overflow.
- Clean footer with interactive ANSI block-letter ASCII signature footer (pointer fire trail, sweeping scanline, responsive auto-scaling font probe). Removed unnecessary technical label colophon.
- Removed bottom-right HUD pill for a distraction-free, cinematic viewing experience.
- Custom site favicon configured (`favicon.jpeg`).
- Preserved senior engineer About section with `SystemArch` execution pipeline (Host OS ↔ Shared SRAM ↔ TrustZone TEE ↔ 4-Tile NPU Systolic Array).
- Preserved Experience section with scroll-driven outlined company signature effect (`OutlinedName` with dynamic ink sweep `.clipfill`).
- Minimal research dossier placeholder for Selected Work.
- Earthy Elegance / Editorial palette tokens (`paper`, `ink`, `amber`, `line`, `panel`).

## Tech Stack
| Layer | Choice |
|---|---|
| Runtime | Bun 1.3.x |
| Bundler | Vite 8.3.x with `@tailwindcss/vite` plugin |
| Framework | React 19 |
| Smooth scroll | Lenis 1.3.x |
| CSS | Tailwind CSS v4 (`@import "tailwindcss"` + `@theme {}`) |
| Fonts | Fraunces · Instrument Serif · JetBrains Mono · Newsreader · IBM Plex Mono |
| Animation | Pure CSS transitions + IntersectionObserver + RAF loop |

## Architecture

```
portfolio/
├── public/
│   ├── favicon.jpeg        ← Custom site favicon
│   └── favicon.jpg
├── index.html              ← Fraunces, JetBrains Mono, Instrument Serif fonts + favicon.jpeg link
├── vite.config.js          ← React + @tailwindcss/vite plugins
├── package.json
├── context.md              ← Single source of truth ledger
└── src/
    ├── main.jsx            ← StrictMode root render
    ├── App.jsx             ← layout orchestrator, paper grain, smooth scroll, scroll reveals
    ├── index.css           ← Tailwind v4 @theme, tokens, signature sweep keyframes, .rv reveals
    ├── components/
    │   ├── Nav.jsx         ← frosted glass header (backdrop-blur-xl), progress hairline, nav links
    │   ├── Hero.jsx        ← bottom-left title with complete Fraunces italic 'g', zero blur, scroll cue
    │   ├── Marquee.jsx     ← infinite marquee keyword strip with frosted blur background
    │   ├── About.jsx       ← frosted bio card, SystemArch execution pipeline, Principles (data-mode="neural")
    │   ├── Experience.jsx  ← frosted Job cards with fitted OutlinedName typography (data-mode="cipher")
    │   ├── Work.jsx        ← frosted selected work dossier cards (data-mode="oscillo")
    │   ├── Craft.jsx       ← frosted stack cards (data-mode="oscillo")
    │   ├── Footer.jsx      ← frosted contact card + interactive ANSI signature + clean copyright bar (data-mode="surface")
    │   └── AsciiBackground.jsx ← fixed canvas + IntersectionObserver mode switcher
    ├── hooks/
    │   └── useScrollReveal.js
    └── utils/
        └── asciiEngine.js  ← 5-stage ASCII field engine (mainboard, neural, cipher, oscillo, surface)
```

## Feature Status
- [x] Living ASCII background engine transformed across 5 scroll stages
- [x] Hero bottom-left typography with complete, unclipped italic 'g' descender
- [x] Removed top-left and top-right Hero HUD elements
- [x] Refined frosted glass navbar with "open to hard problems" removed
- [x] Removed "DRAWN IN ASCII..." from Footer colophon
- [x] Removed bottom-right HUD button pill
- [x] Custom favicon.jpeg applied
- [x] Frosted glass backdrop-blur applied to content cards
- [x] Sized `SAMSUNG.` and `IIT MADRAS.` text inside cards without overflow
- [x] Zero linter warnings/errors (oxlint)
- [x] Production build passes cleanly
