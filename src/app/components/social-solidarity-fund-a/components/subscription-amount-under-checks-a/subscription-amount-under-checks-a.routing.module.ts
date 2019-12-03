import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SubscriptionAmountUnderChecksAGuard } from './shared/subscription-amount-under-checks-a.guard';
import { SubscriptionAmountUnderChecksANewComponent } from './subscription-amount-under-checks-a-new/subscription-amount-under-checks-a-new.component';
import { SubscriptionAmountUnderChecksAEditComponent } from './subscription-amount-under-checks-a-edit/subscription-amount-under-checks-a-edit.component';
import { SubscriptionAmountUnderChecksAListComponent } from './subscription-amount-under-checks-a-list/subscription-amount-under-checks-a-list.component';
import { SubscriptionAmountUnderChecksAViewComponent } from './subscription-amount-under-checks-a-view/subscription-amount-under-checks-a-view.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionAmountUnderChecksAListComponent,
    canActivate: [SubscriptionAmountUnderChecksAGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SubscriptionAmountUnderChecksANewComponent,
    canActivate: [SubscriptionAmountUnderChecksAGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SubscriptionAmountUnderChecksAEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SubscriptionAmountUnderChecksAListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SubscriptionAmountUnderChecksAViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SubscriptionAmountUnderChecksARoutingModule {
}
