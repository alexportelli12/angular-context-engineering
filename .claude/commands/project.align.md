# Align Project: $ARGUMENTS

Analyze the existing Angular codebase and align context documentation (`.ai/`, `.claude/`, `CLAUDE.md`) to match the actual implementation, architecture, and patterns used in the project.

> **Use Cases:**
>
> 1. **Adopting PRP workflow in an existing Angular project** - Analyze the codebase and generate appropriate context files
> 2. **Context drift** - When documentation no longer reflects actual implementation after multiple changes
> 3. **After major refactoring** - Ensure architecture docs match the new structure
> 4. **Onboarding to legacy projects** - Generate context for AI-assisted development

---

## Phase 1: Codebase Analysis

### 1.1 Discover Project Structure

Analyze the Angular project directory structure:

```bash
# Map the application structure
find src/app -type d -maxdepth 3
```

**Identify:**

- Root application structure (src/app/)
- Feature modules or standalone components
- Service organization
- Model/interface locations
- Shared/common code organization
- Core utilities and infrastructure

### 1.2 Analyze Tech Stack

**Read Configuration Files:**

```yaml
package.json: # Dependencies and scripts
angular.json: # Angular CLI configuration and project settings
tsconfig.json: # TypeScript configuration
vitest.config.ts OR karma.conf.js: # Testing framework
tailwind.config.js OR @theme usage: # Styling approach
```

**Determine:**

- Angular version (check package.json @angular/core)
- State management approach (signals, RxJS, NgRx, Akita, etc.)
- Styling solution (Tailwind, SCSS, CSS, CSS-in-JS)
- Testing framework (Vitest, Jasmine/Karma, Jest)
- Build system (Angular CLI, custom webpack)
- SSR/SSG capabilities
- Additional libraries (Firebase, Auth0, etc.)

### 1.3 Identify Architectural Patterns

**Analyze Component Patterns:**

Search for patterns in existing components:

```bash
# Check if using standalone components
grep -r "standalone: true" src/app --include="*.ts"

# Check dependency injection patterns
grep -r "inject(" src/app --include="*.ts"
grep -r "constructor(" src/app --include="*.ts"

# Check state management patterns
grep -r "signal<" src/app --include="*.ts"
grep -r "BehaviorSubject" src/app --include="*.ts"
grep -r "computed(" src/app --include="*.ts"

# Check input/output patterns
grep -r "input(" src/app --include="*.ts"
grep -r "input.required" src/app --include="*.ts"
grep -r "@Input()" src/app --include="*.ts"
grep -r "output(" src/app --include="*.ts"
grep -r "@Output()" src/app --include="*.ts"
```

**Analyze Template Patterns:**

```bash
# Check control flow syntax
grep -r "@if" src/app --include="*.html"
grep -r "@for" src/app --include="*.html"
grep -r "*ngIf" src/app --include="*.html"
grep -r "*ngFor" src/app --include="*.html"
```

**Check File Naming Conventions:**

```bash
# Component naming patterns
find src/app -name "*.component.ts"
find src/app -name "*.ts" -not -name "*.spec.ts" -not -name "*.component.ts"
```

**Determine Patterns Used:**

- Modern (Angular 14+): `inject()`, `signal()`, `input()`, `output()`, `@if`/`@for`
- Legacy: Constructor DI, `@Input()`/`@Output()`, `*ngIf`/`*ngFor`
- Mixed: Combination of both (migration in progress)

### 1.4 Analyze Routing Structure

**Read routing configuration:**

```typescript
// Examine app.routes.ts or app-routing.module.ts
```

**Map:**

- All active routes and their components
- Lazy-loaded routes
- Route guards and resolvers
- Nested routing structures
- Redirect rules

### 1.5 Analyze State Management

**Identify state management strategy:**

- **Signal-based:** `signal()`, `computed()`, `effect()`
- **RxJS-based:** `BehaviorSubject`, `Observable`, services with streams
- **NgRx:** Store, actions, reducers, effects
- **NgRx Signal Store:** `signalStore`, `withState`, `withMethods`
- **Custom:** Mixed approaches or proprietary patterns

### 1.6 Discover Services and Models

**Catalog services:**

```bash
find src/app -name "*.service.ts"
```

**Catalog models:**

```bash
find src/app -name "*.model.ts"
find src/app -name "*.interface.ts"
find src/app -name "*.type.ts"
find src/app -name "*.enum.ts"
```

**Document:**

- Service responsibilities
- API integration patterns
- Model/interface organization
- Type definitions

### 1.7 Review Coding Standards

**Analyze actual code for:**

- Change detection strategy (OnPush vs Default)
- Method length and complexity
- Template complexity
- Naming conventions (descriptive vs abbreviated)
- File organization (inline vs external templates/styles)
- Import patterns (barrel exports vs direct imports)
- Error handling patterns
- Async handling (Promises vs Observables vs async/await)

---

## Phase 2: Generate/Update Context Files

### 2.1 Create or Update `.ai/context/core/architecture.md`

**Based on codebase analysis, document:**

**Directory Structure:**

```
src/app/
├── [discovered-structure]
```

**Layer Responsibilities:**

Define what belongs in each directory based on actual usage:

- **Pages/Features:** Responsibilities observed in codebase
- **Shared/UI:** Actual usage patterns
- **Services:** State management and API patterns found
- **Models:** Organization pattern discovered
- **Core:** Infrastructure code found

**Module Boundaries:**

Document any architectural boundaries observed (feature modules, barrel exports, etc.)

**Integration Patterns:**

How components communicate, share state, and integrate with services

### 2.2 Create or Update `.ai/context/core/coding-standards.md`

**Document the ACTUAL patterns used in the codebase:**

**State Management:**

```typescript
// Examples from actual codebase
[Real examples of signal usage OR BehaviorSubject OR NgRx patterns]
```

**Component Patterns:**

```typescript
// Examples from actual components
[Real DI patterns, input/output patterns, lifecycle hooks]
```

**Template Patterns:**

```html
<!-- Examples from actual templates -->
[Real control flow syntax, binding patterns]
```

**Naming Conventions:**

Document the conventions ACTUALLY used in the project

**Code Quality Rules:**

Based on observed code:

- Average method length
- Template complexity patterns
- Error handling approaches
- Testing patterns

**Anti-Patterns:**

List patterns to AVOID based on project standards (don't assume defaults - base on analysis)

### 2.3 Create or Update `.ai/context/core/tech-stack.md`

**Document discovered tech stack:**

```markdown
## Framework

- **Angular:** [detected-version]
- **TypeScript:** [detected-version]
- **Node:** [detected-version]

## State Management

[Detected approach: Signals, NgRx, RxJS, etc.]

## Styling

[Detected approach: Tailwind, SCSS, CSS Modules, etc.]

## Testing

[Detected framework: Vitest, Jasmine/Karma, Jest]

## Build Tools

[Angular CLI version, custom webpack, Vite, etc.]

## Additional Libraries

[Firebase, Auth libraries, UI frameworks, etc.]

## Development Tools

- **Linting:** [ESLint, TSLint, none]
- **Formatting:** [Prettier, none]
- **Git Hooks:** [Husky, lint-staged, none]
```

### 2.4 Create or Update `.ai/memory/project-state.md`

**Catalog current implementation:**

**Application Overview:**

- Project name from package.json
- Application type
- Current stage

**Implemented Features:**

For each distinct feature/page found:

```markdown
### Feature: [Feature Name]

- **Status:** Implemented
- **Components:** [List components]
- **Services:** [List services]
- **Models:** [List models]
- **Routes:** [List routes]
- **Notes:** [Key implementation details]
```

**Current Structure:**

Document the actual directory structure

**Active Routes:**

Table of all discovered routes

**Services:**

List all services with brief descriptions

**Models:**

List all models/interfaces

**State Management:**

Document global state and management approach

**Recent Changes:**

If git history is available, list recent significant changes

**Next Steps:**

Leave empty or suggest areas for improvement

### 2.5 Update or Create `.ai/planning/templates/feature-prp.md`

Ensure the PRP template aligns with the project's patterns and requirements.

### 2.6 Update or Create CLAUDE.md

**Generate project-specific guidance:**

```markdown
# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Essential Commands

[Based on package.json scripts]

## Project Architecture

[Reference to .ai/context/core/architecture.md with key highlights]

## [Framework] Version Conventions

[Based on actual Angular version and patterns found]

## Tech Stack

[Reference to .ai/context/core/tech-stack.md]

## Coding Standards

[Reference to .ai/context/core/coding-standards.md with critical rules highlighted]

## PRP Workflow

[Include standard PRP workflow if adopting context engineering]

## File Naming Conventions

[Based on discovered patterns]

## Development Workflow

[Based on scripts and git workflow]
```

---

## Phase 3: Validate Alignment

### 3.1 Cross-Reference Check

**Verify documentation matches code:**

- [ ] Architecture.md structure matches actual src/app/ structure
- [ ] Coding standards reflect ACTUAL patterns (not idealized)
- [ ] Tech stack matches package.json dependencies
- [ ] Project state lists all major features
- [ ] All active routes are documented
- [ ] All services are cataloged
- [ ] Component patterns match documentation

### 3.2 Identify Gaps

**Document discrepancies:**

- **Legacy patterns:** Code using old Angular patterns that should be migrated
- **Inconsistent patterns:** Mixed approaches that need standardization
- **Missing documentation:** Features/components without context
- **Architectural drift:** Code violating documented architecture

**Create recommendations for:**

- Migration paths (if mixed patterns)
- Standardization opportunities
- Documentation updates needed
- Architectural improvements

---

## Phase 4: Optional - Initialize PRP Infrastructure

If this is a new adoption of the PRP workflow:

### 4.1 Create PRP Directory Structure

```bash
mkdir -p .ai/planning/drafts
mkdir -p .ai/planning/prp
```

### 4.2 Copy PRP Templates

If `.ai/planning/templates/` doesn't exist, create it with standard templates:

**`.ai/planning/templates/feature-prp.md`** - PRP generation template
**`.ai/planning/drafts/initial_template.md`** - Draft template

### 4.3 Create or Update Architect Agent

Create `.claude/agents/architect.md` if it doesn't exist, customized to the project's standards.

---

## Phase 5: Generate Summary Report

### 5.1 Alignment Report

Provide a comprehensive summary:

```markdown
# Project Alignment Report

## Analysis Complete

**Project:** [name from package.json]
**Angular Version:** [detected]
**Analysis Date:** [current date]

---

## Discovered Architecture

**Directory Structure:**
[Brief overview of src/app/ organization]

**Component Pattern:**

- DI: [inject() vs constructor]
- State: [signals vs BehaviorSubject vs NgRx]
- Templates: [@if/@for vs *ngIf/*ngFor]
- Inputs/Outputs: [input()/output() vs decorators]

**Routing:**

- Type: [Standalone routes vs NgModule routing]
- Lazy Loading: [Yes/No]
- Guards: [List if found]

**State Management:**
[Signal-based / RxJS / NgRx / Mixed]

**Styling:**
[Tailwind / SCSS / CSS / Mixed]

**Testing:**
[Vitest / Jasmine/Karma / Jest / None]

---

## Context Files Updated

✅ `.ai/context/core/architecture.md` - [Created/Updated]
✅ `.ai/context/core/coding-standards.md` - [Created/Updated]
✅ `.ai/context/core/tech-stack.md` - [Created/Updated]
✅ `.ai/memory/project-state.md` - [Created/Updated]
✅ `CLAUDE.md` - [Created/Updated]

---

## Cataloged Features

**Features Found:** [count]
**Routes Found:** [count]
**Services Found:** [count]
**Models Found:** [count]

[Brief list of major features]

---

## Pattern Consistency

**Status:** [Consistent / Mixed / Legacy]

[If Mixed or Legacy:]

**Recommendations:**

1. [Specific migration or standardization recommendations]
2. [Priority improvements]
3. [Suggested next steps]

---

## PRP Workflow Readiness

[If infrastructure was created:]

✅ PRP directory structure created
✅ PRP templates initialized
✅ Architect agent configured
✅ Ready for PRP workflow: `/prp.draft [feature-description]`

[If infrastructure already exists:]

✅ PRP infrastructure verified
✅ Templates aligned with project patterns
✅ Ready for PRP workflow

---

## Next Steps

1. Review generated context files in `.ai/context/core/`
2. Validate project state in `.ai/memory/project-state.md`
3. Review CLAUDE.md for accuracy
4. [If adopting PRP:] Start with: `/prp.draft [your-feature]`
5. [If drift was detected:] Consider standardizing patterns per recommendations
```

### 5.2 User Actions Required

**Prompt user to:**

1. Review generated documentation for accuracy
2. Edit any project-specific context that couldn't be auto-detected
3. Decide on standardization approach if mixed patterns detected
4. Commit context files to repository

---

## Important Notes

- This command analyzes ACTUAL code, not idealized patterns
- Documentation reflects reality, not aspirations (unless gaps are noted)
- If patterns are inconsistent, document ALL patterns and recommend standardization
- Context files are the source of truth for AI-assisted development
- Run this command periodically to combat documentation drift
- This is non-destructive - reviews changes before committing

---

## Execution Checklist

- [ ] Analyzed src/app/ directory structure
- [ ] Discovered and documented tech stack
- [ ] Identified architectural patterns (DI, state, templates, routing)
- [ ] Cataloged all features, routes, services, and models
- [ ] Reviewed actual coding patterns and standards
- [ ] Created/updated `.ai/context/core/architecture.md`
- [ ] Created/updated `.ai/context/core/coding-standards.md`
- [ ] Created/updated `.ai/context/core/tech-stack.md`
- [ ] Created/updated `.ai/memory/project-state.md`
- [ ] Created/updated `CLAUDE.md`
- [ ] Validated documentation against actual code
- [ ] Identified gaps and inconsistencies
- [ ] Created PRP infrastructure (if needed)
- [ ] Generated alignment report
- [ ] Provided recommendations (if applicable)

---

## When to Run This Command

**Initial Adoption:**

- Adopting PRP workflow in existing Angular project
- Onboarding AI assistance to legacy codebase
- Starting context engineering practices

**Maintenance:**

- After major refactoring
- Every 3-6 months to combat drift
- After team changes coding standards
- When documentation feels stale

**Recovery:**

- Context files deleted or corrupted
- Documentation severely out of sync
- Need to regenerate context from scratch
