import { chromium } from "playwright";

const URL = process.argv[2] || "http://localhost:3000/audit/19wq08khs5uc";
const OUT_DIR = process.argv[3] || "./screenshots";

const browser = await chromium.launch();

// Desktop screenshot
const desktopCtx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const desktopPage = await desktopCtx.newPage();
await desktopPage.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
// Wait for Convex data to load (loading spinner to disappear)
await desktopPage.waitForTimeout(3000);
// Scroll to bottom to trigger all whileInView animations
await desktopPage.evaluate(async () => {
  const delay = (ms) => new Promise(r => setTimeout(r, ms));
  for (let i = 0; i < document.body.scrollHeight; i += 400) {
    window.scrollTo(0, i);
    await delay(100);
  }
  window.scrollTo(0, 0);
  await delay(500);
});
await desktopPage.screenshot({ path: `${OUT_DIR}/teaser-desktop-full.png`, fullPage: true });
await desktopPage.screenshot({ path: `${OUT_DIR}/teaser-desktop-above-fold.png` });

// Mobile screenshot
const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mobilePage = await mobileCtx.newPage();
await mobilePage.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
await mobilePage.waitForTimeout(3000);
await mobilePage.evaluate(async () => {
  const delay = (ms) => new Promise(r => setTimeout(r, ms));
  for (let i = 0; i < document.body.scrollHeight; i += 400) {
    window.scrollTo(0, i);
    await delay(100);
  }
  window.scrollTo(0, 0);
  await delay(500);
});
await mobilePage.screenshot({ path: `${OUT_DIR}/teaser-mobile-full.png`, fullPage: true });
await mobilePage.screenshot({ path: `${OUT_DIR}/teaser-mobile-above-fold.png` });

await browser.close();
console.log("Screenshots saved to", OUT_DIR);
