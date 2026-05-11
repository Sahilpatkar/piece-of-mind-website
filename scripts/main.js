(() => {
  'use strict';

  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileNav');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
      const open = !menu.classList.contains('hidden');
      menu.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  function initStickyScroll() {
    const topbar = document.getElementById('topbar');
    if (!topbar) return;
    const onScroll = () => topbar.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initFooterYear() {
    const el = document.getElementById('footYear');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initStickyScroll();
    initFooterYear();
  });
})();
