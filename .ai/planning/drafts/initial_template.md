# PRP Draft Template

Use this template with `/prp.draft` to capture initial feature requirements before full PRP generation.

---

## FEATURE:

[Describe the feature clearly and concisely. Include:]
- What the feature does
- Expected behavior and user interactions
- Key components or pages involved

Example: "Create a user profile page with editable form fields for name, email, and avatar. Should include validation and save functionality."

## DOCUMENTATION:

[List documentation resources needed during implementation:]

**Angular Resources:**
- [Relevant Angular docs page]: https://angular.dev/...

**Internal Context:**
- `.ai/context/core/architecture.md` - [why needed]
- `.ai/context/core/coding-standards.md` - [why needed]
- `.ai/context/core/tech-stack.md` - [why needed]

**External Resources:**
- [Any third-party docs, APIs, or design specs]

## OTHER CONSIDERATIONS:

[Capture gotchas, constraints, and requirements that AI agents commonly miss:]

**Angular 21 Requirements:**
- [ ] Use `signal()` for state (not BehaviorSubject)
- [ ] Use `inject()` for DI (not constructor)
- [ ] Use `@if`/`@for` templates (not `*ngIf`/`*ngFor`)
- [ ] Use `input()`/`output()` (not @Input/@Output decorators)
- [ ] OnPush change detection
- [ ] Component filenames without `.component.` (e.g., user-list.ts)
- [ ] Use Tailwind classes for styling (custom CSS only when needed)
- [ ] Style files as `.css` (not `.scss`)
- [ ] Fix lint errors properly (NEVER disable ESLint rules)

**Architecture Constraints:**
- [Directory placement: pages/ vs shared/ui/]
- [Service dependencies to reuse]
- [State management approach]

**Edge Cases:**
- [Loading states]
- [Error handling]
- [Empty states]

**Testing Notes:**
- Tests are NOT required unless explicitly requested
- [If tests are needed: key scenarios to test]
- [If tests are needed: mock requirements]

---

## Next Step

Once this draft is complete, run:
```
/prp.generate {feature-name}
```
