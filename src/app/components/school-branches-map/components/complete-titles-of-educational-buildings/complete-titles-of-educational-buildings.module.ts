import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CompleteTitlesOfEducationalBuildingsListComponent } from './complete-titles-of-educational-buildings-list/complete-titles-of-educational-buildings-list.component';
import { CompleteTitlesOfEducationalBuildingsEditComponent } from './complete-titles-of-educational-buildings-edit/complete-titles-of-educational-buildings-edit.component';
import { CompleteTitlesOfEducationalBuildingsNewComponent } from './complete-titles-of-educational-buildings-new/complete-titles-of-educational-buildings-new.component';
import { CompleteTitlesOfEducationalBuildingsViewComponent } from './complete-titles-of-educational-buildings-view/complete-titles-of-educational-buildings-view.component';
import { CompleteTitlesOfEducationalBuildingsRoutingModule } from './complete-titles-of-educational-buildings.routing.module';
import { CompleteTitlesOfEducationalBuildingsService } from './shared/complete-titles-of-educational-buildings.service';
import { CompleteTitlesOfEducationalBuildingsGuard } from './shared/complete-titles-of-educational-buildings.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CompleteTitlesOfEducationalBuildingsListComponent,
    CompleteTitlesOfEducationalBuildingsNewComponent,
    CompleteTitlesOfEducationalBuildingsEditComponent,
    CompleteTitlesOfEducationalBuildingsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CompleteTitlesOfEducationalBuildingsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CompleteTitlesOfEducationalBuildingsService,
    CompleteTitlesOfEducationalBuildingsGuard
  ],
  entryComponents: [
    CompleteTitlesOfEducationalBuildingsNewComponent,
    CompleteTitlesOfEducationalBuildingsEditComponent,
    CompleteTitlesOfEducationalBuildingsViewComponent
  ]
})

export class CompleteTitlesOfEducationalBuildingsModule {
}
