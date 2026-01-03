# Architecture

## Directory Structure

```
src/app/
├── core/           # Singletons: guards, interceptors, error handlers
├── pages/          # Smart components (routed, inject services, manage state)
├── shared/
│   ├── ui/         # Dumb components (input/output only, no services)
│   └── utils/      # Pure functions, validators, helpers
├── models/         # Interfaces (.model.ts), enums (.enum.ts), constants (.constants.ts)
├── services/       # Global services (@Injectable providedIn: 'root')
└── app.routes.ts   # Lazy-loaded routes
```

## Layer Rules

| Layer               | Injects Services    | Uses Signals              | Template         |
| ------------------- | ------------------- | ------------------------- | ---------------- |
| `pages/` (Smart)    | ✅ Yes              | ✅ State + computed       | External `.html` |
| `shared/ui/` (Dumb) | ❌ No               | `input()`/`output()` only | External `.html` |
| `services/`         | ✅ HttpClient, etc. | ✅ For sync state         | N/A              |
| `core/`             | ✅ Yes              | As needed                 | N/A              |

## File Naming

| Type      | Pattern               | Example             |
| --------- | --------------------- | ------------------- |
| Component | `{name}.ts`           | `user-list.ts`      |
| Service   | `{name}.service.ts`   | `auth.service.ts`   |
| Guard     | `{name}.guard.ts`     | `auth.guard.ts`     |
| Model     | `{name}.model.ts`     | `user.model.ts`     |
| Enum      | `{name}.enum.ts`      | `user-role.enum.ts` |
| Constants | `{name}.constants.ts` | `api.constants.ts`  |

## Barrel Exports

Every directory MUST have `index.ts`:

```typescript
// Import from barrel, not direct file
import { User } from './models'; // ✅
import { User } from './models/user.model'; // ❌
```

## Routing

Lazy-load all page components:

```typescript
{
  path: 'dashboard',
  loadComponent: () => import('./pages/dashboard').then(m => m.DashboardComponent),
}
```
