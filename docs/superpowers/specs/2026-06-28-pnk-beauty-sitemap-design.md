# PNK Beauty Astro Sitemap and Design Spec

Date: 2026-06-28
Project: `/srv/beams-dev/worktrees/venetian-spa-astro-clone`
Preview reference: `http://100.84.214.113:4326/`

## Decision

The existing Astro homepage is the visual source of truth for the new PNK Beauty site.

Competitor pages and the current public PNK site are used for content inventory, SEO structure, sitemap shape, and conversion ideas. They are not visual references. The new site should feel like the current Astro prototype expanded into a full professional clinic website.

## Sources Used

- PNK Beauty current site: `https://pnkbeauty.se/`
- PNK Beauty Bokadirekt: `https://www.bokadirekt.se/places/pnk-beauty-klinik-46381`
- Klinik Villastan: `https://www.klinikvillastan.se/`
- Klinik Villastan sitemap: `https://www.klinikvillastan.se/sitemap.xml`
- Akademikliniken: `https://www.akademikliniken.se/`
- Nordiska Kliniken: `https://www.nordiskakliniken.se/`
- SkinSpirit all treatments: `https://www.skinspirit.com/all-treatments`
- Google SEO Starter Guide: `https://developers.google.com/search/docs/fundamentals/seo-starter-guide`
- Google sitemap docs: `https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview`
- Google LocalBusiness structured data: `https://developers.google.com/search/docs/appearance/structured-data/local-business`
- Google Business Profile local ranking docs: `https://support.google.com/business/answer/7091`

## Visual Thesis

PNK Beauty should feel like a premium boutique clinic in Boras: cinematic black and gold first impression, warm cream editorial sections, close-up treatment photography, calm medical credibility, and a polished booking path.

## Content Plan

The site should have one flagship homepage, category hubs for discovery, individual treatment pages for SEO and conversion, guide articles for long-tail search and trust, and utility pages for price, booking, contact, team, reviews, policies, and gift cards.

## Interaction Thesis

Use a small number of strong interactions:

- Hero entrance with the current blind-strip reveal and video/photo atmosphere.
- Scroll reveal for editorial sections and treatment groups.
- Card hover/reveal behavior on service and related-treatment cards.

Motion must support hierarchy and premium feel. It should not make treatment pages hard to read.

## Approaches Considered

### Recommended: Astro Design System Plus Generated Content Pages

Build a content-driven Astro site where treatments, categories, articles, team members, prices, FAQs, and booking links live in structured data/content collections. The homepage keeps the current bespoke cinematic design. Hubs and detail pages reuse the same visual tokens and components in a calmer layout.

Why this is the right approach:

- It preserves the current Astro design as the brand expression.
- It gives PNK enough pages to rank for treatment-specific searches in Boras.
- It keeps future content additions manageable.
- It avoids copying Villastan visually while learning from its sitemap depth.

### Alternative: One Long Homepage Plus Price/Contact Pages

This would be faster but weaker for search. It would not cover each treatment with enough depth, and users searching for specific procedures would land on a general page.

### Alternative: Competitor-Style Medical Directory

This would maximize page count and SEO surface, but it would dilute the boutique/premium feel of the Astro prototype. It risks making PNK look like a generic clinic catalog.

## Design System

### Source of Truth

Use the existing Astro files as the design base:

- `src/styles/global.css`
- `src/components/Hero.astro`
- `src/components/Intro.astro`
- `src/components/Services.astro`
- `src/components/Atmosphere.astro`
- `src/components/Testimonials.astro`
- `src/components/Contact.astro`
- `src/components/Footer.astro`
- `src/data/home.ts`

### Existing Tokens to Preserve

- Display font: `Beautique Display`
- Body font: `Inter-V`
- Gold: `#c89a2c`
- Accent: `#dfcfaa`
- Cream: `#f4efe6`
- Soft cream: `#fbf7ef`
- Ink: `#24150c`
- Muted text: `#806a4f`
- Black: `#050505`
- White: `#fffaf2`
- Max width: `1200px`

### Visual Rules

- The homepage can be dramatic and cinematic.
- Subpages should be calmer but clearly related to the homepage.
- Large images should do real work: clinic, treatment, team, product, or result context.
- Avoid generic stock-like wellness imagery.
- Avoid copying Villastan's visual style.
- Avoid a generic card-heavy landing page.
- Use cards only for repeated treatment items, related content, reviews, and structured facts.
- Keep gold as an accent, not a full-page wash.
- Cream sections should be editorial and readable.
- Black sections should be reserved for high-impact hero, CTA, or premium moments.

### Shared Components

These should become reusable building blocks:

- `SiteHeader`
- `Footer`
- `FullBleedHero`
- `SubpageHero`
- `SectionHeading`
- `TreatmentCard`
- `TreatmentCarousel`
- `TreatmentFactPanel`
- `PriceList`
- `BookingCTA`
- `TrustBand`
- `FAQBlock`
- `RelatedTreatments`
- `ArticleCard`
- `Breadcrumbs`
- `LocalBusinessContactBlock`

## Page Archetypes

### 1. Homepage

Role: Brand flagship and main conversion page.

Design:

- Keep the cinematic hero from the Astro prototype.
- Keep the black/gold premium first impression.
- Use the current service carousel language.
- Add stronger internal links to hubs and important treatment pages.

Recommended sections:

1. Hero with clinic positioning, consultation CTA, and treatment CTA.
2. Intro/trust section with medical and beauty credentials.
3. Featured treatment carousel.
4. Category discovery band: injections, skin, face, plasma pen, lashes/brows, nails/feet, makeup, massage.
5. Team section with Siamak and Shadi.
6. Why choose PNK: experience, consultation, patient safety, natural results, Boras location.
7. Reviews/testimonials.
8. Latest guides or aftercare articles.
9. Contact and booking CTA.

### 2. Treatment Category Hub

Role: Help visitors choose the right treatment group and distribute SEO authority to detail pages.

Examples:

- `/behandlingar/injektioner-boras/`
- `/behandlingar/hudvard-boras/`
- `/behandlingar/ansiktsbehandlingar-boras/`
- `/behandlingar/plasma-pen-boras/`
- `/behandlingar/fransar-bryn-boras/`
- `/behandlingar/naglar-fotter-boras/`
- `/behandlingar/makeup-boras/`
- `/behandlingar/massage-boras/`
- `/behandlingar/piercing-boras/`

Design:

- Subpage hero with black/gold atmosphere, shorter than the homepage.
- Cream body section with an editorial intro.
- Treatment grid using the existing service card language.
- One strong Bokadirekt CTA.
- Related guide articles.
- FAQ.

### 3. Treatment Detail Page

Role: Rank for a specific treatment and convert to consultation or booking.

Examples:

- `/behandlingar/botox-boras/`
- `/behandlingar/fillers-boras/`
- `/behandlingar/microneedling-boras/`

Design:

- Subpage hero with treatment name, short positioning, and booking CTA.
- Treatment facts panel with duration, price-from, practitioner, consultation note, and booking link.
- Editorial content in readable cream layout.
- Image block or treatment-room atmosphere block.
- Price variants where relevant.
- Aftercare and expectation section.
- FAQ.
- Related treatments carousel.
- Final black/gold CTA band.

Core sections:

1. Hero.
2. Quick facts.
3. What the treatment is.
4. Who it may suit.
5. How the visit works.
6. Price and duration.
7. Before and aftercare.
8. Safety and consultation.
9. FAQ.
10. Related treatments.
11. Book via Bokadirekt.

### 4. Article/Guide Page

Role: Capture informational searches and build trust before booking.

Design:

- Editorial cream layout.
- Smaller top visual, not a blog-template look.
- Treatment-specific CTAs placed naturally after useful content.
- Related treatments and related articles at the bottom.

Article types:

- Aftercare guides.
- Comparison guides.
- Treatment explainers.
- Safety and consultation guides.
- Seasonal or event-focused beauty guides.

### 5. Trust/Utility Pages

Role: Remove friction before booking.

Pages:

- `/om-kliniken/`
- `/personal/`
- `/kontakt/`
- `/boka/`
- `/priser/`
- `/recensioner/`
- `/presentkort/`
- `/integritetspolicy/`
- `/allmanna-villkor/`

Design:

- Calm, premium, mostly cream/ink.
- Use black/gold CTA bands where action is needed.
- Use team imagery and clinic photos rather than generic decoration.

## Primary Navigation

Desktop navigation:

- Behandlingar
- Priser
- Om kliniken
- Artiklar
- Kontakt
- Boka

Mobile navigation:

- Boka should be prominent.
- Treatment categories should be available from Behandlingar.
- Keep labels short and scannable.

Footer navigation:

- Populara behandlingar
- Alla behandlingskategorier
- Artiklar och guider
- Klinikinfo
- Kontakt
- Policies

## Sitemap

### Core Pages

| Route | Purpose |
| --- | --- |
| `/` | Premium homepage and main conversion page |
| `/behandlingar/` | All treatments index |
| `/priser/` | Price overview grouped by treatment category |
| `/boka/` | Booking landing page pointing to Bokadirekt |
| `/presentkort/` | Gift card page |
| `/om-kliniken/` | Clinic story, trust, credentials, location |
| `/personal/` | Siamak and Shadi profiles |
| `/recensioner/` | Review/testimonial page using verified sources only |
| `/artiklar/` | Guide/article index |
| `/kontakt/` | Address, phone, email, map, booking CTA |
| `/integritetspolicy/` | Privacy policy |
| `/allmanna-villkor/` | Terms and booking conditions |

### Category Hubs

| Route | Purpose |
| --- | --- |
| `/behandlingar/injektioner-boras/` | Botox, fillers, Prophilo, consultation, and owner-confirmed injection services |
| `/behandlingar/hudvard-boras/` | Microneedling, peeling, BB Glow, BioRepeel, skin quality |
| `/behandlingar/ansiktsbehandlingar-boras/` | Classic facial treatments, Marina Miracles, Pure Cell, microdermabrasion |
| `/behandlingar/plasma-pen-boras/` | Plasma Pen treatments and indications |
| `/behandlingar/fransar-bryn-boras/` | Lashlift and related detail services |
| `/behandlingar/naglar-fotter-boras/` | Manicure, pedicure, nail/foot care |
| `/behandlingar/makeup-boras/` | Everyday, evening, party, and event makeup |
| `/behandlingar/massage-boras/` | Indian Head Massage and recovery/wellness treatment |
| `/behandlingar/piercing-boras/` | Ear piercing services |

### Confirmed Treatment Pages From Bokadirekt

| Route | Source treatment(s) |
| --- | --- |
| `/behandlingar/konsultation/` | Konsultation |
| `/behandlingar/botox-boras/` | Botox 1, 2, and 3 areas |
| `/behandlingar/fillers-boras/` | Fillers overview |
| `/behandlingar/lappfillers-boras/` | Fillers läppar |
| `/behandlingar/fillers-kinder-boras/` | Kinder |
| `/behandlingar/fillers-haka-boras/` | Haka |
| `/behandlingar/fillers-kaklinje-boras/` | Käkben/käklinje |
| `/behandlingar/fillers-nasolabial-boras/` | Nasolabial |
| `/behandlingar/prophilo-boras/` | Prophilo |
| `/behandlingar/microneedling-boras/` | Microneedling, kemisk peeling + Derma Pen |
| `/behandlingar/bb-glow-boras/` | BB Glow |
| `/behandlingar/kemisk-peeling-boras/` | Kemisk peeling variants |
| `/behandlingar/biorepeel-boras/` | BioRepeel medicinsk peeling |
| `/behandlingar/dubai-lips-boras/` | Dubai Lips |
| `/behandlingar/plasma-pen-boras/` | Plasma Pen overview |
| `/behandlingar/plasma-pen-ogonlockslyft-boras/` | Plasma Pen ögonlockslyft |
| `/behandlingar/plasma-pen-under-ogonen-boras/` | Plasma Pen under ögonen |
| `/behandlingar/plasma-pen-kraksparkar-boras/` | Plasma Pen kråksparkar |
| `/behandlingar/plasma-pen-hudbristningar-boras/` | Plasma Pen hudbristning mage |
| `/behandlingar/plasma-pen-hudflikar-pigment-boras/` | Milier, pigmentfläckar, hudflikar |
| `/behandlingar/plasma-pen-panna-arga-rynkan-boras/` | Panna och arga rynkan |
| `/behandlingar/klassisk-ansiktsbehandling-boras/` | Klassisk ansiktsbehandling |
| `/behandlingar/marina-miracles-boras/` | Marina Miracles Express and Full Cover |
| `/behandlingar/pure-cell-treatment-boras/` | Pure Cell Treatment |
| `/behandlingar/microdermabrasion-boras/` | Ansiktsbehandling + Microdermabrasion |
| `/behandlingar/lashlift-boras/` | Lashlift med keratin |
| `/behandlingar/manikyr-boras/` | Manikyr med buffring |
| `/behandlingar/pedikyr-boras/` | Pedikyr |
| `/behandlingar/makeup-vardag-boras/` | Vardagsmakeup |
| `/behandlingar/makeup-fest-boras/` | Kvälls-/festmakeup |
| `/behandlingar/indian-head-massage-boras/` | Indian Head Massage |
| `/behandlingar/oronpiercing-boras/` | Öronsnibb, öronsnibbar, öronbrosk |

### Owner-Confirmation Before Publishing

These appear in current PNK messaging or existing prototype copy but were not confirmed in the extracted Bokadirekt treatment list. Keep them in planning, but publish pages only after PNK confirms they are active services.

| Candidate route | Reason to verify |
| --- | --- |
| `/behandlingar/tradlyft-boras/` | Mentioned in staff/service copy; not confirmed in extracted service list |
| `/behandlingar/prp-boras/` | Mentioned in current site/prototype copy; not confirmed in extracted service list |
| `/behandlingar/fettreducering-boras/` | Mentioned in staff/service copy; not confirmed in extracted service list |
| `/behandlingar/gelnaglar-boras/` | Mentioned in current site metadata/prototype; not confirmed in extracted service list |
| `/behandlingar/spraytan-boras/` | Mentioned in current site metadata; not confirmed in extracted service list |
| `/behandlingar/fransar-bryn-boras/` | Hub exists, but exact brow services need confirmation beyond lashlift |

### Article Pages

Launch with guides that support the highest-value treatments and answer practical pre-booking questions.

| Route | Purpose |
| --- | --- |
| `/artiklar/att-tanka-pa-efter-botox/` | Botox aftercare and expectations |
| `/artiklar/botox-eller-fillers/` | Comparison guide for users choosing between treatments |
| `/artiklar/hur-lange-haller-fillers/` | Filler longevity and maintenance |
| `/artiklar/eftervard-fillers-lappar/` | Lip filler aftercare |
| `/artiklar/microneedling-eller-kemisk-peeling/` | Skin treatment comparison |
| `/artiklar/vad-ar-biorepeel/` | BioRepeel explainer |
| `/artiklar/plasma-pen-eftervard/` | Plasma Pen aftercare |
| `/artiklar/lashlift-eftervard/` | Lashlift aftercare |
| `/artiklar/sa-valjer-du-ansiktsbehandling/` | Facial treatment chooser |
| `/artiklar/prophilo-vad-ar-det/` | Prophilo explainer |
| `/artiklar/trygga-injektionsbehandlingar-boras/` | Trust/safety article for local injection searches |

## Bokadirekt Data to Carry Into Content

Use the Bokadirekt listing as the operational source for booking facts unless PNK gives a newer source.

- Booking URL: `https://www.bokadirekt.se/places/pnk-beauty-klinik-46381`
- Address: `Brämhultsvägen 4, 504 56 Borås`
- Phone: `0735303097`
- Email: `info@pnkbeauty.se`
- Public rating observed in research: `4.8` from `12` reviews
- Team:
  - Siamak Ghazanfari: injections, Botox, fillers, thread lift, fat reduction
  - Shadi Dadfar: authorized skin therapist and professional makeup artist

Do not use placeholder phone numbers, placeholder addresses, localhost image URLs, fake verification codes, or unsupported review counts from the current public site.

## Content Model

Use Astro content collections or typed data files rather than hardcoded page copy.

Recommended collections:

- `treatments`
- `treatmentCategories`
- `articles`
- `team`
- `reviews`
- `pages`

Recommended `treatments` fields:

- `title`
- `slug`
- `category`
- `seoTitle`
- `seoDescription`
- `heroImage`
- `summary`
- `bookingUrl`
- `priceFrom`
- `duration`
- `practitioner`
- `chips`
- `intro`
- `suitableFor`
- `process`
- `beforeCare`
- `afterCare`
- `faq`
- `relatedTreatments`
- `sourceStatus`: `confirmed-bokadirekt` or `owner-confirmation-required`

Recommended `articles` fields:

- `title`
- `slug`
- `seoTitle`
- `seoDescription`
- `category`
- `relatedTreatments`
- `heroImage`
- `publishedDate`
- `updatedDate`
- `intro`
- `sections`
- `faq`

## SEO Rules

### URL Strategy

Use Swedish, descriptive, stable URLs with `boras` where local intent matters:

- Good: `/behandlingar/botox-boras/`
- Good: `/behandlingar/kemisk-peeling-boras/`
- Avoid vague URLs like `/services/1` or campaign-only names.

### Titles

Pattern:

`[Treatment] Borås | PNK Beauty Klinik`

Examples:

- `Botox Borås | PNK Beauty Klinik`
- `Fillers Borås | PNK Beauty Klinik`
- `Kemisk Peeling Borås | PNK Beauty Klinik`

### Meta Descriptions

Each treatment page should include:

- Treatment name.
- Boras/local relevance.
- Practitioner/trust angle where relevant.
- Booking or consultation intent.
- No unsupported promises.

### Internal Linking

Every treatment page should link to:

- Parent category hub.
- Related treatments.
- Relevant article guide.
- Booking page/Bokadirekt.
- Contact page.

Every article should link to:

- One or more relevant treatment pages.
- Booking or consultation CTA.
- Related article.

### Structured Data

Add accurate structured data:

- `LocalBusiness` or a more specific valid subtype where appropriate.
- `BreadcrumbList` on subpages.
- `FAQPage` only where the FAQ is visible on the page.
- `Article` on guide pages.

Use only verified name, address, phone, images, opening hours, and review data. If opening hours are not verified, omit them from schema until confirmed.

### Technical SEO

Add:

- `sitemap.xml`
- `robots.txt`
- canonical URLs
- social sharing metadata with production image URLs
- clean 404 page
- valid favicon/social image paths

The current public PNK site has signals that should be corrected in the Astro build: missing valid sitemap/robots behavior, placeholder verification value, placeholder contact data, localhost Open Graph image URLs, and inconsistent review count.

## Copy and Compliance Direction

Tone:

- Premium but clear.
- Warm but not fluffy.
- Medical credibility where relevant.
- Natural results, consultation, safety, and expectations.

Avoid:

- Guaranteed results.
- Overstated medical claims.
- Unsupported review/rating claims.
- Copy that implies every treatment suits every visitor.

Preferred language:

- "kan passa dig som..."
- "målet är..."
- "behandlingen inleds med konsultation..."
- "resultat och upplägg varierar beroende på individuella förutsättningar..."

## Implementation Workflow

### Phase 1: Data Foundation

- Build treatment and category data from Bokadirekt.
- Mark unconfirmed services explicitly.
- Normalize prices, durations, practitioner, category, and booking CTA.
- Create shared article topic list.

### Phase 2: Design Components

- Extract reusable components from the existing homepage.
- Add subpage hero, treatment fact panel, FAQ, price list, breadcrumbs, and related-treatment components.
- Preserve current tokens and motion language.

### Phase 3: Routes and Templates

- Create category hub template.
- Create treatment detail template.
- Create article template.
- Create utility pages.
- Generate sitemap routes from content.

### Phase 4: Homepage Upgrade

- Keep current hero and service carousel.
- Add stronger links to hubs and high-value detail pages.
- Add article teaser section.
- Tighten trust and booking CTA sections.

### Phase 5: SEO and Local Trust

- Add metadata generation.
- Add LocalBusiness and breadcrumb schema.
- Add sitemap and robots.
- Fix social images and canonical URLs.
- Verify NAP consistency.

### Phase 6: QA

- Run Astro build.
- Check desktop and mobile screenshots.
- Check that all internal links resolve.
- Check sitemap includes all publishable pages.
- Check no unconfirmed services are accidentally published as active.
- Check no text overflow or overlap on mobile.
- Check Bokadirekt links open externally.

## Design Acceptance Criteria

The expanded site is ready design-wise when:

- A visitor can recognize the same visual system from the homepage on every subpage.
- Treatment pages feel premium and readable, not like generic SEO pages.
- The homepage still feels cinematic and high-end.
- The site clearly covers all active PNK services.
- The booking path is visible from every commercially important page.
- Villastan influenced depth and structure, not visual identity.
- Technical SEO basics are present and accurate.

## Open Owner Decisions

These decisions should be confirmed with PNK before launch:

- Active status for thread lift, PRP, fat reduction, gel nails, spray tan, and brow services.
- Current opening hours.
- Whether review snippets may be reused from Bokadirekt.
- Whether before/after photos can be used.
- Whether each treatment should deep-link to a specific Bokadirekt booking item or only to the clinic profile.
- Which safety/credential logos may legally be displayed.

## Recommended Next Step

After this spec is approved, write an implementation plan that starts with the content/data model and page templates. Do not begin by hand-building every page. The right path is to make treatment data drive category hubs, treatment pages, price lists, related links, and sitemap generation.
