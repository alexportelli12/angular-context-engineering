# Project State

Compact context of the current project state. Updated after each feature implementation to provide baseline context for AI agents.

**Last Updated:** 2025-12-27
**Update Trigger:** Initial setup

---

## Application Overview

**Name:** Angular Context Engineering
**Type:** Angular 21 SPA (Single Page Application)
**Stage:** Fresh repository - scaffolding only

---

## Implemented Features

_No features implemented yet._

<!-- Format for tracking features:
### Feature: [Feature Name]
- **PRP:** `.ai/planning/prp/[feature-name].md`
- **Status:** Complete
- **Components:** List of components created
- **Services:** List of services created
- **Models:** List of models/interfaces created
- **Routes:** Routes added (if any)
- **Notes:** Any important implementation details
-->

---

## Current Structure

```
src/app/
├── core/                    # Guards, interceptors, error handlers
│   └── (empty)
├── models/                  # TypeScript interfaces and types
│   └── index.ts
├── pages/                   # Feature page components (smart)
│   └── index.ts
├── services/                # Global services and state management
│   └── (empty)
├── shared/
│   └── ui/                  # Reusable presentational components (dumb)
│       └── index.ts
└── app.routes.ts            # Application routing
```

---

## Active Routes

| Path | Component | Guard | Description |
|------|-----------|-------|-------------|
| `/` | - | - | Default route (not configured) |

---

## State Management

**Global State Services:** None implemented
**Signal Stores:** None implemented

---

## Key Dependencies

Refer to `.ai/context/core/tech-stack.md` for full dependency list.

**Framework:** Angular 21
**Styling:** Tailwind CSS 4
**Testing:** Vitest

---

## Integration Points

**External APIs:** None configured
**Authentication:** Not implemented
**Environment Config:** Default Angular environments

---

## Known Constraints

- Zoneless architecture (OnPush change detection required)
- Signal-based state (no BehaviorSubject for state)
- Modern Angular patterns only (inject(), input(), output(), @if/@for)
- Standalone components only (no NgModules)

---

## Recent Changes

| Date | Change | PRP Reference |
|------|--------|---------------|
| 2025-12-27 | Initial repository setup | N/A |

---

## Next Steps

_Awaiting first feature PRP._

---

## Quick Reference for AI Agents

When generating or executing PRPs, use this file to:

1. **Understand existing features** - Avoid duplication or conflicts
2. **Identify integration points** - Know which services/components exist
3. **Follow established patterns** - Reference implemented features for consistency
4. **Track state dependencies** - Understand current state management approach

**Always update this file after completing a feature implementation.**
