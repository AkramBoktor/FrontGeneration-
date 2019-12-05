import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundBGuard } from './shared/termination-of-the-participation-of-an-employee-in-the-fund-b.guard';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundBNewComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-b-new/termination-of-the-participation-of-an-employee-in-the-fund-b-new.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundBEditComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-b-edit/termination-of-the-participation-of-an-employee-in-the-fund-b-edit.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundBListComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-b-list/termination-of-the-participation-of-an-employee-in-the-fund-b-list.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundBViewComponent } from './termination-of-the-participation-of-an-employee-in-the-fund-b-view/termination-of-the-participation-of-an-employee-in-the-fund-b-view.component';

const routes: Routes = [
  {
    path: '',
    component: TerminationOfTheParticipationOfAnEmployeeInTheFundBListComponent,
    canActivate: [TerminationOfTheParticipationOfAnEmployeeInTheFundBGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TerminationOfTheParticipationOfAnEmployeeInTheFundBNewComponent,
    canActivate: [TerminationOfTheParticipationOfAnEmployeeInTheFundBGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TerminationOfTheParticipationOfAnEmployeeInTheFundBEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TerminationOfTheParticipationOfAnEmployeeInTheFundBListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TerminationOfTheParticipationOfAnEmployeeInTheFundBViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TerminationOfTheParticipationOfAnEmployeeInTheFundBRoutingModule {
}
