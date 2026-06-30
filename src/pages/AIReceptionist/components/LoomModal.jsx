import React, { useEffect } from "react";
import { X } from "lucide-react";

/**
 * Lightweight modal that embeds a portrait Loom video (phone screen aspect).
 *
 * Uses plain conditional rendering instead of AnimatePresence + motion.div.
 * The project's framer-motion shim strips animation props, which made
 * AnimatePresence fail to mount its child. Plain divs render reliably.
 *
 * SSR-safe: useEffect (window.addEventListener) only runs client-side.
 */
const LoomModal = ({ open, onClose, url }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[320px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close demo video"
          className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
          {/* If url is the placeholder, render a friendly fallback panel */}
          {url && url.startsWith("[") ? (
            <div className="flex items-center justify-center text-white text-center px-6 py-24">
              <div>
                <div className="text-sm uppercase tracking-widest text-white/40 mb-2">
                  Demo video
                </div>
                <div className="text-lg font-semibold">
                  Loom URL goes here
                </div>
                <div className="text-sm text-white/60 mt-1">
                  Replace <code className="text-white/80">LOOM_URL</code> in{" "}
                  <code className="text-white/80">data.js</code>.
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src={url}
              title="WhatsApp AI Receptionist demo"
              frameBorder="0"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowFullScreen
              className="w-full block aspect-[9/16] max-h-[85vh]"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoomModal;
