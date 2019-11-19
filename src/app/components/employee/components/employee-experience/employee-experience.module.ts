import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EmployeeExperienceEditComponent } from './employee-experience-edit/employee-experience-edit.component';
import { EmployeeExperienceListComponent } from './employee-experience-list/employee-experience-list.component';
import { EmployeeExperienceNewComponent } from './employee-experience-new/employee-experience-new.component';
import { EmployeeExperienceViewComponent } from './employee-experience-view/employee-experience-view.component';
import { EmployeeExperienceRoutingModule } from './employee-experience.routing.module';
import { EmployeeExperienceGuard } from './shared/employee-experience.guard';
import { EmployeeExperienceService } from './shared/employee-experience.service';

@NgModule({
  declarations: [
    EmployeeExperienceListComponent,
    EmployeeExperienceNewComponent,
    EmployeeExperienceEditComponent,
    EmployeeExperienceViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EmployeeExperienceRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EmployeeExperienceService,
    EmployeeExperienceGuard
  ],
  entryComponents: [
    EmployeeExperienceNewComponent,
    EmployeeExperienceEditComponent,
    EmployeeExperienceViewComponent
  ]
})

export class EmployeeExperienceModule {
}
