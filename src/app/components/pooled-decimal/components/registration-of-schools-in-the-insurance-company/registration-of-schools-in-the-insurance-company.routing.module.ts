import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RegistrationOfSchoolsInTheInsuranceCompanyGuard } from './shared/registration-of-schools-in-the-insurance-company.guard';
import { RegistrationOfSchoolsInTheInsuranceCompanyNewComponent } from './registration-of-schools-in-the-insurance-company-new/registration-of-schools-in-the-insurance-company-new.component';
import { RegistrationOfSchoolsInTheInsuranceCompanyEditComponent } from './registration-of-schools-in-the-insurance-company-edit/registration-of-schools-in-the-insurance-company-edit.component';
import { RegistrationOfSchoolsInTheInsuranceCompanyListComponent } from './registration-of-schools-in-the-insurance-company-list/registration-of-schools-in-the-insurance-company-list.component';
import { RegistrationOfSchoolsInTheInsuranceCompanyViewComponent } from './registration-of-schools-in-the-insurance-company-view/registration-of-schools-in-the-insurance-company-view.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationOfSchoolsInTheInsuranceCompanyListComponent,
    canActivate: [RegistrationOfSchoolsInTheInsuranceCompanyGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RegistrationOfSchoolsInTheInsuranceCompanyNewComponent,
    canActivate: [RegistrationOfSchoolsInTheInsuranceCompanyGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RegistrationOfSchoolsInTheInsuranceCompanyEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RegistrationOfSchoolsInTheInsuranceCompanyListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RegistrationOfSchoolsInTheInsuranceCompanyViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RegistrationOfSchoolsInTheInsuranceCompanyRoutingModule {
}
