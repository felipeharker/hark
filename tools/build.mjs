#!/usr/bin/env node
/**
 * Builds felipeharker.org into dist/: what Render publishes.
 *
 *   node tools/build.mjs               build the birding app, then assemble dist/
 *   node tools/build.mjs --skip-birds  reuse the birding app's last out/
 *
 * Each static part of the site is copied as it is; the birding app is built
 * with `npm ci && npm run build` (its prebuild step copies the shared
 * stylesheet in first) and its out/ copied to dist/birds/.
 *
 * One thing is changed on the way: every stylesheet a static page links gets
 * a fingerprint of its contents, `hark.css?v=1a2b3c4d5e`. A CDN caches a page
 * and its stylesheet separately, for minutes; without the fingerprint a
 * visitor just after a deploy can get the new page with the old stylesheet.
 * With it, a changed stylesheet has a new address, so the two always match.
 * (The birding app's stylesheets are fingerprinted by Next already.)
 *
 * Plain Node, no dependencies, so Render needs nothing but Node to run it.
 */

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITES } from './sites.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const skipBirds = process.argv.includes('--skip-birds');

for (const site of SITES.filter((s) => s.kind === 'next')) {
  const app = join(ROOT, site.app);
  if (skipBirds) {
    console.log(`${site.name}: reusing ${site.dir}`);
    continue;
  }
  console.log(`${site.name}: building ${site.app}`);
  const install = existsSync(join(app, 'node_modules')) ? 'npm install --no-audit --no-fund' : 'npm ci --no-audit --no-fund';
  execSync(`${install} && npm run build`, { cwd: app, stdio: 'inherit', shell: true });
}

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST);

// The root part first, so a sub-path can never be overwritten by it.
for (const site of [...SITES].sort((a, b) => a.path.length - b.path.length)) {
  const from = join(ROOT, site.dir);
  const to = join(DIST, site.path);
  if (!existsSync(from)) throw new Error(`${site.name}: ${site.dir} does not exist`);
  if (site.path !== '/' && existsSync(to)) throw new Error(`${site.name}: ${site.path} is already taken in dist/`);
  cpSync(from, to, { recursive: true });
  console.log(`${site.name.padEnd(10)} ${site.dir.padEnd(22)} -> dist${site.path}  (${readdirSync(from).length} entries)`);
}

// -- Fingerprint the stylesheets each static page links ------------------------

const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const p = join(dir, name);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const fingerprint = (file) => createHash('sha256').update(readFileSync(file)).digest('hex').slice(0, 10);

let stamped = 0;
for (const site of SITES.filter((s) => s.kind === 'static')) {
  for (const source of walk(join(ROOT, site.dir)).filter((f) => f.endsWith('.html'))) {
    const pageUrl = site.path + relative(join(ROOT, site.dir), source).split(sep).join('/');
    const page = join(DIST, pageUrl);
    const html = readFileSync(page, 'utf8').replace(/href="([^":?#]+\.css)"/g, (link, href) => {
      const file = join(DIST, new URL(href, `http://x${pageUrl}`).pathname);
      if (!existsSync(file)) return link;
      stamped++;
      return `href="${href}?v=${fingerprint(file)}"`;
    });
    writeFileSync(page, html);
  }
}
console.log(`\nFingerprinted ${stamped} stylesheet links.`);

console.log('\nBuilt dist/.');
