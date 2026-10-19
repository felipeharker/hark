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

This folder is written to read well in the repository. To publish it as the
repository's GitHub wiki too, create the wiki's first page on GitHub once
(the wiki's git repository does not exist until then), then push this
folder's files to `https://github.com/felipeharker/hark.wiki.git`.
`_Sidebar.md` becomes the wiki's sidebar.
