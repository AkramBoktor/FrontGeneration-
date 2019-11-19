import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ReturnDocumentBookWithBorrowerNumberGuard } from './shared/return-document-book-with-borrower-number.guard';
import { ReturnDocumentBookWithBorrowerNumberNewComponent } from './return-document-book-with-borrower-number-new/return-document-book-with-borrower-number-new.component';
import { ReturnDocumentBookWithBorrowerNumberEditComponent } from './return-document-book-with-borrower-number-edit/return-document-book-with-borrower-number-edit.component';
import { ReturnDocumentBookWithBorrowerNumberListComponent } from './return-document-book-with-borrower-number-list/return-document-book-with-borrower-number-list.component';
import { ReturnDocumentBookWithBorrowerNumberViewComponent } from './return-document-book-with-borrower-number-view/return-document-book-with-borrower-number-view.component';

const routes: Routes = [
  {
    path: '',
    component: ReturnDocumentBookWithBorrowerNumberListComponent,
    canActivate: [ReturnDocumentBookWithBorrowerNumberGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ReturnDocumentBookWithBorrowerNumberNewComponent,
    canActivate: [ReturnDocumentBookWithBorrowerNumberGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ReturnDocumentBookWithBorrowerNumberEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ReturnDocumentBookWithBorrowerNumberListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ReturnDocumentBookWithBorrowerNumberViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ReturnDocumentBookWithBorrowerNumberRoutingModule {
}
