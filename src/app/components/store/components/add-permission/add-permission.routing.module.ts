import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AddPermissionGuard } from './shared/add-permission.guard';
import { AddPermissionNewComponent } from './add-permission-new/add-permission-new.component';
import { AddPermissionEditComponent } from './add-permission-edit/add-permission-edit.component';
import { AddPermissionListComponent } from './add-permission-list/add-permission-list.component';
import { AddPermissionViewComponent } from './add-permission-view/add-permission-view.component';

const routes: Routes = [
  {
    path: '',
    component: AddPermissionListComponent,
    canActivate: [AddPermissionGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AddPermissionNewComponent,
    canActivate: [AddPermissionGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AddPermissionEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AddPermissionListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AddPermissionViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AddPermissionRoutingModule {
}
