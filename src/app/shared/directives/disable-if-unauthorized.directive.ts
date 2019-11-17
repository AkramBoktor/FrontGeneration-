import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';

@Directive({
  selector: '[disableIfUnauthorized]'
})
export class DisableIfUnauthorizedDirective implements OnInit {

  @Input('disableIfUnauthorized') permission: string;

  constructor(private el: ElementRef, private authService: AuthService, private render2: Renderer2) { }

  ngOnInit() {
    if (this.permission && !this.authService.hasPermission(this.permission)) {
      this.render2.setAttribute(this.el.nativeElement, 'disabled', 'true');

      console.log(this.el.nativeElement);
      // this.el.nativeElement.disabled = true;
    }
  }
}

