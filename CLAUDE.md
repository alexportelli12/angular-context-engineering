# Claude Code Project Guide

Guidance for Claude Code when working in this Angular 21 repository.

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

## First Time Setup

**If this is your first time using this template**, initialize your project:

```bash
/project.init
```

This command will:
- Remove placeholder content (IntroductionComponent, CodeBlockComponent)
- Configure your project name in all files (package.json, angular.json, etc.)
- Create a minimal HomeComponent as your starting point
- Optionally set up additional technologies (Firebase, NgRx Signal Store, Storybook)
- Update project documentation

**Important:** Run this command ONLY ONCE when setting up a new project from this template.

## Context Alignment

**If you want to use the PRP workflow in an existing Angular project**, or if the context and documentation have drifted from the actual implementation, run:

```bash
/project.align
```

This command will:
- Analyze your existing Angular codebase structure and patterns
- Discover tech stack, architecture, and coding standards from actual code
- Generate or update `.ai/context/` files to match reality
- Update `.ai/memory/project-state.md` with all implemented features
- Create an alignment report with recommendations for standardization
- Identify inconsistencies between documentation and implementation

**When to use:**
- Initial adoption in existing Angular project
- Post major refactoring/architectural changes
- Context documentation drift detected
- Maintenance (every 3-6 months)
- Legacy codebase onboarding

## Project Philosophy

Structured environment providing Claude Code context for consistent, architecture-compliant code. Core innovation: **PRP (Product Requirement Prompt)** workflow separates planning from implementation, reducing hallucinations and enforcing standards.

## PRP Workflow (Critical)

Three phases: **Draft** → **Generate** → **Execute**

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

Process:
1. Load `.ai/memory/project-state.md` (features, routes, services)
2. Load `.ai/planning/drafts/{feature-name}.md` (if exists)
3. Analyze `src/app/` for similar patterns
4. Reference `.ai/context/core/` (architecture, coding standards)
5. Ask clarifying questions (MVP scope, UX, integrations)
6. Output PRP to `.ai/planning/prp/{feature-name}.md`

### Step 3: Execute PRP
```bash
/prp.execute user-dashboard
```

Process:
1. Load PRP and project state
2. Break into subtasks (models → services → components → routing)
3. Implement using Angular 21 conventions
4. Validate (build, lint)
5. Architect Agent review
6. Update `.ai/memory/project-state.md` (mandatory)

**Architect Review (Step 5):**

Validates against (`.claude/agents/architect.md`):
- Module boundaries (no cross-feature imports)
- State: signals (not BehaviorSubject)
- Zoneless: OnPush change detection
- Smart/Dumb separation
- Template: @if/@for (not *ngIf/*ngFor)
- Barrel exports (index.ts per directory)

Verdict: PASS (proceed) | FAIL (fix, re-review)

**Project State Update (Step 6):**

MUST update `.ai/memory/project-state.md`:
- Feature details, PRP reference
- Components/services/models created
- Routes added
- Implementation notes

Mandatory for future PRP context.

**Documentation Agent:**

For ALL markdown file operations (creating or updating), use the documentation agent:
- Ensures token-efficient, dense documentation format
- Maintains consistency across all documentation
- Optimized for AI agent consumption
- Use for: `.ai/` files, README updates, project documentation

Launch with: Task tool, subagent_type='documentation'

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
- Smart components: routing, data fetching
- Inject services (`inject()`), manage state (signals)
- External template files mandatory
- Lazy-loaded

**Shared UI (src/app/shared/ui/):**
- Dumb components: pure presentation
- `input()`/`output()` only, no service injection
- OnPush change detection

**Services (src/app/services/):**
- `providedIn: 'root'`
- Signals for synchronous state
- RxJS for async only (HTTP, WebSockets, timers)

**Models (src/app/models/):**
- Interfaces and types only
- No logic
- Separate: `.model.ts`, `.enum.ts`, `.constants.ts`

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
// Filename: user-list.ts (NO .component. in filename)
@Component({
  selector: 'app-user-list',
  imports: [CommonModule, /* shared components */],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
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
Methods ≤15-20 lines. Extract to private methods.

### Template Logic
Move complex logic to `computed()`. Keep templates declarative.

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
Separate interfaces, enums, constants:
```
models/
├── user.model.ts          # Interfaces
├── user-role.enum.ts      # Enums
└── user.constants.ts      # Constants
```

Separate `.html` and `.css` files (no inline).

**Styling priority:**
1. Tailwind classes in templates (always first)
2. Custom CSS in `.css` files (only if needed)
3. `@theme` in CSS for Tailwind customization

Exception: Inline template OK for <3 lines or single-element wrappers.

## The .ai/ Folder Context System

### Key Files

**`.ai/context/core/architecture.md`**
Directory structure, layer responsibilities. Pages: smart (inject services, state). Shared/ui: dumb (input/output). Barrel exports mandatory.

**`.ai/context/core/coding-standards.md`**
Angular 21 syntax. No decorators (@Input/@Output), no *ngIf/*ngFor, no constructor DI, no BehaviorSubject.

**`.ai/memory/project-state.md`**
Living document: features, routes, services, models. Update after each feature (mandatory).

**`.ai/planning/drafts/initial_template.md`**
Template for `/prp.draft`.

**`.ai/planning/templates/feature-prp.md`**
Template for `/prp.generate`. Sections: requirements, file structure, pseudocode, integration, validation.

## Anti-Patterns to Avoid

- `@Input()`/`@Output()` decorators → Use `input()`/`output()` functions
- `*ngIf`/`*ngFor` → Use `@if`/`@for`/`@switch`
- Constructor DI → Use `inject()`
- BehaviorSubject for state → Use `signal()`
- NgModules → Use standalone components
- Inline templates/styles → Separate `.html` and `.css` files
- Custom CSS before Tailwind → Use Tailwind classes first
- `.component.` in filenames → Use simple names (user-list.ts not user-list.component.ts)
- Disabling ESLint rules → Fix the underlying issue
- Missing barrel exports → Always add `index.ts`
- `.scss` extensions → Use `.css` files
- `tailwind.config.js` → Use `@theme` in CSS files

## File Naming Conventions

| Type        | Suffix            | Example                  |
|-------------|-------------------|--------------------------|
| Component   | `.ts`             | `user-list.ts`           |
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

## Customization

| Target | File |
|--------|------|
| Architectural rules | `.ai/context/core/architecture.md` |
| Coding standards | `.ai/context/core/coding-standards.md` |
| PRP template | `.ai/planning/templates/feature-prp.md` |
| Architect review criteria | `.claude/agents/architect.md` |

## Execution Order

`/prp.execute` sequence:

1. Models (interfaces, enums, constants)
2. Services (API, state)
3. Components (pages/ or shared/ui/) - NO `.component.` in filename
4. Templates (.html: @if/@for/@switch, Tailwind classes)
5. Styles (.css: only if Tailwind insufficient)
6. Routing (app.routes.ts)
7. Validation (build, lint)
8. Architect review (`.claude/agents/architect.md`)
9. Project state update (`.ai/memory/project-state.md`) - MANDATORY (use documentation agent)

Tests: NOT required unless explicitly requested.

**Note:** Use the documentation agent (Task tool, subagent_type='documentation') for all markdown file updates to ensure consistency and efficiency.

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
- [ ] Files: Separate `.model.ts`, `.enum.ts`, `.constants.ts`, `.html`, `.css`
- [ ] Styles: Tailwind classes used first, custom CSS only when needed
- [ ] Filenames: No `.component.` in component files (e.g., `user-list.ts`)
- [ ] Build: `npm run build` succeeds
- [ ] Lint: `npm run lint` passes (all issues fixed, NEVER disabled)
- [ ] Architect: Review passed
- [ ] Documentation: `.ai/memory/project-state.md` updated
