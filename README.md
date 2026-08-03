# eshanmehra.xyz

Source for my personal site, [eshanmehra.xyz](https://eshanmehra.xyz). Built with Jekyll and hosted on GitHub Pages.

Single page, dark theme, no posts and no collections. Everything a visitor sees comes from `_config.yml`.

---

## How content works

This is the `modern-resume-theme` "version 2" content model. `_layouts/default.html` loops over the `content:` array in `_config.yml` and renders each entry through `_includes/section-text.html`. There is **no `_data/` directory**, and `index.md` is only there to route `/` through the layout. Its body never renders, because the layout does not emit `{{ content }}`.

So: to change any copy on the site, edit `_config.yml`. That is the only file you need.

```
_config.yml                      all site copy, every card, award and citation
_layouts/default.html            page shell, hardcoded nav
_includes/
  header.html                    name, tagline, affiliation line, social icons
  about.html                     profile image + about_content
  section-text.html              the only section renderer in use
  head.html                      meta description, JSON-LD, favicons
  footer.html                    renders site.email
_sass/modern-resume-theme.scss   hover cards, honors grid, menu, mobile rules
images/cards/                    card background art
```

`_includes/section-list.html` and `_includes/a.html` are the theme's structured-content path. This site does not use them.

---

## Things that will bite you

These are not obvious from reading the files, and each one caused a real bug at some point.

**Card body copy has a length ceiling.** `.hover-card` is `min-height: 320px` and `.hover-card__body` renders at up to `1.6rem` inside `44ch`. Past roughly 380 characters the text overflows the card. Check any new card at 1440px and at 390px before committing.

**Experience cards hide their titles.** Every card in the Experience section carries `cover-no-title`, which sets `display: none` on `.hover-card__title`. The logo art *is* the title. Body copy on those cards has to stand on its own without naming the organisation.

**Anchors come from hand-placed spans, not headings.** Each section starts with a `<span id="...">`. The layout deliberately emits a bare `<h3>` with no `id`. If you add an `id` back to those headings, Jekyll will slugify the emoji titles down to `about`, `research`, `experience` and so on, and collide with the spans, producing duplicate IDs. Add a new section by giving it a span and adding the matching link to the nav in `_layouts/default.html`.

**Touch devices behave differently from a narrow desktop window.** Under `@media (hover: none) and (pointer: coarse)`, Labs and Projects cards show their title only and never their body text, while Experience cards show body text over the *resting* scrim rather than the dark hover one. That is why the resting scrim is overridden to something darker inside that media query. Resizing a desktop browser will not reproduce any of this. Use device emulation.

**Keep images small.** The repo once shipped about 32 MB of images on a single page. Before adding art:

- Photographs go in as JPEG, capped around 1400 to 1600px.
- Logos with real transparency stay PNG. Flattening them puts a hard white or black box behind the logo on top of the card tint.
- Flat line art stays PNG. JPEG rings around thin strokes.
- Check whether a PNG actually uses its alpha channel. Several here carried one while being fully opaque, and converting those to JPEG cut them by around 85%.
- `sips` is the built-in macOS tool but it is a mediocre encoder and will sometimes produce a *larger* file. Compare sizes and keep whichever is smaller.

**No em dashes in site copy.** House style. Use commas, or split the sentence.

---

## Running locally

Requires Ruby and Jekyll. The system Ruby on macOS is too old, so install a current one first:

```bash
brew install ruby
export PATH="$(brew --prefix ruby)/bin:$PATH"   # add to ~/.zshrc to persist
gem install bundler jekyll

bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>.

Changes rebuild automatically, **except** changes to `_config.yml`, which need a restart. Since nearly all content lives there, expect to restart often.

---

## Deploying

GitHub Pages builds this repository automatically. Pushing to `main` deploys to <https://eshanmehra.xyz> (the custom domain comes from `CNAME`) within a minute or two. There is no build step to run and no `_site/` to commit.

---

## Credit

Based on [modern-resume-theme](https://github.com/sproogen/modern-resume-theme) by James Grant, available under the MIT License. The layout, styles and content here have since been substantially rewritten.
