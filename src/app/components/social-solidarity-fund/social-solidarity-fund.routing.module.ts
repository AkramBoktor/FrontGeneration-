
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SocialSolidarityFundComponent } from './social-solidarity-fund.component';


const routes: Routes = [
  {
    path: '',
    component: SocialSolidarityFundComponent,
  },
{
    path: 'deduction-of-amount-to-an-employee-of-the-fund', loadChildren: './components/deduction-of-amount-to-an-employee-of-the-fund/deduction-of-amount-to-an-employee-of-the-fund.module#DeductionOfAmountToAnEmployeeOfTheFundModule',
    data: {
      moduleName: 'DeductionOfAmountToAnEmployeeOfTheFund'
    },
},

{
    path: 'social-solidarity-fund-codes', loadChildren: './components/social-solidarity-fund-codes/social-solidarity-fund-codes.module#SocialSolidarityFundCodesModule',
    data: {
      moduleName: 'SocialSolidarityFundCodes'
    },
},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SocialSolidarityFundRoutingModule {
}

