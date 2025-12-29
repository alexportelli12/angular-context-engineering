# Align Project: $ARGUMENTS

Analyze existing Angular codebase, align context documentation to match actual implementation.

**Use Cases:**
- Adopting PRP workflow in existing Angular project
- Context drift (docs out of sync with code)
- Post-refactoring alignment
- Onboarding to legacy projects

## Phase 1: Codebase Analysis

### 1.1 Discover Structure

Glob `src/app/**` to map:
- Features/pages
- Services
- Models/interfaces
- Shared components
- Core utilities

### 1.2 Tech Stack

Read config files:
- `package.json` - Angular version, dependencies
- `angular.json` - CLI config, build setup
- `vitest.config.ts` OR `karma.conf.js` - Testing
- `tailwind.config.js` OR `@theme` - Styling

Extract:
- Angular version (@angular/core)
- State: signals/RxJS/NgRx
- Styling: Tailwind/SCSS/CSS
- Testing: Vitest/Jasmine/Jest
- SSR/SSG enabled
- Libraries: Firebase, Auth0, etc.

### 1.3 Architectural Patterns

Grep `src/app/**/*.ts` for:
- DI: `inject(` vs `constructor(`
- State: `signal<` vs `BehaviorSubject`
- Inputs: `input(` vs `@Input()`
- Outputs: `output(` vs `@Output()`

Grep `src/app/**/*.html` for:
- Control flow: `@if`/`@for` vs `*ngIf`/`*ngFor`

Glob components:
- `**/*.component.ts` vs simple `.ts` naming

Categorize:
- **Modern:** `inject()`, signals, `input()/output()`, `@if/@for`
- **Legacy:** Constructor DI, decorators, `*ngIf/*ngFor`
- **Mixed:** Migration in progress

### 1.4 Routing

Read `app.routes.ts` or `app-routing.module.ts`:
- Active routes + components
- Lazy loading patterns
- Guards/resolvers
- Nested routes
- Redirects

### 1.5 State Management

Identify strategy:
- Signals: `signal()`, `computed()`, `effect()`
- RxJS: `BehaviorSubject`, `Observable`
- NgRx: Store, actions, reducers, effects
- NgRx Signal Store: `signalStore`
- Custom/mixed

### 1.6 Services and Models

Glob:
- `**/*.service.ts` - services
- `**/*.model.ts` - interfaces
- `**/*.enum.ts` - enums
- `**/*.constants.ts` - constants

Document responsibilities and organization patterns.

### 1.7 Coding Patterns

Analyze:
- Change detection: OnPush vs Default
- Method length/complexity
- Naming: descriptive vs abbreviated
- Files: inline vs external templates/styles
- Imports: barrel exports vs direct
- Error handling
- Async: Promises/Observables/async-await

## Phase 2: Generate/Update Context

### 2.1 `.ai/context/core/architecture.md`

Document discovered structure:

**Directory Structure:** Actual `src/app/` layout

**Layer Responsibilities:** Based on real usage
- Pages/features
- Shared/UI
- Services
- Models
- Core

**Module Boundaries:** Barrel exports, feature isolation

**Integration:** Component communication, state sharing

### 2.2 `.ai/context/core/coding-standards.md`

Document ACTUAL patterns (not aspirational):

Include code examples from real codebase:
- State management
- Component structure
- Template syntax
- Naming conventions
- Method length
- Error handling
- Testing

List anti-patterns based on project standards.

### 2.3 `.ai/context/core/tech-stack.md`

Document versions and tools:
- Framework: Angular, TypeScript, Node
- State: Signals/NgRx/RxJS
- Styling: Tailwind/SCSS/CSS
- Testing: Vitest/Jasmine/Jest
- Build: Angular CLI/webpack/Vite
- Libraries: Firebase, Auth, UI frameworks
- Dev tools: ESLint, Prettier, Husky

### 2.4 `.ai/memory/project-state.md`

Catalog implementation:

**Application:** Name, type, stage

**Implemented Features:** Per feature:
- Status, components, services, models, routes, notes

**Structure:** Actual directories

**Routes:** Table of all routes

**Services:** List with descriptions

**Models:** All interfaces/enums

**State:** Global state approach

**Recent Changes:** From git history

**Next Steps:** Improvements/follow-ups

### 2.5 `.ai/planning/templates/feature-prp.md`

Align template with project patterns.

### 2.6 `CLAUDE.md`

Generate project-specific guidance:
- Essential commands (from package.json)
- Architecture highlights
- Framework version conventions
- Tech stack reference
- Coding standards
- PRP workflow
- File naming
- Development workflow

## Phase 3: Validate Alignment

### 3.1 Cross-Reference

Verify docs match code:
- [ ] Architecture.md = src/app/ structure
- [ ] Coding standards = actual patterns
- [ ] Tech stack = package.json
- [ ] Project state = all features
- [ ] Routes documented
- [ ] Services cataloged
- [ ] Component patterns aligned

### 3.2 Gaps

Document discrepancies:
- Legacy patterns needing migration
- Inconsistent approaches
- Missing documentation
- Architectural drift

Recommend:
- Migration paths
- Standardization
- Doc updates
- Improvements

## Phase 4: Initialize PRP (Optional)

If adopting PRP workflow:

### 4.1 Directories

Create `.ai/planning/drafts/` and `.ai/planning/prp/`

### 4.2 Templates

Copy standard templates:
- `feature-prp.md`
- `initial_template.md`

### 4.3 Architect Agent

Create `.claude/agents/architect.md` if missing.

## Phase 5: Summary Report

### 5.1 Report Structure

```markdown
# Project Alignment Report

**Project:** [name]
**Angular:** [version]
**Date:** [today]

## Discovered Architecture

**Structure:** [src/app/ organization]
**Patterns:** DI, state, templates, inputs/outputs
**Routing:** Standalone/NgModule, lazy loading, guards
**State:** Signals/RxJS/NgRx/Mixed
**Styling:** Tailwind/SCSS/CSS
**Testing:** Vitest/Jasmine/Jest/None

## Context Files

✅ architecture.md
✅ coding-standards.md
✅ tech-stack.md
✅ project-state.md
✅ CLAUDE.md

## Catalog

Features: [count]
Routes: [count]
Services: [count]
Models: [count]

## Consistency

Status: Consistent/Mixed/Legacy
Recommendations: [if mixed/legacy]

## PRP Readiness

✅ Infrastructure created/verified
✅ Ready: `/prp.draft [feature]`

## Next Steps

1. Review context files
2. Validate project-state.md
3. Review CLAUDE.md
4. [If adopting PRP] Start workflow
5. [If drift] Standardize patterns
```

### 5.2 User Actions

Prompt user to:
1. Review docs accuracy
2. Edit project-specific context
3. Decide standardization approach
4. Commit context files

## Notes

- Analyzes ACTUAL code, not ideals
- Docs reflect reality
- Document ALL patterns if inconsistent
- Run periodically (every 3-6 months)
- Non-destructive

## Execution Checklist

- [ ] Analyzed structure
- [ ] Documented tech stack
- [ ] Identified patterns
- [ ] Cataloged features/routes/services/models
- [ ] Reviewed coding standards
- [ ] Created/updated all context files
- [ ] Validated docs vs code
- [ ] Identified gaps
- [ ] Created PRP infrastructure (if needed)
- [ ] Generated report
- [ ] Provided recommendations

## When to Run

**Initial:** Adopting PRP, onboarding to legacy
**Maintenance:** Post-refactor, quarterly, standards change
**Recovery:** Docs corrupted/out of sync
