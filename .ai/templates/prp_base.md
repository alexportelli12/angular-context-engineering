# Product Requirement Prompt (PRP)

**Feature Name:** [Name]
**Design Reference:** [None / Path to file in .ai/designs/]
**Status:** DRAFT

## 1. Context Compaction
- **Current Goals:** [3-5 bullet points]
- **Relevant Architecture:** [Pages/Components involved]

## 2. User Stories & Requirements
* **User Story:** As a [Role], I want to [Action].
* **Acceptance Criteria:**
    * [Criteria 1]
    * [Criteria 2]

## 3. Technical Implementation Plan

### A. Smart Components (Pages)
*Directory: `src/app/pages/...`*
* **Route:** [URL]
* **Logic:** [Details]

### B. Dumb Components (UI)
*Directory: `src/app/components/...`*
* **Visuals:** Match design reference strictly (if available).
* **Inputs/Outputs:** Signal based.

### C. Data & Models
*Directory: `src/app/models/...`*
* **Interfaces:** [Define structures]

## 4. Implementation Checklist
- [ ] **Models**: Create interfaces in `src/app/models/` and export in `models/index.ts`.
- [ ] **UI**: Create Dumb Components and export in `components/index.ts`.
- [ ] **Logic**: Create Smart Component and export in `pages/index.ts`.
- [ ] **Routing**: Wire up routes.
- [ ] **Linting**: Run `npm run lint:fix` && `npm run lint`.