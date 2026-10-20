# Academic

The academic architecture and urban design projects, served at `/academic/`:
three projects from the Bachelor of Architecture at the University of
Houston, a page each. Each project also has a tile of its own on the
portfolio's front page, which links its page.

## Layout

```
web/academic/
  README.md
  source/                     working files, git-ignored (see its README)
  site/                       published at /academic/, and nothing else
    index.html                one row per project
    projects/<slug>.html      one page per project
    assets/
      covers/<slug>.jpg       3:2 covers, 1500 x 1000 or smaller
      projects/<slug>/        the board images
```

## Projects

| Page | Images | Working files in `source/` |
|---|---|---|
| `projects/living-outside-the-box.html` | `lotb-01` … `lotb-13` | the board-set PDF; the Rhino model (144 MB) |
| `projects/dead-mall-fall.html` | `dmf-01` … `dmf-05`, `dmf-banner` | the board-set PDF |
| `projects/collingsworth-marketplace.html` | `cmp-01` … `cmp-07` | the board-set PDF |

The board-set PDFs are not published for now, and the pages do not link
them (`planning/decisions.md`).

## Covers

One file per project, named after its page (`living-outside-the-box.jpg` for
`projects/living-outside-the-box.html`), cropped to 3:2 and saved as JPEG at
1500×1000 or smaller. The frame holds the ratio: an image that does not match
it is cropped to fit rather than letterboxed, so crop it yourself first. The
three covers were cropped to 3:2 from the 16:9 covers of an earlier
portfolio.

For now no page shows them: every tile, here and on the front page, is a
`.work-cover-placeholder` (`planning/decisions.md`). The files stay, so
bringing a cover back is the `<img>` alone — `assets/covers/<slug>.jpg` here,
`/academic/assets/covers/<slug>.jpg` on the front page.

## Adding a project

See [`wiki/Adding-an-Academic-Project.md`](../../wiki/Adding-an-Academic-Project.md).
There is no stylesheet of its own: everything on these pages is the shared
standard, `/standards/hark.css`.
