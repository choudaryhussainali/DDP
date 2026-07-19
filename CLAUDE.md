# CLAUDE.md — Working Instructions for the DDP Website

Project-specific guidance for all future work on this repo. Pair with
`PROJECT_CONTEXT.md` (full architecture reference). Vanilla **HTML + CSS + JS**
only — **no** framework, build step, bundler, package manager, or backend.
Do not introduce any of those.

## Preview / run locally
No build. Serve over HTTP from the repo root (not `file://`):
- `python -m http.server 8000`  → http://localhost:8000  (Python 3.14 available)
- or `npx serve` / `npx http-server -p 8000`  (Node v24 available)
Open `/index.html`, `/insights.html`, `/trainings.html`.

## Testing / validation (no test suite exists)
There are no automated tests, linters, or CI checks beyond the Pages deploy.
Validate manually:
- Load each **affected** page in a served browser; check the **console is clean**.
- Check desktop **and** mobile widths (see breakpoints below).
- Test keyboard (Tab/Enter/Escape) for any interactive change.
- For links: click every affected anchor/CTA.
- For the form: it POSTs to Formspree `https://formspree.io/f/mvzeaded` (live);
  only claim a submission works if you see a network 200 / the success state.

## Page → files map (scripts/CSS are NOT shared)
| Page | CSS | JS |
|---|---|---|
| `index.html` | `css/style.css` (+`css/insights.css`) | Chart.js CDN, `js/main.js`, **inline `<script>` ~L2099–2230** (chart + KPI counters) |
| `insights.html` | `css/insights.css` | `js/data.js` → `js/insights.js` |
| `trainings.html` | `css/trainings.css` | `js/trainings.js` |

`Components/Just-UI.html` is an **orphaned** scratch file — not linked anywhere.
Don't rely on it; don't wire new features through it.

## HTML conventions
- Semantic sectioning tags where present (`nav/section/header/footer/main/aside`).
- Flat, descriptive class names (`.hero-card`, `.elite-service-block`, `.es-*`,
  `.vault-*`, `.dash-*`). Match the neighborhood's naming.
- The project already uses inline `style="…"` and a few inline `onclick`
  handlers. Prefer classes + JS listeners for **new** code, but inline is
  acceptable when it matches immediate surrounding markup.
- Keep `<img>` `alt` text meaningful. Keep `<label for>` on every form field.

## CSS conventions & naming
- **Design tokens live in `:root`** — use them: `--bg #080808`, `--surface
  #161616`, `--gold #c9a84c`, `--gold2 #e8c96d`, `--off #f0ece4`, `--muted*`,
  `--border`/`--border2`. Prefer tokens over new hardcoded hex.
- House easing: `cubic-bezier(0.19, 1, 0.22, 1)`. Reuse it.
- Fonts: Playfair Display = headings, DM Sans = body, Syne = UI chrome/labels.
  **Do not reference Cormorant Garamond / Poppins / Manrope** without also adding
  the Google Fonts import (they're currently unloaded → fallback).
- Reuse existing components: `.btn-gold`, `.btn-outline`, `.btn-elite`,
  `.label`, `.section`/`.section-inner`, `.reveal`, card hover pattern.
- **CRITICAL — shared components are duplicated in all 3 CSS files.** Editing nav,
  cursor, `.btn-gold`, `.label`, `.reveal`, footer, or scrollbar means editing
  `style.css`, `insights.css`, AND `trainings.css` to keep pages consistent.
- **Two gotchas when copying between pages:**
  - `.reveal` activation class is **`.in-view`** in `style.css` but **`.active`**
    in `insights.css`/`trainings.css`. Match the file you're in.
  - Primary desktop→mobile breakpoint is **1024px** in `style.css` but **1279px**
    in `insights.css`/`trainings.css`.
- `style.css` (6018 lines) has **duplicate selectors and keyframes** (`.section`,
  `.insight-card`, `pulse`, `pulse-text`). **Grep before adding** — a later
  duplicate silently overrides an earlier one.
- No `:focus-visible` outlines exist. When adding interactive elements, **add a
  visible focus style** (don't reduce accessibility).

## JavaScript conventions
- Vanilla JS, no libs except Chart.js (already loaded, index only). Don't add
  dependencies when vanilla suffices.
- **Always null-guard** DOM lookups (`if (!el) return`) — `main.js` and
  `trainings.js` do this; `insights.js` has unguarded spots to avoid repeating.
- Scripts load at end of `<body>`; keep new scripts there.
- Chart/KPI-counter logic is **inline in `index.html`**, not in `main.js` — edit
  it there.
- Insights articles: content is in `js/data.js` (`articleDatabase`, keyed
  `article-hero`/`article-1..9`, fields `{tag,title,content}` where `content` is
  raw HTML). `data.js` **must load before `insights.js`**. The card grid in
  `insights.html` is static HTML — if you add an article, update **both** the
  static card and `articleDatabase`.
- Global hooks that HTML depends on: `window.dashSetTab(...)`,
  `forceOpenModal(...)`. Don't rename without updating inline `onclick`s.
- Modals use an `.active` class + body scroll lock + Escape/backdrop close —
  follow that pattern for new modals.

## Mobile menu drawer (shared — do not fork it)
- Every page uses ONE canonical mobile drawer. **Source of truth = the Insights
  page** (`css/insights.css` drawer rules + `js/insights.js` drawer engine).
- `index.html` and `trainings.html` get it from the shared files
  **`css/nav-drawer.css`** (linked LAST in `<head>`, after the page's own CSS) and
  **`js/nav-drawer.js`** (script tag near `</body>`). `insights.html` uses its own
  inline copy — leave insights' drawer code alone.
- Activation breakpoint is **1024px**. Markup on every page:
  `<button class="nav-toggle">` (3 `<span>`s) + `<ul class="nav-links">` whose
  last item is `<li class="nav-mobile-cta-item"><a class="nav-mobile-cta"><span>…`.
- To change the drawer's DESIGN: edit `css/nav-drawer.css` (affects index +
  trainings) AND mirror the exact change into `css/insights.css` so insights stays
  identical — or migrate insights onto the shared files. Never introduce a
  page-specific drawer variant, a second overlay, or a second toggle handler.
- To change a page's drawer LINKS: edit that page's `<ul class="nav-links">` only
  (keep the markup structure). Don't copy Insights' relative hrefs blindly —
  index uses on-page `#anchors`; trainings/insights use `index.html#…`.
- The old per-page drawers (main.js block, trainings.js block, and the drawer CSS
  in style.css/trainings.css) were removed. Do not reintroduce them.

## File organization rules
- `css/` for styles, `js/` for scripts, `images/`/`Logos/`/`certifications/` for
  assets. Keep new assets in the matching folder.
- Don't casually rename or move files — GitHub Pages deploys the whole repo root
  and internal links are relative.
- Avoid filenames with spaces/parentheses for new assets (the existing
  `clients/` files have them; don't add more).

## Responsive requirements
- Breakpoints in use: 1279, 1100, 1080, 1024, 900, 768, 640, 600, 480, 390, 360.
  Use the correct **primary** break for the file (1024 home / 1279 insights &
  trainings).
- Every layout change must be checked at mobile — no horizontal overflow. Watch
  fixed-width elements (`.dash-main-grid`, `.trust-card`, `.integration-card`).
- Custom cursor/particles are disabled on touch (`hover:none`/`pointer:coarse`) —
  don't make interactions depend on hover only.

## Accessibility requirements
- Preserve `lang`, `alt`, `<label for>`, and the nav-toggle `aria-*` sync.
- New interactive elements must be keyboard-operable and have a **visible focus
  state**. Prefer `<button>`/`<a>` over `<div onclick>`.
- Respect `prefers-reduced-motion` (already honored — don't add motion that
  ignores it).
- Don't reduce existing accessibility with any change.

## Browser compatibility
Modern evergreen browsers (Chrome/Edge/Firefox/Safari). Uses IntersectionObserver,
`fetch`, CSS custom properties, `clamp()`, fl/grid — all fine on evergreen. No IE
support expected.

## Asset handling
- Reuse existing local images where possible. Add new content images **locally**
  rather than hotlinking (existing Unsplash hotlinks are a known reliability
  risk).
- Don't delete an asset until you've grepped all HTML/CSS/JS and confirmed it's
  unused. Known-unused today: `images/hero.png`, `images/hero2.png`,
  `images/DDP-Final-Logo.jpg.jpeg`, entire `clients/` folder.

## Files to NOT change casually
- `css/style.css` — huge, duplicated rules; edit surgically after grepping.
- `index.html` inline `<script>`/`<style>` blocks — chart, counters, app mockup.
- `.github/workflows/static.yml` — deploy config.
- `Components/Just-UI.html` — orphaned; ignore unless explicitly asked.
- The shared `#ddpStrategyForm` markup (exists on 2 pages — change both together).

## Known-broken / placeholders (don't report as "working")
- Contact & enrollment forms POST to the **live** Formspree endpoint
  `https://formspree.io/f/mvzeaded` (index, insights, trainings). Formspree may
  require confirming the first submission in the account dashboard.
- insights.html nav `#apply` opens the in-page contact modal (JS-hijacked; no
  on-page `#apply` section).
- Email `daniidigitalpro@gmail.com` uses double-i (brand/domain are single-i) —
  confirm before "fixing".

## Required checks before finishing any task
1. `git status` / review the full diff for accidental changes.
2. Grep every class/id/asset you touched across all HTML/CSS/JS.
3. If a shared component: updated in all 3 CSS files.
4. Served the affected page(s); **console is clean**.
5. Checked desktop + mobile layout, hover/focus/active states, no overflow.
6. Tested affected links, interactions, and (if relevant) keyboard + Escape.
7. Separated any pre-existing issues from ones your change introduced.
8. Updated `PROJECT_CONTEXT.md` / this file if architecture or behavior changed.
