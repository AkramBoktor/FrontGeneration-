import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SummaryOfTechnicalReportListComponent } from './summary-of-technical-report-list/summary-of-technical-report-list.component';
import { SummaryOfTechnicalReportEditComponent } from './summary-of-technical-report-edit/summary-of-technical-report-edit.component';
import { SummaryOfTechnicalReportNewComponent } from './summary-of-technical-report-new/summary-of-technical-report-new.component';
import { SummaryOfTechnicalReportViewComponent } from './summary-of-technical-report-view/summary-of-technical-report-view.component';
import { SummaryOfTechnicalReportRoutingModule } from './summary-of-technical-report.routing.module';
import { SummaryOfTechnicalReportService } from './shared/summary-of-technical-report.service';
import { SummaryOfTechnicalReportGuard } from './shared/summary-of-technical-report.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SummaryOfTechnicalReportListComponent,
    SummaryOfTechnicalReportNewComponent,
    SummaryOfTechnicalReportEditComponent,
    SummaryOfTechnicalReportViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SummaryOfTechnicalReportRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SummaryOfTechnicalReportService,
    SummaryOfTechnicalReportGuard
  ],
  entryComponents: [
    SummaryOfTechnicalReportNewComponent,
    SummaryOfTechnicalReportEditComponent,
    SummaryOfTechnicalReportViewComponent
  ]
})

export class SummaryOfTechnicalReportModule {
}
