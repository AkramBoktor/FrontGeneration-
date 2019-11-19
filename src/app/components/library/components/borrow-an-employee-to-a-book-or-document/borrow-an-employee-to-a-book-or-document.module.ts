import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BorrowAnEmployeeToABookOrDocumentListComponent } from './borrow-an-employee-to-a-book-or-document-list/borrow-an-employee-to-a-book-or-document-list.component';
import { BorrowAnEmployeeToABookOrDocumentEditComponent } from './borrow-an-employee-to-a-book-or-document-edit/borrow-an-employee-to-a-book-or-document-edit.component';
import { BorrowAnEmployeeToABookOrDocumentNewComponent } from './borrow-an-employee-to-a-book-or-document-new/borrow-an-employee-to-a-book-or-document-new.component';
import { BorrowAnEmployeeToABookOrDocumentViewComponent } from './borrow-an-employee-to-a-book-or-document-view/borrow-an-employee-to-a-book-or-document-view.component';
import { BorrowAnEmployeeToABookOrDocumentRoutingModule } from './borrow-an-employee-to-a-book-or-document.routing.module';
import { BorrowAnEmployeeToABookOrDocumentService } from './shared/borrow-an-employee-to-a-book-or-document.service';
import { BorrowAnEmployeeToABookOrDocumentGuard } from './shared/borrow-an-employee-to-a-book-or-document.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BorrowAnEmployeeToABookOrDocumentListComponent,
    BorrowAnEmployeeToABookOrDocumentNewComponent,
    BorrowAnEmployeeToABookOrDocumentEditComponent,
    BorrowAnEmployeeToABookOrDocumentViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BorrowAnEmployeeToABookOrDocumentRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BorrowAnEmployeeToABookOrDocumentService,
    BorrowAnEmployeeToABookOrDocumentGuard
  ],
  entryComponents: [
    BorrowAnEmployeeToABookOrDocumentNewComponent,
    BorrowAnEmployeeToABookOrDocumentEditComponent,
    BorrowAnEmployeeToABookOrDocumentViewComponent
  ]
})

export class BorrowAnEmployeeToABookOrDocumentModule {
}
