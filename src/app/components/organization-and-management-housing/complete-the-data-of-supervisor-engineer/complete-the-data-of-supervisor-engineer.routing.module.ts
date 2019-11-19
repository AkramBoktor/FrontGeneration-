import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CompleteTheDataOfSupervisorEngineerGuard } from './shared/complete-the-data-of-supervisor-engineer.guard';
import { CompleteTheDataOfSupervisorEngineerNewComponent } from './complete-the-data-of-supervisor-engineer-new/complete-the-data-of-supervisor-engineer-new.component';
import { CompleteTheDataOfSupervisorEngineerEditComponent } from './complete-the-data-of-supervisor-engineer-edit/complete-the-data-of-supervisor-engineer-edit.component';
import { CompleteTheDataOfSupervisorEngineerListComponent } from './complete-the-data-of-supervisor-engineer-list/complete-the-data-of-supervisor-engineer-list.component';
import { CompleteTheDataOfSupervisorEngineerViewComponent } from './complete-the-data-of-supervisor-engineer-view/complete-the-data-of-supervisor-engineer-view.component';

const routes: Routes = [
  {
    path: '',
    component: CompleteTheDataOfSupervisorEngineerListComponent,
    canActivate: [CompleteTheDataOfSupervisorEngineerGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CompleteTheDataOfSupervisorEngineerNewComponent,
    canActivate: [CompleteTheDataOfSupervisorEngineerGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CompleteTheDataOfSupervisorEngineerEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CompleteTheDataOfSupervisorEngineerListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CompleteTheDataOfSupervisorEngineerViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CompleteTheDataOfSupervisorEngineerRoutingModule {
}
