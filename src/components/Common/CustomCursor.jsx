import React, { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch-primary devices and bail out entirely
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isMobile = hasCoarsePointer && !hasFinePointer;

    if (isMobile) {
      setIsTouchDevice(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.style.cursor = "none";

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      rafId = requestAnimationFrame(animateRing);
    };

    const onMouseOver = (e) => {
      if (
        e.target.closest("a, button, [role='button'], input, textarea, select")
      ) {
        setIsHovering(true);
      }
    };
    const onMouseOut = () => setIsHovering(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafId);
      // Restore the default cursor when the component unmounts
      document.documentElement.style.cursor = "";
    };
  }, []);

  // Don't render anything on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* SVG arrow pointer — snappy, positioned at tip */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] transition-transform duration-75"
        style={{ top: 0, left: 0 }}
      >
        <svg
          width={isHovering ? "28" : "22"}
          height={isHovering ? "32" : "26"}
          viewBox="0 0 22 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transition: "width 0.15s, height 0.15s" }}
        >
          {/* Arrow pointer shape — tip at top-left (0,0) */}
          <path
            d="M2 2L2 20L7.5 15.5L11 23L14 21.5L10.5 14H18L2 2Z"
            fill={isHovering ? "#C2410C" : "#0F4C81"}
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Trailing ring — lags behind for feel */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-200"
        style={{
          width: isHovering ? "40px" : "28px",
          height: isHovering ? "40px" : "28px",
          borderColor: isHovering ? "#C2410C" : "#0F4C8155",
          background: isHovering ? "rgba(194,65,12,0.07)" : "transparent",
        }}
      />
    </>
  );
};

export default CustomCursor;
