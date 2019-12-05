import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PreviewNotesDataListComponent } from './preview-notes-data-list/preview-notes-data-list.component';
import { PreviewNotesDataEditComponent } from './preview-notes-data-edit/preview-notes-data-edit.component';
import { PreviewNotesDataNewComponent } from './preview-notes-data-new/preview-notes-data-new.component';
import { PreviewNotesDataViewComponent } from './preview-notes-data-view/preview-notes-data-view.component';
import { PreviewNotesDataRoutingModule } from './preview-notes-data.routing.module';
import { PreviewNotesDataService } from './shared/preview-notes-data.service';
import { PreviewNotesDataGuard } from './shared/preview-notes-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PreviewNotesDataListComponent,
    PreviewNotesDataNewComponent,
    PreviewNotesDataEditComponent,
    PreviewNotesDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PreviewNotesDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PreviewNotesDataService,
    PreviewNotesDataGuard
  ],
  entryComponents: [
    PreviewNotesDataNewComponent,
    PreviewNotesDataEditComponent,
    PreviewNotesDataViewComponent
  ]
})

export class PreviewNotesDataModule {
}
