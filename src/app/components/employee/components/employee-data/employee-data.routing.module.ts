import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDataEditComponent } from './employee-data-edit/employee-data-edit.component';
import { EmployeeDataListComponent } from './employee-data-list/employee-data-list.component';
import { EmployeeDataNewComponent } from './employee-data-new/employee-data-new.component';
import { EmployeeDataViewComponent } from './employee-data-view/employee-data-view.component';
import { EmployeeDataGuard } from './shared/employee-data.guard';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDataListComponent,
    canActivate: [EmployeeDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EmployeeDataNewComponent,
    canActivate: [EmployeeDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EmployeeDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EmployeeDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EmployeeDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EmployeeDataRoutingModule {
}
