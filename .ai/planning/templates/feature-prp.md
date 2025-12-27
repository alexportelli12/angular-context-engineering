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
- [ ] Tailwind classes used for styling (custom CSS only when needed)
- [ ] Component filenames without `.component.` (e.g., `user-list.ts`)
- [ ] Build succeeds: `npm run build`
- [ ] Lint passes: `npm run lint` (all issues fixed, not disabled)
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
│   ├── [component].ts             # NEW/MODIFIED (no .component. in filename)
│   ├── [component].html
│   ├── [component].css
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

// GOTCHA: Components are standalone by default (no need for standalone: true)
@Component({ imports: [...] })

// GOTCHA: OnPush change detection (zoneless compatible)
changeDetection: ChangeDetectionStrategy.OnPush

// GOTCHA: Separate .html and .css files (no inline templates/styles)
templateUrl: './component.html'
styleUrl: './component.css'

// GOTCHA: Use Tailwind classes first, custom CSS only when needed

// GOTCHA: Component filenames without .component. (e.g., user-list.ts)

// GOTCHA: Fix lint errors, NEVER disable ESLint rules

// GOTCHA: Barrel exports required (index.ts)
// export * from './component';
```

---

## Implementation Blueprint

### Files to Create/Modify

```typescript
// CREATE: pages/[feature]/[component].ts (NO .component. in filename)
// - Standalone component with OnPush
// - Use signals for state
// - inject() for dependencies

// CREATE: pages/[feature]/[component].html
// - Use @if/@for/@switch syntax
// - Bind to signals with ()
// - Use Tailwind classes for styling

// CREATE: pages/[feature]/[component].css
// - Custom CSS only when Tailwind is insufficient
// - Use @theme for Tailwind customization

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
  action: CREATE pages/[feature]/[component].ts (NO .component. in filename)
  details:
    - Standalone component with OnPush
    - Define signals for state
    - inject() service dependencies
    - Implement lifecycle methods if needed

Task 4:
  action: CREATE pages/[feature]/[component].html
  details:
    - Use @if/@for/@switch control flow
    - Bind to signals: {{ user() }}
    - Handle outputs with events
    - Use Tailwind classes for styling

Task 5:
  action: CREATE pages/[feature]/[component].css (if needed)
  details:
    - Only create if Tailwind is insufficient
    - Use @theme for customization

Task 6:
  action: UPDATE app.routes.ts
  details:
    - Add lazy-loaded route
    - Apply guards if needed
```

### Implementation Pseudocode

```typescript
// Component Pattern (filename: [name].ts, NO .component.)
@Component({
  selector: 'app-[name]',
  imports: [CommonModule, /* shared components */],
  templateUrl: './[name].html',
  styleUrl: './[name].css',
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
<!-- Template Pattern: Use Tailwind classes for styling -->
@if (isLoading()) {
<app-spinner />
} @else if (data(); as item) {
<div class="container mx-auto px-4">
  <h1 class="text-2xl font-bold mb-4">{{ item.name }}</h1>
  @for (child of item.children; track child.id) {
  <app-child-card [child]="child" />
  } @empty {
  <p class="text-gray-500">No children found.</p>
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
  - Tailwind 4 classes in templates (primary approach)
  - Custom .css files only when Tailwind is insufficient
  - Use @theme in .css files (NOT tailwind.config.js)
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
npm run lint         # No ESLint errors (fix issues, NEVER disable rules)
```

**CRITICAL:** When linting fails, fix the underlying issue. Disabling ESLint rules is NOT acceptable.

---

## Final Validation Checklist

- [ ] State managed with signals (not BehaviorSubject)
- [ ] DI uses inject() (not constructor)
- [ ] Inputs/outputs use input()/output() functions
- [ ] Templates use @if/@for/@switch
- [ ] OnPush change detection set
- [ ] Separate .html file (no inline templates)
- [ ] Separate .css file (only if needed, Tailwind preferred)
- [ ] Tailwind classes used for styling (custom CSS only when needed)
- [ ] Barrel export in index.ts
- [ ] File naming: NO .component. in filenames (e.g., user-list.ts)
- [ ] Build passes: `npm run build`
- [ ] Lint passes: `npm run lint` (all issues fixed, NEVER disabled)
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
- ❌ Inline templates/styles → Separate .html and .css files
- ❌ Custom CSS before Tailwind → Use Tailwind classes first
- ❌ `.component.` in filenames → Use simple names (user-list.ts)
- ❌ Disabling ESLint rules → Fix the underlying issue
- ❌ Mixing models/enums/constants → Separate files
- ❌ Missing barrel exports → Always add index.ts
- ❌ tailwind.config.js → Use @theme in CSS files
