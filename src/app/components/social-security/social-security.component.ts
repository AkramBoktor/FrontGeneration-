
import { Component, Injector, OnInit } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-social-security',
  templateUrl: './social-security.component.html'
})
export class SocialSecurityComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

