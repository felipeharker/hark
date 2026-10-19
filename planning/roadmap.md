# Roadmap

What is done, what is waiting, and what is next for felipeharker.org. Why
things are the way they are is in [decisions.md](decisions.md). Tick an item
when it is done, with the date.

## Now: the move to one repository (started 2026-10-19)

The site moved from three repositories and three Render services to this one
repository and one service.

- [x] Organise the `hark` folder — portfolio, academic, birding, resume — into
      one repository, with a web standard, tools, a wiki and these planning
      docs (2026-10-19)
- [x] Split the academic projects out to `/academic/`; Alexandria out of the
      portfolio; PDFs out of the repository (2026-10-19)
- [x] One shared stylesheet with docs, a specimen page and a check
      (2026-10-19)
- [x] Publish `felipeharker/hark` on GitHub (public) (2026-10-19)
- [x] Create the `hark-site` static site on Render:
      https://hark-site.onrender.com (2026-10-19; it replaced a first service
      that kept serving files from its earlier deploys)
- [x] Move the custom domains `felipeharker.org` and `www` from "Portfolio
      Website" to `hark-site`; felipeharker.org verified, certificate issued, live
      (2026-10-19)
- [ ] **Yours, at Porkbun:** change the `www` CNAME from
      `portfolio-website-j5bq.onrender.com` to `hark-site.onrender.com`.
      Until then www.felipeharker.org does not load; Render then verifies it
      and redirects it to felipeharker.org
- [x] Redirect rule on the old "Birding Website" (birds.felipeharker.org):
      `/*` → `https://felipeharker.org/birds/*` (2026-10-19)
- [x] Redirect rule on the old "Resume Website"
      (resume-site-0rfl.onrender.com): `/*` → `https://felipeharker.org/resume/*`
      (2026-10-19)
- [x] Both old services publish only a one-line page that forwards their
      homepage to the new path, so every address redirects (2026-10-19)
- [x] Suspend "Portfolio Website" and "Portfolio Site" (2026-10-19)
- [x] Archive `hark_portfolio`, `hark_resume` and `hark_birding` on GitHub
      (2026-10-19)
- [ ] `hark_system`: merge
      [the pull request](https://github.com/felipeharker/hark_system/pull/1)
      that hands the web styles to this repository
- [ ] **Yours:** once you are happy, delete
      `CODEBASE\_retired\hark_clones_2026-10-19` (the old local clones)

## Open decisions

These are yours to make; nothing changes until you do.

- **The employer's name on the resume.** It is on the page, by name.

Decided (the reasons are in [decisions.md](decisions.md)):

- [x] Resume contact details: no phone number and no referees' email
      addresses; references are names and roles (2026-10-19)
- [x] Alexandria: stays out of the portfolio, for now (2026-10-19)
- [x] PDFs: stay out of the repository, for now (2026-10-19)
- [x] Birding locations: the eBird exports are shown exactly as they are,
      location names and map pins included; nothing is renamed, hidden or
      filtered (2026-10-19)

## Next

- **The birding report's cover**, for its row on the portfolio.
- **A check on every push.** A GitHub Actions workflow running
  `node tools/check.mjs` and the birding build, so a broken link never
  reaches `main`.
- **The GitHub wiki.** Create its first page on GitHub, then push `wiki/` to
  it (see `wiki/Home.md`).
