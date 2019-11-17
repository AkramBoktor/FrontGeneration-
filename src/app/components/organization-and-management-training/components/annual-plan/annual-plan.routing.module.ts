import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AnnualPlanGuard } from './shared/annual-plan.guard';
import { AnnualPlanNewComponent } from './annual-plan-new/annual-plan-new.component';
import { AnnualPlanEditComponent } from './annual-plan-edit/annual-plan-edit.component';
import { AnnualPlanListComponent } from './annual-plan-list/annual-plan-list.component';
import { AnnualPlanViewComponent } from './annual-plan-view/annual-plan-view.component';

const routes: Routes = [
  {
    path: '',
    component: AnnualPlanListComponent,
    canActivate: [AnnualPlanGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AnnualPlanNewComponent,
    canActivate: [AnnualPlanGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AnnualPlanEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AnnualPlanListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AnnualPlanViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AnnualPlanRoutingModule {
}
