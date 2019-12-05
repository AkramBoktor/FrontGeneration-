import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TenderForBuildingsMaintenancePlanGuard } from './shared/tender-for-buildings-maintenance-plan.guard';
import { TenderForBuildingsMaintenancePlanNewComponent } from './tender-for-buildings-maintenance-plan-new/tender-for-buildings-maintenance-plan-new.component';
import { TenderForBuildingsMaintenancePlanEditComponent } from './tender-for-buildings-maintenance-plan-edit/tender-for-buildings-maintenance-plan-edit.component';
import { TenderForBuildingsMaintenancePlanListComponent } from './tender-for-buildings-maintenance-plan-list/tender-for-buildings-maintenance-plan-list.component';
import { TenderForBuildingsMaintenancePlanViewComponent } from './tender-for-buildings-maintenance-plan-view/tender-for-buildings-maintenance-plan-view.component';

const routes: Routes = [
  {
    path: '',
    component: TenderForBuildingsMaintenancePlanListComponent,
    canActivate: [TenderForBuildingsMaintenancePlanGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TenderForBuildingsMaintenancePlanNewComponent,
    canActivate: [TenderForBuildingsMaintenancePlanGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TenderForBuildingsMaintenancePlanEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TenderForBuildingsMaintenancePlanListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TenderForBuildingsMaintenancePlanViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TenderForBuildingsMaintenancePlanRoutingModule {
}
