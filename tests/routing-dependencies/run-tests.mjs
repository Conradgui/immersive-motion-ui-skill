#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(new URL("../..", import.meta.url).pathname);
const skillRoot = path.join(repoRoot, "skills/immersive-motion-ui");
const skillText = read("SKILL.md");
const routingText = read("references/routing.md");
const dependencyPolicyPath = path.join(skillRoot, "references/dependency-policy.md");
const dependencyPolicyText = fs.existsSync(dependencyPolicyPath) ? fs.readFileSync(dependencyPolicyPath, "utf8") : "";
const manifest = JSON.parse(read("capability-manifest.json"));
const results = [];

test("routes commerce to the existing commerce reference", () => {
  assert.match(routingText, /\| PDP, PLP, cart, checkout, pricing, booking, conversion \| `commerce` \| `commerce-ui\.md` \|/);
  assert.doesNotMatch(routingText, /commerce-ui\.md` is planned/);
});

test("routes redesign to the existing redesign reference", () => {
  assert.match(routingText, /\| existing page, make better, less generic, polish this, redesign this \| `redesign` \| `redesign\.md`/);
  assert.doesNotMatch(routingText, /redesign\.md` is planned/);
});

test("routing table covers every Core module", () => {
  for (const id of ["M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08", "M09", "M10", "M11", "M14", "M15", "M16"]) {
    assert.match(routingText, new RegExp(`\\| ${id} \\|`), `Missing ${id} route`);
  }
});

test("dependency policy defines probe, four dependency attributes, fallback, and forbidden claims", () => {
  assert.equal(fs.existsSync(dependencyPolicyPath), true, "Missing references/dependency-policy.md");
  for (const term of ["Capability Probe", "required", "optional", "credentialed", "time-sensitive", "Fallback", "Forbidden Claims"]) {
    assert.match(dependencyPolicyText, new RegExp(term, "i"), `Missing ${term}`);
  }
});

test("SKILL routes through the capability manifest and dependency policy", () => {
  assert.match(skillText, /capability-manifest\.json/);
  assert.match(skillText, /references\/dependency-policy\.md/);
  assert.match(skillText, /planned capability/i);
});

test("conditional dependency metadata matches B2 policy", () => {
  const expected = {
    M06: ["current-web-docs", false, true],
    M08: ["browser-tooling", false, false],
    M09: ["browser-trace", false, true],
    M10: ["heap-or-memlab", false, true],
    M14: ["figma-tooling", true, true],
    M16: ["immersive-motion-ui-library", false, true],
  };
  for (const [id, [name, credentialed, timeSensitive]] of Object.entries(expected)) {
    const capability = manifest.capabilities.find((item) => item.id === id);
    const dependency = capability.dependencies.find((item) => item.name === name);
    assert.ok(dependency, `${id} missing ${name}`);
    assert.equal(dependency.kind, "optional", `${id} dependency must be optional`);
    assert.equal(dependency.credentialed, credentialed, `${id} credentialed mismatch`);
    assert.equal(dependency.time_sensitive, timeSensitive, `${id} time_sensitive mismatch`);
  }
});

test("M16 activates dependency policy without requiring the Library", () => {
  const capability = manifest.capabilities.find((item) => item.id === "M16");
  assert.ok(capability.references.includes("references/dependency-policy.md"));
  assert.equal(capability.planned_references.includes("references/dependency-policy.md"), false);
  assert.equal(manifest.library_dependency.required, false);
});

test("M05 provides standalone media guidance without a planned Library dependency", () => {
  const capability = manifest.capabilities.find((item) => item.id === "M05");
  assert.ok(capability.references.includes("references/media-assets.md"));
  assert.deepEqual(capability.planned_references, []);
  assert.match(skillText, /references\/media-assets\.md/);
  assert.equal(fs.existsSync(path.join(skillRoot, "references/media-assets.md")), true);
});

test("M03 routes to adaptable visual directions without fixed style presets", () => {
  const capability = manifest.capabilities.find((item) => item.id === "M03");
  const visualDirectionsText = read("references/visual-directions.md");
  assert.ok(capability.references.includes("references/visual-directions.md"));
  assert.match(skillText, /references\/visual-directions\.md/);
  assert.match(routingText, /`visual-directions\.md`/);
  assert.match(visualDirectionsText, /Ambition Profile/);
  assert.match(visualDirectionsText, /Direction Prototypes/);
  assert.match(visualDirectionsText, /Never copy their surface treatment/);
});

test("motion guidance includes an engine ladder, bounded recipes, and teardown", () => {
  const motionText = read("references/motion-engines.md");
  for (const term of ["Engine Ladder", "State Continuity", "Scroll Narrative", "Canvas Metaphor", "Spatial Product or 3D Scene", "Lifecycle Ownership", "prefers-reduced-motion"]) {
    assert.match(motionText, new RegExp(term), `Missing motion contract: ${term}`);
  }
  assert.match(motionText, /Do not introduce GSAP, Framer Motion/);
  assert.match(motionText, /static poster/);
});

test("planned capabilities keep fallback and never default-load", () => {
  const planned = manifest.capabilities.filter((item) => item.status === "planned");
  for (const capability of planned) {
    assert.equal(capability.default_load, false, `${capability.id} default_load`);
    assert.ok(capability.fallback?.trim(), `${capability.id} fallback`);
    assert.ok(capability.verifier?.trim(), `${capability.id} verifier`);
  }
});

test("existing audit and user-control contracts remain present", () => {
  assert.match(skillText, /`audit` is always read-only\./);
  assert.match(skillText, /A user's answer may be guiding, not limiting\./);
  assert.match(skillText, /Prevent overcorrection/);
});

finish();

function read(relativePath) {
  return fs.readFileSync(path.join(skillRoot, relativePath), "utf8");
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
