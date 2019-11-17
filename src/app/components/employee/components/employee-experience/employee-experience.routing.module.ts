import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeExperienceEditComponent } from './employee-experience-edit/employee-experience-edit.component';
import { EmployeeExperienceListComponent } from './employee-experience-list/employee-experience-list.component';
import { EmployeeExperienceNewComponent } from './employee-experience-new/employee-experience-new.component';
import { EmployeeExperienceViewComponent } from './employee-experience-view/employee-experience-view.component';
import { EmployeeExperienceGuard } from './shared/employee-experience.guard';

const routes: Routes = [
  {
    path: '',
    component: EmployeeExperienceListComponent,
    canActivate: [EmployeeExperienceGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EmployeeExperienceNewComponent,
    canActivate: [EmployeeExperienceGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EmployeeExperienceEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EmployeeExperienceListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EmployeeExperienceViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EmployeeExperienceRoutingModule {
}
