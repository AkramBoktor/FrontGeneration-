import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ElementsOfAssayItemsForWeightsFactorOfABuildingListComponent } from './elements-of-assay-items-for-weights-factor-of-a-building-list/elements-of-assay-items-for-weights-factor-of-a-building-list.component';
import { ElementsOfAssayItemsForWeightsFactorOfABuildingEditComponent } from './elements-of-assay-items-for-weights-factor-of-a-building-edit/elements-of-assay-items-for-weights-factor-of-a-building-edit.component';
import { ElementsOfAssayItemsForWeightsFactorOfABuildingNewComponent } from './elements-of-assay-items-for-weights-factor-of-a-building-new/elements-of-assay-items-for-weights-factor-of-a-building-new.component';
import { ElementsOfAssayItemsForWeightsFactorOfABuildingViewComponent } from './elements-of-assay-items-for-weights-factor-of-a-building-view/elements-of-assay-items-for-weights-factor-of-a-building-view.component';
import { ElementsOfAssayItemsForWeightsFactorOfABuildingRoutingModule } from './elements-of-assay-items-for-weights-factor-of-a-building.routing.module';
import { ElementsOfAssayItemsForWeightsFactorOfABuildingService } from './shared/elements-of-assay-items-for-weights-factor-of-a-building.service';
import { ElementsOfAssayItemsForWeightsFactorOfABuildingGuard } from './shared/elements-of-assay-items-for-weights-factor-of-a-building.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ElementsOfAssayItemsForWeightsFactorOfABuildingListComponent,
    ElementsOfAssayItemsForWeightsFactorOfABuildingNewComponent,
    ElementsOfAssayItemsForWeightsFactorOfABuildingEditComponent,
    ElementsOfAssayItemsForWeightsFactorOfABuildingViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ElementsOfAssayItemsForWeightsFactorOfABuildingRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ElementsOfAssayItemsForWeightsFactorOfABuildingService,
    ElementsOfAssayItemsForWeightsFactorOfABuildingGuard
  ],
  entryComponents: [
    ElementsOfAssayItemsForWeightsFactorOfABuildingNewComponent,
    ElementsOfAssayItemsForWeightsFactorOfABuildingEditComponent,
    ElementsOfAssayItemsForWeightsFactorOfABuildingViewComponent
  ]
})

export class ElementsOfAssayItemsForWeightsFactorOfABuildingModule {
}
