import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsFolderEditComponent } from './documents-folder-edit/documents-folder-edit.component';
import { DocumentsFolderListComponent } from './documents-folder-list/documents-folder-list.component';
import { DocumentsFolderNewComponent } from './documents-folder-new/documents-folder-new.component';
import { DocumentsFolderViewComponent } from './documents-folder-view/documents-folder-view.component';
import { DocumentsFolderGuard } from './shared/documents-folder.guard';

const routes: Routes = [
  {
    path: '',
    component: DocumentsFolderListComponent,
    canActivate: [DocumentsFolderGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DocumentsFolderNewComponent,
    canActivate: [DocumentsFolderGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DocumentsFolderEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DocumentsFolderListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DocumentsFolderViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DocumentsFolderRoutingModule {
}
