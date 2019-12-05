import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EquipmentMaintenancePlanDataGuard } from './shared/equipment-maintenance-plan-data.guard';
import { EquipmentMaintenancePlanDataNewComponent } from './equipment-maintenance-plan-data-new/equipment-maintenance-plan-data-new.component';
import { EquipmentMaintenancePlanDataEditComponent } from './equipment-maintenance-plan-data-edit/equipment-maintenance-plan-data-edit.component';
import { EquipmentMaintenancePlanDataListComponent } from './equipment-maintenance-plan-data-list/equipment-maintenance-plan-data-list.component';
import { EquipmentMaintenancePlanDataViewComponent } from './equipment-maintenance-plan-data-view/equipment-maintenance-plan-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: EquipmentMaintenancePlanDataListComponent,
    canActivate: [EquipmentMaintenancePlanDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EquipmentMaintenancePlanDataNewComponent,
    canActivate: [EquipmentMaintenancePlanDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EquipmentMaintenancePlanDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EquipmentMaintenancePlanDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EquipmentMaintenancePlanDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EquipmentMaintenancePlanDataRoutingModule {
}
