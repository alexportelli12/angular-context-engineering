# PRP Workflow

Product Requirement Prompt workflow separates planning from implementation to reduce hallucinations and enforce coding standards.

---

## Three-Phase Workflow

### Phase 1: Draft (Optional)

**Command:** `/prp.draft [feature description]`

**Purpose:** Capture initial requirements before full PRP generation

**Output:** `.ai/planning/drafts/[feature-name].md`

**Process:** Uses documentation agent (Task tool, subagent_type='documentation') to create draft file

**Contains:**
- Feature description
- Documentation references
- Angular 21 requirements checklist
- Edge cases and constraints

**When to use:**
- Complex features requiring upfront planning
- Features needing documentation research
- When requirements are unclear and need refinement

**When to skip:**
- Simple CRUD operations
- Well-understood patterns
- Quick additions to existing features

---

### Phase 2: Generate PRP

**Command:** `/prp.generate [feature-name]`

**Purpose:** Research codebase and create complete implementation plan

**Process:**
1. Load `.ai/memory/project-state.md` (existing features, routes, services)
2. Load draft from `.ai/planning/drafts/` if exists
3. Search `src/app/` for similar patterns
4. Reference `.ai/context/core/architecture.md` and `coding-standards.md`
5. Ask clarifying questions if needed
6. Generate complete PRP using documentation agent

**Output:** `.ai/planning/prp/[feature-name].md` (created via documentation agent)

**Contains:**
- Goal, Why, What
- Success criteria
- Context references (project state, existing code)
- Angular 21 gotchas checklist
- Implementation blueprint (files to create/modify)
- Ordered task list
- Pseudocode patterns
- Integration points
- Validation loop checklist

---

### Phase 3: Execute PRP

**Command:** `/prp.execute [feature-name]`

**Purpose:** Implement feature following PRP specifications

**Process:**
1. Load PRP from `.ai/planning/prp/[feature-name].md`
2. Load project state from `.ai/memory/project-state.md`
3. Break work into tracked subtasks
4. Implement in order: models → services → components → routing → tests
5. Validate: `npm run build` and `npm run lint`
6. Invoke Architect Agent for review
7. Update `.ai/memory/project-state.md`

**Execution Order:**
1. CREATE models (interfaces, enums, constants)
2. CREATE/UPDATE services (API, state management)
3. CREATE components (NO .component. in filename)
4. CREATE templates (.html with @if/@for/@switch, Tailwind classes)
5. CREATE styles (.css ONLY if Tailwind insufficient)
6. UPDATE routing (app.routes.ts if needed)
7. VALIDATE (build, lint)
8. ARCHITECT REVIEW (`.claude/agents/architect.md`)
9. UPDATE project-state.md (MANDATORY - use documentation agent)

---

## Critical: Architect Review (Step 8)

Before documentation, Architect Agent validates:

**Blocking Violations:**
- Cross-feature imports (pages/A → pages/B)
- BehaviorSubject/ReplaySubject for state
- Old decorators: @Input(), @Output()
- Old template syntax: *ngIf, *ngFor
- Service injection in shared/ui/ components
- Missing index.ts barrel exports
- Component filenames with .component. (should be user-list.ts)
- ESLint rules disabled

**Non-Blocking Guidance:**
- Methods > 20 lines
- Complex template logic
- Abbreviations in names
- Repeated code patterns
- Custom CSS without trying Tailwind first

**Verdict:** PASS (proceed) or FAIL (fix violations, re-review)

---

## Critical: Project State Update (Step 9)

MUST use documentation agent (Task tool, subagent_type='documentation') to update `.ai/memory/project-state.md` with:
- Feature details and PRP reference
- Components/services/models created
- Routes added
- Implementation notes

**Why documentation agent:**
- Token-efficient, dense format optimized for AI consumption
- Maintains consistency across all documentation
- Ensures standardized structure for future PRP context

Required for future PRP context.

---

## Validation Checklist

Before feature complete:

- [ ] State: signal()/computed() (not BehaviorSubject)
- [ ] Inputs: input()/input.required()
- [ ] Outputs: output(), model() for two-way
- [ ] DI: inject() (not constructor)
- [ ] Templates: @if/@for/@switch (not *ngIf/*ngFor)
- [ ] Names: Descriptive (no abbreviations)
- [ ] Methods: ≤20 lines, single responsibility
- [ ] Templates: No complex logic (use computed())
- [ ] Files: Separate .model.ts, .enum.ts, .constants.ts, .html, .css
- [ ] Styles: Tailwind first, custom CSS only when needed
- [ ] Filenames: NO .component. (user-list.ts)
- [ ] Build: npm run build succeeds
- [ ] Lint: npm run lint passes (all fixed, NEVER disabled)
- [ ] Architect: Review passed
- [ ] Documentation: project-state.md updated

---

## Anti-Patterns

- @Input()/@Output() decorators → Use input()/output()
- *ngIf/*ngFor → Use @if/@for/@switch
- Constructor DI → Use inject()
- BehaviorSubject for state → Use signal()
- NgModules → Use standalone components
- Inline templates/styles → Separate .html/.css
- Custom CSS before Tailwind → Use Tailwind first
- .component. in filenames → Use simple names
- Disabling ESLint → Fix underlying issue
- Missing barrel exports → Always add index.ts
- .scss extensions → Use .css
- tailwind.config.js → Use @theme in CSS

---

## Documentation Agent Integration

**When to use:** ALL markdown file creation/updates in PRP workflow

**Tool:** Task tool with subagent_type='documentation'

**Applies to:**
- `.ai/planning/drafts/*.md` (Phase 1)
- `.ai/planning/prp/*.md` (Phase 2)
- `.ai/memory/project-state.md` (Phase 3, Step 9)
- README.md, architecture.md, coding-standards.md (Phase 3, Step 7)

**Benefits:**
- Token-efficient, dense documentation format
- Optimized for AI agent consumption
- Maintains consistency across repository
- Eliminates verbose/redundant content
- Standardized structure for context files
