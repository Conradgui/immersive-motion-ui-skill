# Independent Trigger Classification

You are an independent evaluator. For each task, decide whether the available immersive-motion-ui Skill should be activated as primary, with-specialist, or out-of-scope.

Definitions:
- primary: the Skill should lead a frontend design, UI implementation, redesign, motion, data UI, design-system, or modern-web task.
- with-specialist: the Skill should participate in a UI decision or verification task, but browser, performance, memory, or accessibility specialization is also central.
- out-of-scope: the task's main deliverable has no substantial UI design, UI implementation, or UI verification responsibility.

Rules:
1. Do not read repository files, fixtures, prior results, or labels.
2. Do not change files or use tools.
3. Judge the primary user outcome, not isolated frontend words.
4. Return only valid JSON: an array of objects with id, predicted_role, and a concise reason of at most 20 words.
5. Classify every supplied task exactly once.
