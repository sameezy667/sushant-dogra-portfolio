/**
 * @file AsciiBackground.jsx
 * @description Persistent ambient ASCII field canvas.
 *   Observes sections with `data-mode` and smoothly transforms the ASCII background
 *   between MAINBOARD, NEURAL LATTICE, CIPHER FIELD, OSCILLOSCOPE, and SURFACE as user scrolls.
 * @module components
 */
import { useEffect, useRef } from 'react';
import { initAsciiField } from '../utils/asciiEngine';

export default function AsciiBackground() {
  const canvasRef = useRef(null);
  const hostRef = useRef(null);
  const engineRef = useRef(null);
  const resizeTimerRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    const engine = initAsciiField(canvasRef.current);
    if (!engine) return;
    engineRef.current = engine;

    // Scroll mode switching via IntersectionObserver
    const secIO = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.dataset.mode) {
            engine.setMode(entry.target.dataset.mode);
          }
        });
      },
      { rootMargin: '-38% 0px -38% 0px' }
    );

    const modeSections = document.querySelectorAll('[data-mode]');
    modeSections.forEach(el => secIO.observe(el));

    // Resize handling with debounce
    const onResize = () => {
      clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = window.setTimeout(() => {
        if (engineRef.current) engineRef.current.resize();
      }, 160);
    };
    window.addEventListener('resize', onResize);

    return () => {
      secIO.disconnect();
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimerRef.current);
      if (engineRef.current) engineRef.current.destroy();
    };
  }, []);

  return (
    <div
      id="ascii-host"
      ref={hostRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <canvas id="field" ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
