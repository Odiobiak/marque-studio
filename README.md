# Marque Studio

Multi-page marketing and intake site for **Marque Studio**, a small design studio making
beautiful, bespoke websites for portfolios, personal brands, weddings, and events.

**Brand core:** Taste, Craft, Care. **Look:** Quiet Luxe (Schibsted Grotesk + Newsreader,
bone / ink / oxblood).

## Pages
- `index.html` — home: hero, featured work, services overview, how we work, Marque Intelligence, contact CTA.
- `work.html` — scene gallery with live scrollable previews (wedding link kept private).
- `services.html` — pricing by category (Personal/Portfolio, Weddings, Events), Marque Intelligence, care plans, FAQ.
- `about.html` — short studio story and values.
- `contact.html` — full contact form.
- `start.html` — project brief with a live budget estimator (`noindex`).
- `contract-template.md` — reusable client agreement.

## Stack
Static, no build step, no backend. Shared `styles.css` + `script.js`; `intake.js` powers the
estimator. Deployed on GitHub Pages.

## How enquiries reach you
The contact form and the intake brief open the visitor's email app addressed to the studio,
pre-filled. The intake page also has a "Copy brief" button. **No payments on the site**, all
arranged one-on-one. To get inbox delivery with no email-app popup, add a free Formspree or
Web3Forms endpoint and swap the `mailto` submit in `script.js` / `intake.js`.

## Edit cheatsheet
- **Contact email** — `odicheobiakarije@gmail.com` in `script.js` and `intake.js`
  (`STUDIO_EMAIL`). Also the `hello@marquestudio` display text across the pages.
- **Prices** — service tiers live in `services.html`; the estimator numbers are
  `data-price` / `data-monthly` / `data-rush` attributes in `start.html`.
- **Work previews** — `.case__stage[data-embed]` in `work.html`; the wedding sample is kept
  private (no link) and a brand mark masks the third-party preview badge.
- **Theme** — fonts in each page `<head>`; colours are CSS variables at the top of `styles.css`.
- **Logo** — `logo-mark.png` is the M. monogram used in every nav and footer; `logo-full.png`
  is the stacked lockup used on the About page. `favicon.png` / `apple-touch-icon.png` are the
  monogram reversed out of an ink square. On dark backgrounds the mark is flipped with
  `filter:invert(1)`, so replacing these files is all that is needed to update the brand.
- **Domain** — add a `CNAME` file with your custom domain, then point DNS at GitHub Pages.

## Local preview
```bash
python3 -m http.server 8080
```
