
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocialSecurityComponent } from './social-security.component';


const routes: Routes = [
  {
    path: '',
    component: SocialSecurityComponent,
  },


{
    path: 'social-security-for-employee-family', loadChildren: './components/social-security-for-employee-family/social-security-for-employee-family.module#SocialSecurityForEmployeeFamilyModule',
    data: {
      moduleName: 'SocialSecurityForEmployeeFamily'
    },
},

{
    path: 'employee-insurance-number', loadChildren: './components/employee-insurance-number/employee-insurance-number.module#EmployeeInsuranceNumberModule',
    data: {
      moduleName: 'EmployeeInsuranceNumber'
    },
},

{
    path: 'organization', loadChildren: './components/organization/organization.module#OrganizationModule',
    data: {
      moduleName: 'Organization'
    },
},

{
    path: 'employee-previous-insurance-data', loadChildren: './components/employee-previous-insurance-data/employee-previous-insurance-data.module#EmployeePreviousInsuranceDataModule',
    data: {
      moduleName: 'EmployeePreviousInsuranceData'
    },
},


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SocialSecurityRoutingModule {
}

