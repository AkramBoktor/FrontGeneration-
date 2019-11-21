import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TerminationOfTheEmployeesJobPlacementGuard } from './shared/termination-of-the-employees-job-placement.guard';
import { TerminationOfTheEmployeesJobPlacementNewComponent } from './termination-of-the-employees-job-placement-new/termination-of-the-employees-job-placement-new.component';
import { TerminationOfTheEmployeesJobPlacementEditComponent } from './termination-of-the-employees-job-placement-edit/termination-of-the-employees-job-placement-edit.component';
import { TerminationOfTheEmployeesJobPlacementListComponent } from './termination-of-the-employees-job-placement-list/termination-of-the-employees-job-placement-list.component';
import { TerminationOfTheEmployeesJobPlacementViewComponent } from './termination-of-the-employees-job-placement-view/termination-of-the-employees-job-placement-view.component';

const routes: Routes = [
  {
    path: '',
    component: TerminationOfTheEmployeesJobPlacementListComponent,
    canActivate: [TerminationOfTheEmployeesJobPlacementGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TerminationOfTheEmployeesJobPlacementNewComponent,
    canActivate: [TerminationOfTheEmployeesJobPlacementGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TerminationOfTheEmployeesJobPlacementEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TerminationOfTheEmployeesJobPlacementListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TerminationOfTheEmployeesJobPlacementViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TerminationOfTheEmployeesJobPlacementRoutingModule {
}
