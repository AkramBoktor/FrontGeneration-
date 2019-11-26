import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ImplementationDataScheduleListComponent } from './implementation-data-schedule-list/implementation-data-schedule-list.component';
import { ImplementationDataScheduleEditComponent } from './implementation-data-schedule-edit/implementation-data-schedule-edit.component';
import { ImplementationDataScheduleNewComponent } from './implementation-data-schedule-new/implementation-data-schedule-new.component';
import { ImplementationDataScheduleViewComponent } from './implementation-data-schedule-view/implementation-data-schedule-view.component';
import { ImplementationDataScheduleRoutingModule } from './implementation-data-schedule.routing.module';
import { ImplementationDataScheduleService } from './shared/implementation-data-schedule.service';
import { ImplementationDataScheduleGuard } from './shared/implementation-data-schedule.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ImplementationDataScheduleListComponent,
    ImplementationDataScheduleNewComponent,
    ImplementationDataScheduleEditComponent,
    ImplementationDataScheduleViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ImplementationDataScheduleRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ImplementationDataScheduleService,
    ImplementationDataScheduleGuard
  ],
  entryComponents: [
    ImplementationDataScheduleNewComponent,
    ImplementationDataScheduleEditComponent,
    ImplementationDataScheduleViewComponent
  ]
})

export class ImplementationDataScheduleModule {
}
