import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EmployeesWhoHaveCorrectionGuard } from './shared/employees-who-have-correction.guard';
import { EmployeesWhoHaveCorrectionNewComponent } from './employees-who-have-correction-new/employees-who-have-correction-new.component';
import { EmployeesWhoHaveCorrectionEditComponent } from './employees-who-have-correction-edit/employees-who-have-correction-edit.component';
import { EmployeesWhoHaveCorrectionListComponent } from './employees-who-have-correction-list/employees-who-have-correction-list.component';
import { EmployeesWhoHaveCorrectionViewComponent } from './employees-who-have-correction-view/employees-who-have-correction-view.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesWhoHaveCorrectionListComponent,
    canActivate: [EmployeesWhoHaveCorrectionGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EmployeesWhoHaveCorrectionNewComponent,
    canActivate: [EmployeesWhoHaveCorrectionGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EmployeesWhoHaveCorrectionEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EmployeesWhoHaveCorrectionListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EmployeesWhoHaveCorrectionViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EmployeesWhoHaveCorrectionRoutingModule {
}
