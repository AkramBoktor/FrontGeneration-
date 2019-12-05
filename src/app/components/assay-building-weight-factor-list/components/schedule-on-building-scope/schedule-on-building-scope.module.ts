import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ScheduleOnBuildingScopeListComponent } from './schedule-on-building-scope-list/schedule-on-building-scope-list.component';
import { ScheduleOnBuildingScopeEditComponent } from './schedule-on-building-scope-edit/schedule-on-building-scope-edit.component';
import { ScheduleOnBuildingScopeNewComponent } from './schedule-on-building-scope-new/schedule-on-building-scope-new.component';
import { ScheduleOnBuildingScopeViewComponent } from './schedule-on-building-scope-view/schedule-on-building-scope-view.component';
import { ScheduleOnBuildingScopeRoutingModule } from './schedule-on-building-scope.routing.module';
import { ScheduleOnBuildingScopeService } from './shared/schedule-on-building-scope.service';
import { ScheduleOnBuildingScopeGuard } from './shared/schedule-on-building-scope.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ScheduleOnBuildingScopeListComponent,
    ScheduleOnBuildingScopeNewComponent,
    ScheduleOnBuildingScopeEditComponent,
    ScheduleOnBuildingScopeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ScheduleOnBuildingScopeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ScheduleOnBuildingScopeService,
    ScheduleOnBuildingScopeGuard
  ],
  entryComponents: [
    ScheduleOnBuildingScopeNewComponent,
    ScheduleOnBuildingScopeEditComponent,
    ScheduleOnBuildingScopeViewComponent
  ]
})

export class ScheduleOnBuildingScopeModule {
}
