# Angular Context Engineering

## What This Is

An Angular 21 project template with structured context engineering. Uses the **PRP (Product Requirement Prompt)** workflow to separate planning from implementation for consistent, architecture-compliant code.

## Project Structure

```
src/app/
├── core/           # Singletons: guards, interceptors, error handlers
├── pages/          # Smart components (routed, inject services)
├── shared/ui/      # Dumb components (input/output only)
├── shared/utils/   # Pure functions, helpers
├── models/         # Interfaces, enums, constants
├── services/       # Global services (API, state)
└── app.routes.ts   # Lazy-loaded routes
```

## Commands

```bash
npm install          # Install dependencies
npm start            # Dev server at http://localhost:4200
npm run build        # Production build
npm run lint         # ESLint (fix issues, never disable rules)
npm test             # Vitest tests
```

## How to Work Here

### For Features: Use PRP Workflow

1. `/prp.draft {description}` - Draft feature (optional)
2. `/prp.generate {feature-name}` - Create implementation plan
3. `/prp.execute {feature-name}` - Implement with validation

Always update `.ai/memory/project-state.md` after completing features.

### For Quick Changes

Use `/quick.task` for small changes that don't need full planning.

### First-Time Setup

New project? Run `/project.init` once.

## Context Documentation

Read these when working on related tasks:

| Topic                     | File                                   |
| ------------------------- | -------------------------------------- |
| Architecture, layer rules | `.ai/context/core/architecture.md`     |
| Angular 21 patterns       | `.ai/context/core/coding-standards.md` |
| Tech stack                | `.ai/context/core/tech-stack.md`       |
| PRP workflow              | `.ai/context/workflow/prp-workflow.md` |
| Project state             | `.ai/memory/project-state.md`          |
| Architect review          | `.claude/agents/architect.md`          |

## Key Rules

- Every directory has `index.ts` (barrel exports)
- Filenames: kebab-case, no `.component.` (e.g., `user-list.ts`)
- Run `npm run build && npm run lint` before completion
- Update `.ai/memory/project-state.md` after features

## Tech Stack

Angular 21 · Tailwind CSS 4 · Vitest · TypeScript 5.9
