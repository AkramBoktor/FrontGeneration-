import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RecordingEmployeeDebtValuesGuard } from './shared/recording-employee-debt-values.guard';
import { RecordingEmployeeDebtValuesNewComponent } from './recording-employee-debt-values-new/recording-employee-debt-values-new.component';
import { RecordingEmployeeDebtValuesEditComponent } from './recording-employee-debt-values-edit/recording-employee-debt-values-edit.component';
import { RecordingEmployeeDebtValuesListComponent } from './recording-employee-debt-values-list/recording-employee-debt-values-list.component';
import { RecordingEmployeeDebtValuesViewComponent } from './recording-employee-debt-values-view/recording-employee-debt-values-view.component';

const routes: Routes = [
  {
    path: '',
    component: RecordingEmployeeDebtValuesListComponent,
    canActivate: [RecordingEmployeeDebtValuesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RecordingEmployeeDebtValuesNewComponent,
    canActivate: [RecordingEmployeeDebtValuesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RecordingEmployeeDebtValuesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RecordingEmployeeDebtValuesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RecordingEmployeeDebtValuesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RecordingEmployeeDebtValuesRoutingModule {
}
