# hark — agent guide

felipeharker.org in one repository. Read [`README.md`](README.md) first:
the parts of the site, the layout, and how to run, check and deploy it. The
birding app has its own notes in [`web/birds/web/AGENTS.md`](web/birds/web/AGENTS.md).

## Rules

1. **`main` is live.** Render builds and deploys every push to `main`. Work on
   a branch; push or merge to `main` only when the user asks. Never change
   Render settings.
2. **The repository is public, and so is everything in a `site/` folder.**
   Every file here can be read by anyone, not only what is served. No secrets,
   no `.env`, no private notes.
3. **Privacy.** No street address, no one else's contact details, no client
   named and no work done for one shown. The resume carries no phone number
   and no referees' email addresses (`planning/decisions.md`); the employer's
   name is an open decision (`planning/roadmap.md`): never add, change or
   remove it unless asked. The one exception: the birding report shows the
   eBird exports exactly as they are, location names included — never rename,
   hide or filter anything in them.
4. **No links to other `github.com/felipeharker/…` repositories.** They are
   private, and a visitor gets GitHub's 404. This repository may be linked.
5. **One stylesheet.** `web/standards/site/hark.css`, served at
   `/standards/hark.css`, is the only shared stylesheet; every page links it,
   and nothing copies it except the birding app's generated, git-ignored
   import. A part's own rules go in its `site/assets/site.css`, commented.
   No inline `style` attributes, no CSS framework, no preprocessor, no build
   step for static pages, no JavaScript where HTML will do.
6. **Tokens first, and document what you add.** A new token goes in
   `web/standards/docs/design.md`; a new class in
   `web/standards/docs/components.md`, with a specimen on
   `web/standards/site/index.html`. `node tools/check.mjs` fails otherwise.
7. **Only `site/` is published.** Working files — models, board PDFs, design
   sources — go in the part's `source/` folder, which git ignores. PDFs are
   out of the repository for now, and no page links one.
8. **Names.** Anything served is a URL, so it is lowercase kebab-case:
   `projects/<slug>.html`, `assets/projects/<slug>/<abbr>-NN.jpg`.
9. **Images.** Covers: 3:2, 1500 x 1000 or smaller, JPEG. Plates: JPEG, 2000 px
   on the long edge or smaller, named with the project's abbreviation and two
   digits (`lotb-03.jpg`). Every `<img>` has `alt`, and `loading="lazy"` below
   the first screen. **Never invent an image**: a missing cover is a
   `.work-cover-placeholder`.
10. **Links.** Within a part: relative. Between parts: root-relative (`/birds/`)
    and same tab. To anyone else: absolute, `target="_blank" rel="noopener noreferrer"`.
11. **Text.** Plain language; headings in Title Case, never numbered. Every
    page ends with the colophon and its site links
    (`web/standards/docs/components.md`, "Colophon").
12. **Third-party material** — papers, field guides, vendor models — never
    goes in the repository. It stays on disk, out of git: in a part's
    `source/`, or the birding report's `notebook/`. Credit a source in the page
    text when a project relies on it.
13. **Keep the docs true.** A change to how something works updates the README,
    wiki page or standard that describes it, in the same commit. A decision
    goes in `planning/decisions.md`.

## Before a commit

1. `node tools/check.mjs` passes.
2. If `web/birds/` changed: `npm run build` and `npm run lint` in
   `web/birds/web` pass.
3. `node tools/serve.mjs`, and open every page you touched at desktop width
   and at 390 px.

Commit messages end with the attribution line the session gives, for example
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
