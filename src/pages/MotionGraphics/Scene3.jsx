import { useEffect, useRef } from "react";
import { animate, wait, nextFrame, cancelAnims, NAVY, ORANGE } from "./animUtils";

const PRODUCTS = [
  { title: "Inventory", sub: "for supermarkets & retail" },
  { title: "School Management", sub: "for serious private schools" },
  { title: "Virtual Tours", sub: "branded 360° for real estate" },
];

export default function Scene3({ playToken, onComplete }) {
  const headlineRef = useRef(null);
  const cardsWrapRef = useRef(null);
  const cardRefs = useRef([]);
  const barRefs = useRef([]);

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;

    const run = async () => {
      const headline = headlineRef.current;
      const cardsWrap = cardsWrapRef.current;
      if (!headline || !cardsWrap) return;

      cancelAnims(headline, cardsWrap, ...cardRefs.current, ...barRefs.current);

      headline.style.opacity = "0";
      headline.style.filter = "blur(18px)";
      headline.style.transform = "translate(-50%, -50%) translateY(0vh) scale(1.35)";
      cardsWrap.style.opacity = "1";
      cardsWrap.style.transform = "translate(-50%, 0) scale(1)";
      cardRefs.current.forEach((c) => {
        if (!c) return;
        c.style.opacity = "0";
        c.style.transform = "translateY(56px)";
      });
      barRefs.current.forEach((b) => {
        if (!b) return;
        b.style.transform = "scaleX(0)";
      });

      await nextFrame();
      if (cancelled) return;

      // Headline enters big and centered
      await animate(
        headline,
        [
          {
            opacity: 0,
            filter: "blur(18px)",
            transform: "translate(-50%, -50%) translateY(0vh) scale(1.35)",
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            transform: "translate(-50%, -50%) translateY(0vh) scale(1)",
          },
        ],
        { duration: 620, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      );
      if (cancelled) return;

      await wait(700);
      if (cancelled) return;

      // Headline shrinks and moves up
      await animate(
        headline,
        [
          { transform: "translate(-50%, -50%) translateY(0vh) scale(1)" },
          { transform: "translate(-50%, -50%) translateY(-32vh) scale(0.42)" },
        ],
        { duration: 640, easing: "cubic-bezier(0.65, 0, 0.35, 1)" },
      );
      if (cancelled) return;

      // Cards slide up, staggered
      await Promise.all(
        cardRefs.current.map(async (card, i) => {
          if (!card) return;
          await wait(i * 130);
          if (cancelled) return;
          await animate(
            card,
            [
              { opacity: 0, transform: "translateY(56px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 520, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
          );
        }),
      );
      if (cancelled) return;

      await wait(120);

      // Orange accent bars grow
      await Promise.all(
        barRefs.current.map(async (bar, i) => {
          if (!bar) return;
          await wait(i * 110);
          if (cancelled) return;
          await animate(
            bar,
            [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
            { duration: 480, easing: "cubic-bezier(0.65, 0, 0.35, 1)" },
          );
        }),
      );
      if (cancelled) return;

      await wait(1500);
      if (cancelled) return;

      // Exit — scale down and fade
      await Promise.all([
        animate(
          headline,
          [
            { opacity: 1, transform: "translate(-50%, -50%) translateY(-32vh) scale(0.42)" },
            { opacity: 0, transform: "translate(-50%, -50%) translateY(-32vh) scale(0.3)" },
          ],
          { duration: 480, easing: "ease-in" },
        ),
        animate(
          cardsWrap,
          [
            { transform: "translate(-50%, 0) scale(1)", opacity: 1 },
            { transform: "translate(-50%, 0) scale(0.82)", opacity: 0 },
          ],
          { duration: 520, easing: "cubic-bezier(0.7, 0, 0.84, 0)" },
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
      <h2
        ref={headlineRef}
        className="font-display whitespace-nowrap"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) translateY(0vh) scale(1.35)",
          color: NAVY,
          fontWeight: 900,
          fontSize: "clamp(2.4rem, 6vw, 7.5rem)",
          letterSpacing: "-0.03em",
          opacity: 0,
          willChange: "transform, opacity, filter",
        }}
      >
        We build three things
        <span style={{ color: ORANGE }}>.</span>
      </h2>

      <div
        ref={cardsWrapRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, 0) scale(1)",
          display: "flex",
          gap: "clamp(16px, 2.2vw, 36px)",
          willChange: "transform, opacity",
        }}
      >
        {PRODUCTS.map((p, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            style={{
              position: "relative",
              width: "min(24vw, 320px)",
              minWidth: "200px",
              border: `1.5px solid ${NAVY}`,
              borderRadius: "14px",
              padding: "clamp(20px, 2vw, 36px) clamp(18px, 1.8vw, 32px)",
              paddingTop: "clamp(28px, 2.4vw, 44px)",
              backgroundColor: "#FFFFFF",
              opacity: 0,
              willChange: "transform, opacity",
              overflow: "hidden",
            }}
          >
            <div
              ref={(el) => (barRefs.current[i] = el)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "5px",
                backgroundColor: ORANGE,
                transformOrigin: "left center",
                transform: "scaleX(0)",
                willChange: "transform",
              }}
            />
            <div
              className="font-display"
              style={{
                color: NAVY,
                fontWeight: 800,
                fontSize: "clamp(1.2rem, 2.1vw, 2.6rem)",
                marginBottom: "10px",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              {p.title}
            </div>
            <div
              className="font-sans"
              style={{
                color: NAVY,
                opacity: 0.6,
                fontSize: "clamp(0.78rem, 1vw, 1.15rem)",
                lineHeight: 1.4,
              }}
            >
              {p.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
