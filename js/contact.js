/* ============================================================
   contact.js — Contact Form with EmailJS
   Maroof Ahmed Portfolio
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Initialize EmailJS
  // NOTE: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
  if (typeof emailjs !== 'undefined') {
    emailjs.init('_bkKNLBuXxFqeVFVq');
  }

  const submitBtn = form.querySelector('#form-submit');
  const inputs    = form.querySelectorAll('.form-input');

  // Real-time validation
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        input.classList.remove('error');
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let valid = true;
    inputs.forEach(input => {
      if (!validateField(input)) valid = false;
    });

    if (!valid) return;

    // Set loading state
    setSubmitState(submitBtn, 'loading');

    try {
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS not loaded');
      }

      await emailjs.sendForm(
        'service_k9lh3h8',      // service ID
        'template_portfolio',    // template ID
        form
      );

      setSubmitState(submitBtn, 'success');
      form.reset();

      window.showToast?.('Message sent! I\'ll reply within 24 hours.', 'success');

      setTimeout(() => setSubmitState(submitBtn, 'idle'), 3000);

    } catch (err) {
      console.error('EmailJS error:', err);
      setSubmitState(submitBtn, 'idle');
      window.showToast?.('Something went wrong. Please email me directly at maroofahmed.dev@gmail.com', 'error');
    }
  });
}

function validateField(input) {
  const value = input.value.trim();
  let isValid = true;

  if (input.required && !value) {
    isValid = false;
  }

  if (input.type === 'email' && value) {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(value)) isValid = false;
  }

  input.classList.toggle('error', !isValid);
  return isValid;
}

function setSubmitState(btn, state) {
  if (!btn) return;

  const states = {
    idle: {
      html: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg> Send Message`,
      disabled: false,
    },
    loading: {
      html: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 0.8s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Sending…`,
      disabled: true,
    },
    success: {
      html: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Sent!`,
      disabled: true,
    },
  };

  const s = states[state] || states.idle;
  btn.innerHTML = s.html;
  btn.disabled  = s.disabled;
}
