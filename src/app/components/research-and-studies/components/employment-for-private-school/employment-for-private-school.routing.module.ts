import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EmploymentForPrivateSchoolGuard } from './shared/employment-for-private-school.guard';
import { EmploymentForPrivateSchoolNewComponent } from './employment-for-private-school-new/employment-for-private-school-new.component';
import { EmploymentForPrivateSchoolEditComponent } from './employment-for-private-school-edit/employment-for-private-school-edit.component';
import { EmploymentForPrivateSchoolListComponent } from './employment-for-private-school-list/employment-for-private-school-list.component';
import { EmploymentForPrivateSchoolViewComponent } from './employment-for-private-school-view/employment-for-private-school-view.component';

const routes: Routes = [
  {
    path: '',
    component: EmploymentForPrivateSchoolListComponent,
    canActivate: [EmploymentForPrivateSchoolGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EmploymentForPrivateSchoolNewComponent,
    canActivate: [EmploymentForPrivateSchoolGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EmploymentForPrivateSchoolEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EmploymentForPrivateSchoolListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EmploymentForPrivateSchoolViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EmploymentForPrivateSchoolRoutingModule {
}
