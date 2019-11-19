import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ConditionsNotebookDataGuard } from './shared/conditions-notebook-data.guard';
import { ConditionsNotebookDataNewComponent } from './conditions-notebook-data-new/conditions-notebook-data-new.component';
import { ConditionsNotebookDataEditComponent } from './conditions-notebook-data-edit/conditions-notebook-data-edit.component';
import { ConditionsNotebookDataListComponent } from './conditions-notebook-data-list/conditions-notebook-data-list.component';
import { ConditionsNotebookDataViewComponent } from './conditions-notebook-data-view/conditions-notebook-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: ConditionsNotebookDataListComponent,
    canActivate: [ConditionsNotebookDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ConditionsNotebookDataNewComponent,
    canActivate: [ConditionsNotebookDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ConditionsNotebookDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ConditionsNotebookDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ConditionsNotebookDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ConditionsNotebookDataRoutingModule {
}
