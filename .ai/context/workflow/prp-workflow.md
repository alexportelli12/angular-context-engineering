# PRP Workflow

Product Requirement Prompt workflow: separates planning from implementation.

## Three Phases

```
/prp.draft {description}  →  .ai/planning/drafts/{name}.md
         ↓
/prp.generate {name}      →  .ai/planning/prp/{name}.md
         ↓
/prp.execute {name}       →  Implementation + Validation
```

## Phase 1: Draft (Optional)

Creates initial requirements capture. Skip for simple features.

**Output:** `.ai/planning/drafts/{feature-name}.md`

## Phase 2: Generate

Research codebase, create implementation plan.

**Process:**

1. Load `project-state.md` (existing features/patterns)
2. Load draft if exists
3. Search `src/app/` for similar patterns
4. Reference `architecture.md`, `coding-standards.md`
5. Generate PRP with ordered task list

**Output:** `.ai/planning/prp/{feature-name}.md`

## Phase 3: Execute

Implement following PRP specifications.

**Order:**

1. Models (interfaces, enums, constants)
2. Services (API, state)
3. Components (pages/ or shared/ui/)
4. Templates + Styles
5. Routing (if needed)
6. Validate: `npm run build && npm run lint`
7. Architect review (`.claude/agents/architect.md`)
8. Update `project-state.md` (MANDATORY)

## Architect Review

Blocks violations of:

- Cross-feature imports (pages/A → pages/B)
- Legacy patterns (see `coding-standards.md`)
- Missing barrel exports
- Service injection in shared/ui/

**Verdict:** PASS (proceed) or FAIL (fix, re-review)

## Project State Update

After every feature, update `.ai/memory/project-state.md`:

- Feature details + PRP reference
- Components/services/models created
- Routes added

Required for future PRP context.
