# Deploying

felipeharker.org is one Render static site, built from this repository's
`main` branch. Every push to `main` deploys. The academic projects, the
birding report and the resume are their own Render static sites, each
deployed from its own repository's `main` the same way.

## What Render runs

| Setting | Value |
|---|---|
| Service | `hark-site` — static site in the Render project **Hark** (workspace Harker-Hub), https://hark-site.onrender.com |
| Repository / branch | `felipeharker/hark_web`, `main`, auto-deploy on |
| Build command | `node tools/build.mjs` |
| Publish directory | `dist` |
| Environment | `NODE_VERSION=22` |
| Custom domains | `felipeharker.org`, `www.felipeharker.org` |
| Redirects | `/academic`, `/academic/*`, `/birds`, `/birds/*`, `/resume`, `/resume/*` → the new sites (below) |

The same settings are recorded in [`render.yaml`](../render.yaml). Until that
file is synced as a Blueprint, the dashboard is what counts; keep them the
same.

`tools/build.mjs` copies each part's published folder to its path in
`dist/`: the portfolio to `/`, the standards to `/standards/`. Last, it adds
a fingerprint of each stylesheet's contents to every page's link to it
(`/standards/hark.css?v=3e228ce5fe`). Render's CDN caches a page and its
stylesheet separately for up to five minutes; with the fingerprint, a page
from a new deploy never gets the stylesheet from the last one. The other
sites link the stylesheet by its full address, without a fingerprint, so for
those few minutes after a deploy they may still get the last one.

Nothing in the build needs the network: no packages, fonts or data are
downloaded, so a push to `main` that passes `node tools/build.mjs` locally
deploys.

## The other sites

| Service | Repository | Build command | Publish directory | Address |
|---|---|---|---|---|
| `hark-academic` | `felipeharker/hark_academic` | none | `site` | https://hark-academic.onrender.com/ |
| `hark-birding` | `felipeharker/hark_birding` | `cd web && npm ci && npm run build` (`NODE_VERSION=22`) | `web/out` | https://hark-birding.onrender.com/ |
| `hark-resume` | `felipeharker/hark_resume` | none | `site` | https://hark-resume.onrender.com/ |

All three are in the Render project **Hark**, with auto-deploy on and their
free `onrender.com` addresses; each repository's `render.yaml` records its
settings. The birding build fetches the shared stylesheet from
felipeharker.org, so a change to the standard reaches the report on its next
deploy: push to `hark_birding`, or deploy it by hand on Render.

## Before you push

```bash
node tools/check.mjs
node tools/build.mjs && node tools/serve.mjs --dist
```

The second line shows exactly what will be published.

## Domains and the old addresses

- **felipeharker.org** and **www** are the `hark-site` service's custom domains.
  DNS is at Porkbun: the apex is an A record to Render's `216.24.57.1`, `www`
  is a CNAME to `hark-site.onrender.com`, and `birds` a CNAME to
  `hark-ornithology.onrender.com`, the birding redirect service. `www`
  redirects to felipeharker.org.
- **felipeharker.org/academic/, /birds/ and /resume/** held those sites until
  2026-10-20. `hark-site`'s Redirects/Rewrites rules send each of them, path
  and all, to the same path on the new site: `/birds/checklist/S123/` →
  `https://hark-birding.onrender.com/checklist/S123/`. The rules without a
  trailing slash catch `/academic`, `/birds` and `/resume` themselves.
- **resume.felipeharker.org** and **academic.felipeharker.org** are Porkbun
  URL forwarding, not Render: permanent (301) redirects, over HTTP and HTTPS,
  to `https://hark-resume.onrender.com/` and
  `https://hark-academic.onrender.com/`, with the path not carried over and
  no wildcard. Porkbun keeps their DNS records (to `uixie.porkbun.com`) and
  certificates. Change them under the domain's URL Forwarding in Porkbun.
- **birds.felipeharker.org** used to be the birding report's own site. The
  `hark-birding-redirect` service keeps that domain only to redirect it: its
  Redirects/Rewrites rule sends Source `/*` to Destination
  `https://hark-birding.onrender.com/*`.
- **resume-site-0rfl.onrender.com**, the resume's first address, still works
  for old links: it redirects the same way to
  `https://hark-resume.onrender.com/*` from the `hark-resume-redirect`
  service.
- Render serves a file that exists before it applies a redirect rule, and
  refuses to publish an empty folder. So each old service's build command
  writes one page, `empty/index.html`, that forwards its homepage to the new
  site, and publishes `empty`; every other path falls through to the
  redirect rule.
- The two redirect services were built from `hark_birding` and `hark_resume`,
  now archived as `hark_birding_archive` and `hark_resume_archive`. They
  never need to build again; the new `hark_birding` and `hark_resume` are
  different repositories.

The Render project **Hark** holds `hark-site`, `hark-academic`,
`hark-birding`, `hark-resume`, the two redirect services and `anna-grades`, a
separate small site.

The move to four sites is tracked in
[`planning/roadmap.md`](../planning/roadmap.md).
