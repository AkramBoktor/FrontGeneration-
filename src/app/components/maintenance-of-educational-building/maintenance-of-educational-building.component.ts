
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-maintenance-of-educational-building',
  templateUrl: './maintenance-of-educational-building.component.html'
})
export class MaintenanceOfEducationalBuildingComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

