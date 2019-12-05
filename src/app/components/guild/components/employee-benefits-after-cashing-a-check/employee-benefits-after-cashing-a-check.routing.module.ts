import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EmployeeBenefitsAfterCashingACheckGuard } from './shared/employee-benefits-after-cashing-a-check.guard';
import { EmployeeBenefitsAfterCashingACheckNewComponent } from './employee-benefits-after-cashing-a-check-new/employee-benefits-after-cashing-a-check-new.component';
import { EmployeeBenefitsAfterCashingACheckEditComponent } from './employee-benefits-after-cashing-a-check-edit/employee-benefits-after-cashing-a-check-edit.component';
import { EmployeeBenefitsAfterCashingACheckListComponent } from './employee-benefits-after-cashing-a-check-list/employee-benefits-after-cashing-a-check-list.component';
import { EmployeeBenefitsAfterCashingACheckViewComponent } from './employee-benefits-after-cashing-a-check-view/employee-benefits-after-cashing-a-check-view.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeBenefitsAfterCashingACheckListComponent,
    canActivate: [EmployeeBenefitsAfterCashingACheckGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EmployeeBenefitsAfterCashingACheckNewComponent,
    canActivate: [EmployeeBenefitsAfterCashingACheckGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EmployeeBenefitsAfterCashingACheckEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EmployeeBenefitsAfterCashingACheckListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EmployeeBenefitsAfterCashingACheckViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EmployeeBenefitsAfterCashingACheckRoutingModule {
}
