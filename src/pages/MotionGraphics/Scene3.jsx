import { useEffect, useRef } from "react";
import { animate, wait, nextFrame, useIsPortrait, NAVY } from "./animUtils";
import {
  PhoneMockup,
  AINetwork,
  EnterpriseDashboard,
  AnalyticsChart,
} from "./Scene3Mockups";

// Per-orientation frame sizing. Each service's frame matches the natural
// aspect of its content so nothing gets cropped.
const FRAMES_LANDSCAPE = {
  desktopWide: { width: "52vw", aspectRatio: "1587 / 772" },
  desktop:     { width: "50vw", aspectRatio: "16 / 9"      },
  panel:       { width: "32vw", aspectRatio: "1 / 1"       },
  phone:       { width: "15vw", aspectRatio: "9 / 19"      },
};
const FRAMES_PORTRAIT = {
  desktopWide: { width: "88vw", aspectRatio: "1587 / 772" },
  desktop:     { width: "86vw", aspectRatio: "16 / 9"      },
  panel:       { width: "70vw", aspectRatio: "1 / 1"       },
  phone:       { width: "44vw", aspectRatio: "9 / 19"      },
};

const SERVICES = [
  { label: "Inventory Systems",   imgSrc: "/images/ims.gif", Mockup: null,                tilt: -2.5, kind: "desktopWide" },
  { label: "AI Automation",       imgSrc: null,              Mockup: AINetwork,           tilt:  2.5, kind: "panel"       },
  { label: "Mobile Apps",         imgSrc: null,              Mockup: PhoneMockup,         tilt: -2.5, kind: "phone"       },
  { label: "Enterprise Software", imgSrc: null,              Mockup: EnterpriseDashboard, tilt:  2.5, kind: "desktop"     },
  { label: "Data Analytics",      imgSrc: null,              Mockup: AnalyticsChart,      tilt: -2.5, kind: "desktop"     },
];

const ENTER_MS    = 420;
const HOLD_MS     = 1100;
const EXIT_MS     = 320;
const IMG_DELAY   = 80;
const SLIDE_GAP   = 80;
const START_OFFSET = IMG_DELAY + ENTER_MS + HOLD_MS + EXIT_MS + SLIDE_GAP;

export default function Scene3({ playToken, onComplete }) {
  const textRefs   = useRef([]);
  const imageRefs  = useRef([]);
  const isPortrait = useIsPortrait();

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;

    const textOffscreen = isPortrait ? "translateY(-26px)" : "translateX(-40px)";

    const run = async () => {
      SERVICES.forEach((s, i) => {
        const txt = textRefs.current[i];
        const img = imageRefs.current[i];
        if (txt) {
          txt.getAnimations().forEach((a) => a.cancel());
          txt.style.opacity = "0";
          txt.style.transform = textOffscreen;
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
            { opacity: 0, transform: textOffscreen },
            { opacity: 1, transform: "translate(0, 0)" },
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
  }, [playToken, onComplete, isPortrait]);

  const frames = isPortrait ? FRAMES_PORTRAIT : FRAMES_LANDSCAPE;

  const slideStyle = isPortrait
    ? {
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: "6vw",
        paddingRight: "6vw",
        paddingTop: "7vh",
        paddingBottom: "7vh",
        gap: "4vh",
      }
    : {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        paddingLeft: "5vw",
        paddingRight: "6vw",
        gap: "5vw",
      };

  const textWrapperStyle = isPortrait
    ? {
        width: "100%",
        textAlign: "center",
        flexShrink: 0,
        opacity: 0,
        willChange: "transform, opacity",
      }
    : {
        width: "28vw",
        flexShrink: 0,
        opacity: 0,
        willChange: "transform, opacity",
      };

  const labelStyle = {
    color: NAVY,
    fontWeight: 900,
    fontSize: isPortrait
      ? "clamp(2.2rem, 7.6vw, 5rem)"
      : "clamp(1.9rem, 3.6vw, 4.8rem)",
    letterSpacing: "-0.03em",
    lineHeight: 1.05,
  };

  const imageAreaStyle = isPortrait
    ? {
        width: "100%",
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 0,
      }
    : {
        flex: 1,
        height: "65vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 0,
      };

  return (
    <div className="absolute inset-0">
      {SERVICES.map((s, i) => {
        const Mockup = s.Mockup;
        const frame  = frames[s.kind];
        return (
          <div key={i} style={slideStyle}>
            <div ref={(el) => (textRefs.current[i] = el)} style={textWrapperStyle}>
              <div className="font-display" style={labelStyle}>
                {s.label}
              </div>
            </div>

            <div style={imageAreaStyle}>
              <div
                ref={(el) => (imageRefs.current[i] = el)}
                style={{
                  ...frame,
                  maxHeight: isPortrait ? "62vh" : "65vh",
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
