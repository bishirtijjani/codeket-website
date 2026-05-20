import { useEffect, useRef } from "react";
import { animate, wait, nextFrame, NAVY } from "./animUtils";
import {
  PhoneMockup,
  AINetwork,
  EnterpriseDashboard,
  AnalyticsChart,
} from "./Scene3Mockups";

// Per-service frame sizing — match the natural aspect of each piece of
// content so nothing gets cropped. Widths are tuned so the widest variant
// still leaves room for the 28vw text column on the left.
const FRAMES = {
  desktopWide: { width: "52vw", aspectRatio: "1587 / 772" }, // ims.gif native
  desktop:     { width: "50vw", aspectRatio: "16 / 9"      },
  panel:       { width: "32vw", aspectRatio: "1 / 1"       },
  phone:       { width: "15vw", aspectRatio: "9 / 19"      },
};

const SERVICES = [
  { label: "Inventory Systems",   imgSrc: "/images/ims.gif", Mockup: null,                tilt: -2.5, frame: FRAMES.desktopWide },
  { label: "AI Automation",       imgSrc: null,              Mockup: AINetwork,           tilt:  2.5, frame: FRAMES.panel       },
  { label: "Mobile Apps",         imgSrc: null,              Mockup: PhoneMockup,         tilt: -2.5, frame: FRAMES.phone       },
  { label: "Enterprise Software", imgSrc: null,              Mockup: EnterpriseDashboard, tilt:  2.5, frame: FRAMES.desktop     },
  { label: "Data Analytics",      imgSrc: null,              Mockup: AnalyticsChart,      tilt: -2.5, frame: FRAMES.desktop     },
];

// Timing (ms) — slides are fully sequential with an 80 ms gap so the
// previous title is fully gone before the next one fades in.
const ENTER_MS     = 420;
const HOLD_MS      = 1100;
const EXIT_MS      = 320;
const IMG_DELAY    = 80;
const SLIDE_GAP    = 80;
// Last frame the previous slide is on screen = IMG_DELAY + ENTER + HOLD + EXIT
const START_OFFSET = IMG_DELAY + ENTER_MS + HOLD_MS + EXIT_MS + SLIDE_GAP; // 2000

export default function Scene3({ playToken, onComplete }) {
  const textRefs  = useRef([]);
  const imageRefs = useRef([]);

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;

    const run = async () => {
      SERVICES.forEach((s, i) => {
        const txt = textRefs.current[i];
        const img = imageRefs.current[i];
        if (txt) {
          txt.getAnimations().forEach((a) => a.cancel());
          txt.style.opacity = "0";
          txt.style.transform = "translateX(-40px)";
        }
        if (img) {
          img.getAnimations().forEach((a) => a.cancel());
          img.style.opacity = "0";
          img.style.transform = `translateY(110%) rotate(${s.tilt}deg)`;
        }
      });

      await nextFrame();
      if (cancelled) return;

      const runSlide = async (i) => {
        const s   = SERVICES[i];
        const txt = textRefs.current[i];
        const img = imageRefs.current[i];
        if (!txt || !img) return;

        await wait(i * START_OFFSET);
        if (cancelled) return;

        animate(
          txt,
          [
            { opacity: 0, transform: "translateX(-40px)" },
            { opacity: 1, transform: "translateX(0)" },
          ],
          { duration: ENTER_MS, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
        );

        await wait(IMG_DELAY);
        if (cancelled) return;
        await animate(
          img,
          [
            { opacity: 0, transform: `translateY(110%) rotate(${s.tilt}deg)` },
            { opacity: 1, transform: `translateY(0) rotate(${s.tilt}deg)` },
          ],
          { duration: ENTER_MS, easing: "cubic-bezier(0.22, 1.1, 0.36, 1)" },
        );
        if (cancelled) return;

        await wait(HOLD_MS);
        if (cancelled) return;

        animate(
          txt,
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: EXIT_MS, easing: "ease-in" },
        );
        await animate(
          img,
          [
            { transform: `translateY(0) rotate(${s.tilt}deg)`, opacity: 1 },
            { transform: `translateY(-110%) rotate(${s.tilt}deg)`, opacity: 0 },
          ],
          { duration: EXIT_MS, easing: "cubic-bezier(0.7, 0, 0.84, 0)" },
        );
      };

      await Promise.all(SERVICES.map((_, i) => runSlide(i)));
      if (cancelled) return;

      onComplete?.();
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [playToken, onComplete]);

  return (
    <div className="absolute inset-0">
      {SERVICES.map((s, i) => {
        const Mockup = s.Mockup;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              paddingLeft: "5vw",
              paddingRight: "6vw",
              gap: "5vw",
            }}
          >
            {/* Bold label — left column */}
            <div
              ref={(el) => (textRefs.current[i] = el)}
              style={{
                width: "28vw",
                flexShrink: 0,
                opacity: 0,
                willChange: "transform, opacity",
              }}
            >
              <div
                className="font-display"
                style={{
                  color: NAVY,
                  fontWeight: 900,
                  fontSize: "clamp(1.9rem, 3.6vw, 4.8rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                {s.label}
              </div>
            </div>

            {/* Image area — flex-centers the mockup at its natural aspect */}
            <div
              style={{
                flex: 1,
                height: "65vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 0,
              }}
            >
              <div
                ref={(el) => (imageRefs.current[i] = el)}
                style={{
                  ...s.frame,
                  maxHeight: "65vh",
                  maxWidth: "100%",
                  borderRadius: "16px",
                  boxShadow:
                    "0 24px 64px rgba(11,22,40,0.20), 0 4px 16px rgba(11,22,40,0.08)",
                  overflow: "hidden",
                  transform: `translateY(110%) rotate(${s.tilt}deg)`,
                  opacity: 0,
                  willChange: "transform, opacity",
                  backgroundColor: "#fff",
                }}
              >
                {s.imgSrc ? (
                  <img
                    src={s.imgSrc}
                    alt={s.label}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : Mockup ? (
                  <Mockup />
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
