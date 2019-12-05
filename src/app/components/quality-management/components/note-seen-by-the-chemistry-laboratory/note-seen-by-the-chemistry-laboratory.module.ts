import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { NoteSeenByTheChemistryLaboratoryListComponent } from './note-seen-by-the-chemistry-laboratory-list/note-seen-by-the-chemistry-laboratory-list.component';
import { NoteSeenByTheChemistryLaboratoryEditComponent } from './note-seen-by-the-chemistry-laboratory-edit/note-seen-by-the-chemistry-laboratory-edit.component';
import { NoteSeenByTheChemistryLaboratoryNewComponent } from './note-seen-by-the-chemistry-laboratory-new/note-seen-by-the-chemistry-laboratory-new.component';
import { NoteSeenByTheChemistryLaboratoryViewComponent } from './note-seen-by-the-chemistry-laboratory-view/note-seen-by-the-chemistry-laboratory-view.component';
import { NoteSeenByTheChemistryLaboratoryRoutingModule } from './note-seen-by-the-chemistry-laboratory.routing.module';
import { NoteSeenByTheChemistryLaboratoryService } from './shared/note-seen-by-the-chemistry-laboratory.service';
import { NoteSeenByTheChemistryLaboratoryGuard } from './shared/note-seen-by-the-chemistry-laboratory.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    NoteSeenByTheChemistryLaboratoryListComponent,
    NoteSeenByTheChemistryLaboratoryNewComponent,
    NoteSeenByTheChemistryLaboratoryEditComponent,
    NoteSeenByTheChemistryLaboratoryViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    NoteSeenByTheChemistryLaboratoryRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    NoteSeenByTheChemistryLaboratoryService,
    NoteSeenByTheChemistryLaboratoryGuard
  ],
  entryComponents: [
    NoteSeenByTheChemistryLaboratoryNewComponent,
    NoteSeenByTheChemistryLaboratoryEditComponent,
    NoteSeenByTheChemistryLaboratoryViewComponent
  ]
})

export class NoteSeenByTheChemistryLaboratoryModule {
}
