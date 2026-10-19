/**
 * Everything about the site that is a property of the project rather than a
 * record of an observation.
 *
 * Observations, media and field notes still come from files — the eBird
 * exports in `observation-data/` and the Markdown in `field-notes/` — because
 * those change whenever a new checklist is submitted. The values below change
 * when the project itself changes, which is rarely and always alongside a code
 * edit, so they live here instead of in a CSV nobody remembers to look at.
 */

/** Browser tab and masthead. */
export const SITE_TITLE = 'Harker Ornithology Report';

/** Sits under the title on the homepage. */
export const SITE_SUBTITLE = 'A Record of Field Observations, Checklists, and Media';

/** Byline under the subtitle. */
export const SITE_AUTHOR = 'Felipe Harker';

/** Used for the page description in metadata. */
export const SITE_DESCRIPTION = 'Personal birding project visualizing eBird observation data.';

/** The summary paragraph on the homepage, below the masthead. */
export const ABSTRACT =
  'This project catalogs and shares birding observations from around the world, ' +
  'with checklists and media hosted on eBird and the Macaulay Library. It began ' +
  'as an experiment merging a love of birds with web development, and remains ' +
  'under active, frequent development.';

/**
 * Off-site addresses used in more than one place — the repository URL alone
 * appears in the reference list and the colophon.
 */
export const SITE_LINKS = {
  repository: 'https://github.com/felipeharker/hark/tree/main/web/birds',
  ebirdProfile: 'https://ebird.org/profile/ODE0ODA5NQ/world',
  macaulayLibrary:
    'https://media.ebird.org/catalog?unconfirmed=incl&mediaType=photo&userId=USER8148095',
  merlin: 'https://merlin.allaboutbirds.org/',
} as const;

/**
 * Every part of felipeharker.org, in the order of tools/sites.mjs, for the
 * running head at the top of each page (Runhead) and the site links at its
 * foot (Colophon). This report is served
 * under /birds/; the paths are root-relative and written as plain <a>
 * elements, so Next's basePath does not touch them. `current` marks this
 * part.
 */
export const SITE_FAMILY = [
  { name: 'Portfolio', url: '/' },
  { name: 'Academic', url: '/academic/' },
  { name: 'Birding', url: '/birds/', current: true },
  { name: 'Resume', url: '/resume/' },
] as const;

/** The name that leads the site links. */
export const SITE_OWNER = 'Felipe E. Harker';

/**
 * The front page of felipeharker.org — the portfolio — which the owner's name
 * in the running head links to. Root-relative and outside this app, so it is
 * written as a plain <a>, never a <Link>.
 */
export const SITE_ROOT = '/';

/** The design standard every page on felipeharker.org follows. */
export const STANDARDS_URL = '/standards/';

/**
 * Props every link needs. Collected here so no outbound link ships without
 * `rel="noopener noreferrer"`. A link to anyone else's site opens in a new
 * tab; a root-relative link — this report, or another part of
 * felipeharker.org — does not.
 */
export function externalLinkProps(href: string) {
  return href.startsWith('http')
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {};
}
