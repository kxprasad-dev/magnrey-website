# Magnrey Website

A plain HTML/CSS/JS marketing site, built page by page.

## Structure

```
index.html          Home
services.html        Services
case-studies.html    Case Studies
about.html           About Us
insights.html        Insights / Blog
contact.html         Contact
partials/            Shared header.html and footer.html, injected at runtime by js/main.js
css/style.css        Shared styles and design tokens
js/main.js           Loads partials, active-link highlighting
images/              Images and other static assets
```

No build step. Each page is a standalone `.html` file that shares a common header/footer
via `js/main.js`, which fetches `partials/header.html` and `partials/footer.html` at
runtime and injects them into `#site-header` / `#site-footer`.

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

Work one page at a time: pick an issue, build out that page's content in its `.html`
file (reusing the shared `css/style.css` classes — `.hero`/`.hero__copy`/`.hero__panel`,
`.grid-3`/`.list-item__*`, `.card`, `.btn`/`.btn--primary`/`.btn--ghost`/`.btn--accent`,
`.eyebrow`/`.lede`, etc.), and close the issue when done.

To keep the site easy to scale page by page:
- Link between pages with relative paths (e.g. `href="about.html"`), so links work the
  same locally and on GitHub Pages.
- Keep all styling in `css/style.css` — avoid inline `style="..."` attributes; add a new
  rule or utility class instead.
- Put images in `images/` and reference them as `images/photo.jpg`.
