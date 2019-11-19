
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaboratoryEquipmentRoutingModule } from './laboratory-equipment.routing.module';
import { LaboratoryEquipmentComponent } from './laboratory-equipment.component';

@NgModule({
  declarations: [LaboratoryEquipmentComponent],
  imports: [
    LaboratoryEquipmentRoutingModule,
    CommonModule,
  ]
})
export class LaboratoryEquipmentModule { }

