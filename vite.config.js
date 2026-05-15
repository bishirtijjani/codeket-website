import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  base: "/",

  plugins: [react()],

  resolve: {
    alias: {
      "react-router-dom/server.js": fileURLToPath(
        new URL("./src/react-router-dom-server-shim.js", import.meta.url),
      ),
    },
  },
});
