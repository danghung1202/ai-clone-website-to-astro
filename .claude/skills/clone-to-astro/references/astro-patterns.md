# Astro Patterns Reference

Read this before Phase 3 (Content Schema Generation) and Phase 5 (Page-Type Layout Extraction).

## Content Layer API (Astro 5+)

Astro 5.0 replaced the legacy `type: 'content'` syntax with the Content Layer API using loaders.
The config file is `src/content.config.ts` (NOT `src/content/config.ts` — the old location).

### Defining Collections

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const tours = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tours' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    price: z.number(),
    currency: z.enum(['USD', 'VND', 'EUR']),
    duration: z.string(),
    groupSize: z.string(),
    category: z.string(),
    featured: z.boolean().default(false),
    images: z.array(z.string()),
    bookingLink: z.string().url(),
    excerpt: z.string().optional(),
    order: z.number().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    heroImage: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().optional(),
    excerpt: z.string(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { tours, pages, blog };
```

### Querying Collections in Pages

```astro
---
// src/pages/index.astro — Homepage listing tours
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import TourCard from '../components/TourCard.astro';

const tours = await getCollection('tours');
const featured = tours.filter(t => t.data.featured);
---
<BaseLayout title="Home">
  <section class="tours-grid">
    {featured.map(tour => (
      <TourCard tour={tour} />
    ))}
  </section>
</BaseLayout>
```

### Dynamic Routes from Collections

```astro
---
// src/pages/tours/[...slug].astro
import { getCollection, render } from 'astro:content';
import TourLayout from '../../layouts/TourLayout.astro';

export async function getStaticPaths() {
  const tours = await getCollection('tours');
  return tours.map(tour => ({
    params: { slug: tour.data.slug },
    props: { tour },
  }));
}

const { tour } = Astro.props;
const { Content } = await render(tour);
---
<TourLayout tour={tour.data}>
  <Content />
</TourLayout>
```

### Important Notes

- After changing `content.config.ts`, restart the dev server or press `s + Enter` to sync.
- The `render()` function replaces the old `entry.render()` method in Astro 5+.
- Collection entries have `.data` (frontmatter) and can be rendered to get `.Content`.
- The `id` field is auto-generated from the filename (e.g., `taste-of-hanoi` from `taste-of-hanoi.md`).

---

## Component Patterns

### Props Interface Convention

Every component must have a typed Props interface:

```astro
---
// src/components/TourCard.astro
interface Props {
  tour: {
    data: {
      title: string;
      slug: string;
      price: number;
      currency: string;
      duration: string;
      images: string[];
      excerpt?: string;
    };
  };
}

const { tour } = Astro.props;
const { title, slug, price, currency, duration, images, excerpt } = tour.data;
---
<a href={`/tours/${slug}`} class="tour-card">
  <img src={images[0]} alt={title} loading="lazy" />
  <div class="tour-card__content">
    <h3>{title}</h3>
    {excerpt && <p>{excerpt}</p>}
    <div class="tour-card__meta">
      <span>{duration}</span>
      <span class="tour-card__price">{currency} {price}/person</span>
    </div>
  </div>
</a>

<style>
  .tour-card {
    display: block;
    text-decoration: none;
    color: inherit;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .tour-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
  }
  /* ... more styles extracted from original site */
</style>
```

### Layout Composition

Layouts extend BaseLayout and accept typed data:

```astro
---
// src/layouts/TourLayout.astro
import BaseLayout from './BaseLayout.astro';
import BookingCTA from '../components/BookingCTA.astro';
import ImageGallery from '../components/ImageGallery.astro';

interface Props {
  tour: {
    title: string;
    price: number;
    currency: string;
    duration: string;
    groupSize: string;
    images: string[];
    bookingLink: string;
  };
}

const { tour } = Astro.props;
---
<BaseLayout title={tour.title}>
  <article class="tour-detail">
    <ImageGallery images={tour.images} alt={tour.title} />

    <div class="tour-detail__content">
      <h1>{tour.title}</h1>

      <div class="tour-detail__meta">
        <span>{tour.duration}</span>
        <span>{tour.groupSize}</span>
      </div>

      <div class="tour-detail__body">
        <slot />  <!-- Markdown body content renders here -->
      </div>

      <BookingCTA
        price={tour.price}
        currency={tour.currency}
        link={tour.bookingLink}
      />
    </div>
  </article>
</BaseLayout>
```

### Interactive Components (Islands)

For components that need JavaScript (carousels, galleries, mobile menus):

```astro
---
// src/components/ImageGallery.astro — static wrapper
// If simple (CSS-only carousel), keep as pure Astro.
// If needs JS interaction, use a framework island:
---
<!-- Option A: CSS-only (preferred for simple cases) -->
<div class="gallery">
  {Astro.props.images.map((src, i) => (
    <img src={src} alt={`${Astro.props.alt} ${i + 1}`} loading="lazy" />
  ))}
</div>

<!-- Option B: React island (for complex interaction) -->
<!-- Create src/components/GalleryIsland.tsx and use: -->
<!-- <GalleryIsland client:visible images={images} /> -->
```

Use `client:visible` over `client:load` when possible — it defers JS loading until the component
enters the viewport, improving initial page load.

---

## Routing Patterns

### Static Pages from Collection

```astro
---
// src/pages/[slug].astro — catches /about, /faq, /contact, etc.
import { getCollection, render } from 'astro:content';
import PageLayout from '../layouts/PageLayout.astro';

export async function getStaticPaths() {
  const pages = await getCollection('pages');
  return pages.map(page => ({
    params: { slug: page.data.slug },
    props: { page },
  }));
}

const { page } = Astro.props;
const { Content } = await render(page);
---
<PageLayout title={page.data.title}>
  <Content />
</PageLayout>
```

### Blog with Listing + Detail

```astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const posts = (await getCollection('blog'))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---
<BaseLayout title="Blog">
  <h1>Blog</h1>
  {posts.map(post => (
    <article>
      <a href={`/blog/${post.data.slug}`}>
        <h2>{post.data.title}</h2>
        <time datetime={post.data.pubDate.toISOString()}>
          {post.data.pubDate.toLocaleDateString()}
        </time>
        <p>{post.data.excerpt}</p>
      </a>
    </article>
  ))}
</BaseLayout>
```

---

## Image Handling

### In Astro Components (optimized)

```astro
---
import { Image } from 'astro:assets';
// For local images in src/
import heroImg from '../assets/hero.jpg';
---
<Image src={heroImg} alt="Hero" width={1200} height={600} />
```

### In Content Collections (public/ directory)

For cloned sites, images go in `public/images/` and are referenced by path in frontmatter.
These are served as-is (no build-time optimization). This is acceptable for a clone — the user
can migrate to `src/assets/` later for optimization.

```markdown
---
images:
  - /images/tours/taste-01.jpg
---
```

```astro
<!-- In a component: -->
<img src={image} alt={alt} loading="lazy" width="600" height="400" />
```

---

## Tailwind CSS Integration

Astro + Tailwind works out of the box after `npx astro add tailwind`.

### Using with Extracted Styles

Prefer utility classes for layout, custom CSS for design-token-based styling:

```astro
<div class="max-w-7xl mx-auto px-4 py-16">
  <h2 class="section-title">Pick Your Vibe</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <slot />
  </div>
</div>

<style>
  .section-title {
    font-family: var(--font-heading);
    color: var(--color-primary);
    /* Design-specific values from extracted tokens */
  }
</style>
```

### Scoped vs Global Styles

- `<style>` in `.astro` files is **scoped by default** — only affects that component.
- Use `<style is:global>` sparingly — only for truly global overrides.
- Put design tokens and base styles in `src/styles/global.css`.
- Use Tailwind's `@apply` in component `<style>` blocks if combining utilities with scoped styles.

---

## Project Configuration

### astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  // For static deployment (Cloudflare Pages, Netlify, etc.)
  output: 'static',
});
```

### Adding React Islands (only if needed)

```bash
npx astro add react
```

Then in `astro.config.mjs`:
```javascript
import react from '@astrojs/react';
// Add to integrations: [tailwind(), react()]
```
