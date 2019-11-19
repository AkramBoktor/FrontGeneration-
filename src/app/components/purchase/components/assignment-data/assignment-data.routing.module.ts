import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssignmentDataGuard } from './shared/assignment-data.guard';
import { AssignmentDataNewComponent } from './assignment-data-new/assignment-data-new.component';
import { AssignmentDataEditComponent } from './assignment-data-edit/assignment-data-edit.component';
import { AssignmentDataListComponent } from './assignment-data-list/assignment-data-list.component';
import { AssignmentDataViewComponent } from './assignment-data-view/assignment-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: AssignmentDataListComponent,
    canActivate: [AssignmentDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AssignmentDataNewComponent,
    canActivate: [AssignmentDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AssignmentDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AssignmentDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AssignmentDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssignmentDataRoutingModule {
}
