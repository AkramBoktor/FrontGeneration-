import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RecordThePositionOfTheInternshipListComponent } from './record-the-position-of-the-internship-list/record-the-position-of-the-internship-list.component';
import { RecordThePositionOfTheInternshipEditComponent } from './record-the-position-of-the-internship-edit/record-the-position-of-the-internship-edit.component';
import { RecordThePositionOfTheInternshipNewComponent } from './record-the-position-of-the-internship-new/record-the-position-of-the-internship-new.component';
import { RecordThePositionOfTheInternshipViewComponent } from './record-the-position-of-the-internship-view/record-the-position-of-the-internship-view.component';
import { RecordThePositionOfTheInternshipRoutingModule } from './record-the-position-of-the-internship.routing.module';
import { RecordThePositionOfTheInternshipService } from './shared/record-the-position-of-the-internship.service';
import { RecordThePositionOfTheInternshipGuard } from './shared/record-the-position-of-the-internship.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RecordThePositionOfTheInternshipListComponent,
    RecordThePositionOfTheInternshipNewComponent,
    RecordThePositionOfTheInternshipEditComponent,
    RecordThePositionOfTheInternshipViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RecordThePositionOfTheInternshipRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RecordThePositionOfTheInternshipService,
    RecordThePositionOfTheInternshipGuard
  ],
  entryComponents: [
    RecordThePositionOfTheInternshipNewComponent,
    RecordThePositionOfTheInternshipEditComponent,
    RecordThePositionOfTheInternshipViewComponent
  ]
})

export class RecordThePositionOfTheInternshipModule {
}
