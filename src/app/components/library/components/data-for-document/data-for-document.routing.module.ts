import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataForDocumentGuard } from './shared/data-for-document.guard';
import { DataForDocumentNewComponent } from './data-for-document-new/data-for-document-new.component';
import { DataForDocumentEditComponent } from './data-for-document-edit/data-for-document-edit.component';
import { DataForDocumentListComponent } from './data-for-document-list/data-for-document-list.component';
import { DataForDocumentViewComponent } from './data-for-document-view/data-for-document-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataForDocumentListComponent,
    canActivate: [DataForDocumentGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataForDocumentNewComponent,
    canActivate: [DataForDocumentGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataForDocumentEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataForDocumentListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataForDocumentViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataForDocumentRoutingModule {
}
