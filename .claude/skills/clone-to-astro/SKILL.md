---
name: clone-to-astro
description: >
  Reverse-engineer any website and rebuild it as a production-ready Astro site with Content Collections.
  Unlike a pixel-perfect single-page clone, this skill identifies page TYPES (homepage, listing, detail, static),
  builds reusable Astro layouts and components for each type, and extracts real content into Markdown files
  with validated YAML frontmatter — producing a maintainable site where adding content = adding a .md file.
  Use this whenever the user wants to clone, replicate, rebuild, or reverse-engineer a website into Astro.
  Also triggers on: "make an Astro version of this site", "convert this site to Astro", "replicate this website",
  "build a site like X", "clone to astro". Provide the target URL as an argument.
argument-hint: <url>
user-invocable: true
---

# Clone to Astro

You are about to reverse-engineer **$ARGUMENTS** and rebuild it as a production-ready Astro site
with Content Collections, reusable layouts, and real extracted content.

This is NOT a pixel-perfect screenshot clone. You are building a **maintainable content site** where:
- Each page TYPE gets ONE layout/template (not one component per page)
- Content lives in Markdown files with YAML frontmatter (not hardcoded in components)
- Adding a new page = creating a new `.md` file — zero code changes needed
- The site follows Astro best practices: Content Collections, `astro:image`, Tailwind CSS

## Pre-Flight

Run these checks before anything else. If any fail, stop and tell the user.

1. **Chrome MCP is required.** Test with a simple navigation. If unavailable, stop — this skill
   needs browser automation for screenshots, DOM inspection, and computed style extraction.
2. **Read `TARGET.md`** for the URL and any scope notes. If it doesn't match `$ARGUMENTS`, update it.
3. **Verify the base project exists.** Check if `package.json` has `astro` as a dependency.
   - If YES: run `npm run build` to confirm it compiles.
   - If NO: scaffold a new Astro project:
     ```bash
     npm create astro@latest . -- --template minimal --no-install --no-git
     npx astro add tailwind --yes
     npm install
     ```
4. **Create output directories** if they don't exist:
   ```
   docs/research/
   docs/research/components/
   docs/research/content/
   src/content/
   src/layouts/
   src/components/
   ```

## Guiding Principles

These are non-negotiable. They override any shortcut instincts.

### 1. Page Types, Not Pages

You are identifying TYPES of pages, not cloning individual pages. A site with 50 product detail pages
has ONE product detail type. You build ONE `ProductLayout.astro` and extract 50 `.md` files that use it.

### 2. Content Separation Is the Whole Point

The output must cleanly separate structure (layouts, components) from content (Markdown files).
If you find yourself hardcoding text in `.astro` files, you are doing it wrong. That text belongs
in a `.md` file's frontmatter or body.

### 3. Spec Files Are Contracts

Every phase writes a spec file to `docs/research/` BEFORE producing code. The spec file is the
auditable record of what was extracted and what decisions were made. If something looks wrong later,
the spec file is where you debug — not by re-inspecting the live site.

### 4. Foundation First, Content Last

The dependency chain is strict:
```
Phase 1 (Recon) → Phase 2 (Foundation) → Phase 3 (Schema) → Phase 4 (Base Layout)
→ Phase 5 (Page-Type Layouts) → Phase 6 (Content Extraction) → Phase 7 (Assets) → Phase 8 (Build)
```
No phase may start until its predecessor completes. Each phase builds on the previous output.

### 5. Extract How It Looks AND How It Behaves

Use `getComputedStyle()` via browser JS execution for exact CSS values — never eyeball or approximate.
Also capture behaviors: scroll-triggered animations, hover states, carousels, sticky headers.
Document both the static appearance and the dynamic behavior in every spec file.

### 6. Real Content, Real Assets

Extract actual text, images, and SVGs from the live site. This is a clone, not a mockup.
Download every `<img>` src. Extract every inline `<svg>`. Copy every heading and paragraph verbatim.
The only time you generate placeholder content is when something is clearly session-specific.

---

## Phase 1: Site Reconnaissance

**Input:** Target URL
**Output:** `docs/research/site-map.md`

### Steps

1. Navigate to the target URL with Chrome MCP.
2. Take a full-page screenshot → save to `docs/research/homepage-full.png`.
3. Extract the navigation structure — every link in `<nav>`, `<header>`, and footer.
4. Classify each linked page into a PAGE TYPE by visiting it and analyzing its structure:

   ```
   PAGE TYPE CLASSIFICATION:
   - "homepage"    → Unique landing page, usually has hero + multiple sections
   - "listing"     → Shows a grid/list of items (tours, blog posts, products)
   - "detail"      → Shows one item with full content (tour detail, blog post)
   - "static"      → Informational page (about, contact, FAQ, terms)
   - "form"        → Page centered on a form (contact, booking, signup)
   - "blog-index"  → Blog listing page (variant of listing)
   - "blog-post"   → Individual blog entry (variant of detail)
   ```

5. For each page type, visit ONE representative page and note:
   - URL pattern (e.g., `/services/[slug]`, `/blog/[slug]`)
   - Key sections visible on the page
   - What content varies between pages of this type vs what is shared
   - Interactive elements (carousels, tabs, accordions, forms)

6. Write `docs/research/site-map.md` with this structure:

   ```markdown
   ---
   phase: 1
   name: site-reconnaissance
   target: https://example.com
   status: complete
   page-types-found: 4
   total-pages: 12
   ---

   # Site Map — example.com

   ## Navigation Structure
   - Home → /
   - Services → /services (listing)
     - Web Design → /services/web-design (detail)
     - SEO → /services/seo (detail)
     ...
   - About → /about (static)
   - Blog → /blog (blog-index)
   - FAQ → /faq (static)
   - Contact → /contact (form)

   ## Page Types Identified

   ### 1. homepage (1 page)
   Representative: /
   Sections: hero, services-grid, testimonials, CTA-banner
   Interactive: image carousel in hero, category filter tabs

   ### 2. service-detail (6 pages)
   Representative: /services/web-design
   URL pattern: /services/[slug]
   Sections: image-gallery, description, pricing, CTA, related-services
   Content that varies: title, images, description, price, features
   Content that's shared: header, footer, CTA behavior, layout
   Interactive: image gallery lightbox

   ### 3. static (3 pages: about, faq, contact)
   Representative: /about
   URL pattern: /[slug]
   Sections: hero-banner, content-body
   Content that varies: title, body text, images

   ### 4. blog-post (2 pages)
   ...

   ## Shared Components Identified
   - Header (with nav + mobile menu)
   - Footer (with social links + copyright)
   - Service card (used on homepage + related services)
   - CTA button
   - Image gallery
   ```

---

## Phase 2: Foundation Extraction

**Input:** `docs/research/site-map.md`
**Output:** `docs/research/design-tokens.md` + `src/styles/global.css`

### Steps

1. Navigate to the homepage.
2. Extract design tokens via Chrome MCP JavaScript execution:

   ```javascript
   // Run this in Chrome MCP to extract design tokens
   const body = document.body;
   const cs = getComputedStyle(body);
   const tokens = {
     fonts: {
       body: cs.fontFamily,
       heading: getComputedStyle(document.querySelector('h1,h2,.heading')).fontFamily,
       size_base: cs.fontSize,
       line_height: cs.lineHeight,
     },
     colors: {
       background: cs.backgroundColor,
       text: cs.color,
       // Extract from key elements: buttons, links, headings, cards
     },
     spacing: {
       container_max_width: getComputedStyle(document.querySelector('.container,[class*=container],[class*=wrapper]')).maxWidth,
       section_padding: getComputedStyle(document.querySelector('section')).padding,
     }
   };
   JSON.stringify(tokens, null, 2);
   ```

3. Extract colors from buttons, links, headings, cards, backgrounds — aim for the complete palette.
4. Identify and note web fonts (check `<link>` tags for Google Fonts, or `@font-face` in stylesheets).
5. Check for CSS framework usage (Tailwind classes, Bootstrap, etc.) — this informs component extraction.
6. Write `docs/research/design-tokens.md` with all extracted values.
7. Generate `src/styles/global.css` with CSS custom properties:

   ```css
   /* Auto-extracted from [target URL] */
   @import url('https://fonts.googleapis.com/css2?family=...');

   :root {
     --color-primary: #...;
     --color-secondary: #...;
     --color-accent: #...;
     --color-bg: #...;
     --color-text: #...;
     --color-text-muted: #...;
     --font-heading: '...', sans-serif;
     --font-body: '...', sans-serif;
     --max-width: 1200px;
     --spacing-section: 4rem;
   }

   /* Reset + base */
   *, *::before, *::after { box-sizing: border-box; margin: 0; }
   body { font-family: var(--font-body); color: var(--color-text); background: var(--color-bg); }
   ```

---

## Phase 3: Content Schema Generation

**Input:** `docs/research/site-map.md` + `docs/research/design-tokens.md`
**Output:** `docs/research/content-schema.md` + `src/content.config.ts`

### Steps

1. For each page type that has VARYING content (detail pages, blog posts, static pages), define
   a Content Collection with a Zod schema matching the content fields identified in Phase 1.

2. Visit one representative page per type. Extract all content fields and their types.
   Example for a services site:
   ```
   Service Detail → title (string), slug (string), price (number), currency (enum),
   features (array of strings), description (string, long),
   images (array of strings), category (string), featured (boolean),
   ctaLink (string, url)
   ```
   The actual fields depend entirely on the target site. A recipe site would have ingredients,
   cook time, servings. A portfolio site would have client name, project type, year. Extract
   whatever fields are present on the page.

3. Write `docs/research/content-schema.md` documenting every collection and field.

4. Generate `src/content.config.ts`. Here is an example for a services site — adapt the
   collections and fields to match whatever the target site actually contains:

   ```typescript
   import { defineCollection, z } from 'astro:content';
   import { glob } from 'astro/loaders';

   // Example: a services site. YOUR schema will differ based on the target.
   const services = defineCollection({
     loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
     schema: z.object({
       title: z.string(),
       slug: z.string(),
       price: z.number().optional(),
       description: z.string(),
       category: z.string(),
       featured: z.boolean().default(false),
       images: z.array(z.string()),
       ctaLink: z.string().url().optional(),
       excerpt: z.string().optional(),
     }),
   });

   // Repeat for every content type found on the target site
   // (blog, pages, team members, products, recipes, projects, etc.)
   export const collections = { services };
   ```

   **Important:** Use the Astro 5+ Content Layer API with `loader: glob()` — not the legacy
   `type: 'content'` syntax. See `references/astro-patterns.md` for the correct pattern.

---

## Phase 4: Base Layout Extraction

**Input:** Design tokens + site-map
**Output:** `src/layouts/BaseLayout.astro` + `src/components/Header.astro` + `src/components/Footer.astro`

### Steps

1. Navigate to the homepage with Chrome MCP.
2. **Extract header:**
   - Take a screenshot of just the header area.
   - Extract full DOM structure of `<header>` or `<nav>`.
   - Extract computed styles for: background, height, padding, font sizes, link colors, logo dimensions.
   - Check for scroll behavior: does it get sticky? Change background? Shrink?
   - Document mobile menu: hamburger icon, slide-out panel, overlay.
   - Write `docs/research/components/header.md` with all extracted data.

3. **Extract footer:**
   - Same process as header for `<footer>`.
   - Write `docs/research/components/footer.md`.

4. **Build `BaseLayout.astro`:**
   ```astro
   ---
   import Header from '../components/Header.astro';
   import Footer from '../components/Footer.astro';
   import '../styles/global.css';

   interface Props {
     title: string;
     description?: string;
   }
   const { title, description = '' } = Astro.props;
   ---
   <!doctype html>
   <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <title>{title}</title>
     <meta name="description" content={description} />
   </head>
   <body>
     <Header />
     <main><slot /></main>
     <Footer />
   </body>
   </html>
   ```

5. Build `Header.astro` and `Footer.astro` from the extracted specs.
6. Verify: `npx astro check` must pass after this phase.

---

## Phase 5: Page-Type Layout Extraction

**Input:** Site map + base layout + design tokens
**Output:** One layout + one route file per page type

For EACH page type identified in Phase 1, execute this loop:

### 5.1 Screenshot + Inspect

1. Navigate to the representative page for this type.
2. Take a full-page screenshot → `docs/research/components/{type}-full.png`.
3. Walk the page section by section (scroll down, inspecting each major `<section>` or content block).

### 5.2 Extract Section Design

For each section on the page, extract via Chrome MCP:
- DOM structure (simplified — focus on layout, not every nested div)
- Computed styles: widths, padding, margins, backgrounds, typography, borders
- Responsive behavior: resize viewport to 768px and 375px, note what changes
- Interactive behavior: hover states, scroll triggers, animations

### 5.3 Write Component Specs

For reusable pieces (cards, galleries, CTAs), write individual spec files:
```
docs/research/components/{component-name}.md
```

Each spec file MUST include:
- Screenshot reference (path to the saved screenshot)
- Exact CSS values from `getComputedStyle()`
- DOM structure (simplified HTML)
- Content fields (what varies, what's static)
- Behavior (hover, click, scroll, animation)
- Responsive changes (tablet, mobile)

### 5.4 Build Layout + Components

1. Create `src/layouts/{Type}Layout.astro` extending `BaseLayout`.
2. Create `src/components/{ComponentName}.astro` for reusable pieces.
3. Create `src/pages/{route}/[...slug].astro` (or `index.astro` for listings).

**Component guidelines:**
- Props interface for every component — typed, documented.
- Use `Astro.props` destructuring with defaults.
- Use `class:list` for conditional classes.
- Keep components pure — no data fetching inside components, only in pages/layouts.
- Interactive components that need JS use `client:load` or `client:visible` with a
  framework island (React/Svelte/Vue) — keep these minimal.

### 5.5 Verify

After each page type: `npx astro check` must pass.

---

## Phase 6: Content Extraction

**Input:** Content schema + page-type layouts
**Output:** Markdown files in `src/content/{collection}/`

For EACH page within a content collection:

1. Navigate to the page with Chrome MCP.
2. Extract all content fields defined in the schema:
   - Text: use `element.textContent` via JS execution in Chrome MCP
   - Images: collect all `<img>` src URLs → save to download list
   - Links: extract href values for CTAs and navigation
3. Write the Markdown file with YAML frontmatter. Example for a services site:

   ```markdown
   ---
   title: "Web Design"
   slug: web-design
   price: 2500
   description: "Custom responsive websites built for performance"
   category: design
   featured: true
   images:
     - /images/services/web-design-01.jpg
     - /images/services/web-design-02.jpg
   ctaLink: "/contact?service=web-design"
   excerpt: "Custom responsive websites built for performance and conversion"
   ---

   We create beautiful, fast websites tailored to your brand.
   Our process starts with understanding your goals...
   ```

   The frontmatter fields MUST match the schema defined in Phase 3.
   The body below the `---` is the free-form Markdown content for that page.

4. Write `docs/research/content/{collection}-extraction.md` documenting what was extracted
   from each page and any decisions made (e.g., "CTA linked to a third-party form — replaced
   with local contact page link").

---

## Phase 7: Asset Pipeline

**Input:** All image URLs collected during Phases 4-6
**Output:** Downloaded assets in `public/images/`

### Steps

1. Compile the full list of image URLs from all spec files and content files.
2. Create directory structure mirroring the content collections found:
   ```
   public/images/
   ├── {collection-name}/    # One folder per content collection
   ├── general/              # Shared images (hero, backgrounds)
   └── icons/                # Extracted SVG icons
   ```
3. Download each image using `curl`:
   ```bash
   curl -L -o public/images/services/web-design-01.jpg "https://..."
   ```
4. For inline SVGs extracted from the site, save as `.astro` components in `src/components/icons/`.
5. Download web fonts if they're self-hosted (not Google Fonts CDN).
6. Update all image references in `.md` files and `.astro` components to use local paths.
7. **Optimization note:** Tell the user they can run `npx astro build` and Astro's built-in
   image optimization will handle WebP conversion and responsive sizes automatically for images
   used via the `<Image />` component.

---

## Phase 8: Build Verification

**Input:** Complete project
**Output:** Verified, deployable Astro site

### Steps

1. Run `npx astro check` — fix any TypeScript/schema errors.
2. Run `npx astro build` — fix any build errors.
3. Run `npx astro preview` and use Chrome MCP to visually compare:
   - Navigate to each page type on the built site
   - Take screenshots
   - Compare against the original screenshots from Phase 1 and Phase 5
4. Document any visual differences in `docs/research/build-review.md`.
5. Present a summary to the user:
   ```
   ## Clone Complete

   Target: https://example.com
   Page types: N (list them: homepage, {type}-detail, static, blog-post, ...)
   Content collections: N ({name}: X entries, {name}: Y entries, ...)
   Components: N (Header, Footer, {Name}Card, ...)
   Layouts: N (BaseLayout, {Type}Layout, PageLayout, ...)

   ### Ready for deployment
   - `npm run build` → outputs to dist/
   - Deploy to Cloudflare Pages, Netlify, or Vercel
   - Add content by creating new .md files in src/content/
   ```

---

## Resumability

If a session ends mid-clone, a new session can resume by:
1. Reading `docs/research/site-map.md` to understand the target and page types.
2. Checking each `docs/research/` spec file for `status: complete` in the frontmatter.
3. Picking up at the first incomplete phase.

This is why spec files are non-negotiable — they are the session handover mechanism.

---

## Reference Files

Read these for detailed patterns when building specific parts:

- **`references/astro-patterns.md`** — Astro 5+ Content Layer API patterns, component conventions,
  routing patterns, image handling, and Tailwind integration. Read this before Phase 3.
- **`references/extraction-patterns.md`** — Detailed Chrome MCP JavaScript snippets for extracting
  design tokens, DOM structure, computed styles, and content. Read this before Phase 2.
