import { SITE_FAMILY, SITE_OWNER, SITE_ROOT } from '@/lib/siteConfig';

/**
 * The running head: the line across the top of every page — the owner's
 * name, then a link to every part of felipeharker.org, this one bracketed as
 * current. The same links end every page in <Colophon>, so a reader can move
 * around the site from either end of a page.
 *
 * Every link here leaves the app (or returns to its front), so each is a
 * plain <a> with a root-relative path: a Next <Link> would gain the /birds
 * base path. Rendered once, by the root layout, outside each page's
 * <article>.
 *
 * Styling: section 17 of src/app/hark.css.
 */
export function Runhead() {
  return (
    <header className="runhead">
      <a className="runhead-owner" href={SITE_ROOT}>
        {SITE_OWNER}
      </a>
      <nav className="runhead-links" aria-label="Site">
        {SITE_FAMILY.map((site) => (
          <a
            key={site.url}
            href={site.url}
            aria-current={'current' in site ? 'page' : undefined}
          >
            {site.name}
          </a>
        ))}
      </nav>
    </header>
  );
}
