import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TypicalFinalExaminationCommitteeReportGuard } from './shared/typical-final-examination-committee-report.guard';
import { TypicalFinalExaminationCommitteeReportNewComponent } from './typical-final-examination-committee-report-new/typical-final-examination-committee-report-new.component';
import { TypicalFinalExaminationCommitteeReportEditComponent } from './typical-final-examination-committee-report-edit/typical-final-examination-committee-report-edit.component';
import { TypicalFinalExaminationCommitteeReportListComponent } from './typical-final-examination-committee-report-list/typical-final-examination-committee-report-list.component';
import { TypicalFinalExaminationCommitteeReportViewComponent } from './typical-final-examination-committee-report-view/typical-final-examination-committee-report-view.component';

const routes: Routes = [
  {
    path: '',
    component: TypicalFinalExaminationCommitteeReportListComponent,
    canActivate: [TypicalFinalExaminationCommitteeReportGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TypicalFinalExaminationCommitteeReportNewComponent,
    canActivate: [TypicalFinalExaminationCommitteeReportGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TypicalFinalExaminationCommitteeReportEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TypicalFinalExaminationCommitteeReportListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TypicalFinalExaminationCommitteeReportViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TypicalFinalExaminationCommitteeReportRoutingModule {
}
