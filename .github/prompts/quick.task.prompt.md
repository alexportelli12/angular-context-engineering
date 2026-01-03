---
agent: agent
description: Quick implementation without full PRP workflow
---

# Quick Task: $ARGUMENTS

Small feature/fix without full PRP workflow.

**Use for:** Bug fixes, simple components, small enhancements
**Don't use for:** Architectural decisions, multi-feature changes → use PRP workflow

## Process

### 1. Load Context

Read before implementing:

- `.ai/memory/project-state.md` — existing features, patterns
- `.ai/context/core/architecture.md` — structure, layer rules
- `.ai/context/core/coding-standards.md` — Angular 21 patterns

Search `src/app/` for similar implementations.

### 2. Plan

Break into tasks:

```yaml
1. CREATE/UPDATE models (if needed)
2. CREATE/UPDATE services (if needed)
3. CREATE/UPDATE components
4. UPDATE barrel exports (index.ts)
5. VALIDATE (build, lint)
6. UPDATE project-state.md (if significant)
```

### 3. Implement

Follow patterns in `coding-standards.md`:

- `inject()` for DI
- `signal()` for state
- `input()` / `output()` for I/O
- `@if` / `@for` in templates
- Separate `.html` / `.css` files
- Tailwind classes first
- No `.component.` in filenames

### 4. Validate

```bash
npm run build   # Must succeed
npm run lint    # Must pass (fix issues, never disable)
```

### 5. Update State (If Needed)

Update `project-state.md` if:

- New page/route added
- New service created
- Directory structure changed

Skip for bug fixes and small tweaks.

## When to Use PRP Instead

- Architectural decisions needed
- Affects multiple features
- Complex state management
- Unclear requirements
