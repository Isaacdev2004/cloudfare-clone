/**
 * Cross-platform replacement for Unix `sh` preinstall (Windows has no `sh` by default).
 * Removes npm/yarn lockfiles at repo root and refuses non-pnpm installers.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

for (const name of ["package-lock.json", "yarn.lock"]) {
  const p = path.join(rootDir, name);
  try {
    fs.unlinkSync(p);
  } catch (e) {
    const code = /** @type {NodeJS.ErrnoException} */ (e).code;
    if (code !== "ENOENT") throw e;
  }
}

const ua = process.env.npm_config_user_agent ?? "";
if (!ua.includes("pnpm")) {
  console.error("This workspace must use pnpm (npm/yarn lockfiles are not supported).");
  console.error('Install: https://pnpm.io/installation — then run "pnpm install".');
  process.exit(1);
}
