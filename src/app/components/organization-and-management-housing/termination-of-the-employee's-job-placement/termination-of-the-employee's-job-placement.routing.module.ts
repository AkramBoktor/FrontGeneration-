import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TerminationOfTheEmployee'sJobPlacementGuard } from './shared/termination-of-the-employee's-job-placement.guard';
import { TerminationOfTheEmployee'sJobPlacementNewComponent } from './termination-of-the-employee's-job-placement-new/termination-of-the-employee's-job-placement-new.component';
import { TerminationOfTheEmployee'sJobPlacementEditComponent } from './termination-of-the-employee's-job-placement-edit/termination-of-the-employee's-job-placement-edit.component';
import { TerminationOfTheEmployee'sJobPlacementListComponent } from './termination-of-the-employee's-job-placement-list/termination-of-the-employee's-job-placement-list.component';
import { TerminationOfTheEmployee'sJobPlacementViewComponent } from './termination-of-the-employee's-job-placement-view/termination-of-the-employee's-job-placement-view.component';

const routes: Routes = [
  {
    path: '',
    component: TerminationOfTheEmployee'sJobPlacementListComponent,
    canActivate: [TerminationOfTheEmployee'sJobPlacementGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TerminationOfTheEmployee'sJobPlacementNewComponent,
    canActivate: [TerminationOfTheEmployee'sJobPlacementGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TerminationOfTheEmployee'sJobPlacementEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TerminationOfTheEmployee'sJobPlacementListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TerminationOfTheEmployee'sJobPlacementViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TerminationOfTheEmployee'sJobPlacementRoutingModule {
}
