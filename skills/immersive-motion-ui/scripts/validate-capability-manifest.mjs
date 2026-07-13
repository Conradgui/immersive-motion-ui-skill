#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const expectedIds = ["M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08", "M09", "M10", "M11", "M14", "M15", "M16"];
const scriptPath = fileURLToPath(import.meta.url);
const defaultSkillRoot = path.resolve(path.dirname(scriptPath), "..");

export function validateManifestData(data, options = {}) {
  const skillRoot = path.resolve(options.skillRoot || defaultSkillRoot);
  const manifestPath = path.resolve(options.manifestPath || path.join(skillRoot, "capability-manifest.json"));
  const checks = [];
  const check = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

  check("schema.version", data?.schema_version === 1, `schema_version=${data?.schema_version}`);
  check("skill.name", data?.skill_name === "immersive-motion-ui", `skill_name=${data?.skill_name}`);
  check("platform.codexOnly", data?.platform_scope === "codex-only-first-release", `platform_scope=${data?.platform_scope}`);
  check("library.optional", data?.library_dependency?.required === false, "library_dependency.required must be false");

  const capabilities = Array.isArray(data?.capabilities) ? data.capabilities : [];
  const ids = capabilities.map((item) => item?.id);
  check("capabilities.array", Array.isArray(data?.capabilities), "capabilities must be an array");
  check("capabilities.ids.unique", new Set(ids).size === ids.length, "capability IDs must be unique");
  check(
    "capabilities.ids.complete",
    ids.length === expectedIds.length && expectedIds.every((id) => ids.includes(id)),
    `expected ${expectedIds.join(", ")}; received ${ids.join(", ")}`
  );

  for (const capability of capabilities) {
    const id = typeof capability?.id === "string" ? capability.id : "unknown";
    const prefix = `capability.${id}`;
    const statusValid = capability?.status === "active" || capability?.status === "planned";
    const references = Array.isArray(capability?.references) ? capability.references : [];
    const plannedReferences = Array.isArray(capability?.planned_references) ? capability.planned_references : [];
    const allPaths = [...references, ...plannedReferences];
    const safePaths = allPaths.every(isSafeRelativePath);

    check(`${prefix}.id.valid`, /^M(?:0[1-9]|1[0-6])$/.test(id), `id=${id}`);
    check(`${prefix}.name.nonEmpty`, isNonEmptyString(capability?.name), "name must be a non-empty string");
    check(`${prefix}.status.valid`, statusValid, `status=${capability?.status}`);
    check(`${prefix}.defaultLoad.boolean`, typeof capability?.default_load === "boolean", "default_load must be boolean");
    check(`${prefix}.triggers.nonEmpty`, isNonEmptyStringArray(capability?.triggers), "triggers must contain non-empty strings");
    check(`${prefix}.references.arrays`, Array.isArray(capability?.references) && Array.isArray(capability?.planned_references), "references and planned_references must be arrays");
    check(`${prefix}.references.safePaths`, safePaths, "reference paths must stay inside the Skill root");
    check(`${prefix}.fallback.nonEmpty`, isNonEmptyString(capability?.fallback), "fallback must be a non-empty string");
    check(`${prefix}.verifier.nonEmpty`, isNonEmptyString(capability?.verifier), "verifier must be a non-empty string");

    if (capability?.status === "active") {
      check(`${prefix}.active.references`, references.length > 0, "active capabilities need at least one reference");
      check(
        `${prefix}.references.exist`,
        safePaths && references.length > 0 && references.every((reference) => fs.existsSync(path.join(skillRoot, reference))),
        references.length ? `checked ${references.join(", ")}` : "no active references"
      );
    } else {
      check(`${prefix}.planned.references`, plannedReferences.length > 0, "planned capabilities need planned_references");
      check(`${prefix}.planned.notDefaultLoad`, capability?.default_load === false, "planned capabilities cannot default-load");
    }

    const dependencies = Array.isArray(capability?.dependencies) ? capability.dependencies : [];
    check(`${prefix}.dependencies.array`, Array.isArray(capability?.dependencies), "dependencies must be an array");
    dependencies.forEach((dependency, index) => {
      const dependencyPrefix = `${prefix}.dependency.${index}`;
      check(`${dependencyPrefix}.name.nonEmpty`, isNonEmptyString(dependency?.name), "dependency name must be non-empty");
      check(`${dependencyPrefix}.kind.valid`, dependency?.kind === "required" || dependency?.kind === "optional", `kind=${dependency?.kind}`);
      check(`${dependencyPrefix}.credentialed.boolean`, typeof dependency?.credentialed === "boolean", "credentialed must be boolean");
      check(`${dependencyPrefix}.timeSensitive.boolean`, typeof dependency?.time_sensitive === "boolean", "time_sensitive must be boolean");
      check(
        `${dependencyPrefix}.library.notRequired`,
        !(String(dependency?.name || "").toLowerCase().includes("library") && dependency?.kind === "required"),
        "Library dependencies cannot be required"
      );
    });
  }

  const failureCount = checks.filter((item) => !item.pass).length;
  return {
    status: failureCount ? "FAIL" : "PASS",
    manifest: manifestPath,
    skillRoot,
    checks,
    failureCount,
  };
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isNonEmptyStringArray(value) {
  return Array.isArray(value) && value.length > 0 && value.every(isNonEmptyString);
}

function isSafeRelativePath(value) {
  if (!isNonEmptyString(value) || path.isAbsolute(value)) return false;
  return !value.split(/[\\/]+/).includes("..");
}

function readOption(args, name) {
  const equalForm = args.find((item) => item.startsWith(`${name}=`));
  if (equalForm) return equalForm.slice(name.length + 1);
  const index = args.indexOf(name);
  return index === -1 ? null : args[index + 1] || null;
}

function runCli() {
  const args = process.argv.slice(2);
  const skillRoot = path.resolve(readOption(args, "--skill-root") || defaultSkillRoot);
  const manifestPath = path.resolve(readOption(args, "--manifest") || path.join(skillRoot, "capability-manifest.json"));
  let report;
  try {
    const data = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    report = validateManifestData(data, { skillRoot, manifestPath });
  } catch (error) {
    report = {
      status: "FAIL",
      manifest: manifestPath,
      skillRoot,
      checks: [{ id: "manifest.read", pass: false, detail: error.message }],
      failureCount: 1,
    };
  }
  console.log(JSON.stringify(report, null, args.includes("--pretty") ? 2 : 0));
  process.exit(report.failureCount ? 1 : 0);
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) runCli();
