import { site } from "../data/site";
import { allArticleRoutes } from "../data/articles";
import { allTreatmentRoutes } from "../data/treatments";

const coreRoutes = [
  "/",
  "/behandlingar/",
  "/priser/",
  "/boka/",
  "/presentkort/",
  "/om-kliniken/",
  "/personal/",
  "/recensioner/",
  "/artiklar/",
  "/kontakt/",
  "/integritetspolicy/",
  "/allmanna-villkor/"
];

const normalizeRoute = (route: string) => {
  const withLeadingSlash = route.startsWith("/") ? route : `/${route}`;

  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
};

export function GET() {
  const lastmod = new Date().toISOString();
  const routes = Array.from(
    new Set(
      [...coreRoutes, ...allTreatmentRoutes, ...allArticleRoutes].map(
        normalizeRoute
      )
    )
  );

  const urlEntries = routes
    .map(
      (route) => `  <url>
    <loc>${new URL(route, site.domain).toString()}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
    )
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      }
    }
  );
}
