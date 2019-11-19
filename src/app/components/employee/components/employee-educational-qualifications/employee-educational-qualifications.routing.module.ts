import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeEducationalQualificationsEditComponent } from './employee-educational-qualifications-edit/employee-educational-qualifications-edit.component';
import { EmployeeEducationalQualificationsListComponent } from './employee-educational-qualifications-list/employee-educational-qualifications-list.component';
import { EmployeeEducationalQualificationsNewComponent } from './employee-educational-qualifications-new/employee-educational-qualifications-new.component';
import { EmployeeEducationalQualificationsViewComponent } from './employee-educational-qualifications-view/employee-educational-qualifications-view.component';
import { EmployeeEducationalQualificationsGuard } from './shared/employee-educational-qualifications.guard';

const routes: Routes = [
  {
    path: '',
    component: EmployeeEducationalQualificationsListComponent,
    canActivate: [EmployeeEducationalQualificationsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EmployeeEducationalQualificationsNewComponent,
    canActivate: [EmployeeEducationalQualificationsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EmployeeEducationalQualificationsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EmployeeEducationalQualificationsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EmployeeEducationalQualificationsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EmployeeEducationalQualificationsRoutingModule {
}
