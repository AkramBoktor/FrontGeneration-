import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EtisalatBillingAccountGuard } from './shared/etisalat-billing-account.guard';
import { EtisalatBillingAccountNewComponent } from './etisalat-billing-account-new/etisalat-billing-account-new.component';
import { EtisalatBillingAccountEditComponent } from './etisalat-billing-account-edit/etisalat-billing-account-edit.component';
import { EtisalatBillingAccountListComponent } from './etisalat-billing-account-list/etisalat-billing-account-list.component';
import { EtisalatBillingAccountViewComponent } from './etisalat-billing-account-view/etisalat-billing-account-view.component';

const routes: Routes = [
  {
    path: '',
    component: EtisalatBillingAccountListComponent,
    canActivate: [EtisalatBillingAccountGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EtisalatBillingAccountNewComponent,
    canActivate: [EtisalatBillingAccountGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EtisalatBillingAccountEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EtisalatBillingAccountListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EtisalatBillingAccountViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EtisalatBillingAccountRoutingModule {
}
