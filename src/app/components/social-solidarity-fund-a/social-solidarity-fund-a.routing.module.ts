
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SocialSolidarityFundAComponent } from './social-solidarity-fund-a.component';


const routes: Routes = [
  {
    path: '',
    component: SocialSolidarityFundAComponent,
  },
	
	{
		path: 'deduction-of-an-amount-to-an-employee-of-the-fund-a', loadChildren: './components/deduction-of-an-amount-to-an-employee-of-the-fund-a/deduction-of-an-amount-to-an-employee-of-the-fund-a.module#DeductionOfAnAmountToAnEmployeeOfTheFundAModule',
		data: {
		  moduleName: 'DeductionOfAnAmountToAnEmployeeOfTheFundA'
		},
	},

	{
		path: 'subscriber-data-in-fund-a', loadChildren: './components/subscriber-data-in-fund-a/subscriber-data-in-fund-a.module#SubscriberDataInFundAModule',
		data: {
		  moduleName: 'SubscriberDataInFundA'
		},
	},

	{
		path: 'subscription-amount-under-checks-a', loadChildren: './components/subscription-amount-under-checks-a/subscription-amount-under-checks-a.module#SubscriptionAmountUnderChecksAModule',
		data: {
		  moduleName: 'SubscriptionAmountUnderChecksA'
		},
	},

	{
		path: 'subscription-value-by-age-a', loadChildren: './components/subscription-value-by-age-a/subscription-value-by-age-a.module#SubscriptionValueByAgeAModule',
		data: {
		  moduleName: 'SubscriptionValueByAgeA'
		},
	},

	{
		path: 'termination-of-the-participation-of-an-employee-in-the-fund-a', loadChildren: './components/termination-of-the-participation-of-an-employee-in-the-fund-a/termination-of-the-participation-of-an-employee-in-the-fund-a.module#TerminationOfTheParticipationOfAnEmployeeInTheFundAModule',
		data: {
		  moduleName: 'TerminationOfTheParticipationOfAnEmployeeInTheFundA'
		},
	},

	{
		path: 'contribution-of-the-fund-for-previous-years-a', loadChildren: './components/contribution-of-the-fund-for-previous-years-a/contribution-of-the-fund-for-previous-years-a.module#ContributionOfTheFundForPreviousYearsAModule',
		data: {
		  moduleName: 'ContributionOfTheFundForPreviousYearsA'
		},
	},

	{
		path: 'end-of-a-special-vacation-for-employee-a', loadChildren: './components/end-of-a-special-vacation-for-employee-a/end-of-a-special-vacation-for-employee-a.module#EndOfASpecialVacationForEmployeeAModule',
		data: {
		  moduleName: 'EndOfASpecialVacationForEmployeeA'
		},
	},

	{
		path: 'data-to-take-special-leave-for-employee-a', loadChildren: './components/data-to-take-special-leave-for-employee-a/data-to-take-special-leave-for-employee-a.module#DataToTakeSpecialLeaveForEmployeeAModule',
		data: {
		  moduleName: 'DataToTakeSpecialLeaveForEmployeeA'
		},
	}


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SocialSolidarityFundARoutingModule {
}

