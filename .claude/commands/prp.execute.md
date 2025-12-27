# Execute PRP: $ARGUMENTS

Implement a feature using the PRP (Product Requirement Prompt) file from `.ai/planning/prp/{feature-name}.md`.

## What is a PRP?

**Product Requirement Prompt** - detailed implementation spec with requirements, component structure, and step-by-step instructions for AI agents.

---

## Execution Process

### 1. Load Context

**A. Load Project State (Baseline Context)**

- Open `.ai/memory/project-state.md`
- Understand:
  - Currently implemented features and their components
  - Existing services and state management patterns
  - Active routes and integration points
  - Recent changes to avoid conflicts

**B. Load PRP**

- Open `.ai/planning/prp/$ARGUMENTS.md`
- Understand:
  - Functional requirements and success criteria
  - Component/service/model structure
  - Integration points (routing, state, styling)
  - Angular 21 patterns (signals, inject, @if/@for)
- If unclear:
  - Review similar patterns in `src/app/pages/`, `src/app/shared/ui/`
  - Check `.ai/context/core/architecture.md` for layer responsibilities
  - Check `.ai/context/core/coding-standards.md` for Angular 21 conventions

### 2. Plan with TodoWrite

Break PRP into subtasks using `TodoWrite` tool. Follow this order:

```yaml
1. CREATE models (interfaces, enums, constants)
2. CREATE/UPDATE services (API, state management)
3. CREATE components (page or shared/ui)
4. CREATE templates (.html files with @if/@for/@switch)
5. UPDATE routing (app.routes.ts if needed)
6. CREATE tests (Vitest specs)
7. VALIDATE (build, lint, visual check)
8. UPDATE project-state.md with implemented feature
```

For each subtask:

- Find existing patterns to reuse
- Respect coding standards from `.ai/context/core/coding-standards.md`
- Mark in_progress before starting, completed when done

### 3. Execute Plan

Follow subtasks methodically using Angular 21 conventions:

**Component Pattern:**

```typescript
@Component({
  selector: 'app-[name]',
  imports: [CommonModule, /* shared */],
  templateUrl: './[name].component.html',
  styleUrl: './[name].component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class [Name]Component {
  private readonly service = inject([Service]);
  inputProp = input.required<string>();
  outputEvent = output<string>();
  state = signal<Type | null>(null);
  computed = computed(() => this.state()?.property ?? 'fallback');
}
```

**Template Pattern:**

```html
@if (isLoading()) {
<app-spinner />
} @else if (data(); as item) { @for (child of item.children; track child.id) {
<app-child [data]="child" />
} @empty {
<p>No items found.</p>
} } @else {
<app-error />
}
```

**Critical Rules:**

- Signals for state (NOT BehaviorSubject)
- `inject()` for DI (NOT constructor)
- `input()`/`output()` (NOT @Input/@Output decorators)
- `@if`/`@for`/`@switch` (NOT *ngIf/*ngFor)
- Separate `.html` files (NOT inline templates)
- Barrel exports (`index.ts`) for all directories

### 4. Validate

Run validation commands in order:

```bash
npm run start       # Visual check at http://localhost:4200
npm run build       # Production build must succeed
npm run lint        # ESLint validation
```

Re-run until all pass. Debug failures by:

- Checking signals are used correctly (no BehaviorSubject)
- Verifying inject() usage (no constructor DI)
- Confirming template syntax (@if not \*ngIf)
- Testing with real data/edge cases

### 5. Architect Review

**CRITICAL:** Before proceeding to documentation, invoke the Architect Agent to review implementation for architectural compliance.

**Process:**

1. **Spawn Architect Agent** using Task tool:

   ```
   Task tool with subagent_type='general-purpose'
   Prompt: "You are the Architect Agent. Load your persona from `.claude/agents/architect.md` and review the implementation for PRP: $ARGUMENTS. Follow Workflow 1: Review Mode."
   ```

2. **Provide Context to Agent:**
   - PRP location: `.ai/planning/prp/$ARGUMENTS.md`
   - Changed files: Run `git diff --name-only` or `git status`
   - Context files: `.ai/context/core/`

3. **Agent Reviews Against Prime Directives:**
   - Module boundaries (no cross-feature imports)
   - State strategy (Signals, not BehaviorSubject)
   - Zoneless compliance (no Zone.js reliance)
   - Smart/Dumb separation (services in pages/, not shared/ui/)
   - Template syntax (@if/@for, not *ngIf/*ngFor)
   - Code quality (method length, computed signals, barrel exports)

4. **Handle Verdict:**
   - **✅ PASS:** Proceed to step 6 (Update Documentation)
   - **❌ FAIL:** Fix violations identified by agent, re-run validation (step 4), re-submit for review

**Example Agent Output:**

```
✅ ARCHITECTURE REVIEW PASSED

Summary:
- Module boundaries respected
- Signals used correctly for state
- Zoneless-compliant patterns
- Smart/Dumb separation maintained

No architectural violations detected. Implementation approved.
```

**Or:**

```
❌ ARCHITECTURE REVIEW FAILED

Violations Found:

1. State Management Violation (services/user.service.ts:15)
   - Using BehaviorSubject for user list
   - FIX: Convert to signal<User[]>([])

2. Template Syntax Violation (pages/dashboard/dashboard.component.html:8)
   - Using *ngIf instead of @if
   - FIX: Replace with @if/@else syntax

BLOCKING: Implementation must be corrected before approval.
```

**Do NOT skip this step.** Architectural violations accumulate technical debt.

### 6. Update Project State

**CRITICAL:** After successful implementation, update `.ai/memory/project-state.md` to reflect the new feature.

**Required Updates:**

1. **Update "Last Updated" and "Update Trigger"** with current date and feature name

2. **Add feature to "Implemented Features" section:**

   ```markdown
   ### Feature: [Feature Name]
   - **PRP:** `.ai/planning/prp/[feature-name].md`
   - **Status:** Complete
   - **Components:** List of components created/modified
   - **Services:** List of services created/modified
   - **Models:** List of models/interfaces created
   - **Routes:** Routes added (if any)
   - **Notes:** Important implementation details or patterns used
   ```

3. **Update "Current Structure"** if new directories were created

4. **Update "Active Routes"** table with new routes

5. **Update "State Management"** if new global state was added

6. **Update "Recent Changes"** table with this implementation

7. **Update "Next Steps"** if there are follow-up tasks

**This update is mandatory** - it provides context for future PRP generation and execution.

### 7. Update Documentation

After successful implementation, update if needed:

**When to Update:**

- **README.md**: New user-facing features, dependencies, setup steps
- `.ai/context/core/architecture.md`: New routes, architectural patterns
- `.ai/context/core/coding-standards.md`: New coding conventions or patterns
- Component `index.ts`: Always update when adding new components/services/models

### 8. Complete

- Re-read PRP to confirm all success criteria met
- Ensure Architect Agent approved the implementation (step 5)
- Ensure `.ai/memory/project-state.md` was updated (step 6)
- Mark all TodoWrite tasks as completed
- Commit with standard naming conventions

---

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

---

## Reference

You may return to the PRP at any point to clarify requirements, validate output, or check assumptions. The PRP is the source of truth for implementation.
