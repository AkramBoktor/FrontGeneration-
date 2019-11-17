
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-maintenance-of-machinery-and-equipment',
  templateUrl: './maintenance-of-machinery-and-equipment.component.html'
})
export class MaintenanceOfMachineryAndEquipmentComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

