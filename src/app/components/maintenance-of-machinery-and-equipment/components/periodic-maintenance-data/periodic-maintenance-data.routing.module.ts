import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PeriodicMaintenanceDataGuard } from './shared/periodic-maintenance-data.guard';
import { PeriodicMaintenanceDataNewComponent } from './periodic-maintenance-data-new/periodic-maintenance-data-new.component';
import { PeriodicMaintenanceDataEditComponent } from './periodic-maintenance-data-edit/periodic-maintenance-data-edit.component';
import { PeriodicMaintenanceDataListComponent } from './periodic-maintenance-data-list/periodic-maintenance-data-list.component';
import { PeriodicMaintenanceDataViewComponent } from './periodic-maintenance-data-view/periodic-maintenance-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: PeriodicMaintenanceDataListComponent,
    canActivate: [PeriodicMaintenanceDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PeriodicMaintenanceDataNewComponent,
    canActivate: [PeriodicMaintenanceDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PeriodicMaintenanceDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PeriodicMaintenanceDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PeriodicMaintenanceDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PeriodicMaintenanceDataRoutingModule {
}
