import puppeteer from "puppeteer";
import { setTimeout as sleep } from "node:timers/promises";

const URL = process.env.RENDER_URL || "http://localhost:5173/motion-graphics";
const OUT = process.env.RENDER_OUT || "motion-graphics.webm";
const WIDTH = Number(process.env.RENDER_WIDTH || 1920);
const HEIGHT = Number(process.env.RENDER_HEIGHT || 1080);
const RECORD_SECONDS = Number(process.env.RENDER_DURATION || 55);
const CHROME = process.env.PUPPETEER_EXECUTABLE_PATH
  || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

console.log(`[render] launching chromium ${WIDTH}x${HEIGHT} — ${CHROME}`);
const browser = await puppeteer.launch({
  headless: true,
  executablePath: CHROME,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--hide-scrollbars",
    "--font-render-hinting=none",
    "--disable-blink-features=AutomationControlled",
    `--window-size=${WIDTH},${HEIGHT}`,
  ],
  defaultViewport: { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 },
});

const page = await browser.newPage();
page.on("pageerror", (e) => console.error("[page error]", e.message));
page.on("console", (msg) => {
  if (msg.type() === "error") console.error("[console]", msg.text());
});

console.log(`[render] navigating to ${URL}`);
await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });

console.log("[render] waiting for fonts");
await page.evaluate(() => document.fonts.ready);
await page.waitForSelector("button");
await sleep(800);

// Hide the on-screen controls so they don't appear in the first/last frame.
await page.evaluate(() => {
  for (const b of document.querySelectorAll("button")) b.style.visibility = "hidden";
  for (const el of document.querySelectorAll("body *")) {
    if (el.textContent?.trim() === "Review") el.style.visibility = "hidden";
  }
});

console.log(`[render] starting screencast → ${OUT}`);
const recorder = await page.screencast({
  path: OUT,
  fps: 30,
});

// Tiny buffer of clean white before scene 1.
await sleep(400);

console.log("[render] clicking Play full video");
await page.evaluate(() => {
  const btns = Array.from(document.querySelectorAll("button"));
  // Re-show, click, re-hide so the click registers but pixels stay clean.
  for (const b of btns) b.style.visibility = "visible";
  const playBtn = btns.find((b) => b.textContent?.includes("Play full video"));
  if (!playBtn) throw new Error("Play full video button not found");
  playBtn.click();
  for (const b of btns) b.style.visibility = "hidden";
});

console.log(`[render] recording for ${RECORD_SECONDS}s`);
await sleep(RECORD_SECONDS * 1000);

console.log("[render] stopping screencast");
await recorder.stop();

await browser.close();
console.log(`[render] done → ${OUT}`);
