import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-block',
  imports: [CommonModule],
  templateUrl: './code-block.html',
  styleUrl: './code-block.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent {
  code = input.required<string>();
  language = input<string>('bash');
}
