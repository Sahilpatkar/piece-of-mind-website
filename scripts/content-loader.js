// Tiny client-side content loader for Piece of Mind.
// Pages ship with sensible default copy in HTML; this script swaps in CMS-edited
// values from /content/*.json on DOMContentLoaded.

export async function loadContent(path) {
  try {
    const res = await fetch(path, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`${path} -> HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[content-loader] falling back to HTML defaults:', err.message);
    return null;
  }
}

export function setText(selector, value) {
  if (value == null || value === '') return;
  document.querySelectorAll(selector).forEach(el => { el.textContent = value; });
}

// Replace element contents with mixed text and <em> nodes.
// Wrap a substring in *asterisks* in the source string to italicize it.
// All values are inserted via textContent / createElement — never innerHTML.
export function setItalicText(selector, str) {
  if (str == null || str === '') return;
  document.querySelectorAll(selector).forEach(el => {
    clear(el);
    appendItalicText(el, str);
  });
}

// Multi-line variant: pipe character separates lines, *asterisks* italicize.
// Example: "a space|to feel|*whole*" -> three lines, last italicized.
export function setMultilineItalicText(selector, str) {
  if (str == null || str === '') return;
  document.querySelectorAll(selector).forEach(el => {
    clear(el);
    String(str).split('|').forEach((line, i) => {
      if (i > 0) el.appendChild(document.createElement('br'));
      appendItalicText(el, line.trim());
    });
  });
}

// Treat an existing CSS-gradient placeholder as a "no photo yet" state and
// only swap it for a real image when the editor uploads one.
export function setPhoto(selector, url, altText) {
  if (!url || url.trim() === '') return;
  document.querySelectorAll(selector).forEach(el => {
    el.style.backgroundImage = `url("${url.replace(/"/g, '\\"')}")`;
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
    el.style.backgroundRepeat = 'no-repeat';
    if (altText) el.setAttribute('aria-label', altText);
  });
}

function appendItalicText(parent, str) {
  String(str).split(/(\*[^*]+\*)/g).forEach(part => {
    if (!part) return;
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      const em = document.createElement('em');
      em.textContent = part.slice(1, -1);
      parent.appendChild(em);
    } else {
      parent.appendChild(document.createTextNode(part));
    }
  });
}

function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}
