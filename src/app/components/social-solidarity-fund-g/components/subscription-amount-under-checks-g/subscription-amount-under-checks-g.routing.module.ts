import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SubscriptionAmountUnderChecksGGuard } from './shared/subscription-amount-under-checks-g.guard';
import { SubscriptionAmountUnderChecksGNewComponent } from './subscription-amount-under-checks-g-new/subscription-amount-under-checks-g-new.component';
import { SubscriptionAmountUnderChecksGEditComponent } from './subscription-amount-under-checks-g-edit/subscription-amount-under-checks-g-edit.component';
import { SubscriptionAmountUnderChecksGListComponent } from './subscription-amount-under-checks-g-list/subscription-amount-under-checks-g-list.component';
import { SubscriptionAmountUnderChecksGViewComponent } from './subscription-amount-under-checks-g-view/subscription-amount-under-checks-g-view.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionAmountUnderChecksGListComponent,
    canActivate: [SubscriptionAmountUnderChecksGGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SubscriptionAmountUnderChecksGNewComponent,
    canActivate: [SubscriptionAmountUnderChecksGGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SubscriptionAmountUnderChecksGEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SubscriptionAmountUnderChecksGListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SubscriptionAmountUnderChecksGViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SubscriptionAmountUnderChecksGRoutingModule {
}
