import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RecordingCorrectionsForEmployeesListComponent } from './recording-corrections-for-employees-list/recording-corrections-for-employees-list.component';
import { RecordingCorrectionsForEmployeesEditComponent } from './recording-corrections-for-employees-edit/recording-corrections-for-employees-edit.component';
import { RecordingCorrectionsForEmployeesNewComponent } from './recording-corrections-for-employees-new/recording-corrections-for-employees-new.component';
import { RecordingCorrectionsForEmployeesViewComponent } from './recording-corrections-for-employees-view/recording-corrections-for-employees-view.component';
import { RecordingCorrectionsForEmployeesRoutingModule } from './recording-corrections-for-employees.routing.module';
import { RecordingCorrectionsForEmployeesService } from './shared/recording-corrections-for-employees.service';
import { RecordingCorrectionsForEmployeesGuard } from './shared/recording-corrections-for-employees.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RecordingCorrectionsForEmployeesListComponent,
    RecordingCorrectionsForEmployeesNewComponent,
    RecordingCorrectionsForEmployeesEditComponent,
    RecordingCorrectionsForEmployeesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RecordingCorrectionsForEmployeesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RecordingCorrectionsForEmployeesService,
    RecordingCorrectionsForEmployeesGuard
  ],
  entryComponents: [
    RecordingCorrectionsForEmployeesNewComponent,
    RecordingCorrectionsForEmployeesEditComponent,
    RecordingCorrectionsForEmployeesViewComponent
  ]
})

export class RecordingCorrectionsForEmployeesModule {
}
