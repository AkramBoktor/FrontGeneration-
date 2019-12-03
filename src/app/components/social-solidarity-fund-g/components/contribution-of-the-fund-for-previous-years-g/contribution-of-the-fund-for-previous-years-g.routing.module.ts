import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ContributionOfTheFundForPreviousYearsGGuard } from './shared/contribution-of-the-fund-for-previous-years-g.guard';
import { ContributionOfTheFundForPreviousYearsGNewComponent } from './contribution-of-the-fund-for-previous-years-g-new/contribution-of-the-fund-for-previous-years-g-new.component';
import { ContributionOfTheFundForPreviousYearsGEditComponent } from './contribution-of-the-fund-for-previous-years-g-edit/contribution-of-the-fund-for-previous-years-g-edit.component';
import { ContributionOfTheFundForPreviousYearsGListComponent } from './contribution-of-the-fund-for-previous-years-g-list/contribution-of-the-fund-for-previous-years-g-list.component';
import { ContributionOfTheFundForPreviousYearsGViewComponent } from './contribution-of-the-fund-for-previous-years-g-view/contribution-of-the-fund-for-previous-years-g-view.component';

const routes: Routes = [
  {
    path: '',
    component: ContributionOfTheFundForPreviousYearsGListComponent,
    canActivate: [ContributionOfTheFundForPreviousYearsGGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ContributionOfTheFundForPreviousYearsGNewComponent,
    canActivate: [ContributionOfTheFundForPreviousYearsGGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ContributionOfTheFundForPreviousYearsGEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ContributionOfTheFundForPreviousYearsGListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ContributionOfTheFundForPreviousYearsGViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ContributionOfTheFundForPreviousYearsGRoutingModule {
}
