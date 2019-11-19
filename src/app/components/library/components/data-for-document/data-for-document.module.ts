import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataForDocumentListComponent } from './data-for-document-list/data-for-document-list.component';
import { DataForDocumentEditComponent } from './data-for-document-edit/data-for-document-edit.component';
import { DataForDocumentNewComponent } from './data-for-document-new/data-for-document-new.component';
import { DataForDocumentViewComponent } from './data-for-document-view/data-for-document-view.component';
import { DataForDocumentRoutingModule } from './data-for-document.routing.module';
import { DataForDocumentService } from './shared/data-for-document.service';
import { DataForDocumentGuard } from './shared/data-for-document.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataForDocumentListComponent,
    DataForDocumentNewComponent,
    DataForDocumentEditComponent,
    DataForDocumentViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataForDocumentRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataForDocumentService,
    DataForDocumentGuard
  ],
  entryComponents: [
    DataForDocumentNewComponent,
    DataForDocumentEditComponent,
    DataForDocumentViewComponent
  ]
})

export class DataForDocumentModule {
}
