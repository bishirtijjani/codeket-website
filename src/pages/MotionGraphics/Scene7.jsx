import { useEffect, useRef } from "react";
import { animate, wait, nextFrame, cancelAnims, NAVY, ORANGE } from "./animUtils";

export default function Scene7({ playToken, onComplete }) {
  const urlRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;

    const run = async () => {
      cancelAnims(urlRef.current, ctaRef.current);

      if (urlRef.current) {
        urlRef.current.style.opacity = "0";
        urlRef.current.style.transform = "translate(-50%, calc(-50% + 28px))";
        urlRef.current.style.filter = "blur(20px)";
      }
      if (ctaRef.current) {
        ctaRef.current.style.opacity = "0";
        ctaRef.current.style.transform = "translate(-50%, 14px)";
      }

      await nextFrame();
      if (cancelled) return;

      animate(
        urlRef.current,
        [
          { opacity: 0, transform: "translate(-50%, calc(-50% + 28px))", filter: "blur(20px)" },
          { opacity: 1, transform: "translate(-50%, -50%)",              filter: "blur(0px)"  },
        ],
        { duration: 560, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      );

      await wait(260);
      if (cancelled) return;

      await animate(
        ctaRef.current,
        [
          { opacity: 0, transform: "translate(-50%, 14px)" },
          { opacity: 1, transform: "translate(-50%, 0)" },
        ],
        { duration: 460, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      );
      if (cancelled) return;

      await wait(2800);
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
      <h1
        ref={urlRef}
        className="font-display"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, calc(-50% + 28px))",
          color: NAVY,
          fontWeight: 800,
          fontSize: "clamp(2.4rem, 7vw, 8.4rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          textAlign: "center",
          opacity: 0,
          filter: "blur(20px)",
          willChange: "transform, filter, opacity",
        }}
      >
        <span style={{ color: NAVY }}>www.codeket</span>
        <span style={{ color: ORANGE }}>.com</span>
      </h1>

      <div
        ref={ctaRef}
        className="font-sans"
        style={{
          position: "absolute",
          top: "62%",
          left: "50%",
          transform: "translate(-50%, 14px)",
          color: NAVY,
          opacity: 0,
          fontSize: "clamp(0.95rem, 1.4vw, 1.7rem)",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          fontWeight: 500,
          willChange: "transform, opacity",
        }}
      >
        Visit us
      </div>
    </div>
  );
}
