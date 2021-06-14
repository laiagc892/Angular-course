import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  // With a "setter" (set keyword) this now turns into a method, this still is a property, it's just a setter of the property which is a method which gets executed whenever the property changes (and it of course changes whenever it changes outside of this directive).
  // If we want to use this as a structural directive, we have to name this property with the same name as the directive, to be recognized when the * transforms out code, otherwise we get an error.
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  //                  what                        and         where                 we place the directive
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
