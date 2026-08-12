# Marque Studio

Marketing + client-intake site for **Marque Studio** — a design studio building beautiful,
bespoke websites for creatives, personal brands, and events.

**Brand core:** Taste · Technology · Convenience.

## Pages
- `index.html` — marketing site: hero, scrollable in-page work previews, services & pricing,
  Marque Intelligence (AI offer), process, and a contact form.
- `start.html` — project intake form with a **live budget estimator** (`noindex`).
- `contract-template.md` — reusable client agreement (fill the bracketed fields per project).

## Stack
Static — `index.html`, `start.html`, `styles.css`, `script.js` (shared), `intake.js`
(estimator). No build step, no backend. Deployed on GitHub Pages.

## How enquiries reach you
Both the contact form and the intake brief open the visitor's email app addressed to the
studio (mailto), pre-filled with their details. The intake page also offers a "Copy brief"
button. **No payments are taken on the site** — those are arranged one-on-one.

> Want seamless inbox delivery (no email app popup)? Sign up for a free Formspree/Web3Forms
> endpoint and swap the `mailto` submit in `script.js` / `intake.js` for a `fetch()` POST.

## Edit cheatsheet
- **Contact email** — search `odicheobiakarije@gmail.com` in `script.js` and `intake.js`
  (constant `STUDIO_EMAIL`) and swap for your business address once the domain is live. Also
  update the `hello@marquestudio` display text in `index.html`.
- **Prices** — service anchors are in `index.html`; the estimator's numbers live in
  `start.html` as `data-price` / `data-monthly` / `data-rush` attributes on each option.
- **Work previews** — the `.case` blocks in `index.html`; each `data-embed` holds the URL that
  loads as a scrollable preview. The wedding sample is intentionally kept **private** (no embed,
  no link).
- **Domain** — add a `CNAME` file with your custom domain, then point DNS at GitHub Pages.

## Local preview
```bash
python3 -m http.server 8080
```
