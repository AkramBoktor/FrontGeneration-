import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { FollowupDataOnTheSaleOfLandListComponent } from './followup-data-on-the-sale-of-land-list/followup-data-on-the-sale-of-land-list.component';
import { FollowupDataOnTheSaleOfLandEditComponent } from './followup-data-on-the-sale-of-land-edit/followup-data-on-the-sale-of-land-edit.component';
import { FollowupDataOnTheSaleOfLandNewComponent } from './followup-data-on-the-sale-of-land-new/followup-data-on-the-sale-of-land-new.component';
import { FollowupDataOnTheSaleOfLandViewComponent } from './followup-data-on-the-sale-of-land-view/followup-data-on-the-sale-of-land-view.component';
import { FollowupDataOnTheSaleOfLandRoutingModule } from './followup-data-on-the-sale-of-land.routing.module';
import { FollowupDataOnTheSaleOfLandService } from './shared/followup-data-on-the-sale-of-land.service';
import { FollowupDataOnTheSaleOfLandGuard } from './shared/followup-data-on-the-sale-of-land.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    FollowupDataOnTheSaleOfLandListComponent,
    FollowupDataOnTheSaleOfLandNewComponent,
    FollowupDataOnTheSaleOfLandEditComponent,
    FollowupDataOnTheSaleOfLandViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    FollowupDataOnTheSaleOfLandRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    FollowupDataOnTheSaleOfLandService,
    FollowupDataOnTheSaleOfLandGuard
  ],
  entryComponents: [
    FollowupDataOnTheSaleOfLandNewComponent,
    FollowupDataOnTheSaleOfLandEditComponent,
    FollowupDataOnTheSaleOfLandViewComponent
  ]
})

export class FollowupDataOnTheSaleOfLandModule {
}
