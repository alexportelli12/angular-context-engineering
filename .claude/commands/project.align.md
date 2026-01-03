# Align Project: $ARGUMENTS

Analyze existing codebase, align context documentation to match implementation.

**Use when:** Adopting PRP workflow, context drift, post-refactoring, legacy onboarding.

## Phase 1: Analyze

### Structure

Glob `src/app/**` → map features, services, models, shared components

### Tech Stack

Read `package.json`, `angular.json` → extract versions, dependencies

### Patterns

Grep for:

- DI: `inject(` vs `constructor(`
- State: `signal<` vs `BehaviorSubject`
- I/O: `input(` vs `@Input(`
- Templates: `@if` vs `*ngIf`

Categorize: Modern / Legacy / Mixed

### Routing

Read `app.routes.ts` → routes, lazy loading, guards

## Phase 2: Update Context

Update these files to match reality:

| File                  | Content                                  |
| --------------------- | ---------------------------------------- |
| `architecture.md`     | Actual structure, layer responsibilities |
| `coding-standards.md` | Actual patterns (not aspirational)       |
| `tech-stack.md`       | Versions from package.json               |
| `project-state.md`    | All features, routes, services, models   |
| `CLAUDE.md`           | Essential commands, workflow             |

## Phase 3: Validate

- [ ] Docs match code
- [ ] All features documented
- [ ] Routes cataloged
- [ ] Gaps identified with recommendations

## Phase 4: Report

```markdown
# Alignment Report

**Project:** {name}
**Angular:** {version}
**Status:** Consistent / Mixed / Legacy

## Summary

- Features: {count}
- Routes: {count}
- Services: {count}

## Recommendations

{migration paths if mixed/legacy}
```

## Notes

- Documents ACTUAL code, not ideals
- Run periodically (every 3-6 months)
- Non-destructive
