import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssignEngineerOutsideDepartmentGuard } from './shared/assign-engineer-outside-department.guard';
import { AssignEngineerOutsideDepartmentNewComponent } from './assign-engineer-outside-department-new/assign-engineer-outside-department-new.component';
import { AssignEngineerOutsideDepartmentEditComponent } from './assign-engineer-outside-department-edit/assign-engineer-outside-department-edit.component';
import { AssignEngineerOutsideDepartmentListComponent } from './assign-engineer-outside-department-list/assign-engineer-outside-department-list.component';
import { AssignEngineerOutsideDepartmentViewComponent } from './assign-engineer-outside-department-view/assign-engineer-outside-department-view.component';

const routes: Routes = [
  {
    path: '',
    component: AssignEngineerOutsideDepartmentListComponent,
    canActivate: [AssignEngineerOutsideDepartmentGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AssignEngineerOutsideDepartmentNewComponent,
    canActivate: [AssignEngineerOutsideDepartmentGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AssignEngineerOutsideDepartmentEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AssignEngineerOutsideDepartmentListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AssignEngineerOutsideDepartmentViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssignEngineerOutsideDepartmentRoutingModule {
}
