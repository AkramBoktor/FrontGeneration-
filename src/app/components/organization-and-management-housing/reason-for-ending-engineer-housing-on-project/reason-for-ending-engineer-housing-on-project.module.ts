import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ReasonForEndingEngineerHousingOnProjectListComponent } from './reason-for-ending-engineer-housing-on-project-list/reason-for-ending-engineer-housing-on-project-list.component';
import { ReasonForEndingEngineerHousingOnProjectEditComponent } from './reason-for-ending-engineer-housing-on-project-edit/reason-for-ending-engineer-housing-on-project-edit.component';
import { ReasonForEndingEngineerHousingOnProjectNewComponent } from './reason-for-ending-engineer-housing-on-project-new/reason-for-ending-engineer-housing-on-project-new.component';
import { ReasonForEndingEngineerHousingOnProjectViewComponent } from './reason-for-ending-engineer-housing-on-project-view/reason-for-ending-engineer-housing-on-project-view.component';
import { ReasonForEndingEngineerHousingOnProjectRoutingModule } from './reason-for-ending-engineer-housing-on-project.routing.module';
import { ReasonForEndingEngineerHousingOnProjectService } from './shared/reason-for-ending-engineer-housing-on-project.service';
import { ReasonForEndingEngineerHousingOnProjectGuard } from './shared/reason-for-ending-engineer-housing-on-project.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ReasonForEndingEngineerHousingOnProjectListComponent,
    ReasonForEndingEngineerHousingOnProjectNewComponent,
    ReasonForEndingEngineerHousingOnProjectEditComponent,
    ReasonForEndingEngineerHousingOnProjectViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ReasonForEndingEngineerHousingOnProjectRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ReasonForEndingEngineerHousingOnProjectService,
    ReasonForEndingEngineerHousingOnProjectGuard
  ],
  entryComponents: [
    ReasonForEndingEngineerHousingOnProjectNewComponent,
    ReasonForEndingEngineerHousingOnProjectEditComponent,
    ReasonForEndingEngineerHousingOnProjectViewComponent
  ]
})

export class ReasonForEndingEngineerHousingOnProjectModule {
}
