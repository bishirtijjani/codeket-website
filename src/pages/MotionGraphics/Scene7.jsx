import { useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { animate, wait, nextFrame, cancelAnims, NAVY, ORANGE } from "./animUtils";

export default function Scene7({ playToken, onComplete }) {
  const ctaRef = useRef(null);
  const urlRef = useRef(null);
  const waRef  = useRef(null);

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;

    const run = async () => {
      cancelAnims(ctaRef.current, urlRef.current, waRef.current);

      [ctaRef, urlRef, waRef].forEach(({ current: el }) => {
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = "translateY(18px)";
      });
      if (urlRef.current) urlRef.current.style.filter = "blur(20px)";

      await nextFrame();
      if (cancelled) return;

      // "Visit us" label slides in first
      await animate(
        ctaRef.current,
        [
          { opacity: 0, transform: "translateY(18px)" },
          { opacity: 1, transform: "translateY(0)"    },
        ],
        { duration: 400, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      );
      if (cancelled) return;

      await wait(80);
      if (cancelled) return;

      // URL blurs in
      animate(
        urlRef.current,
        [
          { opacity: 0, transform: "translateY(28px)", filter: "blur(20px)" },
          { opacity: 1, transform: "translateY(0)",    filter: "blur(0px)"  },
        ],
        { duration: 560, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      );

      await wait(300);
      if (cancelled) return;

      // WhatsApp line slides up
      await animate(
        waRef.current,
        [
          { opacity: 0, transform: "translateY(18px)" },
          { opacity: 1, transform: "translateY(0)"    },
        ],
        { duration: 460, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      );
      if (cancelled) return;

      await wait(2800);
      if (cancelled) return;

      onComplete?.();
    };

    run();
    return () => { cancelled = true; };
  }, [playToken, onComplete]);

  return (
    <div
      className="absolute inset-0"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(0.6rem, 1.4vw, 1.8rem)",
      }}
    >
      {/* "VISIT US" label */}
      <div
        ref={ctaRef}
        className="font-sans"
        style={{
          color: NAVY,
          opacity: 0,
          fontSize: "clamp(0.8rem, 1.2vw, 1.5rem)",
          letterSpacing: "0.34em",
          textTransform: "uppercase",
          fontWeight: 500,
          willChange: "transform, opacity",
        }}
      >
        Visit us
      </div>

      {/* Website URL */}
      <div
        ref={urlRef}
        className="font-display"
        style={{
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
      </div>

      {/* "or" + WhatsApp */}
      <div
        ref={waRef}
        className="font-sans"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(0.35rem, 0.7vw, 0.9rem)",
          opacity: 0,
          willChange: "transform, opacity",
        }}
      >
        {/* Divider */}
        <div
          style={{
            color: "rgba(11,22,40,0.3)",
            fontSize: "clamp(0.65rem, 1vw, 1.25rem)",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            fontWeight: 400,
          }}
        >
          — or —
        </div>

        {/* WhatsApp line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(0.4rem, 0.75vw, 1rem)",
          }}
        >
          <FaWhatsapp
            style={{
              color: "#25D366",
              fontSize: "clamp(1.4rem, 2.4vw, 3rem)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              color: NAVY,
              fontWeight: 600,
              fontSize: "clamp(1rem, 2vw, 2.5rem)",
              letterSpacing: "-0.01em",
            }}
          >
            +234 906 350 3232
          </span>
        </div>
      </div>
    </div>
  );
}
