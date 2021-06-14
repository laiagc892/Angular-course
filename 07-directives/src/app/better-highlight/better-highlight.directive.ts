import { 
  Directive, 
  ElementRef, 
  HostBinding, 
  HostListener, 
  Input, 
  OnInit, 
  Renderer2 
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor:string = 'transparent';
  @Input('appBetterHighlight') highlightColor:string = 'blue';
  // Using HostBinding to bind to host properties, and use them:
  @HostBinding('style.backgroundColor') backgroundColor: string;  // We also have to set some initial color (value) so that we don't get an error before we mouse over it the first time.

  // Renderer is a better approach of accessing the DOM
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // setSttyle arguments: 1st element, 2nd style property, 3rd value, 4th flags:
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.defaultColor;
  }

  // "@HostListener" reacting to user event or any events:
  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }
  
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }


}
