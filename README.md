# Magnrey Website

A plain HTML/CSS/JS marketing site, built page by page.

## Structure

```
index.html                              Home
services/index.html                     Services (landing page)
services/why-us/index.html              Services > Why Us
services/what-we-do/index.html          Services > What We Do
services/how-we-deliver-success/index.html   Services > How We Deliver Success
case-studies.html                       Case Studies
about.html                              About Us
insights.html                           Insights / Blog
contact.html                            Contact
partials/                               Shared header.html and footer.html, injected at runtime by js/main.js
css/style.css                           Shared styles and design tokens
js/main.js                              Loads partials, nav/dropdown behavior, active-link highlighting
images/                                 Images and other static assets
```

No build step. Each page is a standalone `.html` file that shares a common header/footer
via `js/main.js`, which fetches `partials/header.html` and `partials/footer.html` at
runtime and injects them into `#site-header` / `#site-footer`.

Services is nested (`services/why-us/index.html` etc.) so its URLs are clean paths
(`/services/why-us/`) rather than hyphenated filenames. Use the same
`<section-name>/<page-name>/index.html` pattern for any future dropdown/sub-navigation.

## Running locally

Because the header/footer are loaded via `fetch()`, the site must be served over HTTP
(not opened directly as a `file://` URL). From the project root:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Page-by-page build

Every page currently ships as a scaffolded placeholder (nav + footer wired up, content
requirements listed on the page itself). Each page has its own tracking issue:

- [#1 Home](https://github.com/kxprasad-dev/magnrey-website/issues/1)
- [#2 Services](https://github.com/kxprasad-dev/magnrey-website/issues/2)
- [#3 Case Studies](https://github.com/kxprasad-dev/magnrey-website/issues/3)
- [#4 About Us](https://github.com/kxprasad-dev/magnrey-website/issues/4)
- [#5 Insights / Blog](https://github.com/kxprasad-dev/magnrey-website/issues/5)
- [#6 Contact](https://github.com/kxprasad-dev/magnrey-website/issues/6)
- [#7 Services / Why Us](https://github.com/kxprasad-dev/magnrey-website/issues/7)
- [#8 Services / What We Do](https://github.com/kxprasad-dev/magnrey-website/issues/8)
- [#9 Services / How We Deliver Success](https://github.com/kxprasad-dev/magnrey-website/issues/9)

Work one page at a time: pick an issue, build out that page's content in its `.html`
file (reusing the shared `css/style.css` classes — `.hero`/`.hero__copy`/`.hero__panel`,
`.grid-3`/`.list-item__*`, `.card`, `.btn`/`.btn--primary`/`.btn--ghost`/`.btn--accent`,
`.eyebrow`/`.lede`, etc.), and close the issue when done.

To keep the site easy to scale page by page:
- Link between pages with **root-relative** paths (e.g. `href="/about.html"`,
  `href="/services/why-us/"`), not bare relative ones. This project has pages nested at
  different depths (`services/why-us/index.html` is two levels deep; `about.html` is at
  the root), and a shared `partials/header.html`/`footer.html` used by all of them — a
  relative link or asset path is only correct from one specific depth, so it breaks the
  moment it's reused elsewhere. Root-relative paths work identically regardless of which
  page includes them. This assumes the site deploys at its domain's root; if it ever
  moves to a subpath (e.g. a GitHub Pages project site at `user.github.io/repo/`), every
  root-relative path would need a prefix — flag that explicitly before deploying there.
- Keep all styling in `css/style.css` — avoid inline `style="..."` attributes; add a new
  rule or utility class instead.
- Put images in `images/` and reference them as `/images/photo.jpg`.
