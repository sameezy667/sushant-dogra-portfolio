/**
 * @file useLenis.js
 * @description Smooth scroll hook using Lenis
 * @module hooks
 */
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  const rafIdRef = useRef(0);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;

    function raf(t) {
      lenis.raf(t);
      rafIdRef.current = requestAnimationFrame(raf);
    }
    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}

