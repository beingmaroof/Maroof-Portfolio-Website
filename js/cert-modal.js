/**
 * cert-modal.js — Premium Certificate Preview Lightbox
 * -------------------------------------------------------
 * Self-contained module. No dependencies on main.js / animations.js / contact.js.
 *
 * HOW TO ADD A NEW CERTIFICATE:
 *   1. Add a new object to the `certificates` array below.
 *   2. Add the corresponding `data-cert-id` attribute to the .cert-item in index.html.
 *   3. Drop the certificate image file in assets/certificates/.
 *   That's it — the modal is generated dynamically.
 *
 * IMAGE PLACEHOLDER PATHS:
 *   Images are stored in: assets/certificates/<filename>.jpg
 *   Replace each path once you add the actual certificate images.
 */

/* ============================================================
   CERTIFICATE DATA
   Add / edit certificates here only. No other file changes needed.
   ============================================================ */
const certificates = [
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering for Everyone',
    issuer: 'IBM SkillsBuild / Cognitive Class',
    year: '2026',
    image: 'assets/certificates/Prompt Engineering for Everyone.png',
    credential: 'AI0117EN',
    description: 'Industry-recognized certification covering prompt engineering fundamentals, AI interaction techniques, and practical applications of large language models.',
    verify: 'https://courses.cognitiveclass.ai/certificates/723dcfdec1994d3bac6465d1f4759e08'
  },
  {
    id: 'getting-started-ai',
    title: 'Getting Started with Artificial Intelligence',
    issuer: 'IBM SkillsBuild',
    year: '2026',
    image: 'assets/certificates/Getting Started with Artificial Intelligence.png',
    credential: '5106c587-6e2d-468c-82a5-325a62e03af4',
    description: 'Foundational certification covering core AI concepts, machine learning basics, and real-world applications of artificial intelligence across industries.',
    verify: 'https://www.credly.com/badges/5106c587-6e2d-468c-82a5-325a62e03af4'
  },
  {
    id: 'ibm-granite',
    title: 'Maximize Productivity With AI Tools',
    issuer: 'Coursera',
    year: '2025',
    image: 'assets/certificates/Summarizing Data Using IBM Granite.png',
    credential: '56K3L0SFDIG4',
    description: 'Hands-on certification demonstrating proficiency in using IBM Granite foundation models for data summarization, extraction, and text generation tasks.',
    verify: 'https://coursera.org/verify/56K3L0SFDIG4'
  },
  {
    id: 'it-career',
    title: 'IT & Career Readiness',
    issuer: 'Anudip Foundation × EY',
    year: '2025',
    image: 'assets/certificates/IT & Career Readiness.png',
    credential: 'DLRIM/AF04889132',
    description: 'Professional development certification by Anudip Foundation & EY covering IT fundamentals, workplace readiness, digital literacy, and career planning for the tech industry.',
    verify: null  // No public verification URL available for this certificate
  },
  {
    id: 'google-prompting',
    title: 'Google Prompting Essentials',
    issuer: 'Google / Coursera',
    year: '2026',
    image: 'assets/certificates/Google Prompting Essentials.png',
    credential: 'QNQPR3LS0LN5',
    description: 'Google-certified course covering effective prompting strategies, best practices for working with generative AI, and practical use of Google Gemini models.',
    verify: 'https://coursera.org/verify/QNQPR3LS0LN5'
  }
];

/* ============================================================
   MODULE STATE
   ============================================================ */
let _overlay = null;   // The backdrop overlay element
let _container = null;   // The modal container
let _closeBtn = null;   // The × button
let _img = null;   // The certificate <img>
let _imageWrap = null;   // The image panel wrapper
let _title = null;
let _issuerBadge = null;
let _meta = null;
let _desc = null;
let _verify = null;
let _isOpen = false;
let _closing = false;
let _prevFocus = null;   // Element focused before modal opened (for restoration)

/* ============================================================
   BUILD MODAL DOM (runs once on DOMContentLoaded)
   ============================================================ */
function buildModal() {
  // Avoid double-injection
  if (document.getElementById('cert-modal-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'cert-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Certificate Preview');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('tabindex', '-1');

  overlay.innerHTML = `
    <div id="cert-modal-container" role="document">

      <!-- Close button -->
      <button id="cert-modal-close" aria-label="Close certificate preview" type="button">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <line x1="1" y1="1" x2="13" y2="13"/>
          <line x1="13" y1="1" x2="1" y2="13"/>
        </svg>
      </button>

      <!-- Left: Certificate image -->
      <div id="cert-modal-image-wrap" aria-label="Certificate image">
        <img id="cert-modal-img"
          src=""
          alt=""
          class="cert-img-loading"
        />
      </div>

      <!-- Right: Certificate info -->
      <div id="cert-modal-info">
        <span id="cert-modal-issuer-badge"></span>
        <h2 id="cert-modal-title"></h2>

        <div id="cert-modal-meta">
          <!-- Populated dynamically -->
        </div>

        <hr class="cert-modal-divider" />

        <p id="cert-modal-desc"></p>

        <a id="cert-modal-verify"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Verify this credential on the issuer's website">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Verify Credential
        </a>
      </div>

    </div>
  `;

  document.body.appendChild(overlay);

  // Cache references
  _overlay = overlay;
  _container = document.getElementById('cert-modal-container');
  _closeBtn = document.getElementById('cert-modal-close');
  _img = document.getElementById('cert-modal-img');
  _imageWrap = document.getElementById('cert-modal-image-wrap');
  _title = document.getElementById('cert-modal-title');
  _issuerBadge = document.getElementById('cert-modal-issuer-badge');
  _meta = document.getElementById('cert-modal-meta');
  _desc = document.getElementById('cert-modal-desc');
  _verify = document.getElementById('cert-modal-verify');

  // Wire up close interactions
  _closeBtn.addEventListener('click', closeModal);

  // Click on backdrop (outside container) closes modal
  _overlay.addEventListener('click', function (e) {
    if (e.target === _overlay) closeModal();
  });

  // Keyboard: Escape closes, Tab stays trapped inside modal
  document.addEventListener('keydown', onKeyDown);
}

/* ============================================================
   POPULATE MODAL WITH CERTIFICATE DATA
   ============================================================ */
function populateModal(cert) {
  // Issuer badge
  _issuerBadge.textContent = cert.issuer;

  // Title
  _title.textContent = cert.title;
  _title.id = 'cert-modal-title'; // preserve for aria

  // Meta (year + credential)
  _meta.innerHTML = `
    <span class="cert-modal-meta-item">
      <span class="cert-modal-meta-label">Year</span>
      <span class="cert-modal-meta-value">${escHtml(cert.year)}</span>
    </span>
    ${cert.credential ? `
    <span class="cert-modal-meta-item">
      <span class="cert-modal-meta-label">ID</span>
      <span class="cert-modal-meta-value">${escHtml(cert.credential)}</span>
    </span>` : ''}
  `;

  // Description
  _desc.textContent = cert.description || '';

  // Verify button
  _verify.href = cert.verify || '#';
  _verify.style.display = cert.verify ? '' : 'none';

  // Lazy-load image: only set src now (when modal opens), not on page load
  _img.alt = `${cert.title} — issued by ${cert.issuer} (${cert.year})`;

  // Show shimmer skeleton while loading
  _img.classList.remove('cert-img-loaded');
  _img.classList.add('cert-img-loading');
  _imageWrap.classList.add('cert-img-skeleton');

  // Set src to trigger load
  if (_img.src !== cert.image && cert.image) {
    _img.onload = function () {
      _img.classList.remove('cert-img-loading');
      _img.classList.add('cert-img-loaded');
      _imageWrap.classList.remove('cert-img-skeleton');
    };
    _img.onerror = function () {
      // Image failed — show a fallback placeholder
      _imageWrap.classList.remove('cert-img-skeleton');
      _img.classList.remove('cert-img-loading');
      _img.classList.add('cert-img-loaded');
      _img.alt = `${cert.title} — certificate image not available`;
      _imageWrap.setAttribute('data-placeholder', 'Image coming soon');
    };
    _img.src = cert.image;
  } else if (!cert.image) {
    // No image provided
    _imageWrap.classList.remove('cert-img-skeleton');
    _img.classList.add('cert-img-loaded');
  }

  // Update overlay aria-labelledby
  _overlay.setAttribute('aria-labelledby', 'cert-modal-title');
}

/* ============================================================
   OPEN MODAL
   ============================================================ */
function openModal(certId) {
  const cert = certificates.find(c => c.id === certId);
  if (!cert) {
    console.warn('[cert-modal] No certificate found for id:', certId);
    return;
  }

  if (_isOpen) return;
  _isOpen = true;

  // Remember what was focused before opening
  _prevFocus = document.activeElement;

  // Populate content
  populateModal(cert);

  // Lock background scroll
  document.body.style.overflow = 'hidden';

  // Show overlay — use rAF to ensure CSS transition fires
  _overlay.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => {
    _overlay.classList.add('cert-modal-open');
    // Move focus to the close button for keyboard users
    requestAnimationFrame(() => {
      _closeBtn.focus();
    });
  });
}

/* ============================================================
   CLOSE MODAL
   ============================================================ */
function closeModal() {
  if (!_isOpen || _closing) return;
  _closing = true;

  // Trigger closing animation
  _overlay.classList.remove('cert-modal-open');
  _overlay.classList.add('cert-modal-closing');

  // Wait for animation to finish before hiding
  const CLOSE_DURATION = 260; // ms — matches CSS transition
  setTimeout(() => {
    _overlay.classList.remove('cert-modal-closing');
    _overlay.setAttribute('aria-hidden', 'true');

    // Restore background scroll
    document.body.style.overflow = '';

    // Restore focus to the card that opened the modal
    if (_prevFocus && typeof _prevFocus.focus === 'function') {
      _prevFocus.focus();
    }

    _isOpen = false;
    _closing = false;
    _prevFocus = null;

    // Reset image src so the next open lazy-loads fresh
    // (Keep src if same cert is re-opened for performance)
  }, CLOSE_DURATION);
}

/* ============================================================
   KEYBOARD HANDLER
   ============================================================ */
function onKeyDown(e) {
  if (!_isOpen) return;

  if (e.key === 'Escape') {
    e.preventDefault();
    closeModal();
    return;
  }

  // Tab trap: keep focus inside the modal
  if (e.key === 'Tab') {
    const focusable = _container.querySelectorAll(
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

/* ============================================================
   WIRE UP CERTIFICATE CARDS
   ============================================================ */
function wireCards() {
  const cards = document.querySelectorAll('.cert-item[data-cert-id]');

  cards.forEach(card => {
    const certId = card.dataset.certId;

    // Click
    card.addEventListener('click', () => openModal(certId));

    // Keyboard: Enter or Space activates the card
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(certId);
      }
    });
  });
}

/* ============================================================
   UTILS
   ============================================================ */
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ============================================================
   INIT — runs on DOMContentLoaded
   ============================================================ */
function init() {
  buildModal();
  wireCards();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM already parsed (script loaded with defer or at bottom of body)
  init();
}
