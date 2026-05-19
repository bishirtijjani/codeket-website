import { useEffect, useRef } from "react";
import {
  animate,
  wait,
  nextFrame,
  cancelAnims,
  countUp,
  NAVY,
  ORANGE,
} from "./animUtils";

const STATS = [
  { kind: "count", target: 3, suffix: "", label: "Core products" },
  { kind: "static", display: "< 1 wk", label: "Average onboarding" },
  { kind: "count", target: 2021, suffix: "", label: "Year founded" },
  { kind: "count", target: 100, suffix: "%", label: "In-house team" },
];

export default function Scene4({ playToken, onComplete }) {
  const wrapRef = useRef(null);
  const colRefs = useRef([]);
  const numRefs = useRef([]);
  const labelRefs = useRef([]);
  const underlineRef = useRef(null);

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;

    const run = async () => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      cancelAnims(
        wrap,
        underlineRef.current,
        ...colRefs.current,
        ...numRefs.current,
        ...labelRefs.current,
      );

      wrap.style.opacity = "1";
      wrap.style.transform = "translate(-50%, -50%) scale(1)";
      wrap.style.filter = "none";

      colRefs.current.forEach((c) => {
        if (!c) return;
        c.style.opacity = "0";
        c.style.transform = "translateY(28px)";
      });
      numRefs.current.forEach((n, i) => {
        if (!n) return;
        if (STATS[i].kind === "count") n.textContent = "0";
        else n.textContent = STATS[i].display;
      });
      labelRefs.current.forEach((l) => {
        if (!l) return;
        l.style.opacity = "0";
      });
      if (underlineRef.current) {
        underlineRef.current.style.transform = "scaleX(0)";
        underlineRef.current.style.opacity = "1";
      }

      await nextFrame();
      if (cancelled) return;

      // Reveal each column with a stagger; start counters as the column lands
      const PER_STEP = 220;
      const tasks = STATS.map(async (stat, i) => {
        await wait(i * PER_STEP);
        if (cancelled) return;
        const col = colRefs.current[i];
        const num = numRefs.current[i];
        const lbl = labelRefs.current[i];
        if (!col || !num || !lbl) return;

        animate(
          col,
          [
            { opacity: 0, transform: "translateY(28px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 520, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
        );

        if (stat.kind === "count") {
          await countUp(num, stat.target, 850, { suffix: stat.suffix });
        } else {
          await wait(420);
        }
        if (cancelled) return;

        await animate(
          lbl,
          [
            { opacity: 0, transform: "translateY(6px)" },
            { opacity: 0.7, transform: "translateY(0)" },
          ],
          { duration: 360, easing: "ease-out" },
        );
      });
      await Promise.all(tasks);
      if (cancelled) return;

      await wait(300);

      // Dim & draw the orange underline
      await Promise.all([
        animate(wrap, [{ opacity: 1 }, { opacity: 0.72 }], {
          duration: 380,
          easing: "ease-out",
        }),
        animate(
          underlineRef.current,
          [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
          { duration: 520, easing: "cubic-bezier(0.65, 0, 0.35, 1)" },
        ),
      ]);
      if (cancelled) return;

      await wait(1200);
      if (cancelled) return;

      // Exit
      await Promise.all([
        animate(
          wrap,
          [
            { opacity: 0.72, transform: "translate(-50%, -50%) scale(1)" },
            { opacity: 0, transform: "translate(-50%, -50%) scale(0.96)" },
          ],
          { duration: 480, easing: "ease-in" },
        ),
        animate(
          underlineRef.current,
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 380, easing: "ease-in" },
        ),
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
        ref={wrapRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(1)",
          display: "flex",
          gap: "clamp(20px, 3.5vw, 80px)",
          alignItems: "flex-start",
          willChange: "transform, opacity",
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            ref={(el) => (colRefs.current[i] = el)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              opacity: 0,
              willChange: "transform, opacity",
              minWidth: "min(18vw, 240px)",
            }}
          >
            <div
              ref={(el) => (numRefs.current[i] = el)}
              className="font-display"
              style={{
                color: NAVY,
                fontWeight: 900,
                fontSize: "clamp(2.6rem, 7vw, 9rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {s.kind === "static" ? s.display : "0"}
            </div>
            <div
              ref={(el) => (labelRefs.current[i] = el)}
              className="font-sans"
              style={{
                marginTop: "14px",
                color: NAVY,
                opacity: 0,
                fontSize: "clamp(0.78rem, 1vw, 1.15rem)",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div
        ref={underlineRef}
        style={{
          position: "absolute",
          left: "8vw",
          right: "8vw",
          bottom: "18vh",
          height: "3px",
          backgroundColor: ORANGE,
          transformOrigin: "left center",
          transform: "scaleX(0)",
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
}
