#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(new URL("../..", import.meta.url).pathname);
const root = path.join(repoRoot, "skills/immersive-motion-ui/examples/minimal-showcases");
const results = [];
const cases = [
  { id: "product-operations", fixture: "fixture.js", after: ["data-case=\"product-after\"", "data-action=\"open-transfer\"", "data-state=\"error\"", "aria-live=\"polite\""] },
  { id: "brand-adaptive-reuse", fixture: "fixture.js", after: ["data-case=\"brand-after\"", "data-view=\"intervention\"", "<figure", "<figcaption"] },
  { id: "commerce-hotel-booking", fixture: "fixture.js", after: ["data-case=\"commerce-after\"", "data-room-choice", "data-total", "data-cancellation", "aria-live=\"polite\""] },
];
const assets = [
  "architecture-exterior.webp",
  "architecture-material-detail.webp",
  "hotel-courtyard.webp",
  "hotel-loft.webp",
  "hotel-terrace.webp",
];

test("contains three fixture-backed before/after showcase pairs", () => {
  for (const item of cases) {
    for (const file of [item.fixture, "before.html", "after.html"]) {
      assert.equal(fs.existsSync(path.join(root, item.id, file)), true, `${item.id}/${file} is missing`);
    }
  }
});

test("both variants load the same local fixture and no remote resource", () => {
  for (const item of cases) {
    for (const file of ["before.html", "after.html"]) {
      const source = read(item.id, file);
      assert.match(source, /<script src="fixture\.js"><\/script>/, `${item.id}/${file} must load fixture.js`);
      assert.doesNotMatch(source, /https?:\/\//i, `${item.id}/${file} must be offline`);
      assert.doesNotMatch(source, /<link[^>]+href=/i, `${item.id}/${file} must not load remote styles`);
    }
  }
});

test("all variants include semantic shell, viewport, focus, and reduced-motion fallback", () => {
  for (const item of cases) {
    for (const file of ["before.html", "after.html"]) {
      const source = read(item.id, file);
      assert.match(source, /<meta name="viewport" content="width=device-width, initial-scale=1">/);
      assert.match(source, /<main/);
      assert.match(source, /:focus-visible/);
      assert.match(source, /prefers-reduced-motion: reduce/);
    }
  }
});

test("after variants expose the task-specific improvement contracts", () => {
  for (const item of cases) {
    const source = read(item.id, "after.html");
    for (const marker of item.after) assert.ok(source.includes(marker), `${item.id}/after.html missing ${marker}`);
  }
});

test("before variants retain a credible but task-misaligned path", () => {
  assert.match(read("product-operations", "before.html"), /<dialog/);
  assert.match(read("brand-adaptive-reuse", "before.html"), /project-grid/);
  assert.match(read("commerce-hotel-booking", "before.html"), /room-carousel/);
});

test("five generated local WebP assets are present and structurally valid", () => {
  for (const asset of assets) {
    const file = path.join(root, "assets", asset);
    assert.equal(fs.existsSync(file), true, `assets/${asset} is missing`);
    const data = fs.readFileSync(file);
    assert.ok(data.length > 10_000 && data.length < 500_000, `assets/${asset} has unexpected size`);
    assert.equal(data.subarray(0, 4).toString("ascii"), "RIFF", `assets/${asset} must be RIFF`);
    assert.equal(data.subarray(8, 12).toString("ascii"), "WEBP", `assets/${asset} must be WebP`);
  }
});

finish();

function read(caseId, file) {
  return fs.readFileSync(path.join(root, caseId, file), "utf8");
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
