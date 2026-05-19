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

export const countUp = (el, target, duration, { suffix = "", prefix = "" } = {}) =>
  new Promise((resolve) => {
    const startTime = performance.now();
    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(eased * target);
      el.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });
