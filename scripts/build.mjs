import { cpSync, existsSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const nextBin = join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const result = spawnSync(process.execPath, [nextBin, "build"], {
  cwd: process.cwd(),
  stdio: "inherit",
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const exported = join(process.cwd(), "out");
const artifact = join(process.cwd(), "dist");

if (!existsSync(exported)) {
  throw new Error("Next.js static export did not produce the expected out directory.");
}

rmSync(artifact, { recursive: true, force: true });
cpSync(exported, artifact, { recursive: true });
console.log("Static site artifact ready in dist/");
