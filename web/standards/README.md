# Standards

The web design and development standards for every page on felipeharker.org,
served at `/standards/`: one shared stylesheet, the rules behind it, and a
page that renders all of it.

## What is here

| Path | What it is |
|---|---|
| [`site/hark.css`](site/hark.css) | **The shared stylesheet**, published at `/standards/hark.css`. Tokens first, then every shared component, in numbered sections. Every page links it; nothing copies it. |
| [`site/index.html`](site/index.html) | **The specimen page**, `/standards/`: every token and component, rendered by `hark.css` itself. |
| [`docs/design.md`](docs/design.md) | The design rules, and every token: colour, type, space, shape, breakpoints. |
| [`docs/components.md`](docs/components.md) | Every shared class: what it is for and the markup it expects. |
| [`docs/writing.md`](docs/writing.md) | Headings, prose, recorded values, captions, links, images, privacy. |
| [`docs/development.md`](docs/development.md) | Stack, folders, stylesheets, page structure, links, naming, accessibility, checking, deploying. |
| [`templates/page.html`](templates/page.html) | A blank page that already follows the standard. |

Read the docs in that order: design, components, writing, development.

## The design, in one paragraph

A quiet, modern document. Inter carries every heading and every line of
prose; IBM Plex Mono is reserved for recorded values. Structure comes from
hairline rules and whitespace, not from boxes or shadows. Three weights and
nothing bolder than 600. One deep red, meaning "interactive or selected".
Nothing the reader sees is numbered.

## Changing the standard

Edit `site/hark.css`, document any new token or class, look at `/standards/`
and every page the change touches, then run `node tools/check.mjs` from the
repository root. The change reaches every page at once — there are no copies
to update. The full steps are in
[`docs/development.md`](docs/development.md#changing-the-standard) and
[`wiki/Changing-the-Standard.md`](../../wiki/Changing-the-Standard.md).

## History

The standard began as the design shared by three separate sites — the
portfolio, the resume and the birding report — each keeping its own copy of
the same tokens, and documented on the birding report's `/design-standards`
page. On 2026-10-19 it was gathered here, beside the pages it governs, as one
stylesheet with no copies (`planning/decisions.md`).
