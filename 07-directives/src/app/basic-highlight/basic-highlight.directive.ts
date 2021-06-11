import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
  // private word in front of the element, make it a property of this class, so property elementRef, and automatically assign this value
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }

}