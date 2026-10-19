# Changing the Standard

Every page on felipeharker.org links one stylesheet,
`web/standards/site/hark.css` (served at `/standards/hark.css`). A change to
it is a change to every page at once — which is the point, and the reason to
make it carefully. The rules are in
[`web/standards/docs/`](../web/standards/docs/design.md).

## Changing a token

A token is a value at the top of `hark.css`: a colour, a size, a space.

1. Change it in `web/standards/site/hark.css`.
2. Update its row in `web/standards/docs/design.md` (and its contrast ratio,
   if it is a text colour).
3. Look at `/standards/` and at a page of each part of the site.
4. `node tools/check.mjs`.

## Adding or changing a component

1. Add the class to the right numbered section of `hark.css`, with a comment
   saying why it exists.
2. Add a row for it in `web/standards/docs/components.md`, with its markup.
   `tools/check.mjs` fails until you do.
3. Add a specimen of it to `web/standards/site/index.html`.
4. Use it on the page that needed it, and look at both.

A component used by only one part of the site belongs in that part's own
`site/assets/site.css`, not here. It moves into the standard when a
second part needs it.

## The birding app

The birding app imports the stylesheet at build time: `npm run dev`,
`npm run build` and `npm run lint` copy it into
`web/birds/web/src/app/hark.css` first. That copy is generated and ignored by
git — never edit it. Rebuild the app to see a change there.

## One commit

The standard and every page it changed go in one commit, so the history
shows them together.
