#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(new URL(".", import.meta.url).pathname);
const read = (name) => JSON.parse(fs.readFileSync(path.join(root, "fixtures", name), "utf8"));
const all = [...read("development-v1.json").items, ...read("holdout-v1.json").items];
const results = [];

test("frozen fixtures validate", () => {
  const run = spawnSync(process.execPath, [path.join(root, "validate-fixtures.mjs")], { encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr || run.stdout);
});

test("fixtures are disjoint", () => {
  assert.equal(new Set(all.map((item) => item.id)).size, 72);
  assert.equal(new Set(all.map((item) => item.prompt)).size, 72);
});

test("scorer handles two complete prediction files", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "trigger-eval-"));
  const predictions = all.map((item) => ({ id: item.id, predicted_role: item.expected_role }));
  const first = path.join(directory, "first.json"); const second = path.join(directory, "second.json"); const output = path.join(directory, "report.md");
  fs.writeFileSync(first, JSON.stringify(predictions)); fs.writeFileSync(second, JSON.stringify(predictions));
  const run = spawnSync(process.execPath, [path.join(root, "score.mjs"), "--predictions", first, "--predictions", second, "--output", output], { encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr || run.stdout);
  const report = JSON.parse(run.stdout);
  assert.equal(report.evaluators[0].metrics.activation.f1, 1);
  assert.equal(report.evaluators[0].metrics.role.macro_f1, 1);
  assert.equal(report.evaluators[0].by_split.holdout.activation.f1, 1);
  assert.equal(report.agreement.exact_agreement, 1);
  assert.equal(fs.existsSync(output), true);
  assert.match(fs.readFileSync(output, "utf8"), /^# Core 触发代理评测结果\n/m);
});

finish();

function test(name, fn) { try { fn(); results.push({ name, pass: true }); console.log("[PASS] " + name); } catch (error) { results.push({ name, pass: false }); console.error("[FAIL] " + name + ": " + error.message); } }
function finish() { const failures = results.filter((item) => !item.pass); console.log(JSON.stringify({ status: failures.length ? "FAIL" : "PASS", tests: results.length, failureCount: failures.length })); process.exit(failures.length ? 1 : 0); }
