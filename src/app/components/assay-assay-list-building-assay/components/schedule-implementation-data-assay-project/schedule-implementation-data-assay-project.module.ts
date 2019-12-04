import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ScheduleImplementationDataAssayProjectListComponent } from './schedule-implementation-data-assay-project-list/schedule-implementation-data-assay-project-list.component';
import { ScheduleImplementationDataAssayProjectEditComponent } from './schedule-implementation-data-assay-project-edit/schedule-implementation-data-assay-project-edit.component';
import { ScheduleImplementationDataAssayProjectNewComponent } from './schedule-implementation-data-assay-project-new/schedule-implementation-data-assay-project-new.component';
import { ScheduleImplementationDataAssayProjectViewComponent } from './schedule-implementation-data-assay-project-view/schedule-implementation-data-assay-project-view.component';
import { ScheduleImplementationDataAssayProjectRoutingModule } from './schedule-implementation-data-assay-project.routing.module';
import { ScheduleImplementationDataAssayProjectService } from './shared/schedule-implementation-data-assay-project.service';
import { ScheduleImplementationDataAssayProjectGuard } from './shared/schedule-implementation-data-assay-project.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ScheduleImplementationDataAssayProjectListComponent,
    ScheduleImplementationDataAssayProjectNewComponent,
    ScheduleImplementationDataAssayProjectEditComponent,
    ScheduleImplementationDataAssayProjectViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ScheduleImplementationDataAssayProjectRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ScheduleImplementationDataAssayProjectService,
    ScheduleImplementationDataAssayProjectGuard
  ],
  entryComponents: [
    ScheduleImplementationDataAssayProjectNewComponent,
    ScheduleImplementationDataAssayProjectEditComponent,
    ScheduleImplementationDataAssayProjectViewComponent
  ]
})

export class ScheduleImplementationDataAssayProjectModule {
}
