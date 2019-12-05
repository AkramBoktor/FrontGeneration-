import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { LandAssignmentDataForLiftingAndInspectionCommitteesListComponent } from './land-assignment-data-for-lifting-and-inspection-committees-list/land-assignment-data-for-lifting-and-inspection-committees-list.component';
import { LandAssignmentDataForLiftingAndInspectionCommitteesEditComponent } from './land-assignment-data-for-lifting-and-inspection-committees-edit/land-assignment-data-for-lifting-and-inspection-committees-edit.component';
import { LandAssignmentDataForLiftingAndInspectionCommitteesNewComponent } from './land-assignment-data-for-lifting-and-inspection-committees-new/land-assignment-data-for-lifting-and-inspection-committees-new.component';
import { LandAssignmentDataForLiftingAndInspectionCommitteesViewComponent } from './land-assignment-data-for-lifting-and-inspection-committees-view/land-assignment-data-for-lifting-and-inspection-committees-view.component';
import { LandAssignmentDataForLiftingAndInspectionCommitteesRoutingModule } from './land-assignment-data-for-lifting-and-inspection-committees.routing.module';
import { LandAssignmentDataForLiftingAndInspectionCommitteesService } from './shared/land-assignment-data-for-lifting-and-inspection-committees.service';
import { LandAssignmentDataForLiftingAndInspectionCommitteesGuard } from './shared/land-assignment-data-for-lifting-and-inspection-committees.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    LandAssignmentDataForLiftingAndInspectionCommitteesListComponent,
    LandAssignmentDataForLiftingAndInspectionCommitteesNewComponent,
    LandAssignmentDataForLiftingAndInspectionCommitteesEditComponent,
    LandAssignmentDataForLiftingAndInspectionCommitteesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    LandAssignmentDataForLiftingAndInspectionCommitteesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    LandAssignmentDataForLiftingAndInspectionCommitteesService,
    LandAssignmentDataForLiftingAndInspectionCommitteesGuard
  ],
  entryComponents: [
    LandAssignmentDataForLiftingAndInspectionCommitteesNewComponent,
    LandAssignmentDataForLiftingAndInspectionCommitteesEditComponent,
    LandAssignmentDataForLiftingAndInspectionCommitteesViewComponent
  ]
})

export class LandAssignmentDataForLiftingAndInspectionCommitteesModule {
}
