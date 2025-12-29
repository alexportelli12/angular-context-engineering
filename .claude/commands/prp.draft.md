# Draft PRP: $ARGUMENTS

Create initial PRP draft from feature prompt using `.ai/planning/drafts/initial_template.md`.

**PRP Draft:** First step in planning pipeline. Captures feature idea before full PRP generation.

## Workflow

```
/prp.draft "prompt" → drafts/{feature-name}.md
         ↓
/prp.generate       → prp/{feature-name}.md
         ↓
/prp.execute        → Implementation
```

## Process

### 1. Parse Prompt

Extract from `$ARGUMENTS`:
- Feature name (kebab-case for filename)
- Core functionality
- Key requirements/constraints

### 2. Load Template

Read `.ai/planning/drafts/initial_template.md`

### 3. Context (Quick Scan)

Review:
- `project-state.md` - existing features/patterns
- `architecture.md` - directory structure
- `tech-stack.md` - framework versions

### 4. Generate Content

Fill template sections:

**FEATURE:** Clear description, core goal, expected behavior

**DOCUMENTATION:** Angular docs links, pattern docs, context file references

**OTHER CONSIDERATIONS:** Angular 21 gotchas, common pitfalls, architecture constraints

### 5. Clarify (if needed)

Ask about:
- Scope: MVP vs full?
- Integration: New or extending?
- Priority: User-facing or infrastructure?

### 6. Documentation Agent

Use documentation agent (Task tool, subagent_type='documentation') for all markdown operations.

**Why:** Ensures token-efficient, dense format optimized for AI consumption and maintains consistency.

### 7. Save

Use documentation agent to create `.ai/planning/drafts/{feature-name}.md` (kebab-case)

## Output Format

```markdown
## FEATURE:

[Clear description from user prompt]

Example: "User dashboard page with profile info, recent activity, account settings.
Lazy-loaded, integrates with existing auth service."

## DOCUMENTATION:

- Angular Signals: https://angular.dev/guide/signals
- Lazy Loading: https://angular.dev/guide/routing/lazy-loading
- Internal: architecture.md (routing patterns)
- Internal: coding-standards.md (component structure)

## OTHER CONSIDERATIONS:

- `inject()` for AuthService DI
- Component in `pages/dashboard/`
- Signals for state (not BehaviorSubject)
- `@if`/`@for` template syntax
- OnPush change detection (zoneless)
- Barrel export (`index.ts`)
```

## Next Steps

Inform user:
> Draft saved to `.ai/planning/drafts/{feature-name}.md`
>
> Review/edit, then run: `/prp.generate {feature-name}`

## Example

Input: `/prp.draft user authentication with login and signup forms`

Output: `.ai/planning/drafts/user-authentication.md` ready for `/prp.generate`
