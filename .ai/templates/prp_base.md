# Product Requirement Prompt (PRP)

**Feature Name:** [Name]
**Date:** [YYYY-MM-DD]
**Status:** DRAFT

## 1. Context Compaction (Crucial)

_Before writing detailed specs, summarize the current project state to clear the context buffer._

- **Current Goals:** [3-5 bullet points]
- **Relevant Architecture:** [Which specific pages/components are involved?]
- **Recent Changes:** [Any recent refactors affecting this feature?]

## 2. User Stories & Requirements

- **User Story:** As a [User Role], I want to [Action], so that [Benefit].
- **Acceptance Criteria:**
  - [Criteria 1]
  - [Criteria 2]

## 3. Technical Implementation Plan

_Follow the Smart/Dumb Architecture strict guidelines._

### A. Smart Components (Pages/Containers)

_Directory: `src/app/pages/...`_

- **Responsibility:** Data fetching, State (Signals), Logic.
- **Dependencies:** [List Services/Stores needed]
- **Route:** https://www.panynj.gov/path/en/index.html

### B. Dumb Components (UI)

_Directory: `src/app/components/...`_

- **Responsibility:** Pure UI. No logic.
- **Inputs (Signals):** `input<Type>()`
- **Outputs:** `output<Type>()`

### C. Data & State

- **Models:** [Interface definitions]
- **API Interactions:** [Endpoints to call]

## 4. Potential Pitfalls & Constraints

- [Identify tricky logic, edge cases, or strict styling constraints]
- **Constraint Check:** Ensure no `*ngIf`, `constructor()`, or `Modules` are planned.

## 5. Validation & Verification Plan

_How will we verify this feature works? (No TDD)_

1.  [Step-by-step verification instruction]
2.  [Edge case to test manually]
3.  [Visual check requirement]

## 6. Implementation Checklist

- [ ] Create/Update Interfaces & Constants
- [ ] Create Dumb Components (UI only)
- [ ] Create Smart Component (Logic & Integration)
- [ ] Wire up Routes
- [ ] Verify against Validation Plan
