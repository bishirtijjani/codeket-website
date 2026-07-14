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

// VISIT - the call to action, held long.
export default function Scene8({ playToken, onComplete }) {
  const urlRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;
    const run = async () => {
      cancelAnims(urlRef.current, ctaRef.current);
      [urlRef, ctaRef].forEach((r) => {
        if (r.current) r.current.style.opacity = "0";
      });
      await nextFrame();
      if (cancelled) return;

      await animate(
        urlRef.current,
        [
          { opacity: 0, filter: "blur(18px)", transform: "scale(0.95)" },
          { opacity: 1, filter: "blur(0px)", transform: "scale(1)" },
        ],
        { duration: 560, easing: EASE_ENTER }
      );
      if (cancelled) return;
      await wait(120);

      await animate(
        ctaRef.current,
        [
          { opacity: 0, transform: "translateY(14px)", letterSpacing: "0.5em" },
          { opacity: 1, transform: "translateY(0)", letterSpacing: "0.32em" },
        ],
        { duration: 460, easing: EASE_ENTER }
      );
      if (cancelled) return;
      await wait(2800);
      if (cancelled) return;

      // soft last-beat exit
      await Promise.all([
        animate(urlRef.current, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 460,
          easing: "ease-in",
        }),
        animate(ctaRef.current, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 460,
          easing: "ease-in",
        }),
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
        gap: "clamp(1.2rem, 2.6vh, 2.4rem)",
        padding: "0 6vw",
      }}
    >
      <div
        ref={urlRef}
        className="font-display"
        style={{
          opacity: 0,
          color: NAVY,
          fontWeight: 900,
          letterSpacing: "-0.025em",
          lineHeight: 1.05,
          fontSize: "clamp(2rem, 5vw, 5.6rem)",
          textAlign: "center",
          maxWidth: "min(94vw, 1600px)",
        }}
      >
        codeket.com<wbr />
        <span style={{ color: ORANGE }}>/ai-receptionist</span>
      </div>
      <div
        ref={ctaRef}
        className="font-sans"
        style={{
          opacity: 0,
          textTransform: "uppercase",
          letterSpacing: "0.32em",
          fontWeight: 600,
          fontSize: "clamp(1.3rem, 2vw, 2.4rem)",
          color: NAVY_MUTED,
        }}
      >
        Visit us
      </div>
    </div>
  );
}
