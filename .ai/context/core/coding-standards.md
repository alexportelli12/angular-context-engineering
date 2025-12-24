# Angular Coding Standards

> Angular v21 | Updated: 2025-12-24

Mandatory coding standards for this project.

---

## 1. Modern Angular Syntax

### 1.1 Signals (State Management)
**MUST** use Signals for synchronous state. Use RxJS ONLY for async operations (HTTP, WebSockets, time-based streams).

```typescript
// ✅ Signals for state
userList = signal<User[]>([]);
selectedUser = computed(() => this.userList().find(u => u.id === this.selectedId()));

// ❌ Never BehaviorSubject for state
userListSubject = new BehaviorSubject<User[]>([]);
```

### 1.2 Inputs/Outputs
**MUST** use `input()`, `output()`, `model()` functions (not decorators).

```typescript
userId = input.required<string>();
isEditable = input<boolean>(false);
userDeleted = output<string>();
selectedValue = model<string>('');  // Two-way binding
```

### 1.3 Template Control Flow
**MUST** use `@if`, `@for`, `@switch` (not `*ngIf`, `*ngFor`, `ngSwitch`).

```html
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

@switch (role()) {
  @case ('admin') { <app-admin-panel /> }
  @default { <app-viewer-panel /> }
}
```

### 1.4 Dependency Injection
**MUST** use `inject()` function (not constructor injection).

```typescript
private readonly userService = inject(UserService);
private readonly router = inject(Router);
```

---

## 2. Code Quality

### 2.1 Naming Conventions
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

### 2.2 Method Length
**MUST** keep methods focused and **≤15-20 lines**. Extract logic into private methods.

```typescript
submitForm(): void {
  if (!this.validateForm()) return;
  this.saveUser();
}

private validateForm(): boolean {
  const errors = this.getValidationErrors();
  this.validationErrors.set(errors);
  return errors.length === 0;
}
```

### 2.3 Template Logic
**MUST** move complex logic to `computed()` signals. Keep templates declarative.

```typescript
// ✅ Component
canEditProfile = computed(() => {
  const role = this.currentUserRole();
  return role === 'admin' || role === 'editor' || this.user().isOwner;
});

displayName = computed(() => {
  const u = this.user();
  return u.firstName && u.lastName ? `${u.firstName} ${u.lastName}` : u.email;
});
```

```html
<!-- ✅ Template -->
<h2>{{ displayName() }}</h2>
@if (canEditProfile()) { <button>Edit</button> }

<!-- ❌ Never complex logic in templates -->
@if (role() === 'admin' || role() === 'editor' || user().isOwner) { ... }
```

### 2.4 DRY Principle
**MUST** extract repeated template code to sub-components.

```typescript
// ✅ Extract to component
@Component({ selector: 'app-user-card', template: `<div class="card">...</div>` })
export class UserCardComponent {
  user = input.required<User>();
}
```

---

## 3. File Organization

### 3.1 Separation of Concerns
**MUST** separate interfaces, enums, and constants into dedicated files.

```
models/
├── user.model.ts          # Interfaces only
├── user-role.enum.ts      # Enums only
└── user.constants.ts      # Constants only
```

```typescript
// ❌ Never mix in one file
export interface User { /* ... */ }
export enum UserRole { /* ... */ }
export const DEFAULT_PAGE_SIZE = 20;

// ✅ Separate files
// user.model.ts
export interface User { id: string; name: string; }
// user-role.enum.ts
export enum UserRole { Admin = 'admin', Editor = 'editor' }
// user.constants.ts
export const DEFAULT_PAGE_SIZE = 20;
```

### 3.2 Template Files
**MUST** use separate `.html` files (no inline templates).

```typescript
// ✅ External template
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})

// ❌ No inline templates
template: `<div>...</div>`
```

**Exception:** Inline acceptable ONLY for <3 lines or single-element wrappers.

---

## 4. Commit Checklist

- [ ] State: `signal()` or `computed()` (not BehaviorSubject)
- [ ] Inputs: `input()` or `input.required()`
- [ ] Outputs: `output()`, two-way: `model()`
- [ ] DI: `inject()` (not constructor)
- [ ] Templates: `@if`, `@for`, `@switch` (not `*ngIf`, `*ngFor`)
- [ ] Names: Descriptive (no abbreviations)
- [ ] Methods: ≤20 lines, single responsibility
- [ ] Templates: No complex logic (use `computed()`)
- [ ] Files: Separate `.model.ts`, `.enum.ts`, `.constants.ts`, `.html`
