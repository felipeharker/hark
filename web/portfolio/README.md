# Portfolio

The front of felipeharker.org, served at `/`: one page. It introduces the
work, links the other parts of the site — the academic projects, the birding
report, the resume — and says how to get in touch.

## Layout

```
web/portfolio/
  README.md
  site/                       published at /, and nothing else
    index.html                Work, About, Elsewhere
    assets/
      covers/academic-projects.jpg   the Academic Projects row's cover, 3:2
```

## The page

| Section | What it holds |
|---|---|
| Work | a row for the academic projects (`/academic/`) and one for the birding report (`/birds/`; cover pending) |
| About | the biography |
| Elsewhere | the resume (`/resume/`), GitHub, LinkedIn, email |

Alexandria is left out for now, by decision — see `planning/decisions.md`.

## Editing

| Want to change | Edit |
|---|---|
| A row, the About text, Elsewhere | `site/index.html` (the comment at its top says how to add a row or a cover) |
| A cover | `site/assets/covers/<name>.jpg`: a 3:2 JPEG, 1500 x 1000 or smaller |
| Anything shared — type, colour, the work list, the footer | the standard: `web/standards/` |

There is no stylesheet of its own: everything on the page is the shared
standard, `/standards/hark.css`.

Run `node tools/serve.mjs` from the repository root to see it at
http://localhost:8000/, and `node tools/check.mjs` before committing.

## Design

The work list's layout — large cover left, facts right, a hairline under
each title — is carried over from the previous portfolio; its drop shadows,
hover lift, orange accent, serif body face and fixed sidebar are not. It is a
shared component of the standard, used by `/academic/` too.
