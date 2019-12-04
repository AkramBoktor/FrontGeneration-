import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RecordTheInspectionDateInTheTechnicalReportListComponent } from './record-the-inspection-date-in-the-technical-report-list/record-the-inspection-date-in-the-technical-report-list.component';
import { RecordTheInspectionDateInTheTechnicalReportEditComponent } from './record-the-inspection-date-in-the-technical-report-edit/record-the-inspection-date-in-the-technical-report-edit.component';
import { RecordTheInspectionDateInTheTechnicalReportNewComponent } from './record-the-inspection-date-in-the-technical-report-new/record-the-inspection-date-in-the-technical-report-new.component';
import { RecordTheInspectionDateInTheTechnicalReportViewComponent } from './record-the-inspection-date-in-the-technical-report-view/record-the-inspection-date-in-the-technical-report-view.component';
import { RecordTheInspectionDateInTheTechnicalReportRoutingModule } from './record-the-inspection-date-in-the-technical-report.routing.module';
import { RecordTheInspectionDateInTheTechnicalReportService } from './shared/record-the-inspection-date-in-the-technical-report.service';
import { RecordTheInspectionDateInTheTechnicalReportGuard } from './shared/record-the-inspection-date-in-the-technical-report.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RecordTheInspectionDateInTheTechnicalReportListComponent,
    RecordTheInspectionDateInTheTechnicalReportNewComponent,
    RecordTheInspectionDateInTheTechnicalReportEditComponent,
    RecordTheInspectionDateInTheTechnicalReportViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RecordTheInspectionDateInTheTechnicalReportRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RecordTheInspectionDateInTheTechnicalReportService,
    RecordTheInspectionDateInTheTechnicalReportGuard
  ],
  entryComponents: [
    RecordTheInspectionDateInTheTechnicalReportNewComponent,
    RecordTheInspectionDateInTheTechnicalReportEditComponent,
    RecordTheInspectionDateInTheTechnicalReportViewComponent
  ]
})

export class RecordTheInspectionDateInTheTechnicalReportModule {
}
