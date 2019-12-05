import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationGuard } from './shared/data-of-facilities-and-their-distance-from-the-general-location.guard';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationNewComponent } from './data-of-facilities-and-their-distance-from-the-general-location-new/data-of-facilities-and-their-distance-from-the-general-location-new.component';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationEditComponent } from './data-of-facilities-and-their-distance-from-the-general-location-edit/data-of-facilities-and-their-distance-from-the-general-location-edit.component';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationListComponent } from './data-of-facilities-and-their-distance-from-the-general-location-list/data-of-facilities-and-their-distance-from-the-general-location-list.component';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationViewComponent } from './data-of-facilities-and-their-distance-from-the-general-location-view/data-of-facilities-and-their-distance-from-the-general-location-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationListComponent,
    canActivate: [DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationNewComponent,
    canActivate: [DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationRoutingModule {
}
