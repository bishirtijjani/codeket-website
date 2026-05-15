import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const framerMotionPkgJson = require.resolve("framer-motion/package.json");
const framerMotionReal = path.resolve(
  path.dirname(framerMotionPkgJson),
  "dist/es/index.mjs",
);

export default defineConfig({
  base: "/",

  plugins: [react()],

  resolve: {
    alias: [
      {
        find: "react-router-dom/server.js",
        replacement: fileURLToPath(
          new URL("./src/react-router-dom-server-shim.js", import.meta.url),
        ),
      },
      {
        find: "framer-motion-original",
        replacement: framerMotionReal,
      },
      {
        find: /^framer-motion$/,
        replacement: fileURLToPath(
          new URL("./src/framer-motion-static-shim.jsx", import.meta.url),
        ),
      },
    ],
  },
});
