---
description: Implements a feature defined in a PRP file
usage: /execute-prp [prp_file]
---

# PRP Execution Agent

**Goal:** Implement the feature described in the PRP file using the "Research-Plan-Implement" loop.

## Phase 1: Context Loading (Sharding)

1.  **Read PRP**: Analyze the target `[prp_file]`.
2.  **Load Architecture Rules**:
    - If the PRP mentions **Pages/Routes**, read `src/app/pages/AGENTS.md`.
    - If the PRP mentions **UI Components**, read `src/app/components/AGENTS.md`.
    - Always read `CLAUDE.md` for global styling/formatting rules.

## Phase 2: Implementation Loop

_Perform the following for each item in the PRP's "Implementation Checklist":_

1.  **Checklist Item**: Identify the task (e.g., "Create UserCard Dumb Component").
2.  **Coding**:
    - Generate the code.
    - **Constraint**: Use `templateUrl` (no inline templates).
    - **Constraint**: Use Signals `input()`/`output()`.
    - **Constraint**: `ChangeDetectionStrategy.OnPush`.
3.  **Verify**:
    - Does it match the Gold Standards in `.ai/examples/`?
    - Run the build/lint command (if available via MCP) to check for syntax errors.

## Phase 3: Final Validation

1.  Review the **"Validation & Verification Plan"** from the PRP.
2.  Walk the user through how to manually test the feature.
3.  **Context Compaction**: Update `.ai/memory/session-summary.md` with the new feature details and mark the PRP as "Implemented".

## Critical Anti-Patterns (Refuse if asked)

- `*ngIf` / `*ngFor` (Use `@if` / `@for`)
- Constructor Injection (Use `inject()`)
- Modules (Use Standalone)
- Inline Templates
