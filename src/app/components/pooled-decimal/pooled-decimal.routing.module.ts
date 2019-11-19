
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PooledDecimalComponent } from './pooled-decimal.component';


const routes: Routes = [
  {
    path: '',
    component: PooledDecimalComponent,
  },
  
{
    path: 'extension-insurance-policy-data', loadChildren: './components/extension-insurance-policy-data/extension-insurance-policy-data.module#ExtensionInsurancePolicyDataModule',
    data: {
      moduleName: 'ExtensionInsurancePolicyData'
    },
},

{
    path: 'insurance-companies-codes', loadChildren: './components/insurance-companies-codes/insurance-companies-codes.module#InsuranceCompaniesCodesModule',
    data: {
      moduleName: 'InsuranceCompaniesCodes'
    },
},

{
    path: 'insurance-policy-data', loadChildren: './components/insurance-policy-data/insurance-policy-data.module#InsurancePolicyDataModule',
    data: {
      moduleName: 'InsurancePolicyData'
    },
},

{
    path: 'registration-of-schools-in-the-insurance-company', loadChildren: './components/registration-of-schools-in-the-insurance-company/registration-of-schools-in-the-insurance-company.module#RegistrationOfSchoolsInTheInsuranceCompanyModule',
    data: {
      moduleName: 'RegistrationOfSchoolsInTheInsuranceCompany'
    },
},

{
    path: 'schools-do-not-need-insurance', loadChildren: './components/schools-do-not-need-insurance/schools-do-not-need-insurance.module#SchoolsDoNotNeedInsuranceModule',
    data: {
      moduleName: 'SchoolsDoNotNeedInsurance'
    },
},

{
    path: 'employee-performance-evaluation', loadChildren: './components/employee-performance-evaluation/employee-performance-evaluation.module#EmployeePerformanceEvaluationModule',
    data: {
      moduleName: 'EmployeePerformanceEvaluation'
    },
},

{
    path: 'complete-insurance-data-on-a-school', loadChildren: './components/complete-insurance-data-on-a-school/complete-insurance-data-on-a-school.module#CompleteInsuranceDataOnASchoolModule',
    data: {
      moduleName: 'CompleteInsuranceDataOnASchool'
    },
},

{
    path: 'schools-currently-extracting-insurance', loadChildren: './components/schools-currently-extracting-insurance/schools-currently-extracting-insurance.module#SchoolsCurrentlyExtractingInsuranceModule',
    data: {
      moduleName: 'SchoolsCurrentlyExtractingInsurance'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PooledDecimalRoutingModule {
}

