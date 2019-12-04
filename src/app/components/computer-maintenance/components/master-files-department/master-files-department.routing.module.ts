import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MasterFilesDepartmentGuard } from './shared/master-files-department.guard';
import { MasterFilesDepartmentNewComponent } from './master-files-department-new/master-files-department-new.component';
import { MasterFilesDepartmentEditComponent } from './master-files-department-edit/master-files-department-edit.component';
import { MasterFilesDepartmentListComponent } from './master-files-department-list/master-files-department-list.component';
import { MasterFilesDepartmentViewComponent } from './master-files-department-view/master-files-department-view.component';

const routes: Routes = [
  {
    path: '',
    component: MasterFilesDepartmentListComponent,
    canActivate: [MasterFilesDepartmentGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: MasterFilesDepartmentNewComponent,
    canActivate: [MasterFilesDepartmentGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: MasterFilesDepartmentEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: MasterFilesDepartmentListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: MasterFilesDepartmentViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MasterFilesDepartmentRoutingModule {
}
