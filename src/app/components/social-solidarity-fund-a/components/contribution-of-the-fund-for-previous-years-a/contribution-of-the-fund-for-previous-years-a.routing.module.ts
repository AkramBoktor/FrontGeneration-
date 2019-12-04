import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ContributionOfTheFundForPreviousYearsAGuard } from './shared/contribution-of-the-fund-for-previous-years-a.guard';
import { ContributionOfTheFundForPreviousYearsANewComponent } from './contribution-of-the-fund-for-previous-years-a-new/contribution-of-the-fund-for-previous-years-a-new.component';
import { ContributionOfTheFundForPreviousYearsAEditComponent } from './contribution-of-the-fund-for-previous-years-a-edit/contribution-of-the-fund-for-previous-years-a-edit.component';
import { ContributionOfTheFundForPreviousYearsAListComponent } from './contribution-of-the-fund-for-previous-years-a-list/contribution-of-the-fund-for-previous-years-a-list.component';
import { ContributionOfTheFundForPreviousYearsAViewComponent } from './contribution-of-the-fund-for-previous-years-a-view/contribution-of-the-fund-for-previous-years-a-view.component';

const routes: Routes = [
  {
    path: '',
    component: ContributionOfTheFundForPreviousYearsAListComponent,
    canActivate: [ContributionOfTheFundForPreviousYearsAGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ContributionOfTheFundForPreviousYearsANewComponent,
    canActivate: [ContributionOfTheFundForPreviousYearsAGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ContributionOfTheFundForPreviousYearsAEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ContributionOfTheFundForPreviousYearsAListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ContributionOfTheFundForPreviousYearsAViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ContributionOfTheFundForPreviousYearsARoutingModule {
}
