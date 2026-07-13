#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = path.resolve(new URL("../..", import.meta.url).pathname);
const skillRoot = path.join(repoRoot, "skills/immersive-motion-ui");
const browserReference = path.join(skillRoot, "references/browser-debugging.md");
const evidenceValidator = path.join(skillRoot, "scripts/verify-ui-evidence.mjs");
const target = path.join(repoRoot, "tests/minimal-showcases/commerce-hotel-booking/after.html");
const fixtures = path.join(repoRoot, "tests/browser-evidence/fixtures");
const results = [];

test("activates M08 as an optional browser capability", () => {
  const manifest = JSON.parse(read("capability-manifest.json"));
  const m08 = manifest.capabilities.find((item) => item.id === "M08");
  assert.equal(m08.status, "active");
  assert.equal(m08.default_load, false);
  assert.deepEqual(m08.references, ["references/browser-debugging.md"]);
  assert.deepEqual(m08.planned_references, []);
});

test("routes browser work to a local reference without a required tool", () => {
  const routing = read("references/routing.md");
  const skill = read("SKILL.md");
  assert.match(routing, /\| M08 \| active \| browser debug, console, network \| `browser-debugging\.md`;/);
  assert.match(routing, /browser `NOT EXECUTED` when tooling is absent/);
  assert.match(skill, /browser debug, console, network/);
  assert.match(skill, /references\/browser-debugging\.md/);
});

test("browser reference defines probe, safe boundaries, checks, and fallback", () => {
  assert.equal(fs.existsSync(browserReference), true, "Missing browser-debugging.md");
  const text = fs.readFileSync(browserReference, "utf8");
  for (const term of ["Capability Probe", "snapshot", "screenshot", "console", "horizontal overflow", "first broken boundary", "Write Boundary", "NOT EXECUTED"]) {
    assert.match(text, new RegExp(term, "i"), `Missing ${term}`);
  }
});

test("structured evidence accepts a complete browser PASS", () => {
  const result = verify("complete-pass.json");
  assert.equal(result.status, "PASS", JSON.stringify(result));
  assert.equal(result.findings.length, 0, JSON.stringify(result));
});

test("structured evidence rejects an incomplete browser PASS", () => {
  const run = runValidator("incomplete-pass.json", true);
  assert.equal(run.status, 1, run.stdout || run.stderr);
  const result = JSON.parse(run.stdout);
  assert.equal(result.status, "FAIL");
  assert.equal(result.findings.some((item) => item.code === "browser_evidence_incomplete"), true, JSON.stringify(result));
});

test("minimal browser checker emits validator-compatible evidence", () => {
  const checker = fs.readFileSync(path.join(repoRoot, "tests/minimal-showcases/browser-check.mjs"), "utf8");
  assert.match(checker, /browser-evidence\.json/);
  for (const field of ["desktop_viewport", "mobile_viewport", "console_errors", "horizontal_overflow", "screenshots"]) {
    assert.match(checker, new RegExp(field), `Missing emitted evidence field ${field}`);
  }
});

finish();

function read(relativePath) {
  return fs.readFileSync(path.join(skillRoot, relativePath), "utf8");
}

function verify(name) {
  const run = runValidator(name, false);
  assert.equal(run.status, 0, run.stdout || run.stderr);
  return JSON.parse(run.stdout);
}

function runValidator(name, strict) {
  return spawnSync(process.execPath, [evidenceValidator, target, "--evidence", path.join(fixtures, name), ...(strict ? ["--strict"] : [])], {
    cwd: repoRoot,
    encoding: "utf8",
  });
}

function test(name, fn) {
  try {
    fn();
    results.push({ name, pass: true });
    console.log(`[PASS] ${name}`);
  } catch (error) {
    results.push({ name, pass: false, detail: error.message });
    console.error(`[FAIL] ${name}: ${error.message}`);
  }
}

function finish() {
  const failures = results.filter((item) => !item.pass);
  console.log(JSON.stringify({ status: failures.length ? "FAIL" : "PASS", tests: results.length, failureCount: failures.length }));
  process.exit(failures.length ? 1 : 0);
}
