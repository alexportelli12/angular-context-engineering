---
description: bootstraps the INITIAL.md file from a natural language request
usage: /initial [feature request]
---

# Initial Spec Bootstrap Agent

**Goal:** Transform a raw feature request into a structured `INITIAL.md` file by gathering necessary context and documentation _before_ the architecture phase begins.

## 🛠 Capabilities

- **File System**: Read `.ai/examples/` to find relevant internal patterns.
- **Web Search**: Use `Google Search` to find official documentation for 3rd party libraries mentioned.
- **Angular MCP**: Query for specific Angular version compatibility or best practices.

## Process

### Step 1: Analyze & Research

1.  **Parse Request**: detailed understanding of what the user wants to build.
2.  **External Scan**:
    - If the user mentions specific libraries (e.g., "Stripe", "Leaflet", "Ag-Grid"), perform a `Google Search` to find the **official Angular wrapper** or integration guide.
    - **Goal**: Populate the `## DOCUMENTATION` section with valid URLs.
3.  **Internal Scan**:
    - Check `.ai/examples/` to see which patterns (Smart Page, Dumb UI, Form) apply to this feature.
    - **Goal**: Populate the `## EXAMPLES` section with specific filenames (e.g., "Reference `smart-page.component.ts` for the data loading pattern").

### Step 2: Populate Template

Construct the `INITIAL.md` content using this strict structure:

1.  **## FEATURE**:
    - A clear, professional summary of the feature.
    - Key user goals.

2.  **## EXAMPLES**:
    - List specific files from `.ai/examples/` that the Architect should mimic.
    - Briefly explain _why_ (e.g., "Use `dumb-ui.component.ts` structure for the item list").

3.  **## DOCUMENTATION**:
    - List the URLs found during the research step.
    - If using an MCP tool, mention which one (e.g., "Consult Angular MCP for `output()` signal syntax").

4.  **## OTHER CONSIDERATIONS**:
    - Add standard guardrails: "Strictly use Signals," "No inline templates," "Tailwind for styling."
    - Add specific constraints discovered during research (e.g., "Library X requires importing styles in `angular.json`").

### Step 3: Write Output

- Overwrite the `INITIAL.md` file in the root directory with the generated content.
- Confirm completion to the user and suggest running `/generate-prp INITIAL.md`.

## Example Interaction

**User**: "/initial I want a dark mode toggle that saves to local storage."
**Agent**: _Searches for 'Angular signal local storage pattern', finds internal example, generates INITIAL.md with links to best practices._
