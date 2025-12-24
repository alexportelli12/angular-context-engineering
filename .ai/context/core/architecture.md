# Application Architecture

## Overview

This Angular application follows a modular, domain-driven architecture built entirely with **Standalone Components** (no NgModules). The structure is designed for scalability, maintainability, and clear separation of concerns.

## Directory Structure

```
src/app/
├── core/           # Application-wide singletons
├── pages/          # Feature modules and routed views
├── shared/         # Reusable code across features
│   ├── ui/         # Shared UI components
│   └── utils/      # Shared utilities and helpers
├── models/         # Global TypeScript interfaces and types
├── services/       # Global singleton services
├── app.ts          # Root application component
├── app.routes.ts   # Application routing configuration
└── app.config.ts   # Application providers and configuration
```

## Layer Responsibilities

### `core/` - Application Core Layer

**Purpose:** Application-wide singleton services, guards, and interceptors that are loaded once at application bootstrap.

**Contains:**

- HTTP interceptors
- Authentication guards
- Route guards
- Error handlers
- Application initialization logic
- Core singleton services

**Rules:**

- All services in `core/` must be provided in `root`
- Should be imported only once (typically in `app.config.ts`)
- No UI components belong here
- Must have an `index.ts` barrel export

**Example:**

```typescript
// core/guards/auth.guard.ts
export const authGuard = () => inject(AuthService).isAuthenticated();

// core/interceptors/http-error.interceptor.ts
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError(handleError));
};

// core/index.ts
export * from './guards/auth.guard';
export * from './interceptors/http-error.interceptor';
```

### `pages/` - Feature/Page Layer

**Purpose:** Route-level components that represent distinct pages or features of the application. These are typically lazy-loaded.

**Contains:**

- Page components (routed views)
- Feature-specific child components
- Feature-specific services (when not global)
- Page-level state management

**Rules:**

- Each page should be lazy-loadable via routing
- Page components use the `.component.ts` suffix
- All pages are standalone components
- Must have an `index.ts` barrel export
- Organize by feature/domain (e.g., `pages/dashboard/`, `pages/profile/`)

**Example:**

```typescript
// pages/dashboard/dashboard.component.ts
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [CommonModule /* other deps */],
})
export class DashboardComponent {}

// pages/index.ts
export * from './dashboard/dashboard.component';
export * from './profile/profile.component';

// app.routes.ts (lazy loading)
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
];
```

### `shared/` - Shared Resources Layer

**Purpose:** Reusable code that can be imported across multiple features.

#### `shared/ui/` - Shared UI Components

**Contains:**

- Presentational components (buttons, cards, modals)
- Form controls
- Layout components
- Directives
- Pipes

**Rules:**

- Components should be pure/presentational when possible
- Use input/output properties for communication
- No direct service dependencies (inject via parent)
- All components are standalone
- Must have an `index.ts` barrel export

**Example:**

```typescript
// shared/ui/button/button.component.ts
@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class ButtonComponent {
  readonly variant = input<'primary' | 'secondary'>('primary');
  readonly clicked = output<void>();
}

// shared/ui/index.ts
export * from './button/button.component';
export * from './card/card.component';
```

#### `shared/utils/` - Shared Utilities

**Contains:**

- Helper functions
- Validators
- Formatters
- Custom RxJS operators
- Type guards
- Constants (non-model related)

**Rules:**

- Pure functions preferred
- No side effects
- Fully typed
- Must have an `index.ts` barrel export

**Example:**

```typescript
// shared/utils/date.utils.ts
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// shared/utils/validators.ts
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    // validation logic
  };
}

// shared/utils/index.ts
export * from './date.utils';
export * from './validators';
```

### `models/` - Type Definitions Layer

**Purpose:** Global TypeScript interfaces, types, enums, and constants that define the application's data structures.

**Contains:**

- Interface definitions
- Type aliases
- Enums
- Domain constants

**Rules:**

- Use `.model.ts` suffix for interfaces/types
- Use `.enum.ts` suffix for enums
- Use `.constants.ts` suffix for constant values
- No implementation logic
- Must have an `index.ts` barrel export

**Example:**

```typescript
// models/user.model.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// models/user-role.enum.ts
export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST',
}

// models/api.constants.ts
export const API_BASE_URL = '/api/v1';
export const DEFAULT_PAGE_SIZE = 20;

// models/index.ts
export * from './user.model';
export * from './user-role.enum';
export * from './api.constants';
```

### `services/` - Global Services Layer

**Purpose:** Application-wide services that provide business logic, state management, and API communication.

**Contains:**

- API services
- State management services
- Utility services
- Data transformation services

**Rules:**

- Use `.service.ts` suffix
- Provide in `root` for singleton behavior
- All services are standalone (no NgModule required)
- Must have an `index.ts` barrel export

**Example:**

```typescript
// services/user.service.ts
@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }
}

// services/index.ts
export * from './user.service';
export * from './auth.service';
```

## The Barrel Pattern (Critical)

**Every directory MUST have an `index.ts` file that exports its public API.**

### Why?

- Clean imports throughout the application
- Easier refactoring (internal file changes don't affect imports)
- Clear public API boundaries
- Reduced coupling

### Implementation Rules

1. **Always create `index.ts`** in every feature folder
2. **Always import from the directory**, never from individual files
3. **Use path aliases** for clean imports (when configured)

**Example Structure:**

```typescript
// ❌ WRONG - Never import from individual files
import { User } from './models/user.model';
import { UserRole } from './models/user-role.enum';

// ✅ CORRECT - Always import from the barrel
import { User, UserRole } from './models';
```

**Creating a barrel export:**

```typescript
// models/index.ts
export * from './user.model';
export * from './user-role.enum';
export * from './product.model';
export * from './api.constants';
```

### Path Mapping (Optional Enhancement)

Add to `tsconfig.json` for even cleaner imports:

```json
{
  "compilerOptions": {
    "paths": {
      "@core/*": ["src/app/core/*"],
      "@models": ["src/app/models"],
      "@shared/*": ["src/app/shared/*"],
      "@services": ["src/app/services"],
      "@pages/*": ["src/app/pages/*"]
    }
  }
}
```

**Usage with path mapping:**

```typescript
// Instead of:
import { User } from '../../../models';

// Use:
import { User } from '@models';
```

## File Naming Conventions

All files must follow strict naming conventions to ensure consistency and clarity:

| Type            | Suffix            | Example                     |
| --------------- | ----------------- | --------------------------- |
| Component       | `.component.ts`   | `dashboard.component.ts`    |
| Service         | `.service.ts`     | `user.service.ts`           |
| Guard           | `.guard.ts`       | `auth.guard.ts`             |
| Interceptor     | `.interceptor.ts` | `http-error.interceptor.ts` |
| Directive       | `.directive.ts`   | `tooltip.directive.ts`      |
| Pipe            | `.pipe.ts`        | `date-format.pipe.ts`       |
| Model/Interface | `.model.ts`       | `user.model.ts`             |
| Type            | `.type.ts`        | `response.type.ts`          |
| Enum            | `.enum.ts`        | `user-role.enum.ts`         |
| Constants       | `.constants.ts`   | `api.constants.ts`          |
| Utilities       | `.utils.ts`       | `date.utils.ts`             |
| Validators      | `.validators.ts`  | `form.validators.ts`        |

**Additional Rules:**

- Use kebab-case for all file names (`user-profile.component.ts`, not `UserProfile.component.ts`)
- Template files: `*.html` (NEVER inline templates)
- Style files: `*.css` (match the component's style)
- Barrel exports: Always `index.ts`

## Standalone Components

This application uses **Standalone Components exclusively** - NgModules are not used.

### Key Characteristics

**Component Definition:**

```typescript
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [CommonModule, RouterOutlet, ButtonComponent], // Direct imports
})
export class DashboardComponent {}
```

**Benefits:**

- Simpler mental model
- Easier lazy loading
- Better tree-shaking
- Less boilerplate
- Explicit dependencies

**Rules:**

1. Every component must declare its own `imports` array
2. Components can import other standalone components, directives, pipes
3. Use `CommonModule` for common directives (`*ngIf`, `*ngFor`, etc.)
4. No `NgModule` declarations anywhere

## Dependency Injection

Use the modern `inject()` function instead of constructor injection:

**Example:**

```typescript
// ✅ PREFERRED - Modern inject() pattern
@Component({
  /* ... */
})
export class UserComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  loadUser(id: string): void {
    this.userService.getUser(id).subscribe(/* ... */);
  }
}

// ❌ AVOID - Constructor injection (still valid but verbose)
@Component({
  /* ... */
})
export class UserComponent {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}
}
```

## Routing Strategy

### Route Configuration

Routes are defined in `app.routes.ts` and use **lazy loading** for features:

```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
  },
];
```

### Route Guards

Use functional guards (not class-based):

```typescript
// core/guards/auth.guard.ts
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.parseUrl('/login');
};
```

## State Management

For simple state, use **Signals** (Angular 16+):

```typescript
// services/user-state.service.ts
@Injectable({ providedIn: 'root' })
export class UserStateService {
  private readonly _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();

  setUser(user: User): void {
    this._user.set(user);
  }
}

// Component usage
@Component({
  /* ... */
})
export class ProfileComponent {
  private readonly userState = inject(UserStateService);
  readonly currentUser = this.userState.user; // Reactive signal
}
```

## Best Practices Summary

1. **Always use barrel exports** - Every directory must have `index.ts`
2. **Import from directories**, never from individual files
3. **Use standalone components** - No NgModules
4. **Lazy load routes** - Improve initial load time
5. **Follow naming conventions** - Consistent `.component.ts`, `.service.ts`, etc.
6. **Never inline templates** - Always use separate `.html` files
7. **Use the `inject()` function** - Modern DI pattern
8. **Keep components presentational** in `shared/ui/`
9. **Provide services in root** for singleton behavior
10. **Organize by feature** in `pages/` directory
11. **Keep `core/` for singletons only** - Guards, interceptors, app-level services
12. **Use Signals for reactive state** - Modern Angular pattern
13. **Strict TypeScript** - Leverage type safety
14. **SSR Support** - Application is configured for Server-Side Rendering

## Additional Resources

- Angular Standalone Components: https://angular.dev/guide/components/importing
- Dependency Injection with inject(): https://angular.dev/guide/di/dependency-injection
- Angular Signals: https://angular.dev/guide/signals
- Routing & Lazy Loading: https://angular.dev/guide/routing
