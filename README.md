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
   git clone https://github.com/your-username/clone-to-astro.git
   cd clone-to-astro
   ```

2. Edit `TARGET.md` with your target URL.

3. Open in Claude Code and run:
   ```
   clone-to-astro https://www.example.com
   ```

4. The skill walks through 10 phases, pausing at 6 review gates for your input.

5. When complete:
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
