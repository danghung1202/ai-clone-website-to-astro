# Clone to Astro

This project clones websites into production-ready Astro sites with Content Collections.

## Quick Start

```
clone-to-astro <url>
```

This triggers the `clone-to-astro` skill which:
1. Crawls the target site's navigation to identify page types
2. Extracts design tokens, layouts, and content
3. Builds an Astro project with Content Collections, reusable layouts, and Markdown content files

## Requirements

- Chrome MCP must be enabled (browser automation for extraction)
- Node.js 18+ and npm

## Key Files

- `.claude/skills/clone-to-astro/SKILL.md` — Main skill definition
- `.claude/skills/clone-to-astro/references/astro-patterns.md` — Astro 5+ patterns
- `.claude/skills/clone-to-astro/references/extraction-patterns.md` — Chrome MCP extraction snippets
- `TARGET.md` — Target URL and scope configuration
- `docs/research/` — Extraction specs and screenshots (audit trail)

## How It Works

The skill follows 8 sequential phases:
1. Site reconnaissance (crawl nav, identify page types)
2. Foundation extraction (design tokens, fonts, colors)
3. Content schema generation (Zod schemas for Content Collections)
4. Base layout extraction (header, footer, base template)
5. Page-type layout extraction (one layout per page type)
6. Content extraction (Markdown files with YAML frontmatter)
7. Asset pipeline (download images, fonts, SVGs)
8. Build verification (astro check + astro build)

Each phase writes a spec file to `docs/research/` before producing code.
If a session ends mid-clone, a new session reads the spec files to resume.

## Output Structure

```
src/
├── content.config.ts          # Auto-generated Zod schema
├── content/
│   ├── tours/*.md             # Content files per collection
│   ├── blog/*.md
│   └── pages/*.md
├── layouts/
│   ├── BaseLayout.astro       # Header + footer + global styles
│   ├── TourLayout.astro       # Tour detail template
│   └── PageLayout.astro       # Generic page template
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   └── *.astro                # Reusable components
├── pages/
│   ├── index.astro            # Homepage
│   ├── tours/[...slug].astro  # Dynamic routes from collections
│   └── [slug].astro           # Static pages from collection
└── styles/
    └── global.css             # Extracted design tokens
```
