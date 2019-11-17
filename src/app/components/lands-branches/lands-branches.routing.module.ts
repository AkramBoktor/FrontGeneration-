import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandsBranchesComponent } from './lands-branches.component';


const routes: Routes = [
  {
    path: '',
    component: LandsBranchesComponent,
  },
  // {
    // path: 'recording-the-position-of-receiving-a-space-land',
    // loadChildren: './components/recording-the-position-of-receiving-a-space-land/recording-the-position-of-receiving-a-space-land.module#RecordingThePositionOfReceivingASpaceLandModule',
    // // canActivate: [AuthGuard],
  // },

  // {
    // path: 'statements-by-the-audit-committee',
    // loadChildren: './components/statements-by-the-audit-committee/statements-by-the-audit-committee.module#StatementsByTheAuditCommitteeModule',
    // // canActivate: [AuthGuard],
  // },
  // {
    // path: 'preview-notes-data', loadChildren: './components/preview-notes-data/preview-notes-data.module#PreviewNotesDataModule',
    // // canActivate: [AuthGuard],
  // },

  // {
    // path: 'public-site-boundary-data', loadChildren: './components/public-site-boundary-data/public-site-boundary-data.module#PublicSiteBoundaryDataModule',
    // // canActivate: [AuthGuard],
  // },

  // {
    // path: 'barrier-data-for-the-plot-of-land', loadChildren: './components/barrier-data-for-the-plot-of-land/barrier-data-for-the-plot-of-land.module#BarrierDataForThePlotOfLandModule',
    // // canActivate: [AuthGuard],
  // },

  // {
    // path: 'basic-data-of-the-plot', loadChildren: './components/basic-data-of-the-plot/basic-data-of-the-plot.module#BasicDataOfThePlotModule',
    // // canActivate: [AuthGuard],
  // },

  // {
    // path: 'committees-formation-data', loadChildren: './components/committees-formation-data/committees-formation-data.module#CommitteesFormationDataModule',
    // // canActivate: [AuthGuard],
  // },

  // {
    // path: 'data-of-facilities-and-their-distance-from-the-general-location',
    // loadChildren: './components/data-of-facilities-and-their-distance-from-the-general-location/data-of-facilities-and-their-distance-from-the-general-location.module#DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationModule',
    // // canActivate: [AuthGuard],
  // },

  // {
    // path: 'data-of-the-land-series-in-legal-affairs',
    // loadChildren: './components/data-of-the-land-series-in-legal-affairs/data-of-the-land-series-in-legal-affairs.module#DataOfTheLandSeriesInLegalAffairsModule',
    // // canActivate: [AuthGuard],
  // },

  // {
    // path: 'document-data', loadChildren: './components/document-data/document-data.module#DocumentDataModule',
    // // canActivate: [AuthGuard],
  // },

  // {
    // path: 'land-allocation-decision-data', loadChildren: './components/land-allocation-decision-data/land-allocation-decision-data.module#LandAllocationDecisionDataModule',
    // // canActivate: [AuthGuard],
  // },

  // {
    // path: 'land-assignment-data-for-lifting-and-inspection-committees',
    // loadChildren: './components/land-assignment-data-for-lifting-and-inspection-committees/land-assignment-data-for-lifting-and-inspection-committees.module#LandAssignmentDataForLiftingAndInspectionCommitteesModule',
    // // canActivate: [AuthGuard],
  // },

  // {
    // path: 'network-budget-data', loadChildren: './components/network-budget-data/network-budget-data.module#NetworkBudgetDataModule',
    // // canActivate: [AuthGuard],
  // },

  // {
    // path: 'network-budget-observations-data', loadChildren: './components/network-budget-observations-data/network-budget-observations-data.module#NetworkBudgetObservationsDataModule',
    // // canActivate: [AuthGuard],
  // },


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LandsBranchesRoutingModule {
}
