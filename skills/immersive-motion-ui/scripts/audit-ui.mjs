#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const help = args.includes("--help") || args.includes("-h");
const strict = args.includes("--strict");
const pretty = args.includes("--pretty");
const targets = args.filter((arg) => !arg.startsWith("-"));

const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  ".next",
  "coverage",
  ".turbo",
  ".cache",
]);

const EXTENSIONS = new Set([
  ".html",
  ".htm",
  ".css",
  ".scss",
  ".js",
  ".mjs",
  ".cjs",
  ".jsx",
  ".ts",
  ".tsx",
  ".mdx",
  ".vue",
  ".svelte",
]);

if (help) {
  console.log(`Usage: node scripts/audit-ui.mjs <file-or-directory> [--strict] [--pretty]

Scans UI source files for machine-detectable generic/fragile UI signals.
Default exits 0 and prints JSON. --strict exits 1 when P0/P1 findings exist.`);
  process.exit(0);
}

const roots = targets.length ? targets : [process.cwd()];
const files = roots.flatMap((target) => collectFiles(path.resolve(target)));
const findings = files.flatMap((file) => scanFile(file));
const counts = countBySeverity(findings);
const status = findings.length === 0 ? "PASS" : strict && (counts.P0 || counts.P1) ? "FAIL" : "PASS_WITH_FINDINGS";

const report = {
  status,
  strict,
  scannedFiles: files.length,
  findingsCount: findings.length,
  counts,
  findings,
};

console.log(JSON.stringify(report, null, pretty ? 2 : 0));
process.exit(strict && (counts.P0 || counts.P1) ? 1 : 0);

function collectFiles(target) {
  if (!fs.existsSync(target)) return [];
  const stat = fs.statSync(target);
  if (stat.isFile()) return shouldScan(target) ? [target] : [];
  if (!stat.isDirectory()) return [];

  const output = [];
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) continue;
    const next = path.join(target, entry.name);
    if (entry.isDirectory()) output.push(...collectFiles(next));
    if (entry.isFile() && shouldScan(next)) output.push(next);
  }
  return output;
}

function shouldScan(file) {
  return EXTENSIONS.has(path.extname(file)) && safeSize(file);
}

function safeSize(file) {
  try {
    return fs.statSync(file).size <= 800_000;
  } catch {
    return false;
  }
}

function scanFile(file) {
  if (path.basename(file) === "audit-ui.mjs" || path.basename(file) === "verify-ui-evidence.mjs") return [];
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);
  const findings = [];

  addRegexFindings(findings, file, lines, /\b(Elevate|Seamless|Unleash|Cutting-edge|Harness the power)\b/gi, {
    severity: "P2",
    rule: "ai-marker-copy",
    message: "AI-marker marketing copy detected.",
    fix: "Replace vague copy with domain-specific nouns, actions, or constraints.",
  });

  addRegexFindings(findings, file, lines, /\b(John Doe|VIRALMEDIA|ClearInvoice)\b/g, {
    severity: "P1",
    rule: "template-leak",
    message: "Template or placeholder brand/person name detected.",
    fix: "Replace template identifiers with project-specific content.",
  });

  addRegexFindings(findings, file, lines, /#[fF]{3,6}\b|#[0]{3,6}\b/g, {
    severity: "P2",
    rule: "pure-black-white",
    message: "Pure black or white token detected.",
    fix: "Use intentional near-black/near-white tokens unless strict contrast requires pure values.",
  });

  addRegexFindings(findings, file, lines, /border(?:Color)?\s*[:=]\s*["']?#333\b|border-[^"'\s]*#333\b|border:\s*[^;]*#333\b/gi, {
    severity: "P2",
    rule: "hard-333-border",
    message: "Hard #333 border detected.",
    fix: "Use system border tokens or context-aware contrast instead of default hard borders.",
  });

  addRegexFindings(findings, file, lines, /\b(bg-clip-text|background-clip:\s*text|-webkit-background-clip:\s*text|text-transparent)\b/gi, {
    severity: "P2",
    rule: "gradient-text-flourish",
    message: "Gradient text flourish detected.",
    fix: "Use gradient text only when it carries a specific brand or information purpose.",
  });

  addRegexFindings(findings, file, lines, /(?:gradient|blur|blob|orb).{0,48}(?:hero|background|absolute)|(?:hero|background|absolute).{0,48}(?:gradient|blur|blob|orb)/gi, {
    severity: "P2",
    rule: "generic-atmospheric-decoration",
    message: "Generic gradient/blur/blob/orb decoration detected.",
    fix: "Prefer subject-specific imagery, layout, material, or interaction over atmospheric filler.",
  });

  const hasMotion = /\b(animation|animate-|transition-|transition:|@keyframes|motion\.|gsap|framer-motion|parallax|scrollTrigger|requestAnimationFrame)\b/i.test(text);
  const hasReducedMotion = /prefers-reduced-motion/i.test(text);
  if (hasMotion && !hasReducedMotion) {
    findings.push({
      severity: "P1",
      rule: "missing-reduced-motion",
      file,
      line: 1,
      message: "Motion signals detected without prefers-reduced-motion fallback.",
      fix: "Add a reduced-motion path for continuous, large, or attention-grabbing motion.",
    });
  }

  const claimsVerified = /\b(PASS|verified|verification passed|no issues found)\b/i.test(text);
  const hasEvidence = /\b(exit code|screenshot|console|viewport|build command|inspected URL|NOT EXECUTED)\b/i.test(text);
  if (claimsVerified && !hasEvidence) {
    findings.push({
      severity: "P1",
      rule: "verification-without-evidence",
      file,
      line: 1,
      message: "Verification success appears to be claimed without observable evidence.",
      fix: "Report commands, exit codes, screenshots, console status, viewport checks, or NOT EXECUTED.",
    });
  }

  return findings;
}

function addRegexFindings(findings, file, lines, regex, details) {
  lines.forEach((lineText, index) => {
    regex.lastIndex = 0;
    if (!regex.test(lineText)) return;
    findings.push({
      severity: details.severity,
      rule: details.rule,
      file,
      line: index + 1,
      message: details.message,
      fix: details.fix,
    });
  });
}

function countBySeverity(findings) {
  return findings.reduce(
    (acc, finding) => {
      acc[finding.severity] += 1;
      return acc;
    },
    { P0: 0, P1: 0, P2: 0 },
  );
}
