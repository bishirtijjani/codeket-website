import { useEffect, useRef } from "react";
import { Zap, Headphones, Users } from "lucide-react";
import { animate, wait, nextFrame, NAVY, ORANGE } from "./animUtils";

const PROPS = [
  {
    Icon: Zap,
    headline: "Fast Delivery",
    sub: "Projects completed in weeks, not months.",
  },
  {
    Icon: Headphones,
    headline: "Amazing Support",
    sub: "Real humans, every step of the way.",
  },
  {
    Icon: Users,
    headline: "Expert Dev Team",
    sub: "Skilled engineers, no outsourcing.",
  },
];

// Timing constants (ms)
const ICON_ENTER_MS  = 440;
const TEXT_DELAY_MS  =  80;
const TEXT_ENTER_MS  = 360;
const HOLD_MS        = 1400;
const EXIT_MS        = 320;
// Panel completes at: ICON_ENTER_MS + TEXT_DELAY_MS + max(TEXT_ENTER_MS, TEXT_DELAY_MS + TEXT_ENTER_MS) + HOLD_MS + EXIT_MS
// = 440 + 80 + 440 + 1400 + 320 = 2680 ms
const PANEL_DURATION = ICON_ENTER_MS + TEXT_DELAY_MS + (TEXT_DELAY_MS + TEXT_ENTER_MS) + HOLD_MS + EXIT_MS;

export default function Scene4({ playToken, onComplete }) {
  const iconRefs = useRef([]);
  const hdlRefs  = useRef([]);
  const subRefs  = useRef([]);

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;

    const run = async () => {
      // Reset all panels to hidden
      PROPS.forEach((_, i) => {
        const icon = iconRefs.current[i];
        const hdl  = hdlRefs.current[i];
        const sub  = subRefs.current[i];
        [icon, hdl, sub].forEach((el) => {
          if (!el) return;
          el.getAnimations().forEach((a) => a.cancel());
          el.style.opacity = "0";
        });
        if (icon) icon.style.transform = "scale(0.35)";
        if (hdl)  hdl.style.transform  = "translateY(22px)";
        if (sub)  sub.style.transform  = "translateY(22px)";
      });

      await nextFrame();
      if (cancelled) return;

      const runPanel = async (i) => {
        const icon = iconRefs.current[i];
        const hdl  = hdlRefs.current[i];
        const sub  = subRefs.current[i];
        if (!icon || !hdl) return;

        await wait(i * PANEL_DURATION);
        if (cancelled) return;

        // Icon bounces in
        await animate(
          icon,
          [
            { opacity: 0, transform: "scale(0.35)" },
            { opacity: 1, transform: "scale(1)" },
          ],
          { duration: ICON_ENTER_MS, easing: "cubic-bezier(0.34, 1.5, 0.64, 1)" },
        );
        if (cancelled) return;

        await wait(TEXT_DELAY_MS);
        if (cancelled) return;

        // Headline and sub rise in together (sub offset by 80 ms)
        await Promise.all([
          animate(
            hdl,
            [
              { opacity: 0, transform: "translateY(22px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: TEXT_ENTER_MS, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
          ),
          sub
            ? animate(
                sub,
                [
                  { opacity: 0, transform: "translateY(22px)" },
                  { opacity: 0.6, transform: "translateY(0)" },
                ],
                {
                  duration: TEXT_ENTER_MS,
                  delay: TEXT_DELAY_MS,
                  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                },
              )
            : Promise.resolve(),
        ]);
        if (cancelled) return;

        await wait(HOLD_MS);
        if (cancelled) return;

        // Exit — scale down + fade everything together
        await Promise.all([
          animate(
            icon,
            [
              { opacity: 1, transform: "scale(1)" },
              { opacity: 0, transform: "scale(0.82)" },
            ],
            { duration: EXIT_MS, easing: "ease-in" },
          ),
          animate(
            hdl,
            [{ opacity: 1 }, { opacity: 0 }],
            { duration: EXIT_MS, easing: "ease-in" },
          ),
          sub
            ? animate(
                sub,
                [{ opacity: 0.6 }, { opacity: 0 }],
                { duration: EXIT_MS, easing: "ease-in" },
              )
            : Promise.resolve(),
        ]);
      };

      await Promise.all(PROPS.map((_, i) => runPanel(i)));
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
      {PROPS.map((p, i) => {
        const Icon = p.Icon;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(12px, 2.2vh, 28px)",
              padding: "0 clamp(24px, 6vw, 120px)",
            }}
          >
            {/* Icon */}
            <div
              ref={(el) => (iconRefs.current[i] = el)}
              style={{
                opacity: 0,
                transform: "scale(0.35)",
                willChange: "transform, opacity",
                color: ORANGE,
              }}
            >
              <Icon size={80} strokeWidth={1.5} />
            </div>

            {/* Headline */}
            <div
              ref={(el) => (hdlRefs.current[i] = el)}
              className="font-display"
              style={{
                color: NAVY,
                fontWeight: 900,
                fontSize: "clamp(3.5rem, 6.5vw, 9rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                opacity: 0,
                transform: "translateY(22px)",
                willChange: "transform, opacity",
                textAlign: "center",
              }}
            >
              {p.headline}
            </div>

            {/* Sub-copy */}
            {p.sub && (
              <div
                ref={(el) => (subRefs.current[i] = el)}
                className="font-sans"
                style={{
                  color: NAVY,
                  opacity: 0,
                  fontSize: "clamp(0.95rem, 1.4vw, 1.7rem)",
                  fontWeight: 400,
                  transform: "translateY(22px)",
                  willChange: "transform, opacity",
                  textAlign: "center",
                  maxWidth: "min(60vw, 860px)",
                }}
              >
                {p.sub}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
