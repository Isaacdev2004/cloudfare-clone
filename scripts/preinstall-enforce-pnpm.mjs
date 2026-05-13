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

/** Block npm/yarn; allow pnpm including v11+ lifecycles that omit `npm_config_user_agent`. */
function isPnpmInstaller() {
  const ua = process.env.npm_config_user_agent ?? "";
  if (/pnpm/i.test(ua)) return true;

  const execPath = process.env.npm_execpath ?? "";
  // Require `pnpm` as a path segment (avoid matching ".../notpnpm/...").
  if (/[/\\]pnpm(\.cjs|\.js|\.mjs)?$/i.test(execPath.replace(/\\/g, "/"))) return true;
  // Definitive npm CLI — do not treat as pnpm even if UA is missing (edge CI).
  if (/npm-cli\.js/i.test(execPath) || /[/\\]npm(?:\.cmd)?$/i.test(execPath)) return false;

  if (process.env.pnpm_command != null && String(process.env.pnpm_command).length > 0) return true;

  const lockPath = path.join(rootDir, "pnpm-lock.yaml");
  // pnpm v11+ may omit npm_config_* in lifecycle; npm almost always sends a non-empty UA.
  if (!ua.trim() && fs.existsSync(lockPath)) return true;

  return false;
}

if (!isPnpmInstaller()) {
  const ua = process.env.npm_config_user_agent ?? "";
  console.error("This workspace must use pnpm (npm/yarn lockfiles are not supported).");
  console.error('Install: https://pnpm.io/installation — then run "pnpm install".');
  if (process.env.CI === "true" || process.env.RENDER === "true") {
    console.error(
      "(CI debug) npm_config_user_agent=%s npm_execpath=%s pnpm_command=%s",
      JSON.stringify(ua),
      JSON.stringify(process.env.npm_execpath ?? ""),
      JSON.stringify(process.env.pnpm_command ?? ""),
    );
  }
  process.exit(1);
}
