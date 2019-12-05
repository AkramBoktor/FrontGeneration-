import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FiveYearPlanGuard } from './shared/five-year-plan.guard';
import { FiveYearPlanNewComponent } from './five-year-plan-new/five-year-plan-new.component';
import { FiveYearPlanEditComponent } from './five-year-plan-edit/five-year-plan-edit.component';
import { FiveYearPlanListComponent } from './five-year-plan-list/five-year-plan-list.component';
import { FiveYearPlanViewComponent } from './five-year-plan-view/five-year-plan-view.component';

const routes: Routes = [
  {
    path: '',
    component: FiveYearPlanListComponent,
    canActivate: [FiveYearPlanGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: FiveYearPlanNewComponent,
    canActivate: [FiveYearPlanGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: FiveYearPlanEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: FiveYearPlanListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: FiveYearPlanViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class FiveYearPlanRoutingModule {
}
