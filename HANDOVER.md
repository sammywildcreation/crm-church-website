# Handover: Merge mobile responsiveness into the live CRM church site

## Context for Claude Code

This folder contains **production-ready, cleaned** versions of 7 pages for the CRM church
website (currently live on Vercel, source on GitHub). The site is **static HTML/CSS/JS**
served by Next.js/Vercel.

These files add **mobile responsiveness** that the current live site lacks. They were built
by a designer as a fixed 1440px desktop design that scales to fit, plus a `@media (max-width:768px)`
reflow for phones and a hamburger menu.

> DO NOT blindly overwrite the live repo with these files. The live GitHub repo contains
> two things this folder does NOT have (see "What NOT to lose" below). Your job is to **merge**
> the mobile responsiveness in while preserving those.

## What's in this folder

**7 cleaned pages:** `Home.html`, `About.html`, `Contact.html`, `Giving.html`,
`Program.html`, `Sermon.html`, `Youth-Ministry.html`

**Styles:**
- `colors_and_type.css` — shared design tokens (CSS variables: `--crm-purple`, `--crm-gold`,
  `--crm-ink`, fonts, etc.). Every page links this.
- One mobile stylesheet per page: `home-mobile.css`, `about-mobile.css`, `contact-mobile.css`,
  `giving-mobile.css`, `program-mobile.css`, `sermon-mobile.css`, `youth-mobile.css`.
  Each is a single `@media (max-width:768px)` block layered on top of the desktop styles.

**Assets:** `assets/` (53 images) and `fonts/` (Georgia.ttf, Geneva.ttf). All references verified.

## How the responsiveness works (so you don't break it)

Each page has three interlocking pieces — **keep all three**:

1. **`<link rel="stylesheet" href="{page}-mobile.css">`** in `<head>`, after `colors_and_type.css`.
2. **Inline `fitScale()` script** — scales the fixed 1440px `#scaler` down on tablet/desktop,
   and **turns scaling OFF at <=768px** so the mobile CSS takes over. Also drives the
   **hamburger menu toggle** (`#hamburger` / `#mobileMenu` -> `.open` class) and closes the menu
   above 768px.
3. **Mobile nav markup** in the body: a `.hamburger` button and a `.mobile-menu` slide-in nav.

The `viewport` meta tag (`width=device-width, initial-scale=1.0`) is present on every page.

## What was removed during cleanup (already done — do not re-add)

The designer had embedded a **live preview / "Tweaks" panel** (React + Babel loaded from unpkg,
`tweaks-panel.jsx`, a `#tweak-root` div, and a `CRMTweaks` component for experimenting with
colors/spacing). That is a **design-time tool only** and has been stripped from all 7 pages.
The color variables it used to set at runtime already have real defaults in `colors_and_type.css`,
so appearance is unchanged. The following preview-only files were **intentionally excluded**:
`*(mobile preview).html`, `CRM Home Mobile Preview.html`, `*.jsx`, `design_handoff_crm_mobile/`,
`uploads/`.

## What NOT to lose from the live repo (IMPORTANT)

The site owner made changes **directly on GitHub** that are NOT in this folder:

1. **Text/content edits** — copy that was updated on GitHub after this design folder was exported.
   These cleaned pages may have **older text**. Do a content diff and **keep the live repo's text**;
   only bring over the **structure, CSS links, mobile markup, and scripts** needed for responsiveness.

2. **A "sermon upload" feature** — the live site has functionality for uploading sermons that is
   NOT present here (this folder's `Sermon.html` is fully static). **Preserve it entirely.**
   Do not let the static `Sermon.html` here clobber any dynamic sermon logic in the live repo.

## Recommended merge procedure

1. Diff each live page against its cleaned counterpart here.
2. For each page, port into the live version **only**: the mobile `<link>`, the viewport meta
   (if missing), the `#scaler`/`.page` wrapper structure, the `.hamburger` + `.mobile-menu` markup,
   and the `fitScale`/hamburger `<script>`. Keep the live repo's existing text and any dynamic code.
3. Copy the 7 `*-mobile.css` files and `colors_and_type.css` into the repo (match the live path).
4. Ensure `assets/` and `fonts/` paths match what the live repo uses; add any missing images.
5. Test at 375px, 414px, 768px, and desktop widths before pushing.
6. The owner will apply remaining text changes and wire up the sermon-upload on mobile separately.

## Note on file paths / Next.js

If the live repo serves these as static files, replacing/merging and letting Vercel redeploy
works directly. If the pages have been converted into Next.js components/routes, port the same
three pieces (mobile CSS link, mobile markup, scripts) into the equivalent component instead of
copying raw HTML.
