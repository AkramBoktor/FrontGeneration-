import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesListComponent } from './follow-up-the-supply-of-certain-items-at-the-level-of-branches-list/follow-up-the-supply-of-certain-items-at-the-level-of-branches-list.component';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesEditComponent } from './follow-up-the-supply-of-certain-items-at-the-level-of-branches-edit/follow-up-the-supply-of-certain-items-at-the-level-of-branches-edit.component';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesNewComponent } from './follow-up-the-supply-of-certain-items-at-the-level-of-branches-new/follow-up-the-supply-of-certain-items-at-the-level-of-branches-new.component';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesViewComponent } from './follow-up-the-supply-of-certain-items-at-the-level-of-branches-view/follow-up-the-supply-of-certain-items-at-the-level-of-branches-view.component';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesRoutingModule } from './follow-up-the-supply-of-certain-items-at-the-level-of-branches.routing.module';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesService } from './shared/follow-up-the-supply-of-certain-items-at-the-level-of-branches.service';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesGuard } from './shared/follow-up-the-supply-of-certain-items-at-the-level-of-branches.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesListComponent,
    FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesNewComponent,
    FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesEditComponent,
    FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesService,
    FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesGuard
  ],
  entryComponents: [
    FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesNewComponent,
    FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesEditComponent,
    FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesViewComponent
  ]
})

export class FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesModule {
}
