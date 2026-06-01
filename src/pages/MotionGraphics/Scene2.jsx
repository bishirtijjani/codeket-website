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

// PROBLEM - three cycling beliefs, each closed with an orange period.
const BEATS = [
  "Customers message at every hour",
  "Most won't wait for a reply",
  "A missed message is a missed sale",
];

export default function Scene2({ playToken, onComplete }) {
  const ref = useRef(null);
  const textRef = useRef(null);

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
        if (textRef.current) textRef.current.firstChild.textContent = BEATS[i];

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
          { duration: 480, easing: EASE_ENTER }
        );
        if (cancelled) return;

        const isLast = i === BEATS.length - 1;
        await wait(isLast ? 2400 : 1800);
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
        fontSize: "clamp(2.4rem, 5.6vw, 7rem)",
        width: "min(86vw, 1400px)",
      }}
    >
      <span ref={textRef}>
        {BEATS[0]}
        <span style={{ color: ORANGE }}>.</span>
      </span>
    </div>
  );
}
