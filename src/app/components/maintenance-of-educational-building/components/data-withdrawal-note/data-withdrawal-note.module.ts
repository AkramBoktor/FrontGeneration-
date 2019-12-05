import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataWithdrawalNoteListComponent } from './data-withdrawal-note-list/data-withdrawal-note-list.component';
import { DataWithdrawalNoteEditComponent } from './data-withdrawal-note-edit/data-withdrawal-note-edit.component';
import { DataWithdrawalNoteNewComponent } from './data-withdrawal-note-new/data-withdrawal-note-new.component';
import { DataWithdrawalNoteViewComponent } from './data-withdrawal-note-view/data-withdrawal-note-view.component';
import { DataWithdrawalNoteRoutingModule } from './data-withdrawal-note.routing.module';
import { DataWithdrawalNoteService } from './shared/data-withdrawal-note.service';
import { DataWithdrawalNoteGuard } from './shared/data-withdrawal-note.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataWithdrawalNoteListComponent,
    DataWithdrawalNoteNewComponent,
    DataWithdrawalNoteEditComponent,
    DataWithdrawalNoteViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataWithdrawalNoteRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataWithdrawalNoteService,
    DataWithdrawalNoteGuard
  ],
  entryComponents: [
    DataWithdrawalNoteNewComponent,
    DataWithdrawalNoteEditComponent,
    DataWithdrawalNoteViewComponent
  ]
})

export class DataWithdrawalNoteModule {
}
