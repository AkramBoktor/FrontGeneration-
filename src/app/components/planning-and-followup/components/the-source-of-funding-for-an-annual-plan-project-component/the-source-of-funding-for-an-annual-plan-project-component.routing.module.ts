import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TheSourceOfFundingForAnAnnualPlanProjectComponentGuard } from './shared/the-source-of-funding-for-an-annual-plan-project-component.guard';
import { TheSourceOfFundingForAnAnnualPlanProjectComponentNewComponent } from './the-source-of-funding-for-an-annual-plan-project-component-new/the-source-of-funding-for-an-annual-plan-project-component-new.component';
import { TheSourceOfFundingForAnAnnualPlanProjectComponentEditComponent } from './the-source-of-funding-for-an-annual-plan-project-component-edit/the-source-of-funding-for-an-annual-plan-project-component-edit.component';
import { TheSourceOfFundingForAnAnnualPlanProjectComponentListComponent } from './the-source-of-funding-for-an-annual-plan-project-component-list/the-source-of-funding-for-an-annual-plan-project-component-list.component';
import { TheSourceOfFundingForAnAnnualPlanProjectComponentViewComponent } from './the-source-of-funding-for-an-annual-plan-project-component-view/the-source-of-funding-for-an-annual-plan-project-component-view.component';

const routes: Routes = [
  {
    path: '',
    component: TheSourceOfFundingForAnAnnualPlanProjectComponentListComponent,
    canActivate: [TheSourceOfFundingForAnAnnualPlanProjectComponentGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TheSourceOfFundingForAnAnnualPlanProjectComponentNewComponent,
    canActivate: [TheSourceOfFundingForAnAnnualPlanProjectComponentGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TheSourceOfFundingForAnAnnualPlanProjectComponentEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TheSourceOfFundingForAnAnnualPlanProjectComponentListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TheSourceOfFundingForAnAnnualPlanProjectComponentViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TheSourceOfFundingForAnAnnualPlanProjectComponentRoutingModule {
}
