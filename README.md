# Piece of Mind — Website

Compassionate mental health support for individuals, groups, and organizations.

## Local development

This is a static site — no build step required.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or use any static file server (`npx serve`, VS Code Live Server, etc.).

## Project structure

```
index.html         Homepage
book.html          Booking page (currently a stub)
styles/styles.css  Brand variables, animations, custom layouts
scripts/main.js    FAQ accordion, mobile nav, dynamic year
assets/images/     Photographs (replace placeholders before launch)
assets/icons/      Social icons (SVG)
```

## Swapping in real photography

Each placeholder photo lives as a CSS gradient on a named class in `styles/styles.css`. To replace:

| Section | Class | What to change |
|---|---|---|
| Hero | `.hero-photo` | Set `background-image: url('assets/images/hero.jpg')` |
| Service card 1 (Individual) | `.offer-photo-1` | `background-image: url('assets/images/individual.jpg')` |
| Service card 2 (Corporate) | `.offer-photo-2` | `background-image: url('assets/images/corporate.jpg')` |
| Service card 3 (Workshops) | `.offer-photo-3` | `background-image: url('assets/images/workshops.jpg')` |
| Founder | `.founder-photo` | `background-image: url('assets/images/anshita.jpg')` |
| Mosaic tile 1–5 | `.mosaic-tile-1` … `-5` | `background-image: url('assets/images/moment-N.jpg')` |

Recommended image dimensions: hero 1200×1500, service cards 800×600, founder 800×1000, mosaic tiles 1000×800.

## Open items before launch

- Real photography (replace gradient placeholders — see table above)
- Real stat numbers in `index.html` (sessions / years / workshops / queer-affirmative)
- Calendly URL for `book.html` (currently a stub)
- Phone number in footer
- Favicon + Open Graph image in `assets/`

## Brand colors (defined in `styles/styles.css`)

| Name | Hex |
|---|---|
| Forest Green | `#2C3E3E` |
| Sage Green | `#B7C9B3` |
| Sand Beige | `#F2E9DC` |
| Clay Rose | `#DDBEBE` |
| Off White | `#FBFAF7` |

## Deploy

- **Netlify** — drag this folder into [app.netlify.com/drop](https://app.netlify.com/drop)
- **Vercel** — `npx vercel` in this folder
- **GitHub Pages** — push to a `gh-pages` branch and enable Pages in repo settings
