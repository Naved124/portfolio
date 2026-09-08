# Portfolio Site

Jekyll source for my personal portfolio, deployed via GitHub Pages using GitHub Actions.

## Local development

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000

## Structure

- `_config.yml` — site metadata, collections, plugins
- `index.md` — home page (pulls project cards from the `projects` collection)
- `_projects/` — one Markdown file per project (Jekyll collection)
- `_layouts/project.html` — layout used for each project's detail page
- `assets/css/style.scss` — style overrides on top of the `minima` theme
- `.github/workflows/jekyll.yml` — CI/CD: builds and deploys to GitHub Pages on every push to `main`

## TODO before publishing

- [ ] Replace `github_username`, `linkedin_url`, `blog_url` in `_config.yml`
- [ ] Replace the `repo:` TODO links in each file under `_projects/`
- [ ] Swap in a real headshot / og-image if desired
- [ ] Enable "Build and deployment: GitHub Actions" under repo Settings → Pages
