import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Swiper, { Autoplay, Navigation } from "swiper";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);
(window as Window & { ScrollTrigger: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger;

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const VENETIAN_HEADING_CHAR_STAGGER = 0.05;
const VENETIAN_SUBHEADING_WORD_STAGGER = 0.1;

const $ = <T extends Element = Element>(selector: string, root: ParentNode = document): T | null =>
  root.querySelector<T>(selector);

const $$ = <T extends Element = Element>(selector: string, root: ParentNode = document): T[] =>
  Array.from(root.querySelectorAll<T>(selector));

function split(selector: string, types: string): SplitType | null {
  const element = $(selector);
  if (!element) return null;
  return splitElement(element, types);
}

function splitElement(element: Element | null, types: string): SplitType | null {
  if (!element) return null;
  const htmlElement = element as HTMLElement;
  const previousVisibility = htmlElement.style.visibility;
  htmlElement.style.visibility = "hidden";
  try {
    return new SplitType(htmlElement, { types });
  } finally {
    htmlElement.style.visibility = previousVisibility;
  }
}

function primeSplitChars(targets: Element[] | undefined, y = 30) {
  if (!targets?.length) return;
  gsap.set(targets, { y, opacity: 0 });
}

function primeSplitWords(targets: Element[] | undefined, y = 15) {
  if (!targets?.length) return;
  gsap.set(targets, { y, opacity: 0 });
}

function primeSplitLines(targets: Element[] | undefined, y = 20) {
  if (!targets?.length) return;
  gsap.set(targets, { y, opacity: 0 });
}

function revealChars(targets: Element[] | undefined, trigger: Element | null, id: string) {
  if (!targets?.length || !trigger) return;
  primeSplitChars(targets);
  gsap.to(targets, {
    y: 0,
    opacity: 1,
    duration: 0.3,
    stagger: VENETIAN_HEADING_CHAR_STAGGER,
    ease: "power2.out",
    scrollTrigger: {
      id,
      trigger,
      start: "top 80%"
    }
  });
}

function revealHeroChars(targets: Element[] | undefined, trigger: Element | null) {
  if (!targets?.length || !trigger) return;
  primeSplitChars(targets);
  gsap.to(targets, {
    y: 0,
    opacity: 1,
    duration: 0.28,
    stagger: 0.012,
    ease: "power2.out",
    scrollTrigger: {
      id: "hero-title",
      trigger,
      start: "top 80%"
    }
  });
}

function initHero() {
  const hero = $(".home-hero-container");
  const heading = $(".hero-heading");
  if (!hero || !heading) return;

  const button = $(".hero-button");
  if (button) {
    gsap.from(button, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
      scrollTrigger: {
        id: "hero-button",
        trigger: heading,
        start: "top 80%"
      }
    });
  }

  const strips = $$(".blind-strip-v");
  if (!strips.length) return;

  gsap.set(strips, {
    rotationY: -90,
    transformOrigin: "left center",
    transformStyle: "preserve-3d"
  });

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1025px)", () => {
    gsap.to(strips, {
      rotationY: 0,
      ease: "power3.out",
      stagger: 0.005,
      scrollTrigger: {
        id: "hero-blinds-desktop",
        trigger: hero,
        start: "top top",
        end: "+=125%",
        scrub: true
      }
    });
  });

  mm.add("(max-width: 1024px)", () => {
    gsap.to(strips, {
      rotationY: 0,
      ease: "power3.out",
      stagger: 0.005,
      scrollTrigger: {
        id: "hero-blinds-mobile",
        trigger: hero,
        start: "top top",
        end: "+=100%",
        scrub: true
      }
    });
  });
}

function initIntro() {
  const section = $(".radius-section");
  if (!section) return;

  gsap.matchMedia().add("(min-width: 1025px)", () => {
    gsap.to(section, {
      borderTopLeftRadius: "400px",
      borderTopRightRadius: "400px",
      ease: "none",
      scrollTrigger: {
        id: "radius-section",
        trigger: section,
        start: "top 95%",
        end: "+=600",
        scrub: true
      }
    });
  });

  const subheadingSplit = split(".radius-sub-heading h3", "words");
  revealChars(subheadingSplit?.words, $(".radius-sub-heading"), "radius-sub-heading");

  $$(".general-reveal-img").forEach((wrapper) => {
    const img = $("img", wrapper);
    const container = wrapper.closest(".radius-img-container");
    if (!img || !container) return;

    gsap
      .timeline({
        scrollTrigger: {
          id: "general-reveal-img",
          trigger: container,
          start: "top 65%",
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true
        }
      })
      .fromTo(
        wrapper,
        { clipPath: "polygon(0 0, 0 0, 0 0, 0 0)" },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1, ease: "power1.out" }
      )
      .fromTo(img, { scale: 1.5 }, { scale: 1, duration: 1, ease: "power2.out" }, 0);
  });

  const heading = $(".radius-heading h2");
  const copy = $(".radius-p p");
  const button = $(".radius-button");
  const headingSplit = splitElement(heading, "words, chars");
  const copySplit = splitElement(copy, "lines");
  primeSplitChars(headingSplit?.chars);
  primeSplitLines(copySplit?.lines);

  const timeline = gsap.timeline({
    scrollTrigger: {
      id: "radius-heading-copy",
      trigger: heading ?? section,
      start: "top 80%"
    }
  });

  if (headingSplit?.chars.length) {
    timeline.to(headingSplit.chars, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      stagger: VENETIAN_HEADING_CHAR_STAGGER,
      ease: "power2.out"
    });
  }

  if (copySplit?.lines.length) {
    timeline.to(
      copySplit.lines,
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        stagger: VENETIAN_SUBHEADING_WORD_STAGGER,
        ease: "power2.out"
      },
      "-=0.15"
    );
  }

  if (button) {
    timeline.from(button, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
    });
  }
}

function initServices() {
  const heading = $(".home-carousel-h2");
  const headingSplit = splitElement(heading, "words, chars");
  const subheading = $(".home-carousel-h3");
  const subheadingSplit = splitElement(subheading, "words");
  primeSplitChars(headingSplit?.chars);
  primeSplitWords(subheadingSplit?.words);

  const headingTimeline = gsap.timeline({
    scrollTrigger: {
      id: "home-carousel-heading",
      trigger: heading,
      start: "top 80%"
    }
  });

  if (headingSplit?.chars.length) {
    headingTimeline.to(headingSplit.chars, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      stagger: VENETIAN_HEADING_CHAR_STAGGER,
      ease: "power2.out"
    });
  }

  if (subheadingSplit?.words.length) {
    headingTimeline.to(
      subheadingSplit.words,
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        stagger: VENETIAN_SUBHEADING_WORD_STAGGER,
        ease: "power2.out"
      },
      "-=0.2"
    );
  }

  const carousel = $<HTMLElement>(".home-carousel");
  const swiperElement = $<HTMLElement>(".home-carousel .swiper");
  if (!carousel || !swiperElement) return;

  const nextEl = $<HTMLElement>(".home-carousel .elementor-swiper-button-next");
  const prevEl = $<HTMLElement>(".home-carousel .elementor-swiper-button-prev");
  const swiper = new Swiper(swiperElement, {
    modules: [Autoplay, Navigation],
    allowTouchMove: false,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    breakpoints: {
      0: { loopAdditionalSlides: 0, slidesPerView: 1 },
      768: { loopAdditionalSlides: 0, slidesPerView: 2 },
      1025: { loopAdditionalSlides: 1, slidesPerView: 3 }
    },
    loop: true,
    loopAdditionalSlides: 0,
    navigation: {
      nextEl,
      prevEl
    },
    simulateTouch: false,
    slidesPerView: 1,
    spaceBetween: 23,
    speed: 1000
  });

  swiper.autoplay?.stop();

  const slides = $$(".home-carousel .swiper-slide:not(.swiper-slide-duplicate)");
  if (!slides.length) return;

  let carouselReady = false;
  let carouselRevealReadyDelay = 0;
  const markCarouselReady = () => {
    if (carouselReady) return;
    carouselReady = true;
    carousel.setAttribute("data-carousel-ready", "");
    swiper.autoplay?.start();

    if (swiperElement.matches(":hover")) {
      swiper.autoplay?.stop();
    }
  };

  slides.forEach((slide, index) => {
    const container = $(".carousel-container", slide);
    const headingElement = $(".carousel-heading h2", slide);
    if (!container || !headingElement) return;

    const splitHeading = splitElement(headingElement, "chars");
    primeSplitChars(splitHeading?.chars);
    const slideDelay = index * 0.18;
    const headingRevealDuration = splitHeading?.chars.length
      ? 0.3 + Math.max(splitHeading.chars.length - 1, 0) * VENETIAN_HEADING_CHAR_STAGGER
      : 0;
    const slideRevealDuration = Math.max(0.8, 0.5 + headingRevealDuration);
    carouselRevealReadyDelay = Math.max(carouselRevealReadyDelay, slideDelay + slideRevealDuration);

    const timeline = gsap.timeline({
      delay: slideDelay,
      scrollTrigger: {
        id: `home-carousel-slide-${index + 1}`,
        trigger: carousel,
        start: "top 50%",
        toggleActions: "play none none none",
        once: true
      }
    });

    timeline.fromTo(
      container,
      {
        clipPath: "polygon(0 0, 0 0, 0 0, 0 0)",
        scale: 1.5
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.8,
        ease: "power2.out",
        scale: 1
      }
    );

    if (splitHeading?.chars.length) {
      timeline.to(
        splitHeading.chars,
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: VENETIAN_HEADING_CHAR_STAGGER,
          ease: "power2.out"
        },
        "-=0.3"
      );
    }

    if (index === slides.length - 1) {
      timeline.add(() => {
        markCarouselReady();
      });
    }
  });

  ScrollTrigger.create({
    id: "home-carousel-ready-fallback",
    trigger: carousel,
    start: "top 50%",
    once: true,
    onEnter: () => {
      gsap.delayedCall(carouselRevealReadyDelay + 0.15, markCarouselReady);
    }
  });

  const servicesButton = $(".services-action");
  if (servicesButton) {
    gsap.from(servicesButton, {
      y: 30,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        id: "services-button",
        trigger: servicesButton,
        start: "top 98%"
      }
    });
  }
}

function initAtmosphere() {
  const container = $<HTMLElement>(".home-scroll-container");
  const heading = $(".home-scroll-h2");
  const copy = $(".home-scroll-p");
  const bg = $(".large-bg-icon");
  const moveImages = $$(".move-up-img");
  const headingSplit = splitElement(heading, "words, chars");
  const copySplit = splitElement(copy, "lines");
  primeSplitChars(headingSplit?.chars);
  primeSplitLines(copySplit?.lines);

  const timeline = gsap.timeline({
    scrollTrigger: {
      id: "home-scroll-copy",
      trigger: heading ?? container,
      start: "top 80%"
    }
  });

  if (headingSplit?.chars.length) {
    timeline.to(headingSplit.chars, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      stagger: 0.035,
      ease: "power2.out"
    });
  }

  if (copySplit?.lines.length) {
    timeline.to(
      copySplit.lines,
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.08,
        ease: "power2.out"
      },
      "-=0.1"
    );
  }

  if (!container || reducedMotion) return;

  if (bg) {
    gsap.fromTo(
      bg,
      { scale: 1, opacity: 1 },
      {
        scale: 1.75,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          id: "home-scroll-bg",
          trigger: container,
          start: "top top",
          end: "+=3000",
          scrub: true
        }
      }
    );
  }

  if (moveImages.length) {
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        id: "home-scroll-images",
        trigger: container,
        start: "top top",
        end: "+=3000",
        scrub: true,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true
      }
    });

    moveImages.forEach((image, index) => {
      scrollTimeline.fromTo(
        image,
        { y: () => window.innerHeight },
        { y: () => -window.innerHeight, ease: "none" },
        index * 0.12
      );
    });
  }

  const innerImages = moveImages.map((image) => $("img", image)).filter(Boolean);
  if (window.innerWidth > 1024 && innerImages.length) {
    const parallaxStrength = 25;
    document.addEventListener("mousemove", (event) => {
      const mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      const mouseY = (event.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(innerImages, {
        x: -mouseX * parallaxStrength,
        y: -mouseY * parallaxStrength,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  }
}

function initTestimonials() {
  const container = $(".testimonial-container");
  if (!container) return;

  const heading = $(".testimonial-h2 h2");
  const headingSplit = splitElement(heading, "words, chars");
  revealChars(headingSplit?.chars, $(".testimonial-h2"), "testimonial-h2");

  const bg = $(".testimonial-bg-icon");
  if (bg) {
    gsap.fromTo(
      bg,
      { scale: 1, opacity: 1 },
      {
        scale: 1.75,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          id: "testimonial-bg",
          trigger: container,
          start: "top top",
          end: "+=3000",
          scrub: true
        }
      }
    );
  }

  const wrappers = $$(".testimonial-wrapper");
  if (!wrappers.length) return;
  const cards = wrappers.map((wrapper) => $(".testimonial-card", wrapper)).filter(Boolean);

  const timeline = gsap.timeline({
    scrollTrigger: {
      id: "testimonial-main",
      trigger: container,
      start: "top top",
      end: "+=3000",
      scrub: true,
      pin: true,
      pinSpacing: true,
      invalidateOnRefresh: true
    }
  });

  wrappers.forEach((wrapper, index) => {
    timeline.fromTo(
      wrapper,
      { y: () => window.innerHeight },
      { y: () => -window.innerHeight, ease: "none" },
      index * 0.12
    );
  });

  if (window.innerWidth > 1024 && cards.length) {
    document.addEventListener("mousemove", (event) => {
      const mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      const mouseY = (event.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(cards, {
        x: -mouseX * 25,
        y: -mouseY * 25,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  }
}

function initContact() {
  const section = $(".home-cta-container");
  if (!section) return;

  const heading = $(".cta-h2 h2");
  const copy = $(".cta-p");
  const headingSplit = splitElement(heading, "words, chars");
  const copySplit = splitElement(copy, "lines");
  primeSplitChars(headingSplit?.chars);
  primeSplitLines(copySplit?.lines);

  const timeline = gsap.timeline({
    scrollTrigger: {
      id: "cta-copy",
      trigger: section,
      start: "top 80%"
    }
  });

  if (headingSplit?.chars.length) {
    timeline.to(headingSplit.chars, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      stagger: 0.045,
      ease: "power2.out"
    });
  }

  if (copySplit?.lines.length) {
    timeline.to(
      copySplit.lines,
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.08,
        ease: "power2.out"
      },
      "-=0.1"
    );
  }

  const fields = $$(".home-cta-form .elementor-field-group");
  if (fields.length) {
    gsap.fromTo(
      fields,
      {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        opacity: 0,
        scale: 1.08
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.14,
        ease: "power2.out",
        scrollTrigger: {
          id: "cta-fields",
          trigger: section,
          start: "top 80%"
        }
      }
    );
  }
}

function initSubpages() {
  const heroTitle = $(".subpage-hero-title");
  const heroCopy = $(".subpage-hero-copy");
  const heroTrigger = heroTitle ?? heroCopy;

  if (heroTrigger) {
    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        id: "subpage-hero",
        trigger: heroTrigger,
        start: "top 82%"
      }
    });

    if (heroTitle) {
      heroTimeline.from(heroTitle, {
        y: 28,
        opacity: 0,
        duration: 0.45,
        ease: "power2.out"
      });
    }

    if (heroCopy) {
      heroTimeline.from(
        heroCopy,
        {
          y: 18,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out"
        },
        "-=0.2"
      );
    }
  }

  $$(".subpage-reveal").forEach((element, index) => {
    gsap.from(element, {
      y: 28,
      opacity: 0,
      duration: 0.45,
      delay: Math.min(index * 0.025, 0.12),
      ease: "power2.out",
      scrollTrigger: {
        id: `subpage-reveal-${index + 1}`,
        trigger: element,
        start: "top 86%",
        once: true
      }
    });
  });
}

async function initMotion() {
  if (reducedMotion) return;

  await document.fonts.ready.catch(() => undefined);

  initHero();
  initIntro();
  initServices();
  initAtmosphere();
  initTestimonials();
  initContact();
  initSubpages();

  requestAnimationFrame(() => ScrollTrigger.refresh());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    void initMotion();
  });
} else {
  void initMotion();
}
