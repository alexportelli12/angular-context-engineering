# Quick Task: $ARGUMENTS

Implement small feature/fix without full PRP workflow. Must follow project guardrails and standards.

**Use when:** Quick task (bug fix, small enhancement, simple component) doesn't need extensive planning.

**Don't use when:** Task requires architectural decisions, affects multiple features, complex integrations. Use `/prp.draft` → `/prp.generate` → `/prp.execute`.

## Execution Process

### 1. Load Context

**CRITICAL:** Understand architecture/standards before implementing.

**A. Project State**
- Read `project-state.md`
- Understand: features, components, services, models, routes, integration points, state patterns

**B. Architecture**
- Read `architecture.md`
- Understand: directory structure, layer responsibilities, module boundaries, barrel pattern, smart/dumb separation

**C. Coding Standards**
- Read `coding-standards.md`
- Understand Angular 21: signals (not BehaviorSubject), `inject()` (not constructor), `input()`/`output()` (not decorators), `@if`/`@for` (not *ngIf/*ngFor), separate .html/.css, Tailwind-first, NO .component. in filename, descriptive naming, method ≤20 lines

**D. Existing Patterns**
- Search `src/app/` for similar implementations
- Identify reusable patterns, components, services
- Check existing models/interfaces

### 2. Plan

**TodoWrite task breakdown:**
```yaml
Common order:
1. CREATE/UPDATE models (interfaces, enums, constants)
2. CREATE/UPDATE services (API, state)
3. CREATE/UPDATE components (page/shared)
4. CREATE/UPDATE templates (.html, @if/@for, Tailwind)
5. CREATE/UPDATE styles (.css ONLY if Tailwind insufficient)
6. UPDATE routing (app.routes.ts if new route)
7. UPDATE barrel exports (index.ts)
8. VALIDATE (build, lint)
9. UPDATE project state (if significant)
```

Adapt based on task:
- Bug fix: 3-4, 7-8
- New component: 1, 3-5, 7-8
- New page: 1-8 (possibly 9)

Mark in_progress → completed.

### 3. Implement

**Component Pattern:**
```typescript
// Filename: [name].ts (NO .component.)
import { Component, ChangeDetectionStrategy, signal, computed, input, output, inject } from '@angular/core';

@Component({
  selector: 'app-[name]',
  imports: [CommonModule /* ... */],
  templateUrl: './[name].html',
  styleUrl: './[name].css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class [Name]Component {
  private readonly service = inject(Service);
  requiredInput = input.required<string>();
  optionalInput = input<boolean>(false);
  twoWayBinding = model<string>('');
  actionTriggered = output<void>();
  localState = signal<Type | null>(null);
  computedValue = computed(() => this.localState()?.property ?? 'fallback');

  handleAction(): void { /* ≤20 lines */ }
}
```

**Template Pattern:**
```html
@if (isLoading()) {
  <app-spinner />
} @else if (data(); as item) {
  <div class="container mx-auto px-4 py-6">
    <h2 class="text-2xl font-bold mb-4">{{ item.title }}</h2>
    @for (child of item.children; track child.id) {
      <app-child [data]="child" (onAction)="handleAction($event)" class="mb-3" />
    } @empty {
      <p class="text-gray-500 italic">No items.</p>
    }
  </div>
} @else {
  <app-error [message]="errorMessage()" />
}
```

**Service Pattern:**
```typescript
// Filename: [name].service.ts
@Injectable({ providedIn: 'root' })
export class SomeService {
  private readonly http = inject(HttpClient);
  private dataState = signal<Data[]>([]);
  data = this.dataState.asReadonly();
  filteredData = computed(() => this.dataState().filter(item => item.active));

  async loadData(): Promise<void> {
    const result = await firstValueFrom(this.http.get<Data[]>('/api/data'));
    this.dataState.set(result);
  }
}
```

**Model Pattern:**
```typescript
// [name].model.ts (interfaces ONLY)
export interface User {
  id: string;
  name: string;
  role: UserRole;
}

// [name].enum.ts (enums ONLY)
export enum UserRole {
  Admin = 'ADMIN',
  Editor = 'EDITOR'
}

// [name].constants.ts (constants ONLY)
export const DEFAULT_PAGE_SIZE = 20;
export const API_ENDPOINTS = { users: '/api/users' } as const;
```

### 4. Critical Rules

- ✅ Signals: `signal()`, `computed()`
- ✅ DI: `inject(Service)`
- ✅ I/O: `input()`, `output()`, `model()`
- ✅ Control flow: `@if`, `@for`, `@switch`
- ✅ Files: separate .html/.css
- ✅ Styling: Tailwind first, custom CSS only when needed
- ✅ Naming: descriptive (userList not users, isLoading not loading)
- ✅ Methods: ≤20 lines, extract helpers
- ✅ Templates: use `computed()`, keep declarative
- ✅ Barrels: update `index.ts`
- ✅ Change detection: OnPush

### 5. Barrel Exports

**CRITICAL:** Update `index.ts` in modified directories.

```typescript
// pages/dashboard/index.ts
export * from './dashboard';

// models/index.ts
export * from './user.model';
export * from './user-role.enum';
export * from './user.constants';

// services/index.ts
export * from './auth.service';
```

Enables clean imports:
```typescript
// ✅ CORRECT
import { User, UserRole } from './models';

// ❌ WRONG
import { User } from './models/user.model';
```

### 6. Validate

Run sequentially:
```bash
npm run build       # Must succeed
npm run lint        # Must pass
```

**CRITICAL: Fix lint errors, NEVER disable rules.**

**If fails:**

Build errors:
- TypeScript compilation
- Verify imports
- Barrel exports updated
- Signal types correct

Lint errors:
- Fix issue (don't disable)
- Common: `@Input()`/`@Output()` → `input()`/`output()`, `*ngIf`/`*ngFor` → `@if`/`@for`, constructor → `inject()`, BehaviorSubject → `signal()`, missing OnPush, `.component.` in filename

Re-run until zero errors.

### 7. Update Project State (If Needed)

**UPDATE if:**
- New page/route added
- New service created
- New major feature
- Directory structure changed

**SKIP if:**
- Bug fix
- Small UI tweak
- Refactoring without new features
- Minor enhancement

**If updating `project-state.md`:**
1. Update "Last Updated"
2. Add to "Implemented Features"
3. Update "Active Routes" if routes added
4. Update "Services" if new service
5. Add to "Recent Changes"

### 8. Complete

Verify:
- [ ] Angular 21 conventions (signals, inject, input/output, @if/@for)
- [ ] NO .component. in filenames
- [ ] Tailwind classes (custom CSS only if needed)
- [ ] Barrels updated (index.ts)
- [ ] Methods ≤20 lines
- [ ] Template logic in `computed()`
- [ ] Build passes
- [ ] Lint passes
- [ ] Project state updated (if needed)
- [ ] TodoWrite completed

## Quick Reference: Angular 21

### ❌ NEVER (Legacy)
```typescript
constructor(private service: UserService) {}
@Input() userId!: string;
@Output() userDeleted = new EventEmitter<string>();
userList$ = new BehaviorSubject<User[]>([]);
<div *ngIf="isLoading">...</div>
user-list.component.ts
template: `<div>...</div>`
```

### ✅ ALWAYS (Angular 21)
```typescript
private readonly service = inject(UserService);
userId = input.required<string>();
userDeleted = output<string>();
userList = signal<User[]>([]);
@if (isLoading()) { ... }
user-list.ts
templateUrl: './user-list.html'
```

## Anti-Patterns

1. Skipping context loading
2. Ignoring existing patterns
3. Using legacy syntax
4. Disabling lint rules
5. Missing barrel exports
6. Complex templates
7. Long methods
8. Custom CSS first
9. Vague naming
10. Skipping validation

## Examples

### Add Loading Spinner Component
```bash
/quick.task create a loading spinner component in shared/ui
```

1. Load context → Architecture: shared/ui = dumb components
2. Plan → CREATE component, template, style, UPDATE index.ts, VALIDATE
3. Implement: `shared/ui/loading-spinner/` files
4. Validate → Build ✅, Lint ✅
5. Project state → No update (shared component)

### Fix Bug in UserService
```bash
/quick.task fix bug where user profile doesn't update after save
```

1. Load context → Find UserService
2. Plan → DEBUG, FIX, VALIDATE
3. Implement → Fix signal update
4. Validate → Build ✅, Lint ✅
5. Project state → No update (bug fix)

### Add Dashboard Route
```bash
/quick.task add dashboard page with user stats and recent activity
```

1. Load context → Architecture: pages/ = smart components
2. Plan → CREATE models, component, template/styles, UPDATE routing, VALIDATE, UPDATE state
3. Implement: models, `pages/dashboard/`, routes, barrels
4. Validate → Build ✅, Lint ✅
5. Project state → UPDATE (new route)

## When to Use PRP

**Use `/prp.draft` → `/prp.generate` → `/prp.execute` if:**
- Architectural decisions needed
- Affects multiple parts
- Complex state management
- External service integration
- Multiple components/services
- Unclear requirements
- Team collaboration needed

**Use `/quick.task` if:**
- Simple bug fix
- New shared UI component
- Small enhancement
- Clear, straightforward
- Single/few-file change
- Well-understood requirements
