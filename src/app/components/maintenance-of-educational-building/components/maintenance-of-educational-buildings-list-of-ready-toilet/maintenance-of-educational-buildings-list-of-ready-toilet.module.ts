import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { MaintenanceOfEducationalBuildingsListOfReadyToiletListComponent } from './maintenance-of-educational-buildings-list-of-ready-toilet-list/maintenance-of-educational-buildings-list-of-ready-toilet-list.component';
import { MaintenanceOfEducationalBuildingsListOfReadyToiletEditComponent } from './maintenance-of-educational-buildings-list-of-ready-toilet-edit/maintenance-of-educational-buildings-list-of-ready-toilet-edit.component';
import { MaintenanceOfEducationalBuildingsListOfReadyToiletNewComponent } from './maintenance-of-educational-buildings-list-of-ready-toilet-new/maintenance-of-educational-buildings-list-of-ready-toilet-new.component';
import { MaintenanceOfEducationalBuildingsListOfReadyToiletViewComponent } from './maintenance-of-educational-buildings-list-of-ready-toilet-view/maintenance-of-educational-buildings-list-of-ready-toilet-view.component';
import { MaintenanceOfEducationalBuildingsListOfReadyToiletRoutingModule } from './maintenance-of-educational-buildings-list-of-ready-toilet.routing.module';
import { MaintenanceOfEducationalBuildingsListOfReadyToiletService } from './shared/maintenance-of-educational-buildings-list-of-ready-toilet.service';
import { MaintenanceOfEducationalBuildingsListOfReadyToiletGuard } from './shared/maintenance-of-educational-buildings-list-of-ready-toilet.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    MaintenanceOfEducationalBuildingsListOfReadyToiletListComponent,
    MaintenanceOfEducationalBuildingsListOfReadyToiletNewComponent,
    MaintenanceOfEducationalBuildingsListOfReadyToiletEditComponent,
    MaintenanceOfEducationalBuildingsListOfReadyToiletViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    MaintenanceOfEducationalBuildingsListOfReadyToiletRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    MaintenanceOfEducationalBuildingsListOfReadyToiletService,
    MaintenanceOfEducationalBuildingsListOfReadyToiletGuard
  ],
  entryComponents: [
    MaintenanceOfEducationalBuildingsListOfReadyToiletNewComponent,
    MaintenanceOfEducationalBuildingsListOfReadyToiletEditComponent,
    MaintenanceOfEducationalBuildingsListOfReadyToiletViewComponent
  ]
})

export class MaintenanceOfEducationalBuildingsListOfReadyToiletModule {
}
