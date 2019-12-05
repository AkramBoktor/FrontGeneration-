import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TypicalFinalExaminationCommitteeReportListComponent } from './typical-final-examination-committee-report-list/typical-final-examination-committee-report-list.component';
import { TypicalFinalExaminationCommitteeReportEditComponent } from './typical-final-examination-committee-report-edit/typical-final-examination-committee-report-edit.component';
import { TypicalFinalExaminationCommitteeReportNewComponent } from './typical-final-examination-committee-report-new/typical-final-examination-committee-report-new.component';
import { TypicalFinalExaminationCommitteeReportViewComponent } from './typical-final-examination-committee-report-view/typical-final-examination-committee-report-view.component';
import { TypicalFinalExaminationCommitteeReportRoutingModule } from './typical-final-examination-committee-report.routing.module';
import { TypicalFinalExaminationCommitteeReportService } from './shared/typical-final-examination-committee-report.service';
import { TypicalFinalExaminationCommitteeReportGuard } from './shared/typical-final-examination-committee-report.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TypicalFinalExaminationCommitteeReportListComponent,
    TypicalFinalExaminationCommitteeReportNewComponent,
    TypicalFinalExaminationCommitteeReportEditComponent,
    TypicalFinalExaminationCommitteeReportViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TypicalFinalExaminationCommitteeReportRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TypicalFinalExaminationCommitteeReportService,
    TypicalFinalExaminationCommitteeReportGuard
  ],
  entryComponents: [
    TypicalFinalExaminationCommitteeReportNewComponent,
    TypicalFinalExaminationCommitteeReportEditComponent,
    TypicalFinalExaminationCommitteeReportViewComponent
  ]
})

export class TypicalFinalExaminationCommitteeReportModule {
}
