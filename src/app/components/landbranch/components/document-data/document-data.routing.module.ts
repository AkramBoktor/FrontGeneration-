import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DocumentDataGuard } from './shared/document-data.guard';
import { DocumentDataNewComponent } from './document-data-new/document-data-new.component';
import { DocumentDataEditComponent } from './document-data-edit/document-data-edit.component';
import { DocumentDataListComponent } from './document-data-list/document-data-list.component';
import { DocumentDataViewComponent } from './document-data-view/document-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentDataListComponent,
    canActivate: [DocumentDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DocumentDataNewComponent,
    canActivate: [DocumentDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DocumentDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DocumentDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DocumentDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DocumentDataRoutingModule {
}
