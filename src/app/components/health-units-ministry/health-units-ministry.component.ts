
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-health-units-ministry',
  templateUrl: './health-units-ministry.component.html'
})
export class HealthUnitsMinistryOfSolidarityPostalAuthorityComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

