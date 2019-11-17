import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PermissionFlashbackBookToTheBodyStoreGuard } from './shared/permission-flashback-book-to-the-body-store.guard';
import { PermissionFlashbackBookToTheBodyStoreNewComponent } from './permission-flashback-book-to-the-body-store-new/permission-flashback-book-to-the-body-store-new.component';
import { PermissionFlashbackBookToTheBodyStoreEditComponent } from './permission-flashback-book-to-the-body-store-edit/permission-flashback-book-to-the-body-store-edit.component';
import { PermissionFlashbackBookToTheBodyStoreListComponent } from './permission-flashback-book-to-the-body-store-list/permission-flashback-book-to-the-body-store-list.component';
import { PermissionFlashbackBookToTheBodyStoreViewComponent } from './permission-flashback-book-to-the-body-store-view/permission-flashback-book-to-the-body-store-view.component';

const routes: Routes = [
  {
    path: '',
    component: PermissionFlashbackBookToTheBodyStoreListComponent,
    canActivate: [PermissionFlashbackBookToTheBodyStoreGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PermissionFlashbackBookToTheBodyStoreNewComponent,
    canActivate: [PermissionFlashbackBookToTheBodyStoreGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PermissionFlashbackBookToTheBodyStoreEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PermissionFlashbackBookToTheBodyStoreListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PermissionFlashbackBookToTheBodyStoreViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PermissionFlashbackBookToTheBodyStoreRoutingModule {
}
