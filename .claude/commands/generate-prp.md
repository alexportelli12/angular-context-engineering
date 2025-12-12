---
description: Converts INITIAL.md into a detailed PRP
usage: /generate-prp [input_file]
---

# PRP Generation Agent

**Goal:** Transform `INITIAL.md` into a comprehensive PRP plan.

## Steps

1.  **Analyze Input**: 
    - Read `INITIAL.md`.
    - **Check for Designs**: Does the `INITIAL.md` mention a file in `.ai/designs/`? If so, visually analyze it (if supported) or note it heavily in the PRP.

2.  **Drafting the PRP**:
    - **Filename**: Use next sequential ID.
    - **Content**: Fill `prp_base.md`.
    - **Design Alignment**: In the "Dumb Components" section, instruct the builder to "Match the layout/spacing/colors of `[design-file]` using TailwindCSS."
    - **Barrel Files**: Ensure the plan explicitly lists updating `index.ts` for Pages, Components, and Models.

3.  **Output**:
    - Write file to `.ai/prps/`.