import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SubscriptionAmountUnderChecksBGuard } from './shared/subscription-amount-under-checks-b.guard';
import { SubscriptionAmountUnderChecksBNewComponent } from './subscription-amount-under-checks-b-new/subscription-amount-under-checks-b-new.component';
import { SubscriptionAmountUnderChecksBEditComponent } from './subscription-amount-under-checks-b-edit/subscription-amount-under-checks-b-edit.component';
import { SubscriptionAmountUnderChecksBListComponent } from './subscription-amount-under-checks-b-list/subscription-amount-under-checks-b-list.component';
import { SubscriptionAmountUnderChecksBViewComponent } from './subscription-amount-under-checks-b-view/subscription-amount-under-checks-b-view.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionAmountUnderChecksBListComponent,
    canActivate: [SubscriptionAmountUnderChecksBGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SubscriptionAmountUnderChecksBNewComponent,
    canActivate: [SubscriptionAmountUnderChecksBGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SubscriptionAmountUnderChecksBEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SubscriptionAmountUnderChecksBListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SubscriptionAmountUnderChecksBViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SubscriptionAmountUnderChecksBRoutingModule {
}
