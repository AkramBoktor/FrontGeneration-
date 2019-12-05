import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RecordThePositionOfNeedToBeRemovedListComponent } from './record-the-position-of-need-to-be-removed-list/record-the-position-of-need-to-be-removed-list.component';
import { RecordThePositionOfNeedToBeRemovedEditComponent } from './record-the-position-of-need-to-be-removed-edit/record-the-position-of-need-to-be-removed-edit.component';
import { RecordThePositionOfNeedToBeRemovedNewComponent } from './record-the-position-of-need-to-be-removed-new/record-the-position-of-need-to-be-removed-new.component';
import { RecordThePositionOfNeedToBeRemovedViewComponent } from './record-the-position-of-need-to-be-removed-view/record-the-position-of-need-to-be-removed-view.component';
import { RecordThePositionOfNeedToBeRemovedRoutingModule } from './record-the-position-of-need-to-be-removed.routing.module';
import { RecordThePositionOfNeedToBeRemovedService } from './shared/record-the-position-of-need-to-be-removed.service';
import { RecordThePositionOfNeedToBeRemovedGuard } from './shared/record-the-position-of-need-to-be-removed.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RecordThePositionOfNeedToBeRemovedListComponent,
    RecordThePositionOfNeedToBeRemovedNewComponent,
    RecordThePositionOfNeedToBeRemovedEditComponent,
    RecordThePositionOfNeedToBeRemovedViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RecordThePositionOfNeedToBeRemovedRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RecordThePositionOfNeedToBeRemovedService,
    RecordThePositionOfNeedToBeRemovedGuard
  ],
  entryComponents: [
    RecordThePositionOfNeedToBeRemovedNewComponent,
    RecordThePositionOfNeedToBeRemovedEditComponent,
    RecordThePositionOfNeedToBeRemovedViewComponent
  ]
})

export class RecordThePositionOfNeedToBeRemovedModule {
}
