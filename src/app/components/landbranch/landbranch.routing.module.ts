
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LandBranchComponent } from './landbranch.component';


const routes: Routes = [
  {
    path: '',
    component: LandBranchComponent,
  },
  
  
{
    path: 'land-allocation-decision-data', loadChildren: './components/land-allocation-decision-data/land-allocation-decision-data.module#LandAllocationDecisionDataModule',
    data: {
      moduleName: 'LandAllocationDecisionData'
    },
},

{
    path: 'basic-data-of-the-plot', loadChildren: './components/basic-data-of-the-plot/basic-data-of-the-plot.module#BasicDataOfThePlotModule',
    data: {
      moduleName: 'BasicDataOfThePlot'
    },
},

{
    path: 'committees-formation-data', loadChildren: './components/committees-formation-data/committees-formation-data.module#CommitteesFormationDataModule',
    data: {
      moduleName: 'CommitteesFormationData'
    },
},

{
    path: 'data-of-facilities-and-their-distance-from-the-general-location', loadChildren: './components/data-of-facilities-and-their-distance-from-the-general-location/data-of-facilities-and-their-distance-from-the-general-location.module#DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationModule',
    data: {
      moduleName: 'DataOfFacilitiesAndTheirDistanceFromTheGeneralLocation'
    },
},

{
    path: 'data-of-the-land-series-in-legal-affairs', loadChildren: './components/data-of-the-land-series-in-legal-affairs/data-of-the-land-series-in-legal-affairs.module#DataOfTheLandSeriesInLegalAffairsModule',
    data: {
      moduleName: 'DataOfTheLandSeriesInLegalAffairs'
    },
},

{
    path: 'land-assignment-data-for-lifting-and-inspection-committees', loadChildren: './components/land-assignment-data-for-lifting-and-inspection-committees/land-assignment-data-for-lifting-and-inspection-committees.module#LandAssignmentDataForLiftingAndInspectionCommitteesModule',
    data: {
      moduleName: 'LandAssignmentDataForLiftingAndInspectionCommittees'
    },
},

{
    path: 'network-budget-data', loadChildren: './components/network-budget-data/network-budget-data.module#NetworkBudgetDataModule',
    data: {
      moduleName: 'NetworkBudgetData'
    },
},

{
    path: 'network-budget-observations-data', loadChildren: './components/network-budget-observations-data/network-budget-observations-data.module#NetworkBudgetObservationsDataModule',
    data: {
      moduleName: 'NetworkBudgetObservationsData'
    },
},

{
    path: 'preview-notes-data', loadChildren: './components/preview-notes-data/preview-notes-data.module#PreviewNotesDataModule',
    data: {
      moduleName: 'PreviewNotesData'
    },
},

{
    path: 'public-site-boundary-data', loadChildren: './components/public-site-boundary-data/public-site-boundary-data.module#PublicSiteBoundaryDataModule',
    data: {
      moduleName: 'PublicSiteBoundaryData'
    },
},

{
    path: 'recording-the-position-of-receiving-a-space-land', loadChildren: './components/recording-the-position-of-receiving-a-space-land/recording-the-position-of-receiving-a-space-land.module#RecordingThePositionOfReceivingASpaceLandModule',
    data: {
      moduleName: 'RecordingThePositionOfReceivingASpaceLand'
    },
},

{
    path: 'statements-by-the-audit-committee', loadChildren: './components/statements-by-the-audit-committee/statements-by-the-audit-committee.module#StatementsByTheAuditCommitteeModule',
    data: {
      moduleName: 'StatementsByTheAuditCommittee'
    },
},

{
    path: 'barrier-data-for-the-plot-of-land', loadChildren: './components/barrier-data-for-the-plot-of-land/barrier-data-for-the-plot-of-land.module#BarrierDataForThePlotOfLandModule',
    data: {
      moduleName: 'BarrierDataForThePlotOfLand'
    },
},

{
    path: 'document-data', loadChildren: './components/document-data/document-data.module#DocumentDataModule',
    data: {
      moduleName: 'DocumentData'
    },
},

  
  
  
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LandBranchRoutingModule {
}

