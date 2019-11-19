import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { JobPlacementForAnExecutiveEngineerWithoutAProjectListComponent } from './job-placement-for-an-executive-engineer-without-a-project-list/job-placement-for-an-executive-engineer-without-a-project-list.component';
import { JobPlacementForAnExecutiveEngineerWithoutAProjectEditComponent } from './job-placement-for-an-executive-engineer-without-a-project-edit/job-placement-for-an-executive-engineer-without-a-project-edit.component';
import { JobPlacementForAnExecutiveEngineerWithoutAProjectNewComponent } from './job-placement-for-an-executive-engineer-without-a-project-new/job-placement-for-an-executive-engineer-without-a-project-new.component';
import { JobPlacementForAnExecutiveEngineerWithoutAProjectViewComponent } from './job-placement-for-an-executive-engineer-without-a-project-view/job-placement-for-an-executive-engineer-without-a-project-view.component';
import { JobPlacementForAnExecutiveEngineerWithoutAProjectRoutingModule } from './job-placement-for-an-executive-engineer-without-a-project.routing.module';
import { JobPlacementForAnExecutiveEngineerWithoutAProjectService } from './shared/job-placement-for-an-executive-engineer-without-a-project.service';
import { JobPlacementForAnExecutiveEngineerWithoutAProjectGuard } from './shared/job-placement-for-an-executive-engineer-without-a-project.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    JobPlacementForAnExecutiveEngineerWithoutAProjectListComponent,
    JobPlacementForAnExecutiveEngineerWithoutAProjectNewComponent,
    JobPlacementForAnExecutiveEngineerWithoutAProjectEditComponent,
    JobPlacementForAnExecutiveEngineerWithoutAProjectViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    JobPlacementForAnExecutiveEngineerWithoutAProjectRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    JobPlacementForAnExecutiveEngineerWithoutAProjectService,
    JobPlacementForAnExecutiveEngineerWithoutAProjectGuard
  ],
  entryComponents: [
    JobPlacementForAnExecutiveEngineerWithoutAProjectNewComponent,
    JobPlacementForAnExecutiveEngineerWithoutAProjectEditComponent,
    JobPlacementForAnExecutiveEngineerWithoutAProjectViewComponent
  ]
})

export class JobPlacementForAnExecutiveEngineerWithoutAProjectModule {
}
