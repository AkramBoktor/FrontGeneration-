import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EmployeeBenefitsNotLoadedOnACheckGuard } from './shared/employee-benefits-not-loaded-on-a-check.guard';
import { EmployeeBenefitsNotLoadedOnACheckNewComponent } from './employee-benefits-not-loaded-on-a-check-new/employee-benefits-not-loaded-on-a-check-new.component';
import { EmployeeBenefitsNotLoadedOnACheckEditComponent } from './employee-benefits-not-loaded-on-a-check-edit/employee-benefits-not-loaded-on-a-check-edit.component';
import { EmployeeBenefitsNotLoadedOnACheckListComponent } from './employee-benefits-not-loaded-on-a-check-list/employee-benefits-not-loaded-on-a-check-list.component';
import { EmployeeBenefitsNotLoadedOnACheckViewComponent } from './employee-benefits-not-loaded-on-a-check-view/employee-benefits-not-loaded-on-a-check-view.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeBenefitsNotLoadedOnACheckListComponent,
    canActivate: [EmployeeBenefitsNotLoadedOnACheckGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EmployeeBenefitsNotLoadedOnACheckNewComponent,
    canActivate: [EmployeeBenefitsNotLoadedOnACheckGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EmployeeBenefitsNotLoadedOnACheckEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EmployeeBenefitsNotLoadedOnACheckListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EmployeeBenefitsNotLoadedOnACheckViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EmployeeBenefitsNotLoadedOnACheckRoutingModule {
}
