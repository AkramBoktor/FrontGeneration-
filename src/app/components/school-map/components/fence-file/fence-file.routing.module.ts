import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FenceFileGuard } from './shared/fence-file.guard';
import { FenceFileNewComponent } from './fence-file-new/fence-file-new.component';
import { FenceFileEditComponent } from './fence-file-edit/fence-file-edit.component';
import { FenceFileListComponent } from './fence-file-list/fence-file-list.component';
import { FenceFileViewComponent } from './fence-file-view/fence-file-view.component';

const routes: Routes = [
  {
    path: '',
    component: FenceFileListComponent,
    canActivate: [FenceFileGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: FenceFileNewComponent,
    canActivate: [FenceFileGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: FenceFileEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: FenceFileListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: FenceFileViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class FenceFileRoutingModule {
}
