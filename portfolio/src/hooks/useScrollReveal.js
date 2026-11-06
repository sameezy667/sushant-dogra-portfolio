/**
 * @file useScrollReveal.js
 * @description IntersectionObserver-based scroll reveal hook with fail-safe viewport detection
 * @module hooks
 */
import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    // Fail-safe: if IntersectionObserver is unsupported, reveal all immediately
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('.rv').forEach(el => el.classList.add('in'));
      return;
    }

    const revealElement = (el) => {
      if (!el.classList.contains('in')) {
        el.classList.add('in');
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            revealElement(e.target);
            io.unobserve(e.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 80px 0px', // Positive bottom margin: triggers slightly before entering
      }
    );

    function scan() {
      const vh = window.innerHeight || 800;
      const elements = document.querySelectorAll('.rv:not(.in)');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // If already visible in the viewport, reveal immediately
        if (rect.top <= vh * 0.95 && rect.bottom >= 0) {
          revealElement(el);
        } else {
          io.observe(el);
        }
      });
    }

    // Run initial scan
    scan();

    // Secondary fallback: check on scroll so elements never get stuck invisible
    const onScrollFallback = () => {
      const vh = window.innerHeight || 800;
      const pending = document.querySelectorAll('.rv:not(.in)');
      pending.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh * 0.95 && rect.bottom >= 0) {
          revealElement(el);
          io.unobserve(el);
        }
      });
    };

    window.addEventListener('scroll', onScrollFallback, { passive: true });

    // MutationObserver to catch dynamically added content
    const root = document.getElementById('root');
    let mo = null;
    if (root && typeof MutationObserver !== 'undefined') {
      mo = new MutationObserver(scan);
      mo.observe(root, { childList: true, subtree: true });
    }

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScrollFallback);
      if (mo) mo.disconnect();
    };
  }, []);
}
