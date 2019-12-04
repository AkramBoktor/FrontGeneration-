import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AddTheImplementationOfAirConditioningMaintenanceGuard } from './shared/add-the-implementation-of-air-conditioning-maintenance.guard';
import { AddTheImplementationOfAirConditioningMaintenanceNewComponent } from './add-the-implementation-of-air-conditioning-maintenance-new/add-the-implementation-of-air-conditioning-maintenance-new.component';
import { AddTheImplementationOfAirConditioningMaintenanceEditComponent } from './add-the-implementation-of-air-conditioning-maintenance-edit/add-the-implementation-of-air-conditioning-maintenance-edit.component';
import { AddTheImplementationOfAirConditioningMaintenanceListComponent } from './add-the-implementation-of-air-conditioning-maintenance-list/add-the-implementation-of-air-conditioning-maintenance-list.component';
import { AddTheImplementationOfAirConditioningMaintenanceViewComponent } from './add-the-implementation-of-air-conditioning-maintenance-view/add-the-implementation-of-air-conditioning-maintenance-view.component';

const routes: Routes = [
  {
    path: '',
    component: AddTheImplementationOfAirConditioningMaintenanceListComponent,
    canActivate: [AddTheImplementationOfAirConditioningMaintenanceGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AddTheImplementationOfAirConditioningMaintenanceNewComponent,
    canActivate: [AddTheImplementationOfAirConditioningMaintenanceGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AddTheImplementationOfAirConditioningMaintenanceEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AddTheImplementationOfAirConditioningMaintenanceListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AddTheImplementationOfAirConditioningMaintenanceViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AddTheImplementationOfAirConditioningMaintenanceRoutingModule {
}
