import React, { useEffect, useRef } from "react";
import {
  NAVY,
  ORANGE,
  NAVY_MUTED,
  WHATSAPP,
  WHATSAPP_DEEP,
  WHATSAPP_BG,
  WHATSAPP_BUBBLE_OUT,
  animate,
  wait,
  nextFrame,
  cancelAnims,
  EASE_ENTER,
  EASE_DROP,
  EASE_EXIT,
  useIsPortrait,
} from "./animUtils";

// CAPABILITIES — one live conversation that shows all three jobs at once.
const MESSAGES = [
  { from: "in", text: "Hi! Are you open right now?" },
  { from: "out", text: "Yes — we're open till 9 PM 😊", cap: 0 },
  { from: "in", text: "Any tables for 4 tonight?" },
  { from: "out", text: "We do! Shall I book it for 7:00 PM?", cap: 1 },
  { from: "in", text: "Yes please 🙏" },
  { from: "out", text: "Booked ✅ See you at 7!", cap: 2 },
];

const CAPTIONS = [
  ["Replies in ", "seconds."],
  ["Answers ", "every question."],
  ["Books ", "appointments."],
  ["Always on. ", "24/7."],
];

export default function Scene4({ playToken, onComplete }) {
  const isPortrait = useIsPortrait();
  const phoneRef = useRef(null);
  const capWrapRef = useRef(null);
  const cap1Ref = useRef(null);
  const cap2Ref = useRef(null);
  const bubbleRefs = useRef([]);
  bubbleRefs.current = [];
  const addBubble = (el) => el && bubbleRefs.current.push(el);

  const setCaption = async (i) => {
    if (!capWrapRef.current) return;
    cancelAnims(capWrapRef.current);
    await animate(
      capWrapRef.current,
      [
        { opacity: capWrapRef.current.style.opacity === "0" ? 0 : 1 },
        { opacity: 0, transform: "translateY(-8px)" },
      ],
      { duration: 180, easing: "ease-in" }
    );
    if (cap1Ref.current) cap1Ref.current.textContent = CAPTIONS[i][0];
    if (cap2Ref.current) cap2Ref.current.textContent = CAPTIONS[i][1];
    await animate(
      capWrapRef.current,
      [
        { opacity: 0, transform: "translateY(12px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 360, easing: EASE_ENTER }
    );
  };

  useEffect(() => {
    if (!playToken) return;
    let cancelled = false;
    const run = async () => {
      cancelAnims(phoneRef.current, capWrapRef.current, ...bubbleRefs.current);
      if (phoneRef.current) phoneRef.current.style.opacity = "0";
      if (capWrapRef.current) capWrapRef.current.style.opacity = "0";
      bubbleRefs.current.forEach((b) => (b.style.display = "none"));
      await nextFrame();
      if (cancelled) return;

      await animate(
        phoneRef.current,
        [
          { opacity: 0, transform: "translateY(40px) scale(0.96)" },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ],
        { duration: 520, easing: EASE_DROP }
      );
      if (cancelled) return;
      await wait(220);

      for (let i = 0; i < MESSAGES.length; i++) {
        if (cancelled) return;
        const el = bubbleRefs.current[i];
        if (el) {
          el.style.display = "flex";
          await nextFrame();
          if (cancelled) return;
          await animate(
            el,
            [
              { opacity: 0, transform: "translateY(14px) scale(0.96)" },
              { opacity: 1, transform: "translateY(0) scale(1)" },
            ],
            { duration: 300, easing: EASE_DROP }
          );
        }
        if (cancelled) return;
        if (MESSAGES[i].cap != null) {
          await setCaption(MESSAGES[i].cap);
          if (cancelled) return;
          await wait(560);
        } else {
          await wait(560);
        }
      }
      if (cancelled) return;

      await setCaption(3);
      if (cancelled) return;
      await wait(1900);
      if (cancelled) return;

      await Promise.all([
        animate(
          phoneRef.current,
          [
            { opacity: 1, transform: "translateY(0) scale(1)" },
            { opacity: 0, transform: "translateY(-32px) scale(0.98)" },
          ],
          { duration: 360, easing: EASE_EXIT }
        ),
        animate(
          capWrapRef.current,
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 320, easing: "ease-in" }
        ),
      ]);
      if (cancelled) return;
      onComplete?.();
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [playToken, onComplete, isPortrait]);

  // ── Caption block ──
  const caption = (
    <div
      ref={capWrapRef}
      style={{
        opacity: 0,
        textAlign: isPortrait ? "center" : "left",
        maxWidth: isPortrait ? "min(86vw, 720px)" : "min(34vw, 560px)",
      }}
    >
      <div
        className="font-sans"
        style={{
          textTransform: "uppercase",
          letterSpacing: "0.28em",
          fontSize: "clamp(0.72rem, 1vw, 1.1rem)",
          fontWeight: 600,
          color: NAVY_MUTED,
          marginBottom: "clamp(0.6rem, 1.2vh, 1.1rem)",
        }}
      >
        It just handles it
      </div>
      <div
        className="font-display"
        style={{
          color: NAVY,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          fontSize: isPortrait
            ? "clamp(2rem, 6.4vw, 3.4rem)"
            : "clamp(2rem, 3.6vw, 4.6rem)",
        }}
      >
        <span ref={cap1Ref}>{CAPTIONS[0][0]}</span>
        <span ref={cap2Ref} style={{ color: ORANGE }}>
          {CAPTIONS[0][1]}
        </span>
      </div>
    </div>
  );

  // ── Phone with WhatsApp chat ──
  const phone = (
    <div
      ref={phoneRef}
      style={{
        opacity: 0,
        width: isPortrait ? "min(74vw, 440px)" : "min(26vw, 420px)",
        aspectRatio: "9 / 18.5",
        background: "#0B1628",
        borderRadius: "clamp(1.6rem, 2.4vw, 2.6rem)",
        padding: "clamp(0.5rem, 0.8vw, 0.9rem)",
        boxShadow: "0 30px 80px rgba(11,22,40,0.28)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "clamp(1.1rem, 1.8vw, 2rem)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: WHATSAPP_BG,
        }}
      >
        {/* header */}
        <div
          style={{
            background: WHATSAPP_DEEP,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: "0.6em",
            padding:
              "clamp(0.7rem, 1.1vw, 1.1rem) clamp(0.8rem, 1.2vw, 1.2rem)",
          }}
        >
          <div
            style={{
              width: "clamp(1.7rem, 2.4vw, 2.6rem)",
              height: "clamp(1.7rem, 2.4vw, 2.6rem)",
              borderRadius: "50%",
              background: WHATSAPP,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(0.8rem, 1.1vw, 1.2rem)",
              color: "#063",
            }}
          >
            B
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <div
              className="font-display"
              style={{
                fontWeight: 700,
                fontSize: "clamp(0.85rem, 1.15vw, 1.25rem)",
              }}
            >
              Bella Bistro
            </div>
            <div
              style={{
                fontSize: "clamp(0.62rem, 0.85vw, 0.92rem)",
                opacity: 0.85,
              }}
            >
              online
            </div>
          </div>
        </div>

        {/* messages */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: "clamp(0.4rem, 0.8vh, 0.8rem)",
            padding: "clamp(0.7rem, 1.2vw, 1.2rem)",
            overflow: "hidden",
          }}
        >
          {MESSAGES.map((m, i) => (
            <div
              key={i}
              ref={addBubble}
              style={{
                display: "none",
                justifyContent: m.from === "in" ? "flex-start" : "flex-end",
              }}
            >
              <div
                style={{
                  background: m.from === "in" ? "#FFFFFF" : WHATSAPP_BUBBLE_OUT,
                  color: NAVY,
                  fontFamily: "'Roboto', ui-sans-serif, sans-serif",
                  fontSize: "clamp(0.74rem, 1.05vw, 1.15rem)",
                  lineHeight: 1.3,
                  padding: "0.55em 0.8em",
                  borderRadius:
                    m.from === "in"
                      ? "2px 12px 12px 12px"
                      : "12px 2px 12px 12px",
                  maxWidth: "82%",
                  boxShadow: "0 1px 2px rgba(11,22,40,0.10)",
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: isPortrait ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: isPortrait ? "clamp(1.4rem, 3.5vh, 3rem)" : "clamp(3rem, 6vw, 7rem)",
        padding: isPortrait ? "7vh 6vw" : "0 7vw",
      }}
    >
      {caption}
      {phone}
    </div>
  );
}
