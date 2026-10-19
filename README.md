# hark

Everything on [felipeharker.org](https://felipeharker.org/), in one
repository: the portfolio, the academic projects, the birding report, the
resume, and the web standards they are all built to. One folder per part of
the site, one shared stylesheet, one deploy.

| Part | Served at | Folder | What it holds |
|---|---|---|---|
| Portfolio | [`/`](https://felipeharker.org/) | [`web/portfolio/`](web/portfolio/) | The front page: a row for each body of work, About, contact. |
| Academic | [`/academic/`](https://felipeharker.org/academic/) | [`web/academic/`](web/academic/) | Architecture and urban design projects from the University of Houston, a page each. |
| Birding | [`/birds/`](https://felipeharker.org/birds/) | [`web/birds/`](web/birds/) | The Harker Ornithology Report: eBird observations, checklists, media and field notes. Next.js. |
| Resume | [`/resume/`](https://felipeharker.org/resume/) | [`web/resume/`](web/resume/) | The resume, as one printable page. |
| Standards | [`/standards/`](https://felipeharker.org/standards/) | [`web/standards/`](web/standards/) | The web design and development standards, the shared stylesheet, and a page that renders it. |

## Layout

```
hark/
  README.md           this page
  ARCHITECTURE.md     diagrams: how the parts, the stylesheet, the build and the services relate
  AGENTS.md           rules for coding agents (CLAUDE.md points here)
  render.yaml         the Render service, recorded
  tools/
    sites.mjs         every part of the site: its path and its folder
    serve.mjs         serve the whole site locally, from source
    check.mjs         check pages, links, published files and docs
    build.mjs         build the site into dist/ for Render
  web/
    standards/        the standard: site/hark.css, docs/, the specimen page
    portfolio/        site/ is published at /
    academic/         site/ is published at /academic/
    birds/            web/out/ (the Next.js build) is published at /birds/
    resume/           site/ is published at /resume/
  wiki/               how-to guides: running, editing, deploying
  planning/           the roadmap and the decision log
```

Each part keeps what it publishes in `site/` and nothing else there; working
files (models, board PDFs) sit beside it in `source/`, ignored by git.

## Quick start

Node 20.9 or newer, nothing else.

```bash
node tools/serve.mjs
```

serves the whole site at http://localhost:8000/ — every static page straight
from its source, so an edit shows on the next refresh. The birding report is
served from its last build; build it once first:

```bash
cd web/birds/web && npm install && npm run build
```

Before a commit:

```bash
node tools/check.mjs
```

## Where to read next

- **[ARCHITECTURE.md](ARCHITECTURE.md)** — the system in diagrams: the
  repository, the one stylesheet, the build and deploy, the birding data,
  how a reader moves between parts, and the services outside the repository.
- **[wiki/](wiki/Home.md)** — how to do things: run the site, edit each part,
  add a project, update the bird data, change the standard, deploy.
- **[web/standards/](web/standards/)** — the rules every page follows:
  [design](web/standards/docs/design.md),
  [components](web/standards/docs/components.md),
  [writing](web/standards/docs/writing.md),
  [development](web/standards/docs/development.md).
- **[planning/](planning/roadmap.md)** — what is next, what is open, and
  [why things are the way they are](planning/decisions.md).
- **[AGENTS.md](AGENTS.md)** — the rules for anyone, or anything, editing
  this repository.

## Deploying

One Render static site, deployed from `main` on every push: build command
`node tools/build.mjs`, publish directory `dist`. See
[wiki/Deploying.md](wiki/Deploying.md).

## Elsewhere in CODEBASE

The standards for the rest of the CODEBASE repositories — Rhino and
Grasshopper, repository templates, documentation styles — live in the private
`hark_system` repository. The web standards live here, with the site they
govern.
