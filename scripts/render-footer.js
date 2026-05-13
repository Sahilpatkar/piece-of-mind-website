import { loadContent, setText } from './content-loader.js';

(async () => {
  const data = await loadContent('/content/site.json');
  if (!data) return;

  setText('[data-cms="site.tagline"]', data.tagline);
  setText('[data-cms="site.address"]', data.address);
  setText('[data-cms="site.phone"]', data.phone);

  // Email — update both the visible text and the mailto: link target.
  document.querySelectorAll('[data-cms="site.email"]').forEach(el => {
    if (!data.email) return;
    el.textContent = data.email;
    if (el.tagName === 'A') el.setAttribute('href', `mailto:${data.email}`);
  });

  const socials = ['linkedin', 'instagram', 'facebook'];
  socials.forEach(key => {
    const url = data.social && data.social[key];
    document.querySelectorAll(`[data-cms="site.social.${key}"]`).forEach(el => {
      if (url && url.trim() !== '') {
        el.setAttribute('href', url);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
        el.removeAttribute('hidden');
        el.style.display = '';
      } else {
        el.setAttribute('hidden', '');
        el.style.display = 'none';
      }
    });
  });
})();
