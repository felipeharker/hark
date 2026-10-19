#!/usr/bin/env node
/**
 * Serves felipeharker.org locally, the way Render serves it.
 *
 *   node tools/serve.mjs           serve every part from its source folder
 *   node tools/serve.mjs --dist    serve the built dist/ instead
 *   node tools/serve.mjs --port 8000
 *
 * From source, each path is mapped to its folder (tools/sites.mjs), so an
 * edit to a static page shows on the next refresh with no build. The
 * birding app is served from its last build (web/birds/web/out): run
 * `npm run build` in web/birds/web to refresh it, or `npm run dev` there to
 * work on it alone at http://localhost:3000/birds/.
 */

import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mounts, resolveUrl } from './sites.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const port = Number(args[args.indexOf('--port') + 1]) || 8000;
const fromDist = args.includes('--dist');

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
};

const served = fromDist ? [{ path: '/', abs: join(ROOT, 'dist') }] : mounts(ROOT);

createServer((req, res) => {
  const urlPath = new URL(req.url, 'http://localhost').pathname;
  // A folder without its trailing slash: redirect, so relative links resolve.
  if (served.some((m) => m.path !== '/' && urlPath === m.path.slice(0, -1))) {
    res.writeHead(301, { Location: `${urlPath}/` });
    return res.end();
  }
  const file = resolveUrl(served, urlPath);
  // A folder's index reached without the trailing slash: redirect, so the
  // page's relative links resolve against the folder, as they do on Render.
  if (file && file.endsWith('index.html') && !urlPath.endsWith('/') && !urlPath.endsWith('.html')) {
    res.writeHead(301, { Location: `${urlPath}/` });
    return res.end();
  }
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end(`Not found: ${urlPath}\n`);
  }
  res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  res.end(readFileSync(file));
}).listen(port, () => {
  console.log(`felipeharker.org ${fromDist ? 'from dist/' : 'from source'} at http://localhost:${port}/`);
  for (const m of served) console.log(`  ${m.path.padEnd(12)} ${m.abs}`);
});
