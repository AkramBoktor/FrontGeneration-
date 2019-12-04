import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundAGuard } from './shared/termination-of-the-participation-of-an-employee-in-the-fund-a.guard';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundANewComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-a-new/termination-of-the-participation-of-an-employee-in-the-fund-a-new.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundAEditComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-a-edit/termination-of-the-participation-of-an-employee-in-the-fund-a-edit.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundAListComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-a-list/termination-of-the-participation-of-an-employee-in-the-fund-a-list.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundAViewComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-a-view/termination-of-the-participation-of-an-employee-in-the-fund-a-view.component';

const routes: Routes = [
  {
    path: '',
    component: TerminationOfTheParticipationOfAnEmployeeInTheFundAListComponent,
    canActivate: [TerminationOfTheParticipationOfAnEmployeeInTheFundAGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TerminationOfTheParticipationOfAnEmployeeInTheFundANewComponent,
    canActivate: [TerminationOfTheParticipationOfAnEmployeeInTheFundAGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TerminationOfTheParticipationOfAnEmployeeInTheFundAEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TerminationOfTheParticipationOfAnEmployeeInTheFundAListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TerminationOfTheParticipationOfAnEmployeeInTheFundAViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TerminationOfTheParticipationOfAnEmployeeInTheFundARoutingModule {
}
