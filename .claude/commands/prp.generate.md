# Generate PRP: $ARGUMENTS

Generate a complete PRP (Product Requirement Prompt) for a feature, bug fix, or architectural change using `.ai/planning/templates/feature-prp.md` as base.

## What is a PRP?

**Product Requirement Prompt** - detailed implementation spec with requirements, component structure, and step-by-step instructions for AI agents.

> The AI agent only receives the PRP + codebase access. It does not inherently know your context or reasoning unless explicitly included in the PRP. Use references and examples generously.

---

## Research Process

### 0. Load Project State (Baseline Context)

**First**, read `.ai/memory/project-state.md` to understand:

- Currently implemented features and their components
- Existing services and state management patterns
- Active routes and integration points
- Recent changes and established patterns

This prevents duplication, ensures consistency with existing implementations, and identifies reusable components.

### 1. Codebase Analysis

Search for related Angular components, services, models, guards, and routing patterns:

- `src/app/pages/` - feature components
- `src/app/shared/ui/` - reusable presentational components
- `src/app/services/` - global services and state management
- `src/app/models/` - TypeScript interfaces and types
- `src/app/core/` - guards, interceptors, error handlers

Identify patterns:

- Signal-based state management (`signal()`, `computed()`, `effect()`)
- Modern DI with `inject()` function
- Template syntax: `@if`, `@for`, `@switch`
- Component patterns: `input()`, `output()`, `model()`
- OnPush change detection (zoneless compatible)

Review architecture and standards:

- `.ai/memory/project-state.md` - current project state and implemented features
- `.ai/context/core/architecture.md` - directory structure and layer responsibilities
- `.ai/context/core/coding-standards.md` - Angular 21 patterns and anti-patterns
- `.ai/context/core/tech-stack.md` - framework versions and tooling

### 2. External Research

Reference documentation:

- Angular docs: https://angular.dev/
- TypeScript patterns for strict mode
- Tailwind 4 `@theme` syntax (NOT tailwind.config.js)
- Vitest testing patterns

### 3. User Clarification (if needed)

Ask:

- Is this MVP or post-MVP enhancement?
- Are there specific UX/UI requirements?
- Should this affect existing features or remain isolated?
- Any performance or accessibility constraints?

---

## PRP Generation

Use `.ai/planning/templates/feature-prp.md` as the base template. Your PRP **must** include:

### Critical Context for AI Agent

Required:

- **Project state from `.ai/memory/project-state.md`** - existing features and patterns
- Code snippets from similar components in `src/app/`
- Reference to architecture patterns in `.ai/context/core/architecture.md`
- Angular 21 conventions from `.ai/context/core/coding-standards.md`
- File references for components, services, models, and routing
- Integration points: routing, state management, styling

### Implementation Blueprint

Include:

- Pseudocode for logic and edge cases
- Referenced components/services to mirror
- Error handling expectations
- Subtasks in ideal execution order: models → services → components → routing → tests

### Validation Gates (Must Be Executable)

```bash
npm run start       # Dev server check
npm run build       # Production build must succeed
npm run lint        # ESLint validation
```

---

## Before Writing: ULTRATHINK

After exploring codebase and research, **PAUSE** and:

> Mentally execute the implementation - imagine every signal, inject() call, template binding, and edge case before writing code. Validate against `.ai/context/core/` standards.

---

## Output

Save to: `.ai/planning/prp/{feature-name}.md`

Use `kebab-case` for filenames.

---

## Quality Checklist

- [ ] Project state from `.ai/memory/project-state.md` reviewed and referenced
- [ ] All necessary context included (code references, architecture docs)
- [ ] AI can execute and validate based on PRP instructions
- [ ] Real code examples from codebase provided
- [ ] Implementation steps clearly ordered
- [ ] Error handling and edge cases accounted for
- [ ] Links to Angular docs and `.ai/context/` files included
- [ ] Validation commands executable
- [ ] Follows Angular 21 patterns (signals, inject, @if/@for, OnPush)
- [ ] No conflicts with existing features documented in project state

---

## Confidence Rating

After writing the PRP, rate 1-10 based on confidence that an AI agent could **successfully complete the task in one pass** without additional clarification.
