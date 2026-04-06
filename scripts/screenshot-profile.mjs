import { chromium } from "playwright";

const URL = process.argv[2] || "http://localhost:3002/#about";
const OUT = process.argv[3] || "./screenshots/profile-current.png";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(2000);
// Scroll to about section
await page.evaluate(() => {
  document.querySelector("#about")?.scrollIntoView({ behavior: "instant", block: "start" });
});
await page.waitForTimeout(1500);

// Screenshot just the about section
const about = await page.$("#about");
if (about) {
  await about.screenshot({ path: OUT });
  console.log("About section screenshot saved:", OUT);
} else {
  await page.screenshot({ path: OUT, fullPage: false });
}

await browser.close();
