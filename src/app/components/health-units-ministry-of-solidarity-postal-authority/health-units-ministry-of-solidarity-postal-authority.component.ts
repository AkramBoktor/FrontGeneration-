
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-health-units-ministry-of-solidarity-postal-authority',
  templateUrl: './health-units-ministry-of-solidarity-postal-authority.component.html'
})
export class HealthUnitsMinistryOfSolidarityPostalAuthorityComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

