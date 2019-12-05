import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TimetableDataWithdrawnListComponent } from './timetable-data-withdrawn-list/timetable-data-withdrawn-list.component';
import { TimetableDataWithdrawnEditComponent } from './timetable-data-withdrawn-edit/timetable-data-withdrawn-edit.component';
import { TimetableDataWithdrawnNewComponent } from './timetable-data-withdrawn-new/timetable-data-withdrawn-new.component';
import { TimetableDataWithdrawnViewComponent } from './timetable-data-withdrawn-view/timetable-data-withdrawn-view.component';
import { TimetableDataWithdrawnRoutingModule } from './timetable-data-withdrawn.routing.module';
import { TimetableDataWithdrawnService } from './shared/timetable-data-withdrawn.service';
import { TimetableDataWithdrawnGuard } from './shared/timetable-data-withdrawn.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TimetableDataWithdrawnListComponent,
    TimetableDataWithdrawnNewComponent,
    TimetableDataWithdrawnEditComponent,
    TimetableDataWithdrawnViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TimetableDataWithdrawnRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TimetableDataWithdrawnService,
    TimetableDataWithdrawnGuard
  ],
  entryComponents: [
    TimetableDataWithdrawnNewComponent,
    TimetableDataWithdrawnEditComponent,
    TimetableDataWithdrawnViewComponent
  ]
})

export class TimetableDataWithdrawnModule {
}
