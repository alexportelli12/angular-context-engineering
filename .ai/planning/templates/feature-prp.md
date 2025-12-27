# Feature PRP Template — Angular v21

## Purpose

This template guides AI agents through implementing Angular features with full context, validation, and pattern consistency. Optimized for single-pass success with iterative validation loops.

---

## Goal

[Brief description: e.g., "Create user profile page with editable form"]

## Why

- [Business/user value]
- [Technical benefit]
- [Performance/UX improvement]

## What

[Specific changes: components, services, models, routing, etc.]

### Success Criteria

- [ ] Feature behaves as described with correct UI rendering
- [ ] All state uses signals (not BehaviorSubject)
- [ ] Templates use `@if`/`@for`/`@switch` (not `*ngIf`/`*ngFor`)
- [ ] Components use `inject()`, `input()`, `output()` (not decorators)
- [ ] OnPush change detection compatible (zoneless)
- [ ] Unit tests pass with Vitest
- [ ] Build succeeds: `npm run build`
- [ ] Follows architecture in `.ai/context/core/`

---

## Context References

### Project State (Baseline Context)

**Read `.ai/memory/project-state.md` first** to understand:

- Implemented features and their components
- Existing services and state management
- Active routes and integration points
- Recent changes and established patterns

### Files to Reference

```yaml
- file: .ai/memory/project-state.md
  why: Current project state and existing features

- file: src/app/pages/[feature]/[component].component.ts
  why: Main feature component structure

- file: src/app/services/[service].service.ts
  why: API/business logic implementation

- file: src/app/models/[model].model.ts
  why: TypeScript interfaces and types

- file: src/app/shared/ui/[component]/[component].component.ts
  why: Reusable UI component pattern
```

### Current Structure (relevant parts)

```
src/app/
├── pages/[feature]/          # Feature being modified
├── services/                 # Global services
├── models/                   # Type definitions
└── shared/ui/                # Reusable components
```

### Desired Structure After

```
src/app/
├── pages/[feature]/
│   ├── [component].component.ts   # NEW/MODIFIED
│   ├── [component].component.html
│   ├── [component].component.scss
│   └── index.ts                   # Barrel export
├── services/
│   └── [service].service.ts       # NEW/MODIFIED
└── models/
    ├── [model].model.ts           # NEW
    └── index.ts                   # UPDATE
```

---

## Angular 21 Gotchas

```typescript
// GOTCHA: Use inject() not constructor DI
private readonly service = inject(MyService);

// GOTCHA: Signals for state, NOT BehaviorSubject
userList = signal<User[]>([]);

// GOTCHA: input()/output() functions, NOT @Input/@Output
userId = input.required<string>();
userDeleted = output<string>();

// GOTCHA: Templates use @if/@for, NOT *ngIf/*ngFor
// @if (isLoading()) { <app-spinner /> }

// GOTCHA: All components standalone: true
@Component({ standalone: true, imports: [...] })

// GOTCHA: OnPush change detection (zoneless compatible)
changeDetection: ChangeDetectionStrategy.OnPush

// GOTCHA: Separate .html files (no inline templates)
templateUrl: './component.component.html'

// GOTCHA: Barrel exports required (index.ts)
// export * from './component.component';
```

---

## Implementation Blueprint

### Files to Create/Modify

```typescript
// CREATE: pages/[feature]/[component].component.ts
// - Standalone component with OnPush
// - Use signals for state
// - inject() for dependencies

// CREATE: pages/[feature]/[component].component.html
// - Use @if/@for/@switch syntax
// - Bind to signals with ()

// CREATE: services/[service].service.ts
// - Injectable({ providedIn: 'root' })
// - Return Observables for async, signals for sync state

// CREATE: models/[model].model.ts
// - Export interfaces only
// - Separate file per model

// UPDATE: app.routes.ts
// - Add lazy-loaded route if needed
```

### Ordered Task List

```yaml
Task 1:
  action: CREATE models/[model].model.ts
  details:
    - Define TypeScript interfaces
    - Export from models/index.ts

Task 2:
  action: CREATE services/[service].service.ts
  details:
    - @Injectable({ providedIn: 'root' })
    - Use inject() for HttpClient
    - Return Observable<T> for async operations

Task 3:
  action: CREATE pages/[feature]/[component].component.ts
  details:
    - Standalone component with OnPush
    - Define signals for state
    - inject() service dependencies
    - Implement lifecycle methods if needed

Task 4:
  action: CREATE pages/[feature]/[component].component.html
  details:
    - Use @if/@for/@switch control flow
    - Bind to signals: {{ user() }}
    - Handle outputs with events

Task 5:
  action: UPDATE app.routes.ts
  details:
    - Add lazy-loaded route
    - Apply guards if needed

Task 6:
  action: CREATE [component].component.spec.ts
  details:
    - Use Vitest (describe, it, expect, vi)
    - Test signal updates
    - Mock services with vi.mock()
```

### Implementation Pseudocode

```typescript
// Component Pattern
@Component({
  selector: 'app-[name]',
  standalone: true,
  imports: [CommonModule, /* shared components */],
  templateUrl: './[name].component.html',
  styleUrl: './[name].component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class [Name]Component {
  // Services
  private readonly service = inject([Service]);

  // Inputs
  itemId = input.required<string>();

  // Outputs
  itemDeleted = output<string>();

  // State (signals)
  isLoading = signal<boolean>(false);
  data = signal<DataType | null>(null);

  // Computed
  displayValue = computed(() => this.data()?.name ?? 'N/A');

  // Lifecycle
  ngOnInit() {
    effect(() => {
      // React to signal changes
    });
  }

  // Methods
  handleAction(): void {
    // Business logic
    this.itemDeleted.emit(this.itemId());
  }
}
```

```html
<!-- Template Pattern -->
@if (isLoading()) {
<app-spinner />
} @else if (data(); as item) {
<div class="container">
  <h1>{{ item.name }}</h1>
  @for (child of item.children; track child.id) {
  <app-child-card [child]="child" />
  } @empty {
  <p>No children found.</p>
  }
</div>
} @else {
<app-error message="Failed to load data" />
}
```

---

## Integration Points

```yaml
ROUTING:
  - Lazy-loaded via loadComponent in app.routes.ts
  - Guards applied via canActivate

STATE:
  - Use signals for sync state
  - RxJS Observables ONLY for async (HTTP, timers)

STYLING:
  - Tailwind 4 classes in templates
  - Use @theme in .scss files (NOT tailwind.config.js)
```

---

## Validation Loop

### Level 1: Dev Server

```bash
npm run start
# Visual check in browser at http://localhost:4200
```

### Level 2: Build & Lint

```bash
npm run build        # Production build must succeed
npm run lint         # No ESLint errors
```

---

## Final Validation Checklist

- [ ] Component uses standalone: true
- [ ] State managed with signals (not BehaviorSubject)
- [ ] DI uses inject() (not constructor)
- [ ] Inputs/outputs use input()/output() functions
- [ ] Templates use @if/@for/@switch
- [ ] OnPush change detection set
- [ ] Separate .html file (no inline templates)
- [ ] Barrel export in index.ts
- [ ] File naming: kebab-case with suffix (.component.ts)
- [ ] Tests use Vitest syntax
- [ ] Build passes: `npm run build`
- [ ] Lint passes: `npm run lint`
- [ ] Follows `.ai/context/core/architecture.md`
- [ ] Follows `.ai/context/core/coding-standards.md`
- [ ] **`.ai/memory/project-state.md` updated with this feature**

---

## Anti-Patterns to Avoid

- ❌ `@Input()/@Output()` decorators → Use `input()/output()` functions
- ❌ `*ngIf/*ngFor` → Use `@if/@for/@switch`
- ❌ Constructor DI → Use `inject()`
- ❌ BehaviorSubject for state → Use `signal()`
- ❌ NgModules → Use standalone components
- ❌ Zone.js patterns → OnPush + signals (zoneless)
- ❌ Inline templates → Separate .html files
- ❌ Mixing models/enums/constants → Separate files
- ❌ Missing barrel exports → Always add index.ts
- ❌ Jasmine test syntax → Use Vitest (vi.mock, describe, it)
- ❌ tailwind.config.js → Use @theme in CSS files
