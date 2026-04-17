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

2. **Check for existing progress.** If `docs/research/progress.md` exists, this is a RESUME.
   Read it, find the first incomplete phase, and skip to that phase. Show the user what's
   already done and where you're picking up.

3. **Read `TARGET.md`** for the URL and any scope notes. If it doesn't match `$ARGUMENTS`, update it.

4. **Verify the base project exists.** Check if `package.json` has `astro` as a dependency.
   - If YES: run `npm run build` to confirm it compiles.
   - If NO: scaffold a new Astro project:
     ```bash
     npm create astro@latest . -- --template minimal --no-install --no-git
     npx astro add tailwind --yes
     npm install
     ```

5. **Create output directories** if they don't exist:
   ```
   docs/research/
   docs/research/components/
   docs/research/content/
   src/content/
   src/layouts/
   src/components/
   ```

6. **Initialize `docs/research/progress.md`** (if not resuming):
   ```markdown
   ---
   target: $ARGUMENTS
   started: [current timestamp]
   last-updated: [current timestamp]
   ---
   # Clone Progress
   ## Phase 1: Site Reconnaissance — not-started
   ## Phase 2: Foundation Extraction — not-started
   ## Phase 3: Content Schema Generation — not-started
   ## Phase 4: Base Layout Extraction — not-started
   ## Phase 5a: Component Inventory — not-started
   ## Phase 5b: Shared Components — not-started
   ## Phase 5c: Page-Type Layouts — not-started
   ## Phase 6: Content Extraction (samples) — not-started
   ## Phase 7: Asset Pipeline — not-started
   ## Phase 8: Build Verification — not-started
   ```

## Guiding Principles

### 1. Page Types, Not Pages
You are identifying TYPES of pages, not cloning individual pages. A site with 50 product detail pages
has ONE product detail type. You build ONE layout and extract sample `.md` files that use it.

### 2. Content Separation Is the Whole Point
The output must cleanly separate structure (layouts, components) from content (Markdown files).
If you find yourself hardcoding text in `.astro` files, you are doing it wrong.

### 3. Spec Files Are Contracts
Every phase writes a spec file to `docs/research/` BEFORE producing code. The spec file is the
auditable record of what was extracted and what decisions were made.

### 4. Review Gates
Phases 1, 2, 3, 5a, 6, and 8 require user review before proceeding. At each gate:
1. Write the output file
2. Present a concise summary to the user (table or checklist — not the full file)
3. Ask: **"Review the above. Reply with changes or 'ok' to continue."**
4. If feedback → update → re-present. If ok → update progress.md → proceed.

Phases 4, 5b, 5c, and 7 proceed without pausing — the user reviews their output at Phase 8.

### 5. Shared Components Before Page Types
Detect reusable components BEFORE building any page-type layout. This prevents duplication
and ensures every layout references the same shared component library.

### 6. Samples, Not Exhaustive Extraction
Phase 6 extracts only 2-3 sample content files per collection type. This validates the schema
and content pipeline without burning tokens on 100 blog posts. The user adds remaining content later.

### 7. Extract How It Looks AND How It Behaves
Use `getComputedStyle()` via browser JS execution for exact CSS values — never eyeball.
Also capture behaviors: scroll-triggered animations, hover states, carousels, sticky headers.

### 8. Real Content, Real Assets
Extract actual text, images, and SVGs from the live site. This is a clone, not a mockup.

---

## Phase 1: Site Reconnaissance ⏸ REVIEW GATE

**Input:** Target URL
**Output:** `docs/research/site-map.md`
**Review:** User confirms page types before proceeding

This phase identifies page TYPES using a three-pass approach.

### Pass 1: Extract nav links (1 page visit)

1. Navigate to the target URL via browser automation.
2. Take a full-page screenshot → save to `docs/research/homepage-full.png`.
3. Extract links from `<nav>`, `<header>`, and `<footer>` ONLY:

   ```javascript
   const navLinks = new Set();
   const origin = window.location.origin;
   document.querySelectorAll('nav a, header a, footer a').forEach(a => {
     try {
       const url = new URL(a.href, origin);
       if (url.origin === origin && url.pathname !== '#') {
         navLinks.add(url.pathname);
       }
     } catch(e) {}
   });
   JSON.stringify([...navLinks].sort(), null, 2);
   ```

### Pass 2: Group by URL pattern (0 page visits)

Analyze paths as strings. Group URLs sharing a prefix + variable slug:

```
/                               → homepage (unique, 1 page)
/services                       → listing (1 page)
/services/web-design  ┐
/services/seo         ├→ detail (N pages, pattern: /services/[slug])
/services/branding    ┘
/about  ┐
/faq    ├→ static (top-level, no shared prefix — tentative)
/contact┘
/blog                           → listing (1 page)
/blog/post-1  ┐
/blog/post-2  ├→ detail (N pages, pattern: /blog/[slug])
```

Rules:
- `/{prefix}/{slug}` where multiple slugs exist → ONE page type
- `/{prefix}` without slug → likely a LISTING page for that type
- Top-level pages → tentatively "static" — Pass 3 confirms or splits
- Homepage `/` is always its own type

### Pass 3: Visit ONE representative per group (3-8 page visits)

1. Navigate to one representative URL per group.
2. Take a screenshot → `docs/research/{type}-representative.png`.
3. Confirm type by analyzing DOM structure:
   ```
   "homepage"  → Multiple diverse sections, hero, mixed content blocks
   "listing"   → Repeated card/item pattern, pagination or filters
   "detail"    → Single item with full content, sidebar or related items
   "static"    → Mostly prose content, minimal repeated structures
   "form"      → Dominant form element, input fields, submit button
   ```
4. For tentative groups (like "static"), visit 2 representatives. If `/about` has a team
   grid and `/faq` has an accordion, they are DIFFERENT types — split them.

### Write site-map.md and present for review

Write `docs/research/site-map.md`, then present this summary to the user:

```
## Page Types Found for [target]

| # | Type | Pattern | Pages | Representative |
|---|---|---|---|---|
| 1 | homepage | / | 1 | / |
| 2 | service-detail | /services/[slug] | 3 | /services/web-design |
| 3 | static | /[slug] | 2 | /about |
| 4 | blog-post | /blog/[slug] | 5 | /blog/post-1 |

Content collections needed: services (3 entries), pages (2 entries), blog (5 entries)

Review the above. Reply with changes (add/remove/rename types) or 'ok' to continue.
```

Update progress.md → Phase 1: complete. Proceed only after user approves.

---

## Phase 2: Foundation Extraction ⏸ REVIEW GATE

**Input:** `docs/research/site-map.md`
**Output:** `docs/research/design-tokens.md` + `src/styles/global.css`
**Review:** User confirms colors and fonts

### Steps

1. Navigate to the homepage.
2. Extract design tokens by executing JavaScript in the browser.
   See `references/extraction-patterns.md` for full extraction snippets.
3. Extract colors from buttons, links, headings, cards, backgrounds.
4. Identify web fonts (Google Fonts `<link>` tags, `@font-face` rules).
5. Check for CSS framework usage (Tailwind, Bootstrap).
6. Write `docs/research/design-tokens.md` with all extracted values.
7. Generate `src/styles/global.css` with CSS custom properties.

### Present for review

```
## Design Tokens Extracted

| Token | Value |
|---|---|
| Primary color | #2563eb |
| Secondary color | #64748b |
| Background | #ffffff |
| Text | #1e293b |
| Heading font | 'Playfair Display', serif |
| Body font | 'Inter', sans-serif |
| Container max-width | 1200px |

Font source: Google Fonts (2 families)
CSS framework detected: none / Tailwind / Bootstrap

Do these look correct? Reply with changes or 'ok' to continue.
```

Update progress.md → Phase 2: complete.

---

## Phase 3: Content Schema Generation ⏸ REVIEW GATE

**Input:** `docs/research/site-map.md` + `docs/research/design-tokens.md`
**Output:** `docs/research/content-schema.md` + `src/content.config.ts`
**Review:** User confirms content fields per collection

### Steps

1. For each page type with varying content, define a Content Collection schema.
2. Visit one representative page per type. Extract all content fields and their types.
   The fields depend entirely on the target site — extract whatever is present.
3. Write `docs/research/content-schema.md` documenting every collection and field.
4. Generate `src/content.config.ts` using Astro 5+ Content Layer API with `loader: glob()`.
   See `references/astro-patterns.md` for the correct syntax.

### Present for review

```
## Content Schema

### Collection: services (pattern: /services/[slug])
| Field | Type | Required | Example |
|---|---|---|---|
| title | string | yes | "Web Design" |
| slug | string | yes | "web-design" |
| price | number | no | 2500 |
| images | string[] | yes | ["/images/services/..."] |
| excerpt | string | no | "Custom responsive websites..." |

### Collection: pages (pattern: /[slug])
| Field | Type | Required | Example |
|---|---|---|---|
| title | string | yes | "About Us" |
| slug | string | yes | "about" |
| heroImage | string | no | "/images/about-hero.jpg" |

Are these fields correct? Missing any? Reply with changes or 'ok' to continue.
```

Update progress.md → Phase 3: complete.

---

## Phase 4: Base Layout Extraction

**Input:** Design tokens + site-map
**Output:** `src/layouts/BaseLayout.astro` + `src/components/Header.astro` + `src/components/Footer.astro`
**Review:** None — user reviews at Phase 8

### Steps

1. Navigate to the homepage.
2. **Extract header:** DOM structure, computed styles, scroll behavior, mobile menu.
   Write spec to `docs/research/components/header.md`.
3. **Extract footer:** Same process. Write spec to `docs/research/components/footer.md`.
4. Build `BaseLayout.astro`, `Header.astro`, `Footer.astro`.
5. Verify: `npx astro check` must pass.

Update progress.md → Phase 4: complete.

---

## Phase 5a: Component Inventory ⏸ REVIEW GATE

**Input:** Site map + representative page screenshots from Phase 1
**Output:** `docs/research/component-inventory.md`
**Review:** User confirms shared vs page-specific classification

This phase detects reusable components BEFORE building any page-type layout.
It prevents duplication by identifying shared patterns across page types.

### Step 1: Catalog UI blocks per page type

Revisit each representative page from Phase 1. For each page, extract repeated UI patterns:

```javascript
function catalogBlocks() {
  const blocks = [];
  document.querySelectorAll('section, [class*=section]').forEach(section => {
    const children = Array.from(
      section.querySelectorAll(':scope > div > div, :scope > ul > li')
    );
    if (children.length >= 2) {
      const first = children[0];
      blocks.push({
        section: section.className?.split(' ')[0] || 'unnamed',
        count: children.length,
        tag_structure: getTagStructure(first),
        has_image: !!first.querySelector('img'),
        has_heading: !!first.querySelector('h1,h2,h3,h4'),
        has_link: !!first.querySelector('a'),
        sample_text: first.textContent?.trim().substring(0, 100),
        width: first.offsetWidth,
        height: first.offsetHeight,
      });
    }
  });
  document.querySelectorAll(
    '[class*=cta], [class*=hero], [class*=banner], form'
  ).forEach(el => {
    blocks.push({
      type: 'standalone',
      class: el.className?.split(' ')[0] || 'unnamed',
      tag_structure: getTagStructure(el),
      width: el.offsetWidth,
      height: el.offsetHeight,
    });
  });
  return blocks;
}
function getTagStructure(el, depth = 0) {
  if (depth > 2) return '...';
  const ch = Array.from(el.children).map(c => getTagStructure(c, depth + 1));
  return el.tagName.toLowerCase() + (ch.length ? '(' + ch.join(',') + ')' : '');
}
JSON.stringify(catalogBlocks(), null, 2);
```

### Step 2: Compare across page types

Two blocks are the SAME component if:
- Same DOM nesting pattern (tag structure matches, ignoring class names)
- Same content slot types (same count of images, headings, paragraphs)
- Similar dimensions (width within 20%, height within 30%)

Class names do NOT need to match — frameworks generate different classes per page.

### Step 3: Classify and present for review

Write `docs/research/component-inventory.md`, then present:

```
## Component Inventory

### Shared Components (appear on 2+ page types)
| Component | Description | Found on |
|---|---|---|
| ItemCard | img + h3 + p + price | homepage, service-detail (related) |
| CTAButton | styled link/button | homepage, service-detail, static |
| ImageGallery | multi-image carousel | service-detail, blog-post |

### Page-Specific Components
| Component | Description | Found on |
|---|---|---|
| TestimonialCard | img + quote + name | homepage only |
| AuthorBio | avatar + name + bio | blog-post only |
| AccordionFAQ | collapsible Q&A | faq only |

Shared components will be built first (Phase 5b).
Page-specific components will be built with their layout (Phase 5c).

Should any component move between shared/page-specific? 'ok' to continue.
```

Update progress.md → Phase 5a: complete.

---

## Phase 5b: Build Shared Components

**Input:** Component inventory + design tokens
**Output:** `src/components/*.astro` for each shared component
**Review:** None — user reviews at Phase 8

For each shared component:

1. Visit a page where the component appears.
2. Extract exact CSS via `getComputedStyle()`.
3. Write spec to `docs/research/components/{component-name}.md`.
4. Build `src/components/{ComponentName}.astro` with typed Props interface.

**Component guidelines:**
- Props interface for every component — typed, documented.
- Use `Astro.props` destructuring with defaults.
- Keep components pure — no data fetching, only in pages/layouts.
- Interactive components → `client:visible` framework island.

After all shared components: `npx astro check` must pass.

Update progress.md → Phase 5b: complete.

---

## Phase 5c: Page-Type Layout Extraction

**Input:** Shared components + site map + design tokens
**Output:** One layout + one route file per page type
**Review:** None — user reviews at Phase 8

For EACH page type, in sequence:

1. Navigate to the representative page. Take full-page screenshot.
2. Walk section by section, extracting DOM structure and computed styles.
3. Write `docs/research/components/{type}-layout.md` with all section details.
4. Build `src/layouts/{Type}Layout.astro` extending `BaseLayout`.
   USE shared components from Phase 5b. Build page-specific components inline.
5. Create the route file: `src/pages/{route}/[...slug].astro` or `index.astro`.

**Track progress per page type:**
```
## Phase 5c: Page-Type Layouts — in-progress
completed:
  - service-detail → src/layouts/ServiceLayout.astro ✓
  - static → src/layouts/PageLayout.astro ✓
remaining:
  - blog-post
  - homepage
```

After all page types: `npx astro check` must pass.

Update progress.md → Phase 5c: complete.

---

## Phase 6: Content Extraction (samples) ⏸ REVIEW GATE

**Input:** Content schema + page-type layouts
**Output:** 2-3 sample `.md` files per content collection
**Review:** User verifies sample content files are correct

Extract only **2-3 sample pages per collection** — enough to validate the pipeline.

### Steps

For each collection, pick 2-3 representative pages:

1. Navigate to the page via browser automation.
2. Extract all content fields defined in the schema:
   - Text: `element.textContent` via JS execution
   - Images: collect `<img>` src URLs → download list
   - Links: href values for CTAs
3. Write `.md` file with YAML frontmatter matching the Phase 3 schema.
4. Write `docs/research/content/{collection}-extraction.md` documenting decisions.

**Track progress per file:**
```
## Phase 6: Content Extraction (samples) — in-progress
completed:
  - services/web-design.md ✓
  - services/seo.md ✓
remaining:
  - pages/about.md
  - blog/first-post.md
```

### Present for review

```
## Sample Content Extracted

| Collection | Files | Samples |
|---|---|---|
| services | 2 | web-design.md, seo.md |
| pages | 1 | about.md |
| blog | 1 | first-post.md |

Check src/content/ — do the .md files have correct fields and content?
Remaining pages can be added later by creating new .md files in the same format.

Reply with changes or 'ok' to continue.
```

Update progress.md → Phase 6: complete.

---

## Phase 7: Asset Pipeline

**Input:** Image URLs collected during Phases 4-6 (sample pages only)
**Output:** Downloaded assets in `public/images/`
**Review:** None

1. Compile image URLs from spec files and sample content files.
2. Create directory structure: `public/images/{collection-name}/`, `general/`, `icons/`.
3. Download each image using `curl`.
4. Save inline SVGs as `.astro` components in `src/components/icons/`.
5. Download web fonts if self-hosted.
6. Update image references in `.md` and `.astro` files to local paths.

Update progress.md → Phase 7: complete.

---

## Phase 8: Build Verification ⏸ REVIEW GATE

**Input:** Complete project
**Output:** Verified, deployable Astro site
**Review:** User does final visual comparison

1. Run `npx astro check` — fix any TypeScript/schema errors.
2. Run `npx astro build` — fix any build errors.
3. Run `npx astro preview` and use browser automation to visually compare
   each page type against the original screenshots.
4. Document differences in `docs/research/build-review.md`.

### Present for review

```
## Clone Complete

Target: [URL]
Page types: N (list them)
Content collections: N ({name}: X sample entries each)
Shared components: N (list them)
Layouts: N (list them)

### Deployment
- `npm run build` → outputs to dist/
- Deploy to Cloudflare Pages, Netlify, or Vercel

### Adding content
Create new .md files in src/content/{collection}/ following the sample format.

### Screenshots: [show original vs clone for each page type]

Review the screenshots. Reply with fixes needed or 'ok' to finalize.
```

Update progress.md → Phase 8: complete.

---

## Progress Tracking

`docs/research/progress.md` is the single source of truth for clone state.

### Rules
- Update progress.md AFTER each phase or sub-item completes — not before, not during.
- Only mark complete when ALL output files for that phase are fully written to disk.
- Phases 5c and 6 track per-item progress (each page type / each content file).
- Always update the `last-updated` timestamp.

### Resume flow
When `docs/research/progress.md` exists at skill start:
1. Read progress.md
2. Find the first phase with status != complete
3. If `in-progress`: resume from the first sub-item without ✓
4. If `not-started`: verify prerequisites, start normally
5. Tell user: "Resuming clone of [target] — picking up at Phase X"

---

## Reference Files

- **`references/astro-patterns.md`** — Astro 5+ Content Layer API, component conventions,
  routing, image handling, Tailwind. Read before Phase 3.
- **`references/extraction-patterns.md`** — Browser JavaScript snippets for design tokens,
  DOM structure, computed styles, content extraction. Read before Phase 2.
