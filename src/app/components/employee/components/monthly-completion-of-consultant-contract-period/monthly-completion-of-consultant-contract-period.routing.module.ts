import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyCompletionOfConsultantContractPeriodEditComponent } from './monthly-completion-of-consultant-contract-period-edit/monthly-completion-of-consultant-contract-period-edit.component';
import { MonthlyCompletionOfConsultantContractPeriodListComponent } from './monthly-completion-of-consultant-contract-period-list/monthly-completion-of-consultant-contract-period-list.component';
import { MonthlyCompletionOfConsultantContractPeriodNewComponent } from './monthly-completion-of-consultant-contract-period-new/monthly-completion-of-consultant-contract-period-new.component';
import { MonthlyCompletionOfConsultantContractPeriodViewComponent } from './monthly-completion-of-consultant-contract-period-view/monthly-completion-of-consultant-contract-period-view.component';
import { MonthlyCompletionOfConsultantContractPeriodGuard } from './shared/monthly-completion-of-consultant-contract-period.guard';

const routes: Routes = [
  {
    path: '',
    component: MonthlyCompletionOfConsultantContractPeriodListComponent,
    canActivate: [MonthlyCompletionOfConsultantContractPeriodGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: MonthlyCompletionOfConsultantContractPeriodNewComponent,
    canActivate: [MonthlyCompletionOfConsultantContractPeriodGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: MonthlyCompletionOfConsultantContractPeriodEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: MonthlyCompletionOfConsultantContractPeriodListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: MonthlyCompletionOfConsultantContractPeriodViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MonthlyCompletionOfConsultantContractPeriodRoutingModule {
}
