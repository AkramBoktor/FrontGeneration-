import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ProjectDataListComponent } from './project-data-list/project-data-list.component';
import { ProjectDataEditComponent } from './project-data-edit/project-data-edit.component';
import { ProjectDataNewComponent } from './project-data-new/project-data-new.component';
import { ProjectDataViewComponent } from './project-data-view/project-data-view.component';
import { ProjectDataRoutingModule } from './project-data.routing.module';
import { ProjectDataService } from './shared/project-data.service';
import { ProjectDataGuard } from './shared/project-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ProjectDataListComponent,
    ProjectDataNewComponent,
    ProjectDataEditComponent,
    ProjectDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ProjectDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ProjectDataService,
    ProjectDataGuard
  ],
  entryComponents: [
    ProjectDataNewComponent,
    ProjectDataEditComponent,
    ProjectDataViewComponent
  ]
})

export class ProjectDataModule {
}
