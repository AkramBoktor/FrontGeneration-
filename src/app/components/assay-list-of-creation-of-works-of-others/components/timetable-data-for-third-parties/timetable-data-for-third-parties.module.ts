import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TimetableDataForThirdPartiesListComponent } from './timetable-data-for-third-parties-list/timetable-data-for-third-parties-list.component';
import { TimetableDataForThirdPartiesEditComponent } from './timetable-data-for-third-parties-edit/timetable-data-for-third-parties-edit.component';
import { TimetableDataForThirdPartiesNewComponent } from './timetable-data-for-third-parties-new/timetable-data-for-third-parties-new.component';
import { TimetableDataForThirdPartiesViewComponent } from './timetable-data-for-third-parties-view/timetable-data-for-third-parties-view.component';
import { TimetableDataForThirdPartiesRoutingModule } from './timetable-data-for-third-parties.routing.module';
import { TimetableDataForThirdPartiesService } from './shared/timetable-data-for-third-parties.service';
import { TimetableDataForThirdPartiesGuard } from './shared/timetable-data-for-third-parties.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TimetableDataForThirdPartiesListComponent,
    TimetableDataForThirdPartiesNewComponent,
    TimetableDataForThirdPartiesEditComponent,
    TimetableDataForThirdPartiesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TimetableDataForThirdPartiesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TimetableDataForThirdPartiesService,
    TimetableDataForThirdPartiesGuard
  ],
  entryComponents: [
    TimetableDataForThirdPartiesNewComponent,
    TimetableDataForThirdPartiesEditComponent,
    TimetableDataForThirdPartiesViewComponent
  ]
})

export class TimetableDataForThirdPartiesModule {
}
