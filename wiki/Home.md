# hark wiki

How to do things with felipeharker.org. The [README](../README.md) says what
is where; [ARCHITECTURE](../ARCHITECTURE.md) shows how it fits together; the [standards](../web/standards/README.md) say what every page
must be; the [planning](../planning/roadmap.md) folder says what is next.
These pages say how.

## Guides

| Guide | When you need it |
|---|---|
| [Running Locally](Running-Locally.md) | Seeing the site on your machine before anything is pushed. |
| [Editing the Portfolio](Editing-the-Portfolio.md) | Changing the front page: its rows, a cover, the About text. |
| [Adding an Academic Project](Adding-an-Academic-Project.md) | A new project page under `/academic/`. |
| [Updating the Birding Report](Updating-the-Birding-Report.md) | New eBird exports, a field note, the report's settings. |
| [Editing the Resume](Editing-the-Resume.md) | Any change to the resume, and checking it prints. |
| [Changing the Standard](Changing-the-Standard.md) | A token, a component, or a rule every page follows. |
| [Deploying](Deploying.md) | How a push becomes the live site, and the Render settings. |

## The short version

```bash
node tools/serve.mjs        # see the site at http://localhost:8000/
node tools/check.mjs        # check it before every commit
git push                    # main is live: Render deploys every push
```

## Using these pages on GitHub

This folder is written to read well in the repository, and is published as
the repository's [GitHub wiki](https://github.com/felipeharker/hark/wiki)
too. The workflow `.github/workflows/wiki.yml` runs `tools/wiki.mjs` on every
push to `main` that changes `wiki/`: it rewrites the links for the wiki (a
page here becomes a wiki page, a file elsewhere in the repository a link to
it on GitHub) and replaces every page on the wiki with these.
`_Sidebar.md` and `_Footer.md` become the wiki's sidebar and footer.

- **Edit here, never on the wiki.** A change made on GitHub is replaced by
  the next push.
- **A new page** is a new file here, named the way its title reads
  (`Adding-an-Academic-Project.md`), with a row in the guides table above
  and a line in `_Sidebar.md`.
- **Links** are relative paths, as anywhere in the repository.
  `node tools/check.mjs` fails on one that leads nowhere.
- **The first time**, GitHub has no wiki to push to until its first page
  exists: open Wiki on GitHub, create the first page, save it, then run the
  Wiki workflow (Actions → Wiki → Run workflow). It replaces that page.
