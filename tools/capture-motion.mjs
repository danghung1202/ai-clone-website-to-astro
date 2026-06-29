import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright-core";

const args = new Map(
  process.argv.slice(2).flatMap((arg, index, all) => {
    if (!arg.startsWith("--")) return [];
    const key = arg.slice(2);
    const value = all[index + 1]?.startsWith("--") ? "true" : (all[index + 1] ?? "true");
    return [[key, value]];
  })
);

const targetUrl = args.get("target") ?? "https://venetianspa.ca";
const cloneUrl = args.get("clone") ?? "http://127.0.0.1:4330";
const outDir = args.get("out") ?? "docs/motion-capture/latest";
const executablePath = args.get("chrome") ?? "/usr/bin/google-chrome";
const recordVideo = args.get("record-video") === "true";

const viewportProfiles = [
  { name: "desktop", width: 1440, height: 1100 },
  { name: "mobile", width: 390, height: 900 }
];

const selectorGroups = {
  target: [
    ".home-hero-container",
    ".home-hero-cover",
    ".blind-strip-v",
    ".hero-heading h1",
    ".hero-heading .char",
    ".hero-button",
    ".radius-section",
    ".radius-sub-heading h3",
    ".radius-sub-heading .word",
    ".general-reveal-img",
    ".general-reveal-img img",
    ".radius-heading h2",
    ".radius-heading .char",
    ".radius-p p",
    ".radius-p .line",
    ".radius-button",
    ".home-carousel-h2 .char",
    ".home-carousel",
    ".home-carousel .swiper",
    ".home-carousel .swiper-wrapper",
    ".home-carousel .swiper-slide",
    ".carousel-container",
    ".carousel-heading .char",
    ".elementor-swiper-button-prev",
    ".elementor-swiper-button-next",
    ".home-scroll-container",
    ".home-scroll-h2",
    ".home-scroll-h2 .char",
    ".home-scroll-p",
    ".home-scroll-p .line",
    ".large-bg-icon",
    ".move-up-img",
    ".move-up-img img",
    ".gallery-h2 .char",
    ".testimonial-h2 .char",
    ".testimonial-container",
    ".testimonial-bg-icon",
    ".testimonial-wrapper",
    ".testimonial-card",
    ".home-cta-container",
    ".cta-h2 h2",
    ".cta-h2 .char",
    ".cta-p .line",
    ".home-cta-form .elementor-field-group"
  ],
  clone: [
    ".home-hero-container",
    ".home-hero-cover",
    ".blind-strip-v",
    ".hero-heading h1",
    ".hero-heading .char",
    ".hero-button",
    ".radius-section",
    ".radius-sub-heading h3",
    ".radius-sub-heading .word",
    ".general-reveal-img",
    ".general-reveal-img img",
    ".radius-heading h2",
    ".radius-heading .char",
    ".radius-p p",
    ".radius-p .line",
    ".radius-button",
    ".home-carousel-h2 .char",
    ".home-carousel",
    ".home-carousel .swiper",
    ".home-carousel .swiper-wrapper",
    ".home-carousel .swiper-slide",
    ".carousel-container",
    ".carousel-heading .char",
    ".elementor-swiper-button-prev",
    ".elementor-swiper-button-next",
    ".home-scroll-container",
    ".home-scroll-h2",
    ".home-scroll-h2 .char",
    ".home-scroll-p",
    ".home-scroll-p .line",
    ".large-bg-icon",
    ".move-up-img",
    ".move-up-img img",
    ".testimonial-h2 .char",
    ".testimonial-container",
    ".testimonial-bg-icon",
    ".testimonial-wrapper",
    ".home-cta-container",
    ".cta-h2 h2",
    ".cta-h2 .char",
    ".cta-p .line",
    ".home-cta-form .elementor-field-group",
    ".hero",
    ".hero-cover",
    ".hero-strip",
    ".hero h1",
    ".hero-cta",
    ".intro-section",
    ".section-kicker",
    ".intro-arch",
    ".intro-arch img",
    ".intro-section h2",
    ".intro-copy",
    ".services-section",
    ".service-card",
    ".atmosphere-section",
    ".testimonial-section",
    ".testimonial-card",
    ".contact-section"
  ]
};

const styleProps = [
  "opacity",
  "transform",
  "translate",
  "scale",
  "clipPath",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "lineHeight",
  "letterSpacing",
  "color",
  "backgroundColor",
  "backgroundImage",
  "pointerEvents",
  "position",
  "visibility",
  "zIndex"
];

function samplePositions(maxScroll, viewportHeight) {
  const early = [0, 120, 240, 360, 520, 700, 900, 1150, 1450, 1800, 2200, 2700, 3300];
  const sectionBased = Array.from({ length: 12 }, (_, index) => Math.round((maxScroll / 11) * index));
  return [...new Set([...early, ...sectionBased].filter((value) => value <= maxScroll + viewportHeight))]
    .sort((a, b) => a - b);
}

async function readRuntimeCarousels(page) {
  return page.evaluate(
    ({ styleProps }) => {
      const cssPath = (element) => {
        if (!element || !(element instanceof Element)) return null;
        if (element.id) return `#${CSS.escape(element.id)}`;
        const parts = [];
        let node = element;
        while (node && node.nodeType === Node.ELEMENT_NODE && parts.length < 5) {
          let part = node.localName;
          if (node.classList.length) {
            part += `.${[...node.classList].slice(0, 3).map((name) => CSS.escape(name)).join(".")}`;
          }
          const parent = node.parentElement;
          if (parent) {
            const siblings = [...parent.children].filter((child) => child.localName === node.localName);
            if (siblings.length > 1) part += `:nth-of-type(${siblings.indexOf(node) + 1})`;
          }
          parts.unshift(part);
          node = parent;
        }
        return parts.join(" > ");
      };

      const readRect = (element) => {
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          x: Number(rect.x.toFixed(2)),
          y: Number(rect.y.toFixed(2)),
          width: Number(rect.width.toFixed(2)),
          height: Number(rect.height.toFixed(2)),
          top: Number(rect.top.toFixed(2)),
          bottom: Number(rect.bottom.toFixed(2))
        };
      };

      const readStyle = (element) => {
        if (!element) return null;
        const computed = getComputedStyle(element);
        return Object.fromEntries(styleProps.map((prop) => [prop, computed[prop]]));
      };

      return [...document.querySelectorAll(".home-carousel")].map((carousel, index) => {
        const swiperElement = carousel.querySelector(".swiper");
        const swiper = swiperElement?.swiper;
        const wrapper = carousel.querySelector(".swiper-wrapper");
        const slides = [...carousel.querySelectorAll(".swiper-slide")].slice(0, 16);

        return {
          index,
          path: cssPath(carousel),
          rect: readRect(carousel),
          ready: carousel.hasAttribute("data-carousel-ready"),
          swiper: swiper
            ? {
                activeIndex: swiper.activeIndex,
                allowTouchMove: swiper.allowTouchMove,
                autoplayRunning: Boolean(swiper.autoplay?.running),
                initialized: Boolean(swiper.initialized),
                loopedSlides: swiper.loopedSlides ?? null,
                params: {
                  breakpoints: swiper.params?.breakpoints ?? null,
                  loop: swiper.params?.loop ?? null,
                  slidesPerView: swiper.params?.slidesPerView ?? null,
                  spaceBetween: swiper.params?.spaceBetween ?? null,
                  speed: swiper.params?.speed ?? null
                },
                realIndex: swiper.realIndex,
                translate: Number(swiper.translate?.toFixed?.(2) ?? 0)
              }
            : null,
          wrapper: {
            rect: readRect(wrapper),
            style: readStyle(wrapper)
          },
          slides: slides.map((slide, slideIndex) => {
            const container = slide.querySelector(".carousel-container");
            const heading = slide.querySelector(".carousel-heading h2");
            const chars = [...slide.querySelectorAll(".carousel-heading .char")].slice(0, 24);

            return {
              index: slideIndex,
              ariaHidden: slide.getAttribute("aria-hidden"),
              className: slide.getAttribute("class"),
              dataSlide: slide.getAttribute("data-slide"),
              inert: slide.hasAttribute("inert"),
              rect: readRect(slide),
              style: readStyle(slide),
              container: {
                href: container?.getAttribute("href") ?? null,
                rect: readRect(container),
                style: readStyle(container)
              },
              heading: {
                text: heading?.textContent?.replace(/\s+/g, " ").trim() ?? "",
                rect: readRect(heading),
                style: readStyle(heading),
                chars: chars.map((char, charIndex) => ({
                  index: charIndex,
                  text: char.textContent,
                  rect: readRect(char),
                  style: readStyle(char)
                }))
              }
            };
          })
        };
      });
    },
    { styleProps }
  );
}

async function captureCarouselInteractions(page, label, viewport) {
  const carouselCount = await page.locator(".home-carousel").count().catch(() => 0);
  if (!carouselCount) return [];

  const interactionDir = join(outDir, "interactions", `${label}-${viewport.name}`, "home-carousel");
  await mkdir(interactionDir, { recursive: true });

  const carousel = page.locator(".home-carousel").first();
  await carousel.scrollIntoViewIfNeeded();
  await page.waitForTimeout(120);

  const steps = [];

  const snapshot = async (name) => {
    const screenshotPath = join(interactionDir, `${String(steps.length).padStart(2, "0")}-${name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    steps.push({
      name,
      screenshot: screenshotPath,
      scrollY: await page.evaluate(() => Math.round(window.scrollY)),
      carousels: await readRuntimeCarousels(page)
    });
  };

  await snapshot("scroll-in");

  for (const wait of [250, 500, 900, 1300, 1900, 2600]) {
    await page.waitForTimeout(wait);
    await snapshot(`wait-${wait}`);
  }

  const next = page.locator(".home-carousel .elementor-swiper-button-next").first();
  const click = { attempted: false, ok: false, error: null };
  if ((await next.count().catch(() => 0)) > 0) {
    click.attempted = true;
    await next.click({ timeout: 2500 }).then(
      () => {
        click.ok = true;
      },
      (error) => {
        click.error = String(error.message ?? error).slice(0, 500);
      }
    );
    await snapshot(click.ok ? "after-next-click" : "after-next-click-failed");
    await page.mouse.move(4, 4);
    for (const wait of [250, 750, 1250]) {
      await page.waitForTimeout(wait);
      await snapshot(`after-next-${wait}`);
    }
  }

  await page.waitForTimeout(4200);
  await snapshot("after-autoplay-window");

  return [{ type: "home-carousel", click, steps }];
}

async function capturePage(browser, label, url, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.name === "mobile" ? 2 : 1,
    isMobile: viewport.name === "mobile",
    ...(recordVideo
      ? {
          recordVideo: {
            dir: join(outDir, "videos-raw"),
            size: { width: viewport.width, height: viewport.height }
          }
        }
      : {})
  });
  const page = await context.newPage();
  page.setDefaultTimeout(45000);

  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle", { timeout: 25000 }).catch(() => {});
  await page.waitForTimeout(1600);

  const selectors = selectorGroups[label];
  const summary = await page.evaluate(
    ({ selectors, styleProps }) => {
      const cssPath = (element) => {
        if (!element || !(element instanceof Element)) return null;
        if (element.id) return `#${CSS.escape(element.id)}`;
        const parts = [];
        let node = element;
        while (node && node.nodeType === Node.ELEMENT_NODE && parts.length < 5) {
          let part = node.localName;
          if (node.classList.length) {
            part += `.${[...node.classList].slice(0, 3).map((name) => CSS.escape(name)).join(".")}`;
          }
          const parent = node.parentElement;
          if (parent) {
            const siblings = [...parent.children].filter((child) => child.localName === node.localName);
            if (siblings.length > 1) part += `:nth-of-type(${siblings.indexOf(node) + 1})`;
          }
          parts.unshift(part);
          node = parent;
        }
        return parts.join(" > ");
      };

      const readElement = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return { selector, exists: false, count: 0 };
        const rect = element.getBoundingClientRect();
        const computed = getComputedStyle(element);
        return {
          selector,
          exists: true,
          count: document.querySelectorAll(selector).length,
          path: cssPath(element),
          text: element.textContent?.replace(/\s+/g, " ").trim().slice(0, 160) ?? "",
          className: element.getAttribute("class"),
          rect: {
            x: Number(rect.x.toFixed(2)),
            y: Number(rect.y.toFixed(2)),
            width: Number(rect.width.toFixed(2)),
            height: Number(rect.height.toFixed(2)),
            top: Number(rect.top.toFixed(2)),
            bottom: Number(rect.bottom.toFixed(2))
          },
          style: Object.fromEntries(styleProps.map((prop) => [prop, computed[prop]]))
        };
      };

      const scripts = [...document.scripts]
        .map((script, index) => ({ index, text: script.textContent ?? "" }))
        .filter(({ text }) => /gsap|ScrollTrigger|SplitType|clipPath|borderTop|stagger|fromTo/.test(text))
        .map(({ index, text }) => ({
          index,
          length: text.length,
          signals: {
            gsap: /gsap/.test(text),
            scrollTrigger: /ScrollTrigger|scrollTrigger/.test(text),
            splitType: /SplitType/.test(text),
            clipPath: /clipPath/.test(text),
            borderRadius: /borderTopLeftRadius|borderTopRightRadius|border-radius/.test(text)
          },
          snippet: text.replace(/\s+/g, " ").trim().slice(0, 1400)
        }));

      const scrollTriggers = globalThis.ScrollTrigger?.getAll?.().map((trigger, index) => ({
        index,
        id: trigger.vars?.id ?? null,
        trigger: cssPath(trigger.trigger),
        pin: typeof trigger.vars?.pin === "boolean" ? trigger.vars.pin : Boolean(trigger.pin),
        scrub: trigger.vars?.scrub ?? false,
        start: trigger.start,
        end: trigger.end,
        progress: Number(trigger.progress?.toFixed?.(4) ?? 0),
        vars: {
          start: trigger.vars?.start ?? null,
          end: trigger.vars?.end ?? null,
          scrub: trigger.vars?.scrub ?? null,
          once: trigger.vars?.once ?? null,
          toggleActions: trigger.vars?.toggleActions ?? null
        }
      })) ?? [];

      return {
        url: location.href,
        title: document.title,
        viewport: { width: innerWidth, height: innerHeight },
        scrollHeight: document.documentElement.scrollHeight,
        loadedFonts: [...document.fonts].map((font) => ({
          family: font.family,
          status: font.status,
          weight: font.weight,
          style: font.style,
          stretch: font.stretch
        })),
        fontResources: performance
          .getEntriesByType("resource")
          .filter((entry) => /\.(woff2?|ttf|otf|eot)(\?|$)/i.test(entry.name))
          .map((entry) => entry.name),
        initialElements: selectors.map(readElement),
        animationScripts: scripts,
        scrollTriggers
      };
    },
    { selectors, styleProps }
  );
  summary.carousels = await readRuntimeCarousels(page);

  const interactions = await captureCarouselInteractions(page, label, viewport);

  const maxScroll = await page.evaluate(() =>
    Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  );
  const positions = samplePositions(maxScroll, viewport.height);
  const samples = [];
  const frameDir = join(outDir, "frames", `${label}-${viewport.name}`);
  await mkdir(frameDir, { recursive: true });

  for (const y of positions) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(140);
    const sample = await page.evaluate(
      ({ selectors, styleProps }) => {
        const read = (selector) => {
          const element = document.querySelector(selector);
          if (!element) return { selector, exists: false };
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {
            selector,
            exists: true,
            rect: {
              x: Number(rect.x.toFixed(2)),
              y: Number(rect.y.toFixed(2)),
              width: Number(rect.width.toFixed(2)),
              height: Number(rect.height.toFixed(2)),
              top: Number(rect.top.toFixed(2)),
              bottom: Number(rect.bottom.toFixed(2))
            },
            style: Object.fromEntries(styleProps.map((prop) => [prop, style[prop]]))
          };
        };
        return {
          scrollY: Math.round(window.scrollY),
          viewport: { width: innerWidth, height: innerHeight },
          elements: selectors.map(read),
          scrollTriggers: globalThis.ScrollTrigger?.getAll?.().map((trigger, index) => ({
            index,
            progress: Number(trigger.progress?.toFixed?.(4) ?? 0),
            start: trigger.start,
            end: trigger.end
          })) ?? []
        };
      },
      { selectors, styleProps }
    );
    sample.carousels = await readRuntimeCarousels(page);
    samples.push(sample);

    if (positions.indexOf(y) % 3 === 0) {
      await page.screenshot({
        path: join(frameDir, `${String(y).padStart(5, "0")}.png`),
        fullPage: false
      });
    }
  }

  const video = page.video();
  let videoPath = null;
  await page.close();
  if (video) {
    await mkdir(join(outDir, "videos"), { recursive: true });
    videoPath = join(outDir, "videos", `${label}-${viewport.name}.webm`);
    await video.saveAs(videoPath);
  }
  await context.close();
  return { summary, samples, interactions, videoPath };
}

function changingSignals(capture, label) {
  const signals = new Set();
  for (const selector of selectorGroups[label]) {
    for (const prop of styleProps) {
      const values = new Set(
        capture.samples
          .map((sample) => sample.elements.find((element) => element.selector === selector)?.style?.[prop])
          .filter(Boolean)
      );
      if (values.size > 1) signals.add(`${selector}:${prop}`);
    }
  }
  return [...signals].sort();
}

function analyzeCapture(target, clone) {
  const targetSignals = changingSignals(target, "target");
  const cloneSignals = changingSignals(clone, "clone");
  const cloneProps = new Set(cloneSignals.map((signal) => signal.split(":").at(-1)));

  return {
    target: {
      title: target.summary.title,
      scrollHeight: target.summary.scrollHeight,
      animationScriptCount: target.summary.animationScripts.length,
      scrollTriggerCount: target.summary.scrollTriggers.length,
      loadedFonts: target.summary.loadedFonts,
      fontResources: target.summary.fontResources,
      carouselCount: target.summary.carousels.length,
      carousels: target.summary.carousels,
      changingStyleSignals: targetSignals,
      fontFamiliesBySelector: Object.fromEntries(
        target.summary.initialElements
          .filter((element) => element.exists)
          .map((element) => [element.selector, element.style.fontFamily])
      )
    },
    clone: {
      title: clone.summary.title,
      scrollHeight: clone.summary.scrollHeight,
      animationScriptCount: clone.summary.animationScripts.length,
      scrollTriggerCount: clone.summary.scrollTriggers.length,
      loadedFonts: clone.summary.loadedFonts,
      fontResources: clone.summary.fontResources,
      carouselCount: clone.summary.carousels.length,
      carousels: clone.summary.carousels,
      changingStyleSignals: cloneSignals,
      fontFamiliesBySelector: Object.fromEntries(
        clone.summary.initialElements
          .filter((element) => element.exists)
          .map((element) => [element.selector, element.style.fontFamily])
      )
    },
    gaps: {
      scrollTriggerDelta: target.summary.scrollTriggers.length - clone.summary.scrollTriggers.length,
      animationScriptDelta: target.summary.animationScripts.length - clone.summary.animationScripts.length,
      targetOnlyMotionSignals: targetSignals.filter((signal) => !cloneProps.has(signal.split(":").at(-1)))
    }
  };
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"]
});

const output = {
  capturedAt: new Date().toISOString(),
  targetUrl,
  cloneUrl,
  viewports: {}
};

for (const viewport of viewportProfiles) {
  const target = await capturePage(browser, "target", targetUrl, viewport);
  const clone = await capturePage(browser, "clone", cloneUrl, viewport);

  output.viewports[viewport.name] = {
    viewport,
    analysis: analyzeCapture(target, clone),
    interactions: {
      target: target.interactions,
      clone: clone.interactions
    },
    videos: {
      target: target.videoPath,
      clone: clone.videoPath
    }
  };

  await writeFile(join(outDir, `target-${viewport.name}-summary.json`), JSON.stringify(target.summary, null, 2));
  await writeFile(
    join(outDir, `target-${viewport.name}-samples.jsonl`),
    target.samples.map((sample) => JSON.stringify(sample)).join("\n")
  );
  await writeFile(
    join(outDir, `target-${viewport.name}-interactions.json`),
    JSON.stringify(target.interactions, null, 2)
  );
  await writeFile(join(outDir, `clone-${viewport.name}-summary.json`), JSON.stringify(clone.summary, null, 2));
  await writeFile(
    join(outDir, `clone-${viewport.name}-samples.jsonl`),
    clone.samples.map((sample) => JSON.stringify(sample)).join("\n")
  );
  await writeFile(
    join(outDir, `clone-${viewport.name}-interactions.json`),
    JSON.stringify(clone.interactions, null, 2)
  );
}

await browser.close();

await writeFile(join(outDir, "analysis.json"), JSON.stringify(output, null, 2));
console.log(
  JSON.stringify(
    {
      capturedAt: output.capturedAt,
      targetUrl,
      cloneUrl,
      outDir,
      viewports: Object.fromEntries(
        Object.entries(output.viewports).map(([name, result]) => [
          name,
          {
            target: {
              carouselCount: result.analysis.target.carouselCount,
              scrollHeight: result.analysis.target.scrollHeight,
              scrollTriggerCount: result.analysis.target.scrollTriggerCount,
              interactionSteps: result.interactions.target?.[0]?.steps?.length ?? 0,
              video: result.videos.target
            },
            clone: {
              carouselCount: result.analysis.clone.carouselCount,
              scrollHeight: result.analysis.clone.scrollHeight,
              scrollTriggerCount: result.analysis.clone.scrollTriggerCount,
              interactionSteps: result.interactions.clone?.[0]?.steps?.length ?? 0,
              video: result.videos.clone
            }
          }
        ])
      )
    },
    null,
    2
  )
);
