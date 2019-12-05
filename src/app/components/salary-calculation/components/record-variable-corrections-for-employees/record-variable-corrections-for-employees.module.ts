import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RecordVariableCorrectionsForEmployeesListComponent } from './record-variable-corrections-for-employees-list/record-variable-corrections-for-employees-list.component';
import { RecordVariableCorrectionsForEmployeesEditComponent } from './record-variable-corrections-for-employees-edit/record-variable-corrections-for-employees-edit.component';
import { RecordVariableCorrectionsForEmployeesNewComponent } from './record-variable-corrections-for-employees-new/record-variable-corrections-for-employees-new.component';
import { RecordVariableCorrectionsForEmployeesViewComponent } from './record-variable-corrections-for-employees-view/record-variable-corrections-for-employees-view.component';
import { RecordVariableCorrectionsForEmployeesRoutingModule } from './record-variable-corrections-for-employees.routing.module';
import { RecordVariableCorrectionsForEmployeesService } from './shared/record-variable-corrections-for-employees.service';
import { RecordVariableCorrectionsForEmployeesGuard } from './shared/record-variable-corrections-for-employees.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RecordVariableCorrectionsForEmployeesListComponent,
    RecordVariableCorrectionsForEmployeesNewComponent,
    RecordVariableCorrectionsForEmployeesEditComponent,
    RecordVariableCorrectionsForEmployeesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RecordVariableCorrectionsForEmployeesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RecordVariableCorrectionsForEmployeesService,
    RecordVariableCorrectionsForEmployeesGuard
  ],
  entryComponents: [
    RecordVariableCorrectionsForEmployeesNewComponent,
    RecordVariableCorrectionsForEmployeesEditComponent,
    RecordVariableCorrectionsForEmployeesViewComponent
  ]
})

export class RecordVariableCorrectionsForEmployeesModule {
}
