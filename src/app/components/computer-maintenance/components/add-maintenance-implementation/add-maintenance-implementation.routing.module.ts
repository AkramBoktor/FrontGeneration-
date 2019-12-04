import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AddMaintenanceImplementationGuard } from './shared/add-maintenance-implementation.guard';
import { AddMaintenanceImplementationNewComponent } from './add-maintenance-implementation-new/add-maintenance-implementation-new.component';
import { AddMaintenanceImplementationEditComponent } from './add-maintenance-implementation-edit/add-maintenance-implementation-edit.component';
import { AddMaintenanceImplementationListComponent } from './add-maintenance-implementation-list/add-maintenance-implementation-list.component';
import { AddMaintenanceImplementationViewComponent } from './add-maintenance-implementation-view/add-maintenance-implementation-view.component';

const routes: Routes = [
  {
    path: '',
    component: AddMaintenanceImplementationListComponent,
    canActivate: [AddMaintenanceImplementationGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AddMaintenanceImplementationNewComponent,
    canActivate: [AddMaintenanceImplementationGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AddMaintenanceImplementationEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AddMaintenanceImplementationListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AddMaintenanceImplementationViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AddMaintenanceImplementationRoutingModule {
}
