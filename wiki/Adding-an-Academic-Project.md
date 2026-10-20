# Adding an Academic Project

Academic projects are served at `/academic/`, from `web/academic/site/`. See
[`web/academic/README.md`](../web/academic/README.md) for what is there now.

1. **The page.** Copy `site/projects/living-outside-the-box.html` to
   `site/projects/<slug>.html`. Replace the title, kicker, subtitle,
   dateline, description and every section. Keep the running head, the back
   link (`← Academic Projects`) and the colophon as they are, with
   `aria-current="page"` on Academic in both lists of links.
2. **The images.** Board images go in `site/assets/projects/<slug>/`, named
   with a short abbreviation of the project and two digits in page order —
   `lotb-03.jpg` — as JPEG, 2000 px on the long edge or smaller. Each `<img>`
   gets an `alt`, and `loading="lazy"` unless it is the lead plate.
3. **The cover.** Crop the strongest image to 3:2, 1500 x 1000 or smaller, as
   `site/assets/covers/<slug>.jpg`. For now every tile shows a
   `.work-cover-placeholder` instead (`planning/decisions.md`), so the new
   tiles do too, naming the project; the file waits for covers to return.
4. **The tile.** Copy one `<li class="work">` in `site/index.html` and fill in
   the title, one-sentence summary, the stack (place / kind of work) and both
   links. Update the abstract above the list if it counts the projects.
5. **The portfolio tile.** Every academic project has a tile of its own on
   the front page too. Copy one academic `<li class="work">` in
   `web/portfolio/site/index.html`, with the same title, summary and stack
   as on `/academic/`, `Academic` as its kind, and root-relative links to
   its page, `/academic/projects/<slug>.html`. When covers return, its cover
   is `/academic/assets/covers/<slug>.jpg`, never a copy.
6. **Working files.** Models and the board-set PDF go in
   `web/academic/source/<slug>/`. Git ignores them; back them up separately.
7. **Check.** `node tools/serve.mjs` and look at `/`, `/academic/` and the
   new page; then `node tools/check.mjs`.
