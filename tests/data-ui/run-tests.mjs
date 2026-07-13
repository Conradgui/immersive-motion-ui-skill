#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
const text=fs.readFileSync(new URL("./dashboard.html",import.meta.url),"utf8");
for(const marker of ["data-case=\"data-ui-after\"","Source:","Updated:","Confidence","<table>","data-state=\"stale\"","data-state=\"empty\"","data-state=\"loading\"","role=\"alert\"","fixture snapshot","prefers-reduced-motion"]){assert.ok(text.includes(marker),`missing ${marker}`)}
assert.doesNotMatch(text,/https?:\/\//i);

const referenceRoot=new URL("../../skills/immersive-motion-ui/references/",import.meta.url);
const read=(name)=>fs.readFileSync(new URL(name,referenceRoot),"utf8");
const contracts={
  "data-ui.md":["Start With the Decision","Representation Matrix","Accessibility Grade","Rendering Strategy","partial","table"],
  "data-apps.md":["Architecture Before Framework","Framework Decision","Async State Model","Component-Based Web Apps","Streamlit","AI Chat Is Opt-In"],
  "design-system.md":["Token Architecture","Component Contract","Framework Adapters","Change and Migration","semantic","illegal combinations"],
  "modern-web.md":["Decision Protocol","Capability Matrix","Feature Detection","Framework Translation","Dependency Replacement Gate","NOT EXECUTED"],
};
for(const [file,markers] of Object.entries(contracts)){
  const reference=read(file);
  for(const marker of markers) assert.ok(reference.includes(marker),`${file} missing ${marker}`);
}

console.log(JSON.stringify({status:"PASS",tests:15,failureCount:0}));
