import { useEffect, useRef } from "react";
import { animate, wait, nextFrame, cancelAnims, NAVY, ORANGE } from "./animUtils";

const VARIANTS = [
  { text: "Built for serious businesses", accent: null },
  { text: "Built for focused businesses", accent: null },
  { text: "Built for growing businesses", accent: null },
  { text: "Built for operators", accent: "operators" },
];

const splitAccent = (text, accent) => {
  if (!accent) return [{ str: text, orange: false }];
  const idx = text.indexOf(accent);
  if (idx === -1) return [{ str: text, orange: false }];
  return [
    { str: text.slice(0, idx), orange: false },
    { str: accent, orange: true },
    { str: text.slice(idx + accent.length), orange: false },
  ];
};

export default function Scene5({ playToken, onComplete }) {
  const refs = useRef([]);

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;

    const run = async () => {
      cancelAnims(...refs.current);
      refs.current.forEach((el) => {
        if (!el) return;
        el.style.opacity = "0";
        el.style.filter = "blur(18px)";
        el.style.transform = "translate(-50%, -50%) scale(0.97)";
      });
      await nextFrame();
      if (cancelled) return;

      for (let i = 0; i < refs.current.length; i++) {
        const el = refs.current[i];
        if (!el || cancelled) return;
        const isLast = i === refs.current.length - 1;

        await animate(
          el,
          [
            { opacity: 0, filter: "blur(18px)", transform: "translate(-50%, -50%) scale(0.97)" },
            { opacity: 1, filter: "blur(0px)", transform: "translate(-50%, -50%) scale(1)" },
          ],
          { duration: 380, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
        );
        if (cancelled) return;

        await wait(isLast ? 1700 : 950);
        if (cancelled) return;

        if (!isLast) {
          await animate(
            el,
            [
              { opacity: 1, filter: "blur(0px)", transform: "translate(-50%, -50%) scale(1)" },
              { opacity: 0, filter: "blur(16px)", transform: "translate(-50%, -50%) scale(1.03)" },
            ],
            { duration: 280, easing: "cubic-bezier(0.7, 0, 0.84, 0)" },
          );
        } else {
          await animate(
            el,
            [
              { opacity: 1, filter: "blur(0px)", transform: "translate(-50%, -50%) scale(1)" },
              { opacity: 0, filter: "blur(8px)", transform: "translate(-50%, -50%) scale(1.02)" },
            ],
            { duration: 480, easing: "ease-in" },
          );
        }
        if (cancelled) return;
      }

      onComplete?.();
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [playToken, onComplete]);

  return (
    <div className="absolute inset-0">
      {VARIANTS.map((v, i) => {
        const parts = splitAccent(v.text, v.accent);
        return (
          <h2
            key={i}
            ref={(el) => (refs.current[i] = el)}
            className="font-display text-center"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(0.97)",
              width: "min(90vw, 1500px)",
              color: NAVY,
              fontWeight: 800,
              fontSize: "clamp(2.6rem, 6.4vw, 8rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              opacity: 0,
              willChange: "transform, filter, opacity",
              whiteSpace: "nowrap",
            }}
          >
            {parts.map((p, j) => (
              <span key={j} style={{ color: p.orange ? ORANGE : NAVY }}>
                {p.str}
              </span>
            ))}
            <span style={{ color: ORANGE }}>.</span>
          </h2>
        );
      })}
    </div>
  );
}
