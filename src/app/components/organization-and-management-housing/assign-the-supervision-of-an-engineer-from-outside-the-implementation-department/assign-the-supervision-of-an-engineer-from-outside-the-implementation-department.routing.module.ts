import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentGuard } from './shared/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department.guard';
import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentNewComponent } from './assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-new/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-new.component';
import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentEditComponent } from './assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-edit/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-edit.component';
import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentListComponent } from './assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-list/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-list.component';
import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentViewComponent } from './assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-view/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-view.component';

const routes: Routes = [
  {
    path: '',
    component: AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentListComponent,
    canActivate: [AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentNewComponent,
    canActivate: [AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentRoutingModule {
}
