import { Directive, ElementRef, HostListener, Renderer2} from '@angular/core';
@Directive({
  selector: '[appOnHover]'
})
export class OnHoverDirective {

  constructor(private ref: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') MyMouseEnter(eventData: Event): void {
    this.renderer.setStyle(this.ref.nativeElement, 'transition', 'background-color 0.3s');
    this.renderer.setStyle(this.ref.nativeElement, 'background-color', '#e67e22'); 
  }
  @HostListener('mouseleave') MyMouseLeave(eventData: Event): void {
    this.renderer.removeStyle(this.ref.nativeElement, 'background-color');
  }
}
