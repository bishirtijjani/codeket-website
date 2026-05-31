// Render the /motion-graphics route to an H.264 mp4.
//
//   1. Launch headless Chromium at the requested viewport.
//   2. Navigate to /motion-graphics?render=1 (hides on-screen controls).
//   3. Wait for fonts, start page.screencast() -> webm.
//   4. Trigger window.__playMotion(), record for RENDER_DURATION seconds.
//   5. Transcode webm -> mp4 with ffmpeg, delete the temp webm.
//
// Env knobs: RENDER_URL, RENDER_OUT, RENDER_WIDTH, RENDER_HEIGHT,
//            RENDER_DURATION, PUPPETEER_EXECUTABLE_PATH.

import { spawn } from "node:child_process";
import { unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const WIDTH = Number(process.env.RENDER_WIDTH || 1920);
const HEIGHT = Number(process.env.RENDER_HEIGHT || 1080);
const OUT = process.env.RENDER_OUT || "motion-graphics.mp4";
const DURATION = Number(process.env.RENDER_DURATION || 60);
const URL =
  process.env.RENDER_URL ||
  "http://localhost:5173/motion-graphics?render=1";

const EXEC_CANDIDATES = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
].filter(Boolean);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function resolveExecutable() {
  for (const c of EXEC_CANDIDATES) if (existsSync(c)) return c;
  // last resort: glob common playwright location
  return EXEC_CANDIDATES[EXEC_CANDIDATES.length - 1];
}

async function loadPuppeteer() {
  try {
    return (await import("puppeteer")).default;
  } catch {
    return (await import("puppeteer-core")).default;
  }
}

async function transcode(webm, out) {
  await new Promise((resolve, reject) => {
    const ff = spawn(
      "ffmpeg",
      [
        "-y",
        "-i",
        webm,
        "-c:v",
        "libx264",
        "-preset",
        "slow",
        "-crf",
        "18",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        out,
      ],
      { stdio: "inherit" }
    );
    ff.on("error", reject);
    ff.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error("ffmpeg exited " + code))
    );
  });
}

async function main() {
  const puppeteer = await loadPuppeteer();
  const executablePath = resolveExecutable();
  console.log(`[render] ${WIDTH}x${HEIGHT} -> ${OUT}`);
  console.log(`[render] chromium: ${executablePath}`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      "--force-color-profile=srgb",
      `--window-size=${WIDTH},${HEIGHT}`,
    ],
    defaultViewport: { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 },
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  await sleep(600);

  const webm = path.resolve(`._mg_${WIDTH}x${HEIGHT}_${Date.now()}.webm`);
  const recorder = await page.screencast({ path: webm, fps: 30 });

  await page.evaluate(() => {
    if (typeof window.__playMotion === "function") window.__playMotion();
  });

  await sleep(DURATION * 1000);
  await recorder.stop();
  await browser.close();

  console.log("[render] transcoding to mp4…");
  await transcode(webm, OUT);
  await unlink(webm).catch(() => {});
  console.log(`[render] done -> ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
