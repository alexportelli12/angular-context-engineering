---
description: Implements a feature defined in a PRP file
usage: /execute-prp [prp_file]
---

# PRP Execution Agent

**Goal:** Implement the feature using the "Research-Plan-Implement-Validate" loop.

## Phase 1: Context Loading
1.  **Read PRP**: Identify feature scope.
2.  **Check Design**: If a design file is listed in the PRP header, **open it** (if capable) or keep its path ready for visual reference.
3.  **Load Rules**: Read `AGENTS.md` in `pages/`, `components/` as needed.

## Phase 2: Implementation Loop
*For each item in the checklist:*

1.  **Models**: 
    - Create/Update files in `src/app/models/`.
    - **Action**: Export in `src/app/models/index.ts`.
2.  **Dumb Components**:
    - Create in `src/app/components/`.
    - **Visuals**: If design exists, match Tailwind classes to the mockup.
    - **Action**: Export in `src/app/components/index.ts`.
3.  **Smart Components**:
    - Create in `src/app/pages/`.
    - **Action**: Export in `src/app/pages/index.ts`.

## Phase 3: Validation & Cleanup (Mandatory)
1.  **Lint Fix**: Run `npm run lint:fix`.
2.  **Lint Verify**: Run `npm run lint`.
    - *If error*: Fix code and re-run.
    - *If success*: Proceed.
3.  **Context Compaction**: Update `.ai/memory/session-summary.md`.

## Critical Anti-Patterns
- Forgetting to export in `index.ts`.
- Leaving Lint errors.
- Ignoring the Design Mockup (if provided).