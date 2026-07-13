#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const packagePath = process.env.PLAYWRIGHT_PACKAGE;
const outputDir = readOption("--output");
const repoRoot = path.resolve(new URL("../..", import.meta.url).pathname);
const root = path.join(repoRoot, "skills/immersive-motion-ui/examples/minimal-showcases");

if (!packagePath) {
  console.log(JSON.stringify({ status: "NOT EXECUTED", reason: "Set PLAYWRIGHT_PACKAGE to a local Playwright entry file." }));
  process.exit(0);
}

if (!outputDir) {
  console.error("Missing --output <directory> for browser screenshots and report.");
  process.exit(1);
}

const { chromium } = await import(pathToFileURL(path.resolve(packagePath)).href);
const outputRoot = path.resolve(outputDir);
fs.mkdirSync(outputRoot, { recursive: true });

const surfaces = [
  { id: "product-before", file: "product-operations/before.html" },
  { id: "product-after", file: "product-operations/after.html", interact: verifyProduct },
  { id: "brand-before", file: "brand-adaptive-reuse/before.html" },
  { id: "brand-after", file: "brand-adaptive-reuse/after.html", interact: verifyBrand },
  { id: "commerce-before", file: "commerce-hotel-booking/before.html" },
  { id: "commerce-after", file: "commerce-hotel-booking/after.html", interact: verifyCommerce },
];
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];
const report = { status: "PASS", package: packagePath, output: outputRoot, surfaces: [], reducedMotion: [] };
const browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined });

try {
  for (const surface of surfaces) {
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport });
      const errors = [];
      page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(pathToFileURL(path.join(root, surface.file)).href, { waitUntil: "load" });
      await page.waitForTimeout(80);
      const frame = await verifyPageFrame(page, surface.id, viewport);
      if (surface.interact && viewport.name === "desktop") await surface.interact(page);
      await page.waitForTimeout(320);
      assert.deepEqual(errors, [], `${surface.id}/${viewport.name} console errors: ${errors.join(" | ")}`);
      const screenshot = path.join(outputRoot, `${surface.id}-${viewport.name}.png`);
      await page.screenshot({ path: screenshot, fullPage: true });
      report.surfaces.push({
        id: surface.id,
        viewport,
        screenshot,
        status: "PASS",
        console_errors: errors.length,
        horizontal_overflow: frame.width <= frame.viewport ? "PASS" : "FAIL",
        focus_visible: frame.outlineStyle !== "none" || frame.outlineWidth !== "0px",
      });
      await page.close();
    }
  }

  for (const surface of surfaces.filter((item) => item.id.endsWith("after"))) {
    const page = await browser.newPage({ viewport: viewports[1], reducedMotion: "reduce" });
    await page.goto(pathToFileURL(path.join(root, surface.file)).href, { waitUntil: "load" });
    const state = await page.evaluate(() => ({
      reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      textLength: document.querySelector("main")?.innerText.length || 0,
      width: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
    }));
    assert.equal(state.reduced, true, `${surface.id} did not receive reduced-motion media`);
    assert.ok(state.textLength > 100, `${surface.id} hides too much content in reduced motion`);
    assert.ok(state.width <= state.viewport, `${surface.id} overflows in reduced motion`);
    report.reducedMotion.push({ id: surface.id, status: "PASS", ...state });
    await page.close();
  }
} catch (error) {
  report.status = "FAIL";
  report.error = error.message;
} finally {
  await browser.close();
}

fs.writeFileSync(path.join(outputRoot, "browser-report.json"), `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(path.join(outputRoot, "browser-evidence.json"), `${JSON.stringify(makeCommerceEvidence(report), null, 2)}\n`);
console.log(JSON.stringify(report));
process.exit(report.status === "PASS" ? 0 : 1);

async function verifyPageFrame(page, id, viewport) {
  await page.keyboard.press("Tab");
  const frame = await page.evaluate(() => {
    const active = document.activeElement;
    const style = active ? getComputedStyle(active) : null;
    return {
      width: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
      activeTag: active?.tagName || null,
      outlineStyle: style?.outlineStyle || null,
      outlineWidth: style?.outlineWidth || null,
      mainText: document.querySelector("main")?.innerText.length || 0,
    };
  });
  assert.ok(frame.width <= frame.viewport, `${id}/${viewport.name} has horizontal overflow (${frame.width} > ${frame.viewport})`);
  assert.ok(frame.mainText > 100, `${id}/${viewport.name} has too little rendered content`);
  assert.notEqual(frame.activeTag, "BODY", `${id}/${viewport.name} has no keyboard focus target`);
  assert.ok(frame.outlineStyle !== "none" || frame.outlineWidth !== "0px", `${id}/${viewport.name} has no visible keyboard focus`);
  return frame;
}

function makeCommerceEvidence(result) {
  const surfaces = result.surfaces.filter((item) => item.id === "commerce-after");
  const desktop = surfaces.find((item) => item.viewport.name === "desktop");
  const mobile = surfaces.find((item) => item.viewport.name === "mobile");
  const reduced = result.reducedMotion.find((item) => item.id === "commerce-after");
  const complete = result.status === "PASS" && desktop && mobile && reduced;
  return {
    build: { status: "NOT EXECUTED", reason: "Standalone HTML showcase; no build step is required." },
    browser: {
      status: complete ? "PASS" : "FAIL",
      url_or_file: "skills/immersive-motion-ui/examples/minimal-showcases/commerce-hotel-booking/after.html",
      desktop_viewport: desktop ? `${desktop.viewport.width}x${desktop.viewport.height} ${desktop.status}` : "NOT EXECUTED",
      mobile_viewport: mobile ? `${mobile.viewport.width}x${mobile.viewport.height} ${mobile.status}` : "NOT EXECUTED",
      console_errors: [...(desktop?.console_errors === undefined ? [] : [desktop.console_errors]), ...(mobile?.console_errors === undefined ? [] : [mobile.console_errors])].reduce((sum, value) => sum + value, 0),
      horizontal_overflow: desktop && mobile && desktop.horizontal_overflow === "PASS" && mobile.horizontal_overflow === "PASS" ? "PASS" : "NOT EXECUTED",
      screenshots: [desktop?.screenshot, mobile?.screenshot].filter(Boolean),
      reason: complete ? null : result.error || "Commerce after browser evidence was incomplete.",
    },
    motion: {
      has_motion: true,
      reduced_motion_result: reduced?.status || "NOT EXECUTED",
      reason: reduced ? null : "Commerce after reduced-motion check did not run.",
    },
  };
}

async function verifyProduct(page) {
  await page.locator('[data-action="open-transfer"]').first().click();
  await page.locator("#transfer-drawer[data-open=\"true\"]").waitFor();
  await page.locator("#action").selectOption({ index: 1 });
  await page.locator("#transfer-form button[type=\"submit\"]").click();
  await page.locator("#error").waitFor();
  assert.match(await page.locator("#error").innerText(), /Choose a reason/);
  await page.locator("#reason").selectOption({ index: 1 });
  await page.locator("#transfer-form button[type=\"submit\"]").click();
  assert.match(await page.locator("#live-status").innerText(), /updated/);
}

async function verifyBrand(page) {
  await page.locator('[data-view="intervention"]').click();
  assert.equal(await page.locator("html").getAttribute("data-view"), "intervention");
}

async function verifyCommerce(page) {
  await page.locator('[data-room-choice="terrace"]').click();
  assert.equal(await page.locator("#summary").getAttribute("data-open"), "true");
  assert.match(await page.locator("#live").innerText(), /selected/);
}

function readOption(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : process.argv[index + 1] || null;
}
