import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingListComponent } from './elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-list/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-list.component';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingEditComponent } from './elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-edit/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-edit.component';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingNewComponent } from './elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-new/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-new.component';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingViewComponent } from './elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-view/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-view.component';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingRoutingModule } from './elements-of-the-measured-items-due-to-the-weights-factor-of-a-building.routing.module';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingService } from './shared/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building.service';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingGuard } from './shared/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingListComponent,
    ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingNewComponent,
    ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingEditComponent,
    ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingService,
    ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingGuard
  ],
  entryComponents: [
    ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingNewComponent,
    ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingEditComponent,
    ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingViewComponent
  ]
})

export class ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingModule {
}
