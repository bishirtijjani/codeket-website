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

// SIGN-OFF — the logo moment.
export default function Scene7({ playToken, onComplete }) {
  const logoRef = useRef(null);
  const tagRef = useRef(null);
  const urlRef = useRef(null);

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;
    const run = async () => {
      cancelAnims(logoRef.current, tagRef.current, urlRef.current);
      [logoRef, tagRef, urlRef].forEach((r) => {
        if (r.current) r.current.style.opacity = "0";
      });
      await nextFrame();
      if (cancelled) return;

      await animate(
        logoRef.current,
        [
          { opacity: 0, filter: "blur(16px)", transform: "scale(0.92)" },
          { opacity: 1, filter: "blur(0px)", transform: "scale(1)" },
        ],
        { duration: 560, easing: EASE_ENTER }
      );
      if (cancelled) return;
      await wait(120);

      await animate(
        tagRef.current,
        [
          { opacity: 0, transform: "translateY(14px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 460, easing: EASE_ENTER }
      );
      if (cancelled) return;

      await animate(urlRef.current, [{ opacity: 0 }, { opacity: 1 }], {
        duration: 380,
        easing: "ease-out",
      });
      if (cancelled) return;
      await wait(1800);
      if (cancelled) return;

      await Promise.all([
        animate(logoRef.current, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 360,
          easing: "ease-in",
        }),
        animate(tagRef.current, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 360,
          easing: "ease-in",
        }),
        animate(urlRef.current, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 360,
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
        gap: "clamp(1.4rem, 3vh, 2.8rem)",
        padding: "0 6vw",
      }}
    >
      <img
        ref={logoRef}
        src="/images/logo.png"
        alt="codeket"
        style={{ opacity: 0, width: "min(42vw, 720px)", height: "auto" }}
      />
      <div
        ref={tagRef}
        className="font-display"
        style={{
          opacity: 0,
          color: NAVY,
          fontWeight: 700,
          letterSpacing: "-0.025em",
          fontSize: "clamp(1.4rem, 2.8vw, 3.4rem)",
          textAlign: "center",
        }}
      >
        Build with <span style={{ color: ORANGE }}>codeket</span>
      </div>
      <div
        ref={urlRef}
        className="font-sans"
        style={{
          opacity: 0,
          textTransform: "uppercase",
          letterSpacing: "0.32em",
          fontSize: "clamp(0.9rem, 1.15vw, 1.4rem)",
          color: NAVY_MUTED,
        }}
      >
        codeket.com
      </div>
    </div>
  );
}
