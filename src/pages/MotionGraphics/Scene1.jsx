import { useEffect, useRef } from "react";

const NAVY = "#0B1628";
const ORANGE = "#C2410C";

const animate = (el, keyframes, options) =>
  el.animate(keyframes, { fill: "forwards", ...options }).finished;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Scene1({ playToken, onComplete }) {
  const stageRef = useRef(null);
  const headlineRef = useRef(null);
  const thisRef = useRef(null);
  const isRef = useRef(null);
  const codeketRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;

    const run = async () => {
      const stage = stageRef.current;
      const headline = headlineRef.current;
      const thisEl = thisRef.current;
      const isEl = isRef.current;
      const codeEl = codeketRef.current;
      const logo = logoRef.current;
      if (!stage || !headline || !thisEl || !codeEl || !logo) return;

      [stage, headline, thisEl, isEl, codeEl, logo].forEach((el) =>
        el.getAnimations().forEach((a) => a.cancel()),
      );

      stage.style.transform = "translate(0, 0) scale(1)";
      stage.style.filter = "blur(0px)";
      headline.style.transform = "translateY(-115vh)";
      headline.style.filter = "blur(0px)";
      headline.style.opacity = "1";
      thisEl.style.opacity = "1";
      isEl.style.opacity = "1";
      codeEl.style.opacity = "1";
      logo.style.opacity = "0";
      logo.style.transform = "translate(-50%, -50%) scale(0.55)";

      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      if (cancelled) return;

      const vw = window.innerWidth;
      const thisBox = thisEl.getBoundingClientRect();
      const codeBox = codeEl.getBoundingClientRect();
      const thisCenterX = (thisBox.left + thisBox.right) / 2 - vw / 2;
      const codeCenterX = (codeBox.left + codeBox.right) / 2 - vw / 2;
      const ZOOM = 3;

      // Phase 1 — slide rapidly from top with vertical motion blur, ease-out
      await animate(
        headline,
        [
          { transform: "translateY(-115vh)", filter: "blur(24px)" },
          { transform: "translateY(-15vh)", filter: "blur(8px)", offset: 0.7 },
          { transform: "translateY(0)", filter: "blur(0px)" },
        ],
        { duration: 700, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      );
      if (cancelled) return;

      await wait(180);
      if (cancelled) return;

      // Phase 2 — zoom in on "This"
      await animate(
        stage,
        [
          { transform: "translate(0, 0) scale(1)" },
          { transform: `translate(${-thisCenterX * ZOOM}px, 0) scale(${ZOOM})` },
        ],
        { duration: 750, easing: "cubic-bezier(0.65, 0, 0.35, 1)" },
      );
      if (cancelled) return;

      await wait(120);
      if (cancelled) return;

      // Phase 3 — pan rapidly to "codeket" with horizontal motion blur
      await animate(
        stage,
        [
          {
            transform: `translate(${-thisCenterX * ZOOM}px, 0) scale(${ZOOM})`,
            filter: "blur(0px)",
          },
          {
            transform: `translate(${((-thisCenterX + -codeCenterX) / 2) * ZOOM}px, 0) scale(${ZOOM})`,
            filter: "blur(14px)",
            offset: 0.5,
          },
          {
            transform: `translate(${-codeCenterX * ZOOM}px, 0) scale(${ZOOM})`,
            filter: "blur(0px)",
          },
        ],
        { duration: 1200, easing: "cubic-bezier(0.5, 0, 0.5, 1)" },
      );
      if (cancelled) return;

      await wait(180);
      if (cancelled) return;

      // Phase 4 — zoom out to fit headline
      await animate(
        stage,
        [
          { transform: `translate(${-codeCenterX * ZOOM}px, 0) scale(${ZOOM})` },
          { transform: "translate(0, 0) scale(1)" },
        ],
        { duration: 700, easing: "cubic-bezier(0.65, 0, 0.35, 1)" },
      );
      if (cancelled) return;

      await wait(220);
      if (cancelled) return;

      // Phase 5 — morph "codeket" word into the wordmark logo
      await Promise.all([
        animate(thisEl, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 380,
          easing: "ease-out",
        }),
        animate(isEl, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 380,
          easing: "ease-out",
        }),
        animate(
          codeEl,
          [
            { opacity: 1, transform: "scale(1)" },
            { opacity: 0, transform: "scale(1.08)" },
          ],
          { duration: 420, easing: "ease-out" },
        ),
        animate(
          logo,
          [
            { opacity: 0, transform: "translate(-50%, -50%) scale(0.55)" },
            { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
          ],
          { duration: 560, easing: "cubic-bezier(0.34, 1.4, 0.64, 1)" },
        ),
      ]);
      if (cancelled) return;

      await wait(700);
      if (cancelled) return;

      // Phase 6 — zoom logo out until unseeable
      await animate(
        logo,
        [
          { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
          { transform: "translate(-50%, -50%) scale(0)", opacity: 0 },
        ],
        { duration: 1100, easing: "cubic-bezier(0.7, 0, 0.84, 0)" },
      );
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
      ref={stageRef}
      className="absolute inset-0 flex items-center justify-center"
      style={{ transformOrigin: "center center", willChange: "transform, filter" }}
    >
      <h1
        ref={headlineRef}
        className="font-display whitespace-nowrap tracking-tight leading-none select-none"
        style={{
          color: NAVY,
          fontWeight: 900,
          fontSize: "clamp(3.5rem, 9vw, 10rem)",
          letterSpacing: "-0.03em",
          transform: "translateY(-115vh)",
          willChange: "transform, filter",
        }}
      >
        <span ref={thisRef}>This</span>
        <span ref={isRef} style={{ color: NAVY, opacity: 0.55 }}> is </span>
        <span ref={codeketRef} style={{ color: ORANGE }}>codeket</span>
      </h1>
      <img
        ref={logoRef}
        src="/images/logo.png"
        alt="codeket"
        draggable={false}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(48vw, 820px)",
          height: "auto",
          opacity: 0,
          transform: "translate(-50%, -50%) scale(0.55)",
          willChange: "transform, opacity",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
