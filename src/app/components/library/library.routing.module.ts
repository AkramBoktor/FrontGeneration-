
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LibraryComponent } from './library.component';


const routes: Routes = [
  {
    path: '',
    component: LibraryComponent,
  },
  
{
    path: 'return-document-book-with-borrower-number', loadChildren: './components/return-document-book-with-borrower-number/return-document-book-with-borrower-number.module#ReturnDocumentBookWithBorrowerNumberModule',
    data: {
      moduleName: 'ReturnDocumentBookWithBorrowerNumber'
    },
},

{
    path: 'smooth-data', loadChildren: './components/smooth-data/smooth-data.module#SmoothDataModule',
    data: {
      moduleName: 'SmoothData'
    },
},

{
    path: 'borrow-an-employee-to-a-book-or-document', loadChildren: './components/borrow-an-employee-to-a-book-or-document/borrow-an-employee-to-a-book-or-document.module#BorrowAnEmployeeToABookOrDocumentModule',
    data: {
      moduleName: 'BorrowAnEmployeeToABookOrDocument'
    },
},

{
    path: 'data-for-document', loadChildren: './components/data-for-document/data-for-document.module#DataForDocumentModule',
    data: {
      moduleName: 'DataForDocument'
    },
},

{
    path: 'permission-flashback-book-to-the-body-store', loadChildren: './components/permission-flashback-book-to-the-body-store/permission-flashback-book-to-the-body-store.module#PermissionFlashbackBookToTheBodyStoreModule',
    data: {
      moduleName: 'PermissionFlashbackBookToTheBodyStore'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LibraryRoutingModule {
}

