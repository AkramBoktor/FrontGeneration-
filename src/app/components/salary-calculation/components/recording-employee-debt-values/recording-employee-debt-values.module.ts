import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RecordingEmployeeDebtValuesListComponent } from './recording-employee-debt-values-list/recording-employee-debt-values-list.component';
import { RecordingEmployeeDebtValuesEditComponent } from './recording-employee-debt-values-edit/recording-employee-debt-values-edit.component';
import { RecordingEmployeeDebtValuesNewComponent } from './recording-employee-debt-values-new/recording-employee-debt-values-new.component';
import { RecordingEmployeeDebtValuesViewComponent } from './recording-employee-debt-values-view/recording-employee-debt-values-view.component';
import { RecordingEmployeeDebtValuesRoutingModule } from './recording-employee-debt-values.routing.module';
import { RecordingEmployeeDebtValuesService } from './shared/recording-employee-debt-values.service';
import { RecordingEmployeeDebtValuesGuard } from './shared/recording-employee-debt-values.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RecordingEmployeeDebtValuesListComponent,
    RecordingEmployeeDebtValuesNewComponent,
    RecordingEmployeeDebtValuesEditComponent,
    RecordingEmployeeDebtValuesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RecordingEmployeeDebtValuesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RecordingEmployeeDebtValuesService,
    RecordingEmployeeDebtValuesGuard
  ],
  entryComponents: [
    RecordingEmployeeDebtValuesNewComponent,
    RecordingEmployeeDebtValuesEditComponent,
    RecordingEmployeeDebtValuesViewComponent
  ]
})

export class RecordingEmployeeDebtValuesModule {
}
