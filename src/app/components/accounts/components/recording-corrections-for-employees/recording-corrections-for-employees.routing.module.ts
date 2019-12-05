import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RecordingCorrectionsForEmployeesGuard } from './shared/recording-corrections-for-employees.guard';
import { RecordingCorrectionsForEmployeesNewComponent } from './recording-corrections-for-employees-new/recording-corrections-for-employees-new.component';
import { RecordingCorrectionsForEmployeesEditComponent } from './recording-corrections-for-employees-edit/recording-corrections-for-employees-edit.component';
import { RecordingCorrectionsForEmployeesListComponent } from './recording-corrections-for-employees-list/recording-corrections-for-employees-list.component';
import { RecordingCorrectionsForEmployeesViewComponent } from './recording-corrections-for-employees-view/recording-corrections-for-employees-view.component';

const routes: Routes = [
  {
    path: '',
    component: RecordingCorrectionsForEmployeesListComponent,
    canActivate: [RecordingCorrectionsForEmployeesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RecordingCorrectionsForEmployeesNewComponent,
    canActivate: [RecordingCorrectionsForEmployeesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RecordingCorrectionsForEmployeesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RecordingCorrectionsForEmployeesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RecordingCorrectionsForEmployeesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RecordingCorrectionsForEmployeesRoutingModule {
}
