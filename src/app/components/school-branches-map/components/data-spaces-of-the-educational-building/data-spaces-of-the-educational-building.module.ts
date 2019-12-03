import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataSpacesOfTheEducationalBuildingListComponent } from './data-spaces-of-the-educational-building-list/data-spaces-of-the-educational-building-list.component';
import { DataSpacesOfTheEducationalBuildingEditComponent } from './data-spaces-of-the-educational-building-edit/data-spaces-of-the-educational-building-edit.component';
import { DataSpacesOfTheEducationalBuildingNewComponent } from './data-spaces-of-the-educational-building-new/data-spaces-of-the-educational-building-new.component';
import { DataSpacesOfTheEducationalBuildingViewComponent } from './data-spaces-of-the-educational-building-view/data-spaces-of-the-educational-building-view.component';
import { DataSpacesOfTheEducationalBuildingRoutingModule } from './data-spaces-of-the-educational-building.routing.module';
import { DataSpacesOfTheEducationalBuildingService } from './shared/data-spaces-of-the-educational-building.service';
import { DataSpacesOfTheEducationalBuildingGuard } from './shared/data-spaces-of-the-educational-building.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataSpacesOfTheEducationalBuildingListComponent,
    DataSpacesOfTheEducationalBuildingNewComponent,
    DataSpacesOfTheEducationalBuildingEditComponent,
    DataSpacesOfTheEducationalBuildingViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataSpacesOfTheEducationalBuildingRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataSpacesOfTheEducationalBuildingService,
    DataSpacesOfTheEducationalBuildingGuard
  ],
  entryComponents: [
    DataSpacesOfTheEducationalBuildingNewComponent,
    DataSpacesOfTheEducationalBuildingEditComponent,
    DataSpacesOfTheEducationalBuildingViewComponent
  ]
})

export class DataSpacesOfTheEducationalBuildingModule {
}
