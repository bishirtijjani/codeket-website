import { useCallback, useState } from "react";
import { Helmet } from "react-helmet-async";
import Scene1 from "./Scene1";

export default function MotionGraphics() {
  const [playToken, setPlayToken] = useState(0);
  const [playing, setPlaying] = useState(false);

  const play = useCallback(() => {
    setPlaying(true);
    setPlayToken((t) => t + 1);
  }, []);

  const handleComplete = useCallback(() => {
    setPlaying(false);
  }, []);

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
        {playToken > 0 && (
          <Scene1 playToken={playToken} onComplete={handleComplete} />
        )}

        {!playing && (
          <div className="absolute bottom-8 right-8 z-50 flex items-center gap-3">
            {playToken === 0 ? (
              <div
                className="font-sans text-sm px-3 py-2 rounded-full"
                style={{ color: "#0B1628", opacity: 0.6 }}
              >
                Press play, then start your screen recorder
              </div>
            ) : null}
            <button
              onClick={play}
              className="font-display font-semibold text-sm tracking-wide px-6 py-3 rounded-full text-white shadow-lg transition-colors"
              style={{ backgroundColor: "#0B1628" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#0F4C81")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0B1628")
              }
            >
              {playToken === 0 ? "▶  Play Scene 1" : "↻  Replay"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
