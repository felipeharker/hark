# Adding an Academic Project

Academic projects are served at `/academic/`, from `web/academic/site/`. See
[`web/academic/README.md`](../web/academic/README.md) for what is there now.

1. **The page.** Copy `site/projects/living-outside-the-box.html` to
   `site/projects/<slug>.html`. Replace the title, kicker, subtitle,
   dateline, description and every section. Keep the back link (`← Academic
   Projects`) and the colophon as they are, with `aria-current="page"` on
   Academic.
2. **The images.** Board images go in `site/assets/projects/<slug>/`, named
   with a short abbreviation of the project and two digits in page order —
   `lotb-03.jpg` — as JPEG, 2000 px on the long edge or smaller. Each `<img>`
   gets an `alt`, and `loading="lazy"` unless it is the lead plate.
3. **The cover.** Crop the strongest image to 3:2, 1500 x 1000 or smaller, as
   `site/assets/covers/<slug>.jpg`.
4. **The row.** Copy one `<li class="work">` in `site/index.html` and fill in
   the title, one-sentence summary, the stack (place / kind of work) and both
   links. Update the abstract above the list if it counts the projects.
5. **Working files.** Models and the board-set PDF go in
   `web/academic/source/<slug>/`. Git ignores them; back them up separately.
6. **Check.** `node tools/serve.mjs` and look at `/academic/` and the new
   page; then `node tools/check.mjs`.

The portfolio's Academic Projects row links `/academic/` as a whole, so it
does not change when a project is added.
