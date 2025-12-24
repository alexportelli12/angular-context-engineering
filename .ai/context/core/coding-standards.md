# Angular Coding Standards & Best Practices

> **Version:** Angular v21
> **Last Updated:** 2025-12-24

This document defines the mandatory coding standards for this Angular project. All code MUST adhere to these rules.

---

## 1. Modern Angular (v21)

### 1.1 Signals for State Management

**MUST** use Angular Signals for all synchronous state management.

**DO:**

```typescript
import { signal, computed } from '@angular/core';

export class UserListComponent {
  userList = signal<User[]>([]);
  selectedUserId = signal<string | null>(null);

  selectedUser = computed(() => this.userList().find((user) => user.id === this.selectedUserId()));
}
```

**DO NOT:**

```typescript
// ❌ NEVER use BehaviorSubject for synchronous state
private userListSubject = new BehaviorSubject<User[]>([]);
userList$ = this.userListSubject.asObservable();
```

**Exception:** RxJS observables are acceptable ONLY for:

- Asynchronous operations (HTTP requests, WebSockets)
- Event streams with time-based operators
- Integration with third-party libraries that require observables

---

### 1.2 Component Inputs & Outputs

**MUST** use the new `input()`, `output()`, and `model()` functions.

**DO:**

```typescript
import { Component, input, output, model } from '@angular/core';

export class UserCardComponent {
  // Input (read-only)
  userId = input.required<string>();
  isEditable = input<boolean>(false);

  // Output (events)
  userDeleted = output<string>();
  userUpdated = output<User>();

  // Two-way binding
  selectedValue = model<string>('');
}
```

**DO NOT:**

```typescript
// ❌ NEVER use decorators
@Input() userId!: string;
@Input() isEditable = false;
@Output() userDeleted = new EventEmitter<string>();
```

---

### 1.3 Template Control Flow

**MUST** use the new `@if`, `@for`, and `@switch` syntax in templates.

**DO:**

```html
@if (isLoading()) {
<app-loading-spinner />
} @else if (hasError()) {
<app-error-message [message]="errorMessage()" />
} @else {
<div class="content">{{ content() }}</div>
} @for (user of userList(); track user.id) {
<app-user-card [user]="user" />
} @empty {
<p>No users found.</p>
} @switch (userRole()) { @case ('admin') {
<app-admin-panel />
} @case ('editor') {
<app-editor-panel />
} @default {
<app-viewer-panel />
} }
```

**DO NOT:**

```html
<!-- ❌ NEVER use structural directives -->
<div *ngIf="isLoading">Loading...</div>
<div *ngFor="let user of users">{{ user.name }}</div>
<ng-container [ngSwitch]="role">
  <div *ngSwitchCase="'admin'">Admin</div>
</ng-container>
```

---

### 1.4 Dependency Injection

**MUST** use `inject()` function for dependency injection.

**DO:**

```typescript
import { Component, inject } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

export class UserListComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.loadUsers();
  }
}
```

**DO NOT:**

```typescript
// ❌ NEVER use constructor injection
constructor(
  private userService: UserService,
  private router: Router
) {}
```

---

## 2. Code Quality

### 2.1 Naming Conventions

**MUST** use descriptive, intention-revealing variable names. NO abbreviations.

**DO:**

```typescript
// Clear and descriptive
const userList = signal<User[]>([]);
const isLoading = signal<boolean>(false);
const hasValidationError = signal<boolean>(false);
const selectedUserIndex = signal<number>(-1);
const filteredUserList = computed(() => /* ... */);
```

**DO NOT:**

```typescript
// ❌ Too vague or abbreviated
const users = signal<User[]>([]);
const loading = signal<boolean>(false);
const error = signal<boolean>(false);
const idx = signal<number>(-1);
const filtered = computed(() => /* ... */);
```

**Naming Patterns:**

- **Booleans:** Prefix with `is`, `has`, `should`, `can` (e.g., `isVisible`, `hasPermission`)
- **Collections:** Use plural nouns with clear type (e.g., `userList`, `productCollection`)
- **Computed Values:** Use descriptive names that indicate what's computed (e.g., `filteredUserList`, `totalPrice`)

---

### 2.2 Method Length & Responsibility

**MUST** keep methods small and focused on a single responsibility.

**Rule:** If a method exceeds **15-20 lines**, extract logic into separate methods.

**DO:**

```typescript
export class UserFormComponent {
  private readonly userService = inject(UserService);

  formData = signal<UserFormData>({ name: '', email: '' });
  validationErrors = signal<ValidationError[]>([]);

  submitForm(): void {
    if (!this.validateForm()) {
      return;
    }

    this.saveUser();
  }

  private validateForm(): boolean {
    const errors = this.getValidationErrors();
    this.validationErrors.set(errors);
    return errors.length === 0;
  }

  private getValidationErrors(): ValidationError[] {
    const errors: ValidationError[] = [];
    const data = this.formData();

    if (!data.name.trim()) {
      errors.push({ field: 'name', message: 'Name is required' });
    }

    if (!this.isValidEmail(data.email)) {
      errors.push({ field: 'email', message: 'Invalid email' });
    }

    return errors;
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private saveUser(): void {
    this.userService.createUser(this.formData()).subscribe({
      next: () => this.handleSaveSuccess(),
      error: (err) => this.handleSaveError(err),
    });
  }
}
```

---

### 2.3 Template Logic

**MUST** keep logic OUT of templates. Move complex conditions to `computed()` signals.

**DO:**

```typescript
// Component
export class UserProfileComponent {
  user = input.required<User>();
  currentUserRole = input.required<UserRole>();

  // Complex logic in computed signals
  canEditProfile = computed(() => {
    const role = this.currentUserRole();
    const user = this.user();
    return role === 'admin' || role === 'editor' || user.isOwner;
  });

  displayName = computed(() => {
    const user = this.user();
    return user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email;
  });

  statusBadgeClass = computed(() => {
    const status = this.user().status;
    return {
      'badge-success': status === 'active',
      'badge-warning': status === 'pending',
      'badge-danger': status === 'inactive',
    };
  });
}
```

```html
<!-- Template - Clean and declarative -->
<div class="user-profile">
  <h2>{{ displayName() }}</h2>
  <span [ngClass]="statusBadgeClass()">{{ user().status }}</span>

  @if (canEditProfile()) {
  <button (click)="editProfile()">Edit Profile</button>
  }
</div>
```

**DO NOT:**

```html
<!-- ❌ NEVER put complex logic in templates -->
<div class="user-profile">
  @if (currentUserRole() === 'admin' || currentUserRole() === 'editor' || user().isOwner) {
  <button>Edit</button>
  }

  <h2>
    {{ user().firstName && user().lastName ? user().firstName + ' ' + user().lastName : user().email
    }}
  </h2>
</div>
```

---

### 2.4 DRY Principle (Don't Repeat Yourself)

**MUST** extract repeated template code to sub-components or template references.

**DO:**

```typescript
// Extract to sub-component
@Component({
  selector: 'app-user-card',
  template: `
    <div class="card">
      <img [src]="user().avatar" [alt]="user().name" />
      <h3>{{ user().name }}</h3>
      <p>{{ user().email }}</p>
    </div>
  `,
})
export class UserCardComponent {
  user = input.required<User>();
}
```

```html
<!-- Use the sub-component -->
@for (user of userList(); track user.id) {
<app-user-card [user]="user" />
}
```

**DO NOT:**

```html
<!-- ❌ NEVER repeat the same template structure -->
@for (user of userList(); track user.id) {
<div class="card">
  <img [src]="user.avatar" [alt]="user.name" />
  <h3>{{ user.name }}</h3>
  <p>{{ user.email }}</p>
</div>
}
```

---

## 3. File Organization

### 3.1 Separation of Concerns

**MUST** separate interfaces, enums, and constants into dedicated files.

**File Structure:**

```
src/app/features/user/
├── components/
│   └── user-list/
│       ├── user-list.component.ts
│       ├── user-list.component.html
│       ├── user-list.component.scss
│       └── user-list.component.spec.ts
├── models/
│   ├── user.model.ts          # Interfaces
│   ├── user-role.enum.ts      # Enums
│   └── user.constants.ts      # Constants
└── services/
    ├── user.service.ts
    └── user.service.spec.ts
```

**DO:**

```typescript
// user.model.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface UserFormData {
  name: string;
  email: string;
}
```

```typescript
// user-role.enum.ts
export enum UserRole {
  Admin = 'admin',
  Editor = 'editor',
  Viewer = 'viewer',
}
```

```typescript
// user.constants.ts
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_USER_NAME_LENGTH = 100;
export const ALLOWED_EMAIL_DOMAINS = ['example.com', 'test.com'];
```

**DO NOT:**

```typescript
// ❌ NEVER mix interfaces, enums, and constants in the same file
// user.ts
export interface User {
  /* ... */
}
export interface UserFormData {
  /* ... */
}
export enum UserRole {
  /* ... */
}
export const DEFAULT_PAGE_SIZE = 20;
```

---

### 3.2 Template Files

**MUST** use separate `.html` files for component templates.

**DO:**

```typescript
// user-list.component.ts
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  // Component logic
}
```

**DO NOT:**

```typescript
// ❌ NEVER use inline templates
@Component({
  selector: 'app-user-list',
  template: `
    <div class="user-list">
      @for (user of userList(); track user.id) {
        <app-user-card [user]="user" />
      }
    </div>
  `,
})
export class UserListComponent {}
```

**Exception:** Inline templates are acceptable ONLY for:

- Extremely simple components (< 3 lines of HTML)
- Wrapper components that only wrap a single element

---

## 4. Summary Checklist

Before committing code, verify:

- [ ] All state uses `signal()` or `computed()`
- [ ] All inputs use `input()` or `input.required()`
- [ ] All outputs use `output()`
- [ ] All two-way bindings use `model()`
- [ ] All dependencies use `inject()`
- [ ] All template control flow uses `@if`, `@for`, `@switch`
- [ ] All variable names are descriptive (no abbreviations)
- [ ] No method exceeds 20 lines
- [ ] No complex logic in templates
- [ ] No repeated template code
- [ ] Interfaces are in `.model.ts` files
- [ ] Enums are in `.enum.ts` files
- [ ] Constants are in `.constants.ts` files
- [ ] Templates are in separate `.html` files

---

**Non-compliance with these standards is not acceptable. All code MUST follow these rules.**
