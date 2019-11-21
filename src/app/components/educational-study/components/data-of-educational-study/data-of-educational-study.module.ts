import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataOfEducationalStudyListComponent } from './data-of-educational-study-list/data-of-educational-study-list.component';
import { DataOfEducationalStudyEditComponent } from './data-of-educational-study-edit/data-of-educational-study-edit.component';
import { DataOfEducationalStudyNewComponent } from './data-of-educational-study-new/data-of-educational-study-new.component';
import { DataOfEducationalStudyViewComponent } from './data-of-educational-study-view/data-of-educational-study-view.component';
import { DataOfEducationalStudyRoutingModule } from './data-of-educational-study.routing.module';
import { DataOfEducationalStudyService } from './shared/data-of-educational-study.service';
import { DataOfEducationalStudyGuard } from './shared/data-of-educational-study.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataOfEducationalStudyListComponent,
    DataOfEducationalStudyNewComponent,
    DataOfEducationalStudyEditComponent,
    DataOfEducationalStudyViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataOfEducationalStudyRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataOfEducationalStudyService,
    DataOfEducationalStudyGuard
  ],
  entryComponents: [
    DataOfEducationalStudyNewComponent,
    DataOfEducationalStudyEditComponent,
    DataOfEducationalStudyViewComponent
  ]
})

export class DataOfEducationalStudyModule {
}
