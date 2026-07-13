#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const repoRoot = path.resolve(new URL("../..", import.meta.url).pathname);
const skillRoot = path.join(repoRoot, "skills/immersive-motion-ui");
const validatorPath = path.join(skillRoot, "scripts/validate-capability-manifest.mjs");
const manifestPath = path.join(skillRoot, "capability-manifest.json");
const fixturesRoot = path.join(repoRoot, "tests/capability-manifest/fixtures");
const results = [];

if (!fs.existsSync(validatorPath)) {
  fail("validator module exists", `Missing ${path.relative(repoRoot, validatorPath)}`);
  finish();
}

const { validateManifestData } = await import(pathToFileURL(validatorPath).href);

test("accepts a valid 14-module Core manifest", () => {
  const report = validateManifestData(makeValidManifest(), { skillRoot, manifestPath });
  assert.equal(report.status, "PASS", failedChecks(report));
  assert.equal(report.failureCount, 0);
});

test("rejects a missing fallback", () => {
  const manifest = applyFixture(makeValidManifest(), "invalid-missing-fallback.json");
  const report = validateManifestData(manifest, { skillRoot, manifestPath });
  assert.equal(checkPassed(report, "capability.M01.fallback.nonEmpty"), false);
});

test("rejects a required Library dependency", () => {
  const manifest = applyFixture(makeValidManifest(), "invalid-hard-library.json");
  const report = validateManifestData(manifest, { skillRoot, manifestPath });
  assert.equal(checkPassed(report, "library.optional"), false);
});

test("rejects duplicate capability IDs", () => {
  const manifest = applyFixture(makeValidManifest(), "invalid-duplicate-id.json");
  const report = validateManifestData(manifest, { skillRoot, manifestPath });
  assert.equal(checkPassed(report, "capabilities.ids.unique"), false);
});

test("rejects an active reference that does not exist", () => {
  const manifest = makeValidManifest();
  manifest.capabilities[0].references = ["references/not-real.md"];
  const report = validateManifestData(manifest, { skillRoot, manifestPath });
  assert.equal(checkPassed(report, "capability.M01.references.exist"), false);
});

test("rejects paths outside the Skill root", () => {
  const manifest = makeValidManifest();
  manifest.capabilities[0].references = ["../README.md"];
  const report = validateManifestData(manifest, { skillRoot, manifestPath });
  assert.equal(checkPassed(report, "capability.M01.references.safePaths"), false);
});

test("rejects planned capabilities that default-load", () => {
  const manifest = makeValidManifest();
  const capability = manifest.capabilities.find((item) => item.id === "M06");
  capability.status = "planned";
  capability.default_load = true;
  const report = validateManifestData(manifest, { skillRoot, manifestPath });
  assert.equal(checkPassed(report, "capability.M06.planned.notDefaultLoad"), false);
});

test("formal manifest exists and passes the CLI", () => {
  assert.equal(fs.existsSync(manifestPath), true, `Missing ${path.relative(repoRoot, manifestPath)}`);
  const run = spawnSync(process.execPath, [validatorPath], { cwd: repoRoot, encoding: "utf8" });
  assert.equal(run.status, 0, run.stdout || run.stderr);
  const report = JSON.parse(run.stdout);
  assert.equal(report.status, "PASS", failedChecks(report));
});

test("Core package report includes capability manifest validation", () => {
  const packageValidator = path.join(repoRoot, "scripts/validate-core-package.mjs");
  const run = spawnSync(process.execPath, [packageValidator], { cwd: repoRoot, encoding: "utf8" });
  assert.equal(run.status, 0, run.stdout || run.stderr);
  const report = JSON.parse(run.stdout);
  assert.equal(report.capabilityManifest?.status, "PASS", "Core package report is missing a passing capabilityManifest result");
  assert.equal(report.checks.some((item) => item.id === "capabilityManifest.valid" && item.pass), true);
});

test("Core package permits only the bounded offline Skill example assets", () => {
  const packageValidator = path.join(repoRoot, "scripts/validate-core-package.mjs");
  const run = spawnSync(process.execPath, [packageValidator], { cwd: repoRoot, encoding: "utf8" });
  assert.equal(run.status, 0, run.stdout || run.stderr);
  const report = JSON.parse(run.stdout);
  assert.equal(fs.existsSync(path.join(repoRoot, "skills/immersive-motion-ui/examples/minimal-showcases/assets/hotel-courtyard.webp")), true);
  assert.equal(report.checks.some((item) => item.id === "exclude.assets/" && item.pass), true);
  assert.equal(report.checks.some((item) => item.id === "core.noForbiddenMarkers" && item.pass), true);
});

finish();

function test(name, fn) {
  try {
    fn();
    results.push({ name, pass: true });
    console.log(`[PASS] ${name}`);
  } catch (error) {
    fail(name, error.message);
  }
}

function fail(name, detail) {
  results.push({ name, pass: false, detail });
  console.error(`[FAIL] ${name}: ${detail}`);
}

function finish() {
  const failures = results.filter((item) => !item.pass);
  console.log(JSON.stringify({ status: failures.length ? "FAIL" : "PASS", tests: results.length, failureCount: failures.length }));
  process.exit(failures.length ? 1 : 0);
}

function applyFixture(manifest, name) {
  const fixture = JSON.parse(fs.readFileSync(path.join(fixturesRoot, name), "utf8"));
  if (fixture.mutation === "remove-fallback") {
    delete manifest.capabilities.find((item) => item.id === fixture.target).fallback;
  }
  if (fixture.mutation === "require-library") manifest.library_dependency.required = true;
  if (fixture.mutation === "duplicate-id") {
    manifest.capabilities.find((item) => item.id === fixture.target).id = fixture.source;
  }
  return manifest;
}

function checkPassed(report, id) {
  return report.checks.find((item) => item.id === id)?.pass;
}

function failedChecks(report) {
  return report.checks.filter((item) => !item.pass).map((item) => `${item.id}: ${item.detail}`).join("\n");
}

function makeValidManifest() {
  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
}
