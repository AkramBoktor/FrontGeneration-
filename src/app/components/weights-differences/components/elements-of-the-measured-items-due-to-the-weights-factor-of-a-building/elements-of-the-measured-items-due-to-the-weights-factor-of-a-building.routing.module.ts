import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingGuard } from './shared/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building.guard';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingNewComponent } from './elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-new/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-new.component';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingEditComponent } from './elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-edit/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-edit.component';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingListComponent } from './elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-list/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-list.component';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingViewComponent } from './elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-view/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-view.component';

const routes: Routes = [
  {
    path: '',
    component: ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingListComponent,
    canActivate: [ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingNewComponent,
    canActivate: [ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingRoutingModule {
}
