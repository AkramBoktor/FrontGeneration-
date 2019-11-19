import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectNewComponent } from './project-new/project-new.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectRoutingModule } from './project.routing.module';
import { ProjectService } from './shared/project.service';
import { ProjectGuard } from './shared/project.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectNewComponent,
    ProjectEditComponent,
    ProjectViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ProjectRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ProjectService,
    ProjectGuard
  ],
  entryComponents: [
    ProjectNewComponent,
    ProjectEditComponent,
    ProjectViewComponent
  ]
})

export class ProjectModule {
}
