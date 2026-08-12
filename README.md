# Marque Studio

Marketing site for **Marque Studio** — a design studio building beautiful, bespoke websites
for creatives, personal brands, and events.

**Brand core:** Taste · Technology · Convenience.

## Stack
Static site — `index.html`, `styles.css`, `script.js`. No build step. Deployed on GitHub Pages.

## Edit cheatsheet
- **Contact email** — search `odicheobiakarije@gmail.com` in `index.html` and swap for your business
  address once the domain is set up (also update the `hello@marquestudio` display text).
- **Prices** — in `index.html`, the `.plan__price` and `.intel__price` blocks.
- **Work** — the `.case` blocks in the Work section; each links to a live project.
- **Domain** — add a `CNAME` file with your custom domain, then point DNS at GitHub Pages.

## Local preview
Open `index.html` in a browser, or run:

```bash
python3 -m http.server 8080
```
