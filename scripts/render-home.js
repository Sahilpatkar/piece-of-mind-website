import {
  loadContent,
  setText,
  setItalicText,
  setMultilineItalicText,
  setPhoto,
} from './content-loader.js';

(async () => {
  const [home, testimonials, faqs] = await Promise.all([
    loadContent('/content/pages/home.json'),
    loadContent('/content/testimonials.json'),
    loadContent('/content/faqs.json'),
  ]);

  if (home) {
    if (home.hero) hydrateHero(home.hero);
    if (home.founder) hydrateFounder(home.founder);
  }
  if (testimonials && Array.isArray(testimonials.items)) {
    renderTestimonials(testimonials.items);
  }
  if (faqs && Array.isArray(faqs.items)) {
    renderFaqs(faqs.items);
  }
})();

function hydrateHero(h) {
  setText('[data-cms="hero.eyebrow"]', h.eyebrow);
  setText('[data-cms="hero.subhead"]', h.subhead);
  setText('[data-cms="hero.primary_cta_label"]', h.primary_cta_label);
  setText('[data-cms="hero.secondary_cta_label"]', h.secondary_cta_label);

  renderHeadline(
    document.querySelector('[data-cms="hero.headline_words"]'),
    h.headline_words,
  );
  renderBadges(
    document.querySelector('[data-cms="hero.badges"]'),
    h.badges,
  );
  setPhoto('[data-cms="hero.photo"]', h.photo, h.photo_alt);
  setMultilineItalicText('[data-cms="hero.mini_caption"]', h.mini_caption);
}

function hydrateFounder(f) {
  setText('[data-cms="founder.eyebrow"]', f.eyebrow);
  setItalicText('[data-cms="founder.heading_html"]', f.heading_html);
  setText('[data-cms="founder.quote"]', f.quote);
  setText('[data-cms="founder.bio"]', f.bio);
  setText('[data-cms="founder.cta_label"]', f.cta_label);
  setPhoto('[data-cms="founder.photo"]', f.photo, f.photo_alt);
}

function renderHeadline(el, words) {
  if (!el || !Array.isArray(words) || words.length === 0) return;
  clear(el);
  words.forEach(raw => {
    const isItalic = raw.startsWith('*') && raw.endsWith('*');
    const text = isItalic ? raw.slice(1, -1) : raw;
    const span = document.createElement('span');
    span.className = isItalic ? 'word italic' : 'word';
    span.textContent = text;
    el.appendChild(span);
    el.appendChild(document.createTextNode('\n'));
  });
}

function renderBadges(el, badges) {
  if (!el || !Array.isArray(badges) || badges.length === 0) return;
  clear(el);
  badges.forEach(label => {
    const wrap = document.createElement('span');
    wrap.className = 'inline-flex items-center gap-2';
    const dot = document.createElement('span');
    dot.className = 'w-1.5 h-1.5 rounded-full bg-[var(--forest)]';
    wrap.appendChild(dot);
    wrap.appendChild(document.createTextNode(label));
    el.appendChild(wrap);
  });
}

function renderTestimonials(items) {
  const track = document.querySelector('[data-cms="testimonials.track"]');
  if (!track) return;
  const valid = items.filter(t => t && t.quote);
  if (valid.length === 0) return;
  clear(track);
  // Render twice for seamless marquee loop. Second pass marked aria-hidden.
  for (let pass = 0; pass < 2; pass++) {
    valid.forEach((item, i) => {
      track.appendChild(buildTestimonialCard(item, i, pass === 1));
    });
  }
}

function buildTestimonialCard(item, index, isClone) {
  const article = document.createElement('article');
  article.className = index % 2 === 1 ? 'testi-card testi-card--dark' : 'testi-card';
  if (isClone) article.setAttribute('aria-hidden', 'true');

  const q = document.createElement('span');
  q.className = 'testi-q serif';
  if (!isClone) q.setAttribute('aria-hidden', 'true');
  q.textContent = '"';
  article.appendChild(q);

  const p = document.createElement('p');
  p.textContent = item.quote;
  article.appendChild(p);

  const author = document.createElement('div');
  author.className = 'testi-author';
  author.textContent = item.author ? `— ${item.author}` : '';
  article.appendChild(author);

  return article;
}

function renderFaqs(items) {
  const list = document.querySelector('[data-cms="faqs.list"]');
  if (!list) return;
  const valid = items.filter(it => it && it.question);
  if (valid.length === 0) return;
  clear(list);
  valid.forEach((item, i) => {
    list.appendChild(buildFaqItem(item, i === 0));
  });
}

function buildFaqItem(item, isOpen) {
  const details = document.createElement('details');
  details.className = 'faq-item';
  if (isOpen) details.setAttribute('open', '');

  const summary = document.createElement('summary');
  summary.className = 'faq-q';

  const qSpan = document.createElement('span');
  qSpan.textContent = item.question;
  summary.appendChild(qSpan);

  const chev = document.createElement('span');
  chev.className = 'faq-chev';
  chev.setAttribute('aria-hidden', 'true');
  chev.textContent = '+';
  summary.appendChild(chev);

  details.appendChild(summary);

  const answer = document.createElement('div');
  answer.className = 'faq-a';
  answer.textContent = item.answer || '';
  details.appendChild(answer);

  return details;
}

function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}
