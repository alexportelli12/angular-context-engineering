# Align Project: $ARGUMENTS

Analyze ANY codebase, rewrite ALL context files to match actual implementation.

**Use when:** Adopting this workflow in existing project (any tech stack), context drift, post-refactoring.

## Managed Files Inventory

This command MUST update/rewrite ALL of these files:

```
.ai/
├── context/core/
│   ├── architecture.md        # Directory structure, layer rules
│   ├── coding-standards.md    # Required patterns for THIS stack
│   └── tech-stack.md          # Versions, tools, dependencies
├── context/workflow/
│   └── prp-workflow.md        # PRP phases (adapt validation commands)
├── memory/
│   └── project-state.md       # Features, routes, services, models
├── planning/
│   ├── drafts/initial_template.md   # Draft template
│   └── templates/feature-prp.md     # PRP template

.claude/
├── agents/
│   ├── architect.md           # Review rules for THIS stack
│   └── documentation.md       # Keep as-is (universal)
├── commands/
│   ├── prp.draft.md           # Keep as-is (universal)
│   ├── prp.generate.md        # Keep as-is (universal)
│   ├── prp.execute.md         # Adapt validation commands
│   └── quick.task.md          # Adapt validation commands

CLAUDE.md                      # Root context for THIS project
```

## Phase 1: Discover

### 1.1 Tech Stack Detection

Read config files to identify frontend stack:

| File              | Indicates                        |
| ----------------- | -------------------------------- |
| `package.json`    | Dependencies, framework, scripts |
| `angular.json`    | Angular                          |
| `next.config.*`   | Next.js                          |
| `nuxt.config.*`   | Nuxt                             |
| `vite.config.*`   | Vite (React/Vue/Svelte)          |
| `svelte.config.*` | SvelteKit                        |
| `astro.config.*`  | Astro                            |
| `remix.config.*`  | Remix                            |

Also check for BaaS integrations:

- Firebase (`@angular/fire`, `firebase`)
- Supabase (`@supabase/supabase-js`)

### 1.2 Project Structure

Glob source directories → map:

- Entry points
- Features/modules/pages
- Shared/common code
- Services/utilities
- Models/types
- Config/environment

### 1.3 Pattern Detection

Grep codebase for frontend patterns:

- **State:** Redux, Zustand, Pinia, signals, stores, Context
- **Components:** Functional, class, hooks, composition API
- **Routing:** File-based, config-based, lazy loading
- **Styling:** Tailwind, CSS modules, styled-components, SCSS
- **Data fetching:** TanStack Query, SWR, Apollo, services
- **Imports:** Barrel exports, path aliases

### 1.4 Build/Test/Lint Commands

Extract from `package.json` scripts, `Makefile`, CI config, or README:

- Build command
- Test command
- Lint command
- Dev server command

## Phase 2: Rewrite All Files

**CRITICAL:** Use documentation agent (`.claude/agents/documentation.md`) for ALL file writes to enforce token-efficiency principles.

### 2.1 `CLAUDE.md`

Rewrite completely for discovered stack:

- Project name and purpose
- Directory structure (actual)
- Essential commands (discovered)
- Context file references
- Key conventions for THIS stack

### 2.2 `.ai/context/core/architecture.md`

Rewrite with:

- Actual directory structure
- Layer responsibilities for THIS stack
- File naming conventions discovered
- Import/export patterns

### 2.3 `.ai/context/core/coding-standards.md`

Rewrite with stack-specific patterns:

- Required patterns (from codebase analysis)
- Anti-patterns (opposite of what's used)
- Naming conventions discovered
- Validation commands for THIS stack

### 2.4 `.ai/context/core/tech-stack.md`

Rewrite with:

- Framework and version
- All significant dependencies
- Build tools
- Testing framework
- Linting/formatting tools

### 2.5 `.ai/memory/project-state.md`

Rewrite with:

- Application overview
- All discovered features/modules
- Routes/endpoints
- Services/utilities
- Models/types
- Recent changes (from git if available)

### 2.6 `.ai/context/workflow/prp-workflow.md`

Adapt:

- Validation commands for THIS stack
- Execution order appropriate to stack

### 2.7 `.ai/planning/templates/feature-prp.md`

Adapt:

- Context references for THIS stack
- Task order appropriate to stack
- Validation commands

### 2.8 `.ai/planning/drafts/initial_template.md`

Adapt:

- Considerations for THIS stack

### 2.9 `.claude/agents/architect.md`

Rewrite blocking violations for THIS stack:

- Stack-specific anti-patterns
- Architecture rules discovered
- Review criteria appropriate to stack

### 2.10 `.claude/commands/prp.execute.md`

Adapt:

- Validation commands for THIS stack

### 2.11 `.claude/commands/quick.task.md`

Adapt:

- Validation commands for THIS stack
- Pattern references

## Phase 3: Validate

- [ ] All files in inventory updated
- [ ] Documentation agent used for all writes
- [ ] Content reflects ACTUAL codebase
- [ ] Validation commands are correct
- [ ] No stack-specific assumptions from template remain

## Phase 4: Report

```markdown
# Alignment Report

**Project:** {name}
**Stack:** {framework} {version}
**Date:** {today}

## Discovered

- **Structure:** {directory layout}
- **Patterns:** {state, DI, components}
- **Build:** {command}
- **Test:** {command}
- **Lint:** {command}

## Files Updated

✅ CLAUDE.md
✅ architecture.md
✅ coding-standards.md
✅ tech-stack.md
✅ project-state.md
✅ prp-workflow.md
✅ feature-prp.md
✅ initial_template.md
✅ architect.md
✅ prp.execute.md
✅ quick.task.md

## Ready

- `/prp.draft {feature}` — start planning
- `/quick.task {task}` — quick changes
```

## Notes

- Documents ACTUAL code, not ideals
- Completely rewrites files (not incremental)
- Use documentation agent for ALL writes
- Run when adopting workflow or after major changes
