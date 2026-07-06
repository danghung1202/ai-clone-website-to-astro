import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expectedRoutes } from "./expected-routes.mjs";

const root = process.cwd();
const dist = join(root, "dist");
const canonicalHost = "https://pnkbeauty.se";
const failures = [];

function routeToFile(route) {
  if (route === "/") return join(dist, "index.html");
  return join(dist, route.replace(/^\//, ""), "index.html");
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
const sitemapUrls = new Set(
  [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) => match[1])
);

for (const route of expectedRoutes) {
  const file = routeToFile(route);
  check(existsSync(file), `Missing built route file for ${route}`);
  check(sitemapUrls.has(`${canonicalHost}${route}`), `Missing sitemap URL for ${route}`);
}

const builtHome = existsSync(join(dist, "index.html"))
  ? readFileSync(join(dist, "index.html"), "utf8")
  : "";
const builtBooking = existsSync(routeToFile("/boka/"))
  ? readFileSync(routeToFile("/boka/"), "utf8")
  : "";
const globalStyles = existsSync(join(root, "src/styles/global.css"))
  ? readFileSync(join(root, "src/styles/global.css"), "utf8")
  : "";
const venetianHeroVideo = "https://venetianspa.ca/wp-content/uploads/2026/04/aea5496227e84dd317a0bf9396ae97ed.mov";
const scannedOutputs = [];

for (const route of expectedRoutes) {
  const file = routeToFile(route);
  if (existsSync(file)) {
    scannedOutputs.push({
      label: `route HTML for ${route}`,
      contents: readFileSync(file, "utf8")
    });
  }
}

for (const fileName of ["sitemap.xml", "robots.txt"]) {
  const file = join(dist, fileName);
  if (existsSync(file)) {
    scannedOutputs.push({
      label: fileName,
      contents: readFileSync(file, "utf8")
    });
  }
}

for (const forbidden of ["venetian-astro.local", "example.com", "localhost:3000", "your-google-verification-code"]) {
  for (const output of scannedOutputs) {
    check(!output.contents.includes(forbidden), `Forbidden placeholder found in ${output.label}: ${forbidden}`);
  }
}

check(builtHome.includes("PNK Beauty Klinik"), "Home HTML should contain PNK Beauty Klinik");
check(builtHome.includes("Bokadirekt"), "Home HTML should contain Bokadirekt booking copy");
check(builtHome.includes("application/ld+json"), "Home HTML should contain structured data");
check(builtHome.includes("\"@type\":\"LocalBusiness\""), "Home structured data should include LocalBusiness");
check(globalStyles.includes("min-height: clamp(440px, 62svh, 560px);"), "Subpage hero should use the compact desktop height");
check(globalStyles.includes("min-height: clamp(430px, 74svh, 560px);"), "Subpage hero should use the compact mobile height");

const headerFooterChecks = [
  { needle: "data-mega-menu", message: "Header should include a desktop mega menu" },
  { needle: "data-mobile-drawer", message: "Header should include a mobile drawer" },
  { needle: "footer-treatment-group", message: "Footer should include structured treatment groups" },
  { needle: "footer-bottom", message: "Footer should include a bottom utility/legal row" },
  { needle: "/behandlingar/botox-boras/", message: "Header/footer should link to Botox treatment" },
  { needle: "/behandlingar/hudvard-boras/", message: "Header/footer should link to Hudvard category" },
  { needle: "Boka via Bokadirekt", message: "Header/footer should include Bokadirekt booking CTA" },
  { needle: "/allmanna-villkor/", message: "Footer should include legal links" }
];

for (const { needle, message } of headerFooterChecks) {
  check(builtHome.includes(needle), message);
}

const mobileFooterChecks = [
  { needle: "footer-mobile-compact", message: "Footer should include a compact mobile-specific footer" },
  { needle: "footer-mobile-primary", message: "Mobile footer should include primary action links" },
  { needle: "footer-mobile-links", message: "Mobile footer should include compact utility links" },
  { needle: "footer-phone-icon", message: "Mobile footer ring action should include a phone icon" },
  { needle: "footer-mail-icon", message: "Mobile footer mail action should include a mail icon" }
];

for (const { needle, message } of mobileFooterChecks) {
  check(builtHome.includes(needle), message);
}

check(globalStyles.includes(".site-footer-groups.footer-treatment-group"), "Mobile CSS should target footer treatment groups directly");
check(globalStyles.includes(".footer-mobile-compact"), "Footer CSS should style the compact mobile footer");
check(globalStyles.includes(".site-footer .footer-mobile-links"), "Mobile footer links should override the base footer nav layout");

const bookingHubChecks = [
  { needle: "booking-hub", message: "Booking page should render the booking hub" },
  { needle: "booking-provider-profile", message: "Booking page should include a provider profile block" },
  { needle: "booking-rating-summary", message: "Booking page should include clinic rating summary" },
  { needle: "booking-gift-card", message: "Booking page should include gift card booking entry" },
  { needle: "booking-service-list", message: "Booking page should include the full service list" },
  { needle: "booking-service-group", message: "Booking page should group services by treatment category" },
  { needle: "booking-service-image", message: "Booking page should include service thumbnails" },
  { needle: "booking-service-book", message: "Booking service rows should expose booking actions" },
  { needle: "booking-calendar-panel", message: "Booking page should include the calendar panel" },
  { needle: "booking-calendar-month", message: "Booking page should include a monthly calendar grid" },
  { needle: "data-book-date", message: "Booking calendar should expose selectable date buttons" },
  { needle: "data-booking-calendar", message: "Booking calendar should be addressable by the workflow script" },
  { needle: "data-provider-ready=\"fresha\"", message: "Booking page should be marked as Fresha-ready" },
  { needle: "Alla tjänster", message: "Booking page should use a Bokadirekt-style all-services section" }
];

for (const { needle, message } of bookingHubChecks) {
  check(builtBooking.includes(needle), message);
}

check(globalStyles.includes(".booking-hub"), "Booking hub should have dedicated CSS");
check(globalStyles.includes(".booking-service-card.is-mobile-compact"), "Booking cards should expose compact mobile styling");
check(globalStyles.includes(".booking-calendar-month"), "Booking calendar grid should have dedicated CSS");

const homeHeroVideoTag = builtHome.match(/<video class="hero-video"[^>]*>/)?.[0] ?? "";
check(homeHeroVideoTag.includes("hero-video"), "Home should render hero video media");
check(!homeHeroVideoTag.includes("poster="), "Home hero video should not use the old PNK banner as poster media");

const pageChecks = [
  {
    route: "/behandlingar/lappfillers-boras/",
    expected: ["Hyaluron Pen", "60 min", "Läppar 1 ml", "30 min"]
  },
  {
    route: "/behandlingar/kemisk-peeling-boras/",
    expected: [
      "Kemisk peeling",
      "Från 1 500 kr",
      "45 min",
      "Kemisk peeling med kit",
      "3 990 kr",
      "60 min",
      "Ekologisk peeling",
      "2 195 kr",
      "80 min"
    ]
  },
  {
    route: "/behandlingar/marina-miracles-boras/",
    expected: [
      "Marina Miracles Express",
      "995 kr",
      "30 min",
      "Marina Miracles Full cover",
      "1 695 kr",
      "60 min"
    ]
  }
];

for (const { route, expected } of pageChecks) {
  const file = routeToFile(route);
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  for (const text of expected) {
    check(html.includes(text), `${route} should contain verified Bokadirekt value: ${text}`);
  }
}

const treatmentDepthChecks = [
  {
    route: "/behandlingar/botox-boras/",
    expected: ["Behandlingen med Botox", "Före och efter Botox", "Efter behandlingen"]
  },
  {
    route: "/behandlingar/lappfillers-boras/",
    expected: ["Behandlingen med läppfillers", "Vad fillers kan göra för läpparna", "Efter behandlingen"]
  },
  {
    route: "/behandlingar/microneedling-boras/",
    expected: ["Behandlingen med microneedling", "Detta kan behandlingen passa för", "Efter behandlingen"]
  }
];

for (const { route, expected } of treatmentDepthChecks) {
  const file = routeToFile(route);
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  check(html.includes("treatment-story"), `${route} should render extended treatment description sections`);
  for (const text of expected) {
    check(html.includes(text), `${route} should contain extended treatment copy: ${text}`);
  }
}

for (const route of expectedRoutes) {
  const file = routeToFile(route);
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  if (!html.includes("subpage-hero")) continue;
  const subpageHeroVideoTag = html.match(/<video class="subpage-hero-media"[^>]*>/)?.[0] ?? "";
  check(html.includes('<video class="subpage-hero-media"'), `${route} should render the subpage hero as video media`);
  check(!subpageHeroVideoTag.includes("poster="), `${route} should not use the old PNK banner or treatment image as poster media`);
  check(html.includes(venetianHeroVideo), `${route} should use the Venetian hero video`);
}

if (failures.length) {
  console.error("Static build verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Static build verification passed for ${expectedRoutes.length} routes.`);
