import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { VacationEmployeeGuard } from './shared/vacation-employee.guard';
import { VacationEmployeeNewComponent } from './vacation-employee-new/vacation-employee-new.component';
import { VacationEmployeeEditComponent } from './vacation-employee-edit/vacation-employee-edit.component';
import { VacationEmployeeListComponent } from './vacation-employee-list/vacation-employee-list.component';
import { VacationEmployeeViewComponent } from './vacation-employee-view/vacation-employee-view.component';

const routes: Routes = [
  {
    path: '',
    component: VacationEmployeeListComponent,
    canActivate: [VacationEmployeeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: VacationEmployeeNewComponent,
    canActivate: [VacationEmployeeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: VacationEmployeeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: VacationEmployeeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: VacationEmployeeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class VacationEmployeeRoutingModule {
}
