# Design

How every page on felipeharker.org looks, and why. The values here are the
tokens at the top of [`site/hark.css`](../site/hark.css); to see them
rendered, open `/standards/` ([`site/index.html`](../site/index.html)).

## The design in one paragraph

A quiet, modern document. A neutral sans (Inter) carries every heading and
every line of prose; a monospace (IBM Plex Mono) is reserved for recorded
values — a date, a place, a count, an address — so a reader can tell at a
glance that something is a literal rather than a sentence about one.
Structure comes from hairline rules and whitespace, never from heavy bars,
boxes or shadows. Nothing is set bolder than 600. One deep red is the only
accent, and it means "interactive or selected" — nothing else.

## The rules

These hold on every page. A page that breaks one is wrong, however good it
looks.

- **Two faces, two jobs.** Inter for anything a person wrote; IBM Plex Mono
  for anything read off a record. A stack line, a dateline, a URL and a table
  of counts are mono. A heading, a summary and a back link are not.
- **Three weights, no bold.** 400 for reading, 500 for noticing, 600 for
  headings. Never 700.
- **Hairlines, not boxes.** Both rule colours are 1px. A section is set off
  by whitespace and one hairline, never by a tinted panel, a border box or a
  shadow.
- **One accent, one meaning.** The deep red marks what can be clicked or what
  is selected. It is never used for emphasis, decoration or a heading.
- **Nothing the reader sees is numbered.** No numbered sections, figures,
  captions or references. Order on the page is the order; a heading's name is
  the way to refer to it. (Stylesheet sections are numbered so a rule can be
  found — that numbering is for the person editing, not the reader.)
- **Front pages centre, records align left.** The front page of a part of
  the site is the front of a publication and centres its masthead. A resume,
  a checklist or any page that is a record of something is left-aligned.
- **Tokens first.** A rule never contains a hex colour or a pixel size that a
  token already names. A value that is needed and has no token gets a token.
- **Quiet motion.** One transition, 140ms ease, on colour and border changes
  only. Nothing slides, fades in on scroll or bounces, and all of it switches
  off for a reader who asks for reduced motion.

## Colour

| Token | Value | Used for |
|---|---|---|
| `--color-bg` | `#ffffff` | The page. |
| `--color-surface` | `#faf9f7` | A cover placeholder; a hovered map control. Never a region of the page. |
| `--color-surface-hover` | `#f4f2ef` | Inline code; a neutral tag. |
| `--color-text` | `#1c1a19` | Headings and titles. 17.3:1 on white. |
| `--color-text-soft` | `#4a4643` | Prose: paragraphs, summaries, lists. 9.3:1. |
| `--color-text-mute` | `#7a746e` | Labels, captions, recorded values. 4.6:1 — the lightest text allowed; nothing lighter is ever set as text. |
| `--color-accent` | `#7c1405` | Links, controls, selected state. 10.7:1. |
| `--color-accent-hover` | accent mixed 72% with black | A hovered link or control. Derived — change the accent, not this. |
| `--color-accent-wash` | accent mixed 5% with white | The ground behind a hovered button, a focus ring, an accent tag. Derived. |
| `--color-selection` | `#ffe0d9` | Selected text. |
| `--color-rule` | `#eae7e3` | Hairlines between rows inside a section. |
| `--color-rule-strong` | `#d5d0ca` | Hairlines between sections; separators. |

To re-accent the whole site, change `--color-accent` alone; both derived
tokens follow.

## Type

**Families.** `--font-body` (Inter) and `--font-mono` (IBM Plex Mono). Each
is written as `var(--font-sans, 'Inter')` / `var(--font-mono-face, 'IBM Plex
Mono')`, so one token works for both ways a site loads fonts:

- A **static page** loads both from Google Fonts with the `<link>` in
  [`templates/page.html`](../templates/page.html). `--font-sans` is not
  defined, so the token falls through to the family name.
- The **birding app** loads them with `next/font`, which defines
  `--font-sans` and `--font-mono-face`. Its classes must go on `<html>`, not
  `<body>`: `:root` is `<html>`, and a variable defined lower down the tree is
  invisible to it.

**Weights.**

| Token | Value | Used for |
|---|---|---|
| `--weight-regular` | 400 | Everything read at length. |
| `--weight-medium` | 500 | Noticed, not a heading: labels, table headers, an employer, a reference's name, a button. |
| `--weight-strong` | 600 | Titles and headings. The heaviest weight anywhere. |

**Scale.** Smaller than a serif would need: Inter's large x-height reads
bigger per pixel. Below 640px the display sizes step down.

| Token | Desktop | Phone | Used for |
|---|---|---|---|
| `--size-title` | 34px | 27px | The page title. |
| `--size-title-record` | 27px | 22px | The title of a record page whose title names a thing (a checklist's location). |
| `--size-section` | 23px | 20px | Section headings. |
| `--size-subtitle` | 17px | 16px | The line under the page title. |
| `--size-subsection` | 17px | 16px | Row titles: a project, a job, a plate, a disclosure. |
| `--size-body` | 16px | 16px | Paragraphs. |
| `--size-abstract` | 16px | 16px | The abstract paragraph. |
| `--size-table` | 15px | 15px | Lists, table cells, summaries, a byline. |
| `--size-data` | 13px | 13px | Monospace recorded values. |
| `--size-caption` | 13px | 13px | Captions, descriptions, the colophon. |
| `--size-fine` | 12px | 12px | The smallest secondary text: a scientific name, a photo caption. |
| `--size-label` | 11px | 11px | Uppercase eyebrow labels, table headers, tags, buttons. |

**Tracking.**

| Token | Value | Used for |
|---|---|---|
| `--track-tight` | -0.02em | Titles and headings — Inter sets loose at display sizes. |
| `--track-body` | -0.006em | Running prose. |
| `--track-label` | 0.08em | Uppercase labels — small caps need opening up. |

**Line height** is set per role rather than tokenised: 1.15 for the title,
1.25–1.35 for headings, 1.6 for the body, 1.7 for reading paragraphs.

## Space

Every margin, padding and gap is a step on this scale.

| Token | Value |
|---|---|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 18px |
| `--space-5` | 26px |
| `--space-6` | 40px |
| `--space-7` | 56px |

Between sections: `--space-7` above the hairline, `--space-5` below it.
Between rows inside a section: `--space-5` or `--space-6`, split around a
`--color-rule` hairline.

## Shape and measure

| Token | Value | Used for |
|---|---|---|
| `--radius-sm` | 4px | Controls, covers, thumbnails, code. Text and tables are never rounded. |
| `--radius-md` | 8px | A large framed object: the map. |
| `--measure` | 1000px | The document column. The resume narrows it to 820px — a page with no wide media reads better narrow. |
| `--measure-text` | 70ch | Running prose inside the column. |
| `--doc-pad-top` | 80px (44px phone) | Headroom above the masthead. |
| `--doc-pad-bottom` | 120px (80px phone) | Footroom below the colophon. |
| `--doc-pad-x` | 40px (24px phone) | The gutter to the window edge. |
| `--work-cover-ratio` | 3 / 2 (16 / 9 below 860px) | A work-list cover. |
| `--work-gap` | `--space-6` | Between a cover and its facts. |
| `--transition` | 140ms ease | Every transition. |

## Breakpoints

| Width | What changes |
|---|---|
| 860px | The work list stacks: cover above facts, cover at 16:9. |
| 640px | Display type steps down; the page frame tightens; datelines stack one item per line; definition grids put the label above the value; table columns close up. |

There are no other breakpoints. A part's own stylesheet uses these two
widths too.
