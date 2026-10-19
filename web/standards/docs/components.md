# Components

Every class [`site/hark.css`](../site/hark.css) defines, in the order the
stylesheet defines them, with the markup it expects. Each one is rendered on
the specimen page, `/standards/` ([`site/index.html`](../site/index.html)).

A page uses these classes as written. If a part of the site needs something
none of them does, it goes in that part's own stylesheet — and if a second
part then needs it, it moves here.

`node tools/check.mjs` fails if a class in the stylesheet is missing from
this page.

## Page frame

| Class | What it is | Used on |
|---|---|---|
| `.doc` | The single centred column a page sits inside. One per page, on `<article>`. | Every page |
| `.visually-hidden` | Text for screen readers only — a label for an input that shows an icon instead. | Birds |

## Masthead

The block at the top of a page: kicker, title, subtitle, byline, dateline.
Only the title is required; omit any other line rather than leave it empty.

```html
<header>
  <p class="kicker">Portfolio</p>
  <h1 class="title">Felipe E. Harker</h1>
  <p class="subtitle">Computational design, architecture, and the tools built alongside them</p>
  <p class="dateline">
    <span>Houston, TX</span>
    <span class="sep" aria-hidden="true">|</span>
    <a href="mailto:fehark@gmail.com">fehark@gmail.com</a>
  </p>
</header>
```

| Class | What it is |
|---|---|
| `.kicker` | Uppercase eyebrow above the title: what kind of page this is. |
| `.title` | The page's `<h1>`. One per page. |
| `.subtitle` | One line under the title saying what the subject is. |
| `.byline` | The author, under the subtitle, where the page needs one. |
| `.dateline` | Recorded values — place, address, date — in mono, separated by `.sep` spans. Stacks one per line on a phone. |
| `.masthead--left` | On `<header>`: left-align the block. For a record: a resume, a checklist. |
| `.masthead--record` | With `.masthead--left`, for a record whose title names a thing rather than the person: a smaller title, and no space under the dateline so a `.facts` grid can follow directly. |

The front page of a part of the site uses the plain centred masthead.

## Abstract

```html
<div class="abstract">
  <p class="abstract-label">Abstract</p>
  <p>…</p>
</div>
```

| Class | What it is |
|---|---|
| `.abstract` | One labelled paragraph under the masthead, centred at the reading measure. |
| `.abstract-label` | Its eyebrow label. |

## Contents

```html
<nav aria-label="Contents">
  <p class="toc-label">Contents</p>
  <ul class="toc">
    <li><a href="#sec-map">Map</a></li>
  </ul>
</nav>
```

| Class | What it is |
|---|---|
| `.toc-label` | The eyebrow above the index. |
| `.toc` | The index: one entry per line. |
| `.toc--inline` | With `.toc`: entries on one wrapping line. For a short index of one-word entries (the resume). |

Each entry's text is the section heading's text, exactly. Section ids are
`sec-<name>`.

## Sections

```html
<section class="section" id="sec-about">
  <h2 class="section-heading">About</h2>
  …
</section>
```

| Class | What it is |
|---|---|
| `.section` | A top-level block, opened by a strong hairline. |
| `.section-heading` | Its `<h2>`. A plain name, never numbered. |

## Body copy

| Class | What it is |
|---|---|
| `.body-text` | A paragraph, capped at the reading measure. |
| `.list` | A bulleted list in prose. |
| `.label` | An uppercase eyebrow above any block. |
| `.caption` | Under a figure or table, when it says something the content does not. Sentence case, unnumbered. |
| `.data` | A run of recorded data inside prose: mono, tabular figures. |
| `.empty` | The line shown where a list has nothing in it ("No field notes yet."). |
| `.sep` | The separator between items on one line. Always `aria-hidden="true"`. Never type a pipe or slash into the text instead. |

## Rules

| Class | What it is |
|---|---|
| `.rule` | `<hr>` for a major division: under a masthead. Strong hairline. |
| `.rule-soft` | `<hr>` for a minor division within a block. Soft hairline. |

## Tables

```html
<div class="table-scroll">
  <table class="table">
    <thead><tr><th>Species</th><th class="num-cell">Count</th></tr></thead>
    <tbody><tr><td>Killdeer</td><td class="num-cell">2</td></tr></tbody>
  </table>
</div>
```

| Class | What it is |
|---|---|
| `.table` | A data table: horizontal hairlines only. |
| `.num-cell` | On a `<th>` and its `<td>`s: a right-aligned numeric column. Cells are mono. |
| `.table-scroll` | Wrapper that lets a wide table scroll inside itself. |

## Definition grid

```html
<dl class="facts">
  <dt>Languages</dt>
  <dd>English (Native), Portuguese (Native), Spanish (Proficient)</dd>
</dl>
```

| Class | What it is |
|---|---|
| `.facts` | A `<dl>` of label / value pairs. Values are prose. Stacks on a phone. |
| `.facts--data` | With `.facts`: the values are recorded data, so mono, and the grid is denser. |

## Disclosure rows

A long list is a list of native `<details>` rows: the page starts as an
index and each row opens in place.

```html
<details class="disclosure">
  <summary>
    <span class="disclosure-heading">
      <span class="disclosure-title">Sheldon Lake State Park</span>
      <span class="disclosure-hint">
        <span class="hint-closed">Show</span><span class="hint-open">Hide</span>
      </span>
    </span>
  </summary>
  <div class="disclosure-body">
    <p class="disclosure-meta"><span>Harris, US-TX</span><span>42 observations</span></p>
    <div class="detail-group">…</div>
    <div class="detail-group">…</div>
  </div>
</details>
```

| Class | What it is |
|---|---|
| `.disclosure` | The `<details>` row. |
| `.disclosure-heading` | Inside `<summary>`: title left, hint right. |
| `.disclosure-hint` | "Show" / "Hide" — names the action, never a count. |
| `.hint-closed` | The word shown while the row is closed. |
| `.hint-open` | The word shown while it is open. CSS picks; no script needed. |
| `.disclosure-body` | Everything the row reveals. |
| `.disclosure-meta` | The row's line of recorded values, under its heading. |
| `.detail-group` | One block in an open row; blocks are spaced, never ruled. |

`.disclosure-title` carries no style of its own; it is the hook a page uses
to mark a selected row (the birding report sets the open location's title in
the accent).

## Controls

| Class | What it is |
|---|---|
| `.btn` | A text button: small caps in the accent, inside a hairline. |
| `.tag` | A small accent pill for something the reader should notice ("Incomplete"). |
| `.tag--neutral` | With `.tag`: a grey pill that merely classifies (a breeding code). |
| `.field` | Wrapper for a text input with an icon inside it. |
| `.field-icon` | The icon, inside the field on the left. |
| `.input` | The text input. |
| `.toolbar` | A row with a caption on the left and a control on the right. |

```html
<div class="field">
  <label for="filter" class="visually-hidden">Filter locations by name</label>
  <span class="field-icon">…svg…</span>
  <input id="filter" class="input" placeholder="Filter by name…">
</div>
```

## Work list

One project or site per row: a cover on the left, its facts on the right.
Every row has the same seven parts in the same order; a row without one of
them omits the element.

```html
<ul class="work-list">
  <li class="work">
    <a class="work-cover" href="…" aria-hidden="true" tabindex="-1">
      <img src="assets/covers/name.jpg" alt="">
    </a>
    <div class="work-facts">
      <h3 class="work-title"><a href="…">Living Outside the Box</a></h3>
      <hr class="rule-soft">
      <p class="work-summary">One sentence on what it is.</p>
      <p class="work-stack">
        <span>Rio de Janeiro, Brazil</span>
        <span class="sep" aria-hidden="true">/</span>
        <span>Residential</span>
      </p>
      <p class="work-kind">Academic</p>
      <a class="work-link" href="…">Project Page</a>
    </div>
  </li>
</ul>
```

| Class | What it is |
|---|---|
| `.work-list` | The `<ul>`. |
| `.work` | One row. Hovering anywhere on it lights the cover and the title together. |
| `.work-cover` | The cover frame: fixed ratio, hairline border. It duplicates the title link, so it is `aria-hidden="true" tabindex="-1"` and its image has `alt=""`. |
| `.work-cover-placeholder` | Inside `.work-cover` until there is an image: names the project and says the cover is pending. |
| `.work-cover-placeholder .name` | The project's name in the placeholder. |
| `.work-cover-placeholder .note` | "Cover pending". |
| `.work-title` | The row's `<h3>` and its link. |
| `.work-summary` | One sentence on what it is. |
| `.work-stack` | What it is made of or where it is: literals, mono, separated by `.sep`. |
| `.work-kind` | What kind of work: Academic, Professional, Personal. |
| `.work-link` | The row's address: "Project Page", "Project Site". |

`.work-facts` is the right-hand column; it carries no style of its own.

## Entries

```html
<div class="entry">
  <h3 class="entry-title">Bachelor of Architecture</h3>
  <p class="entry-org">University of Houston, Hines College of Architecture and Design</p>
  <p class="entry-meta"><span>Houston, TX</span><span class="sep" aria-hidden="true">|</span><span>2024</span></p>
  <ul class="list">…</ul>
</div>
```

| Class | What it is |
|---|---|
| `.entry` | One job, school or dated record; entries are separated by soft hairlines. |
| `.entry-title` | The role or degree. |
| `.entry-org` | The employer or institution. |
| `.entry-meta` | Place and dates, mono, tabular figures. |

## Plates

```html
<figure class="plate">
  <img src="…" alt="The box" loading="lazy">
  <figcaption>
    <h3 class="plate-title">The Box</h3>
    <p class="body-text">…</p>
  </figcaption>
</figure>
```

| Class | What it is |
|---|---|
| `.plate` | A full-width drawing or render, with its title and text under it. |
| `.plate-lead` | With `.plate`: the plate between the masthead and the first section. |
| `.plate-title` | The plate's `<h3>`. |

## References

```html
<ul class="reference-list">
  <li>
    <a href="https://github.com/felipeharker">GitHub</a>
    <span class="desc">Source for the software on this page.</span>
  </li>
  <li>
    <span class="name">A Referee</span>
    <span class="desc">Their role and institution</span>
    <a class="addr" href="mailto:name@example.edu">name@example.edu</a>
  </li>
</ul>
```

| Class | What it is |
|---|---|
| `.reference-list` | A plain list of places to go, at the foot of a page. Never numbered, never cited by marker. |
| `.reference-list .name` | An entry's heading when it is a person, not a link. |
| `.desc` | The entry's line of description. |
| `.path` | On the heading link, when the heading is itself an address (an email): mono. |
| `.addr` | A secondary address under the description: how to reach the person. Mono. |

## Back link

```html
<a class="backlink" href="../">&larr; Academic Projects</a>
```

| Class | What it is |
|---|---|
| `.backlink` | Above the masthead of an interior page: the way up to the page that lists it. Its text names that page. |

## Colophon

The foot of every page: the site links — every part of felipeharker.org, so a
reader can always get from one to any other — then a line on how the page was
made. It is the last thing inside `.doc`.

```html
<footer class="colophon">
  <nav class="site-links" aria-label="Felipe E. Harker">
    <span class="site-links-owner">Felipe E. Harker</span>
    <a href="/" aria-current="page">Portfolio</a>
    <a href="/academic/">Academic</a>
    <a href="/birds/">Birding</a>
    <a href="/resume/">Resume</a>
  </nav>
  <p>Set in Inter and IBM Plex Mono. Static HTML; no framework and no JavaScript.
     Built to the <a href="/standards/">Hark web standards</a>.</p>
</footer>
```

| Class | What it is |
|---|---|
| `.colophon` | The footer block: a strong hairline, then small muted lines. |
| `.site-links` | The row of links to every part of the site, in the order of [`tools/sites.mjs`](../../../tools/sites.mjs). |
| `.site-links-owner` | The name that leads the row. |

The link to the part the reader is in carries `aria-current="page"` and is
set in text colour. `tools/check.mjs` fails if a page's site links miss a
part of the site, or if the page does not link `/standards/`.
