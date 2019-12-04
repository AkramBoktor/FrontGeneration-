import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { IdentificationDataForAnAdministrativeBuildingListComponent } from './identification-data-for-an-administrative-building-list/identification-data-for-an-administrative-building-list.component';
import { IdentificationDataForAnAdministrativeBuildingEditComponent } from './identification-data-for-an-administrative-building-edit/identification-data-for-an-administrative-building-edit.component';
import { IdentificationDataForAnAdministrativeBuildingNewComponent } from './identification-data-for-an-administrative-building-new/identification-data-for-an-administrative-building-new.component';
import { IdentificationDataForAnAdministrativeBuildingViewComponent } from './identification-data-for-an-administrative-building-view/identification-data-for-an-administrative-building-view.component';
import { IdentificationDataForAnAdministrativeBuildingRoutingModule } from './identification-data-for-an-administrative-building.routing.module';
import { IdentificationDataForAnAdministrativeBuildingService } from './shared/identification-data-for-an-administrative-building.service';
import { IdentificationDataForAnAdministrativeBuildingGuard } from './shared/identification-data-for-an-administrative-building.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    IdentificationDataForAnAdministrativeBuildingListComponent,
    IdentificationDataForAnAdministrativeBuildingNewComponent,
    IdentificationDataForAnAdministrativeBuildingEditComponent,
    IdentificationDataForAnAdministrativeBuildingViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    IdentificationDataForAnAdministrativeBuildingRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    IdentificationDataForAnAdministrativeBuildingService,
    IdentificationDataForAnAdministrativeBuildingGuard
  ],
  entryComponents: [
    IdentificationDataForAnAdministrativeBuildingNewComponent,
    IdentificationDataForAnAdministrativeBuildingEditComponent,
    IdentificationDataForAnAdministrativeBuildingViewComponent
  ]
})

export class IdentificationDataForAnAdministrativeBuildingModule {
}
