import { forwardRef, createElement } from "react";
import * as fm from "framer-motion-original";

const STRIP = new Set([
  "initial",
  "animate",
  "whileInView",
  "viewport",
  "transition",
  "variants",
]);

const clean = (props) => {
  const out = {};
  for (const k in props) if (!STRIP.has(k)) out[k] = props[k];
  return out;
};

const cache = new Map();

export const motion = new Proxy(
  {},
  {
    get(_, tag) {
      if (cache.has(tag)) return cache.get(tag);
      const Original = fm.motion[tag];
      if (!Original) return undefined;
      const Wrapped = forwardRef((props, ref) =>
        createElement(Original, { ...clean(props), ref }),
      );
      Wrapped.displayName = `motion.${String(tag)}`;
      cache.set(tag, Wrapped);
      return Wrapped;
    },
  },
);

export const AnimatePresence = fm.AnimatePresence;
export const MotionConfig = fm.MotionConfig;
export const LazyMotion = fm.LazyMotion;
export const domAnimation = fm.domAnimation;
export const domMax = fm.domMax;
export const useScroll = fm.useScroll;
export const useTransform = fm.useTransform;
export const useInView = fm.useInView;
export const useMotionValue = fm.useMotionValue;
export const useMotionValueEvent = fm.useMotionValueEvent;
export const useAnimation = fm.useAnimation;
export const useAnimationControls = fm.useAnimationControls;
export const useSpring = fm.useSpring;
export const useTime = fm.useTime;
export const useReducedMotion = fm.useReducedMotion;
export const useCycle = fm.useCycle;
