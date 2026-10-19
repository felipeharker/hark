# Decisions

Why felipeharker.org is built the way it is. Newest first. Each entry says
what was decided, why, and what it replaced; reverse one by adding a new
entry, not by editing an old one.

## 2026-10-19 — The wiki is a copy of `wiki/`

**The GitHub wiki is published from `wiki/`, never edited on GitHub.**
`.github/workflows/wiki.yml` runs `tools/wiki.mjs` on every push to `main`
that changes `wiki/`; it rewrites the links for the wiki and replaces every
page there. *Why:* a guide changes in the same commit as the thing it
describes (`AGENTS.md`, rule 13), and the wiki is a separate git repository
that no commit here can touch. Keeping the pages here, and the wiki as their
copy, keeps one source. *Replaces:* pushing `wiki/` to the wiki by hand.

## 2026-10-19 — resume.felipeharker.org

**resume.felipeharker.org forwards to `/resume/`, through Porkbun.**
Porkbun's free URL forwarding sends it to `https://felipeharker.org/resume/`
with a permanent (301) redirect, over HTTP and HTTPS. *Why:* the resume was
the one redirect with only an `onrender.com` address; this gives it a short
one on the site's own domain at no cost and with no change to Render, where
a custom domain beyond the Hobby plan's two costs $0.25 a month. It is a
redirect, not a site, so "One domain, with paths" still holds.
`resume-site-0rfl.onrender.com` keeps redirecting, for old links.
*Replaces:* nothing; it adds an address.

## 2026-10-19 — The old system repositories, archived

**`hark_system` is archived.** Its web standard already lives here; its
Rhino / Grasshopper and repository standards went to
`parametric_living_standards`, in the separate parametric workspace. Its
pull request handing the web styles to this repository was closed without
merging. *Why:* each standard now lives with the work it governs, and
nothing reads `hark_system`. *Replaces:* "the rest of the CODEBASE
standards stay in `hark_system`" (One repository, below).

**Third-party material stays on disk, out of git.** It goes in a part's
`source/` or the birding report's `notebook/`, both ignored. *Why:* the
`hark_references` repository meant for it was never used, and is archived.
*Replaces:* `hark_references` as its home.

## 2026-10-19 — The open questions, settled

**The resume carries no phone number and no referees' email addresses.**
The contact line is the city and an email address; each reference is a name
and a role. *Why:* the repository and the site are public, and those details
are private. *Replaces:* the phone number in the contact line and an email
address under each referee.

**Alexandria stays out of the portfolio, and the PDFs out of the
repository.** Both entries below stand, unchanged; neither comes back now.

**The birding report shows the eBird exports exactly as they are.** Every
location name — "Home (private)" and those named by an address included —
every map pin and every field is published as eBird exports it. Nothing is
renamed, hidden or filtered, in eBird or at build time. *Why:* the report is
the eBird record, shared as it is. It is the one exception to "no street
address" (`AGENTS.md`, rule 3).

## 2026-10-19 — One repository

**The `hark` folder becomes one repository.** The portfolio, the birding
report and the resume — the three folders in `hark` — are organised into one
repository with the academic projects and the web standard, under `web/`. The
repository root holds the tools, the wiki and the planning. *Why:* one person
maintains five parts that share one design and link to each other. Separate
repositories bought no isolation and cost a copy of the stylesheet in each, a
sync to keep the copies in step, and five commits for one change to the
standard. *Replaces:* `hark_portfolio`, `hark_resume` and `hark_birding`,
which are archived.

**Built from the folder, as a new repository.** The content is what was in
the `hark` folder, standardised and reorganised, plus the tools and docs made
for it. Work that existed only elsewhere — unmerged branches and later
commits in the old repositories, and other CODEBASE repositories — is not
brought in. The history starts fresh; the old repositories keep theirs.

**Public.** *Why:* nothing in it is private once the street address is taken
out of the resume's Markdown copy, and the birding notebook (personal notes,
third-party field guides) stays on disk, out of git. Every other CODEBASE
repository stays private, so no page links one.

**One domain, with paths.** `/` portfolio, `/academic/`, `/birds/`,
`/resume/`, `/standards/`, all from one Render static site. *Why:* one
deploy, no DNS record per site, and links between parts that are just paths.
birds.felipeharker.org and resume-site-0rfl.onrender.com redirect to their
paths. *Replaces:* those addresses as separate sites, and the planned
academic site on its own `onrender.com` address.

**The academic projects are their own part.** `/academic/` holds the three
University of Houston projects that were pages of the portfolio. *Why:* the
portfolio becomes the front page — a row for each body of work, About, and
how to get in touch — with no pages of its own.

**Alexandria is out of the portfolio, for now.** Its row and links are
removed. *Why:* it has its own site and will be linked from there when it
returns.

**PDFs are out of the repository, for now.** Board sets are ignored (`*.pdf`)
and every link to one is removed; the files stay on disk in
`web/academic/source/`. *Why:* they were most of the repository's size, and
nothing on the site depends on them.

**The web standard lives here, as one stylesheet with no copies.**
`web/standards/site/hark.css`, linked by every page at `/standards/hark.css`,
with docs, a specimen page and `tools/check.mjs`. The birding app copies it
in at build time. *Why:* the standard and the pages it governs change
together, in one commit. It was built from the three sites' own stylesheets:
the components they shared became one set (masthead, work list, entries,
plates, definition grid, disclosures, controls, colophon); four names for the
label/value grid became `.facts`; three separator classes became `.sep`; two
back links became `.backlink`. *Replaces:* the copy of the tokens in each
site, and the birding report's `/design-standards` page. The rest of the
CODEBASE standards stay in `hark_system`.

**Links between parts open in the same tab.** Root-relative, same tab; links
to anyone else open a new tab. *Why:* it is one site, and moving around it is
navigation.
