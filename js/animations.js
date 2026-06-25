/* ============================================================
   animations.js — GSAP Hero Entrance + Scroll Parallax
   Maroof Ahmed Portfolio
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    // Instantly show all hero elements
    document.querySelectorAll('.hero-status, .hero-headline, .hero-meta, .hero-scroll')
      .forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
    return;
  }

  // ── Register ScrollTrigger if available ──
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ── Hero entrance sequence ──
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('.hero-status', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: 0.15,
  });

  tl.to('.hero-headline', {
    opacity: 1,
    y: 0,
    duration: 0.8,
  }, '-=0.3');

  tl.to('.hero-meta', {
    opacity: 1,
    y: 0,
    duration: 0.65,
  }, '-=0.45');

  tl.to('.hero-scroll', {
    opacity: 1,
    duration: 0.6,
  }, '-=0.2');

  // ── Subtle hero grid parallax ──
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.to('.hero-grid', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }
});
