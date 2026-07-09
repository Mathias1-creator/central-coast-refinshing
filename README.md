# Central Coast Refinishing

Marketing website for **Central Coast Refinishing** — bathtub, sink, countertop and
shower refinishing by Alex Delgadillo, serving Santa Cruz, Monterey and San Benito
Counties on California's Central Coast.

Flat, static site — plain HTML, CSS and vanilla JavaScript. **No frameworks, no build
step, no dependencies.** Designed to deploy directly to GitHub Pages.

## Structure

```
index.html          Home — hero before/after slider, services, reviews, service area
services.html       The three services + "How It Works" process
gallery.html        Before/after sliders + lightbox gallery of finished work
about.html          Alex's story and approach
contact.html        Click-to-call / click-to-text (no form)
css/style.css       Design system + all page styles
js/before-after.js  Draggable before/after reveal slider (pointer + touch + keyboard)
js/main.js          Header condense, mobile nav, scroll reveal, carousel, lightbox
images/
  before-after/     Paired before/after photos (WebP + JPG)
  gallery/          Standalone work photos (WebP + JPG)
  logo/             Logo + favicon sizes
  og-image.jpg      Open Graph share image
favicon.ico, apple-touch-icon.png
```

All asset paths are **relative** (e.g. `css/style.css`, not `/css/style.css`) so the
site works correctly from a GitHub Pages project subdirectory
(`username.github.io/repo-name/`).

## Photos

Photos are real project photos supplied by the business, converted from HEIC to
web-optimized WebP (with JPG fallback), EXIF-rotated, and resized. Alt text describes
the actual contents of each image.

## Deploying to GitHub Pages

1. Ensure this content is on the repository's **main** branch (public repo).
2. On GitHub: **Settings → Pages → Build and deployment → Source: "Deploy from a
   branch" → Branch: `main`, folder: `/ (root)` → Save.**
3. The live URL appears on that screen a minute or two later
   (`https://<username>.github.io/<repo-name>/`).

### Custom domain (later)

When the real domain is ready: add a `CNAME` file at the repo root containing just the
domain name, then point the domain at GitHub Pages via DNS at the registrar. No rebuild
needed — paths are already relative.
