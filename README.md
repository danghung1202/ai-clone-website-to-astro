# PNK Beauty Klinik

Astro static site for PNK Beauty Klinik in Boras. The site is built as reusable pages, components, and data files so content can be edited without digging through generated HTML.

## Quick Start

```bash
npm install
npm run dev
```

Open the local URL printed by Astro. For a production-style check:

```bash
npm run verify:static
```

That command builds the site, verifies expected routes/sitemap/static output, and checks motion runtime assumptions.

## Where To Edit

Use these files first. Avoid editing built files in `dist/`.

| Area | Main Files |
| --- | --- |
| Landing page / home page | `src/pages/index.astro`, `src/components/Hero.astro`, `src/components/Intro.astro`, `src/components/Services.astro`, `src/components/Atmosphere.astro`, `src/components/Testimonials.astro`, `src/components/Contact.astro`, `src/data/home.ts` |
| Header, menu, footer | `src/components/Header.astro`, `src/components/Footer.astro`, `src/data/navigation.ts` |
| Booking page | `src/pages/boka.astro`, `src/components/BookingHub.astro` |
| Treatments, prices, service pages | `src/data/treatments.ts`, `src/components/TreatmentPage.astro`, `src/components/CategoryPage.astro`, `src/pages/behandlingar/[slug].astro` |
| Articles | `src/data/articles.ts`, `src/components/ArticlePage.astro`, `src/pages/artiklar/[slug].astro` |
| Global clinic info | `src/data/site.ts` |
| Styling | `src/styles/global.css` |
| Animations | `src/scripts/motion.ts` |
| Images and media | `public/images/pnk/` |

## Landing Page Notes

The homepage is assembled from components in `src/pages/index.astro`. For a new landing page experiment, create a branch first, then edit the homepage components and data:

```bash
git checkout pnk-beauty-buildout
git pull
git checkout -b landing/pnk-beauty-homepage
```

Recommended edit order:

1. Content and images: `src/data/home.ts`
2. Layout structure: `src/pages/index.astro`
3. Section markup: `src/components/Hero.astro`, `src/components/Services.astro`, etc.
4. Visual styling: `src/styles/global.css`
5. Motion: `src/scripts/motion.ts`

Run `npm run verify:static` before opening a pull request.

## Branch Workflow

Use one branch per task. Do not edit `main` directly.

Examples:

```bash
git checkout -b landing/pnk-beauty-homepage
git checkout -b fix/mobile-booking-cards
git checkout -b content/treatment-copy-update
```

Commit only the files that belong to the change:

```bash
git status --short
git add src/pages/index.astro src/components/Hero.astro src/data/home.ts src/styles/global.css
git commit -m "Update PNK landing page"
git push -u origin landing/pnk-beauty-homepage
```

Then open a pull request on GitHub. Use the PR checklist in `.github/pull_request_template.md`.

## Current Branches To Publish

The completed buildout branch is:

```bash
pnk-beauty-buildout
```

This branch contains the PNK Beauty site buildout and recent booking/menu refinements. A clean starting branch for landing-page work can be created from it:

```bash
git checkout pnk-beauty-buildout
git checkout -b landing/pnk-beauty-homepage
```

## Routes

Expected static routes are listed in:

```text
tools/expected-routes.mjs
```

If you add a page, also add it there so `npm run verify:static` catches missing output and sitemap issues.

## Deployment

This is a static Astro site:

- Build command: `npm run build`
- Publish directory: `dist`
- Canonical site URL: `https://pnkbeauty.se`

The same settings work for Netlify, Vercel, Cloudflare Pages, or any static host.

## GitHub Auth

Publishing requires a valid GitHub login:

```bash
gh auth status
gh auth login -h github.com
git push -u origin <branch-name>
```

If `gh auth status` says the token is invalid, re-authenticate before pushing or creating pull requests.

## Do Not Commit

These folders are local research or QA artifacts unless a reviewer explicitly asks for them:

```text
.playwright-cli/
.superpowers/
docs/design-references/
docs/motion-capture/
docs/research/
output/
```

---

## Legacy Clone Tool Notes

# Clone to Astro

A Claude Code skill that reverse-engineers any website and rebuilds it as a production-ready
[Astro](https://astro.build/) site with Content Collections.

## What This Does

Unlike pixel-perfect single-page cloners, this skill produces a **maintainable content site**:

- Identifies **page types** (homepage, listing, detail, static) — not individual pages
- Detects **shared components** across page types before building anything
- Builds **reusable Astro layouts and components** for each page type
- Extracts sample content into **Markdown files with YAML frontmatter**
- Generates **Content Collections with Zod schema validation**
- Downloads and organizes **images, fonts, and SVG assets**

The result: adding a new page to the cloned site = creating a new `.md` file.

## Requirements

- [Claude Code](https://docs.claude.com) with Chrome MCP enabled
- Node.js 18+
- npm

## Usage

1. Clone this repo:
   ```bash
   git clone https://github.com/danghung1202/ai-clone-website-to-astro.git <your-clone-website-folder>
   cd your-clone-website-folder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start your AI agent** — Claude Code recommended:
   ```bash
   claude --chrome
   ```

4. Open in Claude Code and run:
   ```
   /clone-to-astro https://www.example.com
   ```

   It will edit `TARGET.md` with your target URL.
5. The skill walks through 10 phases, pausing at 6 review gates for your input.

6. When complete:
   ```bash
   npm run build    # Build static site
   npm run preview  # Preview locally
   ```

## How It Works

| Phase | Review? | What happens |
|---|---|---|
| 1. Recon | ⏸ Yes | Crawl nav, group URLs by pattern, identify page types |
| 2. Foundation | ⏸ Yes | Extract design tokens (colors, fonts, spacing) via browser |
| 3. Schema | ⏸ Yes | Generate Content Collections config with Zod validation |
| 4. Base layout | No | Build header, footer, and base template |
| 5a. Component inventory | ⏸ Yes | Catalog UI blocks, detect shared vs page-specific |
| 5b. Shared components | No | Build reusable components first |
| 5c. Page-type layouts | No | Build one layout per page type using shared components |
| 6. Content (samples) | ⏸ Yes | Extract 2-3 sample .md files per collection |
| 7. Assets | No | Download images, fonts, SVGs for sample pages |
| 8. Build verify | ⏸ Yes | Visual comparison of original vs clone screenshots |

### Resumability

Progress is tracked in `docs/research/progress.md`. If a session ends mid-clone
(token limit, timeout, Ctrl+C), a new session reads the progress file and resumes
from the last completed checkpoint.

### Adding remaining content

Phase 6 intentionally extracts only 2-3 sample pages per content type. After the clone
is verified, add remaining content by creating new `.md` files in `src/content/{collection}/`
following the frontmatter format shown in the samples.

## Output Structure

```
src/
├── content.config.ts       # Zod schemas for all collections
├── content/                # Sample Markdown content files
│   ├── {collection}/*.md
│   ├── blog/*.md
│   └── pages/*.md
├── layouts/                # Reusable page templates
├── components/             # Shared + page-specific UI components
├── pages/                  # Astro routes
└── styles/global.css       # Extracted design tokens
```

## Deployment

The output is a standard Astro static site. Deploy to any static host:

- **Cloudflare Pages**: `npm run build` → deploy `dist/`
- **Netlify**: connect repo, build command `npm run build`, publish `dist/`
- **Vercel**: `npx vercel` in the project root

## Inspired By

- [ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template)
  by JCodesMore — the original Next.js website cloner skill

## License

MIT
