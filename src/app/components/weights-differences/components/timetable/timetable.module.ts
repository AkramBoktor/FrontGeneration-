import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TimetableListComponent } from './timetable-list/timetable-list.component';
import { TimetableEditComponent } from './timetable-edit/timetable-edit.component';
import { TimetableNewComponent } from './timetable-new/timetable-new.component';
import { TimetableViewComponent } from './timetable-view/timetable-view.component';
import { TimetableRoutingModule } from './timetable.routing.module';
import { TimetableService } from './shared/timetable.service';
import { TimetableGuard } from './shared/timetable.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TimetableListComponent,
    TimetableNewComponent,
    TimetableEditComponent,
    TimetableViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TimetableRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TimetableService,
    TimetableGuard
  ],
  entryComponents: [
    TimetableNewComponent,
    TimetableEditComponent,
    TimetableViewComponent
  ]
})

export class TimetableModule {
}
