import React, { useEffect, useRef } from "react";
import {
  NAVY,
  ORANGE,
  animate,
  wait,
  nextFrame,
  cancelAnims,
  EASE_ENTER,
} from "./animUtils";

// PROMISE — three cycling beats, the last with the orange punchline.
const BEATS = [
  [["You run your "], ["business."]],
  [["It runs the "], ["chats."]],
  [["Always on. For your "], ["business."]],
];

export default function Scene6({ playToken, onComplete }) {
  const ref = useRef(null);
  const aRef = useRef(null);
  const bRef = useRef(null);

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;
    const run = async () => {
      cancelAnims(ref.current);
      if (ref.current) ref.current.style.opacity = "0";
      await nextFrame();
      if (cancelled) return;

      for (let i = 0; i < BEATS.length; i++) {
        if (cancelled) return;
        if (aRef.current) aRef.current.textContent = BEATS[i][0][0];
        if (bRef.current) bRef.current.textContent = BEATS[i][1][0];

        await animate(
          ref.current,
          [
            {
              opacity: 0,
              filter: "blur(20px)",
              transform: "translate(-50%, -50%) scale(0.96)",
            },
            {
              opacity: 1,
              filter: "blur(0px)",
              transform: "translate(-50%, -50%) scale(1)",
            },
          ],
          { duration: 500, easing: EASE_ENTER }
        );
        if (cancelled) return;

        const isLast = i === BEATS.length - 1;
        await wait(isLast ? 2000 : 1000);
        if (cancelled) return;

        await animate(
          ref.current,
          [
            {
              opacity: 1,
              filter: "blur(0px)",
              transform: "translate(-50%, -50%) scale(1)",
            },
            {
              opacity: 0,
              filter: "blur(16px)",
              transform: "translate(-50%, -50%) scale(1.03)",
            },
          ],
          { duration: 300, easing: "ease-in" }
        );
        if (cancelled) return;
        await wait(70);
      }
      if (cancelled) return;
      onComplete?.();
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [playToken, onComplete]);

  return (
    <div
      ref={ref}
      className="font-display"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        opacity: 0,
        textAlign: "center",
        color: NAVY,
        fontWeight: 800,
        lineHeight: 1.04,
        letterSpacing: "-0.03em",
        fontSize: "clamp(2.4rem, 5.8vw, 7.2rem)",
        width: "min(86vw, 1400px)",
      }}
    >
      <span ref={aRef}>{BEATS[0][0][0]}</span>
      <span ref={bRef} style={{ color: ORANGE }}>
        {BEATS[0][1][0]}
      </span>
    </div>
  );
}
