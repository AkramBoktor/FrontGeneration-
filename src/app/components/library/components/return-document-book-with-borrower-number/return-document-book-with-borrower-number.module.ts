import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ReturnDocumentBookWithBorrowerNumberListComponent } from './return-document-book-with-borrower-number-list/return-document-book-with-borrower-number-list.component';
import { ReturnDocumentBookWithBorrowerNumberEditComponent } from './return-document-book-with-borrower-number-edit/return-document-book-with-borrower-number-edit.component';
import { ReturnDocumentBookWithBorrowerNumberNewComponent } from './return-document-book-with-borrower-number-new/return-document-book-with-borrower-number-new.component';
import { ReturnDocumentBookWithBorrowerNumberViewComponent } from './return-document-book-with-borrower-number-view/return-document-book-with-borrower-number-view.component';
import { ReturnDocumentBookWithBorrowerNumberRoutingModule } from './return-document-book-with-borrower-number.routing.module';
import { ReturnDocumentBookWithBorrowerNumberService } from './shared/return-document-book-with-borrower-number.service';
import { ReturnDocumentBookWithBorrowerNumberGuard } from './shared/return-document-book-with-borrower-number.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ReturnDocumentBookWithBorrowerNumberListComponent,
    ReturnDocumentBookWithBorrowerNumberNewComponent,
    ReturnDocumentBookWithBorrowerNumberEditComponent,
    ReturnDocumentBookWithBorrowerNumberViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ReturnDocumentBookWithBorrowerNumberRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ReturnDocumentBookWithBorrowerNumberService,
    ReturnDocumentBookWithBorrowerNumberGuard
  ],
  entryComponents: [
    ReturnDocumentBookWithBorrowerNumberNewComponent,
    ReturnDocumentBookWithBorrowerNumberEditComponent,
    ReturnDocumentBookWithBorrowerNumberViewComponent
  ]
})

export class ReturnDocumentBookWithBorrowerNumberModule {
}
