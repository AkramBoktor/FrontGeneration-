import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AdditionalMissionListComponent } from './additional-mission-list/additional-mission-list.component';
import { AdditionalMissionEditComponent } from './additional-mission-edit/additional-mission-edit.component';
import { AdditionalMissionNewComponent } from './additional-mission-new/additional-mission-new.component';
import { AdditionalMissionViewComponent } from './additional-mission-view/additional-mission-view.component';
import { AdditionalMissionRoutingModule } from './additional-mission.routing.module';
import { AdditionalMissionService } from './shared/additional-mission.service';
import { AdditionalMissionGuard } from './shared/additional-mission.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AdditionalMissionListComponent,
    AdditionalMissionNewComponent,
    AdditionalMissionEditComponent,
    AdditionalMissionViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AdditionalMissionRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AdditionalMissionService,
    AdditionalMissionGuard
  ],
  entryComponents: [
    AdditionalMissionNewComponent,
    AdditionalMissionEditComponent,
    AdditionalMissionViewComponent
  ]
})

export class AdditionalMissionModule {
}
