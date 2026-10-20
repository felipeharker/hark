# Architecture

How felipeharker.org is put together: what lives where in this repository,
how the parts relate to each other, how a change becomes the live site, and
what sits outside the repository. The diagrams render on GitHub; every box
names a real folder, file or service.

- [The whole system](#the-whole-system)
- [The repository](#the-repository)
- [One stylesheet](#one-stylesheet)
- [From a commit to the live site](#from-a-commit-to-the-live-site)
- [The birding report's data](#the-birding-reports-data)
- [How a reader moves around](#how-a-reader-moves-around)
- [Outside the repository](#outside-the-repository)

## The whole system

One repository builds one static site, served from one domain. Each part of
the site is a folder under `web/`; one stylesheet in `web/standards/` styles
all of them; `tools/` turns the folders into the site.

```mermaid
flowchart LR
  subgraph repo["hark repository (github.com/felipeharker/hark)"]
    direction TB
    standards["web/standards<br/>the shared stylesheet, its docs, the specimen page"]
    portfolio["web/portfolio<br/>the front page"]
    academic["web/academic<br/>three University of Houston projects"]
    birds["web/birds<br/>the birding report (Next.js) and its eBird data"]
    resume["web/resume<br/>the resume"]
    tools["tools/<br/>sites.mjs · build.mjs · serve.mjs · check.mjs · wiki.mjs"]
    docs["README · ARCHITECTURE · AGENTS<br/>wiki/ · planning/"]
  end

  standards -. "styles" .-> portfolio
  standards -. "styles" .-> academic
  standards -. "styles" .-> resume
  standards -. "copied in at build" .-> birds
  portfolio & academic & birds & resume & standards --> tools

  tools -- "node tools/build.mjs → dist/" --> render["Render static site 'hark-site'<br/>hark-site.onrender.com"]
  render --> domain["felipeharker.org"]
```

| Path on felipeharker.org | Folder published | What it is |
|---|---|---|
| `/` | `web/portfolio/site/` | The front page: a tile for each academic project and one for the birding report, About, Elsewhere |
| `/academic/` | `web/academic/site/` | Living Outside the Box, Dead Mall Fall, Collingsworth Marketplace — a page each |
| `/birds/` | `web/birds/web/out/` (built) | The Harker Ornithology Report: map, locations, media, field notes, one page per checklist |
| `/resume/` | `web/resume/site/` | The resume, printable |
| `/standards/` | `web/standards/site/` | The specimen page, and `/standards/hark.css` itself |

## The repository

```mermaid
flowchart LR
  root["hark/"]
  root --> rootfiles["README.md · ARCHITECTURE.md · AGENTS.md · CLAUDE.md<br/>render.yaml · .gitignore · .gitattributes · .node-version"]
  root --> tools["tools/"]
  root --> wiki["wiki/<br/>how-to guides"]
  root --> workflows[".github/workflows/<br/>wiki.yml"]
  root --> planning["planning/<br/>roadmap.md · decisions.md"]
  root --> web["web/"]

  tools --> t1["sites.mjs<br/>every part: its path and its folder"]
  tools --> t2["build.mjs<br/>assembles dist/ for Render"]
  tools --> t3["serve.mjs<br/>serves the site locally"]
  tools --> t4["check.mjs<br/>checks pages, links, files, docs"]
  tools --> t5["wiki.mjs<br/>writes wiki/ out as the GitHub wiki"]

  web --> s["standards/"]
  web --> p["portfolio/"]
  web --> a["academic/"]
  web --> b["birds/"]
  web --> r["resume/"]

  s --> s1["site/hark.css · site/index.html · site/specimen/"]
  s --> s2["docs/ design · components · writing · development"]
  s --> s3["templates/page.html"]

  p --> p1["site/index.html · site/assets/covers/"]

  a --> a1["site/index.html · site/projects/ · site/assets/"]
  a --> a2["source/ (git-ignored)<br/>board PDFs, Rhino model"]

  b --> b1["web/ — the Next.js app<br/>src/ · field-notes/ · out/ (built)"]
  b --> b2["observation-data/<br/>eBird CSV exports, archive/"]
  b --> b3["notebook/ (git-ignored)<br/>trip notes, field guides"]
  b --> b4["README.md · user_guide.md"]

  r --> r1["site/index.html · site/assets/site.css"]
  r --> r2["resume.md (reference copy, not published)"]
```

Every part keeps what it publishes in a `site/` folder and nothing else
there: no Markdown, notes, models or PDFs. Working files sit beside it in
`source/` (or the birding report's `notebook/`), which git ignores. The
birding report is the one part with a build: its app writes `web/out/`.

## One stylesheet

There is one shared stylesheet, `web/standards/site/hark.css`. Nothing copies
it except the birding app, which needs it at build time.

```mermaid
flowchart LR
  css["web/standards/site/hark.css<br/>tokens + every shared component"]
  css -- "published as" --> url["/standards/hark.css"]

  url -- "&lt;link&gt;" --> pp["portfolio pages"]
  url -- "&lt;link&gt;" --> ap["academic pages"]
  url -- "&lt;link&gt;" --> rp["resume page"]
  url -- "&lt;link&gt;" --> sp["specimen page"]
  rp --- rcss["web/resume/site/assets/site.css<br/>narrower column, print sheet"]
  sp --- scss["specimen/specimen.css<br/>swatches and samples"]

  css -- "predev · prebuild · prelint copy" --> gen["web/birds/web/src/app/hark.css<br/>(generated, git-ignored)"]
  gen -- "import, first" --> layout["birds app: layout.tsx"]
  layout --- bcss["styles_primary.css · styles_map.css<br/>the report's own components"]

  docs["web/standards/docs/<br/>design.md (tokens) · components.md (classes)"]
  check["tools/check.mjs"]
  check -. "every token and class documented" .-> docs
  check -. "compares" .-> css
```

A part's own stylesheet loads after `hark.css`, may read and redefine its
tokens, and holds only what no other part needs. A component a second part
needs moves into `hark.css`.

## From a commit to the live site

```mermaid
flowchart LR
  dev["edit in web/…"] --> serve["node tools/serve.mjs<br/>localhost:8000, from source"]
  dev --> check["node tools/check.mjs<br/>stylesheet · site links · internal links<br/>published files · docs"]
  check --> push["git push origin main"]
  push --> gh["GitHub<br/>felipeharker/hark"]
  gh -- "auto-deploy" --> build

  subgraph build["Render: node tools/build.mjs"]
    direction TB
    nb["web/birds/web:<br/>npm ci && npm run build → out/"]
    copy["copy each part's folder to its path"]
    nb --> copy
  end

  sites["tools/sites.mjs"] -. "paths and folders" .-> copy
  copy --> dist["dist/<br/>/ · /academic/ · /birds/ · /resume/ · /standards/"]
  dist -- "publish directory" --> live["felipeharker.org"]
```

`tools/sites.mjs` is the one list of parts: the build, the local server and
the check all read it, so a new part of the site is added there once.
`node tools/build.mjs && node tools/serve.mjs --dist` shows exactly what
Render will publish.

## The birding report's data

Nothing about birds is written into markup. Every page is built from files
at build time; images and map tiles come from outside services when a
reader opens the page.

```mermaid
flowchart LR
  ebird["eBird / Macaulay Library<br/>exports"] -- "replace by hand" --> csv
  subgraph data["web/birds"]
    csv["observation-data/<br/>ebird-data-latest.csv<br/>ebird-media-latest.csv"]
    notes["web/field-notes/<br/>field-note-N.md"]
    config["web/src/lib/siteConfig.ts<br/>title, abstract, links"]
  end
  csv --> parse["parseEbird.ts"]
  notes --> parsen["parseFieldNotes.ts"]
  parse & parsen --> page["src/app/page.tsx"]
  config --> home
  page --> home["HomeDocument<br/>map · locations · media · field notes"]
  parse --> cl["src/app/checklist/[id]/<br/>one page per checklist"]
  home & cl --> out["web/out/ → /birds/"]

  out -. "photos, at view time" .-> ml["Macaulay Library CDN"]
  out -. "basemap, at view time" .-> carto["Carto basemap tiles"]
```

## How a reader moves around

Every page ends with the same site links, so any part of the site is one
click from any other. Links between parts are root-relative and stay in the
same tab; links to anyone else open a new one.

```mermaid
flowchart TB
  home["/ — Portfolio"]
  acad["/academic/"]
  proj["/academic/projects/…"]
  birds["/birds/"]
  check["/birds/checklist/…"]
  resume["/resume/"]
  std["/standards/"]

  home -- "a tile per project" --> proj
  home -- "birding report tile" --> birds
  home -- "Elsewhere" --> resume
  acad --> proj
  proj -- "← Academic Projects" --> acad
  birds --> check
  check -- "← location index" --> birds

  footer["site links at the foot of every page:<br/>Portfolio · Academic · Birding · Resume<br/>and the Hark web standards"]
  footer -.-> home & acad & birds & resume & std
```

## Outside the repository

| What | Where | Relationship |
|---|---|---|
| The live site | Render static site `hark-site` (project Hark, workspace Harker-Hub) | Builds `main` on every push; serves felipeharker.org and www |
| The GitHub wiki | github.com/felipeharker/hark/wiki | A copy of `wiki/`, replaced by `.github/workflows/wiki.yml` on every push to `main` that changes it |
| DNS | Porkbun | `felipeharker.org` A record → Render; `www` CNAME → `hark-site.onrender.com`; `birds` CNAME → the birding redirect service; `resume` → Porkbun's URL forwarding |
| resume.felipeharker.org | Porkbun URL forwarding | A permanent redirect to `/resume/`; nothing on Render |
| birds.felipeharker.org | Render service `hark-birding-redirect` (the old birding site) | Kept only to redirect to `/birds/` |
| resume-site-0rfl.onrender.com | Render service `hark-resume-redirect` (the old resume site) | Kept only to redirect to `/resume/` |
| `hark_portfolio`, `hark_resume`, `hark_birding` | GitHub, archived | The three repositories this one replaced; read-only, with their histories |
| `hark_system` | GitHub, archived | The old CODEBASE standards: its web standard now lives here, its Rhino / Grasshopper and repository standards in `parametric_living_standards` |
| `CODEBASE\parametric` | the private `parametric_*` repositories | The Rhino and Grasshopper work and its own standards; nothing here depends on it |
| Fonts | Google Fonts, by a `<link>` on every page (the birding app's in its `layout.tsx`) | Inter and IBM Plex Mono |
| Photos and map tiles | Macaulay Library CDN, Carto | Loaded by the birding report in the reader's browser |
