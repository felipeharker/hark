# Updating the Birding Report

The birding report is served at `/birds/` from a Next.js app in
`web/birds/web/`. Its full editing guide is
[`web/birds/user_guide.md`](../web/birds/user_guide.md); the common jobs are
below.

## New eBird data

1. Export your data from eBird and your media from the Macaulay Library.
2. Move the current `web/birds/observation-data/ebird-data-latest.csv` and
   `ebird-media-latest.csv` to `archive/` if you want to keep them, then put
   the new exports in their place, keeping the names.
3. `npm run build` in `web/birds/web`, then look at it with
   `node tools/serve.mjs` from the repository root.
4. Commit and push. Render rebuilds the whole site.

The exports are published exactly as eBird writes them — every location
name, map pin and field. Never rename, hide or filter anything in them
([decisions](../planning/decisions.md)).

## A field note

Copy `web/birds/web/field-notes/TEMPLATE.md` to `field-note-<N>.md`, with
`<N>` one more than the highest number there. Fill in the frontmatter
(`title` and `date` required; `location`, `conditions`, `links` optional)
and write the note in Markdown below it. Notes are listed newest first, by
the number in the filename.

## Title, abstract and links

All in `web/birds/web/src/lib/siteConfig.ts`, as plain constants: the title,
subtitle, byline, abstract, the eBird / Macaulay / Merlin links, and
`SITE_FAMILY`, the site links at the foot of every page.

## Before pushing

In `web/birds/web`: `npm run build` and `npm run lint` must pass. Then, from
the repository root, `node tools/check.mjs` checks every built page.
