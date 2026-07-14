import React, { useEffect, useRef } from "react";
import {
  NAVY,
  ORANGE,
  NAVY_MUTED,
  animate,
  wait,
  nextFrame,
  cancelAnims,
  EASE_ENTER,
  EASE_DROP,
  EASE_EXIT,
} from "./animUtils";

// HOOK - an everyday DM lands, then the line that frames it.
export default function Scene1({ playToken, onComplete }) {
  const bubbleRef = useRef(null);
  const timeRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;
    const run = async () => {
      cancelAnims(bubbleRef.current, timeRef.current, lineRef.current);
      [bubbleRef, timeRef, lineRef].forEach((r) => {
        if (r.current) r.current.style.opacity = "0";
      });
      await nextFrame();
      if (cancelled) return;

      await animate(
        bubbleRef.current,
        [
          { opacity: 0, transform: "translateY(-24px) scale(0.96)" },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ],
        { duration: 460, easing: EASE_DROP }
      );
      if (cancelled) return;

      await animate(timeRef.current, [{ opacity: 0 }, { opacity: 1 }], {
        duration: 280,
        easing: "ease-out",
      });
      if (cancelled) return;
      await wait(160);
      if (cancelled) return;

      await animate(
        lineRef.current,
        [
          { opacity: 0, filter: "blur(18px)", transform: "translateY(16px)" },
          { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" },
        ],
        { duration: 520, easing: EASE_ENTER }
      );
      if (cancelled) return;
      await wait(1700);
      if (cancelled) return;

      await Promise.all([
        animate(
          bubbleRef.current,
          [
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0, transform: "translateY(-16px)" },
          ],
          { duration: 360, easing: EASE_EXIT }
        ),
        animate(timeRef.current, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 360,
          easing: EASE_EXIT,
        }),
        animate(
          lineRef.current,
          [
            { opacity: 1, filter: "blur(0px)" },
            { opacity: 0, filter: "blur(12px)" },
          ],
          { duration: 360, easing: "ease-in" }
        ),
      ]);
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
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(1.6rem, 4vh, 3.4rem)",
        padding: "0 6vw",
      }}
    >
      <div
        style={{
          width: "min(90vw, 900px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div
          ref={bubbleRef}
          style={{
            opacity: 0,
            background: "#FFFFFF",
            border: "1px solid #E8EBF0",
            borderRadius: "6px 22px 22px 22px",
            padding:
              "clamp(1.3rem, 2.2vw, 2.2rem) clamp(1.6rem, 2.8vw, 2.8rem)",
            boxShadow: "0 12px 40px rgba(11,22,40,0.12)",
            fontFamily: "'Roboto', ui-sans-serif, sans-serif",
            color: NAVY,
            fontSize: "clamp(1.5rem, 2.9vw, 3.2rem)",
            lineHeight: 1.35,
            maxWidth: "100%",
          }}
        >
          Hi! 👋 Do you have any facials this week?
        </div>
        <div
          ref={timeRef}
          style={{
            opacity: 0,
            fontFamily: "'Roboto', ui-sans-serif, sans-serif",
            fontSize: "clamp(1rem, 1.5vw, 1.6rem)",
            color: NAVY_MUTED,
            marginTop: "0.7rem",
            marginLeft: "0.6rem",
          }}
        >
          Instagram · 9:47 PM
        </div>
      </div>

      <div
        ref={lineRef}
        className="font-display"
        style={{
          opacity: 0,
          textAlign: "center",
          color: NAVY,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          fontSize: "clamp(2.4rem, 5.6vw, 7rem)",
          maxWidth: "min(86vw, 1400px)",
        }}
      >
        A customer just messaged you
        <span style={{ color: ORANGE }}>.</span>
      </div>
    </div>
  );
}
