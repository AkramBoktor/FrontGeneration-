
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SocialSolidarityFundGComponent } from './social-solidarity-fund-g.component';


const routes: Routes = [
  {
    path: '',
    component: SocialSolidarityFundGComponent,
  },

	
	{
		path: 'deduction-of-an-amount-to-an-employee-of-the-fund-g', loadChildren: './components/deduction-of-an-amount-to-an-employee-of-the-fund-g/deduction-of-an-amount-to-an-employee-of-the-fund-g.module#DeductionOfAnAmountToAnEmployeeOfTheFundGModule',
		data: {
		  moduleName: 'DeductionOfAnAmountToAnEmployeeOfTheFundG'
		},
	},

	{
		path: 'subscriber-data-in-fund-g', loadChildren: './components/subscriber-data-in-fund-g/subscriber-data-in-fund-g.module#SubscriberDataInFundGModule',
		data: {
		  moduleName: 'SubscriberDataInFundG'
		},
	},

	{
		path: 'subscription-amount-under-checks-g', loadChildren: './components/subscription-amount-under-checks-g/subscription-amount-under-checks-g.module#SubscriptionAmountUnderChecksGModule',
		data: {
		  moduleName: 'SubscriptionAmountUnderChecksG'
		},
	},

	{
		path: 'subscription-value-by-age-g', loadChildren: './components/subscription-value-by-age-g/subscription-value-by-age-g.module#SubscriptionValueByAgeGModule',
		data: {
		  moduleName: 'SubscriptionValueByAgeG'
		},
	},

	{
		path: 'contribution-of-the-fund-for-previous-years-g', loadChildren: './components/contribution-of-the-fund-for-previous-years-g/contribution-of-the-fund-for-previous-years-g.module#ContributionOfTheFundForPreviousYearsGModule',
		data: {
		  moduleName: 'ContributionOfTheFundForPreviousYearsG'
		},
	},

	{
		path: 'end-of-a-special-vacation-for-employee-g', loadChildren: './components/end-of-a-special-vacation-for-employee-g/end-of-a-special-vacation-for-employee-g.module#EndOfASpecialVacationForEmployeeGModule',
		data: {
		  moduleName: 'EndOfASpecialVacationForEmployeeG'
		},
	},

	{
		path: 'termination-of-the-participation-of-an-employee-in-the-fund-g', loadChildren: './components/termination-of-the-participation-of-an-employee-in-the-fund-g/termination-of-the-participation-of-an-employee-in-the-fund-g.module#TerminationOfTheParticipationOfAnEmployeeInTheFundGModule',
		data: {
		  moduleName: 'TerminationOfTheParticipationOfAnEmployeeInTheFundG'
		},
	},

	{
		path: 'data-to-take-special-leave-for-employee-g', loadChildren: './components/data-to-take-special-leave-for-employee-g/data-to-take-special-leave-for-employee-g.module#DataToTakeSpecialLeaveForEmployeeGModule',
		data: {
		  moduleName: 'DataToTakeSpecialLeaveForEmployeeG'
		},
	}


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SocialSolidarityFundGRoutingModule {
}

