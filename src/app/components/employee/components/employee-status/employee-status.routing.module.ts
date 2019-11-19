import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeStatusEditComponent } from './employee-status-edit/employee-status-edit.component';
import { EmployeeStatusListComponent } from './employee-status-list/employee-status-list.component';
import { EmployeeStatusNewComponent } from './employee-status-new/employee-status-new.component';
import { EmployeeStatusViewComponent } from './employee-status-view/employee-status-view.component';
import { EmployeeStatusGuard } from './shared/employee-status.guard';

const routes: Routes = [
  {
    path: '',
    component: EmployeeStatusListComponent,
    canActivate: [EmployeeStatusGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EmployeeStatusNewComponent,
    canActivate: [EmployeeStatusGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EmployeeStatusEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EmployeeStatusListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EmployeeStatusViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EmployeeStatusRoutingModule {
}
