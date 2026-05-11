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
scripts/main.js    FAQ accordion, mobile nav, motion gates
assets/images/     Photographs (replace placeholders before launch)
assets/icons/      Social icons (SVG)
```

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
