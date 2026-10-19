# Editing the Resume

The resume is one page, `/resume/`, from `web/resume/site/index.html` — the
only source of its text. See [`web/resume/README.md`](../web/resume/README.md).

## Changing it

- **Text**: edit `site/index.html`. Each job or school is one
  `<div class="entry">`: title, organisation, a line with place and dates,
  then a list of what was done.
- **A new section**: add a `<section class="section" id="sec-<name>">` and
  its entry in the contents list near the top, with the same name.
- **Layout or print**: `site/assets/site.css` holds only the print sheet;
  everything else, on screen, is the shared standard.

## Checking the printed sheet

Serve the site (`node tools/serve.mjs`), open http://localhost:8000/resume/
and use the browser's print preview: Letter, default margins, headers and
footers off. The running head, the contents list, the rule under the
masthead and the footer disappear on paper, the label column narrows to a
quarter of the sheet, the text darkens, and no entry breaks across a page.

## Privacy

Never add a street address, a phone number or a referee's email address: the
references are names and roles only ([decisions](../planning/decisions.md)).
The employer's name is a decision still open
([roadmap](../planning/roadmap.md)) — leave it as it is unless you are
deciding it.
