# Editing the Portfolio

The portfolio is the front of the site, `/`: one page, `web/portfolio/site/index.html`.
Its README is [`web/portfolio/README.md`](../web/portfolio/README.md).

## Common changes

| Change | Where |
|---|---|
| The name, subtitle, location or email at the top | the masthead at the top of `site/index.html` |
| A Work row | its `<li class="work">` in `site/index.html` |
| The About text | the About section of `site/index.html` |
| The resume link, GitHub, LinkedIn, email | the Elsewhere section of `site/index.html` |

The pages the rows link to are their own sites, each in its own repository:
the academic projects (`hark_academic`, https://hark-academic.onrender.com/),
the birding report (`hark_birding`, https://hark-birding.onrender.com/) and
the resume (`hark_resume`, https://hark-resume.onrender.com/). Links to them
are absolute and open in the same tab.

## Adding a row

Copy one `<li class="work">` block in `site/index.html`. Every row carries
the same parts in the same order — cover, title, hairline, summary, stack,
kind, link — and a row without one of them omits the element.

Each academic project has its own row, linking its page,
`https://hark-academic.onrender.com/projects/<slug>.html`; a new project gets
one as part of adding it (`hark_academic`'s README, "Adding a project").

## Replacing a placeholder cover

For now every row's cover is a placeholder (`planning/decisions.md`).
Inside the row's `<a class="work-cover">`, replace the whole
`<span class="work-cover-placeholder">` with
`<img src="assets/covers/<name>.jpg" alt="">`, using a 3:2 JPEG at 1500 x
1000 or smaller. An academic project's row uses that project's own cover,
`<img src="https://hark-academic.onrender.com/assets/covers/<slug>.jpg" alt="">`,
not a copy. Never
stand in a stock or invented image.

## Checking

`node tools/serve.mjs`, look at the page at full width and at 390 px, then
`node tools/check.mjs`.
