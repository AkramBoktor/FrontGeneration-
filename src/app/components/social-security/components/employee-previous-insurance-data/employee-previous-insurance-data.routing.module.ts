import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EmployeePreviousInsuranceDataGuard } from './shared/employee-previous-insurance-data.guard';
import { EmployeePreviousInsuranceDataNewComponent } from './employee-previous-insurance-data-new/employee-previous-insurance-data-new.component';
import { EmployeePreviousInsuranceDataEditComponent } from './employee-previous-insurance-data-edit/employee-previous-insurance-data-edit.component';
import { EmployeePreviousInsuranceDataListComponent } from './employee-previous-insurance-data-list/employee-previous-insurance-data-list.component';
import { EmployeePreviousInsuranceDataViewComponent } from './employee-previous-insurance-data-view/employee-previous-insurance-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeePreviousInsuranceDataListComponent,
    canActivate: [EmployeePreviousInsuranceDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EmployeePreviousInsuranceDataNewComponent,
    canActivate: [EmployeePreviousInsuranceDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EmployeePreviousInsuranceDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EmployeePreviousInsuranceDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EmployeePreviousInsuranceDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EmployeePreviousInsuranceDataRoutingModule {
}
