import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RecordVariableCorrectionsForEmployeesGuard } from './shared/record-variable-corrections-for-employees.guard';
import { RecordVariableCorrectionsForEmployeesNewComponent } from './record-variable-corrections-for-employees-new/record-variable-corrections-for-employees-new.component';
import { RecordVariableCorrectionsForEmployeesEditComponent } from './record-variable-corrections-for-employees-edit/record-variable-corrections-for-employees-edit.component';
import { RecordVariableCorrectionsForEmployeesListComponent } from './record-variable-corrections-for-employees-list/record-variable-corrections-for-employees-list.component';
import { RecordVariableCorrectionsForEmployeesViewComponent } from './record-variable-corrections-for-employees-view/record-variable-corrections-for-employees-view.component';

const routes: Routes = [
  {
    path: '',
    component: RecordVariableCorrectionsForEmployeesListComponent,
    canActivate: [RecordVariableCorrectionsForEmployeesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RecordVariableCorrectionsForEmployeesNewComponent,
    canActivate: [RecordVariableCorrectionsForEmployeesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RecordVariableCorrectionsForEmployeesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RecordVariableCorrectionsForEmployeesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RecordVariableCorrectionsForEmployeesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RecordVariableCorrectionsForEmployeesRoutingModule {
}
