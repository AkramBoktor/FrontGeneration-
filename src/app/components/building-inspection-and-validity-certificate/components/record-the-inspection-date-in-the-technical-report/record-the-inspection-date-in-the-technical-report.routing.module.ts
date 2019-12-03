import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RecordTheInspectionDateInTheTechnicalReportGuard } from './shared/record-the-inspection-date-in-the-technical-report.guard';
import { RecordTheInspectionDateInTheTechnicalReportNewComponent } from './record-the-inspection-date-in-the-technical-report-new/record-the-inspection-date-in-the-technical-report-new.component';
import { RecordTheInspectionDateInTheTechnicalReportEditComponent } from './record-the-inspection-date-in-the-technical-report-edit/record-the-inspection-date-in-the-technical-report-edit.component';
import { RecordTheInspectionDateInTheTechnicalReportListComponent } from './record-the-inspection-date-in-the-technical-report-list/record-the-inspection-date-in-the-technical-report-list.component';
import { RecordTheInspectionDateInTheTechnicalReportViewComponent } from './record-the-inspection-date-in-the-technical-report-view/record-the-inspection-date-in-the-technical-report-view.component';

const routes: Routes = [
  {
    path: '',
    component: RecordTheInspectionDateInTheTechnicalReportListComponent,
    canActivate: [RecordTheInspectionDateInTheTechnicalReportGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RecordTheInspectionDateInTheTechnicalReportNewComponent,
    canActivate: [RecordTheInspectionDateInTheTechnicalReportGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RecordTheInspectionDateInTheTechnicalReportEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RecordTheInspectionDateInTheTechnicalReportListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RecordTheInspectionDateInTheTechnicalReportViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RecordTheInspectionDateInTheTechnicalReportRoutingModule {
}
