# Coding Standards

Angular 21 · Zoneless · Signal-based

## Required Patterns

| Legacy (❌ Never)                      | Modern (✅ Always)                   |
| -------------------------------------- | ------------------------------------ |
| `constructor(private svc: Service)`    | `inject(Service)`                    |
| `@Input() prop`                        | `input<T>()` / `input.required<T>()` |
| `@Output() event = new EventEmitter()` | `output<T>()`                        |
| `*ngIf`, `*ngFor`                      | `@if`, `@for`, `@switch`             |
| `BehaviorSubject` for state            | `signal<T>()`                        |
| NgModules                              | Standalone components                |
| Inline templates/styles                | Separate `.html` / `.css`            |
| `.component.ts` suffix                 | Simple `.ts` (e.g., `user-list.ts`)  |
| `.scss` files                          | `.css` files                         |
| `tailwind.config.js`                   | `@theme` in CSS                      |
| Disabling ESLint rules                 | Fix underlying issue                 |

## Naming

- **Booleans:** `is`, `has`, `can`, `should` prefix
- **Collections:** Plural with type (`userList`, not `users`)
- **Computed:** Descriptive result (`filteredUserList`, `totalPrice`)
- **No abbreviations:** `selectedIndex` not `selIdx`

## Code Quality

- Methods ≤20 lines (extract to private helpers)
- Complex template logic → `computed()` in component
- Tailwind classes first, custom CSS only when needed
- Every directory has `index.ts` barrel export

## Validation

Before completion, run:

```bash
npm run build   # Must succeed
npm run lint    # Must pass (fix issues, never disable)
```
