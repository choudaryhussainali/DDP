# PROJECT_CONTEXT.md — Dani Digital Pro (DDP) Website

> Permanent knowledge base for this repository. Update this file whenever pages,
> navigation, styles, scripts, forms, assets, interactions, dependencies, or
> deployment change. Keep it factual. Last full audit: 2026-07-16.

---

## 1. Website Overview

Static marketing / lead-generation website for **Dani Digital Pro (DDP)** — the
personal brand of **Daniyal**, a paid-advertising & growth consultant ("Revenue
Growth Architect") based in Lahore, Pakistan, operating globally.

- **Stack:** Vanilla HTML + CSS + JavaScript. **No** framework, build system,
  bundler, package manager, backend, or database. Files are served as-is.
- **Runtime dependencies (CDN):** Google Fonts, Chart.js (jsDelivr). Contact
  forms POST to Formspree. Some content images are hotlinked from Unsplash.
- **Pages:** 3 live pages (`index.html`, `insights.html`, `trainings.html`) plus
  one orphaned scratch/design file (`Components/Just-UI.html`).

## 2. Purpose & Target Audience

- **Purpose:** Convert ambitious brand owners / e-commerce operators into
  "Strategy Call" bookings and course ("Academy") enrollments.
- **Audience:** Growth-focused business owners and marketers seeking PPC, Meta/
  paid-social, e-commerce scaling, and social-media management services, plus
  aspiring marketers who want training.
- **Primary conversions:** (a) the contact/strategy-call modal form, (b) Calendly
  booking, (c) mailto/tel contact, (d) training enrollment (funnels to the same
  contact modal on the homepage).

## 3. Project Structure

```
i:/Clients/DDP/Web/
├── index.html              # Homepage (~2358 lines) — the main funnel
├── insights.html           # "The Archive" — blog/insights listing (~275 lines)
├── trainings.html          # "The Academy" — course/training page (~691 lines)
├── Components/
│   └── Just-UI.html         # ORPHANED design-system scaffold (not linked anywhere)
├── css/
│   ├── style.css            # Homepage styles (~6018 lines)
│   ├── insights.css         # Insights page styles, self-contained (~2268 lines)
│   └── trainings.css        # Trainings page styles, self-contained (~2626 lines)
├── js/
│   ├── main.js              # Homepage behavior — index.html only
│   ├── data.js              # articleDatabase content object (~239 lines) — insights only
│   ├── insights.js          # Insights page behavior (~346 lines) — incl. canonical drawer engine
│   ├── trainings.js         # Trainings page behavior
│   └── nav-drawer.js        # SHARED mobile menu drawer engine — index.html + trainings.html
├── css/nav-drawer.css        # SHARED mobile menu drawer styles — index.html + trainings.html
├── images/                  # Logo, hero, about, case-study result screenshots
├── Logos/                   # 10 client/brand logos (trust marquee)
├── certifications/          # 4 certification images (cert lightbox)
├── clients/                 # 10 files — ALL CURRENTLY UNUSED
└── .github/workflows/static.yml   # GitHub Pages deploy
```

**Note:** Chart.js chart logic and the homepage KPI counters live in an **inline
`<script>` at the bottom of `index.html`** (~lines 2099–2230), NOT in `main.js`.

## 4. Complete Page Map

| Page | Title | Role | CSS loaded | JS loaded (in order) |
|---|---|---|---|---|
| `index.html` | Dani Digital Pro — Revenue Growth Architect | Homepage funnel | `css/style.css`, `css/insights.css` | Chart.js CDN ×3, `js/main.js`, inline chart/counter script |
| `insights.html` | Insights & Intelligence \| Dani Digital Pro | Blog listing + article drawer | `css/insights.css` | `js/data.js` → `js/insights.js` |
| `trainings.html` | The Academy \| Dani Digital Pro | Course marketing | `css/trainings.css` | `js/trainings.js` |
| `Components/Just-UI.html` | (design scaffold) | **Orphaned** — self-contained, linked from nowhere | inline `<style>` | inline `<script>` |

Scripts and CSS are **not shared across pages** — each page loads its own
isolated files. This limits cross-page breakage but means shared-looking
components (nav, buttons, cursor, `.reveal`) are **duplicated in all three CSS
files and must be edited in each** to stay consistent.

**Exception — the mobile menu drawer is now shared.** `css/nav-drawer.css` +
`js/nav-drawer.js` are the canonical mobile-drawer implementation (see §5a),
loaded by `index.html` and `trainings.html`. `insights.html` keeps its own
inline copy (the original source of truth). Do not add a page-specific mobile
drawer — see §5a and CLAUDE.md.

### index.html sections (document order)
Preloader (`#premium-preloader`) → custom cursor (`#cursorDot`/`#cursorRing`) →
particles (`#particles`) → nav (`#navbar`) → hero (`#hero`) → keyword marquee
(`#marquee`) → metrics band (`.metrics-band`) → app/dashboard mockup
(`#platform-preview`, has inline `<style>` + Chart.js `#ddpMainChart`) →
framework (`#framework`, "DDP Growth Engine™") → services (`#services`, 4
`.elite-service-block` with `data-service` modal triggers) → integrations
(`#integrations`, SVG logo marquees) → live-operations (`#live-operations`, fake
live campaign feed + KPI cards) → results (`#results`, case studies) → trust
(`#trust`, client-logo marquee) → about (`#about`) → testimonials
(`#testimonials`) → offer (`#offer`) → certifications (`#certifications`, cert
lightbox) → insights (`#insights`, 3 cards → `insights.html`) → trainings
(`#trainings`, 4 rows → `trainings.html#…`) → CTA (`#apply`) → footer → modals
(`#image-modal`, `#serviceModal`, `#contactModal`).

### insights.html sections
Nav → header ("The Archive" / "Intelligence.") → featured card
(`[data-article="article-hero"]`) → `.insights-grid` (9 `a.insight-card` with
`data-article="article-1..9"`) → article drawer (`#articleDrawer` /
`#drawerOverlay`) → footer → contact modal (`#contactModal`). Article grid is
**static HTML**; full article bodies are injected on click from `articleDatabase`
in `js/data.js`.

### trainings.html sections
Nav → academy hero → 4 course "vaults" (`#ecommerce`, `#ai-marketing`,
`#social-media`, `#ppc-sem`; each = header + 6-module curriculum + target
checklist + `a.btn-gold` → `index.html#apply`) → pathway (`#pathway`) → outcomes
bento (`#outcomes`) → alignment (`#alignment`, for/not-for) → FAQ (`#faqs`,
6-item accordion) → final CTA → footer. **No form, no pricing cards** — all CTAs
link to `index.html#apply`.

## 5. Navigation Structure

Each page has a fixed top nav (`#navbar`) that gains `.scrolled` on scroll and
collapses to a hamburger (`.nav-toggle`) on mobile. **Nav item sets differ per
page — currently NOT unified:**

- **index.html:** Services · System(`#framework`) · Results · About · Insights(`#insights` on-page anchor) · Book Strategy Call(`#apply`)
- **insights.html:** Services · System · Results · About · Insights(`insights.html`) · Book Strategy Call — links back via `index.html#…`
- **trainings.html:** Services · System · **Academy**(`trainings.html`) · Results · Insights — links back via `index.html#…`

Known nav issues: index "Insights" is an on-page anchor while other pages point
to `insights.html`; insights.html has no Academy link; trainings.html has no
About link; insights.html `#apply` nav CTAs are bare `#apply` (no such target on
that page — only works because JS hijacks the click to open the contact modal).

### 5a. Mobile Menu Drawer (shared, canonical)

All pages use **one** mobile menu drawer design — a full-height right-edge panel
that slides in over a blurred backdrop, with the "Book Strategy Call" CTA docked
at the bottom of the link list. It is the **Insights page drawer**, treated as
the single source of truth.

- **Canonical source:** `css/insights.css` (drawer rules, ~lines 834–2268) +
  `js/insights.js` (drawer engine, ~lines 280–347). `insights.html` renders from
  these and is **never modified** without a matching update to the shared files.
- **Shared distributables (verbatim mirror of the canonical drawer):**
  - `css/nav-drawer.css` — all drawer styling, loaded **last** in `<head>` on
    `index.html` and `trainings.html` (must come after the page's own
    stylesheet). Uses `!important` so it is authoritative.
  - `js/nav-drawer.js` — the drawer engine (fixed-position scroll-lock, class
    toggle on `<body class="nav-open">`, close on link click / Escape /
    resize > 1024). Loaded on `index.html` and `trainings.html`.
- **Activation breakpoint:** `1024px` (`@media (max-width: 1024px)`). Below it the
  desktop `.nav-links` is replaced by the drawer and the `.nav-toggle` hamburger
  appears; at ≥1025px the desktop nav is unchanged.
- **Required markup (identical on every page; only the link hrefs/labels differ):**
  ```html
  <nav id="navbar">
    <a ... class="nav-logo">…</a>
    <button class="nav-toggle" aria-label="Open navigation" aria-controls="…" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links" id="…">
      <li><a href="…">…</a></li> …
      <li class="nav-mobile-cta-item"><a href="…" class="nav-mobile-cta"><span>Book Strategy Call</span></a></li>
    </ul>
    <a href="…" class="nav-cta"><span>Book Strategy Call</span></a>
  </nav>
  ```
- **Per-page nav content is preserved** (each page keeps its own link paths,
  labels, active-page marker, and CTA destination). Only the drawer's design/
  behavior is shared.
- **Each page keeps its own `<nav>`/`#navbar` header bar** (background, padding).
  `nav-drawer.css` styles only the drawer components, not the header bar.
- **JS behavior:** hamburger opens/closes; Escape closes; overlay is visual only
  (there is no click-overlay-to-close in the Insights source, so there is none on
  any page); clicking any drawer link closes it; body scroll is locked via
  fixed-positioning while open and restored (with scroll position) on close;
  resizing above 1024px auto-closes. `aria-expanded`/`aria-label` update on the
  toggle.

## 6. HTML Architecture

- Semantic-ish: `<nav>`, `<section>`, `<header>`, `<footer>`, `<main>`,
  `<aside>` are used, but many interactive controls are non-semantic (`<div
  onclick>`, `<span>` close buttons).
- Heavy use of BEM-ish flat class names (`.hero-card`, `.fw-card`,
  `.elite-service-block`, `.es-*`, `.dash-*`, `.vault-*`).
- Inline `style="…"` attributes and a few inline `onclick` handlers are used
  throughout — the project **already relies on inline styles/handlers**, so they
  are acceptable where consistent, but prefer classes/JS listeners for new work.
- Platform/brand icons (Meta, Google, TikTok, integration logos) are **inline
  SVG**, not image files.

## 7. CSS Architecture (Design System)

Three self-contained stylesheets, one per page. They **re-declare** the reset,
`:root` tokens, `body`, scrollbar, `body::before` noise, `#particles`,
`.cursor-*`, `nav`/`.nav-*`, `.label`, `.header-h1`, `.reveal`, `.section`,
`.btn-gold`, and utilities — with subtle divergences. **A shared-component change
must be repeated in all three files.**

### Design tokens (`:root`, identical core in all three)
| Token | Value | Role |
|---|---|---|
| `--bg` | `#080808` | Page background (near-black) |
| `--bg2` / `--bg3` | `#0d0d0d` / `#111111` | Bands / card interior |
| `--surface` | `#161616` | Elevated card surface |
| `--border` / `--border2` | `rgba(255,255,255,.07)` / `.12` | Hairline borders |
| `--white` / `--off` | `#ffffff` / `#f0ece4` | Text / warm off-white headings |
| `--muted` / `--muted2` | `#6b6b6b` / `#999` | Muted text |
| `--gold` | `#c9a84c` | **Primary gold accent** |
| `--gold2` | `#e8c96d` | Bright gold (gradients/hover) |
| `--gold-dim` / `--gold-border` | `rgba(201,168,76,.08)` / `.2` | Gold tint / border |
| `--gold-glow`, `--red` `#e05c4b`, `--green` `#4ade80`, `--r` `16px`, `--r2` `24px` | | **style.css only** (absent in insights/trainings) |

`style.css` also has a **second `:root`** (~line 3006, `--ddp-*` dashboard tokens)
and scoped vars on `.ddp-dashboard`.

### Color palette (effective)
Backgrounds `#080808 / #0d0d0d / #111111 / #161616`; gold `#c9a84c` + `#e8c96d`
(usually written as raw `rgba(201,168,76,x)`); text `#fff / #f0ece4 / #999 /
#6b6b6b`. Semantic green appears as **two hexes** (`#4ade80` and `#22c55e`); red
`#e05c4b`; lavender `#A78BFA`; a stray off-theme blue in one keyframe.

### Typography
Google Fonts: **Space Grotesk** (loaded, but unused in CSS), **Playfair
Display**, **Syne**, **DM Sans** (index also); insights/trainings load Playfair +
Syne + DM Sans.
- **Playfair Display (serif):** all display headings (`.hero-h1`, `.section-h2`,
  `.header-h1`, `.metric-num`, `.cta-h2`, italic gold `em`).
- **DM Sans:** body text, paragraphs, form fields.
- **Syne:** UI chrome — nav, `.label`, buttons, tags, badges, stat numbers
  (uppercase, wide letter-spacing).
- **Referenced but NOT loaded (fallback risk):** Cormorant Garamond
  (`.ddp-kpi-value`), Poppins (`.dash-kpi-value`), Manrope (`.client-name`).

### Layout & spacing
- Universal inner wrapper `max-width:1200px; margin:0 auto` (`.section-inner`,
  `.hero-inner`, `.footer-inner`, etc.). Exceptions: spotlight 1400px, CTA 800px,
  modals/dashboard ~1000–1200px.
- Section padding: `120px 64px` (style.css `.section`), `100px 64px`
  (insights/trainings). Horizontal gutter steps down responsively
  `64 → 32 → 18 → 16 px` (with `!important`).
- Radii tokens `--r`/`--r2` exist but most components hardcode `4/8/12/16/20/100px`.

### Responsive breakpoints
Distinct `max-width` values across all files: **1279, 1100, 1080, 1024, 900,
768, 640, 600, 480, 390, 360**. `min-width`: 1025, 1600. Feature queries:
`(hover:none)`, `(pointer:coarse)`, `(prefers-reduced-motion:reduce)`.
**Inconsistency:** `style.css` primary desktop→mobile break is **1024px**;
`insights.css`/`trainings.css` use **1279px**. Nav collapse, cursor-hide, and
hover-disable therefore trigger at different widths per page.

### Reusable components
Buttons `.btn-gold` (gold gradient, radius 4px, lift on hover), `.btn-outline`,
`.btn-elite` (pill + light sweep), `.nav-cta`. Cards share: surface bg,
`--border`, radius 12–24, hover `translateY(-4…-8px)` + gold border + shadow +
gold top-crest `::after`. `.label` = gold Syne eyebrow. `.reveal` = scroll-reveal
(**activation class differs: `.in-view` in style.css, `.active` in
insights/trainings**). Signature easing: `cubic-bezier(0.19,1,0.22,1)`.

### Z-index scale (ad-hoc, collision-prone)
particles 0 · nav 1000 · noise 9990 · cursor base 9998/9999 · lightbox 9999 ·
preloader + service/contact modals 999999 · mobile nav overlay 1000000+ · cursor
overrides `9999998/9999999 !important`. No z-index tokens.

### CSS problems (known)
Duplicate `:root` and duplicate keyframes (`pulse`, `pulse-text`) in style.css;
`.insights-grid`/`.insight-card`/`.section` defined twice in style.css;
undefined vars `--text-muted`/`--text-main`/`--accent` in the Clients/Spotlight
block render valueless; heavy `!important` (esp. mobile nav ~40 declarations);
fixed-width mobile-overflow risks (`.dash-main-grid` 280/260px, `.trust-card`
200px, `.integration-card` 118px); **no `:focus-visible` outlines anywhere**
(only form-field focus). `prefers-reduced-motion` IS supported (trainings only
below 1279px).

## 8. JavaScript Architecture

Plain global scripts (no modules/IIFE wrapping files, except the dashboard
engine). Placed at end of `<body>`.

### main.js (index.html only)
Preloader + SVG-draw counter → custom cursor (`#cursorDot`/`#cursorRing`, RAF
lerp) → navbar `.scrolled` → particles (fixed 60) → scroll reveal (`.reveal` →
`.in-view`) → `.metric-num[data-count]` counters → `.metric-bar-fill` →
smooth-anchor scroll (skips `#`/`#apply`) → lightbox (`#image-modal`) → 3D tilt
galleries (`.ddp-tilt-gallery`, disabled `<1024px`) → magnetic spotlight
(`#client-grid` mouse vars) → **live dashboard IIFE** (fake feed +
`window.dashSetTab` global + KPI counters on `#live-operations`) → **service
modal engine** (content from local `serviceData` object keyed
`sem/social/management/ecom`, injected into `#serviceModal`) → **CTA/Formspree
engine** (`#contactModal`, hijacks `a[href="#apply"]` & `mailto:`, submits via
`fetch`) → mobile cursor kill switch. **The mobile-nav drawer engine was moved
out of main.js into the shared `js/nav-drawer.js`** (see §5a).

### data.js (insights.html)
`const articleDatabase = { 'article-hero':{tag,title,content}, 'article-1..9':… }`
— content is raw HTML strings. Global; consumed only by insights.js. **Must load
before insights.js.**

### insights.js (insights.html)
Nav blur, scroll reveal (`.reveal` → `.active`), custom cursor (density-based
particles), **article drawer engine** (click `[data-article]` → look up
`articleDatabase[id]` → inject into `#drawerTag`/`#drawerTitle`/`#drawerBody`,
open `#articleDrawer`+`#drawerOverlay`, Escape to close), CTA/Formspree engine,
fixed-position mobile nav. **No search/filter/pagination.** ⚠ Several unguarded
null references (nav, cursor, drawer, contactModalBackdrop) — see §24.

### trainings.js (trainings.html)
Nav blur, scroll reveal, custom cursor, particles, **FAQ accordion**
(`.faq-header` click toggles `.faq-item.active`, `maxHeight` animation,
auto-closes siblings), fixed-position mobile nav. No form, no tabs, no pricing.

### Inline script in index.html (~2099–2230)
Runs on `window load`. Scroll-ignites when `#platform-preview` enters view;
`animateValue()` count-up for `#count-spend`→$12.5K, `#count-hero-rev`→$108K,
`#count-roas`→8.6× (also calls `count-calls`/`count-leads`/`count-rev` — **those
IDs do not exist → dead calls**); builds the Chart.js bar chart on `#ddpMainChart`.

### Storage / network
No localStorage/sessionStorage/cookies, no URL-param reading. Only network call
is the Formspree `fetch` on form submit. Live dashboard data is 100% hardcoded.

## 9. Reusable Components & Patterns

`.reveal` scroll-in (mind the `.in-view` vs `.active` class split); `.btn-gold` /
`.btn-outline` / `.btn-elite`; card hover pattern (lift + gold border + crest);
`.label` gold eyebrow; CSS marquees (`.marquee-track`, `@keyframes marquee`);
custom cursor + particles (decorative, disabled on touch); modal overlay pattern
(`.active` class, body scroll lock, Escape/backdrop close). Modal/dashboard
namespaces (`.ddp-*`, `.dash-*`) are the cleanest, best-isolated code.

## 10–13. Palette / Typography / Spacing / Breakpoints
See §7 (consolidated there).

## 14. Forms & Validation

**One real form**, duplicated on index.html and insights.html: `#ddpStrategyForm`.
- Fields: `#frmName` (required), `#frmEmail` (required), `#frmPhone` (optional),
  `#frmService` `<select>` (required), `#frmDesc` textarea (required). All have
  `<label for>`.
- Validation: native HTML5 `required` only.
- Submit: JS `fetch(form.action, {method, body:FormData, Accept:json})` →
  success panel `#formSuccessState` on 2xx, else `alert()`.
- **Endpoint is a broken placeholder:** `action="https://formspree.io/f/
  YOUR_FORMSPREE_ID"`. **Both forms fail in production until a real Formspree ID
  is set.** trainings.html has no form (funnels to `index.html#apply`).

## 15. User Interactions
Preloader animation; custom cursor + hover grow; particles; scroll reveal;
animated counters; Chart.js bar chart; keyword & logo marquees (CSS); service
modal (`data-service`); contact modal (hijacks `#apply`/`mailto:`); cert lightbox
(`onclick="forceOpenModal(...)"` + delegated); fake live dashboard feed/toasts/
KPIs (`dashSetTab`, platform chips `classList.toggle('on')`); 3D tilt galleries;
FAQ accordion (trainings); insights article drawer; mobile hamburger nav.

## 16. Animations & Effects
Keyframes incl. `marquee`, `pulse`/`pulse-text` (duplicated), `fade-up`,
`pulse-green`, `radar-pulse`, `pulse-glow` (off-theme blue), toast in/out, bar
fill. House easing `cubic-bezier(0.19,1,0.22,1)`. Preloader exit `translateY(-100%)`.
`prefers-reduced-motion` respected (with the trainings ≤1279px caveat).

## 17. External Libraries
- **Chart.js** (`cdn.jsdelivr.net/npm/chart.js`, unversioned) — index.html only,
  **included 3× in the head (lines 9, 15, 16); 2 are redundant.**
- **Google Fonts** — all pages.
- No jQuery/GSAP/Bootstrap/animation libs.

## 18. Third-Party Services
- **Formspree** — contact form endpoint (placeholder, not configured).
- **Calendly** — `https://calendly.com/danidigitalpro/30min` (service modal CTA).
- **Unsplash** — hotlinked content images (framework, service galleries,
  testimonials, insights cards, dashboard avatars). Reliability/privacy risk.
- **GitHub Pages** — hosting/deploy.

## 19. Assets & Usage

**Used:** `images/ddp-logo.png` (preloader, footer), `images/hero3.jpeg` (hero +
dashboard), `images/about-photo.png`, `images/roas-1829.jpeg`,
`images/meta-roas-18.jpeg`, `images/google-ctr-11.jpeg`,
`images/medical-results.jpeg`; all 10 `Logos/*`; 4 `certifications/*`.

**Unused (safe candidates for cleanup, verify first):** `images/hero.png`,
`images/hero2.png`, `images/DDP-Final-Logo.jpg.jpeg` (odd double extension),
**entire `clients/` folder (10 files)**.

**Broken (referenced but missing):** `insights.html` references
`images/insight-featured.jpg` and `images/insight-1/2/3.jpg` — **none exist** →
4 broken images on the insights page.

**Contact details:** email `daniidigitalpro@gmail.com` (note double-i "danii" vs
single-i brand/domain — possible typo), phone `+92 324 485 9790`.

## 20. SEO Setup
Minimal. `index.html` has `<title>` + `<meta name="description">`. insights/
trainings have `<title>` only. **Missing everywhere:** canonical, Open Graph,
Twitter cards, JSON-LD/structured data, favicon, robots.txt, sitemap.xml,
manifest. Two `<h1>` on index (preloader brand + hero).

## 21. Accessibility Setup
Present: `lang="en"`; nav-toggle `aria-*` kept in sync by JS; some
`aria-hidden`/`role`/`aria-live` on marquees & dashboard; most `<img>` have alt;
form labels present; Escape closes modals; `prefers-reduced-motion` supported.
Gaps: **no visible focus outlines** (`cursor:none` compounds this); non-semantic
controls (`<div onclick>` cert cards, `<span>` modal closes, icon-only video/FAQ
buttons); modals/drawer lack `role="dialog"`/`aria-modal`/focus trap; FAQ headers
not keyboard-focusable; no `aria-current` for active nav; empty `href="#"` logos;
duplicate/generic alt text.

## 22. Local Development

No build step. Serve the folder over HTTP (needed so `fetch`, fonts, and relative
paths behave). From repo root:
- **Python (3.14 available):** `python -m http.server 8000` → http://localhost:8000
- **Node (v24 available):** `npx serve` or `npx http-server -p 8000`
- **VS Code:** Live Server extension.
Do **not** open via `file://` — relative fetch/CDN behavior and some paths break.

## 23. Deployment
**GitHub Pages** via `.github/workflows/static.yml`: on push to `main` (or manual
dispatch), uploads the **entire repo root** as the Pages artifact and deploys. No
build, no `.nojekyll`, no `CNAME`. Everything at root ships to production —
including `Components/Just-UI.html`, the unused `clients/` folder, and files with
spaces/parentheses in their names.

## 24. Known Bugs
1. **Contact forms broken** — Formspree placeholder `YOUR_FORMSPREE_ID`
   (index.html ~2306, insights.html ~223).
2. **4 broken images** on insights.html (`insight-featured/1/2/3.jpg` missing).
3. **Chart.js loaded 3×** in index.html head.
4. **Dead `#apply` nav links** on insights.html (should be `index.html#apply`).
5. **Dead counter calls** in index inline script (`count-calls/leads/rev` IDs
   don't exist).
6. Unguarded null refs in **insights.js** (nav, cursor, drawer,
   contactModalBackdrop) — would throw if those elements are ever removed.
7. Missing fonts (Cormorant Garamond, Poppins, Manrope) → fallback rendering.
8. Undefined CSS vars in Clients/Spotlight block.
9. Email spelling inconsistency (`daniidigitalpro` vs domain `danidigitalpro`).
10. Nav item sets inconsistent across the 3 pages.
11. Two `<h1>` on index (preloader + hero).

## 25. Technical Risks
- **Triplicated CSS globals** — nav/cursor/button/`.reveal` edits must be applied
  in all 3 CSS files or pages drift.
- **`.reveal` activation-class split** (`.in-view` vs `.active`) — easy to break
  reveal animations by copying JS/CSS between pages.
- **Breakpoint split** (1024 vs 1279) — responsive edits must respect the correct
  primary break per page.
- **Hotlinked Unsplash images** can 404 / change without notice.
- **Unversioned Chart.js** — a future major release could break the chart.
- **No focus outlines** — accessibility/keyboard regressions are easy to miss.
- **Whole-repo deploy** — scratch/unused files are publicly served.

## 26. Areas Requiring Extra Caution
- `css/style.css` (6018 lines, duplicated selectors/keyframes — search before
  adding; a later duplicate may silently win).
- Homepage inline `<script>`/`<style>` in `index.html` (chart, counters, app
  mockup) — logic lives here, not in main.js.
- Any nav / `.btn-gold` / `.reveal` / cursor / footer change → replicate across
  all three CSS files and verify each page.
- Modal z-index layer (999999 + cursor overrides) — don't casually reorder.
- The one shared form markup exists on two pages — fix both together.

## 27. Recommended Process for Future Changes
1. Identify the exact final result and which of the 3 pages it touches.
2. `grep` the class/id/asset across **all** HTML/CSS/JS before editing (shared
   names are duplicated per page).
3. Reuse existing tokens (`--gold`, easing, `.btn-gold`, `.reveal`, card
   patterns). Do not introduce a second styling system.
4. Make the smallest complete change; avoid unrelated refactors.
5. If touching a shared component, update **all three** CSS files (and check the
   `.in-view` vs `.active` and 1024 vs 1279 differences).
6. Serve locally (`python -m http.server`) and check the affected page(s) at
   desktop + mobile widths, keyboard nav, and the browser console.
7. Verify forms only against a real Formspree ID; never claim the form "sends"
   with the placeholder in place.
8. Preserve SEO/meta, accessibility attributes, and existing integrations.
9. Update this file and `CLAUDE.md` when architecture/behavior changes.
