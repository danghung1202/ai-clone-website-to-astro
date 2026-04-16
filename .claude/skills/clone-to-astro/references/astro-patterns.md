# Astro Patterns Reference

Read this before Phase 3 (Content Schema Generation) and Phase 5 (Page-Type Layout Extraction).

## Content Layer API (Astro 5+)

Astro 5.0 replaced the legacy `type: 'content'` syntax with the Content Layer API using loaders.
The config file is `src/content.config.ts` (NOT `src/content/config.ts` — the old location).

### Defining Collections

```typescript
// src/content.config.ts
// Adapt collection names and fields to match the target site.
// This example shows a generic "items" collection — yours might be
// products, services, recipes, projects, listings, courses, etc.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const items = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/items' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    category: z.string(),
    featured: z.boolean().default(false),
    images: z.array(z.string()),
    excerpt: z.string().optional(),
    // Add fields specific to your target site:
    // price: z.number(),
    // duration: z.string(),
    // rating: z.number(),
    // ctaLink: z.string().url(),
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

export const collections = { items, pages, blog };
```

### Querying Collections in Pages

```astro
---
// src/pages/index.astro — Homepage listing items from a collection
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import ItemCard from '../components/ItemCard.astro';

const items = await getCollection('items');
const featured = items.filter(t => t.data.featured);
---
<BaseLayout title="Home">
  <section class="items-grid">
    {featured.map(item => (
      <ItemCard item={item} />
    ))}
  </section>
</BaseLayout>
```

### Dynamic Routes from Collections

```astro
---
// src/pages/items/[...slug].astro
// Replace "items" with whatever the collection is (products, services, etc.)
import { getCollection, render } from 'astro:content';
import ItemLayout from '../../layouts/ItemLayout.astro';

export async function getStaticPaths() {
  const items = await getCollection('items');
  return items.map(item => ({
    params: { slug: item.data.slug },
    props: { item },
  }));
}

const { item } = Astro.props;
const { Content } = await render(item);
---
<ItemLayout item={item.data}>
  <Content />
</ItemLayout>
```

### Important Notes

- After changing `content.config.ts`, restart the dev server or press `s + Enter` to sync.
- The `render()` function replaces the old `entry.render()` method in Astro 5+.
- Collection entries have `.data` (frontmatter) and can be rendered to get `.Content`.
- The `id` field is auto-generated from the filename (e.g., `my-item` from `my-item.md`).

---

## Component Patterns

### Props Interface Convention

Every component must have a typed Props interface:

```astro
---
// src/components/ItemCard.astro
// Adapt the Props interface to match the target site's content fields.
// This is a generic card — yours might show price, rating, date, author, etc.
interface Props {
  item: {
    data: {
      title: string;
      slug: string;
      images: string[];
      excerpt?: string;
      category?: string;
      // Add whatever fields the target site shows on cards
    };
  };
  basePath?: string; // e.g., "/services", "/products", "/blog"
}

const { item, basePath = '/items' } = Astro.props;
const { title, slug, images, excerpt, category } = item.data;
---
<a href={`${basePath}/${slug}`} class="item-card">
  <img src={images[0]} alt={title} loading="lazy" />
  <div class="item-card__content">
    <h3>{title}</h3>
    {excerpt && <p>{excerpt}</p>}
    {category && <span class="item-card__category">{category}</span>}
  </div>
</a>

<style>
  .item-card {
    display: block;
    text-decoration: none;
    color: inherit;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .item-card:hover {
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
// src/layouts/ItemLayout.astro
// Adapt to the target site's detail page structure.
// This is a generic detail layout — yours might show price, specs, reviews, etc.
import BaseLayout from './BaseLayout.astro';
import ImageGallery from '../components/ImageGallery.astro';

interface Props {
  item: {
    title: string;
    images: string[];
    // Add whatever fields the detail page displays
  };
}

const { item } = Astro.props;
---
<BaseLayout title={item.title}>
  <article class="item-detail">
    <ImageGallery images={item.images} alt={item.title} />

    <div class="item-detail__content">
      <h1>{item.title}</h1>

      <div class="item-detail__body">
        <slot />  <!-- Markdown body content renders here -->
      </div>

      <!-- Add CTA, pricing, metadata components as needed -->
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
  - /images/services/web-design-01.jpg
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
