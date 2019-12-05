import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ElementsOfAssayItemsForWeightsFactorOfABuildingGuard } from './shared/elements-of-assay-items-for-weights-factor-of-a-building.guard';
import { ElementsOfAssayItemsForWeightsFactorOfABuildingNewComponent } from './elements-of-assay-items-for-weights-factor-of-a-building-new/elements-of-assay-items-for-weights-factor-of-a-building-new.component';
import { ElementsOfAssayItemsForWeightsFactorOfABuildingEditComponent } from './elements-of-assay-items-for-weights-factor-of-a-building-edit/elements-of-assay-items-for-weights-factor-of-a-building-edit.component';
import { ElementsOfAssayItemsForWeightsFactorOfABuildingListComponent } from './elements-of-assay-items-for-weights-factor-of-a-building-list/elements-of-assay-items-for-weights-factor-of-a-building-list.component';
import { ElementsOfAssayItemsForWeightsFactorOfABuildingViewComponent } from './elements-of-assay-items-for-weights-factor-of-a-building-view/elements-of-assay-items-for-weights-factor-of-a-building-view.component';

const routes: Routes = [
  {
    path: '',
    component: ElementsOfAssayItemsForWeightsFactorOfABuildingListComponent,
    canActivate: [ElementsOfAssayItemsForWeightsFactorOfABuildingGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ElementsOfAssayItemsForWeightsFactorOfABuildingNewComponent,
    canActivate: [ElementsOfAssayItemsForWeightsFactorOfABuildingGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ElementsOfAssayItemsForWeightsFactorOfABuildingEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ElementsOfAssayItemsForWeightsFactorOfABuildingListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ElementsOfAssayItemsForWeightsFactorOfABuildingViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ElementsOfAssayItemsForWeightsFactorOfABuildingRoutingModule {
}
