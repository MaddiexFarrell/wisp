// Capture hero screenshots of the live work sites into /public/work.
// Run with: npm run shots
//
// Captures a desktop viewport (not full page) so each shot frames the site's
// hero — which is what shows through the portrait cards in the Work section.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "work");

// Keep `slug` in sync with the `image` paths in src/components/sections/work.tsx.
const sites = [
  { slug: "vector", url: "https://govector.ai/", settle: 3500 },
  { slug: "automation", url: "https://theautomationcompany.co/", settle: 3000 },
  { slug: "vultron", url: "https://www.vultron.ai/", settle: 4000 },
  { slug: "anthea", url: "https://antheatalent.com/", settle: 3000 },
  // Render free tier can cold-start slowly — give it extra time.
  { slug: "mira", url: "https://mira-site.onrender.com/", settle: 5000 },
];

// Desktop viewport; the cards crop this to portrait via object-cover/object-top.
const VIEWPORT = { width: 1440, height: 900 };

// Best-effort dismissal of common cookie/consent banners so they don't show up
// in the screenshot. Failures are ignored on purpose.
async function dismissBanners(page) {
  const labels = [
    "Accept all",
    "Accept All",
    "Accept",
    "I agree",
    "Agree",
    "Got it",
    "Allow all",
    "OK",
  ];
  for (const label of labels) {
    try {
      const btn = page.getByRole("button", { name: label, exact: false });
      if (await btn.first().isVisible({ timeout: 500 })) {
        await btn.first().click({ timeout: 1000 });
        break;
      }
    } catch {
      // no such banner — move on
    }
  }
}

async function capture(browser, { slug, url, settle }) {
  const page = await browser.newPage({
    viewport: VIEWPORT,
    deviceScaleFactor: 2, // retina-crisp screenshots
  });
  try {
    console.log(`→ ${slug}: loading ${url}`);
    // Prefer networkidle, but sites with looping hero video never go idle —
    // fall back to a plain load so those still capture.
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
    } catch {
      console.log(`  ${slug}: networkidle timed out, falling back to load`);
      await page.goto(url, { waitUntil: "load", timeout: 45_000 });
    }
    await dismissBanners(page);
    // Let hero videos / entrance animations settle before shooting.
    await page.waitForTimeout(settle);
    const path = join(OUT, `${slug}.png`);
    await page.screenshot({ path, type: "png" });
    console.log(`✓ ${slug}: saved ${path}`);
  } catch (err) {
    console.error(`✗ ${slug}: ${err.message}`);
  } finally {
    await page.close();
  }
}

// Optional slug filter: `npm run shots -- vector anthea` captures a subset.
const only = process.argv.slice(2);
const queue = only.length
  ? sites.filter((s) => only.includes(s.slug))
  : sites;

const browser = await chromium.launch();
await mkdir(OUT, { recursive: true });
// Sequential keeps memory/CPU sane and logs readable.
for (const site of queue) {
  await capture(browser, site);
}
await browser.close();
console.log("Done.");
