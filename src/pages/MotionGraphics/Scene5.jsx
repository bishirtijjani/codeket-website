import React, { useEffect, useRef } from "react";
import { Clock, Zap, BellRing, Languages } from "lucide-react";
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
} from "./animUtils";

// VALUE PROPS - four reasons, staggered in as a 2x2 grid.
const PROPS = [
  { Icon: Clock, headline: "Always On", sub: "Answers at 2 PM or 2 AM." },
  { Icon: Zap, headline: "Instant Replies", sub: "No one waits on hold." },
  { Icon: BellRing, headline: "Never Miss a Lead", sub: "Every message gets a reply." },
  { Icon: Languages, headline: "Speaks Their Language", sub: "Warm, clear, on-brand." },
];

export default function Scene5({ playToken, onComplete }) {
  const cardRefs = useRef([]);
  cardRefs.current = [];
  const addCard = (el) => el && cardRefs.current.push(el);

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;
    const run = async () => {
      cancelAnims(...cardRefs.current);
      cardRefs.current.forEach((c) => (c.style.opacity = "0"));
      await nextFrame();
      if (cancelled) return;

      for (let i = 0; i < cardRefs.current.length; i++) {
        if (cancelled) return;
        animate(
          cardRefs.current[i],
          [
            { opacity: 0, transform: "translateY(26px) scale(0.95)" },
            { opacity: 1, transform: "translateY(0) scale(1)" },
          ],
          { duration: 460, easing: EASE_DROP }
        );
        await wait(150);
      }
      if (cancelled) return;
      await wait(2100);
      if (cancelled) return;

      await Promise.all(
        cardRefs.current.map((c) =>
          animate(
            c,
            [
              { opacity: 1, transform: "translateY(0) scale(1)" },
              { opacity: 0, transform: "translateY(-18px) scale(0.98)" },
            ],
            { duration: 340, easing: "ease-in" }
          )
        )
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
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6vh 6vw",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "clamp(1rem, 2.4vw, 2.6rem)",
          width: "min(90vw, 1500px)",
        }}
      >
        {PROPS.map(({ Icon, headline, sub }, i) => (
          <div
            key={i}
            ref={addCard}
            style={{
              opacity: 0,
              background: "#FFFFFF",
              border: "1px solid #EAECF1",
              borderRadius: "clamp(1rem, 1.6vw, 1.6rem)",
              boxShadow: "0 14px 40px rgba(11,22,40,0.07)",
              padding: "clamp(1.3rem, 2.6vw, 2.8rem)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(0.6rem, 1.2vh, 1.1rem)",
            }}
          >
            <Icon
              color={ORANGE}
              strokeWidth={2.2}
              style={{
                width: "clamp(2rem, 3vw, 3.4rem)",
                height: "clamp(2rem, 3vw, 3.4rem)",
              }}
            />
            <div
              className="font-display"
              style={{
                color: NAVY,
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.04,
                fontSize: "clamp(1.5rem, 3vw, 3.4rem)",
              }}
            >
              {headline}
            </div>
            <div
              className="font-sans"
              style={{
                color: NAVY_MUTED,
                fontSize: "clamp(1.1rem, 1.5vw, 1.8rem)",
                lineHeight: 1.4,
              }}
            >
              {sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
