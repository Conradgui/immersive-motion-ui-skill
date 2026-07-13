#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL(".", import.meta.url).pathname);
const fixtures = ["development-v1.json", "holdout-v1.json"].map(read);
const roles = new Set(["primary", "with-specialist", "out-of-scope"]);
const required = new Set(["brand", "product", "commerce", "data", "motion", "redesign", "design-system", "modern-web", "a11y", "performance", "memory", "browser-debug", "backend", "database", "cloud", "extension", "copywriting", "image-generation", "static-data", "security", "devops", "documentation"]);
const seenPrompts = new Set();
const all = [];

for (const fixture of fixtures) {
  assert.equal(fixture.schema_version, 1, fixture.split + ": invalid schema");
  assert.equal(fixture.items.length, 36, fixture.split + ": expected 36 items");
  assert.deepEqual(count(fixture.items, "expected_role"), { primary: 12, "with-specialist": 8, "out-of-scope": 16 }, fixture.split + ": role distribution drifted");
  assert.deepEqual(count(fixture.items, "language"), { en: 18, zh: 18 }, fixture.split + ": language distribution drifted");
  for (const item of fixture.items) {
    assert.ok(roles.has(item.expected_role), item.id + ": invalid role");
    assert.equal(item.split, fixture.split, item.id + ": split mismatch");
    assert.equal(typeof item.critical_negative, "boolean", item.id + ": missing critical flag");
    assert.ok(item.prompt.trim().length >= 20, item.id + ": prompt too short");
    assert.doesNotMatch(item.prompt, /immersive-motion-ui|\$[\w-]*immersive/i, item.id + ": leaks skill name");
    const key = item.prompt.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
    assert.equal(seenPrompts.has(key), false, item.id + ": duplicate prompt");
    seenPrompts.add(key);
    all.push(item);
  }
}
for (const category of required) assert.ok(all.some((item) => item.category === category), "missing category " + category);
const critical = all.filter((item) => item.critical_negative);
assert.equal(critical.length, 20, "expected 20 critical negative tasks");
assert.ok(critical.every((item) => item.expected_role === "out-of-scope"), "critical tasks must be negative");
console.log(JSON.stringify({ status: "PASS", total_items: all.length, critical_negative_items: critical.length }));

function read(name) {
  return JSON.parse(fs.readFileSync(path.join(root, "fixtures", name), "utf8"));
}

function count(items, key) {
  const values = [...new Set(items.map((item) => item[key]))].sort();
  return Object.fromEntries(values.map((value) => [value, items.filter((item) => item[key] === value).length]));
}
