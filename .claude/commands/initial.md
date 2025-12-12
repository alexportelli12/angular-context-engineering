---
description: bootstraps the INITIAL.md file from a request, handling mockups if provided
usage: /initial [feature request]
---

# Initial Spec Bootstrap Agent

**Goal:** Transform a raw feature request into a structured `INITIAL.md` file, handling context, documentation, and **visual assets**.

## Process

### Step 1: Design & Asset Management

1.  **Check for Attachments**: Did the user upload an image/mockup?
2.  **Determine ID**: Check `.ai/prps/` to find the last ID (e.g., if `001` exists, next is `002`).
3.  **Save/Rename**:
    - If an image exists, save it to `.ai/designs/[ID]-[feature-name].png`.
    - _Example_: `.ai/designs/002-dashboard-mockup.png`.

### Step 2: Analyze & Research

1.  **External Scan**: Search for documentation if 3rd party libs are mentioned.
2.  **Internal Scan**: Check `.ai/examples/` for relevant patterns.

### Step 3: Populate Template

Construct `INITIAL.md` (overwrite existing):

1.  **## FEATURE**:
    - Summary of the feature.
    - **Design Reference**: Explicitly state: "Follow mockup saved at `.ai/designs/[filename]`" (if applicable).

2.  **## EXAMPLES**:
    - List relevant files from `.ai/examples/`.

3.  **## DOCUMENTATION**:
    - List URLs found.

4.  **## OTHER CONSIDERATIONS**:
    - "Strictly use Signals," "Tailwind," "No inline templates."
    - "Update `index.ts` barrel files for all new creations."

### Step 4: Output

- Save `INITIAL.md`.
- Inform the user if a design was saved and linked.
