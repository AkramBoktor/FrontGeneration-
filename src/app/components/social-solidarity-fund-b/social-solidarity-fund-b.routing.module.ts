
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SocialSolidarityFundBComponent } from './social-solidarity-fund-b.component';


const routes: Routes = [
  {
    path: '',
    component: SocialSolidarityFundBComponent,
  },
		
	{
		path: 'deduction-of-an-amount-to-an-employee-of-the-fund-b', loadChildren: './components/deduction-of-an-amount-to-an-employee-of-the-fund-b/deduction-of-an-amount-to-an-employee-of-the-fund-b.module#DeductionOfAnAmountToAnEmployeeOfTheFundBModule',
		data: {
		  moduleName: 'DeductionOfAnAmountToAnEmployeeOfTheFundB'
		},
	},

	{
		path: 'subscriber-data-in-fund-b', loadChildren: './components/subscriber-data-in-fund-b/subscriber-data-in-fund-b.module#SubscriberDataInFundBModule',
		data: {
		  moduleName: 'SubscriberDataInFundB'
		},
	},

	{
		path: 'subscription-amount-under-checks-b', loadChildren: './components/subscription-amount-under-checks-b/subscription-amount-under-checks-b.module#SubscriptionAmountUnderChecksBModule',
		data: {
		  moduleName: 'SubscriptionAmountUnderChecksB'
		},
	},

	{
		path: 'subscription-value-by-age-b', loadChildren: './components/subscription-value-by-age-b/subscription-value-by-age-b.module#SubscriptionValueByAgeBModule',
		data: {
		  moduleName: 'SubscriptionValueByAgeB'
		},
	},

	{
		path: 'termination-of-the-participation-of-an-employee-in-the-fund-b', loadChildren: './components/termination-of-the-participation-of-an-employee-in-the-fund-b/termination-of-the-participation-of-an-employee-in-the-fund-b.module#TerminationOfTheParticipationOfAnEmployeeInTheFundBModule',
		data: {
		  moduleName: 'TerminationOfTheParticipationOfAnEmployeeInTheFundB'
		},
	},

	{
		path: 'contribution-of-the-fund-for-previous-years-b', loadChildren: './components/contribution-of-the-fund-for-previous-years-b/contribution-of-the-fund-for-previous-years-b.module#ContributionOfTheFundForPreviousYearsBModule',
		data: {
		  moduleName: 'ContributionOfTheFundForPreviousYearsB'
		},
	},

	{
		path: 'end-of-a-special-vacation-for-employee-b', loadChildren: './components/end-of-a-special-vacation-for-employee-b/end-of-a-special-vacation-for-employee-b.module#EndOfASpecialVacationForEmployeeBModule',
		data: {
		  moduleName: 'EndOfASpecialVacationForEmployeeB'
		},
	},

	{
		path: 'data-to-take-special-leave-for-employee-b', loadChildren: './components/data-to-take-special-leave-for-employee-b/data-to-take-special-leave-for-employee-b.module#DataToTakeSpecialLeaveForEmployeeBModule',
		data: {
		  moduleName: 'DataToTakeSpecialLeaveForEmployeeB'
		},
	}


	

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SocialSolidarityFundBRoutingModule {
}

