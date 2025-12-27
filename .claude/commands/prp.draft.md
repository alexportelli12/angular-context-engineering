# Draft PRP: $ARGUMENTS

Create an initial PRP draft file from a feature prompt using the template at `.ai/planning/drafts/initial_template.md`.

## What is a PRP Draft?

A **PRP Draft** is the first step in the feature planning pipeline. It captures the user's initial feature idea in a structured format before full PRP generation.

---

## Workflow Overview

```
/prp.draft "feature prompt"  →  .ai/planning/drafts/{feature-name}.md
         ↓
/prp.generate {feature-name} →  .ai/planning/prp/{feature-name}.md
         ↓
/prp.execute {feature-name}  →  Implementation
```

---

## Process

### 1. Parse the Feature Prompt

Extract from `$ARGUMENTS`:

- **Feature name** (for filename in kebab-case)
- **Core functionality** description
- **Key requirements** or constraints mentioned

### 2. Load the Template

Read `.ai/planning/drafts/initial_template.md` as the base structure.

### 3. Gather Context (Quick Scan)

Quickly review:

- `.ai/memory/project-state.md` - existing features and patterns
- `.ai/context/core/architecture.md` - directory structure
- `.ai/context/core/tech-stack.md` - framework versions

This provides baseline context for the draft.

### 4. Generate Draft Content

Fill in the template sections:

**FEATURE:**

- Transform the user's prompt into a clear, concise feature description
- Include the core goal and expected behavior

**DOCUMENTATION:**

- List relevant Angular docs pages (https://angular.dev/)
- Include any specific pattern documentation needed
- Reference internal context files that apply

**OTHER CONSIDERATIONS:**

- Note Angular 21 specific gotchas relevant to this feature
- Include common pitfalls for this type of feature
- Add any constraints from existing architecture

### 5. Ask for Clarification (if needed)

If the prompt is ambiguous, ask about:

- Scope: MVP vs full implementation?
- Integration: New feature or extending existing?
- Priority: User-facing or infrastructure?

### 6. Save Draft

Save to: `.ai/planning/drafts/{feature-name}.md`

Use `kebab-case` for filenames, derived from the feature description.

---

## Output Format

The generated draft should look like:

```markdown
## FEATURE:

[Clear description of the feature based on the user's prompt]

Example: "Create a user dashboard page that displays user profile information,
recent activity, and account settings. The dashboard should use lazy loading
and integrate with the existing auth service."

## DOCUMENTATION:

- Angular Signals: https://angular.dev/guide/signals
- Lazy Loading: https://angular.dev/guide/routing/lazy-loading
- Internal: `.ai/context/core/architecture.md` (routing patterns)
- Internal: `.ai/context/core/coding-standards.md` (component structure)

## OTHER CONSIDERATIONS:

- Use `inject()` for AuthService dependency injection
- Dashboard component should be in `pages/dashboard/` directory
- State must use signals, not BehaviorSubject
- Template control flow: `@if`/`@for` syntax required
- Ensure OnPush change detection for zoneless compatibility
- Add barrel export (`index.ts`) for the new directory
```

---

## Next Steps

After draft creation, inform the user:

> Draft saved to `.ai/planning/drafts/{feature-name}.md`
>
> Review and edit the draft as needed, then run:
>
> ```
> /prp.generate {feature-name}
> ```
>
> to generate the full PRP specification.

---

## Example Usage

**Input:**

```
/prp.draft user authentication with login and signup forms
```

**Output:**
Creates `.ai/planning/drafts/user-authentication.md` with structured content ready for `/prp.generate`.
