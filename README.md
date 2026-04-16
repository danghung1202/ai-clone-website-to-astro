# Clone to Astro

A Claude Code skill that reverse-engineers any website and rebuilds it as a production-ready
[Astro](https://astro.build/) site with Content Collections.

## What This Does

Unlike pixel-perfect single-page cloners, this skill produces a **maintainable content site**:

- Identifies **page types** (homepage, listing, detail, static) — not individual pages
- Builds **reusable Astro layouts and components** for each page type
- Extracts real content into **Markdown files with YAML frontmatter**
- Generates **Content Collections with Zod schema validation**
- Downloads and organizes **images, fonts, and SVG assets**

The result: adding a new page to the cloned site = creating a new `.md` file. No code changes needed.

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

4. The skill walks through 8 phases automatically, writing audit specs to `docs/research/`
   and building the Astro project in the repo root.

5. When complete:
   ```bash
   npm run build    # Build static site
   npm run preview  # Preview locally
   ```

## Output Structure

```
src/
├── content.config.ts       # Zod schemas for all collections
├── content/                # Markdown content files
│   ├── tours/*.md
│   ├── blog/*.md
│   └── pages/*.md
├── layouts/                # Reusable page templates
├── components/             # Reusable UI components
├── pages/                  # Astro routes
└── styles/global.css       # Extracted design tokens
```

## How It Works

| Phase | What happens |
|---|---|
| 1. Recon | Crawl navigation, identify page types, classify URL patterns |
| 2. Foundation | Extract design tokens (colors, fonts, spacing) via Chrome MCP |
| 3. Schema | Generate Content Collections config with Zod validation |
| 4. Base layout | Build header, footer, and base template |
| 5. Page types | Build one layout + route per page type |
| 6. Content | Extract real text/metadata into Markdown files |
| 7. Assets | Download images, fonts, SVGs to `public/` |
| 8. Verify | Run `astro check` + `astro build`, compare screenshots |

Each phase writes a spec file to `docs/research/` before producing code.
Sessions can be resumed — a new Claude Code session reads the spec files and picks up
at the first incomplete phase.

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
