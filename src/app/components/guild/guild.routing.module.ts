
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { GuildComponent } from './guild.component';


const routes: Routes = [
  {
    path: '',
    component: GuildComponent,
  },
  
{
    path: 'benefits-for-the-heirs-of-an-employee', loadChildren: './components/benefits-for-the-heirs-of-an-employee/benefits-for-the-heirs-of-an-employee.module#BenefitsForTheHeirsOfAnEmployeeModule',
    data: {
      moduleName: 'BenefitsForTheHeirsOfAnEmployee'
    },
},

{
    path: 'bill-telephone-lines', loadChildren: './components/bill-telephone-lines/bill-telephone-lines.module#BillTelephoneLinesModule',
    data: {
      moduleName: 'BillTelephoneLines'
    },
},

{
    path: 'registering-the-payment-of-statistics-to-its-own-authority', loadChildren: './components/registering-the-payment-of-statistics-to-its-own-authority/registering-the-payment-of-statistics-to-its-own-authority.module#RegisteringThePaymentOfStatisticsToItsOwnAuthorityModule',
    data: {
      moduleName: 'RegisteringThePaymentOfStatisticsToItsOwnAuthority'
    },
},

{
    path: 'social-welfare-for-the-heirs-of-an-employee', loadChildren: './components/social-welfare-for-the-heirs-of-an-employee/social-welfare-for-the-heirs-of-an-employee.module#SocialWelfareForTheHeirsOfAnEmployeeModule',
    data: {
      moduleName: 'SocialWelfareForTheHeirsOfAnEmployee'
    },
},

{
    path: 'subscriber-data', loadChildren: './components/subscriber-data/subscriber-data.module#SubscriberDataModule',
    data: {
      moduleName: 'SubscriberData'
    },
},

{
    path: 'supply', loadChildren: './components/supply/supply.module#SupplyModule',
    data: {
      moduleName: 'Supply'
    },
},

{
    path: 'employee-benefits-after-cashing-a-check', loadChildren: './components/employee-benefits-after-cashing-a-check/employee-benefits-after-cashing-a-check.module#EmployeeBenefitsAfterCashingACheckModule',
    data: {
      moduleName: 'EmployeeBenefitsAfterCashingACheck'
    },
},

{
    path: 'employee-benefits-not-loaded-on-a-check', loadChildren: './components/employee-benefits-not-loaded-on-a-check/employee-benefits-not-loaded-on-a-check.module#EmployeeBenefitsNotLoadedOnACheckModule',
    data: {
      moduleName: 'EmployeeBenefitsNotLoadedOnACheck'
    },
},

{
    path: 'entering-withdrawal-and-deposit-amounts', loadChildren: './components/entering-withdrawal-and-deposit-amounts/entering-withdrawal-and-deposit-amounts.module#EnteringWithdrawalAndDepositAmountsModule',
    data: {
      moduleName: 'EnteringWithdrawalAndDepositAmounts'
    },
},

{
    path: 'etisalat-billing-account', loadChildren: './components/etisalat-billing-account/etisalat-billing-account.module#EtisalatBillingAccountModule',
    data: {
      moduleName: 'EtisalatBillingAccount'
    },
},

{
    path: 'fund-statistics', loadChildren: './components/fund-statistics/fund-statistics.module#FundStatisticsModule',
    data: {
      moduleName: 'FundStatistics'
    },
},

{
    path: 'register-a-new-collection-code', loadChildren: './components/register-a-new-collection-code/register-a-new-collection-code.module#RegisterANewCollectionCodeModule',
    data: {
      moduleName: 'RegisterANewCollectionCode'
    },
},

{
    path: 'register-a-new-destination-code', loadChildren: './components/register-a-new-destination-code/register-a-new-destination-code.module#RegisterANewDestinationCodeModule',
    data: {
      moduleName: 'RegisterANewDestinationCode'
    },
},

{
    path: 'register-a-new-subsidy-code', loadChildren: './components/register-a-new-subsidy-code/register-a-new-subsidy-code.module#RegisterANewSubsidyCodeModule',
    data: {
      moduleName: 'RegisterANewSubsidyCode'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class GuildRoutingModule {
}

