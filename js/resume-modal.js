/**
 * resume-modal.js — Premium Inline Resume Viewer
 * -------------------------------------------------------
 * Modular modal system that dynamically loads and displays Maroof's resume PDF.
 * Seamless keyboard controls and focus management are integrated.
 */

(function () {
  'use strict';

  // State
  let overlay = null;
  let container = null;
  let closeBtn = null;
  let iframe = null;
  let isOpen = false;
  let closing = false;
  let prevFocus = null;

  const resumePdfPath = 'assets/resume/Maroof_Ahmed_Frontend_Developer_Resume.pdf';

  function init() {
    overlay = document.getElementById('resume-modal-overlay');
    container = document.getElementById('resume-modal-container');
    closeBtn = document.getElementById('resume-modal-close');
    iframe = document.getElementById('resume-iframe');

    if (!overlay || !container || !closeBtn || !iframe) {
      console.warn('[resume-modal] Elements missing from DOM.');
      return;
    }

    // Wire up events
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', onKeyDown);

    // Bind all buttons/links pointing to the resume modal
    const viewButtons = [
      document.getElementById('btn-view-resume'),
      document.getElementById('footer-resume-link')
    ];

    viewButtons.forEach(btn => {
      if (!btn) return;
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });
  }

  function openModal() {
    if (isOpen) return;
    isOpen = true;

    prevFocus = document.activeElement;

    // Lazy load the PDF src to keep initial page load fast
    if (!iframe.src || iframe.src.indexOf(resumePdfPath) === -1) {
      iframe.src = resumePdfPath;
    }

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';

    // Show with transitions
    overlay.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => {
      overlay.classList.add('resume-modal-open');
      requestAnimationFrame(() => {
        closeBtn.focus();
      });
    });
  }

  function closeModal() {
    if (!isOpen || closing) return;
    closing = true;

    overlay.classList.remove('resume-modal-open');
    overlay.classList.add('resume-modal-closing');

    const duration = 260; // ms — matches CSS transition
    setTimeout(() => {
      overlay.classList.remove('resume-modal-closing');
      overlay.setAttribute('aria-hidden', 'true');

      document.body.style.overflow = '';

      if (prevFocus && typeof prevFocus.focus === 'function') {
        prevFocus.focus();
      }

      isOpen = false;
      closing = false;
      prevFocus = null;
    }, duration);
  }

  function onKeyDown(e) {
    if (!isOpen) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }

    // Tab trap
    if (e.key === 'Tab') {
      const focusable = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const focusableArr = Array.from(focusable).filter(el => !el.disabled);
      if (focusableArr.length === 0) return;

      const first = focusableArr[0];
      const last = focusableArr[focusableArr.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
