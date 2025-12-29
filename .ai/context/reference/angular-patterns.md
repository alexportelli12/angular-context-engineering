# Angular Patterns

Quick reference for modern Angular patterns.

---

## Component Pattern

```typescript
// Filename: user-list.ts (NO .component.)
import { ChangeDetectionStrategy, Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services';
import { User } from '../../models';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  // Services
  private readonly userService = inject(UserService);

  // Inputs
  departmentId = input.required<string>();
  showInactive = input<boolean>(false);

  // Outputs
  userSelected = output<User>();
  userDeleted = output<string>();

  // Two-way binding
  selectedUserId = model<string>('');

  // State
  userList = signal<User[]>([]);
  isLoading = signal<boolean>(false);
  hasError = signal<boolean>(false);

  // Computed
  filteredUserList = computed(() => {
    const users = this.userList();
    const showInactive = this.showInactive();
    return showInactive ? users : users.filter(u => u.isActive);
  });

  // Lifecycle
  ngOnInit() {
    this.loadUsers();
  }

  // Methods
  loadUsers(): void {
    this.isLoading.set(true);
    this.userService.getUsers(this.departmentId()).subscribe({
      next: (users) => {
        this.userList.set(users);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      }
    });
  }

  handleUserClick(user: User): void {
    this.userSelected.emit(user);
  }

  handleDeleteClick(userId: string): void {
    this.userDeleted.emit(userId);
  }
}
```

---

## Template Pattern

```html
<!-- user-list.html -->
<div class="container mx-auto px-4 py-8">
  @if (isLoading()) {
    <div class="flex justify-center">
      <span class="text-gray-600">Loading users...</span>
    </div>
  } @else if (hasError()) {
    <div class="bg-red-100 text-red-700 p-4 rounded">
      Failed to load users. Please try again.
    </div>
  } @else {
    <div class="grid gap-4">
      @for (user of filteredUserList(); track user.id) {
        <div class="border rounded p-4 hover:shadow-lg cursor-pointer"
             (click)="handleUserClick(user)">
          <h3 class="text-lg font-bold">{{ user.name }}</h3>
          <p class="text-gray-600">{{ user.email }}</p>
          <button class="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                  (click)="handleDeleteClick(user.id); $event.stopPropagation()">
            Delete
          </button>
        </div>
      } @empty {
        <p class="text-gray-500 text-center">No users found.</p>
      }
    </div>
  }
</div>
```

---

## Service Pattern

```typescript
// user.service.ts
import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  // Sync state (signals)
  private readonly _selectedUser = signal<User | null>(null);
  readonly selectedUser = this._selectedUser.asReadonly();

  // Async operations (RxJS)
  getUsers(departmentId: string): Observable<User[]> {
    return this.http.get<User[]>(`/api/users?dept=${departmentId}`);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }

  // State mutation
  setSelectedUser(user: User | null): void {
    this._selectedUser.set(user);
  }
}
```

---

## Routing Pattern

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard').then(m => m.DashboardComponent),
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/user-list').then(m => m.UserListComponent),
    canActivate: [authGuard],
  },
  {
    path: 'users/:id',
    loadComponent: () => import('./pages/user-detail').then(m => m.UserDetailComponent),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found').then(m => m.NotFoundComponent),
  },
];
```

---

## Guard Pattern

```typescript
// auth.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.parseUrl('/login');
};
```

---

## Model Pattern

```typescript
// user.model.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
}

export interface UserCreateRequest {
  name: string;
  email: string;
  role: UserRole;
}

export interface UserUpdateRequest {
  name?: string;
  email?: string;
  isActive?: boolean;
}
```

```typescript
// user-role.enum.ts
export enum UserRole {
  Admin = 'ADMIN',
  Editor = 'EDITOR',
  Viewer = 'VIEWER',
}
```

```typescript
// user.constants.ts
export const DEFAULT_USERS_PER_PAGE = 20;
export const MAX_USERNAME_LENGTH = 50;
export const USER_ROLES = ['ADMIN', 'EDITOR', 'VIEWER'] as const;
```

---

## Barrel Export Pattern

```typescript
// models/index.ts
export * from './user.model';
export * from './user-role.enum';
export * from './user.constants';
export * from './department.model';
export * from './department-type.enum';
```

```typescript
// services/index.ts
export * from './user.service';
export * from './auth.service';
export * from './department.service';
```

```typescript
// shared/ui/index.ts
export * from './button';
export * from './card';
export * from './modal';
```

---

## Effect Pattern (Side Effects)

```typescript
import { effect } from '@angular/core';

export class UserListComponent {
  departmentId = input.required<string>();
  userList = signal<User[]>([]);

  constructor() {
    // React to input changes
    effect(() => {
      const deptId = this.departmentId();
      this.loadUsers(deptId);
    });
  }

  private loadUsers(departmentId: string): void {
    // Load users for department
  }
}
```

---

## Form Pattern (Template-Driven)

```typescript
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.html',
})
export class UserFormComponent {
  // Form state (signals)
  userName = signal<string>('');
  userEmail = signal<string>('');
  userRole = signal<UserRole>('VIEWER');

  // Validation state
  isSubmitted = signal<boolean>(false);

  // Computed validation
  isNameValid = computed(() => {
    const name = this.userName();
    return name.length > 0 && name.length <= 50;
  });

  isEmailValid = computed(() => {
    const email = this.userEmail();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  });

  isFormValid = computed(() => {
    return this.isNameValid() && this.isEmailValid();
  });

  handleSubmit(): void {
    this.isSubmitted.set(true);
    if (this.isFormValid()) {
      const formData = {
        name: this.userName(),
        email: this.userEmail(),
        role: this.userRole(),
      };
      // Process form data
    }
  }
}
```

```html
<!-- user-form.html -->
<form (ngSubmit)="handleSubmit()" class="space-y-4">
  <div>
    <label class="block text-sm font-medium">Name</label>
    <input
      [ngModel]="userName()"
      (ngModelChange)="userName.set($event)"
      name="name"
      class="w-full border rounded px-3 py-2"
    />
    @if (isSubmitted() && !isNameValid()) {
      <span class="text-red-500 text-sm">Name is required (max 50 characters)</span>
    }
  </div>

  <div>
    <label class="block text-sm font-medium">Email</label>
    <input
      [ngModel]="userEmail()"
      (ngModelChange)="userEmail.set($event)"
      name="email"
      type="email"
      class="w-full border rounded px-3 py-2"
    />
    @if (isSubmitted() && !isEmailValid()) {
      <span class="text-red-500 text-sm">Valid email is required</span>
    }
  </div>

  <div>
    <label class="block text-sm font-medium">Role</label>
    <select
      [ngModel]="userRole()"
      (ngModelChange)="userRole.set($event)"
      name="role"
      class="w-full border rounded px-3 py-2"
    >
      <option value="ADMIN">Admin</option>
      <option value="EDITOR">Editor</option>
      <option value="VIEWER">Viewer</option>
    </select>
  </div>

  <button
    type="submit"
    [disabled]="isSubmitted() && !isFormValid()"
    class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
  >
    Submit
  </button>
</form>
```

---

## Common Gotchas

### Signal Updates

```typescript
// ❌ WRONG: Direct mutation
this.userList.push(newUser);

// ✅ CORRECT: Use set() or update()
this.userList.update(users => [...users, newUser]);
```

### Template Binding

```typescript
// ❌ WRONG: Missing parentheses
<div>{{ userName }}</div>

// ✅ CORRECT: Call signal
<div>{{ userName() }}</div>
```

### Computed Dependencies

```typescript
// ❌ WRONG: Reading signal outside computed
filteredUsers = this.userList().filter(u => u.isActive);

// ✅ CORRECT: Inside computed
filteredUsers = computed(() => this.userList().filter(u => u.isActive));
```
