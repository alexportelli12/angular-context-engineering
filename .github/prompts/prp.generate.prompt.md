---
agent: agent
description: Generate detailed implementation plan (PRP)
---

# Generate PRP: $ARGUMENTS

Create implementation plan using `.ai/planning/templates/feature-prp.md`.

## Research

1. **Load draft** (if exists): `.ai/planning/drafts/$ARGUMENTS.md`
2. **Load project state:** `.ai/memory/project-state.md` — existing features, patterns
3. **Analyze codebase:** search `src/app/` for similar implementations
4. **Review context:** `architecture.md`, `coding-standards.md`, `tech-stack.md`
5. **Clarify** if needed: MVP scope, UX requirements, integration points

## Generate

Use `.ai/planning/templates/feature-prp.md` as base.

Include:

- Goal, success criteria
- Context references (project state, similar code)
- Ordered task list: models → services → components → routing
- Validation commands

## Before Writing

**ULTRATHINK:** Mentally execute implementation. Validate every signal, inject(), template binding against context standards.

## Output

Use documentation agent to create `.ai/planning/prp/{feature-name}.md`

## Quality Check

- [ ] `project-state.md` referenced
- [ ] Steps clearly ordered
- [ ] Agent can execute without clarification
- [ ] No conflicts with existing features
