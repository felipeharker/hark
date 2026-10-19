# Resume

The resume, served at `/resume/`: one static page that also prints as a clean
sheet. Linked from the portfolio's Elsewhere section.

## Layout

```
web/resume/
  README.md
  resume.md                   a reference copy of the text; not published, not read by anything
  site/                       published at /resume/, and nothing else
    index.html                the resume: the source of truth for its text
    assets/site.css           its narrower column and its print sheet
```

## Editing

| Want to change | Edit |
|---|---|
| Any text: contact line, education, experience, skills, references | `site/index.html` |
| A section | its `<section>` in `site/index.html`, and its entry in the contents list near the top |
| The column width or the print layout | `site/assets/site.css` |
| Anything shared — type, colour, entries, the footer | the standard: `web/standards/` |

When `site/index.html` and `resume.md` disagree, the page is right.

Run `node tools/serve.mjs` from the repository root and open
http://localhost:8000/resume/; use the browser's print preview to check the
printed sheet (Letter, default margins, headers and footers off). The print
sheet hides the contents list and the footer, collapses the text colours
toward black, and keeps each entry on one page.

## Privacy

The repository is public. Never add a street address, a phone number or a
referee's email address. The address `resume.md` used to carry, the phone
number and the referees' email addresses were taken out on 2026-10-19; the
references are names and roles only.
