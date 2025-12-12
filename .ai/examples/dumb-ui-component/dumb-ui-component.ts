import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from './user.interface';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  // Signal Inputs
  readonly user = input.required<User>();
  readonly isActive = input<boolean>(false);

  // New Output API
  readonly edit = output<User>();

  protected onEdit(): void {
    this.edit.emit(this.user());
  }
}
