import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RecordingThePositionOfReceivingASpaceLandListComponent } from './recording-the-position-of-receiving-a-space-land-list/recording-the-position-of-receiving-a-space-land-list.component';
import { RecordingThePositionOfReceivingASpaceLandEditComponent } from './recording-the-position-of-receiving-a-space-land-edit/recording-the-position-of-receiving-a-space-land-edit.component';
import { RecordingThePositionOfReceivingASpaceLandNewComponent } from './recording-the-position-of-receiving-a-space-land-new/recording-the-position-of-receiving-a-space-land-new.component';
import { RecordingThePositionOfReceivingASpaceLandViewComponent } from './recording-the-position-of-receiving-a-space-land-view/recording-the-position-of-receiving-a-space-land-view.component';
import { RecordingThePositionOfReceivingASpaceLandRoutingModule } from './recording-the-position-of-receiving-a-space-land.routing.module';
import { RecordingThePositionOfReceivingASpaceLandService } from './shared/recording-the-position-of-receiving-a-space-land.service';
import { RecordingThePositionOfReceivingASpaceLandGuard } from './shared/recording-the-position-of-receiving-a-space-land.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RecordingThePositionOfReceivingASpaceLandListComponent,
    RecordingThePositionOfReceivingASpaceLandNewComponent,
    RecordingThePositionOfReceivingASpaceLandEditComponent,
    RecordingThePositionOfReceivingASpaceLandViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RecordingThePositionOfReceivingASpaceLandRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RecordingThePositionOfReceivingASpaceLandService,
    RecordingThePositionOfReceivingASpaceLandGuard
  ],
  entryComponents: [
    RecordingThePositionOfReceivingASpaceLandNewComponent,
    RecordingThePositionOfReceivingASpaceLandEditComponent,
    RecordingThePositionOfReceivingASpaceLandViewComponent
  ]
})

export class RecordingThePositionOfReceivingASpaceLandModule {
}
