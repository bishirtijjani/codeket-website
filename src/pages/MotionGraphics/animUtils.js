import { useEffect, useState } from "react";

export const NAVY = "#0B1628";
export const NAVY_DEEP = "#0F4C81";
export const ORANGE = "#C2410C";
export const ORANGE_LIGHT = "#EA580C";
export const NAVY_MUTED = "rgba(11, 22, 40, 0.55)";

export const animate = (el, keyframes, options) =>
  el.animate(keyframes, { fill: "forwards", ...options }).finished;

export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export const nextFrame = () =>
  new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

export const cancelAnims = (...els) => {
  els.forEach((el) => {
    if (el) el.getAnimations().forEach((a) => a.cancel());
  });
};

export const countUp = (
  el,
  target,
  duration,
  { suffix = "", prefix = "", separator = false } = {},
) =>
  new Promise((resolve) => {
    const startTime = performance.now();
    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(eased * target);
      const formatted = separator ? value.toLocaleString() : String(value);
      el.textContent = `${prefix}${formatted}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });

// True when viewport is taller than wide. Scenes use this to flip between
// the landscape (1920×1080) and portrait (1080×1920) layouts. SSR-safe.
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
