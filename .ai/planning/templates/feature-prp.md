# Feature PRP: {Feature Name}

## Goal

{Brief description of feature}

## Why

- {Business/user value}
- {Technical benefit}

## What

{Specific deliverables: components, services, models, routes}

## Success Criteria

- [ ] Feature works as described
- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes
- [ ] Architect review passed
- [ ] `project-state.md` updated

---

## Context

**Read before implementing:**

- `.ai/memory/project-state.md` — existing features, patterns
- `.ai/context/core/architecture.md` — structure, layer rules
- `.ai/context/core/coding-standards.md` — Angular 21 patterns

**Reference in codebase:**

```yaml
- file: src/app/pages/{similar}/
  why: Pattern reference

- file: src/app/services/{related}.service.ts
  why: Integration point
```

---

## Implementation Tasks

```yaml
1. CREATE models/{name}.model.ts
- {interfaces to define}

2. CREATE services/{name}.service.ts
- {methods, state}

3. CREATE pages/{name}/{name}.ts
- {component responsibilities}

4. CREATE pages/{name}/{name}.html
- {template structure}

5. UPDATE app.routes.ts
- {route configuration}

6. VALIDATE
- npm run build
- npm run lint

7. ARCHITECT REVIEW
- Invoke architect agent

8. UPDATE project-state.md
- Add feature details
```

---

## Validation

```bash
npm run build   # Must succeed
npm run lint    # Must pass
```

After validation, invoke Architect Agent for review.
