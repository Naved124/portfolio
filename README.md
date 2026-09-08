# Portfolio Site

Custom Jekyll portfolio — no theme gem, fully hand-built. Design language borrows
from technical drafting sheets: a title-block footer, corner registration marks,
dotted leader lines, and a dark/light toggle that switches between a **cyanotype**
(blueprint-blue, light-on-navy) and a **diazo/blueline** print (ink-on-paper).

Deployed via GitHub Pages using GitHub Actions.

## Local development

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000

## Structure

- `_config.yml` — site metadata, collections, plugins
- `index.md` — home page (hero, capabilities, work, notes — pulls project rows from the `projects` collection)
- `_projects/` — one Markdown file per project (Jekyll collection)
- `_layouts/default.html` — base HTML shell: nav, corner marks, title-block footer, theme toggle
- `_layouts/project.html` — project detail page layout
- `assets/css/style.css` — full custom stylesheet (CSS custom properties drive both themes)
- `assets/js/theme.js` — dark/light toggle logic, persists choice in localStorage
- `.github/workflows/jekyll.yml` — CI/CD: builds and deploys to GitHub Pages on every push to `main`

## TODO before publishing

- [ ] Replace `github_username` and `linkedin_url` in `_config.yml`
- [ ] Replace the `repo:` TODO links in each file under `_projects/`
- [ ] Confirm repo Settings → Pages → Source is set to "GitHub Actions"
