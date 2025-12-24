# Application Architecture

## Directory Structure

```
src/app/
├── core/           # Singletons: guards, interceptors, error handlers
├── pages/          # Routed feature components (lazy-loaded)
├── shared/         # Reusable code across features
│   ├── ui/         # Presentational components
│   └── utils/      # Pure functions, validators, helpers
├── models/         # TypeScript interfaces, types, enums, constants
├── services/       # Global services (API, state, business logic)
├── app.ts
├── app.routes.ts
└── app.config.ts
```

## Layer Responsibilities

### `core/` - Guards, Interceptors, App-Level Services

- Provided in `root`, imported once in `app.config.ts`
- No UI components
- Must have `index.ts` barrel export

```typescript
// core/guards/auth.guard.ts
export const authGuard = () => inject(AuthService).isAuthenticated();
```

### `pages/` - Feature Components

- Lazy-loaded via routing
- Standalone components with `.component.ts` suffix
- Organize by feature: `pages/dashboard/`, `pages/profile/`
- Must have `index.ts` barrel export

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
];
```

### `shared/ui/` - Presentational Components

- Pure components with `input()`/`output()` communication
- No direct service dependencies
- Standalone with `index.ts` barrel export

```typescript
@Component({ selector: 'app-button' /* ... */ })
export class ButtonComponent {
  variant = input<'primary' | 'secondary'>('primary');
  clicked = output<void>();
}
```

### `shared/utils/` - Pure Functions

- No side effects, fully typed
- Validators, formatters, type guards, custom operators

```typescript
export function formatDate(date: Date): string {
  /* ... */
}
export function emailValidator(): ValidatorFn {
  /* ... */
}
```

### `models/` - Type Definitions

- Interfaces (`.model.ts`), Enums (`.enum.ts`), Constants (`.constants.ts`)
- No implementation logic
- Must have `index.ts` barrel export

```typescript
// user.model.ts
export interface User {
  id: string;
  email: string;
  role: UserRole;
}
// user-role.enum.ts
export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}
```

### `services/` - Global Services

- `@Injectable({ providedIn: 'root' })`
- Use `.service.ts` suffix
- Must have `index.ts` barrel export

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  getUser(id: string): Observable<User> {
    /* ... */
  }
}
```

## The Barrel Pattern

**Every directory MUST have `index.ts` exporting its public API.**

Benefits: Clean imports, easier refactoring, clear API boundaries.

```typescript
// ❌ WRONG
import { User } from './models/user.model';
// ✅ CORRECT
import { User } from './models';
```

**Optional Path Mapping** (`tsconfig.json`):

```json
{
  "compilerOptions": {
    "paths": {
      "@models": ["src/app/models"],
      "@services": ["src/app/services"]
    }
  }
}
```

## File Naming Conventions

| Type        | Suffix            | Example                  |
| ----------- | ----------------- | ------------------------ |
| Component   | `.component.ts`   | `user-list.component.ts` |
| Service     | `.service.ts`     | `auth.service.ts`        |
| Guard       | `.guard.ts`       | `auth.guard.ts`          |
| Interceptor | `.interceptor.ts` | `error.interceptor.ts`   |
| Model       | `.model.ts`       | `user.model.ts`          |
| Enum        | `.enum.ts`        | `user-role.enum.ts`      |
| Constants   | `.constants.ts`   | `api.constants.ts`       |
| Utilities   | `.utils.ts`       | `date.utils.ts`          |

- Use **kebab-case**: `user-profile.component.ts`
- Templates: **separate `.html` files** (never inline)
- Barrel exports: always `index.ts`

## Core Patterns

**Standalone Components** (no NgModules):

```typescript
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [CommonModule, ButtonComponent],
})
export class DashboardComponent {}
```

**Dependency Injection** (use `inject()`):

```typescript
export class UserComponent {
  private readonly userService = inject(UserService);
}
```

**Routing** (lazy-loaded):

```typescript
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard').then((m) => m.DashboardComponent),
    canActivate: [authGuard],
  },
];
```

**State** (use Signals):

```typescript
@Injectable({ providedIn: 'root' })
export class UserStateService {
  private readonly _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();
}
```
