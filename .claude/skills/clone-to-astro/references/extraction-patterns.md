# Extraction Patterns Reference

Read this before Phase 2 (Foundation Extraction). Contains Chrome MCP JavaScript snippets
for extracting design tokens, DOM structure, computed styles, and content from live sites.

## Design Token Extraction

### Colors

Run this in Chrome MCP to extract the site's color palette:

```javascript
// Extract all unique colors used on the page
const elements = document.querySelectorAll('*');
const colors = new Set();
const colorMap = {};

elements.forEach(el => {
  const cs = getComputedStyle(el);
  const props = ['color', 'backgroundColor', 'borderColor', 'outlineColor'];
  props.forEach(prop => {
    const val = cs[prop];
    if (val && val !== 'rgba(0, 0, 0, 0)' && val !== 'transparent') {
      colors.add(val);
      if (!colorMap[prop]) colorMap[prop] = [];
      colorMap[prop].push({ element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''), value: val });
    }
  });
});

// Also extract from buttons, links, and key interactive elements
const buttons = document.querySelectorAll('button, a[class*=btn], [class*=button], [class*=cta]');
const buttonColors = Array.from(buttons).map(b => {
  const cs = getComputedStyle(b);
  return {
    text: b.textContent.trim().substring(0, 30),
    bg: cs.backgroundColor,
    color: cs.color,
    borderColor: cs.borderColor,
    hoverNote: 'Hover state must be extracted separately'
  };
});

JSON.stringify({ uniqueColors: [...colors], buttonColors }, null, 2);
```

### Typography

```javascript
// Extract font families and sizes from key elements
const typo = {};
const selectors = {
  body: 'body',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  p: 'p',
  nav_link: 'nav a',
  button: 'button',
  small: 'small, .caption, [class*=meta]',
};

Object.entries(selectors).forEach(([name, sel]) => {
  const el = document.querySelector(sel);
  if (el) {
    const cs = getComputedStyle(el);
    typo[name] = {
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      textTransform: cs.textTransform,
    };
  }
});

// Extract @font-face and Google Fonts links
const fontLinks = Array.from(document.querySelectorAll('link[href*=fonts]'))
  .map(l => l.href);
const fontFaces = Array.from(document.styleSheets)
  .flatMap(sheet => {
    try { return Array.from(sheet.cssRules); } catch(e) { return []; }
  })
  .filter(rule => rule.type === CSSRule.FONT_FACE_RULE)
  .map(rule => rule.cssText.substring(0, 200));

JSON.stringify({ typography: typo, fontLinks, fontFaces }, null, 2);
```

### Spacing and Layout

```javascript
// Extract container widths and section spacing
const containers = document.querySelectorAll(
  '.container, [class*=container], [class*=wrapper], [class*=content]'
);
const sections = document.querySelectorAll('section, [class*=section]');

const layout = {
  containers: Array.from(containers).slice(0, 5).map(el => {
    const cs = getComputedStyle(el);
    return {
      class: el.className,
      maxWidth: cs.maxWidth,
      width: cs.width,
      padding: cs.padding,
      margin: cs.margin,
    };
  }),
  sections: Array.from(sections).slice(0, 5).map(el => {
    const cs = getComputedStyle(el);
    return {
      class: el.className,
      padding: cs.padding,
      margin: cs.margin,
      background: cs.backgroundColor,
    };
  }),
};

JSON.stringify(layout, null, 2);
```

---

## Component Extraction

### Full Section Structure

For extracting a page section's structure and styles:

```javascript
// Replace SELECTOR with the actual section selector
function extractSection(selector) {
  const section = document.querySelector(selector);
  if (!section) return null;

  const cs = getComputedStyle(section);

  // Get simplified DOM tree (2 levels deep)
  function simplifyDOM(el, depth = 0) {
    if (depth > 2) return null;
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(),
      class: el.className ? el.className.split(' ').slice(0, 3).join(' ') : '',
      text: el.children.length === 0 ? el.textContent.trim().substring(0, 80) : '',
      styles: {
        display: cs.display,
        position: cs.position,
        width: cs.width,
        padding: cs.padding,
        gap: cs.gap,
        gridTemplateColumns: cs.gridTemplateColumns,
        flexDirection: cs.flexDirection,
        background: cs.backgroundColor,
      },
      children: Array.from(el.children).map(c => simplifyDOM(c, depth + 1)).filter(Boolean),
    };
  }

  return {
    sectionStyles: {
      padding: cs.padding,
      margin: cs.margin,
      background: cs.backgroundColor,
      maxWidth: cs.maxWidth,
    },
    dom: simplifyDOM(section),
  };
}

JSON.stringify(extractSection('section:nth-of-type(1)'), null, 2);
```

### Image Collection

```javascript
// Collect all images with their sources and dimensions
const images = Array.from(document.querySelectorAll('img')).map(img => ({
  src: img.src,
  alt: img.alt,
  width: img.naturalWidth,
  height: img.naturalHeight,
  loading: img.loading,
  inSection: img.closest('section')?.className?.split(' ')[0] || 'unknown',
}));

// Also collect background images
const bgImages = [];
document.querySelectorAll('*').forEach(el => {
  const bg = getComputedStyle(el).backgroundImage;
  if (bg && bg !== 'none' && bg.includes('url(')) {
    bgImages.push({
      element: el.tagName + '.' + (el.className?.split(' ')[0] || ''),
      backgroundImage: bg.match(/url\("?([^"]+)"?\)/)?.[1] || bg,
    });
  }
});

JSON.stringify({ images, bgImages }, null, 2);
```

---

## Content Extraction

### Page Text Content

```javascript
// Extract structured content from a detail page
function extractContent(mainSelector) {
  const main = document.querySelector(mainSelector || 'main, [role=main], article');
  if (!main) return null;

  const content = {
    title: document.querySelector('h1')?.textContent.trim(),
    headings: Array.from(main.querySelectorAll('h2, h3')).map(h => ({
      level: h.tagName,
      text: h.textContent.trim(),
    })),
    paragraphs: Array.from(main.querySelectorAll('p')).map(p => p.textContent.trim()).filter(Boolean),
    lists: Array.from(main.querySelectorAll('ul, ol')).map(list => ({
      type: list.tagName,
      items: Array.from(list.querySelectorAll('li')).map(li => li.textContent.trim()),
    })),
    links: Array.from(main.querySelectorAll('a[href]')).map(a => ({
      text: a.textContent.trim(),
      href: a.href,
      isButton: a.className.includes('btn') || a.className.includes('button') || a.className.includes('cta'),
    })),
    meta: {},
  };

  // Try to extract structured data (price, duration, etc.)
  const metaSelectors = {
    price: '[class*=price], [class*=cost], [class*=amount]',
    duration: '[class*=duration], [class*=time], [class*=hours]',
    rating: '[class*=rating], [class*=star], [class*=review]',
  };

  Object.entries(metaSelectors).forEach(([key, sel]) => {
    const el = main.querySelector(sel);
    if (el) content.meta[key] = el.textContent.trim();
  });

  return content;
}

JSON.stringify(extractContent(), null, 2);
```

### Navigation Structure

```javascript
// Extract full navigation tree
function extractNav() {
  const navEl = document.querySelector('nav, header nav, [role=navigation]');
  if (!navEl) return null;

  function extractLinks(container) {
    return Array.from(container.children).map(child => {
      const link = child.querySelector('a');
      const submenu = child.querySelector('ul, [class*=dropdown], [class*=submenu]');
      return {
        text: link?.textContent.trim(),
        href: link?.href,
        children: submenu ? extractLinks(submenu) : [],
      };
    }).filter(item => item.text);
  }

  const topLevel = navEl.querySelector('ul') || navEl;
  return {
    links: extractLinks(topLevel),
    logo: navEl.querySelector('img, [class*=logo]')?.src || null,
    hasMobileMenu: !!navEl.querySelector('[class*=hamburger], [class*=mobile], [class*=toggle], [aria-label*=menu]'),
  };
}

JSON.stringify(extractNav(), null, 2);
```

---

## Behavior Extraction

### Scroll-Triggered Changes

```javascript
// Detect scroll-triggered behaviors on the header/nav
const header = document.querySelector('header, nav, [class*=header]');
const initialStyles = header ? {
  position: getComputedStyle(header).position,
  background: getComputedStyle(header).backgroundColor,
  height: getComputedStyle(header).height,
  boxShadow: getComputedStyle(header).boxShadow,
  transform: getComputedStyle(header).transform,
} : null;

// Scroll to trigger changes, then capture again
window.scrollTo(0, 200);
await new Promise(r => setTimeout(r, 500));

const scrolledStyles = header ? {
  position: getComputedStyle(header).position,
  background: getComputedStyle(header).backgroundColor,
  height: getComputedStyle(header).height,
  boxShadow: getComputedStyle(header).boxShadow,
  transform: getComputedStyle(header).transform,
} : null;

window.scrollTo(0, 0); // Reset

// Diff the two states
const changes = {};
if (initialStyles && scrolledStyles) {
  Object.keys(initialStyles).forEach(key => {
    if (initialStyles[key] !== scrolledStyles[key]) {
      changes[key] = { from: initialStyles[key], to: scrolledStyles[key] };
    }
  });
}

JSON.stringify({
  hasScrollBehavior: Object.keys(changes).length > 0,
  initialState: initialStyles,
  scrolledState: scrolledStyles,
  changes,
}, null, 2);
```

### Hover States

To extract hover states, use Chrome MCP to hover over the element, then capture computed styles.
Compare the default and hovered states. Also check for CSS transitions:

```javascript
// Check for transition definitions on interactive elements
const interactives = document.querySelectorAll('a, button, [class*=card], [class*=btn]');
const transitions = Array.from(interactives).slice(0, 10).map(el => {
  const cs = getComputedStyle(el);
  return {
    element: el.tagName + '.' + (el.className?.split(' ')[0] || ''),
    transition: cs.transition,
    cursor: cs.cursor,
  };
}).filter(t => t.transition && t.transition !== 'all 0s ease 0s');

JSON.stringify(transitions, null, 2);
```

---

## Downloading Assets

### Batch Image Download Script

After collecting all image URLs, generate a download script:

```bash
#!/bin/bash
# Auto-generated by clone-to-astro skill
# Downloads all extracted images to public/images/

mkdir -p public/images/tours
mkdir -p public/images/blog
mkdir -p public/images/general

# Tours images
curl -L -o public/images/tours/taste-01.jpg "https://static.wixstatic.com/..."
curl -L -o public/images/tours/taste-02.jpg "https://static.wixstatic.com/..."
# ... one line per image

echo "Downloaded $(find public/images -type f | wc -l) images"
```

### SVG Extraction

For inline SVGs, extract and save as Astro components:

```javascript
// Extract all inline SVGs
const svgs = Array.from(document.querySelectorAll('svg')).map((svg, i) => {
  const parent = svg.closest('[class]');
  return {
    index: i,
    context: parent?.className?.split(' ')[0] || 'unknown',
    viewBox: svg.getAttribute('viewBox'),
    width: svg.getAttribute('width'),
    height: svg.getAttribute('height'),
    html: svg.outerHTML.substring(0, 500), // Truncate for preview
    fullHtml: svg.outerHTML,
  };
});

JSON.stringify(svgs.map(s => ({ ...s, fullHtml: undefined })), null, 2);
// Save fullHtml separately for each SVG you want to keep
```

Save each meaningful SVG as `src/components/icons/{Name}Icon.astro`:
```astro
---
// Auto-extracted SVG icon
interface Props {
  class?: string;
  size?: number;
}
const { class: className, size = 24 } = Astro.props;
---
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
  width={size} height={size} class={className}
  fill="none" stroke="currentColor" stroke-width="2">
  <!-- extracted path data -->
</svg>
```
