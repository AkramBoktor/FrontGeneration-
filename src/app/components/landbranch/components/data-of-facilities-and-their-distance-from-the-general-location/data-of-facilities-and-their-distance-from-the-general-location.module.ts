import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationListComponent } from './data-of-facilities-and-their-distance-from-the-general-location-list/data-of-facilities-and-their-distance-from-the-general-location-list.component';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationEditComponent } from './data-of-facilities-and-their-distance-from-the-general-location-edit/data-of-facilities-and-their-distance-from-the-general-location-edit.component';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationNewComponent } from './data-of-facilities-and-their-distance-from-the-general-location-new/data-of-facilities-and-their-distance-from-the-general-location-new.component';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationViewComponent } from './data-of-facilities-and-their-distance-from-the-general-location-view/data-of-facilities-and-their-distance-from-the-general-location-view.component';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationRoutingModule } from './data-of-facilities-and-their-distance-from-the-general-location.routing.module';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService } from './shared/data-of-facilities-and-their-distance-from-the-general-location.service';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationGuard } from './shared/data-of-facilities-and-their-distance-from-the-general-location.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationListComponent,
    DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationNewComponent,
    DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationEditComponent,
    DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService,
    DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationGuard
  ],
  entryComponents: [
    DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationNewComponent,
    DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationEditComponent,
    DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationViewComponent
  ]
})

export class DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationModule {
}
