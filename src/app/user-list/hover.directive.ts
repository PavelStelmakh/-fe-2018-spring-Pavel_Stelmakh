import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class HoverDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) {          
    this.renderer.setStyle(this.element.nativeElement, 'cursor', 'pointer');
  }

  onMouseEnter() {
    this.setHover('rgba(102, 102, 102, 0.5)');
  }

  onMouseLeave() {
    this.setHover('rgba(102, 102, 102, 0)');
  }

  private setHover(val: string) {
    this.renderer.setStyle(this.element.nativeElement, 'background-color', val);
  }

}
