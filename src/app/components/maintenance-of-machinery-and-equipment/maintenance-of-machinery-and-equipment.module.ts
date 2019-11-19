
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceOfMachineryAndEquipmentRoutingModule } from './maintenance-of-machinery-and-equipment.routing.module';
import { MaintenanceOfMachineryAndEquipmentComponent } from './maintenance-of-machinery-and-equipment.component';

@NgModule({
  declarations: [MaintenanceOfMachineryAndEquipmentComponent],
  imports: [
    MaintenanceOfMachineryAndEquipmentRoutingModule,
    CommonModule,
  ]
})
export class MaintenanceOfMachineryAndEquipmentModule { }

