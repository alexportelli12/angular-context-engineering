import { Directive, ElementRef, effect, input, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  private readonly el = inject(ElementRef);

  // Signal Input
  readonly appHighlight = input<string>('yellow');

  constructor() {
    // React to signal changes using effect
    effect(() => {
      this.el.nativeElement.style.backgroundColor = this.appHighlight();
    });
  }
}
