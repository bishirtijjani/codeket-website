// Render the /motion-graphics route to an H.264 mp4.
//
// Capture strategy: drive Chromium over CDP `Page.startScreencast`, which
// streams PNG frames directly from the browser (no ffmpeg on the capture
// side). Frames are written to a temp dir with their compositor timestamps;
// afterwards an H.264-capable ffmpeg assembles them into a constant-30fps
// mp4 via the concat demuxer (durations derived from the timestamps so the
// real animation timing is preserved).
//
// Why not page.screencast(): puppeteer's built-in screencast spawns its own
// ffmpeg to mux a webm, and the only ffmpeg on PATH in this sandbox is a
// stripped Playwright build that crashes immediately ("Cannot call write
// after a stream was destroyed"). CDP screencast avoids that dependency.
//
// Env knobs: RENDER_URL, RENDER_OUT, RENDER_WIDTH, RENDER_HEIGHT,
//            RENDER_DURATION, PUPPETEER_EXECUTABLE_PATH, FFMPEG_PATH.

import { spawn } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const WIDTH = Number(process.env.RENDER_WIDTH || 1920);
const HEIGHT = Number(process.env.RENDER_HEIGHT || 1080);
const OUT = process.env.RENDER_OUT || "motion-graphics.mp4";
const DURATION = Number(process.env.RENDER_DURATION || 60);
const FPS = 30;
const URL =
  process.env.RENDER_URL || "http://localhost:5173/motion-graphics?render=1";

const EXEC_CANDIDATES = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
].filter(Boolean);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function resolveExecutable() {
  for (const c of EXEC_CANDIDATES) if (existsSync(c)) return c;
  return EXEC_CANDIDATES[EXEC_CANDIDATES.length - 1];
}

async function loadPuppeteer() {
  try {
    return (await import("puppeteer")).default;
  } catch {
    return (await import("puppeteer-core")).default;
  }
}

// Resolve an H.264-capable ffmpeg. The ffmpeg on PATH in some sandboxes is a
// stripped Playwright build (VP8/webm only); prefer the @ffmpeg-installer
// binary which ships libx264 + the mp4 muxer.
async function resolveFfmpeg() {
  if (process.env.FFMPEG_PATH && existsSync(process.env.FFMPEG_PATH)) {
    return process.env.FFMPEG_PATH;
  }
  try {
    const mod = await import("@ffmpeg-installer/ffmpeg");
    const p = mod.default?.path || mod.path;
    if (p && existsSync(p)) return p;
  } catch {
    // fall back to PATH
  }
  return "ffmpeg";
}

function encode(ffmpegBin, listFile, out) {
  return new Promise((resolve, reject) => {
    const ff = spawn(
      ffmpegBin,
      [
        "-y",
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        listFile,
        "-vsync",
        "vfr",
        "-r",
        String(FPS),
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
      { stdio: ["ignore", "inherit", "inherit"] }
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
    pipe: false, // force WebSocket transport; pipe hangs on this Chromium
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      "--force-color-profile=srgb",
      "--remote-debugging-port=0",
      `--window-size=${WIDTH},${HEIGHT}`,
    ],
    defaultViewport: { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 },
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
  // domcontentloaded, not networkidle0: the Vite HMR WebSocket keeps the
  // network busy forever, so networkidle0 never settles.
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  await sleep(800);

  const frameDir = mkdtempSync(path.join(tmpdir(), "mg-frames-"));
  const frames = []; // { file, t (seconds) }

  const client = await page.createCDPSession();
  client.on("Page.screencastFrame", async (evt) => {
    const { data, sessionId, metadata } = evt;
    const idx = frames.length;
    const file = path.join(frameDir, `f${String(idx).padStart(6, "0")}.png`);
    try {
      writeFileSync(file, Buffer.from(data, "base64"));
      const t =
        metadata && typeof metadata.timestamp === "number"
          ? metadata.timestamp
          : Date.now() / 1000;
      frames.push({ file, t });
    } catch {
      /* ignore a dropped frame */
    }
    try {
      await client.send("Page.screencastFrameAck", { sessionId });
    } catch {
      /* session may be closing */
    }
  });

  await client.send("Page.startScreencast", {
    format: "png",
    everyNthFrame: 1,
    maxWidth: WIDTH,
    maxHeight: HEIGHT,
  });

  // Kick the animation once capture is live.
  await page.evaluate(() => {
    if (typeof window.__playMotion === "function") window.__playMotion();
  });

  await sleep(DURATION * 1000);

  try {
    await client.send("Page.stopScreencast");
  } catch {
    /* ignore */
  }
  await sleep(200);
  await browser.close();

  console.log(`[render] captured ${frames.length} frames`);
  if (frames.length === 0) {
    rmSync(frameDir, { recursive: true, force: true });
    throw new Error("no frames captured");
  }

  // Build a concat list with per-frame durations from the timestamps.
  const t0 = frames[0].t;
  const lines = [];
  for (let i = 0; i < frames.length; i++) {
    lines.push(`file '${frames[i].file}'`);
    let dur;
    if (i < frames.length - 1) {
      dur = frames[i + 1].t - frames[i].t;
    } else {
      dur = 1 / FPS;
    }
    if (!(dur > 0) || dur > 5) dur = 1 / FPS; // guard against clock glitches
    lines.push(`duration ${dur.toFixed(4)}`);
  }
  // concat demuxer needs the final file repeated to honor its duration
  lines.push(`file '${frames[frames.length - 1].file}'`);
  const listFile = path.join(frameDir, "list.txt");
  writeFileSync(listFile, lines.join("\n"));
  const span = (frames[frames.length - 1].t - t0).toFixed(2);
  console.log(`[render] capture span ${span}s`);

  const ffmpegBin = await resolveFfmpeg();
  console.log(`[render] ffmpeg: ${ffmpegBin}`);
  console.log("[render] encoding mp4…");
  await encode(ffmpegBin, listFile, OUT);

  rmSync(frameDir, { recursive: true, force: true });
  console.log(`[render] done -> ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
