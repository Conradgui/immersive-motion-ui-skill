#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const pretty = args.includes("--pretty");
const target = readOption("--target") || args.find((arg) => !arg.startsWith("--"));
const evidencePath = readOption("--evidence");
const strict = args.includes("--strict");

if (!target) {
  console.error("Usage: node verify-ui-evidence.mjs <file-or-directory> [--evidence evidence.json] [--strict] [--pretty]");
  process.exit(2);
}

const resolvedTarget = path.resolve(target);
const skillRoot = path.resolve(new URL("..", import.meta.url).pathname);
const auditScript = path.join(skillRoot, "scripts", "audit-ui.mjs");

const audit = runJson(process.execPath, [auditScript, resolvedTarget, "--pretty"]);
const suppliedEvidence = evidencePath ? readEvidence(path.resolve(evidencePath)) : null;
const browser = normalizeBrowserEvidence(suppliedEvidence?.browser);
const motion = normalizeMotionEvidence(suppliedEvidence?.motion);
const build = suppliedEvidence?.build || { status: "NOT EXECUTED", reason: "No build evidence supplied." };

const findings = [];
if (audit.exitCode !== 0) findings.push(finding("P1", "static_audit_failed", "audit-ui.mjs exited non-zero"));
if (!suppliedEvidence) findings.push(finding("P2", "browser_evidence_missing", "No external browser evidence JSON supplied."));
if (!["PASS", "PASS WITH FINDINGS", "FAIL", "NOT EXECUTED"].includes(browser.status)) {
  findings.push(finding("P1", "browser_status_invalid", `Unknown browser status: ${browser.status}`));
}
const browserEvidenceGaps = browser.status === "PASS" ? incompleteBrowserPassFields(browser) : [];
if (browserEvidenceGaps.length) {
  findings.push(finding("P1", "browser_evidence_incomplete", `Browser PASS is missing: ${browserEvidenceGaps.join(", ")}`));
}
if (browser.status === "NOT EXECUTED") findings.push(finding("P2", "browser_not_executed", browser.reason));
if (browser.status === "PASS WITH FINDINGS") findings.push(finding("P2", "browser_pass_with_findings", browser.reason || "Browser inspection reported non-blocking findings."));
if (browser.status === "FAIL") findings.push(finding("P1", "browser_failed", browser.reason || "Browser inspection reported a failure."));
if (motion.has_motion === true && motion.reduced_motion_result === "NOT EXECUTED") {
  findings.push(finding("P1", "reduced_motion_not_executed", "Motion was present but reduced-motion behavior was not verified."));
}

const hasBlocking = findings.some((item) => item.severity === "P0" || item.severity === "P1");
const report = {
  status: hasBlocking ? "FAIL" : findings.length ? "PASS_WITH_FINDINGS" : "PASS",
  target: resolvedTarget,
  strict,
  build,
  static_audit: {
    command: `${process.execPath} ${auditScript} ${resolvedTarget} --pretty`,
    exitCode: audit.exitCode,
    status: audit.data?.status || "NOT EXECUTED",
    findingsCount: audit.data?.findingsCount ?? null,
    counts: audit.data?.counts || null,
  },
  browser,
  browserEvidenceGaps,
  motion,
  findings,
};

console.log(JSON.stringify(report, null, pretty ? 2 : 0));
process.exit(strict && hasBlocking ? 1 : 0);

function readOption(name) {
  const equalForm = args.find((item) => item.startsWith(`${name}=`));
  if (equalForm) return equalForm.slice(name.length + 1);
  const index = args.indexOf(name);
  if (index === -1) return null;
  return args[index + 1] || null;
}

function runJson(command, commandArgs) {
  const result = spawnSync(command, commandArgs, { encoding: "utf8" });
  let data = null;
  try {
    data = JSON.parse(result.stdout || "{}");
  } catch {
    data = { parseError: true, stdout: result.stdout, stderr: result.stderr };
  }
  return { exitCode: result.status ?? 1, data };
}

function readEvidence(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function normalizeBrowserEvidence(input) {
  if (!input) return { status: "NOT EXECUTED", reason: "No browser evidence supplied." };
  return {
    status: input.status || "NOT EXECUTED",
    url_or_file: input.url_or_file || null,
    desktop_viewport: input.desktop_viewport || "NOT EXECUTED",
    mobile_viewport: input.mobile_viewport || "NOT EXECUTED",
    console_errors: input.console_errors ?? "NOT EXECUTED",
    horizontal_overflow: input.horizontal_overflow || "NOT EXECUTED",
    screenshots: input.screenshots || [],
    reason: input.reason || null,
  };
}

function normalizeMotionEvidence(input) {
  if (!input) return { has_motion: null, reduced_motion_result: "NOT EXECUTED", reason: "No motion evidence supplied." };
  return {
    has_motion: input.has_motion ?? null,
    reduced_motion_result: input.reduced_motion_result || "NOT EXECUTED",
    reason: input.reason || null,
  };
}

function incompleteBrowserPassFields(browser) {
  const missing = [];
  if (!hasEvidenceValue(browser.url_or_file)) missing.push("url_or_file");
  if (!hasEvidenceValue(browser.desktop_viewport)) missing.push("desktop_viewport");
  if (!hasEvidenceValue(browser.mobile_viewport)) missing.push("mobile_viewport");
  if (!Number.isInteger(browser.console_errors) || browser.console_errors < 0) missing.push("console_errors");
  if (!hasEvidenceValue(browser.horizontal_overflow)) missing.push("horizontal_overflow");
  if (!Array.isArray(browser.screenshots) || browser.screenshots.length < 2) missing.push("screenshots");
  return missing;
}

function hasEvidenceValue(value) {
  return typeof value === "string" && value.trim() !== "" && value !== "NOT EXECUTED";
}

function finding(severity, code, message) {
  return { severity, code, message };
}
