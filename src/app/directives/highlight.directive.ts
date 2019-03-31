import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor( private eleref : ElementRef, private renderer : Renderer2) { }

  @HostListener('mouseenter') onmouseenter() {
    this.renderer.addClass(this.eleref.nativeElement,'highlight');
  }

  @HostListener('mouseleave') onmouseleave() {
    this.renderer.removeClass(this.eleref.nativeElement,'highlight');
  }
}
