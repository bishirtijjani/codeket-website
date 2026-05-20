import { useCallback, useState } from "react";
import { Helmet } from "react-helmet-async";
import Scene1 from "./Scene1";
import Scene2 from "./Scene2";
import Scene3 from "./Scene3";
import Scene4 from "./Scene4";
import Scene5 from "./Scene5";
import Scene6 from "./Scene6";
import Scene7 from "./Scene7";

const SCENES = [
  { n: 1, Component: Scene1, label: "Title" },
  { n: 2, Component: Scene2, label: "Belief" },
  { n: 3, Component: Scene3, label: "Products" },
  { n: 4, Component: Scene4, label: "Numbers" },
  { n: 5, Component: Scene5, label: "Promise" },
  { n: 6, Component: Scene6, label: "Sign-off" },
  { n: 7, Component: Scene7, label: "Visit" },
];

const NAVY = "#0B1628";
const NAVY_DEEP = "#0F4C81";

export default function MotionGraphics() {
  const [sceneIndex, setSceneIndex] = useState(0); // 1-6 while playing, 0 = idle
  const [playToken, setPlayToken] = useState(0);
  const [chaining, setChaining] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);

  const playFull = useCallback(() => {
    setChaining(true);
    setSceneIndex(1);
    setPlayToken((t) => t + 1);
    setHasPlayed(true);
  }, []);

  const playSingle = useCallback((n) => {
    setChaining(false);
    setSceneIndex(n);
    setPlayToken((t) => t + 1);
    setHasPlayed(true);
  }, []);

  const handleComplete = useCallback(() => {
    if (chaining && sceneIndex < SCENES.length) {
      setSceneIndex((s) => s + 1);
      setPlayToken((t) => t + 1);
    } else {
      setSceneIndex(0);
    }
  }, [chaining, sceneIndex]);

  const playing = sceneIndex !== 0;
  const ActiveScene = playing ? SCENES[sceneIndex - 1].Component : null;

  return (
    <>
      <Helmet>
        <title>This is Codeket — Motion Graphics</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div
        className="fixed inset-0 overflow-hidden"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        {ActiveScene && (
          <ActiveScene playToken={playToken} onComplete={handleComplete} />
        )}

        {!playing && (
          <>
            {/* Scene selector — top-left */}
            <div
              className="absolute top-6 left-6 z-50 flex flex-wrap gap-2"
              style={{ maxWidth: "60vw" }}
            >
              <span
                className="font-sans"
                style={{
                  color: NAVY,
                  opacity: 0.5,
                  fontSize: "0.72rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  alignSelf: "center",
                  marginRight: "8px",
                }}
              >
                Review
              </span>
              {SCENES.map((s) => (
                <button
                  key={s.n}
                  onClick={() => playSingle(s.n)}
                  className="font-sans transition-colors"
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    padding: "6px 12px",
                    border: `1px solid ${NAVY}`,
                    borderRadius: "999px",
                    color: NAVY,
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = NAVY;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = NAVY;
                  }}
                >
                  {s.n}. {s.label}
                </button>
              ))}
            </div>

            {/* Play / Replay — bottom-right */}
            <div className="absolute bottom-8 right-8 z-50 flex items-center gap-3">
              {!hasPlayed && (
                <div
                  className="font-sans text-sm px-3 py-2 rounded-full"
                  style={{ color: NAVY, opacity: 0.55 }}
                >
                  Press play, then start your screen recorder
                </div>
              )}
              <button
                onClick={playFull}
                className="font-display font-semibold tracking-wide rounded-full text-white shadow-lg transition-colors"
                style={{
                  backgroundColor: NAVY,
                  fontSize: "0.9rem",
                  padding: "12px 24px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = NAVY_DEEP)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = NAVY)
                }
              >
                {hasPlayed ? "↻  Play full video" : "▶  Play full video"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
