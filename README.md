# Portfolio Site

Hand-built Jekyll portfolio, no theme gem. Deployed to GitHub Pages with GitHub Actions.

Content shows first and works with JavaScript off; the motion sits on top:

- name decodes on load, sections reveal as they scroll into view, stats count up
- buttons with a magnetic pull and a fill wipe, a cursor spotlight and glitch on project cards
- project cards expand into a short "how it works" breakdown
- scroll progress bar and active-section highlight in the nav
- a hidden shell: press `~` (or the footer hint) and type `help`
- light / dark theme, remembered per browser
- `prefers-reduced-motion` turns every animation off

## Local development

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000

## Structure

- `_config.yml` — site metadata and contact links
- `_data/projects.yml` — the project list: title, tagline, stack, stats, summary and detail points
- `index.html` — the page (hero, work, stack, notes, contact)
- `_layouts/default.html` — shell: nav, footer, terminal overlay, theme bootstrap
- `assets/css/style.css` — all styles; CSS custom properties drive both themes
- `assets/js/site.js` — reveals, magnetic buttons, card expand, terminal, theme toggle
- `.github/workflows/jekyll.yml` — builds and deploys to Pages on every push to `main`

To add or reorder projects, edit `_data/projects.yml`; the page and the shell's `ls projects` both read from it.
