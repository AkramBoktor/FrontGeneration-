import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ContributionOfTheFundForPreviousYearsBGuard } from './shared/contribution-of-the-fund-for-previous-years-b.guard';
import { ContributionOfTheFundForPreviousYearsBNewComponent } from './contribution-of-the-fund-for-previous-years-b-new/contribution-of-the-fund-for-previous-years-b-new.component';
import { ContributionOfTheFundForPreviousYearsBEditComponent } from './contribution-of-the-fund-for-previous-years-b-edit/contribution-of-the-fund-for-previous-years-b-edit.component';
import { ContributionOfTheFundForPreviousYearsBListComponent } from './contribution-of-the-fund-for-previous-years-b-list/contribution-of-the-fund-for-previous-years-b-list.component';
import { ContributionOfTheFundForPreviousYearsBViewComponent } from './contribution-of-the-fund-for-previous-years-b-view/contribution-of-the-fund-for-previous-years-b-view.component';

const routes: Routes = [
  {
    path: '',
    component: ContributionOfTheFundForPreviousYearsBListComponent,
    canActivate: [ContributionOfTheFundForPreviousYearsBGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ContributionOfTheFundForPreviousYearsBNewComponent,
    canActivate: [ContributionOfTheFundForPreviousYearsBGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ContributionOfTheFundForPreviousYearsBEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ContributionOfTheFundForPreviousYearsBListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ContributionOfTheFundForPreviousYearsBViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ContributionOfTheFundForPreviousYearsBRoutingModule {
}
