import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataOfTheLandSeriesInLegalAffairsGuard } from './shared/data-of-the-land-series-in-legal-affairs.guard';
import { DataOfTheLandSeriesInLegalAffairsNewComponent } from './data-of-the-land-series-in-legal-affairs-new/data-of-the-land-series-in-legal-affairs-new.component';
import { DataOfTheLandSeriesInLegalAffairsEditComponent } from './data-of-the-land-series-in-legal-affairs-edit/data-of-the-land-series-in-legal-affairs-edit.component';
import { DataOfTheLandSeriesInLegalAffairsListComponent } from './data-of-the-land-series-in-legal-affairs-list/data-of-the-land-series-in-legal-affairs-list.component';
import { DataOfTheLandSeriesInLegalAffairsViewComponent } from './data-of-the-land-series-in-legal-affairs-view/data-of-the-land-series-in-legal-affairs-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataOfTheLandSeriesInLegalAffairsListComponent,
    canActivate: [DataOfTheLandSeriesInLegalAffairsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataOfTheLandSeriesInLegalAffairsNewComponent,
    canActivate: [DataOfTheLandSeriesInLegalAffairsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataOfTheLandSeriesInLegalAffairsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataOfTheLandSeriesInLegalAffairsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataOfTheLandSeriesInLegalAffairsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataOfTheLandSeriesInLegalAffairsRoutingModule {
}
