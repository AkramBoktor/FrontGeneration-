import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SummaryOfTechnicalReportGuard } from './shared/summary-of-technical-report.guard';
import { SummaryOfTechnicalReportNewComponent } from './summary-of-technical-report-new/summary-of-technical-report-new.component';
import { SummaryOfTechnicalReportEditComponent } from './summary-of-technical-report-edit/summary-of-technical-report-edit.component';
import { SummaryOfTechnicalReportListComponent } from './summary-of-technical-report-list/summary-of-technical-report-list.component';
import { SummaryOfTechnicalReportViewComponent } from './summary-of-technical-report-view/summary-of-technical-report-view.component';

const routes: Routes = [
  {
    path: '',
    component: SummaryOfTechnicalReportListComponent,
    canActivate: [SummaryOfTechnicalReportGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SummaryOfTechnicalReportNewComponent,
    canActivate: [SummaryOfTechnicalReportGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SummaryOfTechnicalReportEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SummaryOfTechnicalReportListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SummaryOfTechnicalReportViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SummaryOfTechnicalReportRoutingModule {
}
