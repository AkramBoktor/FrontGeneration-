
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-quality-management',
  templateUrl: './quality-management.component.html'
})
export class QualityManagementComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

