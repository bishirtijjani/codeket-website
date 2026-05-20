# Motion-Video Bible

Reference manual for building / iterating on codeket motion-graphics videos.
Hand this to Claude at the start of a new session and it should be able to
ship a clean, on-brand video on the first pass.

---

## 0. What you're building

A short brand video (~45–55s) that runs in the browser, is screen-recorded
headlessly via Puppeteer, then transcoded to H.264 mp4 with ffmpeg. Two
exports from the same codebase: landscape **1920×1080** for desktop and
portrait **1080×1920** for Reels / Stories / WhatsApp Status. Same scenes,
same copy, same animations — only Scene 3 changes layout.

The codebase is the codeket marketing site (`codeket-website`). The video
lives at `/motion-graphics` and renders in a regular React route.

---

## 1. Tech stack — locked

| Layer | Choice |
|---|---|
| Framework | React (vite-react-ssg) + Vite + Tailwind |
| Animation | **Web Animations API** (`el.animate()`). No framer-motion, GSAP, or react-spring. |
| Icons | `lucide-react` |
| Headless browser | Puppeteer driving Chromium at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` |
| Capture | `page.screencast()` → webm (Chrome native, only format it emits) |
| Encode | `ffmpeg` → H.264 mp4, `libx264 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart` |
| Frame rate | 30 fps |

Why Web Animations API: keyframes + `.finished` Promise compose cleanly
with `async/await`, no extra dep, deterministic for the headless render.
Resist the urge to bring in framer-motion — it makes orchestration harder,
not easier.

---

## 2. File layout

```
src/pages/MotionGraphics/
├── index.jsx              ← orchestrator: scene list, play/replay, scene picker UI
├── animUtils.js           ← brand colors, animate/wait/nextFrame/cancelAnims/countUp, useIsPortrait
├── Scene1.jsx             ← "This is codeket" title
├── Scene2.jsx             ← belief statements (cycling)
├── Scene3.jsx             ← products grid (landscape: side-by-side / portrait: stacked)
├── Scene3Mockups.jsx      ← Phone / AINetwork / EnterpriseDashboard / AnalyticsChart
├── Scene4.jsx             ← value-prop reveals (icon + headline + sub)
├── Scene5.jsx             ← promise ("If you can think it…")
├── Scene6.jsx             ← logo sign-off
└── Scene7.jsx             ← big URL + "VISIT US" CTA

scripts/render-motion-graphics.mjs  ← Puppeteer + ffmpeg render pipeline
```

Public assets used: `/public/images/logo.png`, `/public/images/ims.gif`.

---

## 3. Brand system

### 3.1 Colors (exported from `animUtils.js`)

| Name | Hex | Use |
|---|---|---|
| `NAVY` | `#0B1628` | Default text color, everywhere |
| `NAVY_DEEP` | `#0F4C81` | Button hover only |
| `ORANGE` | `#C2410C` | The accent — punchlines, periods, one-word emphasis, ".com", icons in Scene 4 |
| `ORANGE_LIGHT` | `#EA580C` | Reserved (not currently in scene copy) |
| `NAVY_MUTED` | `rgba(11, 22, 40, 0.55)` | Subdued small text (axis labels, ghost copy) |
| Background | `#FFFFFF` white | Always |

**The orange period pattern.** Most short statements end with an orange
"." appended as a separate `<span>` — even when the text itself doesn't
include one in the array. Look at Scene 2: `{text}<span style={{color:ORANGE}}>.</span>`.

**The single-word accent pattern.** When a phrase has a punchline word,
that word is orange while the rest stays navy. See Scene 5 ("For your
**business**.") and Scene 1 ("This is **codeket**").

### 3.2 Fonts

- `font-display` — display sans, used for every headline (weight 800–900)
- `font-sans` — body sans, used for taglines / labels / small caps
- Letter-spacing: **-0.025em to -0.03em** on display text (tight)
- Line-height: **1 to 1.05** on display text
- Letter-spacing: **0.18em to 0.32em** + uppercase on small label text

The `font-display` and `font-sans` classes are provided by the
codeket-website Tailwind config — don't pick fonts from scratch in a new
session, use whatever the project provides.

---

## 4. Type scale (the actual `fontSize` values used)

Always `clamp(min, vw-based, max)` — scales cleanly between landscape and
portrait viewports without conditional code.

| Role | Value | Used in |
|---|---|---|
| Mega title | `clamp(3.5rem, 9vw, 10rem)` | Scene 1 ("This is codeket") |
| Statement large | `clamp(2.4rem, 5.6vw, 7rem)` | Scene 2 cycling beliefs |
| Promise large | `clamp(2.4rem, 5.8vw, 7.2rem)` | Scene 5 cycling promise |
| Stat headline | `clamp(3.5rem, 6.5vw, 9rem)` | Scene 4 value-prop headline |
| URL hero | `clamp(2.4rem, 7vw, 8.4rem)` | Scene 7 www.codeket.com |
| Service label (landscape) | `clamp(1.9rem, 3.6vw, 4.8rem)` | Scene 3 left column |
| Service label (portrait) | `clamp(2.2rem, 7.6vw, 5rem)` | Scene 3 stacked top |
| Sign-off tagline | `clamp(1.4rem, 2.8vw, 3.4rem)` | Scene 6 "Build with codeket" |
| Body sub | `clamp(0.95rem, 1.4vw, 1.7rem)` | Scene 4 sub-copy, Scene 7 "VISIT US" |
| Small URL | `clamp(0.9rem, 1.15vw, 1.4rem)` | Scene 6 footer-style URL |

Container widths to pair with these:

| Role | Width |
|---|---|
| Centered statement | `min(86vw, 1400px)` |
| Logo (Scene 1) | `min(48vw, 820px)` |
| Logo (Scene 6) | `min(42vw, 720px)` |
| Sub-copy max | `min(60vw, 860px)` |

---

## 5. Animation system

### 5.1 Helpers (`animUtils.js`)

```js
animate(el, keyframes, options)   // returns the .finished Promise; sets fill: "forwards"
wait(ms)                          // Promise-based sleep
nextFrame()                       // double-rAF — wait for layout to settle
cancelAnims(...els)               // kill any in-flight animations on these elements
countUp(el, target, ms, {prefix, suffix, separator})  // animated number → text
useIsPortrait()                    // SSR-safe orientation hook
```

Every scene follows the same skeleton:

```jsx
useEffect(() => {
  if (!playToken) return;
  let cancelled = false;
  const run = async () => {
    // 1. cancel any leftover anims + reset element styles to "off-screen"
    // 2. await nextFrame()  — let the reset paint
    // 3. await animate(...) / wait(...) sequence
    // 4. if (cancelled) return; (check after every await)
    // 5. onComplete?.()
  };
  run();
  return () => { cancelled = true; };
}, [playToken, onComplete /*, isPortrait if used */]);
```

The orchestrator (`index.jsx`) bumps `playToken` to trigger replay and
advances `sceneIndex` when a scene calls `onComplete`.

### 5.2 Easing curves (use these exact strings)

| Use | Curve |
|---|---|
| Confident text/icon enter | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Bouncy image drop-in | `cubic-bezier(0.22, 1.1, 0.36, 1)` |
| Quick exit | `cubic-bezier(0.7, 0, 0.84, 0)` |
| Soft last-beat exit | `ease-in` |
| Count-up easing | out-cubic `1 - (1-t)³` (inside `countUp`) |

### 5.3 Entry / exit patterns (lifted from the existing scenes)

**Fade-in with blur** (centered headlines):
```
from: { opacity: 0, filter: "blur(18-20px)", transform: "translate(-50%, -50%) scale(0.94-0.97)" }
to:   { opacity: 1, filter: "blur(0px)",     transform: "translate(-50%, -50%) scale(1)" }
duration: 380-560 ms, easing: cubic-bezier(0.16, 1, 0.3, 1)
```

**Slide in from left** (landscape service labels):
```
from: { opacity: 0, transform: "translateX(-40px)" }
to:   { opacity: 1, transform: "translateX(0)" }
duration: 420 ms
```

**Slide in from top** (portrait service labels):
```
from: { opacity: 0, transform: "translateY(-26px)" }
to:   { opacity: 1, transform: "translateY(0)" }
duration: 420 ms
```

**Drop from below with tilt** (mockup cards):
```
from: { opacity: 0, transform: "translateY(110%) rotate(±2.5deg)" }
to:   { opacity: 1, transform: "translateY(0)    rotate(±2.5deg)" }
duration: 420-480 ms, easing: cubic-bezier(0.22, 1.1, 0.36, 1)
```
Tilt alternates `-2.5deg / +2.5deg` slide-to-slide for variety.

**Exit upward** (mockup cards):
```
from: { transform: "translateY(0)    rotate(±2.5deg)", opacity: 1 }
to:   { transform: "translateY(-110%) rotate(±2.5deg)", opacity: 0 }
duration: 280-320 ms, easing: cubic-bezier(0.7, 0, 0.84, 0)
```

**Fade-out with blur expand** (cycling headlines, non-final beat):
```
from: { opacity: 1, filter: "blur(0px)",  transform: "translate(-50%,-50%) scale(1)" }
to:   { opacity: 0, filter: "blur(16px)", transform: "translate(-50%,-50%) scale(1.03)" }
duration: 280-300 ms
```

### 5.4 Timing budgets

| Beat | Duration |
|---|---|
| Enter fade | 380–560 ms |
| Exit fade | 280–480 ms |
| Hold (intermediate beat) | 950–1100 ms |
| Hold (final beat in a sequence) | 1700–2800 ms |
| Image-after-text delay | 80 ms |
| Gap between sequential slides | 80 ms |
| Total video target | 45–55 seconds |

For a sequential slide sequence (like Scene 3), the rule is:

```
START_OFFSET = IMG_DELAY + ENTER_MS + HOLD_MS + EXIT_MS + SLIDE_GAP
```

i.e. **start the next slide only AFTER the previous one is fully gone**.
We learned this the painful way — earlier the START_OFFSET was less than
the slide duration, so titles overlapped in the same screen position and
the whole thing felt broken.

---

## 6. Layout rules (the gotchas, in priority order)

1. **Never use `whitespace-nowrap` / `whiteSpace: "nowrap"` on multi-word
   headlines.** It cause edge overflow when vw scales up on big displays
   or narrow viewports. Let text wrap; control width with `min(Xvw, Ypx)`.
2. **All fontSize uses `clamp()`** with a vw-based middle term. Never use
   raw `vw` alone (no upper bound) or raw `rem` alone (doesn't scale).
3. **All container widths use `min(Xvw, Ypx)`.** Same reason.
4. **For sequential text in the same position, never overlap.** Previous
   item must finish exit before next item starts entering.
5. **Match container aspect ratio to content.** Don't force a desktop
   screenshot into a portrait box with `objectFit: cover` — it crops.
   Either size the frame to the image's natural aspect, or use
   `objectFit: contain` with appropriate background. We use per-content
   frame aspect ratios in `Scene3.jsx` (`FRAMES_LANDSCAPE` / `FRAMES_PORTRAIT`).
6. **Width sanity check for text.** Approx rule: `chars × 0.55 × fontSize_px`
   ≤ container width. If it exceeds, either reduce fontSize, widen the
   container, or accept a wrap.
7. **Center horizontally and vertically with translate.** Standard pattern:
   `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)`.
   Animate other transforms on top by composing them inside the
   `translate(-50%, -50%) ...` string.

---

## 7. Orientation handling

Single codebase serves both landscape and portrait. Orientation is
detected at runtime by `useIsPortrait()`. **Only Scene 3** has a
branching layout — the rest use `vw/vh` + `clamp()` and auto-scale.

```js
// animUtils.js
export const useIsPortrait = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  useEffect(() => {
    const check = () => setIsPortrait(window.innerHeight > window.innerWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isPortrait;
};
```

**Scene 3 layout matrix:**

|  | Landscape (1920×1080) | Portrait (1080×1920) |
|---|---|---|
| Layout | `flex row`, title left / image right | `flex column`, title top / image bottom |
| Title width | `28vw` | `100%` (centered text) |
| Title fontSize | `clamp(1.9rem, 3.6vw, 4.8rem)` | `clamp(2.2rem, 7.6vw, 5rem)` |
| Title enter | from `translateX(-40px)` | from `translateY(-26px)` |
| Frame widths | desktopWide 52vw / desktop 50vw / panel 32vw / phone 15vw | 88vw / 86vw / 70vw / 44vw |
| Padding | `5vw / 6vw` LR | `6vw / 6vw` LR, `7vh / 7vh` TB |

**Frame `kind` per service:**

| Service | Kind | Aspect |
|---|---|---|
| Inventory Systems | `desktopWide` | `1587 / 772` (matches ims.gif) |
| AI Automation | `panel` | `1 / 1` |
| Mobile Apps | `phone` | `9 / 19` |
| Enterprise Software | `desktop` | `16 / 9` |
| Data Analytics | `desktop` | `16 / 9` |

When adding a new service, pick a kind from this taxonomy and the rest
falls out automatically in both orientations.

---

## 7.5 Build once, render twice (the actual workflow)

This is the headline insight from how we shipped both videos. **Don't
build two videos. Build one responsive video and render it at two
viewport sizes.** Mobile cost us one new hook and a layout branch in
exactly one scene.

### The order of operations

1. **Build landscape (1920×1080) first, as if mobile didn't exist.**
   It's the primary deliverable, the easiest to design for, and the one
   the user will review most. Don't burn cycles on portrait until the
   landscape pass is locked.
2. **Use `clamp(min, vw, max)` for every fontSize and `min(vw, px)`
   for every width from day one** — even when you're only thinking about
   1920×1080. This is the secret: those units already reflow to *any*
   viewport, so when you flip to portrait later, 80% of the work is
   already done.
3. **Lock landscape.** Iterate copy, timing, animations, mockups until
   the user signs off. Don't touch layout structure after this.
4. **Add `useIsPortrait()` to `animUtils.js`** (one hook, SSR-safe).
5. **Render in portrait viewport (1080×1920) and watch what breaks.**
   In our case: literally only Scene 3, because its layout was
   structurally side-by-side. Everything else just reflowed via
   `clamp()/vw/vh`.
6. **Branch the broken scene by orientation, not the whole codebase.**
   Two style objects (landscape / portrait), one set of refs, one
   animation effect that picks the right "from" transform. No
   duplicate components, no parallel scene tree.
7. **Add the second npm script with different env vars.** Same render
   pipeline, just `RENDER_WIDTH=1080 RENDER_HEIGHT=1920 RENDER_OUT=...mp4`.

### Why this works

`page.screencast()` records whatever Chrome paints in the viewport. If
the page reflows correctly at 1080×1920, the recording is correct at
1080×1920. There is no "mobile video pipeline" — there's one pipeline
and a viewport argument.

### What earns the "almost free" mobile version

If you cut any of these corners during the landscape build, mobile will
cost you a full second pass:

- ✅ **`clamp(min, vw, max)` for every fontSize.** No raw `rem`, no raw `vw`.
  Raw `rem` doesn't shrink for narrow viewports; raw `vw` has no upper
  bound on huge ones.
- ✅ **`min(vw, px)` for every fixed width.** Same reason.
- ✅ **Center with `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)`**
  for hero elements. Percentage-based positioning means it stays centered
  at any aspect ratio.
- ✅ **`vh` for vertical padding when the layout is vertically stacked.**
  Don't hard-code `top: "120px"`; use `top: "12vh"` or % values.
- ✅ **No `whitespace-nowrap`** on multi-word text. Wrapping is the
  feature that saves portrait.
- ✅ **`maxWidth: min(60vw, 860px)`** on sub-copy and tagline blocks so
  they wrap before they hit the screen edge.

### What requires an explicit portrait branch

Anything where the structure (not the size) of the layout differs:

| Pattern | Branch required? |
|---|---|
| Centered headline that scales | No — `clamp + vw` handles it |
| Stacked column of items | No — already flow-friendly |
| Grid that's 4-up on desktop, 1-up on mobile | Yes, but usually CSS grid + `auto-fit` handles it without JS |
| Side-by-side (title-left / image-right) | **Yes** — needs to become stacked (title-top / image-bottom) |
| Diagonal / absolute-positioned compositions | Yes — recalculate positions per orientation |
| Animation direction tied to layout (slide from left only makes sense in row layout) | Yes — pick the entry vector to match the new arrangement |

In this video, only **Scene 3** hit that list. Everything else
auto-survived.

### Concrete cost summary

| Effort | What it took |
|---|---|
| New code for mobile | ~15 lines: `useIsPortrait` hook (10), three ternaries in Scene 3 style objects (5) |
| Refactored existing scenes | Zero. None changed. |
| New render command | One line in `package.json` |
| Re-render time | ~60 seconds (single screencast pass) |

That's the bar. If a future video costs more than this to take mobile,
something was built non-responsively earlier — go fix the cause, don't
duplicate the scenes.

### Deliverable rule

A "make a video" request is **not done until both mp4s exist** —
landscape and portrait. Don't ship one and call it complete; the second
one is cheap and the user expects both.

---

## 8. Scene catalog (current, in order)

| # | Label | What | Approx duration |
|---|---|---|---|
| 1 | Title | "This is **codeket**" — 3-stage reveal (THIS → is → codeket logo replaces text) | ~3 s |
| 2 | Belief | Three cycling navy statements ending orange period: *Software should feel obvious.* / *Setup should take days, not months.* / *Real problems deserve real solutions.* | ~6 s |
| 3 | Products | Five sequential service slides: Inventory Systems / AI Automation / Mobile Apps / Enterprise Software / Data Analytics. Label + mockup with ±2.5° tilt | ~10 s |
| 4 | Numbers | Four value-prop reveals — icon (lucide) + headline + sub: *Fast Delivery* / *Amazing Support* / *Expert Dev Team* / *AI-Powered* | ~10 s |
| 5 | Promise | Three cycling beats: *If you can think it* / *we can build it.* / *For your* **business**. | ~6 s |
| 6 | Sign-off | Logo center + tagline "Build with codeket" (last word orange) + small "codeket.com" uppercase | ~6 s |
| 7 | Visit | Big "www.codeket**.com**" (.com orange) + "VISIT US" uppercase tagline below. Holds ~2.8s | ~4 s |

Total: ~45 s.

---

## 9. Copy & tone rules

These are the rules the user enforced through iteration. Honor them
without being asked.

### 9.1 Plain English, no jargon

**Don't use:** operators, founders, ship, launch, leverage, synergy,
stakeholder, outsourcing, bloat, ecosystem, holistic, scale, in-house,
B2B, SaaS, paradigm, end-to-end, vertical, low-code, no-code, MVP.

**Audience:** restaurant owners, school administrators, inventory shop
owners, ops managers — non-tech business people. Write so a smart 16-year-old
who's never built software gets it on the first read.

### 9.2 Structures that work

- **3-beat narrative** for cycling text: build → build → payoff
  (last beat has the orange word). Example: "If you can think it /
  we can build it / For your **business**."
- **Stair phrases** that complete a thought across beats, with the orange
  punchline as the resolution.
- **Direct second-person address** ("You bring the idea") over passive
  third-person ("Businesses bring ideas").
- **Imperative + outcome** for CTAs ("Visit us" > "Click here" > "Learn more").

### 9.3 Service labels

- 2–3 word noun phrases, title case: "Inventory Systems", "AI Automation",
  "Mobile Apps", "Enterprise Software", "Data Analytics".
- No verbs, no marketing adjectives ("Best-in-class…", "Cutting-edge…").

### 9.4 Stat headlines

- 2–3 word noun phrase, title case, optional hyphen: "Fast Delivery",
  "Amazing Support", "Expert Dev Team", "AI-Powered".
- One sentence sub (period-terminated), human voice, no claims you can't
  defend: "Real humans, every step of the way."

### 9.5 URL formatting

- The big closing URL is `www.codeket.com` with **.com** in orange.
- The small footer URL is `codeket.com` (no www) uppercase, navy.

---

## 10. Mockup conventions (`Scene3Mockups.jsx`)

Each mockup is a self-contained component that fills 100% of its parent
container (no internal padding leaking; the parent decides the frame).

Color palette inside mockups — only these:

| Element | Color |
|---|---|
| Dark surface (phone bg, network bg) | `#0F172A` |
| Light surface (dashboard bg) | `#F1F5F9` |
| Lighter light surface | `#F8FAFC` |
| Primary text/UI | `NAVY` |
| Highlight / active state | `ORANGE` |
| Card variant colors (phone apps only) | `#1E3A5F`, `#2D6A4F` |

The rule: **exactly one or two orange elements per mockup** — the
"active" thing (one neural path color, one selected bar, one trend line,
one accent KPI). Orange is the eye magnet, not decoration.

Mockup types:

- **PhoneMockup** — dark bg, 2×2 grid of brand-colored app tiles (IMS, AI, ERP, VTU).
- **AINetwork** — 3-3-3 fully-connected neural net in a 440×520 SVG viewBox. Orange "active" connections, NEURAL INFERENCE label top, Active dot bottom.
- **EnterpriseDashboard** — 14% navy sidebar, top bar, 3 KPI cards (one orange-accented), 6-bar chart with the 5th bar orange.
- **AnalyticsChart** — line chart with area-fill gradient, orange line, "+12% YoY ↑" pill badge top-right, big stat top-left.

When adding a new mockup, follow this template: navy/light surface, one
orange focal element, sized in clamp(min, vw, max) so it scales.

---

## 11. Render workflow

### 11.1 npm scripts (already in `package.json`)

```json
"render":        "node scripts/render-motion-graphics.mjs",
"render:mobile": "RENDER_WIDTH=1080 RENDER_HEIGHT=1920 RENDER_OUT=motion-graphics-mobile.mp4 node scripts/render-motion-graphics.mjs"
```

### 11.2 End-to-end render commands

```bash
# Make sure the page builds
npm run build

# Start the dev server (the renderer hits localhost:5173/motion-graphics)
npm run dev &

# Wait until it's up
until curl -sf http://localhost:5173 > /dev/null; do sleep 0.5; done

# Desktop: 1920×1080 → motion-graphics.mp4
npm run render

# Mobile: 1080×1920 → motion-graphics-mobile.mp4
npm run render:mobile

# Stop dev
kill %1
```

### 11.3 What the script does

1. Launches headless Chromium with the right viewport.
2. Navigates to `/motion-graphics`, waits for `document.fonts.ready`.
3. Hides the on-screen "Review" / "Play full video" controls.
4. Starts `page.screencast({ path: <tmp>.webm, fps: 30 })`.
5. Clicks the play button.
6. `await sleep(60_000)` — records for 60 s by default
   (env var `RENDER_DURATION` overrides).
7. Stops screencast, closes browser.
8. Transcodes webm → mp4 via ffmpeg:
   `-c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart`
9. Deletes the temp webm.

### 11.4 Env knobs

| Var | Default | Use |
|---|---|---|
| `RENDER_URL` | `http://localhost:5173/motion-graphics` | Override host/port/path |
| `RENDER_OUT` | `motion-graphics.mp4` | Output filename |
| `RENDER_WIDTH` | `1920` | Viewport width |
| `RENDER_HEIGHT` | `1080` | Viewport height |
| `RENDER_DURATION` | `60` (seconds) | Recording window |
| `PUPPETEER_EXECUTABLE_PATH` | `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` | Chromium binary |

### 11.5 Output format — always mp4

Chrome's `page.screencast()` only emits webm. **Always transcode to mp4
before delivering.** The user explicitly does not want webm files.

---

## 12. Pre-flight checklist (before every render)

1. ☐ `npm run build` returns clean (catches type/syntax errors that wouldn't show in dev)
2. ☐ No `whitespace-nowrap` on any multi-word headline
3. ☐ Every `fontSize` is `clamp(...)`, every fixed width is `min(...)`
4. ☐ Approx text-width fits its container at both 1920w and 1080w viewports
5. ☐ Every cycling/sequential scene's `START_OFFSET ≥` slide total duration + small gap
6. ☐ Every scene calls `onComplete?.()` at the end of its `run()`
7. ☐ Every scene cancels in-flight anims and resets element styles before re-entering
8. ☐ Orange period / single-word accent applied where the pattern fits
9. ☐ Copy passes the no-jargon list (§9.1)
10. ☐ Both desktop and mobile rendered if either layout was touched
11. ☐ Final output is `.mp4`, not `.webm`

---

## 13. Working with the user

Things the user cared about (learned through this build):

- **Direct, no fluff.** Skip filler ("Great question!", "Let me…"). Just
  do or report.
- **Reference scenes by content, not number.** Don't say "fix Scene 5";
  say "fix the 'Built for operators' beat" or describe what it does.
  The user is not memorizing scene numbers.
- **AskUserQuestion for copy choices** — present 3–4 plain-English options
  in concrete form, never abstract ("Direction A: concise, modern"). Show
  the actual words. Skip aggressive "(Recommended)" on every option.
- **Don't deliver webm.** Always mp4.
- **Captions on file deliveries are short.** One or two sentences max.
  State what changed and what the user should look at.
- **Don't ask permission for routine work.** Render, commit, push on the
  designated branch without checking each time — the user expects an
  end-to-end delivery.
- **Plain-language pushback is valid feedback.** When the user says
  "this looks broken" or "make it less jargon-y", trust it and ship
  a real fix, not a defense.

Tone we converged on: confident operator, not consultant.

---

## 14. Decision log (the WHYs)

These are the choices we made by feel/iteration, not from a brief. If
you're tempted to undo one, read the reason first.

| Decision | Why |
|---|---|
| Web Animations API instead of framer-motion | Composable with async/await, no extra dep, deterministic in headless render. Framer's declarative model made orchestrating 6+ scenes harder. |
| White background, navy + single orange accent | Codeket brand colors. White makes the screen-recording feel like UI, not video — matches the "software shown clearly" tone. |
| Orange period at end of statements | Visual punctuation. Makes each beat feel decided, like a closing breath. Cheap, distinctive, on-brand. |
| Per-content frame aspect ratios in Scene 3 | A 30vw × 60vh portrait frame cropped the desktop GIF (2.06:1) and squashed the 16:9 dashboards. Matching the frame to the content's native shape removes the crop entirely. |
| Fully sequential timing in Scene 3 (not cross-fade) | Cycling titles sit in the same screen position. Cross-fading meant two titles were visible at once on top of each other — read as "broken". |
| Sign-off split across Scene 6 and Scene 7 | Scene 6 is the emotional close (logo + tagline). Scene 7 is the call-to-action (big URL + "VISIT US"). Separating them lets the CTA hold longer without diluting the logo moment. |
| Plain-English promise ("If you can think it…") | Earlier copy ("Built for operators / founders / growing businesses") used B2B jargon the actual audience (shop owners, school admins) doesn't speak. Plain language widens the audience instantly. |
| Single useIsPortrait hook, only Scene 3 branches | Other scenes used `vw / vh / clamp()` from day one, so they reflow automatically. Only Scene 3's side-by-side layout breaks in portrait. Less branching = less to keep in sync. |
| Bumped record duration from 55 s → 60 s when adding Scene 7 | Cheap insurance against truncation. We over-record and let the final frame hold on white; we never want the recorder to cut Scene 7 mid-animation. |

---

## 15. Adding new things

### A new scene
1. Create `SceneN.jsx`, follow the §5.1 skeleton.
2. Use the brand colors from `animUtils.js`, type scale from §4, easing
   from §5.2, patterns from §5.3.
3. Call `onComplete?.()` at the end.
4. Import and append to the `SCENES` array in `index.jsx` — the
   orchestrator chains automatically (`if (chaining && sceneIndex < SCENES.length)`).

### A new service in Scene 3
1. Add to the `SERVICES` array in `Scene3.jsx` with a `kind` from §7's
   taxonomy (or add a new kind if the aspect doesn't fit).
2. If new aspect: add entries to `FRAMES_LANDSCAPE` and `FRAMES_PORTRAIT`.
3. Alternate `tilt` to keep the slide-to-slide rhythm (`-2.5 / +2.5 / -2.5 …`).
4. If using a screenshot/gif, drop it at `/public/images/<name>.<ext>` and
   reference via `imgSrc`. If a JSX mockup, build it in `Scene3Mockups.jsx`
   following §10.

### A new value prop in Scene 4
Add to the `PROPS` array — `Icon` (lucide), `headline` (2–3 word title
case), `sub` (one period-terminated sentence).

### A new brand color
Don't. The system is two colors (navy + orange) plus white. Resist the
urge to add a "secondary accent" — it dilutes the orange.

---

## 16. Deliverables checklist for a "make a video" request

For a fresh request, the bar is:

- ☐ `motion-graphics.mp4` (1920×1080, ~45–55s, H.264)
- ☐ `motion-graphics-mobile.mp4` (1080×1920, same content, Scene 3 stacked)
- ☐ Committed on the working branch with a descriptive commit message
- ☐ Pushed
- ☐ Delivered to the user with a 1–2 sentence caption

That's the finish line. Anything less is a partial delivery.
