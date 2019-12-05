import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LinkThePlanSourceToTheBudgetSourceGuard } from './shared/link-the-plan-source-to-the-budget-source.guard';
import { LinkThePlanSourceToTheBudgetSourceNewComponent } from './link-the-plan-source-to-the-budget-source-new/link-the-plan-source-to-the-budget-source-new.component';
import { LinkThePlanSourceToTheBudgetSourceEditComponent } from './link-the-plan-source-to-the-budget-source-edit/link-the-plan-source-to-the-budget-source-edit.component';
import { LinkThePlanSourceToTheBudgetSourceListComponent } from './link-the-plan-source-to-the-budget-source-list/link-the-plan-source-to-the-budget-source-list.component';
import { LinkThePlanSourceToTheBudgetSourceViewComponent } from './link-the-plan-source-to-the-budget-source-view/link-the-plan-source-to-the-budget-source-view.component';

const routes: Routes = [
  {
    path: '',
    component: LinkThePlanSourceToTheBudgetSourceListComponent,
    canActivate: [LinkThePlanSourceToTheBudgetSourceGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: LinkThePlanSourceToTheBudgetSourceNewComponent,
    canActivate: [LinkThePlanSourceToTheBudgetSourceGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: LinkThePlanSourceToTheBudgetSourceEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: LinkThePlanSourceToTheBudgetSourceListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: LinkThePlanSourceToTheBudgetSourceViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LinkThePlanSourceToTheBudgetSourceRoutingModule {
}
