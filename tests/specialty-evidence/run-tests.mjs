#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(new URL("../..", import.meta.url).pathname);
const skillRoot = path.join(repoRoot, "skills/immersive-motion-ui");
const manifest = JSON.parse(read("capability-manifest.json"));
const routing = read("references/routing.md");
const skill = read("SKILL.md");
const results = [];

test("M09 through M11 are active but remain conditional", () => {
  const expected = {
    M09: "references/performance.md",
    M10: "references/memory-lifecycle.md",
    M11: "references/a11y-audit.md",
  };
  for (const [id, reference] of Object.entries(expected)) {
    const capability = manifest.capabilities.find((item) => item.id === id);
    assert.equal(capability.status, "active", `${id} must be active`);
    assert.equal(capability.default_load, false, `${id} must not default-load`);
    assert.ok(capability.references.includes(reference), `${id} missing ${reference}`);
    assert.deepEqual(capability.planned_references, [], `${id} must not retain a planned reference`);
  }
});

test("routing exposes separate specialty paths and fallbacks", () => {
  assert.match(routing, /\| M09 \| active \| lcp, cwv, slow page \| `performance\.md`;/);
  assert.match(routing, /\| M10 \| active \| memory leak, oom, listener cleanup \| `memory-lifecycle\.md`;/);
  assert.match(routing, /\| M11 \| active \| a11y, aria, keyboard, focus \| `a11y-audit\.md`/);
  for (const ref of ["performance.md", "memory-lifecycle.md", "a11y-audit.md"]) assert.match(skill, new RegExp(`references/${ref.replace(".", "\\.")}`));
});

test("performance reference requires a trace before measurement claims", () => {
  const text = read("references/performance.md");
  for (const term of ["TTFB", "resource load delay", "resource load duration", "element render delay", "trace", "NOT EXECUTED", "not measured"]) {
    assert.match(text, new RegExp(term, "i"), `Missing ${term}`);
  }
});

test("memory reference requires ownership and baseline-target-final evidence", () => {
  const text = read("references/memory-lifecycle.md");
  for (const term of ["ownership", "baseline", "target", "final", "repeat", "memlab", "NOT EXECUTED", "raw heap"]) {
    assert.match(text, new RegExp(term, "i"), `Missing ${term}`);
  }
});

test("a11y reference keeps automated and manual evidence separate", () => {
  const text = read("references/a11y-audit.md");
  for (const term of ["Lighthouse", "accessibility tree", "DOM order", "label", "keyboard", "focus", "tap target", "contrast", "NOT EXECUTED"]) {
    assert.match(text, new RegExp(term, "i"), `Missing ${term}`);
  }
  assert.match(text, /not.*substitute|does not.*substitute/i);
});

test("runtime audit preserves specialty evidence boundaries", () => {
  const text = fs.readFileSync(path.join(repoRoot, "tests/specialty-evidence/browser-runtime-audit.mjs"), "utf8");
  for (const term of ["Accessibility.getFullAXTree", "focus_restoration", "tap_target", "contrast", "lcp_segments", "heap_comparison", "NOT EXECUTED"]) {
    assert.match(text, new RegExp(term), `Runtime audit is missing ${term}`);
  }
  assert.match(text, /not substituted for LCP segments/i);
  assert.match(text, /not treated as a leak conclusion/i);
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
