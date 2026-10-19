#!/usr/bin/env node
/**
 * Builds felipeharker.org into dist/: what Render publishes.
 *
 *   node tools/build.mjs               build the birding app, then assemble dist/
 *   node tools/build.mjs --skip-birds  reuse the birding app's last out/
 *
 * Each static part of the site is copied as it is; the birding app is built
 * with `npm ci && npm run build` (its prebuild step copies the shared
 * stylesheet in first) and its out/ copied to dist/birds/. Nothing is
 * transformed: what is in a site/ folder is what is served.
 *
 * Plain Node, no dependencies, so Render needs nothing but Node to run it.
 */

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
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

console.log('\nBuilt dist/.');
