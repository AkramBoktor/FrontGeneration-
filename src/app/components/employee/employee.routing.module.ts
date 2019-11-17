
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';


const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
  },


{
    path: 'recruitment', loadChildren: './components/recruitment/recruitment.module#RecruitmentModule',
    data: {
      moduleName: 'Recruitment'
    },
},

{
    path: 'employee-contract-renewal-data', loadChildren: './components/employee-contract-renewal-data/employee-contract-renewal-data.module#EmployeeContractRenewalDataModule',
    data: {
      moduleName: 'EmployeeContractRenewalData'
    },
},

{
    path: 'promotion', loadChildren: './components/promotion/promotion.module#PromotionModule',
    data: {
      moduleName: 'Promotion'
    },
},

{
    path: 'disclaimer', loadChildren: './components/disclaimer/disclaimer.module#DisclaimerModule',
    data: {
      moduleName: 'Disclaimer'
    },
},

{
    path: 'dependent-name', loadChildren: './components/dependent-name/dependent-name.module#DependentNameModule',
    data: {
      moduleName: 'DependentName'
    },
},

{
    path: 'retirement', loadChildren: './components/retirement/retirement.module#RetirementModule',
    data: {
      moduleName: 'Retirement'
    },
},

{
    path: 'incentive-bonus', loadChildren: './components/incentive-bonus/incentive-bonus.module#IncentiveBonusModule',
    data: {
      moduleName: 'IncentiveBonus'
    },
},

{
    path: 'adequacy', loadChildren: './components/adequacy/adequacy.module#AdequacyModule',
    data: {
      moduleName: 'Adequacy'
    },
},

{
    path: 'employee-data', loadChildren: './components/employee-data/employee-data.module#EmployeeDataModule',
    data: {
      moduleName: 'EmployeeData'
    },
},

{
    path: 'transfer-contracted-employee', loadChildren: './components/transfer-contracted-employee/transfer-contracted-employee.module#TransferContractedEmployeeModule',
    data: {
      moduleName: 'TransferContractedEmployee'
    },
},

{
    path: 'contract-termination', loadChildren: './components/contract-termination/contract-termination.module#ContractTerminationModule',
    data: {
      moduleName: 'ContractTermination'
    },
},

{
    path: 'employee-educational-qualifications', loadChildren: './components/employee-educational-qualifications/employee-educational-qualifications.module#EmployeeEducationalQualificationsModule',
    data: {
      moduleName: 'EmployeeEducationalQualifications'
    },
},

{
    path: 'sanctions-fund', loadChildren: './components/sanctions-fund/sanctions-fund.module#SanctionsFundModule',
    data: {
      moduleName: 'SanctionsFund'
    },
},

{
    path: 'employee-status', loadChildren: './components/employee-status/employee-status.module#EmployeeStatusModule',
    data: {
      moduleName: 'EmployeeStatus'
    },
},

{
    path: 'employee-experience', loadChildren: './components/employee-experience/employee-experience.module#EmployeeExperienceModule',
    data: {
      moduleName: 'EmployeeExperience'
    },
},

{
    path: 'monthly-completion-of-consultant-contract-period', loadChildren: './components/monthly-completion-of-consultant-contract-period/monthly-completion-of-consultant-contract-period.module#MonthlyCompletionOfConsultantContractPeriodModule',
    data: {
      moduleName: 'MonthlyCompletionOfConsultantContractPeriod'
    },
},

{
    path: 'financial-disclosure-statement', loadChildren: './components/financial-disclosure-statement/financial-disclosure-statement.module#FinancialDisclosureStatementModule',
    data: {
      moduleName: 'FinancialDisclosureStatement'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EmployeeRoutingModule {
}

