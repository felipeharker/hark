# Running Locally

You need Node 20.9 or newer. Python is not needed.

## The whole site

From the repository root:

```bash
node tools/serve.mjs
```

Open http://localhost:8000/. Every part is served from its source folder at
the path it has on the live site — `/`, `/academic/`, `/birds/`, `/resume/`,
`/standards/` — so links between parts work, and an edit to a static page
shows on the next refresh.

The birding report is the exception: it is a Next.js app, and the server
shows its last build. Build it once, and again after changing it:

```bash
cd web/birds/web
npm install        # first time only
npm run build
```

Use `--port 8080` to pick another port. In the Claude desktop app, the
`site` entry in `.claude/launch.json` starts the same server.

## Just the birding report, live

```bash
cd web/birds/web
npm run dev
```

Open http://localhost:3000/birds/. Edits to its code reload instantly, but
its links to the rest of the site (`/`, `/academic/`…) 404 on this server —
they only exist in the whole site.

## Exactly what Render will publish

```bash
node tools/build.mjs        # builds the birding app and assembles dist/
node tools/serve.mjs --dist # serves dist/ at http://localhost:8000/
```

`node tools/build.mjs --skip-birds` reuses the birding app's last build.

## Checking

```bash
node tools/check.mjs
```

It reports any page that does not link the shared stylesheet or whose
running head or colophon misses a part of the site, any internal link or image that does not resolve, any file in a
`site/` folder that should not be published, any token or class the
standards docs do not cover, and any link in `wiki/` that leads nowhere. It
changes nothing.
