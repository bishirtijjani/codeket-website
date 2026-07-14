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
} from "./animUtils";

// SOLUTION - the product reveal.
export default function Scene3({ playToken, onComplete }) {
  const labelRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;
    const run = async () => {
      cancelAnims(labelRef.current, titleRef.current);
      [labelRef, titleRef].forEach((r) => {
        if (r.current) r.current.style.opacity = "0";
      });
      await nextFrame();
      if (cancelled) return;

      await animate(
        labelRef.current,
        [
          { opacity: 0, transform: "translateY(14px)", letterSpacing: "0.5em" },
          { opacity: 1, transform: "translateY(0)", letterSpacing: "0.3em" },
        ],
        { duration: 460, easing: EASE_ENTER }
      );
      if (cancelled) return;
      await wait(120);

      await animate(
        titleRef.current,
        [
          {
            opacity: 0,
            filter: "blur(20px)",
            transform: "scale(0.94)",
          },
          { opacity: 1, filter: "blur(0px)", transform: "scale(1)" },
        ],
        { duration: 560, easing: EASE_ENTER }
      );
      if (cancelled) return;
      await wait(2000);
      if (cancelled) return;

      await Promise.all([
        animate(
          labelRef.current,
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 360, easing: "ease-in" }
        ),
        animate(
          titleRef.current,
          [
            { opacity: 1, filter: "blur(0px)", transform: "scale(1)" },
            { opacity: 0, filter: "blur(14px)", transform: "scale(1.03)" },
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
        gap: "clamp(1.1rem, 2.6vh, 2.4rem)",
        padding: "0 6vw",
      }}
    >
      <div
        ref={labelRef}
        className="font-sans"
        style={{
          opacity: 0,
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          fontSize: "clamp(1.3rem, 2vw, 2.4rem)",
          fontWeight: 600,
          color: NAVY_MUTED,
        }}
      >
        Introducing
      </div>
      <div
        ref={titleRef}
        className="font-display"
        style={{
          opacity: 0,
          textAlign: "center",
          color: NAVY,
          fontWeight: 900,
          lineHeight: 1.02,
          letterSpacing: "-0.03em",
          fontSize: "clamp(3rem, 7vw, 8.6rem)",
          maxWidth: "min(90vw, 1500px)",
        }}
      >
        Your{" "}
        <span style={{ color: ORANGE }}>AI&nbsp;receptionist</span>
        <span style={{ color: ORANGE }}>.</span>
      </div>
    </div>
  );
}
