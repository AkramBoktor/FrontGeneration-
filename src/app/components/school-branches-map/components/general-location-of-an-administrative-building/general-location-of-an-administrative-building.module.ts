import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { GeneralLocationOfAnAdministrativeBuildingListComponent } from './general-location-of-an-administrative-building-list/general-location-of-an-administrative-building-list.component';
import { GeneralLocationOfAnAdministrativeBuildingEditComponent } from './general-location-of-an-administrative-building-edit/general-location-of-an-administrative-building-edit.component';
import { GeneralLocationOfAnAdministrativeBuildingNewComponent } from './general-location-of-an-administrative-building-new/general-location-of-an-administrative-building-new.component';
import { GeneralLocationOfAnAdministrativeBuildingViewComponent } from './general-location-of-an-administrative-building-view/general-location-of-an-administrative-building-view.component';
import { GeneralLocationOfAnAdministrativeBuildingRoutingModule } from './general-location-of-an-administrative-building.routing.module';
import { GeneralLocationOfAnAdministrativeBuildingService } from './shared/general-location-of-an-administrative-building.service';
import { GeneralLocationOfAnAdministrativeBuildingGuard } from './shared/general-location-of-an-administrative-building.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    GeneralLocationOfAnAdministrativeBuildingListComponent,
    GeneralLocationOfAnAdministrativeBuildingNewComponent,
    GeneralLocationOfAnAdministrativeBuildingEditComponent,
    GeneralLocationOfAnAdministrativeBuildingViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    GeneralLocationOfAnAdministrativeBuildingRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    GeneralLocationOfAnAdministrativeBuildingService,
    GeneralLocationOfAnAdministrativeBuildingGuard
  ],
  entryComponents: [
    GeneralLocationOfAnAdministrativeBuildingNewComponent,
    GeneralLocationOfAnAdministrativeBuildingEditComponent,
    GeneralLocationOfAnAdministrativeBuildingViewComponent
  ]
})

export class GeneralLocationOfAnAdministrativeBuildingModule {
}
