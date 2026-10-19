/**
 * Every part of felipeharker.org: the path it is served at, and the folder
 * its published files come from. tools/build.mjs, tools/serve.mjs and
 * tools/check.mjs all read this list, so a new part of the site is added
 * here once.
 *
 *   path       where it is served, always with a trailing slash
 *   dir        the folder published at that path, relative to the repository
 *   kind       'static' — the folder is the site, as it is
 *              'next'   — a Next.js app; `npm run build` in `app` writes `dir`
 *   siteLinks  true when it appears in the site links at the foot of every
 *              page (see web/standards/docs/components.md, "Colophon")
 *
 * Order matters for the site links: it is the order they appear in.
 */

import { existsSync, statSync } from 'node:fs';
import { join, normalize } from 'node:path';

export const DOMAIN = 'https://felipeharker.org';

export const SITES = [
  { name: 'Portfolio', path: '/', dir: 'web/portfolio/site', kind: 'static', siteLinks: true },
  { name: 'Academic', path: '/academic/', dir: 'web/academic/site', kind: 'static', siteLinks: true },
  { name: 'Birding', path: '/birds/', dir: 'web/birds/web/out', app: 'web/birds/web', kind: 'next', siteLinks: true },
  { name: 'Resume', path: '/resume/', dir: 'web/resume/site', kind: 'static', siteLinks: true },
  { name: 'Standards', path: '/standards/', dir: 'web/standards/site', kind: 'static', siteLinks: false },
];

/** The one shared stylesheet, as every page links it. */
export const STYLESHEET = '/standards/hark.css';

/** Where each path is served from, longest path first so /academic/ wins over /. */
export function mounts(root) {
  return [...SITES]
    .sort((a, b) => b.path.length - a.path.length)
    .map((s) => ({ ...s, abs: join(root, s.dir) }));
}

/**
 * The file a URL path is served from, or null. Like Render: the path as a
 * file, then with .html, then as a folder's index.html.
 */
export function resolveUrl(mountList, urlPath) {
  const mount = mountList.find((m) => urlPath.startsWith(m.path) || urlPath === m.path.slice(0, -1));
  if (!mount) return null;
  const rest = normalize(decodeURIComponent(urlPath.slice(mount.path.length - 1) || '/'));
  const base = join(mount.abs, rest);
  if (!base.startsWith(mount.abs)) return null;
  for (const candidate of [base, `${base}.html`, join(base, 'index.html')]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}
