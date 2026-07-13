#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const pretty = args.includes("--pretty");
const query = readOption("--query") || args.find((arg) => !arg.startsWith("--")) || "";
const limit = Number(readOption("--limit") || 5);
const kind = readOption("--kind");
const availableOnly = args.includes("--available-only");
const includePending = args.includes("--include-pending");
const libraryRoot = path.resolve(readOption("--library") || defaultLibraryPath());

if (!query.trim()) {
  console.error("Usage: node query-library.mjs --query <text> [--library path] [--limit 5] [--pretty]");
  process.exit(2);
}

if (!fs.existsSync(libraryRoot)) {
  print({
    status: "LIBRARY_NOT_FOUND",
    libraryRoot,
    query,
    results: [],
    note: "Use Core-only mode. The optional MotionSites Library is not required.",
  });
  process.exit(0);
}

const manifestPath = path.join(libraryRoot, "library-manifest.json");
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : null;
const libraryQueryScript = path.join(libraryRoot, "scripts/query-catalog.mjs");

if (fs.existsSync(libraryQueryScript)) {
  const forwardedArgs = args.includes("--library") || args.some((arg) => arg.startsWith("--library=")) ? args : [...args, "--library", libraryRoot];
  const run = spawnSync(process.execPath, [libraryQueryScript, ...forwardedArgs], { encoding: "utf8" });
  if (run.stdout) process.stdout.write(run.stdout);
  if (run.stderr) process.stderr.write(run.stderr);
  process.exit(run.status ?? 1);
}

const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
const catalogPath = manifest?.catalog?.path ? path.join(libraryRoot, manifest.catalog.path) : null;
const catalog = catalogPath && fs.existsSync(catalogPath) ? readJsonl(catalogPath) : null;
const files = catalog ? [] : collectMarkdown(libraryRoot, ["prompts", "pro-prompts", "references-index"]);
const results = catalog
  ? catalog
      .filter((item) => !kind || item.kind === kind)
      .filter((item) => availableOnly ? item.availability?.state === "staged" : includePending ? item.availability?.state !== "missing" : item.availability?.state === "staged")
      .map((item) => scoreCatalogItem(item, terms))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
      .slice(0, limit)
  : files.map((file) => scoreFile(file, terms)).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || a.path.localeCompare(b.path)).slice(0, limit);

print({
  status: "PASS",
  libraryRoot,
  query,
  manifest: manifest
    ? {
        package: manifest.package,
        required_by_core: manifest.relationship_to_core?.required_by_core ?? null,
        schema_version: manifest.schema_version ?? null,
        inventory: manifest.inventory ?? null,
      }
    : null,
  searchMode: catalog ? "catalog-v1" : "legacy-markdown",
  availabilityScope: availableOnly || !includePending ? "staged-only" : "staged-and-pending-transfer",
  searchedItems: catalog?.length ?? files.length,
  results,
});

function readJsonl(file) {
  return fs.readFileSync(file, "utf8").split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
}

function scoreCatalogItem(item, terms) {
  const title = item.title.toLowerCase();
  const tags = (item.tags || []).join(" ").toLowerCase();
  const guidance = [...(item.use_when || []), item.description || ""].join(" ").toLowerCase();
  let score = 0;
  for (const term of terms) {
    if (title.includes(term)) score += 8;
    if (tags.includes(term)) score += 5;
    const matches = guidance.match(new RegExp(escapeRegExp(term), "g"));
    if (matches) score += matches.length * 2;
  }
  return {
    id: item.id,
    kind: item.kind,
    title: item.title,
    score,
    description: item.description,
    use_when: item.use_when,
    avoid_when: item.avoid_when,
    tags: item.tags,
    availability: item.availability,
    quality: item.quality,
    relations: item.relations || [],
  };
}

function readOption(name) {
  const equalForm = args.find((item) => item.startsWith(`${name}=`));
  if (equalForm) return equalForm.slice(name.length + 1);
  const index = args.indexOf(name);
  if (index === -1) return null;
  return args[index + 1] || null;
}

function defaultLibraryPath() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const skillRoot = path.resolve(scriptDir, "..");
  const packageRoot = path.resolve(skillRoot, "../..");
  return path.resolve(packageRoot, "..", "immersive-motion-ui-library");
}

function collectMarkdown(root, dirs) {
  const output = [];
  for (const dir of dirs) {
    const full = path.join(root, dir);
    if (!fs.existsSync(full)) continue;
    output.push(...walk(full).filter((file) => file.endsWith(".md")));
  }
  return output.sort();
}

function walk(root) {
  const output = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const next = path.join(root, entry.name);
    if (entry.isDirectory()) output.push(...walk(next));
    if (entry.isFile()) output.push(next);
  }
  return output;
}

function scoreFile(file, terms) {
  const text = fs.readFileSync(file, "utf8");
  const lower = text.toLowerCase();
  const title = path.basename(file, ".md");
  let score = 0;
  for (const term of terms) {
    if (title.toLowerCase().includes(term)) score += 5;
    const matches = lower.match(new RegExp(escapeRegExp(term), "g"));
    if (matches) score += matches.length;
  }
  return {
    path: path.relative(libraryRoot, file),
    score,
    title,
    snippet: snippet(text, terms),
  };
}

function snippet(text, terms) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  const found = lines.find((line) => terms.some((term) => line.toLowerCase().includes(term)));
  return (found || lines[0] || "").slice(0, 240);
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function print(value) {
  console.log(JSON.stringify(value, null, pretty ? 2 : 0));
}
