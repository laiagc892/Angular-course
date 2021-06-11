import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  // Renderer is a better approach of accessing the DOM
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // setSttyle arguments: 1st element, 2nd style property, 3rd value, 4th flags
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
  }

}
