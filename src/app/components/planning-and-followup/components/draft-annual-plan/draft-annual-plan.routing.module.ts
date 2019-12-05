import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DraftAnnualPlanGuard } from './shared/draft-annual-plan.guard';
import { DraftAnnualPlanNewComponent } from './draft-annual-plan-new/draft-annual-plan-new.component';
import { DraftAnnualPlanEditComponent } from './draft-annual-plan-edit/draft-annual-plan-edit.component';
import { DraftAnnualPlanListComponent } from './draft-annual-plan-list/draft-annual-plan-list.component';
import { DraftAnnualPlanViewComponent } from './draft-annual-plan-view/draft-annual-plan-view.component';

const routes: Routes = [
  {
    path: '',
    component: DraftAnnualPlanListComponent,
    canActivate: [DraftAnnualPlanGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DraftAnnualPlanNewComponent,
    canActivate: [DraftAnnualPlanGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DraftAnnualPlanEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DraftAnnualPlanListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DraftAnnualPlanViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DraftAnnualPlanRoutingModule {
}
