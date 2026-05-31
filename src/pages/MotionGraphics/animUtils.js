import { useEffect, useState } from "react";

// ── Brand system ──────────────────────────────────────────────
export const NAVY = "#0B1628"; // default text everywhere
export const NAVY_DEEP = "#0F4C81"; // hover / deep accent
export const ORANGE = "#C2410C"; // the accent
export const ORANGE_LIGHT = "#EA580C"; // reserved
export const NAVY_MUTED = "rgba(11, 22, 40, 0.55)"; // subdued small text

// WhatsApp identity colours — used ONLY inside the chat mockup so the
// scene reads instantly as "WhatsApp". All headline/brand type stays
// navy + orange per the brand system.
export const WHATSAPP = "#25D366";
export const WHATSAPP_DEEP = "#075E54";
export const WHATSAPP_BG = "#ECE5DD";
export const WHATSAPP_BUBBLE_OUT = "#D9FDD3";

// ── Animation helpers ─────────────────────────────────────────
export const animate = (el, keyframes, options = {}) => {
  if (!el) return Promise.resolve();
  const anim = el.animate(keyframes, { fill: "forwards", ...options });
  return anim.finished.catch(() => {});
};

export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// double-rAF — wait for layout to settle after a style reset
export const nextFrame = () =>
  new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

export const cancelAnims = (...els) => {
  els.forEach((el) => {
    if (!el || !el.getAnimations) return;
    el.getAnimations().forEach((a) => a.cancel());
  });
};

// animated number → text content, out-cubic easing
export const countUp = (el, target, ms = 1200, opts = {}) => {
  const { prefix = "", suffix = "", separator = "" } = opts;
  return new Promise((resolve) => {
    if (!el) return resolve();
    const start = performance.now();
    const fmt = (n) => {
      let s = Math.round(n).toString();
      if (separator) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return prefix + s + suffix;
    };
    const tick = (now) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt(target * eased);
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });
};

// ── Orientation hook (SSR-safe) ───────────────────────────────
export const useIsPortrait = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  useEffect(() => {
    const check = () => setIsPortrait(window.innerHeight > window.innerWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isPortrait;
};

// ── Shared easing curves ──────────────────────────────────────
export const EASE_ENTER = "cubic-bezier(0.16, 1, 0.3, 1)"; // confident enter
export const EASE_DROP = "cubic-bezier(0.22, 1.1, 0.36, 1)"; // bouncy drop-in
export const EASE_EXIT = "cubic-bezier(0.7, 0, 0.84, 0)"; // quick exit
