import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { User } from './user.interface';
import { API_CONFIG } from './app.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  // Writable Signal for State
  private readonly _users = signal<User[]>([]);
  private readonly _loading = signal<boolean>(false);

  // Read-only signals exposed to components
  readonly users = this._users.asReadonly();
  readonly isLoading = this._loading.asReadonly();

  // Computed Signal
  readonly userCount = computed(() => this.users().length);

  loadUsers(): void {
    this._loading.set(true);

    this.http
      .get<User[]>(`${API_CONFIG.BASE_URL}/users`)
      .pipe(catchError(() => of([]))) // Simple error handling
      .subscribe({
        next: (data) => this._users.set(data),
        complete: () => this._loading.set(false),
      });
  }
}
