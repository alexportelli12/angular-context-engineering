import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { UserCardComponent } from './dumb-ui.component';
import { User } from './user.interface';

@Component({
  selector: 'app-user-page',
  imports: [CommonModule, FormsModule, UserCardComponent],
  templateUrl: './user-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent {
  // Dependency Injection
  protected readonly userService = inject(UserService);

  // Local State (Signals)
  protected searchQuery = signal('');

  // Methods
  protected handleEdit(user: User): void {
    console.log('Editing user:', user);
  }
}
