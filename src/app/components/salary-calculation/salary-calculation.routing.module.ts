
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SalaryCalculationComponent } from './salary-calculation.component';


const routes: Routes = [
  {
    path: '',
    component: SalaryCalculationComponent,
  },
 
  {
    path: 'bonus-5-7', loadChildren: './components/bonus-5-7/bonus-5-7.module#Bonus57Module',
    data: {
      moduleName: 'Bonus57'
    },
},

{
    path: 'electronic-payment-form', loadChildren: './components/electronic-payment-form/electronic-payment-form.module#ElectronicPaymentFormModule',
    data: {
      moduleName: 'ElectronicPaymentForm'
    },
},

{
    path: 'employee-bonus', loadChildren: './components/employee-bonus/employee-bonus.module#EmployeeBonusModule',
    data: {
      moduleName: 'EmployeeBonus'
    },
},

{
    path: 'promotional-bonus', loadChildren: './components/promotional-bonus/promotional-bonus.module#PromotionalBonusModule',
    data: {
      moduleName: 'PromotionalBonus'
    },
},

{
    path: 'record-variable-corrections-for-employees', loadChildren: './components/record-variable-corrections-for-employees/record-variable-corrections-for-employees.module#RecordVariableCorrectionsForEmployeesModule',
    data: {
      moduleName: 'RecordVariableCorrectionsForEmployees'
    },
},

{
    path: 'recording-correction-of-pay', loadChildren: './components/recording-correction-of-pay/recording-correction-of-pay.module#RecordingCorrectionOfPayModule',
    data: {
      moduleName: 'RecordingCorrectionOfPay'
    },
},

{
    path: 'recording-employee-debt-values', loadChildren: './components/recording-employee-debt-values/recording-employee-debt-values.module#RecordingEmployeeDebtValuesModule',
    data: {
      moduleName: 'RecordingEmployeeDebtValues'
    },
},

{
    path: 'abstract-salary', loadChildren: './components/abstract-salary/abstract-salary.module#AbstractSalaryModule',
    data: {
      moduleName: 'AbstractSalary'
    },
},

{
    path: 'allowance', loadChildren: './components/allowance/allowance.module#AllowanceModule',
    data: {
      moduleName: 'Allowance'
    },
},

{
    path: 'bank-salary', loadChildren: './components/bank-salary/bank-salary.module#BankSalaryModule',
    data: {
      moduleName: 'BankSalary'
    },
},

{
    path: 'bonus-5-7', loadChildren: './components/bonus-5-7/bonus-5-7.module#Bonus57Module',
    data: {
      moduleName: 'Bonus57'
    },
},

{
    path: 'electronic-payment-form', loadChildren: './components/electronic-payment-form/electronic-payment-form.module#ElectronicPaymentFormModule',
    data: {
      moduleName: 'ElectronicPaymentForm'
    },
},

{
    path: 'employee-bonus', loadChildren: './components/employee-bonus/employee-bonus.module#EmployeeBonusModule',
    data: {
      moduleName: 'EmployeeBonus'
    },
},

{
    path: 'promotional-bonus', loadChildren: './components/promotional-bonus/promotional-bonus.module#PromotionalBonusModule',
    data: {
      moduleName: 'PromotionalBonus'
    },
},

{
    path: 'record-variable-corrections-for-employees', loadChildren: './components/record-variable-corrections-for-employees/record-variable-corrections-for-employees.module#RecordVariableCorrectionsForEmployeesModule',
    data: {
      moduleName: 'RecordVariableCorrectionsForEmployees'
    },
},

{
    path: 'recording-correction-of-pay', loadChildren: './components/recording-correction-of-pay/recording-correction-of-pay.module#RecordingCorrectionOfPayModule',
    data: {
      moduleName: 'RecordingCorrectionOfPay'
    },
},

{
    path: 'recording-employee-debt-values', loadChildren: './components/recording-employee-debt-values/recording-employee-debt-values.module#RecordingEmployeeDebtValuesModule',
    data: {
      moduleName: 'RecordingEmployeeDebtValues'
    },
},

{
    path: 'abstract-salary', loadChildren: './components/abstract-salary/abstract-salary.module#AbstractSalaryModule',
    data: {
      moduleName: 'AbstractSalary'
    },
},

{
    path: 'allowance', loadChildren: './components/allowance/allowance.module#AllowanceModule',
    data: {
      moduleName: 'Allowance'
    },
},

{
    path: 'bank-salary', loadChildren: './components/bank-salary/bank-salary.module#BankSalaryModule',
    data: {
      moduleName: 'BankSalary'
    },
},


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SalaryCalculationRoutingModule {
}

