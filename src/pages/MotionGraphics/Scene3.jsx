import { useEffect, useRef } from "react";
import { animate, wait, nextFrame, NAVY } from "./animUtils";
import {
  PhoneMockup,
  AINetwork,
  EnterpriseDashboard,
  AnalyticsChart,
} from "./Scene3Mockups";

const SERVICES = [
  { label: "Inventory Systems",   imgSrc: "/images/ims.gif", Mockup: null,                tilt: -2.5 },
  { label: "AI Automation",       imgSrc: null,              Mockup: AINetwork,           tilt:  2.5 },
  { label: "Mobile Apps",         imgSrc: null,              Mockup: PhoneMockup,         tilt: -2.5 },
  { label: "Enterprise Software", imgSrc: null,              Mockup: EnterpriseDashboard, tilt:  2.5 },
  { label: "Data Analytics",      imgSrc: null,              Mockup: AnalyticsChart,      tilt: -2.5 },
];

// Timing constants (ms)
const ENTER_MS     = 480;
const HOLD_MS      = 1500;
const EXIT_MS      = 360;
// Next slide starts this many ms after the current one starts.
// Setting it to (hold-start - 120ms) means ~120ms of cross-fade overlap.
const START_OFFSET = 80 + ENTER_MS + HOLD_MS - 120; // 1940

export default function Scene3({ playToken, onComplete }) {
  const textRefs  = useRef([]);
  const imageRefs = useRef([]);

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;

    const run = async () => {
      // Reset every element to its off-screen initial state
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

        // Text slides in from left (non-blocking — fires in parallel with image entry)
        animate(
          txt,
          [
            { opacity: 0, transform: "translateX(-40px)" },
            { opacity: 1, transform: "translateX(0)" },
          ],
          { duration: ENTER_MS, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
        );

        // Image drops from below, 80 ms after text starts
        await wait(80);
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

        // Text fades out (non-blocking)
        animate(
          txt,
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: EXIT_MS, easing: "ease-in" },
        );
        // Image exits upward
        await animate(
          img,
          [
            { transform: `translateY(0) rotate(${s.tilt}deg)` },
            { transform: `translateY(-110%) rotate(${s.tilt}deg)` },
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
              paddingLeft: "10vw",
              paddingRight: "10vw",
              gap: "20vw",
            }}
          >
            {/* Bold label — left 30 vw */}
            <div
              ref={(el) => (textRefs.current[i] = el)}
              style={{
                width: "30vw",
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
                  fontSize: "clamp(2rem, 3.8vw, 5.2rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                {s.label}
              </div>
            </div>

            {/* Image / mockup — right 30 vw */}
            <div
              ref={(el) => (imageRefs.current[i] = el)}
              style={{
                width: "30vw",
                height: "60vh",
                flexShrink: 0,
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
                    objectPosition: "top center",
                  }}
                />
              ) : Mockup ? (
                <Mockup />
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
