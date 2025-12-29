# Coding Standards

> Angular v21 | Zoneless | Signal-based

## 1. Modern Angular Syntax (Required)

### Signals (State Management)

Use signals for synchronous state. RxJS ONLY for async (HTTP, WebSockets, timers).

```typescript
// ✅ Signals
userList = signal<User[]>([]);
selectedUser = computed(() => this.userList().find(u => u.id === this.selectedId()));

// ❌ NEVER BehaviorSubject for state
userListSubject = new BehaviorSubject<User[]>([]);
```

### Inputs/Outputs

Use input(), output(), model() functions. NOT decorators.

```typescript
userId = input.required<string>();
isEditable = input<boolean>(false);
userDeleted = output<string>();
selectedValue = model<string>('');  // Two-way binding
```

### Template Control Flow

Use @if, @for, @switch. NOT *ngIf, *ngFor.

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

### Dependency Injection

Use inject() function. NOT constructor injection.

```typescript
private readonly userService = inject(UserService);
private readonly router = inject(Router);
```

## 2. Code Quality Rules

### Naming Conventions

Descriptive, intention-revealing names. NO abbreviations.

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
- **Booleans:** is, has, should, can prefix (isVisible, hasPermission)
- **Collections:** Plural with type (userList, productCollection)
- **Computed:** Descriptive result (filteredUserList, totalPrice)

### Method Length

Keep methods ≤15-20 lines. Extract logic into private methods.

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

### Template Logic

Move complex logic to computed() signals. Keep templates declarative.

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

### DRY Principle

Extract repeated template code to sub-components.

## 3. File Organization

### Separation of Concerns

Separate interfaces, enums, constants into dedicated files.

```
models/
├── user.model.ts          # Interfaces only
├── user-role.enum.ts      # Enums only
└── user.constants.ts      # Constants only
```

### Template and Style Files

Separate .html and .css files. NO inline templates/styles.

```typescript
// ✅ External files
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})

// ❌ NO inline
template: `<div>...</div>`,
styles: `...`
```

**Styling Approach:**
1. Use Tailwind classes in templates (primary)
2. Custom CSS in .css files (only when needed)
3. Use @theme in CSS for Tailwind customization

**Exception:** Inline template acceptable ONLY for <3 lines.

## 4. Linting

Fix underlying issues. NEVER disable ESLint rules.

```typescript
// ❌ NEVER
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = ...;

// ✅ Fix properly
const data: User = ...;
```

## 5. Validation Checklist

- [ ] State: signal()/computed() (not BehaviorSubject)
- [ ] Inputs: input()/input.required()
- [ ] Outputs: output(), two-way: model()
- [ ] DI: inject() (not constructor)
- [ ] Templates: @if/@for/@switch (not *ngIf/*ngFor)
- [ ] Names: Descriptive (no abbreviations)
- [ ] Methods: ≤20 lines, single responsibility
- [ ] Templates: No complex logic (use computed())
- [ ] Files: Separate .model.ts, .enum.ts, .constants.ts, .html, .css
- [ ] Styles: Tailwind first, custom CSS only when needed
- [ ] Filenames: NO .component. (user-list.ts not user-list.component.ts)
- [ ] Linting: All issues fixed (not disabled)
