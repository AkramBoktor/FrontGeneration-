import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RecordTheExpectationsOfTheInspectorsListComponent } from './record-the-expectations-of-the-inspectors-list/record-the-expectations-of-the-inspectors-list.component';
import { RecordTheExpectationsOfTheInspectorsEditComponent } from './record-the-expectations-of-the-inspectors-edit/record-the-expectations-of-the-inspectors-edit.component';
import { RecordTheExpectationsOfTheInspectorsNewComponent } from './record-the-expectations-of-the-inspectors-new/record-the-expectations-of-the-inspectors-new.component';
import { RecordTheExpectationsOfTheInspectorsViewComponent } from './record-the-expectations-of-the-inspectors-view/record-the-expectations-of-the-inspectors-view.component';
import { RecordTheExpectationsOfTheInspectorsRoutingModule } from './record-the-expectations-of-the-inspectors.routing.module';
import { RecordTheExpectationsOfTheInspectorsService } from './shared/record-the-expectations-of-the-inspectors.service';
import { RecordTheExpectationsOfTheInspectorsGuard } from './shared/record-the-expectations-of-the-inspectors.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RecordTheExpectationsOfTheInspectorsListComponent,
    RecordTheExpectationsOfTheInspectorsNewComponent,
    RecordTheExpectationsOfTheInspectorsEditComponent,
    RecordTheExpectationsOfTheInspectorsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RecordTheExpectationsOfTheInspectorsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RecordTheExpectationsOfTheInspectorsService,
    RecordTheExpectationsOfTheInspectorsGuard
  ],
  entryComponents: [
    RecordTheExpectationsOfTheInspectorsNewComponent,
    RecordTheExpectationsOfTheInspectorsEditComponent,
    RecordTheExpectationsOfTheInspectorsViewComponent
  ]
})

export class RecordTheExpectationsOfTheInspectorsModule {
}
