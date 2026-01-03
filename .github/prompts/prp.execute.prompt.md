---
agent: agent
description: Implement feature from existing PRP
---

# Execute PRP: $ARGUMENTS

Implement feature from `.ai/planning/prp/{feature-name}.md`.

## Process

### 1. Load Context

- `.ai/planning/prp/$ARGUMENTS.md` — implementation plan
- `.ai/memory/project-state.md` — existing features
- `.ai/context/core/coding-standards.md` — patterns (reference as needed)

### 2. Execute Tasks

Follow PRP task list. Typical order:

```yaml
1. CREATE models
2. CREATE/UPDATE services
3. CREATE components
4. CREATE templates + styles
5. UPDATE routing (if needed)
6. UPDATE barrel exports (index.ts)
```

### 3. Validate

```bash
npm run build   # Must succeed
npm run lint    # Must pass (fix issues, never disable)
```

### 4. Architect Review

Invoke Architect Agent (`.claude/agents/architect.md`) with PRP reference and changed files.

- ✅ PASS → proceed
- ❌ FAIL → fix violations, re-validate, re-review

### 5. Update Project State

**MANDATORY:** Update `.ai/memory/project-state.md` with feature details, components created, routes added.
