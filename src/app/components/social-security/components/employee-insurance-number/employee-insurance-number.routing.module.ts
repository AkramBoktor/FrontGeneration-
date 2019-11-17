import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EmployeeInsuranceNumberGuard } from './shared/employee-insurance-number.guard';
import { EmployeeInsuranceNumberNewComponent } from './employee-insurance-number-new/employee-insurance-number-new.component';
import { EmployeeInsuranceNumberEditComponent } from './employee-insurance-number-edit/employee-insurance-number-edit.component';
import { EmployeeInsuranceNumberListComponent } from './employee-insurance-number-list/employee-insurance-number-list.component';
import { EmployeeInsuranceNumberViewComponent } from './employee-insurance-number-view/employee-insurance-number-view.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeInsuranceNumberListComponent,
    canActivate: [EmployeeInsuranceNumberGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EmployeeInsuranceNumberNewComponent,
    canActivate: [EmployeeInsuranceNumberGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EmployeeInsuranceNumberEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EmployeeInsuranceNumberListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EmployeeInsuranceNumberViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EmployeeInsuranceNumberRoutingModule {
}
