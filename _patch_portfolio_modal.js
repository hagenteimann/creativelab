/**
 * _patch_portfolio_modal.js
 * Portfolio Modal — Vanilla JS
 * Usage: call initPortfolioModal() after DOM is ready.
 * Requires: _patch_portfolio_modal.css loaded, data-project="1|2|3|4" on each .port-slot
 */

(function () {
  'use strict';

  const PROJECTS = {
    1: {
      number:      '01',
      brand:       'ESN Nutrition',
      platform:    'Instagram + TikTok',
      result:      '+180% Reach in 8 Wochen',
      description: 'Full-Service Content-Strategie für Deutschlands #1 Supplements-Brand.',
    },
    2: {
      number:      '02',
      brand:       'ABOUT YOU',
      platform:    'Instagram Reels',
      result:      '3,2M Impressions',
      description: 'Produktlaunch-Kampagne mit 12 Reels über 4 Wochen.',
    },
    3: {
      number:      '03',
      brand:       'Edited Fashion',
      platform:    'TikTok',
      result:      '+240% Follower-Wachstum',
      description: 'Trend-getriebener Content für ein junges Fashion-Label.',
    },
    4: {
      number:      '04',
      brand:       'Personal Brand — Founder',
      platform:    'LinkedIn + Instagram',
      result:      '0 → 15K Follower in 6 Monaten',
      description: 'Aufbau einer Personal Brand für einen Startup-Founder.',
    },
  };

  // ---------------------------------------------------------------------------
  // Build modal DOM once
  // ---------------------------------------------------------------------------
  function buildModal() {
    if (document.getElementById('pm-overlay')) return; // already exists

    const overlay = document.createElement('div');
    overlay.id        = 'pm-overlay';
    overlay.className = 'pm-overlay';
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Projekt-Details');
    overlay.setAttribute('hidden', '');

    overlay.innerHTML = `
      <div class="pm-container" id="pm-container">
        <button class="pm-close" id="pm-close" aria-label="Modal schließen">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
          </svg>
        </button>

        <span class="pm-number" id="pm-number"></span>
        <h2 class="pm-brand" id="pm-brand"></h2>

        <div class="pm-platform-badge" id="pm-platform"></div>

        <div class="pm-result" id="pm-result"></div>

        <p class="pm-description" id="pm-description"></p>
      </div>
    `;

    document.body.appendChild(overlay);

    // Close on overlay click (but not on container click)
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    document.getElementById('pm-close').addEventListener('click', closeModal);
  }

  // ---------------------------------------------------------------------------
  // Populate modal with project data
  // ---------------------------------------------------------------------------
  function populateModal(projectId) {
    const data = PROJECTS[projectId];
    if (!data) return;

    document.getElementById('pm-number').textContent      = data.number;
    document.getElementById('pm-brand').textContent       = data.brand;
    document.getElementById('pm-platform').textContent    = data.platform;
    document.getElementById('pm-result').textContent      = data.result;
    document.getElementById('pm-description').textContent = data.description;
  }

  // ---------------------------------------------------------------------------
  // Open / Close
  // ---------------------------------------------------------------------------
  function openModal(projectId) {
    populateModal(projectId);

    const overlay = document.getElementById('pm-overlay');
    overlay.removeAttribute('hidden');

    // Force reflow so transition plays from initial state
    overlay.getBoundingClientRect();
    overlay.classList.add('pm-overlay--visible');

    // Lock scroll
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    requestAnimationFrame(function () {
      const closeBtn = document.getElementById('pm-close');
      if (closeBtn) closeBtn.focus();
    });
  }

  function closeModal() {
    const overlay = document.getElementById('pm-overlay');
    if (!overlay) return;

    overlay.classList.remove('pm-overlay--visible');

    // Wait for CSS transition to finish, then hide
    overlay.addEventListener('transitionend', function handler(e) {
      // Only react to the container's opacity transition
      if (e.target !== overlay) return;
      overlay.setAttribute('hidden', '');
      overlay.removeEventListener('transitionend', handler);
    });

    // Restore scroll
    document.body.style.overflow = '';
  }

  // ---------------------------------------------------------------------------
  // Keyboard: Escape to close
  // ---------------------------------------------------------------------------
  function onKeyDown(e) {
    if (e.key === 'Escape') closeModal();
  }

  // ---------------------------------------------------------------------------
  // Attach click listeners to port-slots
  // ---------------------------------------------------------------------------
  function attachSlotListeners() {
    const slots = document.querySelectorAll('.port-slot[data-project]');

    slots.forEach(function (slot) {
      // Make slots keyboard-focusable if not already a button/link
      if (!slot.getAttribute('tabindex')) {
        slot.setAttribute('tabindex', '0');
        slot.setAttribute('role', 'button');
        slot.setAttribute('aria-haspopup', 'dialog');
      }

      slot.addEventListener('click', function () {
        const projectId = parseInt(slot.dataset.project, 10);
        if (PROJECTS[projectId]) openModal(projectId);
      });

      slot.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const projectId = parseInt(slot.dataset.project, 10);
          if (PROJECTS[projectId]) openModal(projectId);
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // Public init
  // ---------------------------------------------------------------------------
  function initPortfolioModal() {
    buildModal();
    attachSlotListeners();
    document.addEventListener('keydown', onKeyDown);
  }

  // Expose globally
  window.initPortfolioModal = initPortfolioModal;
})();
