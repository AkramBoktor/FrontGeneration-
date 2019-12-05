
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BuildingInspectionAndValidityCertificateComponent } from './building-inspection-and-validity-certificate.component';


const routes: Routes = [
  {
    path: '',
    component: BuildingInspectionAndValidityCertificateComponent,
  },
  
{
    path: 'comment-on-photos-and-building-drawing', loadChildren: './components/comment-on-photos-and-building-drawing/comment-on-photos-and-building-drawing.module#CommentOnPhotosAndBuildingDrawingModule',
    data: {
      moduleName: 'CommentOnPhotosAndBuildingDrawing'
    },
},

{
    path: 'decision-of-the-director-of-the-commission', loadChildren: './components/decision-of-the-director-of-the-commission/decision-of-the-director-of-the-commission.module#DecisionOfTheDirectorOfTheCommissionModule',
    data: {
      moduleName: 'DecisionOfTheDirectorOfTheCommission'
    },
},

{
    path: 'examination-and-other-test', loadChildren: './components/examination-and-other-test/examination-and-other-test.module#ExaminationAndOtherTestModule',
    data: {
      moduleName: 'ExaminationAndOtherTest'
    },
},

{
    path: 'record-the-expectations-of-the-inspectors', loadChildren: './components/record-the-expectations-of-the-inspectors/record-the-expectations-of-the-inspectors.module#RecordTheExpectationsOfTheInspectorsModule',
    data: {
      moduleName: 'RecordTheExpectationsOfTheInspectors'
    },
},

{
    path: 'record-the-inspection-date-in-the-technical-report', loadChildren: './components/record-the-inspection-date-in-the-technical-report/record-the-inspection-date-in-the-technical-report.module#RecordTheInspectionDateInTheTechnicalReportModule',
    data: {
      moduleName: 'RecordTheInspectionDateInTheTechnicalReport'
    },
},

{
    path: 'report-on-the-resistance-of-reinforced-concrete', loadChildren: './components/report-on-the-resistance-of-reinforced-concrete/report-on-the-resistance-of-reinforced-concrete.module#ReportOnTheResistanceOfReinforcedConcreteModule',
    data: {
      moduleName: 'ReportOnTheResistanceOfReinforcedConcrete'
    },
},

{
    path: 'summary-of-technical-report', loadChildren: './components/summary-of-technical-report/summary-of-technical-report.module#SummaryOfTechnicalReportModule',
    data: {
      moduleName: 'SummaryOfTechnicalReport'
    },
},

{
    path: 'technical-opinion-of-consultant', loadChildren: './components/technical-opinion-of-consultant/technical-opinion-of-consultant.module#TechnicalOpinionOfConsultantModule',
    data: {
      moduleName: 'TechnicalOpinionOfConsultant'
    },
},

{
    path: 'building-validity-certificate', loadChildren: './components/building-validity-certificate/building-validity-certificate.module#BuildingValidityCertificateModule',
    data: {
      moduleName: 'BuildingValidityCertificate'
    },
},



];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BuildingInspectionAndValidityCertificateRoutingModule {
}

