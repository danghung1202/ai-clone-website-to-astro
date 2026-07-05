import { existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";

const root = process.cwd();
const dist = join(root, "dist");
const executablePath = process.env.PLAYWRIGHT_CHROME_EXECUTABLE ?? "/usr/bin/google-chrome";

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".mov", "video/quicktime"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".xml", "application/xml; charset=utf-8"]
]);

function fail(message, details) {
  const error = new Error(message);
  error.details = details;
  throw error;
}

function resolvePath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split("?")[0] ?? "/");
  const relativePath = normalize(decodedPath.replace(/^\/+/, ""));
  if (relativePath.startsWith("..")) return null;
  return join(dist, relativePath || "index.html");
}

async function findFile(urlPath) {
  const directPath = resolvePath(urlPath);
  if (!directPath) return null;

  if (existsSync(directPath)) {
    const info = await stat(directPath);
    if (info.isFile()) return directPath;
    if (info.isDirectory()) {
      const indexPath = join(directPath, "index.html");
      if (existsSync(indexPath)) return indexPath;
    }
  }

  const indexPath = join(directPath, "index.html");
  if (existsSync(indexPath)) return indexPath;
  return null;
}

function createStaticServer() {
  const server = createServer(async (request, response) => {
    try {
      const filePath = await findFile(request.url ?? "/");
      if (!filePath) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      const body = await readFile(filePath);
      response.writeHead(200, {
        "Content-Type": contentTypes.get(extname(filePath)) ?? "application/octet-stream"
      });
      response.end(body);
    } catch (error) {
      response.writeHead(500);
      response.end(error instanceof Error ? error.message : "Server error");
    }
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") fail("could not start static server");
      resolve({ server, origin: `http://127.0.0.1:${address.port}` });
    });
  });
}

function readSplitState(selector) {
  const elements = Array.from(document.querySelectorAll(selector));
  return elements.map((element) => {
    const styles = getComputedStyle(element);
    return {
      opacity: styles.opacity,
      text: element.textContent,
      transform: styles.transform
    };
  });
}

function readOpacity(item) {
  const opacity = Number.parseFloat(item.opacity);
  return Number.isFinite(opacity) ? opacity : 1;
}

const { server, origin } = await createStaticServer();
let browser;
let passed = false;

try {
  browser = await chromium.launch({ executablePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.waitForSelector(".services-section .home-carousel-h2 .char", { timeout: 10000 });
  await page.waitForTimeout(250);

  const before = await page.evaluate(readSplitState, ".services-section .home-carousel-h2 .char, .services-section .home-carousel-h3 .word, .services-section .carousel-heading .char");
  const visibleBeforeReveal = before.filter((item) => readOpacity(item) > 0.001);
  if (visibleBeforeReveal.length) {
    fail("services split text should be hidden before its ScrollTrigger reveal", visibleBeforeReveal.slice(0, 8));
  }

  await page.locator(".services-section").scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector(".home-carousel")?.hasAttribute("data-carousel-ready"));

  const afterCards = await page.evaluate(readSplitState, ".home-carousel .swiper-slide:not(.swiper-slide-duplicate) .carousel-heading .char");
  const afterHeading = await page.evaluate(readSplitState, ".services-section .home-carousel-h2 .char");
  const afterSubheading = await page.evaluate(readSplitState, ".services-section .home-carousel-h3 .word");
  const hiddenAfterReady = [...afterCards, ...afterHeading, ...afterSubheading].filter((item) => readOpacity(item) < 0.999);

  if (hiddenAfterReady.length) {
    fail("all services split text should be visible when carousel is ready", hiddenAfterReady.slice(0, 8));
  }

  await page.close();
  passed = true;
} catch (error) {
  console.error(`Motion runtime verification failed: ${error instanceof Error ? error.message : "unknown error"}`);
  if (error?.details) console.error(JSON.stringify(error.details, null, 2));
  process.exitCode = 1;
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}

if (passed) console.log("Motion runtime verification passed.");
