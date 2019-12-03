import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { NutritionDataForEducationalBuildingListComponent } from './nutrition-data-for-educational-building-list/nutrition-data-for-educational-building-list.component';
import { NutritionDataForEducationalBuildingEditComponent } from './nutrition-data-for-educational-building-edit/nutrition-data-for-educational-building-edit.component';
import { NutritionDataForEducationalBuildingNewComponent } from './nutrition-data-for-educational-building-new/nutrition-data-for-educational-building-new.component';
import { NutritionDataForEducationalBuildingViewComponent } from './nutrition-data-for-educational-building-view/nutrition-data-for-educational-building-view.component';
import { NutritionDataForEducationalBuildingRoutingModule } from './nutrition-data-for-educational-building.routing.module';
import { NutritionDataForEducationalBuildingService } from './shared/nutrition-data-for-educational-building.service';
import { NutritionDataForEducationalBuildingGuard } from './shared/nutrition-data-for-educational-building.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    NutritionDataForEducationalBuildingListComponent,
    NutritionDataForEducationalBuildingNewComponent,
    NutritionDataForEducationalBuildingEditComponent,
    NutritionDataForEducationalBuildingViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    NutritionDataForEducationalBuildingRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    NutritionDataForEducationalBuildingService,
    NutritionDataForEducationalBuildingGuard
  ],
  entryComponents: [
    NutritionDataForEducationalBuildingNewComponent,
    NutritionDataForEducationalBuildingEditComponent,
    NutritionDataForEducationalBuildingViewComponent
  ]
})

export class NutritionDataForEducationalBuildingModule {
}
