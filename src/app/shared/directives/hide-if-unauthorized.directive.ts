import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[hideIfUnauthorized]'
})
export class HideIfUnauthorizedDirective implements OnInit {

  @Input('hideIfUnauthorized') permission: string | string[];

  constructor(private el: ElementRef, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.permission && !this.authService.hasPermission(this.permission, this.activatedRoute.snapshot.data.moduleName)) {
      this.el.nativeElement.style.display = 'none';
    }
  }
}
