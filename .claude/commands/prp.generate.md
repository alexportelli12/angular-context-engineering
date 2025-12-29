# Generate PRP: $ARGUMENTS

Generate complete PRP (Product Requirement Prompt) using `.ai/planning/templates/feature-prp.md`.

**PRP:** Detailed implementation spec with requirements, structure, step-by-step instructions for AI agents.

> Agent receives PRP + codebase only. Include all context explicitly.

## Research Process

### 0. Load Draft (If Available)

Check `.ai/planning/drafts/$ARGUMENTS.md`:
- If exists, use as starting point
- Contains feature description, docs, considerations
- Validate and expand

### 1. Load Project State

Read `project-state.md`:
- Implemented features/components
- Services/state patterns
- Active routes/integrations
- Recent changes

Prevents duplication, ensures consistency, identifies reusable components.

### 2. Codebase Analysis

Search `src/app/`:
- `pages/` - feature components
- `shared/ui/` - reusable components
- `services/` - global services/state
- `models/` - interfaces/types
- `core/` - guards/interceptors

Identify patterns:
- State: `signal()`, `computed()`, `effect()`
- DI: `inject()`
- Templates: `@if`, `@for`, `@switch`
- Components: `input()`, `output()`, `model()`
- Change detection: OnPush (zoneless)

Review context:
- `project-state.md` - current state
- `architecture.md` - structure/responsibilities
- `coding-standards.md` - Angular 21 patterns
- `tech-stack.md` - versions/tooling

### 3. External Research

Reference:
- Angular docs: https://angular.dev/
- TypeScript strict mode
- Tailwind 4 `@theme` (not tailwind.config.js)
- Vitest patterns

### 4. Clarify (if needed)

Ask:
- MVP or post-MVP?
- UX/UI requirements?
- Affect existing or isolated?
- Performance/accessibility constraints?

## PRP Generation

Use `.ai/planning/templates/feature-prp.md` as base. Include:

### Critical Context

- `project-state.md` - existing features/patterns
- Code snippets from similar `src/app/` components
- `architecture.md` - patterns
- `coding-standards.md` - Angular 21 conventions
- File references: components, services, models, routing
- Integration: routing, state, styling

### Implementation Blueprint

- Pseudocode for logic/edge cases
- Components/services to mirror
- Error handling
- Subtasks: models → services → components → routing → tests

### Validation Gates

```bash
npm run start       # Dev server
npm run build       # Production (must succeed)
npm run lint        # ESLint (must pass)
```

## Before Writing: ULTRATHINK

After research, PAUSE:
> Mentally execute implementation - every signal, inject(), template binding, edge case. Validate against context standards.

## Output

Use documentation agent (Task tool, subagent_type='documentation') to create `.ai/planning/prp/{feature-name}.md` (kebab-case)

**Why:** Ensures token-efficient, dense format optimized for AI consumption and maintains consistency.

## Quality Checklist

- [ ] `project-state.md` reviewed/referenced
- [ ] Context included (code refs, architecture docs)
- [ ] AI can execute/validate from PRP
- [ ] Real code examples provided
- [ ] Steps clearly ordered
- [ ] Error handling/edge cases
- [ ] Angular docs + context file links
- [ ] Validation commands executable
- [ ] Angular 21 patterns (signals, inject, @if/@for, OnPush)
- [ ] No conflicts with existing features

## Confidence Rating

Rate 1-10: AI agent can complete in one pass without clarification?
