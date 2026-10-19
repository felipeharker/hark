# Deploying

felipeharker.org is one Render static site, built from this repository's
`main` branch. Every push to `main` deploys.

## What Render runs

| Setting | Value |
|---|---|
| Service | `hark-site` — static site, workspace Harker-Hub, https://hark-site.onrender.com |
| Repository / branch | `felipeharker/hark`, `main`, auto-deploy on |
| Build command | `node tools/build.mjs` |
| Publish directory | `dist` |
| Environment | `NODE_VERSION=22` |
| Custom domains | `felipeharker.org`, `www.felipeharker.org` |

The same settings are recorded in [`render.yaml`](../render.yaml). Until that
file is synced as a Blueprint, the dashboard is what counts; keep them the
same.

`tools/build.mjs` runs `npm ci && npm run build` in `web/birds/web`, then
copies each part's published folder to its path in `dist/`: the portfolio to
`/`, academic to `/academic/`, the birding build to `/birds/`, the resume to
`/resume/`, the standards to `/standards/`.

## Before you push

```bash
node tools/check.mjs
node tools/build.mjs && node tools/serve.mjs --dist
```

The second line shows exactly what will be published.

## Domains and the old addresses

- **felipeharker.org** and **www** are the `hark-site` service's custom domains.
  DNS is at Porkbun: the apex is an A record to Render's `216.24.57.1`, and
  `www` is a CNAME to `hark-site.onrender.com`.
- **birds.felipeharker.org** used to be the birding report's own site. The old
  "Birding Website" service keeps that domain only to redirect it: its
  Redirects/Rewrites rule sends Source `/*` to Destination
  `https://felipeharker.org/birds/*`.
- **resume-site-0rfl.onrender.com**, the resume's old address, redirects the
  same way to `https://felipeharker.org/resume/*` from the old "Resume
  Website" service.
- Render serves a file that exists before it applies a redirect rule, and
  refuses to publish an empty folder. So each old service's build command
  writes one page, `empty/index.html`, that forwards its homepage to the new
  path, and publishes `empty`; every other path falls through to the
  redirect rule.
- The old "Portfolio Website" and "Portfolio Site" services are suspended.

The cut-over from the old per-site services is tracked in
[`planning/roadmap.md`](../planning/roadmap.md).
