# Development

How felipeharker.org is built, laid out, checked and deployed.

## One repository, one site

Everything on felipeharker.org lives in one repository, `hark`
(`C:\Users\fharker\Documents\CODEBASE\hark`, `github.com/felipeharker/hark`),
and is served as one site from one Render service. Each part of the site is a
folder under `web/`:

| Part | Served at | Folder | Stack |
|---|---|---|---|
| Portfolio | `/` | `web/portfolio/` | Static HTML |
| Academic | `/academic/` | `web/academic/` | Static HTML |
| Birding | `/birds/` | `web/birds/` | Next.js, static export |
| Resume | `/resume/` | `web/resume/` | Static HTML |
| Standards | `/standards/` | `web/standards/` | Static HTML: the specimen page and the stylesheet |

[`tools/sites.mjs`](../../../tools/sites.mjs) is the source for this table:
the build, the local server and the check all read it.

## Choosing a stack

- **Static HTML and CSS by default.** No framework, no build step, no
  JavaScript. A page is a file; what is in a `site/` folder is what the
  browser gets.
- **A framework only when the content is generated from data at build time.**
  The birding report is Next.js because every page is built from eBird CSV
  exports. Even then it exports static files — no server, no database.
- **JavaScript only for interaction that HTML cannot do.** A disclosure row
  is `<details>`, not a script.
- **No CSS framework, no preprocessor, no inline styles.** Not Tailwind, not
  Sass, not `style="…"`, not a React `style={{}}` object. Every visual rule is
  a commented class in a stylesheet.

## Folder layout

Every part of the site has the same shape:

```
web/<part>/
  site/                 what is published, and nothing else
    index.html          the part's front page
    projects/           further pages, one file each
    assets/
      site.css          this part's own rules, if it has any
      covers/           work-list covers, 3:2
      projects/<slug>/  images for one page
  source/               working files: models, board PDFs (git-ignored)
  README.md
```

- **Only `site/` is published, and everything in it is public.** No
  Markdown, notes, models, PDFs or drafts in `site/`. `tools/check.mjs`
  fails on any file there that is not HTML, CSS or an image.
- **`source/` is for working files** — Rhino models, board-set PDFs, design
  sources. Git ignores everything in it but a README. The birding report's
  equivalent is its `notebook/`.
- **The birding report** is the one exception to the shape: its app is in
  `web/birds/web/`, its data in `web/birds/observation-data/`, and its build
  writes `web/birds/web/out/`, which is what is published at `/birds/`.

## Stylesheets

There is one shared stylesheet, `web/standards/site/hark.css`, published at
`/standards/hark.css`. Every page links it first, then its part's own
stylesheet if it has one:

```html
<link rel="stylesheet" href="/standards/hark.css">
<link rel="stylesheet" href="assets/site.css">   <!-- only if needed -->
```

- **There are no copies.** Every static page links the one address. The
  birding app imports the stylesheet at build time, so its `predev`,
  `prebuild` and `prelint` scripts copy it to `web/birds/web/src/app/hark.css`
  — a generated file git ignores. A page outside this repository can link
  `https://felipeharker.org/standards/hark.css`.
- **A part's own stylesheet** holds the components no other part has — the
  birding report's map and lightbox, the resume's print sheet. It may
  redefine a token (the resume's print sheet resizes the type and narrows
  the label column). It should not restyle a shared class; if a shared component
  needs to change, change the standard.
- **When a second part needs a part-only component**, move it into
  `hark.css` and document it in [`components.md`](components.md).

Every stylesheet opens the same way, so any of them can be read cold:

```css
/* ============================================================================
   <SITE> — <ROLE> STYLESHEET
   ----------------------------------------------------------------------------
   What this file styles, what it does not, and where the rest lives.

   HOW THIS FILE IS ORGANISED
      1.  Tokens ................... …
      2.  …
   ========================================================================= */
```

…then numbered sections, each opened by the same banner, tokens first. A
comment says why a rule exists, not what CSS it contains.

## Page structure

```html
<body>
<header class="runhead">…owner, then every part of the site…</header>
<article class="doc">
  <a class="backlink" href="…">&larr; …</a>     <!-- interior pages only -->
  <header class="masthead">…</header>
  <section class="section" id="sec-…">…</section>
  <footer class="colophon">…site links, then one line…</footer>
</article>
</body>
```

[`templates/page.html`](../templates/page.html) is a blank page in this
shape, with the `<head>` every page needs: title, description, the two font
families and the stylesheet.

## Links

- **Within a part of the site**, links are relative: `projects/x.html`,
  `../index.html`.
- **Between parts**, links are root-relative — `/`, `/academic/`, `/birds/`,
  `/resume/`, `/standards/` — and open in the same tab.
- **To anyone else's site**, links are absolute and open in a new tab, always
  with `target="_blank" rel="noopener noreferrer"`. In the birding app,
  spread `externalLinkProps(href)` from `siteConfig.ts`.
- **In the birding app**, a link inside the app is a Next `<Link>` (it gains
  the `/birds` base path); a link out of it is a plain `<a>` (it must not).
- **No links to other `github.com/felipeharker/…` repositories.** They are
  private, and a visitor gets GitHub's 404. This repository is public.

## Naming

- Anything served is a URL, so it is lowercase kebab-case:
  `projects/living-outside-the-box.html`,
  `assets/projects/<slug>/<slug>-NN.jpg`.
- Files outside `site/` — tools, docs, notes — are lowercase, with
  underscores or hyphens as the folder already uses.
- Section ids: `sec-<name>`.
- Images: see [`writing.md`](writing.md), "Images".

## What stays out of the repository

- **PDFs, for now.** Board sets, the printed resume and third-party field
  guides are ignored; their links are removed from the pages
  (`planning/decisions.md`). They stay on disk in each part's `source/`.
- **Working files** — `.3dm`, `.psd`, `.ai`, `.indd`, raw exports. Large,
  changing and never served; keep them in `source/`.
- **Anything over 50 MB.** GitHub warns above 50 MB and refuses a push with
  a file over 100 MB.
- **Private details.** No street address, no one else's contact details, no
  client or employer work shown. The repository is public: every file in it
  is published, not only `site/`.
- **Third-party material** (papers, field guides, vendor models) never goes
  in the repository. It stays on disk, out of git: in a part's `source/`, or
  the birding report's `notebook/`. Credit a source in the page text when a
  project relies on it.

## Accessibility

Every page, before it ships:

- `<html lang="en">`, a `<title>` and a `<meta name="description">`.
- One `<h1>`; headings in order.
- Every `<img>` has `alt` (a description, or `alt=""` when text beside it
  already says the same), and `loading="lazy"` below the first screen.
- A link that duplicates another (a cover beside its title) is
  `aria-hidden="true" tabindex="-1"`.
- Separators are `aria-hidden="true"`.
- Keyboard focus is always visible — the stylesheet does this; do not remove
  an outline without replacing it.
- Text is never lighter than `--color-text-mute` (4.6:1 on white).
- Nothing depends on motion; reduced motion turns it all off.

## Checking a change

From the repository root:

```bash
node tools/serve.mjs
```

serves the whole site from source at http://localhost:8000/ — every static
page live, the birding report from its last build. Then:

1. Look at what you changed at desktop width and at 390px.
2. For the birding report, in `web/birds/web`: `npm run build` and
   `npm run lint` must both pass. `npm run dev` there serves the app alone at
   http://localhost:3000/birds/ (its links to the rest of the site will 404
   on that server).
3. `node tools/check.mjs` must pass: stylesheet links, the links to every
   part in each running head and colophon, every internal link and image,
   what is published, the docs, and the wiki's links.
4. Before a deploy, `node tools/build.mjs` and `node tools/serve.mjs --dist`
   show exactly what Render will publish.

## Changing the standard

1. Edit `web/standards/site/hark.css`. Add or rename a token or class?
   Document it in [`design.md`](design.md) or [`components.md`](components.md),
   and give a new component a specimen on `web/standards/site/index.html`.
2. Look at `/standards/` and at every part of the site the change touches.
3. `node tools/check.mjs` must pass.
4. Commit once: the standard and everything it changed move together.

## Deploying

One Render static site, deployed from `main` on every push, described in
[`render.yaml`](../../../render.yaml):

| Setting | Value |
|---|---|
| Build command | `node tools/build.mjs` |
| Publish directory | `dist` |
| Node | the version in `.node-version` |

`tools/build.mjs` builds the birding app, copies every part's published
folder to its path in `dist/`, and fingerprints each static page's stylesheet
links (`hark.css?v=…`) so a CDN can never pair a new page with an old
stylesheet. Write links without the fingerprint; the build adds it.
felipeharker.org is the service's custom
domain; birds.felipeharker.org redirects to felipeharker.org/birds/.

## Adding a part of the site

1. Make `web/<part>/` in the shape above; start from
   [`templates/page.html`](../templates/page.html).
2. Add it to `tools/sites.mjs` — its path, folder and whether it belongs in
   the site links.
3. If it belongs in the site links, add it to every page's running head and
   colophon (and to `SITE_FAMILY` in the birding app's `siteConfig.ts`, which
   feeds both); `tools/check.mjs` lists every page that misses it.
4. Write its `README.md`.
5. `node tools/check.mjs`, then `node tools/build.mjs`.
