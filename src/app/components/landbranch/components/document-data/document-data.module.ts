import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DocumentDataListComponent } from './document-data-list/document-data-list.component';
import { DocumentDataEditComponent } from './document-data-edit/document-data-edit.component';
import { DocumentDataNewComponent } from './document-data-new/document-data-new.component';
import { DocumentDataViewComponent } from './document-data-view/document-data-view.component';
import { DocumentDataRoutingModule } from './document-data.routing.module';
import { DocumentDataService } from './shared/document-data.service';
import { DocumentDataGuard } from './shared/document-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DocumentDataListComponent,
    DocumentDataNewComponent,
    DocumentDataEditComponent,
    DocumentDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DocumentDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DocumentDataService,
    DocumentDataGuard
  ],
  entryComponents: [
    DocumentDataNewComponent,
    DocumentDataEditComponent,
    DocumentDataViewComponent
  ]
})

export class DocumentDataModule {
}
