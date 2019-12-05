import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundGGuard } from './shared/termination-of-the-participation-of-an-employee-in-the-fund-g.guard';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundGNewComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-g-new/termination-of-the-participation-of-an-employee-in-the-fund-g-new.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundGEditComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-g-edit/termination-of-the-participation-of-an-employee-in-the-fund-g-edit.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundGListComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-g-list/termination-of-the-participation-of-an-employee-in-the-fund-g-list.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundGViewComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-g-view/termination-of-the-participation-of-an-employee-in-the-fund-g-view.component';

const routes: Routes = [
  {
    path: '',
    component: TerminationOfTheParticipationOfAnEmployeeInTheFundGListComponent,
    canActivate: [TerminationOfTheParticipationOfAnEmployeeInTheFundGGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TerminationOfTheParticipationOfAnEmployeeInTheFundGNewComponent,
    canActivate: [TerminationOfTheParticipationOfAnEmployeeInTheFundGGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TerminationOfTheParticipationOfAnEmployeeInTheFundGEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TerminationOfTheParticipationOfAnEmployeeInTheFundGListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TerminationOfTheParticipationOfAnEmployeeInTheFundGViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TerminationOfTheParticipationOfAnEmployeeInTheFundGRoutingModule {
}
