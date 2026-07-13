#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const packagePath = process.env.PLAYWRIGHT_PACKAGE;
const outputDir = readOption("--output");
const root = path.resolve(new URL("..", import.meta.url).pathname);

if (!packagePath) {
  console.log(JSON.stringify({ status: "NOT EXECUTED", reason: "Set PLAYWRIGHT_PACKAGE to a local Playwright entry file." }));
  process.exit(0);
}
if (!outputDir) {
  console.error("Missing --output <directory>.");
  process.exit(1);
}

const { chromium } = await import(pathToFileURL(path.resolve(packagePath)).href);
const outputRoot = path.resolve(outputDir);
fs.mkdirSync(outputRoot, { recursive: true });
const target = path.join(root, "minimal-showcases/product-operations/after.html");
const report = {
  status: "PASS",
  target: "tests/minimal-showcases/product-operations/after.html",
  accessibility: { status: "NOT EXECUTED" },
  performance: {
    status: "NOT EXECUTED",
    reason: "No fixed-device/network LCP trace adapter is available; navigation timings are not substituted for LCP segments.",
    lcp_segments: "NOT EXECUTED",
  },
  memory: {
    status: "NOT EXECUTED",
    reason: "No baseline-target-final heap snapshot or MemLab adapter is available; repeated interaction is not treated as a leak conclusion.",
    heap_comparison: "NOT EXECUTED",
  },
};
const browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined });

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(pathToFileURL(target).href, { waitUntil: "load" });

  const initialFocus = await page.evaluate(() => {
    document.querySelector('[data-action="open-transfer"]')?.focus();
    const item = document.activeElement;
    const style = item ? getComputedStyle(item) : null;
    return { tag: item?.tagName, outline: style?.outlineStyle, outlineWidth: style?.outlineWidth };
  });
  assert.equal(initialFocus.tag, "BUTTON");
  assert.ok(initialFocus.outline !== "none" || initialFocus.outlineWidth !== "0px", "initial keyboard focus is not visible");

  await page.locator('[data-action="open-transfer"]').first().click();
  await page.locator('#transfer-drawer[data-open="true"]').waitFor();
  const opened = await page.evaluate(() => ({
    activeId: document.activeElement?.id || null,
    ariaHidden: document.querySelector("#transfer-drawer")?.getAttribute("aria-hidden"),
    drawerLabel: document.querySelector("#transfer-drawer")?.getAttribute("aria-labelledby"),
  }));
  assert.equal(opened.activeId, "action", "opening drawer does not move focus to its first control");
  assert.equal(opened.ariaHidden, "false");
  assert.equal(opened.drawerLabel, "drawer-title");

  await page.locator("#close-drawer").click();
  const restored = await page.evaluate(() => ({
    activeAction: document.activeElement?.getAttribute("data-action") || null,
    open: document.querySelector("#transfer-drawer")?.dataset.open,
  }));

  const semantic = await page.evaluate(() => {
    const labeledControls = [...document.querySelectorAll("button, select, a")].map((element) => ({
      tag: element.tagName,
      text: (element.textContent || "").trim(),
      aria: element.getAttribute("aria-label"),
      labelledby: element.getAttribute("aria-labelledby"),
      labels: element instanceof HTMLSelectElement ? [...element.labels].map((label) => label.textContent?.trim()).filter(Boolean) : [],
      rect: (() => { const value = element.getBoundingClientRect(); return { width: value.width, height: value.height }; })(),
    }));
    const headingOrder = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((heading) => heading.tagName);
    const focusableOutsideDrawer = [...document.querySelectorAll('button, select, a[href], [tabindex]:not([tabindex="-1"])')]
      .filter((element) => !document.querySelector("#transfer-drawer")?.contains(element))
      .map((element) => element.tagName + (element.id ? `#${element.id}` : ""));
    return { labeledControls, headingOrder, focusableOutsideDrawer };
  });
  const missingNames = semantic.labeledControls.filter((control) => !control.text && !control.aria && !control.labelledby && control.labels.length === 0);
  const undersized = semantic.labeledControls.filter((control) => control.rect.width < 24 || control.rect.height < 24);
  assert.deepEqual(missingNames, [], "interactive controls lack an accessible name");
  assert.deepEqual(undersized, [], "interactive controls are smaller than the audit floor of 24 CSS px");
  assert.deepEqual(errors, [], `browser errors: ${errors.join(" | ")}`);

  const cdp = await page.context().newCDPSession(page);
  const accessibilityTree = await cdp.send("Accessibility.getFullAXTree");
  await cdp.detach();
  assert.ok(accessibilityTree.nodes.length > 0, "accessibility tree is empty");

  report.accessibility = {
    status: "PARTIAL_PASS",
    scope: "Runtime checks on one offline product showcase; this is not a full conformance claim.",
    accessibility_tree: { status: "PASS", nodes: accessibilityTree.nodes.length },
    dom_order: semantic.headingOrder,
    labels: { status: "PASS", checked_controls: semantic.labeledControls.length, missing_names: missingNames.length },
    keyboard_path: { status: "PASS", visible_focus: true, drawer_initial_focus: opened.activeId },
    focus_restoration: {
      status: restored.activeAction === "open-transfer" ? "PASS" : "FAIL",
      result: restored.activeAction === "open-transfer" ? "Focus returns to the invoking transfer button after close." : "Focus did not return to the invoking transfer button.",
    },
    tap_target: { status: "PARTIAL_PASS", floor_css_px: 24, undersized_controls: undersized.length, note: "This does not establish a 44px mobile target policy." },
    contrast: { status: "NOT EXECUTED", reason: "No calibrated contrast analyzer was used." },
    console_errors: errors.length,
  };
  await page.close();
} catch (error) {
  report.status = "FAIL";
  report.error = error.message;
} finally {
  await browser.close();
}

fs.writeFileSync(path.join(outputRoot, "specialty-runtime-report.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report));
process.exit(report.status === "PASS" ? 0 : 1);

function readOption(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : process.argv[index + 1] || null;
}
