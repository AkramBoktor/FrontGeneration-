import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ScheduleAtTheBuildingLevelListComponent } from './schedule-at-the-building-level-list/schedule-at-the-building-level-list.component';
import { ScheduleAtTheBuildingLevelEditComponent } from './schedule-at-the-building-level-edit/schedule-at-the-building-level-edit.component';
import { ScheduleAtTheBuildingLevelNewComponent } from './schedule-at-the-building-level-new/schedule-at-the-building-level-new.component';
import { ScheduleAtTheBuildingLevelViewComponent } from './schedule-at-the-building-level-view/schedule-at-the-building-level-view.component';
import { ScheduleAtTheBuildingLevelRoutingModule } from './schedule-at-the-building-level.routing.module';
import { ScheduleAtTheBuildingLevelService } from './shared/schedule-at-the-building-level.service';
import { ScheduleAtTheBuildingLevelGuard } from './shared/schedule-at-the-building-level.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ScheduleAtTheBuildingLevelListComponent,
    ScheduleAtTheBuildingLevelNewComponent,
    ScheduleAtTheBuildingLevelEditComponent,
    ScheduleAtTheBuildingLevelViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ScheduleAtTheBuildingLevelRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ScheduleAtTheBuildingLevelService,
    ScheduleAtTheBuildingLevelGuard
  ],
  entryComponents: [
    ScheduleAtTheBuildingLevelNewComponent,
    ScheduleAtTheBuildingLevelEditComponent,
    ScheduleAtTheBuildingLevelViewComponent
  ]
})

export class ScheduleAtTheBuildingLevelModule {
}
