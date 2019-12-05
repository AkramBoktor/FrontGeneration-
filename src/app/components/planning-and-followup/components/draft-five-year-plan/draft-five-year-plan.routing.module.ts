import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DraftFiveYearPlanGuard } from './shared/draft-five-year-plan.guard';
import { DraftFiveYearPlanNewComponent } from './draft-five-year-plan-new/draft-five-year-plan-new.component';
import { DraftFiveYearPlanEditComponent } from './draft-five-year-plan-edit/draft-five-year-plan-edit.component';
import { DraftFiveYearPlanListComponent } from './draft-five-year-plan-list/draft-five-year-plan-list.component';
import { DraftFiveYearPlanViewComponent } from './draft-five-year-plan-view/draft-five-year-plan-view.component';

const routes: Routes = [
  {
    path: '',
    component: DraftFiveYearPlanListComponent,
    canActivate: [DraftFiveYearPlanGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DraftFiveYearPlanNewComponent,
    canActivate: [DraftFiveYearPlanGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DraftFiveYearPlanEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DraftFiveYearPlanListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DraftFiveYearPlanViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DraftFiveYearPlanRoutingModule {
}
