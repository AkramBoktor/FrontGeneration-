import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BorrowAnEmployeeToABookOrDocumentGuard } from './shared/borrow-an-employee-to-a-book-or-document.guard';
import { BorrowAnEmployeeToABookOrDocumentNewComponent } from './borrow-an-employee-to-a-book-or-document-new/borrow-an-employee-to-a-book-or-document-new.component';
import { BorrowAnEmployeeToABookOrDocumentEditComponent } from './borrow-an-employee-to-a-book-or-document-edit/borrow-an-employee-to-a-book-or-document-edit.component';
import { BorrowAnEmployeeToABookOrDocumentListComponent } from './borrow-an-employee-to-a-book-or-document-list/borrow-an-employee-to-a-book-or-document-list.component';
import { BorrowAnEmployeeToABookOrDocumentViewComponent } from './borrow-an-employee-to-a-book-or-document-view/borrow-an-employee-to-a-book-or-document-view.component';

const routes: Routes = [
  {
    path: '',
    component: BorrowAnEmployeeToABookOrDocumentListComponent,
    canActivate: [BorrowAnEmployeeToABookOrDocumentGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BorrowAnEmployeeToABookOrDocumentNewComponent,
    canActivate: [BorrowAnEmployeeToABookOrDocumentGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BorrowAnEmployeeToABookOrDocumentEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BorrowAnEmployeeToABookOrDocumentListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BorrowAnEmployeeToABookOrDocumentViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BorrowAnEmployeeToABookOrDocumentRoutingModule {
}
