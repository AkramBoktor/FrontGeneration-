import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ImplementationActivityScheduleListComponent } from './implementation-activity-schedule-list/implementation-activity-schedule-list.component';
import { ImplementationActivityScheduleEditComponent } from './implementation-activity-schedule-edit/implementation-activity-schedule-edit.component';
import { ImplementationActivityScheduleNewComponent } from './implementation-activity-schedule-new/implementation-activity-schedule-new.component';
import { ImplementationActivityScheduleViewComponent } from './implementation-activity-schedule-view/implementation-activity-schedule-view.component';
import { ImplementationActivityScheduleRoutingModule } from './implementation-activity-schedule.routing.module';
import { ImplementationActivityScheduleService } from './shared/implementation-activity-schedule.service';
import { ImplementationActivityScheduleGuard } from './shared/implementation-activity-schedule.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ImplementationActivityScheduleListComponent,
    ImplementationActivityScheduleNewComponent,
    ImplementationActivityScheduleEditComponent,
    ImplementationActivityScheduleViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ImplementationActivityScheduleRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ImplementationActivityScheduleService,
    ImplementationActivityScheduleGuard
  ],
  entryComponents: [
    ImplementationActivityScheduleNewComponent,
    ImplementationActivityScheduleEditComponent,
    ImplementationActivityScheduleViewComponent
  ]
})

export class ImplementationActivityScheduleModule {
}
