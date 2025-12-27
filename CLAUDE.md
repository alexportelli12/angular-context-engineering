# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

```bash
# Development
npm install              # Install dependencies
npm start                # Start dev server (http://localhost:4200)
npm run build            # Production build
npm run watch            # Build with watch mode

# Quality Checks
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix ESLint errors
npm test                 # Run Vitest tests

# Server-Side Rendering
npm run serve:ssr:angular-context-engineering  # Serve SSR build
```

## Project Philosophy

This is **not** a standard Angular starter. It's a structured environment that gives Claude Code the context needed to produce consistent, architecture-compliant code. The key innovation is the **PRP (Product Requirement Prompt)** workflow, which separates planning from implementation to reduce hallucinations and enforce coding standards.

## PRP Workflow (Critical)

The development flow has three phases: **Draft**, **Generate**, and **Execute**.

### Step 1: Draft (Optional but Recommended)
```bash
/prp.draft user dashboard with profile info and activity feed
```

Creates initial draft at `.ai/planning/drafts/{feature-name}.md` with:
- Structured feature description
- Quick project state scan
- Documentation references
- Angular 21 considerations

### Step 2: Generate PRP
```bash
/prp.generate user-dashboard
```

The agent will:
1. Load project state from `.ai/memory/project-state.md`
2. Load draft from `.ai/planning/drafts/` if it exists
3. Analyze existing code patterns in `src/app/`
4. Reference architecture rules in `.ai/context/core/`
5. Ask clarifying questions if needed
6. Output complete PRP to `.ai/planning/prp/{feature-name}.md`

**Research Process:**
- Loads `.ai/memory/project-state.md` (current features, routes, services)
- Searches `src/app/` for similar patterns
- Reviews `.ai/context/core/architecture.md` and `.ai/context/core/coding-standards.md`
- May ask clarifying questions about MVP scope, UX requirements, integration points

### Step 3: Execute PRP
```bash
/prp.execute user-dashboard
```

The agent will:
1. Load PRP and project state
2. Break work into tracked subtasks (models → services → components → routing → tests)
3. Implement using Angular 21 conventions
4. Run validation (build, lint)
5. Invoke Architect Agent for review
6. Update `.ai/memory/project-state.md`

**Critical: Architect Review (Step 5)**

Before proceeding to documentation, the Architect Agent (`.claude/agents/architect.md`) validates implementation against:
- Module boundaries (no cross-feature imports)
- State management (signals, not BehaviorSubject)
- Zoneless compliance (OnPush change detection)
- Smart/Dumb component separation
- Template syntax (@if/@for, not *ngIf/*ngFor)
- Barrel exports (index.ts in every directory)

**Verdict:** PASS (proceed) or FAIL (fix violations and re-review)

**Critical: Project State Update (Step 6)**

After successful implementation, MUST update `.ai/memory/project-state.md` with:
- Feature details and PRP reference
- Components/services/models created
- Routes added
- Implementation notes

This is mandatory for future PRP context.

## Architecture Overview

### Directory Structure
```
src/app/
├── core/           # Guards, interceptors, error handlers (singletons)
├── pages/          # Smart components (routed features, inject services)
├── shared/
│   ├── ui/         # Dumb components (input/output only, no services)
│   └── utils/      # Pure functions, validators, helpers
├── models/         # TypeScript interfaces (.model.ts), enums (.enum.ts), constants (.constants.ts)
├── services/       # Global services (API, state management)
├── app.ts
├── app.routes.ts
└── app.config.ts
```

### Layer Responsibilities

**Pages (src/app/pages/):**
- Smart components that handle routing and data fetching
- Inject services using `inject()`, manage state with signals
- Must use external template files
- Lazy-loaded via routing

**Shared UI (src/app/shared/ui/):**
- Dumb components for pure presentation
- `input()` and `output()` only, no service injection
- OnPush change detection required

**Services (src/app/services/):**
- Provided in root
- Use signals for synchronous state
- Use RxJS only for async operations (HTTP, WebSockets)

**Models (src/app/models/):**
- TypeScript interfaces and types only
- No implementation logic
- Separate files: `.model.ts`, `.enum.ts`, `.constants.ts`

### The Barrel Pattern
**Every directory MUST have `index.ts` exporting its public API.**

```typescript
// ❌ WRONG
import { User } from './models/user.model';

// ✅ CORRECT
import { User } from './models';
```

## Angular 21 Conventions (Mandatory)

### State Management
```typescript
// ✅ Signals for state
userList = signal<User[]>([]);
selectedUser = computed(() => this.userList().find(u => u.id === this.selectedId()));

// ❌ NEVER BehaviorSubject for state
userListSubject = new BehaviorSubject<User[]>([]);
```

### Inputs/Outputs
```typescript
// ✅ Functions (Angular 21)
userId = input.required<string>();
isEditable = input<boolean>(false);
userDeleted = output<string>();
selectedValue = model<string>('');  // Two-way binding

// ❌ NEVER decorators
@Input() userId!: string;
@Output() userDeleted = new EventEmitter<string>();
```

### Template Control Flow
```html
<!-- ✅ Angular 21 syntax -->
@if (isLoading()) {
  <app-spinner />
} @else if (hasError()) {
  <app-error [message]="errorMessage()" />
}

@for (user of userList(); track user.id) {
  <app-user-card [user]="user" />
} @empty {
  <p>No users found.</p>
}

<!-- ❌ NEVER legacy syntax -->
<div *ngIf="isLoading()">...</div>
<div *ngFor="let user of userList()">...</div>
```

### Dependency Injection
```typescript
// ✅ inject() function
private readonly userService = inject(UserService);
private readonly router = inject(Router);

// ❌ NEVER constructor injection
constructor(private userService: UserService) {}
```

### Component Pattern
```typescript
@Component({
  selector: 'app-user-list',
  imports: [CommonModule, /* shared components */],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  private readonly service = inject(UserService);
  inputProp = input.required<string>();
  outputEvent = output<string>();
  state = signal<Type | null>(null);
  computed = computed(() => this.state()?.property ?? 'fallback');
}
```

### Routing (Lazy-loaded)
```typescript
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard').then(m => m.DashboardComponent),
    canActivate: [authGuard],
  },
];
```

## Code Quality Rules

### Naming Conventions
**MUST** use descriptive, intention-revealing names. NO abbreviations.

```typescript
// ✅ Descriptive
userList = signal<User[]>([]);
isLoading = signal<boolean>(false);
hasValidationError = signal<boolean>(false);
filteredUserList = computed(() => /* ... */);

// ❌ Vague/abbreviated
users = signal<User[]>([]);
loading = signal<boolean>(false);
idx = signal<number>(-1);
```

**Patterns:**
- **Booleans:** `is`, `has`, `should`, `can` prefix (e.g., `isVisible`, `hasPermission`)
- **Collections:** Plural with type (e.g., `userList`, `productCollection`)
- **Computed:** Descriptive of result (e.g., `filteredUserList`, `totalPrice`)

### Method Length
**MUST** keep methods ≤15-20 lines. Extract logic into private methods.

### Template Logic
**MUST** move complex logic to `computed()` signals. Keep templates declarative.

```typescript
// ✅ Component
canEditProfile = computed(() => {
  const role = this.currentUserRole();
  return role === 'admin' || role === 'editor' || this.user().isOwner;
});
```

```html
<!-- ✅ Template -->
@if (canEditProfile()) { <button>Edit</button> }

<!-- ❌ Complex logic in template -->
@if (role() === 'admin' || role() === 'editor' || user().isOwner) { ... }
```

### File Organization
**MUST** separate interfaces, enums, and constants into dedicated files.

```
models/
├── user.model.ts          # Interfaces only
├── user-role.enum.ts      # Enums only
└── user.constants.ts      # Constants only
```

**MUST** use separate `.html` files (no inline templates).

**Exception:** Inline acceptable ONLY for <3 lines or single-element wrappers.

## The .ai/ Folder Context System

### Key Files

**`.ai/context/core/architecture.md`**
Defines directory structure and layer responsibilities. Pages are smart components (inject services, manage state). Shared/ui components are dumb (input/output only). Every directory needs index.ts barrel export.

**`.ai/context/core/coding-standards.md`**
Specifies Angular 21 syntax requirements. No @Input/@Output decorators. No *ngIf/*ngFor. No constructor injection. No BehaviorSubject for state.

**`.ai/memory/project-state.md`**
Living document tracking implemented features, active routes, services, and models. **MUST** be updated after each feature completion.

**`.ai/planning/drafts/initial_template.md`**
Template used by `/prp.draft` for initial feature drafts.

**`.ai/planning/templates/feature-prp.md`**
Template used by `/prp.generate` for creating PRPs. Contains sections for requirements, file structure, pseudocode, integration points, and validation.

## Anti-Patterns to Avoid

- `@Input()`/`@Output()` decorators → Use `input()`/`output()` functions
- `*ngIf`/`*ngFor` → Use `@if`/`@for`/`@switch`
- Constructor DI → Use `inject()`
- BehaviorSubject for state → Use `signal()`
- NgModules → Use standalone components
- Inline templates → Separate `.html` files
- Missing barrel exports → Always add `index.ts`
- Jasmine syntax → Use Vitest (`vi.mock`, `describe`, `it`)
- `tailwind.config.js` → Use `@theme` in CSS files

## File Naming Conventions

| Type        | Suffix            | Example                  |
|-------------|-------------------|--------------------------|
| Component   | `.component.ts`   | `user-list.component.ts` |
| Service     | `.service.ts`     | `auth.service.ts`        |
| Guard       | `.guard.ts`       | `auth.guard.ts`          |
| Interceptor | `.interceptor.ts` | `error.interceptor.ts`   |
| Model       | `.model.ts`       | `user.model.ts`          |
| Enum        | `.enum.ts`        | `user-role.enum.ts`      |
| Constants   | `.constants.ts`   | `api.constants.ts`       |
| Utilities   | `.utils.ts`       | `date.utils.ts`          |

Use **kebab-case** for all filenames.

## Tech Stack

- **Framework:** Angular 21 (Signals, Standalone Components, Control Flow Syntax)
- **Styling:** Tailwind CSS 4 (use `@theme` in CSS, not tailwind.config.js)
- **Testing:** Vitest (not Jasmine)
- **Node:** npm@11.5.1
- **TypeScript:** 5.9.2
- **Build:** Angular Build (application builder with SSR support)

## Customizing Context

**To change architectural rules:**
Edit `.ai/context/core/architecture.md`

**To change coding standards:**
Edit `.ai/context/core/coding-standards.md`

**To change PRP template:**
Edit `.ai/planning/templates/feature-prp.md`

**To change Architect review criteria:**
Edit `.claude/agents/architect.md`

## Execution Order for Features

When implementing via `/prp.execute`:

1. CREATE models (interfaces, enums, constants)
2. CREATE/UPDATE services (API, state management)
3. CREATE components (page or shared/ui)
4. CREATE templates (.html files with @if/@for/@switch)
5. UPDATE routing (app.routes.ts if needed)
6. CREATE tests (Vitest specs)
7. VALIDATE (build, lint, visual check)
8. ARCHITECT REVIEW (`.claude/agents/architect.md`)
9. UPDATE project-state.md (MANDATORY)

## Validation Checklist

Before considering a feature complete:

- [ ] State: `signal()` or `computed()` (not BehaviorSubject)
- [ ] Inputs: `input()` or `input.required()`
- [ ] Outputs: `output()`, two-way: `model()`
- [ ] DI: `inject()` (not constructor)
- [ ] Templates: `@if`, `@for`, `@switch` (not `*ngIf`, `*ngFor`)
- [ ] Names: Descriptive (no abbreviations)
- [ ] Methods: ≤20 lines, single responsibility
- [ ] Templates: No complex logic (use `computed()`)
- [ ] Files: Separate `.model.ts`, `.enum.ts`, `.constants.ts`, `.html`
- [ ] Build: `npm run build` succeeds
- [ ] Lint: `npm run lint` passes
- [ ] Architect: Review passed
- [ ] Documentation: `.ai/memory/project-state.md` updated
