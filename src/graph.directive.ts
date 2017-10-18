import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[graphDirective]'
})
export class GraphDirective {

  constructor(private el: ElementRef) {
  }

}
