import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LandAssignmentDataForLiftingAndInspectionCommitteesGuard } from './shared/land-assignment-data-for-lifting-and-inspection-committees.guard';
import { LandAssignmentDataForLiftingAndInspectionCommitteesNewComponent } from './land-assignment-data-for-lifting-and-inspection-committees-new/land-assignment-data-for-lifting-and-inspection-committees-new.component';
import { LandAssignmentDataForLiftingAndInspectionCommitteesEditComponent } from './land-assignment-data-for-lifting-and-inspection-committees-edit/land-assignment-data-for-lifting-and-inspection-committees-edit.component';
import { LandAssignmentDataForLiftingAndInspectionCommitteesListComponent } from './land-assignment-data-for-lifting-and-inspection-committees-list/land-assignment-data-for-lifting-and-inspection-committees-list.component';
import { LandAssignmentDataForLiftingAndInspectionCommitteesViewComponent } from './land-assignment-data-for-lifting-and-inspection-committees-view/land-assignment-data-for-lifting-and-inspection-committees-view.component';

const routes: Routes = [
  {
    path: '',
    component: LandAssignmentDataForLiftingAndInspectionCommitteesListComponent,
    canActivate: [LandAssignmentDataForLiftingAndInspectionCommitteesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: LandAssignmentDataForLiftingAndInspectionCommitteesNewComponent,
    canActivate: [LandAssignmentDataForLiftingAndInspectionCommitteesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: LandAssignmentDataForLiftingAndInspectionCommitteesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: LandAssignmentDataForLiftingAndInspectionCommitteesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: LandAssignmentDataForLiftingAndInspectionCommitteesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LandAssignmentDataForLiftingAndInspectionCommitteesRoutingModule {
}
