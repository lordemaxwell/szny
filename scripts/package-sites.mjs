import { cpSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const source = join(process.cwd(), ".openai", "hosting.json");
const targetDirectory = join(process.cwd(), "dist", ".openai");
const target = join(targetDirectory, "hosting.json");

mkdirSync(targetDirectory, { recursive: true });
cpSync(source, target);
console.log("Sites metadata copied to dist/.openai/hosting.json");
