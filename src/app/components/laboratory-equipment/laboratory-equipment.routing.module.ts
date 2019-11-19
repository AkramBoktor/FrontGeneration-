
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LaboratoryEquipmentComponent } from './laboratory-equipment.component';


const routes: Routes = [
  {
    path: '',
    component: LaboratoryEquipmentComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LaboratoryEquipmentRoutingModule {
}

