import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CancelFromTheMaintenancePlanGuard } from './shared/cancel-from-the-maintenance-plan.guard';
import { CancelFromTheMaintenancePlanNewComponent } from './cancel-from-the-maintenance-plan-new/cancel-from-the-maintenance-plan-new.component';
import { CancelFromTheMaintenancePlanEditComponent } from './cancel-from-the-maintenance-plan-edit/cancel-from-the-maintenance-plan-edit.component';
import { CancelFromTheMaintenancePlanListComponent } from './cancel-from-the-maintenance-plan-list/cancel-from-the-maintenance-plan-list.component';
import { CancelFromTheMaintenancePlanViewComponent } from './cancel-from-the-maintenance-plan-view/cancel-from-the-maintenance-plan-view.component';

const routes: Routes = [
  {
    path: '',
    component: CancelFromTheMaintenancePlanListComponent,
    canActivate: [CancelFromTheMaintenancePlanGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CancelFromTheMaintenancePlanNewComponent,
    canActivate: [CancelFromTheMaintenancePlanGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CancelFromTheMaintenancePlanEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CancelFromTheMaintenancePlanListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CancelFromTheMaintenancePlanViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CancelFromTheMaintenancePlanRoutingModule {
}
