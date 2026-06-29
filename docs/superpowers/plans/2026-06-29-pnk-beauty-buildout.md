# PNK Beauty Buildout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the current PNK Beauty Astro homepage into a professional multi-page clinic site while preserving the Venetian-inspired Astro design language.

**Architecture:** Keep the current homepage as the bespoke visual flagship. Add typed data files for site info, navigation, treatments, treatment categories, articles, and utility pages; generate static Astro routes from those data files. Add reusable subpage components that inherit the existing tokens, imagery, pill buttons, carousel-card language, cream editorial sections, and black/gold CTA moments.

**Tech Stack:** Astro 5 static output, TypeScript data modules, existing GSAP/SplitType/Swiper motion stack, no new npm dependencies.

---

## Visual Notes

- Visual thesis: premium boutique clinic in Boras with cinematic black/gold entry, warm cream editorial pages, real PNK treatment/clinic imagery, and calm medical trust.
- Content plan: homepage, treatment index, treatment/category pages, articles, prices, booking, contact, team, reviews, gift card, policies, sitemap, robots.
- Interaction thesis: keep homepage hero blinds, clip reveals, carousel, pinned scroll sections, and contact reveals; use restrained subpage reveals so detail pages stay readable.

## Task 1: Verification Harness

**Files:**
- Create: `tools/expected-routes.mjs`
- Create: `tools/verify-static-build.mjs`
- Modify: `package.json`

- [ ] **Step 1: Create route expectations**

Create `tools/expected-routes.mjs` with the canonical routes that must exist after the build.

```js
export const expectedRoutes = [
  "/",
  "/behandlingar/",
  "/behandlingar/injektioner-boras/",
  "/behandlingar/hudvard-boras/",
  "/behandlingar/ansiktsbehandlingar-boras/",
  "/behandlingar/plasma-pen-boras/",
  "/behandlingar/fransar-bryn-boras/",
  "/behandlingar/naglar-fotter-boras/",
  "/behandlingar/makeup-boras/",
  "/behandlingar/massage-boras/",
  "/behandlingar/piercing-boras/",
  "/behandlingar/konsultation/",
  "/behandlingar/botox-boras/",
  "/behandlingar/fillers-boras/",
  "/behandlingar/lappfillers-boras/",
  "/behandlingar/fillers-kinder-boras/",
  "/behandlingar/fillers-haka-boras/",
  "/behandlingar/fillers-kaklinje-boras/",
  "/behandlingar/fillers-nasolabial-boras/",
  "/behandlingar/prophilo-boras/",
  "/behandlingar/microneedling-boras/",
  "/behandlingar/bb-glow-boras/",
  "/behandlingar/kemisk-peeling-boras/",
  "/behandlingar/biorepeel-boras/",
  "/behandlingar/dubai-lips-boras/",
  "/behandlingar/plasma-pen-ogonlockslyft-boras/",
  "/behandlingar/plasma-pen-under-ogonen-boras/",
  "/behandlingar/plasma-pen-kraksparkar-boras/",
  "/behandlingar/plasma-pen-hudbristningar-boras/",
  "/behandlingar/plasma-pen-hudflikar-pigment-boras/",
  "/behandlingar/plasma-pen-panna-arga-rynkan-boras/",
  "/behandlingar/klassisk-ansiktsbehandling-boras/",
  "/behandlingar/marina-miracles-boras/",
  "/behandlingar/pure-cell-treatment-boras/",
  "/behandlingar/microdermabrasion-boras/",
  "/behandlingar/lashlift-boras/",
  "/behandlingar/manikyr-boras/",
  "/behandlingar/pedikyr-boras/",
  "/behandlingar/makeup-vardag-boras/",
  "/behandlingar/makeup-fest-boras/",
  "/behandlingar/indian-head-massage-boras/",
  "/behandlingar/oronpiercing-boras/",
  "/artiklar/",
  "/artiklar/att-tanka-pa-efter-botox/",
  "/artiklar/botox-eller-fillers/",
  "/artiklar/hur-lange-haller-fillers/",
  "/artiklar/eftervard-fillers-lappar/",
  "/artiklar/microneedling-eller-kemisk-peeling/",
  "/artiklar/vad-ar-biorepeel/",
  "/artiklar/plasma-pen-eftervard/",
  "/artiklar/lashlift-eftervard/",
  "/artiklar/sa-valjer-du-ansiktsbehandling/",
  "/artiklar/prophilo-vad-ar-det/",
  "/artiklar/trygga-injektionsbehandlingar-boras/",
  "/priser/",
  "/boka/",
  "/presentkort/",
  "/om-kliniken/",
  "/personal/",
  "/recensioner/",
  "/kontakt/",
  "/integritetspolicy/",
  "/allmanna-villkor/"
];
```

- [ ] **Step 2: Create static build verifier**

Create `tools/verify-static-build.mjs`.

```js
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expectedRoutes } from "./expected-routes.mjs";

const root = process.cwd();
const dist = join(root, "dist");
const canonicalHost = "https://pnkbeauty.se";
const failures = [];

function routeToFile(route) {
  if (route === "/") return join(dist, "index.html");
  return join(dist, route.replace(/^\\//, ""), "index.html");
}

function check(condition, message) {
  if (!condition) failures.push(message);
}

check(existsSync(join(dist, "index.html")), "Missing dist/index.html");
check(existsSync(join(dist, "sitemap.xml")), "Missing dist/sitemap.xml");
check(existsSync(join(dist, "robots.txt")), "Missing dist/robots.txt");

const sitemap = existsSync(join(dist, "sitemap.xml"))
  ? readFileSync(join(dist, "sitemap.xml"), "utf8")
  : "";

for (const route of expectedRoutes) {
  const file = routeToFile(route);
  check(existsSync(file), `Missing built route file for ${route}`);
  check(sitemap.includes(`${canonicalHost}${route}`), `Missing sitemap URL for ${route}`);
}

const builtHome = existsSync(join(dist, "index.html"))
  ? readFileSync(join(dist, "index.html"), "utf8")
  : "";

for (const forbidden of ["venetian-astro.local", "example.com", "localhost:3000", "your-google-verification-code"]) {
  check(!builtHome.includes(forbidden), `Forbidden placeholder found in home HTML: ${forbidden}`);
  check(!sitemap.includes(forbidden), `Forbidden placeholder found in sitemap: ${forbidden}`);
}

check(builtHome.includes("PNK Beauty Klinik"), "Home HTML should contain PNK Beauty Klinik");
check(builtHome.includes("Bokadirekt"), "Home HTML should contain Bokadirekt booking copy");

if (failures.length) {
  console.error("Static build verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Static build verification passed for ${expectedRoutes.length} routes.`);
```

- [ ] **Step 3: Add script**

Modify `package.json` scripts:

```json
"verify:static": "npm run build && node tools/verify-static-build.mjs"
```

- [ ] **Step 4: Verify RED**

Run:

```bash
npm run verify:static
```

Expected: FAIL because most routes plus `sitemap.xml` and `robots.txt` do not exist yet.

## Task 2: Site, Navigation, and Content Data

**Files:**
- Create: `src/data/site.ts`
- Create: `src/data/navigation.ts`
- Create: `src/data/treatments.ts`
- Create: `src/data/articles.ts`
- Modify: `src/data/home.ts`

- [ ] **Step 1: Create site constants**

Create `src/data/site.ts` with canonical business data.

```ts
export const site = {
  name: "PNK Beauty Klinik",
  domain: "https://pnkbeauty.se",
  locale: "sv_SE",
  defaultTitle: "PNK Beauty Klinik - Skönhetsklinik i Borås",
  defaultDescription:
    "PNK Beauty Klinik i Borås erbjuder Botox, fillers, ansiktsbehandlingar, microneedling, kemisk peeling och skönhetsbehandlingar med specialistsjuksköterska och auktoriserad hudterapeut.",
  bookingUrl: "https://www.bokadirekt.se/places/pnk-beauty-klinik-46381",
  address: {
    street: "Brämhultsvägen 4",
    postalCode: "504 56",
    city: "Borås",
    country: "SE"
  },
  phone: "073-530 30 97",
  phoneMachine: "+46735303097",
  email: "info@pnkbeauty.se",
  rating: {
    value: "4.8",
    count: 12,
    source: "Bokadirekt"
  },
  ogImage: "/images/pnk/hero.jpeg"
} as const;
```

- [ ] **Step 2: Create navigation data**

Create `src/data/navigation.ts`.

```ts
import { site } from "./site";

export const navItems = [
  { label: "Behandlingar", href: "/behandlingar/" },
  { label: "Priser", href: "/priser/" },
  { label: "Om kliniken", href: "/om-kliniken/" },
  { label: "Artiklar", href: "/artiklar/" },
  { label: "Kontakt", href: "/kontakt/" }
];

export const footerGroups = [
  {
    title: "Populära behandlingar",
    links: [
      { label: "Botox Borås", href: "/behandlingar/botox-boras/" },
      { label: "Fillers Borås", href: "/behandlingar/fillers-boras/" },
      { label: "Microneedling", href: "/behandlingar/microneedling-boras/" },
      { label: "Kemisk peeling", href: "/behandlingar/kemisk-peeling-boras/" }
    ]
  },
  {
    title: "Kliniken",
    links: [
      { label: "Om kliniken", href: "/om-kliniken/" },
      { label: "Personal", href: "/personal/" },
      { label: "Recensioner", href: "/recensioner/" },
      { label: "Kontakt", href: "/kontakt/" }
    ]
  },
  {
    title: "Boka",
    links: [
      { label: "Boka via Bokadirekt", href: site.bookingUrl, external: true },
      { label: "Priser", href: "/priser/" },
      { label: "Presentkort", href: "/presentkort/" }
    ]
  }
];
```

- [ ] **Step 3: Create treatment/category data**

Create `src/data/treatments.ts` with:

- `TreatmentCategory` and `Treatment` types.
- Nine published categories from the spec.
- Published Bokadirekt-confirmed treatments from the spec.
- Unpublished owner-confirmation candidate treatments for PRP, thread lift, fat reduction, gel nails, spray tan, and brow services.
- Helper functions: `publishedCategories`, `publishedTreatments`, `getCategoryBySlug`, `getTreatmentBySlug`, `getTreatmentsByCategory`, `getRelatedTreatments`, `allTreatmentRoutes`.

Use current image assets from `/images/pnk/services/*.webp`.

- [ ] **Step 4: Create article data**

Create `src/data/articles.ts` with:

- `Article` type.
- Eleven article routes from the spec.
- Helper functions: `publishedArticles`, `getArticleBySlug`, `getRelatedArticles`, `allArticleRoutes`.

- [ ] **Step 5: Update homepage data imports**

Modify `src/data/home.ts`:

- Import `site.bookingUrl` and export it as current `bookingUrl`.
- Import `navItems` from `src/data/navigation.ts` and re-export it.
- Keep `assets`, `services`, `atmosphereImages`, `galleryImages`, and `testimonials`.
- Update any service hrefs to include trailing slash for route consistency.

## Task 3: SEO Layout, Sitemap, and Robots

**Files:**
- Modify: `astro.config.mjs`
- Modify: `src/layouts/BaseLayout.astro`
- Create: `src/pages/sitemap.xml.ts`
- Create: `src/pages/robots.txt.ts`

- [ ] **Step 1: Set canonical site**

Modify `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://pnkbeauty.se",
  output: "static"
});
```

- [ ] **Step 2: Extend BaseLayout**

Modify `src/layouts/BaseLayout.astro` props:

```ts
interface Props {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}
```

Add canonical, Open Graph, Twitter, robots, and JSON-LD output. Preserve the global CSS import and slot.

- [ ] **Step 3: Create sitemap endpoint**

Create `src/pages/sitemap.xml.ts`.

It must import `site`, `publishedCategories`, `publishedTreatments`, `publishedArticles`, and output XML for:

- Core pages.
- Category pages.
- Treatment pages.
- Article pages.

- [ ] **Step 4: Create robots endpoint**

Create `src/pages/robots.txt.ts` with:

```txt
User-agent: *
Allow: /

Sitemap: https://pnkbeauty.se/sitemap.xml
```

- [ ] **Step 5: Verify still RED**

Run:

```bash
npm run verify:static
```

Expected: still FAIL because page routes are not implemented yet, but sitemap/robots should now be present after build.

## Task 4: Subpage Components and Routes

**Files:**
- Create: `src/components/SubpageHero.astro`
- Create: `src/components/Breadcrumbs.astro`
- Create: `src/components/TreatmentCard.astro`
- Create: `src/components/ArticleCard.astro`
- Create: `src/components/FAQBlock.astro`
- Create: `src/components/BookingCTA.astro`
- Create: `src/components/TreatmentFacts.astro`
- Create: `src/components/CategoryPage.astro`
- Create: `src/components/TreatmentPage.astro`
- Create: `src/components/ArticlePage.astro`
- Create: `src/pages/behandlingar/index.astro`
- Create: `src/pages/behandlingar/[slug].astro`
- Create: `src/pages/artiklar/index.astro`
- Create: `src/pages/artiklar/[slug].astro`
- Modify: `src/styles/global.css`
- Modify: `src/scripts/motion.ts`

- [ ] **Step 1: Add shared subpage components**

Create the components listed above. They must:

- Use existing `pill-link`, `pill-dark`, display font, and color tokens.
- Reuse carousel-card language for treatment cards.
- Use black/gold subpage hero with image background.
- Keep editorial content on cream backgrounds.
- Keep FAQ and facts panels compact and readable.

- [ ] **Step 2: Add treatment index**

Create `src/pages/behandlingar/index.astro`:

- Hero: "Behandlingar i Borås".
- Category grid.
- Featured treatment grid.
- Booking CTA.
- FAQ.

- [ ] **Step 3: Add category/treatment dynamic route**

Create `src/pages/behandlingar/[slug].astro`.

`getStaticPaths()` must include both published categories and published treatments. Runtime branch:

- If `kind === "category"`, render `CategoryPage`.
- If `kind === "treatment"`, render `TreatmentPage`.

- [ ] **Step 4: Add article index and detail route**

Create:

- `src/pages/artiklar/index.astro`
- `src/pages/artiklar/[slug].astro`

Use `ArticleCard` and `ArticlePage`.

- [ ] **Step 5: Add subpage CSS**

Append responsive subpage CSS to `src/styles/global.css` for:

- `.subpage-hero`
- `.subpage-section`
- `.subpage-shell`
- `.treatment-grid`
- `.treatment-card`
- `.article-grid`
- `.fact-panel`
- `.faq-block`
- `.booking-cta`
- `.breadcrumb-list`

The design must match the existing Venetian/PNK tokens and avoid a generic SaaS/card look.

- [ ] **Step 6: Add restrained subpage motion**

Modify `src/scripts/motion.ts`:

- Add `initSubpages()` that reveals `.subpage-reveal`, `.subpage-hero-title`, and `.subpage-hero-copy`.
- Do not change existing homepage motion IDs or timings.
- Call `initSubpages()` at the end of `initMotion()`.

## Task 5: Utility Pages and Homepage Integration

**Files:**
- Create: `src/pages/priser.astro`
- Create: `src/pages/boka.astro`
- Create: `src/pages/presentkort.astro`
- Create: `src/pages/om-kliniken.astro`
- Create: `src/pages/personal.astro`
- Create: `src/pages/recensioner.astro`
- Create: `src/pages/kontakt.astro`
- Create: `src/pages/integritetspolicy.astro`
- Create: `src/pages/allmanna-villkor.astro`
- Create: `src/pages/404.astro`
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/Services.astro`
- Modify: `src/components/Contact.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create utility pages**

Each utility page must use `BaseLayout`, `Header`, `Footer`, `SubpageHero`, and `BookingCTA` where relevant.

Required page roles:

- `/priser/`: grouped price overview from treatment data.
- `/boka/`: Bokadirekt-focused booking landing page.
- `/presentkort/`: gift card page.
- `/om-kliniken/`: clinic trust/story page.
- `/personal/`: Siamak and Shadi profiles.
- `/recensioner/`: Bokadirekt rating and selected verified quotes.
- `/kontakt/`: address, phone, email, booking CTA.
- `/integritetspolicy/`: concise privacy policy.
- `/allmanna-villkor/`: booking and general terms.
- `/404/`: branded missing-page fallback.

- [ ] **Step 2: Update Header and Footer**

Modify `Header.astro` and `Footer.astro` to use `src/data/navigation.ts` and `src/data/site.ts`.

Preserve:

- fixed header behavior,
- transparent-to-black transition,
- logo swap classes,
- mobile menu behavior,
- pill booking button.

- [ ] **Step 3: Improve homepage internal links**

Modify `Services.astro`, `Contact.astro`, and `index.astro` only as needed:

- Use trailing slash hrefs.
- Link to `/behandlingar/`, category hubs, articles, and booking page where natural.
- Preserve homepage section order and major visual classes.

## Task 6: Verification and Visual QA

**Files:**
- Modify only files needed to fix verified failures.

- [ ] **Step 1: Verify GREEN**

Run:

```bash
npm run verify:static
```

Expected: PASS with all expected routes built and present in sitemap.

- [ ] **Step 2: Build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 3: Start preview**

Run:

```bash
npm run preview -- --host 100.84.214.113 --port 4326
```

Expected: preview available at `http://100.84.214.113:4326/`.

- [ ] **Step 4: Browser visual smoke**

Use Playwright or the existing preview to inspect:

- `/`
- `/behandlingar/`
- `/behandlingar/botox-boras/`
- `/behandlingar/injektioner-boras/`
- `/artiklar/botox-eller-fillers/`
- `/priser/`
- `/kontakt/`

Check desktop and mobile:

- no blank first viewport,
- header matches current Astro/Venetian style,
- text does not overlap,
- subpage heroes feel related to homepage,
- treatment cards reuse the carousel visual language,
- booking CTAs are visible,
- no placeholder domains or data.

- [ ] **Step 5: Commit**

Commit focused implementation:

```bash
git add astro.config.mjs package.json src tools
git commit -m "Build PNK Beauty content site"
```
