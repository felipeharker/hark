#!/usr/bin/env node
/**
 * Publishes wiki/ as the repository's GitHub wiki. The pages are written to
 * read well in the repository, so their links are repository paths; on the
 * wiki those paths would lead nowhere, so they are rewritten:
 *
 *   Running-Locally.md       -> Running-Locally            another wiki page
 *   ../README.md             -> <repo>/blob/main/README.md a file in the repository
 *   ../web/standards/docs/   -> <repo>/tree/main/web/...   a folder in the repository
 *
 * Links to anywhere else, and anything inside a code block, are left as they
 * are. A link to a file that does not exist is a problem, here and in
 * tools/check.mjs, which imports wikiPages().
 *
 *   node tools/wiki.mjs            check the links, write nothing
 *   node tools/wiki.mjs <folder>   write the pages into <folder>, a clone of
 *                                  the wiki, replacing every page there
 *
 * .github/workflows/wiki.yml runs it on every push to main that changes
 * wiki/. Plain Node, no dependencies.
 */

import { existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, posix, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const WIKI = join(ROOT, 'wiki');

/** The repository the wiki belongs to; links out of wiki/ point here. */
export const REPO = 'https://github.com/felipeharker/hark_web';

/** One link target, as the wiki needs it, or a problem. */
function rewrite(target) {
  if (/^([a-z]+:|#|\/\/)/i.test(target)) return { href: target };
  const [path, hash] = target.split('#');
  const anchor = hash === undefined ? '' : `#${hash}`;
  const inRepo = posix.normalize(posix.join('wiki', path));
  if (inRepo.startsWith('..')) return { problem: `${target} leaves the repository` };
  const abs = join(ROOT, inRepo);
  if (!existsSync(abs)) return { problem: `${target} does not exist` };
  if (posix.dirname(inRepo) === 'wiki' && inRepo.endsWith('.md')) {
    return { href: posix.basename(inRepo, '.md') + anchor };
  }
  const kind = statSync(abs).isDirectory() ? 'tree' : 'blob';
  return { href: `${REPO}/${kind}/main/${inRepo}${anchor}` };
}

/** Every page in wiki/, rewritten for the wiki, with any broken links. */
export function wikiPages() {
  return readdirSync(WIKI)
    .filter((name) => name.endsWith('.md'))
    .sort()
    .map((name) => {
      const problems = [];
      let fenced = false;
      const text = readFileSync(join(WIKI, name), 'utf8')
        .split('\n')
        .map((line) => {
          if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
          if (fenced) return line;
          // Inline code is kept as written; only the text between spans changes.
          return line.split(/(`[^`]*`)/).map((part, i) => (i % 2 ? part : part.replace(
            /\]\(([^)\s]+)\)/g,
            (whole, target) => {
              const { href, problem } = rewrite(target);
              if (problem) { problems.push(problem); return whole; }
              return `](${href})`;
            },
          ))).join('');
        })
        .join('\n');
      return { name, text, problems };
    });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const out = process.argv[2];
  const pages = wikiPages();
  const problems = pages.flatMap((p) => p.problems.map((what) => `wiki/${p.name}: ${what}`));
  if (problems.length) {
    console.log(`${problems.length} broken link${problems.length === 1 ? '' : 's'}:\n`);
    for (const p of problems) console.log(`  - ${p}`);
    process.exit(1);
  }
  if (!out) {
    console.log(`${pages.length} wiki pages, every link resolves.`);
    process.exit(0);
  }
  if (!existsSync(join(out, '.git'))) {
    console.error(`${out} is not a clone of the wiki (no .git).`);
    process.exit(1);
  }
  // The wiki is a copy of wiki/: a page removed here goes from the wiki too.
  // Anything that is not a page (an image uploaded on GitHub) is kept.
  for (const name of readdirSync(out)) if (name.endsWith('.md')) rmSync(join(out, name));
  for (const page of pages) writeFileSync(join(out, page.name), page.text);
  console.log(`Wrote ${pages.length} wiki pages to ${out}.`);
}
