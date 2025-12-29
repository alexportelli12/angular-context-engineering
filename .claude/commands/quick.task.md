# Quick Task: $ARGUMENTS

Implement a small feature or fix directly without the full PRP workflow, while adhering to all project guardrails and standards.

> **Use this when:** You need to implement something quick (bug fix, small enhancement, simple component) that doesn't require extensive planning, but must still follow project architecture and coding standards.
>
> **Don't use this when:** The task requires architectural decisions, affects multiple features, or involves complex integrations. Use `/prp.draft` → `/prp.generate` → `/prp.execute` instead.

---

## Execution Process

### 1. Load Project Context

**CRITICAL:** Before implementing anything, understand the project's architecture and standards.

**A. Load Project State**

- Open `.ai/memory/project-state.md`
- Understand:
  - Currently implemented features and components
  - Existing services and models
  - Active routes and integration points
  - State management patterns used

**B. Load Architecture Standards**

- Open `.ai/context/core/architecture.md`
- Understand:
  - Directory structure and layer responsibilities
  - Module boundaries (pages/, shared/ui/, services/, models/)
  - Barrel export pattern (index.ts in all directories)
  - Smart vs Dumb component separation

**C. Load Coding Standards**

- Open `.ai/context/core/coding-standards.md`
- Understand Angular 21 conventions:
  - Signals for state (NOT BehaviorSubject)
  - `inject()` for DI (NOT constructor)
  - `input()`/`output()` functions (NOT @Input/@Output decorators)
  - `@if`/`@for`/`@switch` syntax (NOT *ngIf/*ngFor)
  - Separate `.html` and `.css` files (NOT inline)
  - Tailwind-first styling approach
  - Component naming (NO .component. in filename)
  - Descriptive naming (no abbreviations)
  - Method length limits (≤20 lines)

**D. Search Existing Patterns**

- Search `src/app/` for similar implementations
- Identify reusable patterns, components, or services
- Check for existing models or interfaces to extend

### 2. Plan Implementation

**Use TodoWrite to create a task breakdown:**

```yaml
Common task order:
1. CREATE/UPDATE models (if needed: interfaces, enums, constants)
2. CREATE/UPDATE services (if needed: API calls, state management)
3. CREATE/UPDATE components (page or shared/ui)
4. CREATE/UPDATE templates (.html with @if/@for, Tailwind classes)
5. CREATE/UPDATE styles (.css ONLY if Tailwind insufficient)
6. UPDATE routing (app.routes.ts if adding new route)
7. UPDATE barrel exports (index.ts in modified directories)
8. VALIDATE (build and lint)
9. UPDATE project state (if significant feature added)
```

**Adapt this order based on the task:**
- Bug fix: May only need steps 3-4, 7-8
- New component: Steps 1, 3-5, 7-8
- New page: Steps 1-8 (possibly 9)

Mark each task as `in_progress` before starting, `completed` when done.

### 3. Implement Following Standards

**CRITICAL: Apply Angular 21 patterns consistently.**

#### Component Pattern

```typescript
// Filename: [name].ts (NO .component. in filename)
import { Component, ChangeDetectionStrategy, signal, computed, input, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-[name]',
  imports: [CommonModule /* add other imports */],
  templateUrl: './[name].html',
  styleUrl: './[name].css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class [Name]Component {
  // Dependency injection
  private readonly service = inject(SomeService);
  private readonly router = inject(Router);

  // Inputs (NOT @Input decorator)
  requiredInput = input.required<string>();
  optionalInput = input<boolean>(false);
  twoWayBinding = model<string>('');

  // Outputs (NOT @Output decorator)
  actionTriggered = output<void>();
  valueChanged = output<string>();

  // State management (signals, NOT BehaviorSubject)
  localState = signal<Type | null>(null);
  isLoading = signal<boolean>(false);

  // Computed values
  computedValue = computed(() => {
    const state = this.localState();
    return state?.property ?? 'fallback';
  });

  // Methods (keep ≤20 lines, extract private methods if needed)
  handleAction(): void {
    // Implementation
  }
}
```

#### Template Pattern

```html
<!-- Use @if/@for/@switch, NOT *ngIf/*ngFor -->
<!-- Use Tailwind classes for styling -->

@if (isLoading()) {
  <app-spinner />
} @else if (data(); as item) {
  <div class="container mx-auto px-4 py-6">
    <h2 class="text-2xl font-bold mb-4">{{ item.title }}</h2>

    @for (child of item.children; track child.id) {
      <app-child-card
        [data]="child"
        (onAction)="handleChildAction($event)"
        class="mb-3" />
    } @empty {
      <p class="text-gray-500 italic">No items found.</p>
    }
  </div>
} @else {
  <app-error [message]="errorMessage()" />
}
```

#### Service Pattern

```typescript
// Filename: [name].service.ts
import { Injectable, signal, computed, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SomeService {
  private readonly http = inject(HttpClient);

  // State: Use signals (NOT BehaviorSubject)
  private dataState = signal<Data[]>([]);

  // Public read-only access
  data = this.dataState.asReadonly();

  // Computed values
  filteredData = computed(() =>
    this.dataState().filter(item => item.active)
  );

  // Methods
  async loadData(): Promise<void> {
    const result = await firstValueFrom(this.http.get<Data[]>('/api/data'));
    this.dataState.set(result);
  }
}
```

#### Model Pattern

```typescript
// Filename: [name].model.ts (interfaces ONLY)
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface UserProfile extends User {
  bio: string;
  avatar: string;
}
```

```typescript
// Filename: [name].enum.ts (enums ONLY)
export enum UserRole {
  Admin = 'ADMIN',
  Editor = 'EDITOR',
  Viewer = 'VIEWER'
}
```

```typescript
// Filename: [name].constants.ts (constants ONLY)
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_FILE_SIZE_MB = 5;

export const API_ENDPOINTS = {
  users: '/api/users',
  profiles: '/api/profiles'
} as const;
```

### 4. Follow Critical Rules

- ✅ Signals for state → `signal()`, `computed()`
- ✅ Inject function → `inject(Service)`
- ✅ Input/output functions → `input()`, `output()`, `model()`
- ✅ Control flow syntax → `@if`, `@for`, `@switch`
- ✅ Separate files → `.html` and `.css` (not inline)
- ✅ Tailwind first → Use Tailwind classes, custom CSS only when needed
- ✅ Simple filenames → `user-list.ts` (NO .component.)
- ✅ Descriptive names → `userList` not `users`, `isLoading` not `loading`
- ✅ Short methods → ≤20 lines, extract private helpers
- ✅ Template logic → Use `computed()`, keep templates declarative
- ✅ Barrel exports → Update `index.ts` in modified directories
- ✅ OnPush detection → Always use `ChangeDetectionStrategy.OnPush`

### 5. Update Barrel Exports

**CRITICAL:** Every directory must have `index.ts` exporting its public API.

**When you create or modify files in a directory, update its `index.ts`:**

```typescript
// pages/dashboard/index.ts
export * from './dashboard';

// models/index.ts
export * from './user.model';
export * from './user-role.enum';
export * from './user.constants';

// services/index.ts
export * from './auth.service';
export * from './user.service';
```

**This enables clean imports:**

```typescript
// ✅ CORRECT
import { User, UserRole } from './models';
import { AuthService } from './services';

// ❌ WRONG
import { User } from './models/user.model';
import { UserRole } from './models/user-role.enum';
```

### 6. Validate Implementation

**Run validation commands in sequence:**

```bash
npm run build       # Production build MUST succeed
npm run lint        # ESLint validation MUST pass
```

**CRITICAL: Fix lint errors, NEVER disable ESLint rules.**

**If validation fails:**

1. **Build errors:**
   - Check for TypeScript compilation errors
   - Verify all imports are correct
   - Ensure barrel exports are updated
   - Confirm signal types are correct

2. **Lint errors:**
   - Fix the underlying issue (don't disable the rule)
   - Common issues:
     - Using `@Input()`/`@Output()` instead of `input()`/`output()`
     - Using `*ngIf`/`*ngFor` instead of `@if`/`@for`
     - Constructor injection instead of `inject()`
     - BehaviorSubject instead of `signal()`
     - Missing OnPush change detection
     - Component filename contains `.component.`

**Re-run until both build and lint pass with zero errors.**

### 7. Update Project State (If Needed)

**Determine if project state update is needed:**

**UPDATE if:**
- New page/route was added
- New service was created (not just modified)
- New major feature was implemented
- Directory structure changed

**SKIP if:**
- Bug fix in existing code
- Small UI tweak
- Refactoring without new features
- Minor enhancement to existing component

**If updating `.ai/memory/project-state.md`:**

1. Update "Last Updated" timestamp
2. Add to "Implemented Features" if significant
3. Update "Active Routes" table if routes added
4. Update "Services" section if new service created
5. Add to "Recent Changes" table

### 8. Complete

**Before marking as complete, verify:**

- [ ] All Angular 21 conventions followed (signals, inject, input/output, @if/@for)
- [ ] Component filenames do NOT contain `.component.`
- [ ] Templates use Tailwind classes (custom CSS only if needed)
- [ ] Barrel exports (`index.ts`) updated in all modified directories
- [ ] Methods are ≤20 lines (extracted to private helpers if longer)
- [ ] Template logic moved to `computed()` signals
- [ ] Build passes: `npm run build` ✅
- [ ] Lint passes: `npm run lint` ✅
- [ ] Project state updated (if needed)
- [ ] All TodoWrite tasks marked as completed

---

## Quick Reference: Angular 21 Patterns

### ❌ NEVER Use (Legacy)

```typescript
// ❌ Constructor DI
constructor(private service: UserService) {}

// ❌ Decorator-based inputs/outputs
@Input() userId!: string;
@Output() userDeleted = new EventEmitter<string>();

// ❌ BehaviorSubject for state
userList$ = new BehaviorSubject<User[]>([]);

// ❌ Legacy template syntax
<div *ngIf="isLoading">...</div>
<div *ngFor="let user of users">...</div>

// ❌ Component in filename
user-list.component.ts

// ❌ Inline template/styles
template: `<div>...</div>`
```

### ✅ ALWAYS Use (Angular 21)

```typescript
// ✅ inject() function
private readonly service = inject(UserService);

// ✅ input/output functions
userId = input.required<string>();
userDeleted = output<string>();

// ✅ Signals for state
userList = signal<User[]>([]);

// ✅ Modern template syntax
@if (isLoading()) { ... }
@for (user of users(); track user.id) { ... }

// ✅ Simple filename
user-list.ts

// ✅ External template/styles
templateUrl: './user-list.html'
styleUrl: './user-list.css'
```

---

## Anti-Patterns to Avoid

1. **Skipping context loading** → Always read architecture.md and coding-standards.md first
2. **Ignoring existing patterns** → Search codebase for similar implementations
3. **Using legacy syntax** → Follow Angular 21 conventions strictly
4. **Disabling lint rules** → Fix the underlying issue instead
5. **Missing barrel exports** → Always update index.ts
6. **Complex templates** → Move logic to computed() signals
7. **Long methods** → Keep ≤20 lines, extract helpers
8. **Custom CSS first** → Use Tailwind classes, CSS only when needed
9. **Vague naming** → Use descriptive names (isLoading not loading)
10. **Skipping validation** → Always run build and lint

---

## Examples

### Example 1: Add Loading Spinner Component

```bash
/quick.task create a loading spinner component in shared/ui
```

**Execution:**
1. Load context → Architecture: shared/ui = dumb components
2. Plan → CREATE component, template, style, UPDATE index.ts, VALIDATE
3. Implement:
   - `src/app/shared/ui/loading-spinner/loading-spinner.ts`
   - `src/app/shared/ui/loading-spinner/loading-spinner.html`
   - `src/app/shared/ui/loading-spinner/loading-spinner.css`
   - Update `src/app/shared/ui/index.ts`
4. Validate → Build ✅, Lint ✅
5. Project state → No update needed (shared component)

### Example 2: Fix Bug in User Service

```bash
/quick.task fix the bug where user profile doesn't update after save
```

**Execution:**
1. Load context → Find UserService in services/
2. Plan → DEBUG issue, FIX bug, VALIDATE
3. Implement → Modify signal update logic in UserService
4. Validate → Build ✅, Lint ✅
5. Project state → No update needed (bug fix)

### Example 3: Add New Dashboard Route

```bash
/quick.task add a dashboard page with user stats and recent activity
```

**Execution:**
1. Load context → Architecture: pages/ = smart components
2. Plan → CREATE models, CREATE component, CREATE template/styles, UPDATE routing, VALIDATE, UPDATE project state
3. Implement:
   - Models: `src/app/models/dashboard-stats.model.ts`
   - Component: `src/app/pages/dashboard/dashboard.ts`
   - Template: `src/app/pages/dashboard/dashboard.html`
   - Styles: `src/app/pages/dashboard/dashboard.css`
   - Update: `src/app/app.routes.ts`
   - Update: `src/app/pages/index.ts`, `src/app/models/index.ts`
4. Validate → Build ✅, Lint ✅
5. Project state → UPDATE (new route added)

---

## When to Use PRP Instead

**Use `/prp.draft` → `/prp.generate` → `/prp.execute` if:**

- Task requires architectural decisions
- Feature affects multiple parts of the app
- Complex state management needed
- Integration with external services
- Multiple components and services
- Unclear requirements needing clarification
- Team collaboration needed on approach

**Use `/quick.task` if:**

- Simple bug fix
- New shared UI component
- Small enhancement to existing feature
- Clear, straightforward implementation
- Single-file or few-file change
- Well-understood requirements

---

## Summary Checklist

Before completing, ensure:

- [ ] **Context loaded:** Architecture, coding standards, project state reviewed
- [ ] **Patterns followed:** Angular 21 syntax (signals, inject, input/output, @if/@for)
- [ ] **Files organized:** Separate .html/.css, models/enums/constants split
- [ ] **Naming correct:** Descriptive names, no .component. in filenames
- [ ] **Code quality:** Methods ≤20 lines, template logic in computed()
- [ ] **Styling:** Tailwind classes used first, minimal custom CSS
- [ ] **Exports:** Barrel exports (index.ts) updated
- [ ] **Validation:** Build passes, lint passes (no rules disabled)
- [ ] **Documentation:** Project state updated if significant feature added
- [ ] **Tasks complete:** All TodoWrite items marked completed
