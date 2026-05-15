// Adds the `./server.js` subpath export to react-router-dom@7.x.
// vite-react-ssg dynamically imports `react-router-dom/server.js` (a v6 entry
// that v7 removed). v7's main entry re-exports the static-router APIs from
// react-router, so pointing `./server.js` at the main entry restores
// compatibility without changing app code.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const pkgPath = resolve(here, "..", "node_modules", "react-router-dom", "package.json");

let pkg;
try {
  pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
} catch (err) {
  if (err.code === "ENOENT") {
    // Package not installed yet (e.g. running before npm install). Skip.
    process.exit(0);
  }
  throw err;
}

if (pkg.exports && pkg.exports["./server.js"]) {
  process.exit(0);
}

pkg.exports = {
  ...pkg.exports,
  "./server.js": {
    node: {
      types: "./dist/index.d.ts",
      "module-sync": "./dist/index.mjs",
      default: "./dist/index.js",
    },
    import: {
      types: "./dist/index.d.mts",
      default: "./dist/index.mjs",
    },
    default: {
      types: "./dist/index.d.ts",
      default: "./dist/index.js",
    },
  },
};

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
console.log("[postinstall] Patched react-router-dom package.json: added ./server.js export.");
