import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeContractRenewalDataEditComponent } from './employee-contract-renewal-data-edit/employee-contract-renewal-data-edit.component';
import { EmployeeContractRenewalDataListComponent } from './employee-contract-renewal-data-list/employee-contract-renewal-data-list.component';
import { EmployeeContractRenewalDataNewComponent } from './employee-contract-renewal-data-new/employee-contract-renewal-data-new.component';
import { EmployeeContractRenewalDataViewComponent } from './employee-contract-renewal-data-view/employee-contract-renewal-data-view.component';
import { EmployeeContractRenewalDataGuard } from './shared/employee-contract-renewal-data.guard';

const routes: Routes = [
  {
    path: '',
    component: EmployeeContractRenewalDataListComponent,
    canActivate: [EmployeeContractRenewalDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EmployeeContractRenewalDataNewComponent,
    canActivate: [EmployeeContractRenewalDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EmployeeContractRenewalDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EmployeeContractRenewalDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EmployeeContractRenewalDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EmployeeContractRenewalDataRoutingModule {
}
