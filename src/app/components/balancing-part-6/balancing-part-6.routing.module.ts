
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BalancingPart6Component } from './balancing-part-6.component';


const routes: Routes = [
  {
    path: '',
    component: BalancingPart6Component,
  },
  
{
    path: 'credits-for-regions', loadChildren: './components/credits-for-regions/credits-for-regions.module#CreditsForRegionsModule',
    data: {
      moduleName: 'CreditsForRegions'
    },
},

{
    path: 'exchange-form', loadChildren: './components/exchange-form/exchange-form.module#ExchangeFormModule',
    data: {
      moduleName: 'ExchangeForm'
    },
},

{
    path: 'financing-portfolios-received-from-a-funding-source', loadChildren: './components/financing-portfolios-received-from-a-funding-source/financing-portfolios-received-from-a-funding-source.module#FinancingPortfoliosReceivedFromAFundingSourceModule',
    data: {
      moduleName: 'FinancingPortfoliosReceivedFromAFundingSource'
    },
},

{
    path: 'funds-from-a-funding-source', loadChildren: './components/funds-from-a-funding-source/funds-from-a-funding-source.module#FundsFromAFundingSourceModule',
    data: {
      moduleName: 'FundsFromAFundingSource'
    },
},

{
    path: 'insert-new-expenses-for-regional-financial-portfolios', loadChildren: './components/insert-new-expenses-for-regional-financial-portfolios/insert-new-expenses-for-regional-financial-portfolios.module#InsertNewExpensesForRegionalFinancialPortfoliosModule',
    data: {
      moduleName: 'InsertNewExpensesForRegionalFinancialPortfolios'
    },
},

{
    path: 'record-the-claim-form-with-the-exchange-item', loadChildren: './components/record-the-claim-form-with-the-exchange-item/record-the-claim-form-with-the-exchange-item.module#RecordTheClaimFormWithTheExchangeItemModule',
    data: {
      moduleName: 'RecordTheClaimFormWithTheExchangeItem'
    },
},

{
    path: 'total-outgoing', loadChildren: './components/total-outgoing/total-outgoing.module#TotalOutgoingModule',
    data: {
      moduleName: 'TotalOutgoing'
    },
},

{
    path: 'cash-form-allowance', loadChildren: './components/cash-form-allowance/cash-form-allowance.module#CashFormAllowanceModule',
    data: {
      moduleName: 'CashFormAllowance'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BalancingPart6RoutingModule {
}

