import React, { useCallback, useEffect, useRef, useState } from "react";
import { NAVY, NAVY_MUTED, ORANGE } from "./animUtils";
import Scene1 from "./Scene1";
import Scene2 from "./Scene2";
import Scene3 from "./Scene3";
import Scene4 from "./Scene4";
import Scene5 from "./Scene5";
import Scene6 from "./Scene6";
import Scene7 from "./Scene7";
import Scene8 from "./Scene8";

const SCENES = [
  { label: "Hook", Comp: Scene1 },
  { label: "Problem", Comp: Scene2 },
  { label: "Solution", Comp: Scene3 },
  { label: "Conversation", Comp: Scene4 },
  { label: "Why", Comp: Scene5 },
  { label: "Promise", Comp: Scene6 },
  { label: "Sign-off", Comp: Scene7 },
  { label: "Visit", Comp: Scene8 },
];

export default function MotionGraphics() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [playToken, setPlayToken] = useState(0);
  const [renderMode, setRenderMode] = useState(false);

  const idxRef = useRef(0);
  const chainRef = useRef(false);

  useEffect(() => {
    idxRef.current = sceneIndex;
  }, [sceneIndex]);

  const playAll = useCallback(() => {
    chainRef.current = true;
    idxRef.current = 0;
    setSceneIndex(0);
    setPlayToken((t) => t + 1);
  }, []);

  const playOne = useCallback((i) => {
    chainRef.current = false;
    idxRef.current = i;
    setSceneIndex(i);
    setPlayToken((t) => t + 1);
  }, []);

  const handleComplete = useCallback(() => {
    if (!chainRef.current) return;
    if (idxRef.current < SCENES.length - 1) {
      const next = idxRef.current + 1;
      idxRef.current = next;
      setSceneIndex(next);
      setPlayToken((t) => t + 1);
    } else {
      chainRef.current = false;
    }
  }, []);

  // render harness hooks
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.has("render")) setRenderMode(true);
    window.__playMotion = playAll;
    return () => {
      delete window.__playMotion;
    };
  }, [playAll]);

  const Active = SCENES[sceneIndex].Comp;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "#FFFFFF",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      <Active
        key={sceneIndex}
        playToken={playToken}
        onComplete={handleComplete}
      />

      {!renderMode && (
        <div
          data-mg-controls
          style={{
            position: "fixed",
            left: "50%",
            bottom: "18px",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "94vw",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(8px)",
            border: "1px solid #E5E7EB",
            borderRadius: "14px",
            padding: "8px 10px",
            boxShadow: "0 8px 30px rgba(11,22,40,0.12)",
            fontFamily: "'Roboto', ui-sans-serif, sans-serif",
          }}
        >
          <button
            onClick={playAll}
            style={{
              background: ORANGE,
              color: "#fff",
              border: "none",
              borderRadius: "9px",
              padding: "8px 14px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            ▶ Play full video
          </button>
          {SCENES.map((s, i) => (
            <button
              key={i}
              onClick={() => playOne(i)}
              style={{
                background: i === sceneIndex ? NAVY : "transparent",
                color: i === sceneIndex ? "#fff" : NAVY_MUTED,
                border: "1px solid #E5E7EB",
                borderRadius: "9px",
                padding: "6px 10px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              {i + 1}. {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
