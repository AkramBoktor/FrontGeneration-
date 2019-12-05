import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ThePlannedStartDateForTheScheduleListComponent } from './the-planned-start-date-for-the-schedule-list/the-planned-start-date-for-the-schedule-list.component';
import { ThePlannedStartDateForTheScheduleEditComponent } from './the-planned-start-date-for-the-schedule-edit/the-planned-start-date-for-the-schedule-edit.component';
import { ThePlannedStartDateForTheScheduleNewComponent } from './the-planned-start-date-for-the-schedule-new/the-planned-start-date-for-the-schedule-new.component';
import { ThePlannedStartDateForTheScheduleViewComponent } from './the-planned-start-date-for-the-schedule-view/the-planned-start-date-for-the-schedule-view.component';
import { ThePlannedStartDateForTheScheduleRoutingModule } from './the-planned-start-date-for-the-schedule.routing.module';
import { ThePlannedStartDateForTheScheduleService } from './shared/the-planned-start-date-for-the-schedule.service';
import { ThePlannedStartDateForTheScheduleGuard } from './shared/the-planned-start-date-for-the-schedule.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ThePlannedStartDateForTheScheduleListComponent,
    ThePlannedStartDateForTheScheduleNewComponent,
    ThePlannedStartDateForTheScheduleEditComponent,
    ThePlannedStartDateForTheScheduleViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ThePlannedStartDateForTheScheduleRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ThePlannedStartDateForTheScheduleService,
    ThePlannedStartDateForTheScheduleGuard
  ],
  entryComponents: [
    ThePlannedStartDateForTheScheduleNewComponent,
    ThePlannedStartDateForTheScheduleEditComponent,
    ThePlannedStartDateForTheScheduleViewComponent
  ]
})

export class ThePlannedStartDateForTheScheduleModule {
}
