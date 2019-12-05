import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { FollowUpDailyMaintenanceListComponent } from './follow-up-daily-maintenance-list/follow-up-daily-maintenance-list.component';
import { FollowUpDailyMaintenanceEditComponent } from './follow-up-daily-maintenance-edit/follow-up-daily-maintenance-edit.component';
import { FollowUpDailyMaintenanceNewComponent } from './follow-up-daily-maintenance-new/follow-up-daily-maintenance-new.component';
import { FollowUpDailyMaintenanceViewComponent } from './follow-up-daily-maintenance-view/follow-up-daily-maintenance-view.component';
import { FollowUpDailyMaintenanceRoutingModule } from './follow-up-daily-maintenance.routing.module';
import { FollowUpDailyMaintenanceService } from './shared/follow-up-daily-maintenance.service';
import { FollowUpDailyMaintenanceGuard } from './shared/follow-up-daily-maintenance.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    FollowUpDailyMaintenanceListComponent,
    FollowUpDailyMaintenanceNewComponent,
    FollowUpDailyMaintenanceEditComponent,
    FollowUpDailyMaintenanceViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    FollowUpDailyMaintenanceRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    FollowUpDailyMaintenanceService,
    FollowUpDailyMaintenanceGuard
  ],
  entryComponents: [
    FollowUpDailyMaintenanceNewComponent,
    FollowUpDailyMaintenanceEditComponent,
    FollowUpDailyMaintenanceViewComponent
  ]
})

export class FollowUpDailyMaintenanceModule {
}
