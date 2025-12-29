# Execute PRP: $ARGUMENTS

Implement feature using PRP from `.ai/planning/prp/{feature-name}.md`.

**PRP:** Product Requirement Prompt - detailed implementation spec for AI agents.

## Execution Process

### 1. Load Context

**A. Project State**
- Read `project-state.md`
- Understand: features, services, routes, state patterns, recent changes

**B. PRP**
- Read `.ai/planning/prp/$ARGUMENTS.md`
- Understand: requirements, structure, integration, Angular 21 patterns
- If unclear: review similar patterns in `src/app/`, `architecture.md`, `coding-standards.md`

### 2. Plan with TodoWrite

Break PRP into subtasks (follow order):

```yaml
1. CREATE models (interfaces, enums, constants)
2. CREATE/UPDATE services (API, state)
3. CREATE components (page/shared) - NO .component. in filename
4. CREATE templates (.html with @if/@for/@switch, Tailwind classes)
5. CREATE styles (.css ONLY if Tailwind insufficient)
6. UPDATE routing (app.routes.ts if needed)
7. VALIDATE (build, lint, visual)
8. UPDATE project-state.md
```

**Note:** Tests NOT required unless explicitly requested.

For each: find existing patterns, respect standards, mark in_progress → completed.

### 3. Execute

Follow Angular 21 conventions:

**Component Pattern:**
```typescript
// Filename: [name].ts (NO .component.)
@Component({
  selector: 'app-[name]',
  imports: [CommonModule /* ... */],
  templateUrl: './[name].html',
  styleUrl: './[name].css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class [Name]Component {
  private readonly service = inject(Service);
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
} @else if (data(); as item) {
  <div class="container mx-auto px-4">
    @for (child of item.children; track child.id) {
      <app-child [data]="child" />
    } @empty {
      <p class="text-gray-500">No items.</p>
    }
  </div>
} @else {
  <app-error />
}
```

**Critical Rules:**
- Signals for state (NOT BehaviorSubject)
- `inject()` for DI (NOT constructor)
- `input()`/`output()` (NOT @Input/@Output)
- `@if`/`@for`/`@switch` (NOT *ngIf/*ngFor)
- Separate .html/.css (NOT inline)
- Tailwind FIRST, custom CSS only when needed
- NO .component. in filenames (user-list.ts)
- Fix lint errors, NEVER disable rules
- Barrel exports (`index.ts`) for all directories
- Tests NOT required unless requested

### 4. Validate

Run in order:
```bash
npm run start       # Visual check http://localhost:4200
npm run build       # Production (must succeed)
npm run lint        # ESLint (fix issues, NEVER disable)
```

Re-run until all pass. Debug:
- Signals used correctly (no BehaviorSubject)
- `inject()` usage (no constructor DI)
- Template syntax (@if not *ngIf)
- Filenames (NO .component.)
- Tailwind before custom CSS
- Lint errors fixed (not disabled)
- Edge cases tested

### 5. Architect Review

**CRITICAL:** Invoke Architect Agent before documentation.

**Process:**
1. Spawn using Task tool:
   ```
   Task with subagent_type='general-purpose'
   Prompt: "Load `.claude/agents/architect.md` and review PRP: $ARGUMENTS. Follow Workflow 1: Review Mode."
   ```

2. Provide context:
   - PRP: `.ai/planning/prp/$ARGUMENTS.md`
   - Changed files: `git diff --name-only` or `git status`
   - Context: `.ai/context/core/`

3. Agent reviews:
   - Module boundaries (no cross-feature imports)
   - State (Signals, not BehaviorSubject)
   - Zoneless (no Zone.js reliance)
   - Smart/Dumb separation
   - Template syntax (@if/@for)
   - Code quality (method length, computed, barrels)

4. Handle verdict:
   - ✅ PASS: Proceed to step 6
   - ❌ FAIL: Fix violations, re-validate (step 4), re-review

**DO NOT skip.** Violations = technical debt.

### 6. Update Project State

**CRITICAL:** Update `project-state.md` after success using documentation agent.

**Use documentation agent (Task tool, subagent_type='documentation') to update `.ai/memory/project-state.md`**

**Why:** Ensures token-efficient, dense format optimized for AI consumption and maintains consistency.

**Required:**
1. Update "Last Updated" + "Update Trigger" (date + feature)
2. Add to "Implemented Features":
   ```markdown
   ### Feature: [Name]
   - **PRP:** `.ai/planning/prp/[feature-name].md`
   - **Status:** Complete
   - **Components:** [list]
   - **Services:** [list]
   - **Models:** [list]
   - **Routes:** [if any]
   - **Notes:** [implementation details]
   ```
3. Update "Current Structure" if new directories
4. Update "Active Routes" table
5. Update "State Management" if global state added
6. Update "Recent Changes" table
7. Update "Next Steps" if follow-ups

**Mandatory** - provides context for future PRPs.

### 7. Update Documentation

Use documentation agent (Task tool, subagent_type='documentation') for all markdown updates.

Update if needed:
- README.md: New features, dependencies, setup
- architecture.md: New routes, patterns
- coding-standards.md: New conventions
- Component `index.ts`: ALWAYS update when adding components/services/models (use Edit tool for TypeScript)

### 8. Complete

- Re-read PRP: confirm success criteria met
- Ensure Architect approval (step 5)
- Ensure project-state.md updated (step 6)
- Mark all TodoWrite tasks completed
- Commit with standard naming

## Anti-Patterns

- `@Input()`/`@Output()` → Use `input()`/`output()`
- `*ngIf`/`*ngFor` → Use `@if`/`@for`/`@switch`
- Constructor DI → Use `inject()`
- BehaviorSubject → Use `signal()`
- NgModules → Standalone components
- Inline templates/styles → Separate .html/.css
- Custom CSS first → Tailwind classes first
- `.component.` in filenames → Simple names
- Disabling ESLint → Fix issues
- Missing barrels → Always add `index.ts`
- `.scss` → Use `.css`
- `tailwind.config.js` → Use `@theme` in CSS

## Reference

Return to PRP anytime to clarify requirements, validate output, check assumptions. PRP = source of truth.
