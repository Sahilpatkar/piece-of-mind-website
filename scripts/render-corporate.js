import { loadContent } from './content-loader.js';

const COLOR_STYLES = {
  'sage':       'background: var(--sage);',
  'sage-soft':  'background: var(--sage); opacity: 0.6;',
  'sage-faint': 'background: var(--sage); opacity: 0.4;',
  'clay':       'background: var(--clay);',
  'clay-soft':  'background: var(--clay); opacity: 0.7;',
  'sand-clay':  'background: var(--sand); border-bottom: 2px solid var(--clay);',
};

(async () => {
  const data = await loadContent('/content/workshops.json');
  if (!data || !Array.isArray(data.items)) return;

  const grid = document.querySelector('[data-cms="workshops.grid"]');
  if (!grid) return;

  const valid = data.items.filter(w => w && w.title);
  if (valid.length === 0) return;

  while (grid.firstChild) grid.removeChild(grid.firstChild);

  valid.forEach(item => {
    grid.appendChild(buildWorkshopCard(item));
  });
})();

function buildWorkshopCard(item) {
  const card = document.createElement('div');
  card.className = item.featured
    ? 'workshop-card workshop-card--featured lg:col-span-2'
    : 'workshop-card';

  const bar = document.createElement('div');
  bar.className = 'workshop-color-bar';
  bar.setAttribute('style', COLOR_STYLES[item.color] || COLOR_STYLES.sage);
  card.appendChild(bar);

  const body = document.createElement('div');
  body.className = 'workshop-body';

  const h3 = document.createElement('h3');
  h3.textContent = item.title;
  body.appendChild(h3);

  const p = document.createElement('p');
  p.textContent = item.description || '';
  body.appendChild(p);

  card.appendChild(body);
  return card;
}
