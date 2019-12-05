import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MasterFileGuard } from './shared/master-file.guard';
import { MasterFileNewComponent } from './master-file-new/master-file-new.component';
import { MasterFileEditComponent } from './master-file-edit/master-file-edit.component';
import { MasterFileListComponent } from './master-file-list/master-file-list.component';
import { MasterFileViewComponent } from './master-file-view/master-file-view.component';

const routes: Routes = [
  {
    path: '',
    component: MasterFileListComponent,
    canActivate: [MasterFileGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: MasterFileNewComponent,
    canActivate: [MasterFileGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: MasterFileEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: MasterFileListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: MasterFileViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MasterFileRoutingModule {
}
