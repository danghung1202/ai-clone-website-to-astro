# Clone to Astro

This project clones websites into production-ready Astro sites with Content Collections.

## Quick Start

```
clone-to-astro <url>
```

## Requirements

- Chrome MCP must be enabled (browser automation for extraction)
- Node.js 18+ and npm

## Key Files

- `.claude/skills/clone-to-astro/SKILL.md` — Main skill definition
- `.claude/skills/clone-to-astro/references/astro-patterns.md` — Astro 5+ patterns
- `.claude/skills/clone-to-astro/references/extraction-patterns.md` — Chrome MCP extraction snippets
- `TARGET.md` — Target URL and scope configuration
- `docs/research/progress.md` — Clone progress tracker (auto-generated)
- `docs/research/` — Extraction specs and screenshots (audit trail)

## How It Works

The skill follows 10 phases with 6 user review gates:

| Phase | Review? | What happens |
|---|---|---|
| 1. Recon | ⏸ Yes | Crawl nav, group URLs, identify page types |
| 2. Foundation | ⏸ Yes | Extract design tokens (colors, fonts, spacing) |
| 3. Schema | ⏸ Yes | Generate Content Collections config with Zod validation |
| 4. Base layout | No | Build header, footer, base template |
| 5a. Component inventory | ⏸ Yes | Detect shared vs page-specific components |
| 5b. Shared components | No | Build reusable components first |
| 5c. Page-type layouts | No | Build one layout per page type using shared components |
| 6. Content (samples) | ⏸ Yes | Extract 2-3 sample .md files per collection |
| 7. Assets | No | Download images, fonts, SVGs for samples |
| 8. Build verify | ⏸ Yes | Visual comparison: original vs clone |

Progress is tracked in `docs/research/progress.md`. If a session ends mid-clone,
a new session reads the progress file and resumes from the last checkpoint.

## Output Structure

```
src/
├── content.config.ts          # Auto-generated Zod schema
├── content/
│   ├── {collection}/*.md      # Sample content files (2-3 per type)
│   ├── blog/*.md
│   └── pages/*.md
├── layouts/
│   ├── BaseLayout.astro       # Header + footer + global styles
│   ├── {Type}Layout.astro     # Detail page template per type
│   └── PageLayout.astro       # Generic page template
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   └── *.astro                # Shared + page-specific components
├── pages/
│   ├── index.astro            # Homepage
│   ├── {type}/[...slug].astro # Dynamic routes from collections
│   └── [slug].astro           # Static pages from collection
└── styles/
    └── global.css             # Extracted design tokens
```
