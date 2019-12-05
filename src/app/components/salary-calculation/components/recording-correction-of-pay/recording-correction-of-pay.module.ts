import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RecordingCorrectionOfPayListComponent } from './recording-correction-of-pay-list/recording-correction-of-pay-list.component';
import { RecordingCorrectionOfPayEditComponent } from './recording-correction-of-pay-edit/recording-correction-of-pay-edit.component';
import { RecordingCorrectionOfPayNewComponent } from './recording-correction-of-pay-new/recording-correction-of-pay-new.component';
import { RecordingCorrectionOfPayViewComponent } from './recording-correction-of-pay-view/recording-correction-of-pay-view.component';
import { RecordingCorrectionOfPayRoutingModule } from './recording-correction-of-pay.routing.module';
import { RecordingCorrectionOfPayService } from './shared/recording-correction-of-pay.service';
import { RecordingCorrectionOfPayGuard } from './shared/recording-correction-of-pay.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RecordingCorrectionOfPayListComponent,
    RecordingCorrectionOfPayNewComponent,
    RecordingCorrectionOfPayEditComponent,
    RecordingCorrectionOfPayViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RecordingCorrectionOfPayRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RecordingCorrectionOfPayService,
    RecordingCorrectionOfPayGuard
  ],
  entryComponents: [
    RecordingCorrectionOfPayNewComponent,
    RecordingCorrectionOfPayEditComponent,
    RecordingCorrectionOfPayViewComponent
  ]
})

export class RecordingCorrectionOfPayModule {
}
