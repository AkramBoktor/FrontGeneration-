import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RenewalOfContractPeriodForApprovedCompanغGuard } from './shared/renewal-of-contract-period-for-approved-companغ.guard';
import { RenewalOfContractPeriodForApprovedCompanغNewComponent } from './renewal-of-contract-period-for-approved-companغ-new/renewal-of-contract-period-for-approved-companغ-new.component';
import { RenewalOfContractPeriodForApprovedCompanغEditComponent } from './renewal-of-contract-period-for-approved-companغ-edit/renewal-of-contract-period-for-approved-companغ-edit.component';
import { RenewalOfContractPeriodForApprovedCompanغListComponent } from './renewal-of-contract-period-for-approved-companغ-list/renewal-of-contract-period-for-approved-companغ-list.component';
import { RenewalOfContractPeriodForApprovedCompanغViewComponent } from './renewal-of-contract-period-for-approved-companغ-view/renewal-of-contract-period-for-approved-companغ-view.component';

const routes: Routes = [
  {
    path: '',
    component: RenewalOfContractPeriodForApprovedCompanغListComponent,
    canActivate: [RenewalOfContractPeriodForApprovedCompanغGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RenewalOfContractPeriodForApprovedCompanغNewComponent,
    canActivate: [RenewalOfContractPeriodForApprovedCompanغGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RenewalOfContractPeriodForApprovedCompanغEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RenewalOfContractPeriodForApprovedCompanغListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RenewalOfContractPeriodForApprovedCompanغViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RenewalOfContractPeriodForApprovedCompanغRoutingModule {
}
