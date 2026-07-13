#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(new URL("../..", import.meta.url).pathname);
const skillRoot = path.join(repoRoot, "skills/immersive-motion-ui");
const industryPath = path.join(skillRoot, "references/industry-directions.md");
const forwardEvalsPath = path.join(repoRoot, "tests/industry-directions/forward-evals.json");
const industryText = fs.existsSync(industryPath) ? fs.readFileSync(industryPath, "utf8") : "";
const skillText = read("SKILL.md");
const routingText = read("references/routing.md");
const referencesIndex = read("references/README.md");
const manifest = JSON.parse(read("capability-manifest.json"));
const results = [];

const families = [
  "1. SaaS / 产品工具",
  "2. 品牌 / 作品集",
  "3. Commerce",
  "4. 数据应用 / 仪表盘",
  "5. 内容 / 媒体",
  "6. 活动 / 沉浸式展示",
];
const requiredFields = [
  "Representative sectors",
  "Default trap",
  "Direction A",
  "Direction B",
  "Decision variables",
  "Motion ceiling",
  "Avoid when",
  "Verification focus",
];

test("industry direction reference exists", () => {
  assert.equal(fs.existsSync(industryPath), true, "Missing references/industry-directions.md");
});

test("contains all six task-first industry families", () => {
  for (const family of families) assert.match(industryText, new RegExp(`^## ${escapeRegex(family)}$`, "m"), `Missing ${family}`);
});

test("every family has two directions and complete decision boundaries", () => {
  for (const family of families) {
    const section = sectionFor(family);
    for (const field of requiredFields) {
      assert.match(section, new RegExp(`^### ${escapeRegex(field)}$`, "m"), `${family} missing ${field}`);
    }
  }
});

test("explicitly rejects fixed industry-to-style mappings", () => {
  for (const phrase of ["task-first", "同一行业可以进入多个任务族", "不是固定映射", "用户举例是方向证据，不是永久限制"]) {
    assert.match(industryText, new RegExp(escapeRegex(phrase), "i"), `Missing anti-stereotype phrase: ${phrase}`);
  }
});

test("documents cross-family override examples", () => {
  for (const example of ["医疗后台", "生物科技发布", "时尚结账", "音乐节排期工具"]) {
    assert.match(industryText, new RegExp(example), `Missing cross-family example: ${example}`);
  }
});

test("does not copy Finesse persona names or fixed hex palettes", () => {
  for (const persona of ["Cinematic Tech", "Phosphor Terminal", "Warm Heritage", "Gold Luxury", "Scientific Emergence"]) {
    assert.doesNotMatch(industryText, new RegExp(persona, "i"), `Copied persona label: ${persona}`);
  }
  assert.doesNotMatch(industryText, /#[0-9a-f]{6}\b/i, "Industry directions must not prescribe fixed hex palettes");
});

test("SKILL and routing expose the industry reference", () => {
  assert.match(skillText, /references\/industry-directions\.md/);
  assert.match(routingText, /\| M03 \| active \|[^\n]+industry-directions\.md/);
  assert.match(referencesIndex, /industry-directions\.md/);
});

test("M03 keeps industry directions active after casebook activation", () => {
  const capability = manifest.capabilities.find((item) => item.id === "M03");
  assert.ok(capability.references.includes("references/industry-directions.md"));
  assert.ok(capability.references.includes("references/showcase-casebook.md"));
  assert.equal(capability.planned_references.includes("references/industry-directions.md"), false);
  assert.equal(capability.planned_references.includes("references/showcase-casebook.md"), false);
});

test("forward eval set covers six families and two cross-family overrides", () => {
  assert.equal(fs.existsSync(forwardEvalsPath), true, "Missing forward-evals.json");
  const evalSet = JSON.parse(fs.readFileSync(forwardEvalsPath, "utf8"));
  assert.equal(evalSet.status, "NOT EXECUTED");
  assert.equal(evalSet.evals.length, 8);
  assert.equal(new Set(evalSet.evals.map((item) => item.id)).size, 8);
  for (const family of families) {
    assert.ok(evalSet.evals.some((item) => item.expected_family === family), `Eval set missing ${family}`);
  }
  assert.equal(evalSet.evals.filter((item) => item.cross_family_override === true).length, 2);
  for (const item of evalSet.evals) {
    assert.ok(item.prompt?.trim(), `${item.id} prompt`);
    assert.ok(item.assertions?.length >= 5, `${item.id} assertions`);
  }
});

finish();

function read(relativePath) {
  return fs.readFileSync(path.join(skillRoot, relativePath), "utf8");
}

function sectionFor(family) {
  const startMarker = `## ${family}`;
  const start = industryText.indexOf(startMarker);
  assert.notEqual(start, -1, `Missing ${family}`);
  const next = industryText.indexOf("\n## ", start + startMarker.length);
  return industryText.slice(start, next === -1 ? industryText.length : next);
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
