#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL(".", import.meta.url).pathname);
const options = optionsFrom(process.argv.slice(2));
if (options.predictions.length === 0) fail("Provide at least one --predictions file.");
const gold = ["development-v1.json", "holdout-v1.json"].flatMap((name) => JSON.parse(fs.readFileSync(path.join(root, "fixtures", name), "utf8")).items);
const goldById = new Map(gold.map((item) => [item.id, item]));
const evaluators = options.predictions.map((file) => score(file, goldById));
const report = { evaluation: "independent-trigger-proxy-v1", task_count: gold.length, evaluators, agreement: evaluators.length === 2 ? agreement(evaluators[0].predictions, evaluators[1].predictions) : null, caveat: "Independent-agent proxy only; not Codex platform trigger telemetry." };
if (options.output) { fs.mkdirSync(path.dirname(options.output), { recursive: true }); fs.writeFileSync(options.output, markdown(report)); }
console.log(JSON.stringify(report, null, 2));

function score(file, goldMap) {
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  const list = Array.isArray(raw) ? raw : raw.predictions;
  if (!Array.isArray(list)) fail(file + ": expected an array or predictions array");
  const byId = new Map();
  for (const item of list) {
    if (!item || !item.id || !item.predicted_role) fail(file + ": prediction needs id and predicted_role");
    if (!["primary", "with-specialist", "out-of-scope"].includes(item.predicted_role)) fail(file + ": invalid role for " + item.id);
    if (byId.has(item.id)) fail(file + ": duplicate id " + item.id);
    byId.set(item.id, item);
  }
  if (byId.size !== goldMap.size) fail(file + ": expected " + goldMap.size + " predictions, received " + byId.size);
  for (const id of goldMap.keys()) if (!byId.has(id)) fail(file + ": missing " + id);
  for (const id of byId.keys()) if (!goldMap.has(id)) fail(file + ": unknown " + id);
  const records = [...goldMap.values()].map((goldItem) => ({ gold: goldItem, predicted: byId.get(goldItem.id) }));
  const metrics = metricSet(records);
  const by_split = Object.fromEntries(["development", "holdout"].map((split) => [split, metricSet(records.filter((record) => record.gold.split === split))]));
  const acceptance = by_split.holdout;
  const gates = { completeness: true, activation_precision: acceptance.activation.precision >= 0.90, activation_recall: acceptance.activation.recall >= 0.85, activation_f1: acceptance.activation.f1 >= 0.87, role_macro_f1: acceptance.role.macro_f1 >= 0.80, critical_false_positive_rate: acceptance.critical_false_positives === 0 };
  return { evaluator: path.basename(file), predictions: [...byId.values()], metrics, by_split, gates, passed: Object.values(gates).every(Boolean) };
}

function metricSet(records) {
  const activation = binary(records);
  const role = roles(records);
  const critical = records.filter((record) => record.gold.critical_negative);
  const criticalFP = critical.filter((record) => record.predicted.predicted_role !== "out-of-scope").length;
  return { activation, role, critical_false_positive_rate: ratio(criticalFP, critical.length), critical_false_positives: criticalFP, critical_negative_count: critical.length };
}

function binary(records) {
  let tp = 0, fp = 0, fn = 0, tn = 0;
  for (const record of records) {
    const actual = record.gold.expected_role !== "out-of-scope";
    const predicted = record.predicted.predicted_role !== "out-of-scope";
    if (actual && predicted) tp++; else if (!actual && predicted) fp++; else if (actual && !predicted) fn++; else tn++;
  }
  const precision = ratio(tp, tp + fp); const recall = ratio(tp, tp + fn);
  return { tp, fp, fn, tn, precision, recall, f1: ratio(2 * precision * recall, precision + recall) };
}

function roles(records) {
  const labels = ["primary", "with-specialist", "out-of-scope"];
  const per_role = {};
  for (const label of labels) {
    const tp = records.filter((r) => r.gold.expected_role === label && r.predicted.predicted_role === label).length;
    const fp = records.filter((r) => r.gold.expected_role !== label && r.predicted.predicted_role === label).length;
    const fn = records.filter((r) => r.gold.expected_role === label && r.predicted.predicted_role !== label).length;
    const precision = ratio(tp, tp + fp); const recall = ratio(tp, tp + fn);
    per_role[label] = { precision, recall, f1: ratio(2 * precision * recall, precision + recall) };
  }
  return { per_role, macro_f1: labels.reduce((total, label) => total + per_role[label].f1, 0) / labels.length };
}

function agreement(first, second) {
  const other = new Map(second.map((item) => [item.id, item]));
  const matched = first.filter((item) => item.predicted_role === other.get(item.id).predicted_role).length;
  return { exact_agreement: ratio(matched, first.length), matched, total: first.length };
}

function ratio(top, bottom) { return bottom === 0 ? 0 : Number((top / bottom).toFixed(4)); }

function markdown(report) {
  const lines = ["# Core 触发代理评测结果", "", "- 任务数：" + report.task_count, "- 说明：" + report.caveat, "", "验收门仅使用 holdout；development 只用于诊断。", "", "| 评测者 | Holdout Precision | Holdout Recall | Holdout Activation F1 | Holdout Role Macro-F1 | Holdout 高风险误触发 | 通过 |", "| --- | ---: | ---: | ---: | ---: | ---: | --- |"];
  for (const entry of report.evaluators) { const m = entry.by_split.holdout; lines.push("| " + entry.evaluator + " | " + m.activation.precision + " | " + m.activation.recall + " | " + m.activation.f1 + " | " + m.role.macro_f1.toFixed(4) + " | " + m.critical_false_positives + "/" + m.critical_negative_count + " | " + (entry.passed ? "PASS" : "FAIL") + " |"); }
  if (report.agreement) lines.push("", "两位评测者三分类一致率：" + report.agreement.exact_agreement + " (" + report.agreement.matched + "/" + report.agreement.total + ")");
  return lines.join("\n") + "\n";
}

function optionsFrom(args) {
  const options = { predictions: [], output: null };
  for (let index = 0; index < args.length; index++) { if (args[index] === "--predictions") options.predictions.push(args[++index]); else if (args[index] === "--output") options.output = args[++index]; else fail("Unknown option " + args[index]); }
  return options;
}

function fail(message) { console.error(message); process.exit(1); }
