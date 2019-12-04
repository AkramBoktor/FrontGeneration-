import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { NutritionDataForEducationalBuildingGuard } from './shared/nutrition-data-for-educational-building.guard';
import { NutritionDataForEducationalBuildingNewComponent } from './nutrition-data-for-educational-building-new/nutrition-data-for-educational-building-new.component';
import { NutritionDataForEducationalBuildingEditComponent } from './nutrition-data-for-educational-building-edit/nutrition-data-for-educational-building-edit.component';
import { NutritionDataForEducationalBuildingListComponent } from './nutrition-data-for-educational-building-list/nutrition-data-for-educational-building-list.component';
import { NutritionDataForEducationalBuildingViewComponent } from './nutrition-data-for-educational-building-view/nutrition-data-for-educational-building-view.component';

const routes: Routes = [
  {
    path: '',
    component: NutritionDataForEducationalBuildingListComponent,
    canActivate: [NutritionDataForEducationalBuildingGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: NutritionDataForEducationalBuildingNewComponent,
    canActivate: [NutritionDataForEducationalBuildingGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: NutritionDataForEducationalBuildingEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: NutritionDataForEducationalBuildingListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: NutritionDataForEducationalBuildingViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class NutritionDataForEducationalBuildingRoutingModule {
}
