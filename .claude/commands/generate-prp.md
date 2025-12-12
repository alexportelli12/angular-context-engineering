---
description: Converts INITIAL.md into a detailed Product Requirement Prompt (PRP)
usage: /generate-prp [input_file] (default: INITIAL.md)
---

# PRP Generation Agent

**Goal:** Transform the user's high-level feature request into a comprehensive implementation plan (PRP) following strict architectural standards.

## Steps

1.  **Analyze Input**:

    - Read the content of the provided input file (default `INITIAL.md`).
    - Read `.ai/templates/prp_base.md` to understand the required output format.
    - Read `.ai/memory/session-summary.md` (if exists) to check for current context/blockers.

2.  **Research (Mental Sandbox)**:

    - _Action_: Scan `.ai/examples/` to refresh memory on "Gold Standard" code patterns (Signals, Smart/Dumb components).
    - _Action_: If the feature involves external libraries or complex Angular APIs, use the **Angular MCP** tools to verify latest syntax (Angular 21+).

3.  **Drafting the PRP**:

    - **Filename**: Determine the next sequential ID (e.g., if `001-login.md` exists, create `002-dashboard.md`).
    - **Content**: Fill out the `prp_base.md` template.
    - **Strict Rules**:
      - **Architecture**: Explicitly assign components to `src/app/pages/` (Smart) or `src/app/components/` (Dumb).
      - **Data**: Define the exact Signal interfaces.
      - **Validation**: Create a manual verification checklist (No TDD).

4.  **Output**:
    - Write the file to `.ai/prps/[XXX-feature-name].md`.
    - Present a brief summary of the plan to the user and ask for approval.

## Context Constraints

- Do **not** generate code yet. Only the plan.
- Do **not** hallucinate APIs. Verify if unsure.
