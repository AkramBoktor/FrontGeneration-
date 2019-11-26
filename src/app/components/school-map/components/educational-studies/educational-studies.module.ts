import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EducationalStudiesListComponent } from './educational-studies-list/educational-studies-list.component';
import { EducationalStudiesEditComponent } from './educational-studies-edit/educational-studies-edit.component';
import { EducationalStudiesNewComponent } from './educational-studies-new/educational-studies-new.component';
import { EducationalStudiesViewComponent } from './educational-studies-view/educational-studies-view.component';
import { EducationalStudiesRoutingModule } from './educational-studies.routing.module';
import { EducationalStudiesService } from './shared/educational-studies.service';
import { EducationalStudiesGuard } from './shared/educational-studies.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EducationalStudiesListComponent,
    EducationalStudiesNewComponent,
    EducationalStudiesEditComponent,
    EducationalStudiesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EducationalStudiesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EducationalStudiesService,
    EducationalStudiesGuard
  ],
  entryComponents: [
    EducationalStudiesNewComponent,
    EducationalStudiesEditComponent,
    EducationalStudiesViewComponent
  ]
})

export class EducationalStudiesModule {
}
