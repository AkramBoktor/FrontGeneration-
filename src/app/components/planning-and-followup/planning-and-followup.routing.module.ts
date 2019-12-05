
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PlanningAndFollowupComponent } from './planning-and-followup.component';


const routes: Routes = [
  {
    path: '',
    component: PlanningAndFollowupComponent,
  },
{
    path: 'annual-plan-2', loadChildren: './components/annual-plan-2/annual-plan-2.module#AnnualPlan2Module',
    data: {
      moduleName: 'AnnualPlan2'
    },
},

{
    path: 'draft-annual-plan', loadChildren: './components/draft-annual-plan/draft-annual-plan.module#DraftAnnualPlanModule',
    data: {
      moduleName: 'DraftAnnualPlan'
    },
},

{
    path: 'the-source-of-funding-for-an-annual-plan-project-component', loadChildren: './components/the-source-of-funding-for-an-annual-plan-project-component/the-source-of-funding-for-an-annual-plan-project-component.module#TheSourceOfFundingForAnAnnualPlanProjectComponentModule',
    data: {
      moduleName: 'TheSourceOfFundingForAnAnnualPlanProjectComponent'
    },
},

{
    path: 'draft-five-year-plan', loadChildren: './components/draft-five-year-plan/draft-five-year-plan.module#DraftFiveYearPlanModule',
    data: {
      moduleName: 'DraftFiveYearPlan'
    },
},

{
    path: 'five-year-plan', loadChildren: './components/five-year-plan/five-year-plan.module#FiveYearPlanModule',
    data: {
      moduleName: 'FiveYearPlan'
    },
},

{
    path: 'followup-data-on-the-sale-of-land', loadChildren: './components/followup-data-on-the-sale-of-land/followup-data-on-the-sale-of-land.module#FollowupDataOnTheSaleOfLandModule',
    data: {
      moduleName: 'FollowupDataOnTheSaleOfLand'
    },
},

{
    path: 'funding-source', loadChildren: './components/funding-source/funding-source.module#FundingSourceModule',
    data: {
      moduleName: 'FundingSource'
    },
},

{
    path: 'general-department-of-the-plan-and-followup', loadChildren: './components/general-department-of-the-plan-and-followup/general-department-of-the-plan-and-followup.module#GeneralDepartmentOfThePlanAndFollowupModule',
    data: {
      moduleName: 'GeneralDepartmentOfThePlanAndFollowup'
    },
},

{
    path: 'link-the-plan-component-and-budget-line-item', loadChildren: './components/link-the-plan-component-and-budget-line-item/link-the-plan-component-and-budget-line-item.module#LinkThePlanComponentAndBudgetLineItemModule',
    data: {
      moduleName: 'LinkThePlanComponentAndBudgetLineItem'
    },
},

{
    path: 'link-the-plan-source-to-the-budget-source', loadChildren: './components/link-the-plan-source-to-the-budget-source/link-the-plan-source-to-the-budget-source.module#LinkThePlanSourceToTheBudgetSourceModule',
    data: {
      moduleName: 'LinkThePlanSourceToTheBudgetSource'
    },
},

{
    path: 'source-code', loadChildren: './components/source-code/source-code.module#SourceCodeModule',
    data: {
      moduleName: 'SourceCode'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PlanningAndFollowupRoutingModule {
}

