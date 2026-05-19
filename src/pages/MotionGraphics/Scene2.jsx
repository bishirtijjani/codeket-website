import { useEffect, useRef } from "react";
import { animate, wait, nextFrame, cancelAnims, NAVY, ORANGE } from "./animUtils";

const STATEMENTS = [
  "Software should feel obvious",
  "Setup should take days, not months",
  "Real problems deserve real support",
];

export default function Scene2({ playToken, onComplete }) {
  const refs = useRef([]);

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;

    const run = async () => {
      cancelAnims(...refs.current);
      refs.current.forEach((el) => {
        if (!el) return;
        el.style.opacity = "0";
        el.style.filter = "blur(22px)";
        el.style.transform = "translate(-50%, -50%) scale(0.94)";
      });
      await nextFrame();
      if (cancelled) return;

      for (let i = 0; i < refs.current.length; i++) {
        const el = refs.current[i];
        if (!el || cancelled) return;

        await animate(
          el,
          [
            { opacity: 0, filter: "blur(22px)", transform: "translate(-50%, -50%) scale(0.94)" },
            { opacity: 1, filter: "blur(0px)", transform: "translate(-50%, -50%) scale(1)" },
          ],
          { duration: 420, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
        );
        if (cancelled) return;

        await wait(1250);
        if (cancelled) return;

        await animate(
          el,
          [
            { opacity: 1, filter: "blur(0px)", transform: "translate(-50%, -50%) scale(1)" },
            { opacity: 0, filter: "blur(18px)", transform: "translate(-50%, -50%) scale(1.04)" },
          ],
          { duration: 340, easing: "cubic-bezier(0.7, 0, 0.84, 0)" },
        );
        if (cancelled) return;

        await wait(80);
      }

      await wait(200);
      onComplete?.();
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [playToken, onComplete]);

  return (
    <div className="absolute inset-0">
      {STATEMENTS.map((text, i) => (
        <h2
          key={i}
          ref={(el) => (refs.current[i] = el)}
          className="font-display text-center"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(0.94)",
            width: "min(86vw, 1400px)",
            color: NAVY,
            fontWeight: 800,
            fontSize: "clamp(2.4rem, 5.6vw, 7rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
            opacity: 0,
            willChange: "transform, filter, opacity",
          }}
        >
          {text}
          <span style={{ color: ORANGE }}>.</span>
        </h2>
      ))}
    </div>
  );
}
