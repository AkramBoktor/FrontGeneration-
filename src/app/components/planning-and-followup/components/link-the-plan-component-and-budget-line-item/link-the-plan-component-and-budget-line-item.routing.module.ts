import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LinkThePlanComponentAndBudgetLineItemGuard } from './shared/link-the-plan-component-and-budget-line-item.guard';
import { LinkThePlanComponentAndBudgetLineItemNewComponent } from './link-the-plan-component-and-budget-line-item-new/link-the-plan-component-and-budget-line-item-new.component';
import { LinkThePlanComponentAndBudgetLineItemEditComponent } from './link-the-plan-component-and-budget-line-item-edit/link-the-plan-component-and-budget-line-item-edit.component';
import { LinkThePlanComponentAndBudgetLineItemListComponent } from './link-the-plan-component-and-budget-line-item-list/link-the-plan-component-and-budget-line-item-list.component';
import { LinkThePlanComponentAndBudgetLineItemViewComponent } from './link-the-plan-component-and-budget-line-item-view/link-the-plan-component-and-budget-line-item-view.component';

const routes: Routes = [
  {
    path: '',
    component: LinkThePlanComponentAndBudgetLineItemListComponent,
    canActivate: [LinkThePlanComponentAndBudgetLineItemGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: LinkThePlanComponentAndBudgetLineItemNewComponent,
    canActivate: [LinkThePlanComponentAndBudgetLineItemGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: LinkThePlanComponentAndBudgetLineItemEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: LinkThePlanComponentAndBudgetLineItemListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: LinkThePlanComponentAndBudgetLineItemViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LinkThePlanComponentAndBudgetLineItemRoutingModule {
}
