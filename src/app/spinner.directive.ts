import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { UsersService } from './users.service';

@Directive({
  selector: '[appSpinner]'
})
export class SpinnerDirective {

  constructor(
    private element: ElementRef, 
    private renderer: Renderer2,
    private userService: UsersService
    ) {
      userService.spinner.subscribe((spinner: boolean) => {
        if (spinner) {
          renderer.addClass(element.nativeElement, 'spinner');
        } else {
          renderer.removeClass(element.nativeElement, 'spinner');
        }
      });
     }

}
