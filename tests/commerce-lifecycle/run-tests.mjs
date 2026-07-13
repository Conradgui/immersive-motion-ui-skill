#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(new URL("../..", import.meta.url).pathname);
const skillRoot = path.join(repoRoot, "skills/immersive-motion-ui");
const commercePath = path.join(skillRoot, "references/commerce-ui.md");
const commerce = fs.existsSync(commercePath) ? fs.readFileSync(commercePath, "utf8") : "";
const results = [];

test("commerce reference defines a reservation lifecycle contract", () => {
  assert.match(commerce, /^## Booking And Reservation Lifecycle$/m);
});

test("availability is treated as a server-confirmed fact rather than a UI promise", () => {
  assert.match(commerce, /availability snapshot/i);
  assert.match(commerce, /server.*confirm|confirm.*server/i);
  assert.match(commerce, /idempotent/i);
});

test("cancellation has a visible rules and confirmation boundary", () => {
  assert.match(commerce, /cancellation.*rule version|rule version.*cancellation/i);
  assert.match(commerce, /cancel.*confirm|confirm.*cancel/i);
});

test("capacity changes cover release, waitlist, and notification without inventing policy", () => {
  assert.match(commerce, /release.*capacity|capacity.*release/i);
  assert.match(commerce, /waitlist/i);
  assert.match(commerce, /notification/i);
  assert.match(commerce, /Do not auto-promote|do not auto-promote/i);
});

test("the lifecycle has an executable verification path", () => {
  for (const phrase of ["last available", "duplicate submit", "cancel", "waitlist"]) {
    assert.match(commerce, new RegExp(phrase, "i"), `Missing verification scenario: ${phrase}`);
  }
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
  const failures = results.filter((item) => !item.pass);
  console.log(JSON.stringify({ status: failures.length ? "FAIL" : "PASS", tests: results.length, failureCount: failures.length }));
  process.exit(failures.length ? 1 : 0);
}
