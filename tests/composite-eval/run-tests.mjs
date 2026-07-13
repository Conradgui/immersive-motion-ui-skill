#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(new URL("../..", import.meta.url).pathname);
const skillRoot = path.join(repoRoot, "skills/immersive-motion-ui");
const taskSetPath = path.join(repoRoot, "tests/composite-eval/fixtures/b11-task-set.json");
const taskSet = JSON.parse(fs.readFileSync(taskSetPath, "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(skillRoot, "capability-manifest.json"), "utf8"));
const results = [];

test("uses exactly two frozen rounds and nine unique tasks", () => {
  assert.equal(taskSet.rounds.length, 2);
  assert.equal(taskSet.tasks.length, 9);
  assert.equal(new Set(taskSet.tasks.map((task) => task.id)).size, taskSet.tasks.length);
  assert.equal(taskSet.frozen_on, "2026-07-13");
});

test("covers every in-scope Core task family", () => {
  const coverage = new Set(taskSet.tasks.flatMap((task) => task.coverage));
  for (const family of ["brand", "product", "commerce", "data", "audit", "redesign", "performance", "memory", "a11y", "guiding-input"]) assert.ok(coverage.has(family), `Missing ${family}`);
});

test("keeps baseline, Core, Library, and optional specialist tracks explicit", () => {
  assert.deepEqual(taskSet.tracks, ["baseline", "core-only", "core-plus-library", "specialist-reference-optional"]);
});

test("does not restore deferred integration scope", () => {
  const text = JSON.stringify(taskSet).toLowerCase();
  for (const term of ["firebase", "chrome extension", "manifest v3", "firestore"]) assert.equal(text.includes(term), false, `Deferred scope leaked: ${term}`);
});

test("M15 exposes the frozen evaluation protocol without a planned placeholder", () => {
  const m15 = manifest.capabilities.find((item) => item.id === "M15");
  assert.ok(m15.references.includes("references/eval-protocol.md"));
  assert.equal(m15.planned_references.includes("references/eval-protocol.md"), false);
  assert.equal(fs.existsSync(path.join(skillRoot, "references/eval-protocol.md")), true);
});

finish();

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
  const failures = results.filter((result) => !result.pass);
  console.log(JSON.stringify({ status: failures.length ? "FAIL" : "PASS", tests: results.length, failureCount: failures.length }));
  process.exit(failures.length ? 1 : 0);
}
