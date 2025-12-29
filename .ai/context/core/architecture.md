# Architecture

## Directory Structure

```
src/app/
├── core/           # Guards, interceptors, error handlers (singletons)
├── pages/          # Smart components (routed, inject services)
├── shared/
│   ├── ui/         # Dumb components (input/output only)
│   └── utils/      # Pure functions, validators, helpers
├── models/         # TypeScript interfaces, enums, constants
├── services/       # Global services (API, state management)
├── app.ts
├── app.routes.ts
└── app.config.ts
```

## Layer Responsibilities

### core/ - Application Infrastructure

- Guards, interceptors, error handlers
- Provided in root, configured in app.config.ts
- NO UI components
- MUST have index.ts barrel export

```typescript
// auth.guard.ts
export const authGuard = () => inject(AuthService).isAuthenticated();
```

### pages/ - Smart Components

- Lazy-loaded via routing
- Inject services using inject()
- Manage state with signals
- External templates required
- NO .component. in filename (user-list.ts not user-list.component.ts)
- MUST have index.ts barrel export

```typescript
// app.routes.ts
{
  path: 'dashboard',
  loadComponent: () => import('./pages/dashboard').then(m => m.DashboardComponent),
}
```

### shared/ui/ - Dumb Components

- input()/output() ONLY, NO service injection
- OnPush change detection required
- External templates required
- MUST have index.ts barrel export

```typescript
@Component({ selector: 'app-button' })
export class ButtonComponent {
  variant = input<'primary' | 'secondary'>('primary');
  clicked = output<void>();
}
```

### shared/utils/ - Pure Functions

- NO side effects, fully typed
- Validators, formatters, type guards

```typescript
export function formatDate(date: Date): string { /* ... */ }
export function emailValidator(): ValidatorFn { /* ... */ }
```

### models/ - Type Definitions

- Interfaces (.model.ts), Enums (.enum.ts), Constants (.constants.ts)
- NO implementation logic
- Separate files for each type
- MUST have index.ts barrel export

```typescript
// user.model.ts
export interface User {
  id: string;
  email: string;
  role: UserRole;
}
```

### services/ - Global Services

- @Injectable({ providedIn: 'root' })
- Use .service.ts suffix
- Return Observable for async, signal for sync state
- MUST have index.ts barrel export

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  getUser(id: string): Observable<User> { /* ... */ }
}
```

## Barrel Pattern (Required)

**Every directory MUST have index.ts exporting public API.**

```typescript
// ❌ WRONG
import { User } from './models/user.model';

// ✅ CORRECT
import { User } from './models';
```

## File Naming

| Type        | Suffix            | Example                |
|-------------|-------------------|------------------------|
| Component   | .ts               | user-list.ts           |
| Service     | .service.ts       | auth.service.ts        |
| Guard       | .guard.ts         | auth.guard.ts          |
| Interceptor | .interceptor.ts   | error.interceptor.ts   |
| Model       | .model.ts         | user.model.ts          |
| Enum        | .enum.ts          | user-role.enum.ts      |
| Constants   | .constants.ts     | api.constants.ts       |
| Utilities   | .utils.ts         | date.utils.ts          |

- Kebab-case: user-profile.ts
- NO .component. in component filenames
- Templates: separate .html (never inline)
- Styles: separate .css (Tailwind first, custom CSS only when needed)

## Core Patterns

**Component:**
```typescript
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [CommonModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly service = inject(UserService);
}
```

**Routing (lazy-loaded):**
```typescript
{
  path: 'dashboard',
  loadComponent: () => import('./pages/dashboard').then(m => m.DashboardComponent),
  canActivate: [authGuard],
}
```

**State (signals):**
```typescript
@Injectable({ providedIn: 'root' })
export class UserStateService {
  private readonly _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();
}
```
