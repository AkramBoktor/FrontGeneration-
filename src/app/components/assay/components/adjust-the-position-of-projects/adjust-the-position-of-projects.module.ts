import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AdjustThePositionOfProjectsListComponent } from './adjust-the-position-of-projects-list/adjust-the-position-of-projects-list.component';
import { AdjustThePositionOfProjectsEditComponent } from './adjust-the-position-of-projects-edit/adjust-the-position-of-projects-edit.component';
import { AdjustThePositionOfProjectsNewComponent } from './adjust-the-position-of-projects-new/adjust-the-position-of-projects-new.component';
import { AdjustThePositionOfProjectsViewComponent } from './adjust-the-position-of-projects-view/adjust-the-position-of-projects-view.component';
import { AdjustThePositionOfProjectsRoutingModule } from './adjust-the-position-of-projects.routing.module';
import { AdjustThePositionOfProjectsService } from './shared/adjust-the-position-of-projects.service';
import { AdjustThePositionOfProjectsGuard } from './shared/adjust-the-position-of-projects.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AdjustThePositionOfProjectsListComponent,
    AdjustThePositionOfProjectsNewComponent,
    AdjustThePositionOfProjectsEditComponent,
    AdjustThePositionOfProjectsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AdjustThePositionOfProjectsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AdjustThePositionOfProjectsService,
    AdjustThePositionOfProjectsGuard
  ],
  entryComponents: [
    AdjustThePositionOfProjectsNewComponent,
    AdjustThePositionOfProjectsEditComponent,
    AdjustThePositionOfProjectsViewComponent
  ]
})

export class AdjustThePositionOfProjectsModule {
}
