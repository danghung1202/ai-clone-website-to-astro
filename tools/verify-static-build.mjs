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

if (failures.length) {
  console.error("Static build verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Static build verification passed for ${expectedRoutes.length} routes.`);
