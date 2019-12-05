import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MaintenancePlanGuard } from './shared/maintenance-plan.guard';
import { MaintenancePlanNewComponent } from './maintenance-plan-new/maintenance-plan-new.component';
import { MaintenancePlanEditComponent } from './maintenance-plan-edit/maintenance-plan-edit.component';
import { MaintenancePlanListComponent } from './maintenance-plan-list/maintenance-plan-list.component';
import { MaintenancePlanViewComponent } from './maintenance-plan-view/maintenance-plan-view.component';

const routes: Routes = [
  {
    path: '',
    component: MaintenancePlanListComponent,
    canActivate: [MaintenancePlanGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: MaintenancePlanNewComponent,
    canActivate: [MaintenancePlanGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: MaintenancePlanEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: MaintenancePlanListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: MaintenancePlanViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MaintenancePlanRoutingModule {
}
