#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(new URL("../..", import.meta.url).pathname);
const skillRoot = path.join(repoRoot, "skills/immersive-motion-ui");
const casebookPath = path.join(skillRoot, "references/showcase-casebook.md");
const casebookText = fs.existsSync(casebookPath) ? fs.readFileSync(casebookPath, "utf8") : "";
const casesRoot = path.join(skillRoot, "references/cases");
const examplesRoot = path.join(skillRoot, "examples");
const skillText = read("SKILL.md");
const routingText = read("references/routing.md");
const referencesIndex = read("references/README.md");
const manifest = JSON.parse(read("capability-manifest.json"));
const results = [];

const cases = [
  ["C01. SaaS / 产品工具", "c01-product-operations.md"],
  ["C02. 品牌 / 作品集", "c02-brand-portfolio.md"],
  ["C03. Commerce", "c03-commerce.md"],
  ["C04. 数据应用 / 仪表盘", "c04-data-dashboard.md"],
  ["C05. 内容 / 媒体", "c05-content-media.md"],
  ["C06. 活动 / 沉浸式展示", "c06-event-immersive.md"],
];
const requiredFields = [
  "Shared brief",
  "Locked fixture",
  "Before",
  "After",
  "Causal delta",
  "Why the after is better",
  "When not to apply",
  "Overcorrection risk",
  "Responsive",
  "Motion",
  "Accessibility",
  "Performance",
  "Evidence status",
  "Source and localization",
];

test("showcase casebook exists", () => {
  assert.equal(fs.existsSync(casebookPath), true, "Missing references/showcase-casebook.md");
});

test("routes to six independently loadable paired cases", () => {
  assert.ok(casebookText.split("\n").length < 100, "Casebook index should remain small enough for progressive disclosure");
  for (const [title, file] of cases) {
    assert.match(casebookText, new RegExp(escapeRegex(`cases/${file}`)), `Missing route for ${title}`);
    assert.equal(fs.existsSync(path.join(casesRoot, file)), true, `Missing ${file}`);
    assert.match(sectionFor(file), new RegExp(`^# ${escapeRegex(title)}$`, "m"), `Missing title ${title}`);
  }
});

test("every case satisfies the paired-case field contract", () => {
  for (const [title, file] of cases) {
    const section = sectionFor(file);
    for (const field of requiredFields) {
      assert.match(section, new RegExp(`^### ${escapeRegex(field)}$`, "m"), `${title} missing ${field}`);
    }
  }
});

test("before and after share a locked synthetic fixture", () => {
  for (const [, file] of cases) {
    const section = sectionFor(file);
    assert.match(section, /合成测试数据/);
    assert.match(section, /Before 和 After 只使用本 fixture/);
  }
});

test("every case contains at least three causal deltas", () => {
  for (const [title, file] of cases) {
    const section = sectionFor(file);
    for (const index of [1, 2, 3]) assert.match(section, new RegExp(`^\\| ${index} \\|`, "m"), `${title} missing causal delta ${index}`);
  }
});

test("unexecuted behavior is not mislabeled as passing evidence", () => {
  for (const [title, file] of cases) {
    const section = sectionFor(file);
    for (const field of ["browser", "responsive", "motion", "accessibility", "performance"]) {
      assert.match(section, new RegExp(`^- ${field}: ` + "`NOT EXECUTED`", "m"), `${title} must keep ${field} NOT EXECUTED`);
    }
  }
});

test("casebook documents anti-strawman and anti-overcorrection rules", () => {
  for (const phrase of ["不是稻草人", "After 不是唯一正确答案", "风格不是质量代理", "用户建议是方向证据，不是永久限制"]) {
    assert.match(casebookText, new RegExp(phrase), `Missing rule: ${phrase}`);
  }
});

test("casebook does not copy Finesse identities or fixed palettes", () => {
  const localizedCases = cases.map(([, file]) => sectionFor(file)).join("\n");
  for (const label of [
    "Cinematic Tech",
    "Phosphor Terminal",
    "Editorial Publication",
    "Warm Heritage",
    "Gold Luxury",
    "Quiet Luxury Minimal",
    "aether",
    "nova",
    "offscreen",
    "signal",
    "folio-v1",
  ]) {
    assert.doesNotMatch(localizedCases, new RegExp(`\\b${escapeRegex(label)}\\b`, "i"), `Copied upstream identity: ${label}`);
  }
  assert.doesNotMatch(localizedCases, /#[0-9a-f]{6}\b/i, "Cases must not prescribe fixed hex palettes");
});

test("Core examples separate offline baselines from bounded Finesse references", () => {
  const examplesIndex = fs.readFileSync(path.join(examplesRoot, "README.md"), "utf8");
  const source = fs.readFileSync(path.join(examplesRoot, "finesse-network/SOURCE.md"), "utf8");
  assert.match(examplesIndex, /Offline Baseline/);
  assert.match(examplesIndex, /Network-Enhanced References/);
  for (const file of ["aether-cinematic-tech.html", "nova-brutal-typographic.html", "offscreen-editorial.html", "signal-phosphor-terminal.html", "studio-quiet-luxury.html", "LICENSE"]) {
    assert.equal(fs.existsSync(path.join(examplesRoot, "finesse-network", file)), true, `Missing Finesse reference ${file}`);
  }
  assert.match(source, /network-required-unverified/);
  assert.match(source, /source-reference-only/);
  assert.equal(fs.existsSync(path.join(examplesRoot, "finesse-network/lib/gsap.min.js")), false, "Vendored GSAP must not become a Core dependency");
});

test("SKILL routing and reference index expose the casebook", () => {
  assert.match(skillText, /references\/showcase-casebook\.md/);
  assert.match(routingText, /\| M03 \| active \|[^\n]+showcase-casebook\.md/);
  assert.match(referencesIndex, /showcase-casebook\.md/);
});

test("M03 activates casebook without adding a dependency", () => {
  const capability = manifest.capabilities.find((item) => item.id === "M03");
  assert.ok(capability.references.includes("references/showcase-casebook.md"));
  assert.ok(capability.references.includes("examples/README.md"));
  assert.equal(capability.planned_references.includes("references/showcase-casebook.md"), false);
  assert.deepEqual(capability.dependencies, []);
});

finish();

function read(relativePath) {
  return fs.readFileSync(path.join(skillRoot, relativePath), "utf8");
}

function sectionFor(file) {
  return fs.readFileSync(path.join(casesRoot, file), "utf8");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
