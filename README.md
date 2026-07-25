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
- Link between pages with **plain relative paths counted from that file's own location**
  (e.g. `about.html` from the root, `../about.html` from `services/index.html`,
  `../../about.html` from `services/why-us/index.html`), and give each page's own
  `<link rel="stylesheet">`/`<script src>` tags the same treatment. Do **not** use
  root-relative paths (a leading `/`) — this site is deployed as a GitHub Pages
  *project* site (`https://<user>.github.io/magnrey-website/`), not at its domain root,
  so a leading `/` resolves to the wrong place and silently breaks the page (this exact
  bug shipped once — see git history). Plain relative paths work correctly regardless of
  whether the site ends up at a domain root, a subpath, or a custom domain later.
- The one exception is `partials/header.html`/`footer.html`, since that single shared
  file is injected into pages at multiple different folder depths and can't hardcode a
  relative path that's correct for all of them. Its internal nav links use a
  `data-href="path/from/site/root"` attribute (no leading slash) instead of a real
  `href`; `js/main.js` derives the correct relative prefix at runtime from how it loaded
  itself (see `getBasePrefix()`/`applyDataHrefs()`) and rewrites them after injecting the
  partial. Follow this same `data-href` pattern if the shared header/footer ever need a
  new internal link.
- Keep all styling in `css/style.css` — avoid inline `style="..."` attributes; add a new
  rule or utility class instead.
- Put images in `images/` and reference them the same relative way, e.g. `images/photo.jpg`
  from the root or `../images/photo.jpg` from one level deep.
