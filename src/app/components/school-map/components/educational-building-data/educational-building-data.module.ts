import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EducationalBuildingDataListComponent } from './educational-building-data-list/educational-building-data-list.component';
import { EducationalBuildingDataEditComponent } from './educational-building-data-edit/educational-building-data-edit.component';
import { EducationalBuildingDataNewComponent } from './educational-building-data-new/educational-building-data-new.component';
import { EducationalBuildingDataViewComponent } from './educational-building-data-view/educational-building-data-view.component';
import { EducationalBuildingDataRoutingModule } from './educational-building-data.routing.module';
import { EducationalBuildingDataService } from './shared/educational-building-data.service';
import { EducationalBuildingDataGuard } from './shared/educational-building-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EducationalBuildingDataListComponent,
    EducationalBuildingDataNewComponent,
    EducationalBuildingDataEditComponent,
    EducationalBuildingDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EducationalBuildingDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EducationalBuildingDataService,
    EducationalBuildingDataGuard
  ],
  entryComponents: [
    EducationalBuildingDataNewComponent,
    EducationalBuildingDataEditComponent,
    EducationalBuildingDataViewComponent
  ]
})

export class EducationalBuildingDataModule {
}
