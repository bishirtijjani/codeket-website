import { useEffect, useRef } from "react";
import { animate, wait, nextFrame, cancelAnims, NAVY, ORANGE } from "./animUtils";

const CLOSING = ["Tools that work.", "Fast.", "Simple.", "Yours."];

export default function Scene6({ playToken, onComplete }) {
  const dotRef = useRef(null);
  const logoRef = useRef(null);
  const lineRef = useRef(null);
  const wordRefs = useRef([]);
  const urlRef = useRef(null);

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;

    const run = async () => {
      const dot = dotRef.current;
      const logo = logoRef.current;
      const line = lineRef.current;
      const url = urlRef.current;
      if (!dot || !logo || !line || !url) return;

      cancelAnims(dot, logo, line, url, ...wordRefs.current);

      dot.style.opacity = "0";
      dot.style.transform = "translate(-50%, -50%) scale(0.4)";
      logo.style.opacity = "0";
      logo.style.transform = "translate(-50%, -50%) scale(0.55)";
      line.style.opacity = "1";
      wordRefs.current.forEach((w) => {
        if (!w) return;
        w.style.opacity = "0";
        w.style.transform = "translateY(14px)";
      });
      url.style.opacity = "0";
      url.style.transform = "translate(-50%, 6px)";

      await nextFrame();
      if (cancelled) return;

      // Tiny dot fades in
      await animate(
        dot,
        [
          { opacity: 0, transform: "translate(-50%, -50%) scale(0.4)" },
          { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        ],
        { duration: 320, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      );
      if (cancelled) return;

      await wait(220);

      // Dot expands rapidly while logo crossfades in over it
      await Promise.all([
        animate(
          dot,
          [
            { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
            { opacity: 0, transform: "translate(-50%, -50%) scale(18)" },
          ],
          { duration: 520, easing: "cubic-bezier(0.65, 0, 0.35, 1)" },
        ),
        (async () => {
          await wait(160);
          if (cancelled) return;
          await animate(
            logo,
            [
              { opacity: 0, transform: "translate(-50%, -50%) scale(0.55)" },
              { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
            ],
            { duration: 460, easing: "cubic-bezier(0.34, 1.4, 0.64, 1)" },
          );
        })(),
      ]);
      if (cancelled) return;

      await wait(280);

      // Closing line — word by word
      await Promise.all(
        wordRefs.current.map(async (w, i) => {
          if (!w) return;
          await wait(i * 220);
          if (cancelled) return;
          await animate(
            w,
            [
              { opacity: 0, transform: "translateY(14px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 380, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
          );
        }),
      );
      if (cancelled) return;

      await wait(380);

      // URL fades in
      await animate(
        url,
        [
          { opacity: 0, transform: "translate(-50%, 6px)" },
          { opacity: 1, transform: "translate(-50%, 0)" },
        ],
        { duration: 460, easing: "ease-out" },
      );
      if (cancelled) return;

      await wait(1700);
      if (cancelled) return;

      // Hold-fade to white
      await Promise.all([
        animate(logo, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 700,
          easing: "ease-in",
        }),
        animate(line, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 600,
          easing: "ease-in",
        }),
        animate(url, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 600,
          easing: "ease-in",
        }),
      ]);

      onComplete?.();
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [playToken, onComplete]);

  return (
    <div className="absolute inset-0">
      <div
        ref={dotRef}
        style={{
          position: "absolute",
          top: "44%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(0.4)",
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          backgroundColor: NAVY,
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />
      <img
        ref={logoRef}
        src="/images/logo.png"
        alt="codeket"
        draggable={false}
        style={{
          position: "absolute",
          top: "44%",
          left: "50%",
          width: "min(42vw, 720px)",
          height: "auto",
          transform: "translate(-50%, -50%) scale(0.55)",
          opacity: 0,
          willChange: "transform, opacity",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
      <div
        ref={lineRef}
        className="font-display text-center"
        style={{
          position: "absolute",
          top: "62%",
          left: 0,
          right: 0,
          color: NAVY,
          fontWeight: 700,
          fontSize: "clamp(1.4rem, 2.8vw, 3.4rem)",
          letterSpacing: "-0.015em",
          willChange: "opacity",
        }}
      >
        {CLOSING.map((word, i) => (
          <span
            key={i}
            ref={(el) => (wordRefs.current[i] = el)}
            style={{
              display: "inline-block",
              marginRight: i === CLOSING.length - 1 ? 0 : "0.45em",
              opacity: 0,
              transform: "translateY(14px)",
              willChange: "transform, opacity",
              color: i === CLOSING.length - 1 ? ORANGE : NAVY,
            }}
          >
            {word}
          </span>
        ))}
      </div>
      <div
        ref={urlRef}
        className="font-sans"
        style={{
          position: "absolute",
          top: "74%",
          left: "50%",
          transform: "translate(-50%, 6px)",
          color: NAVY,
          opacity: 0,
          fontSize: "clamp(0.9rem, 1.15vw, 1.4rem)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontWeight: 500,
          willChange: "transform, opacity",
        }}
      >
        codeket.com
      </div>
    </div>
  );
}
