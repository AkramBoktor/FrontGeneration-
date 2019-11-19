
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MaintenanceOfMachineryAndEquipmentComponent } from './maintenance-of-machinery-and-equipment.component';


const routes: Routes = [
  {
    path: '',
    component: MaintenanceOfMachineryAndEquipmentComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MaintenanceOfMachineryAndEquipmentRoutingModule {
}

