import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PrintMaintenanceIndexationBuildingListComponent } from './print-maintenance-indexation-building-list/print-maintenance-indexation-building-list.component';
import { PrintMaintenanceIndexationBuildingEditComponent } from './print-maintenance-indexation-building-edit/print-maintenance-indexation-building-edit.component';
import { PrintMaintenanceIndexationBuildingNewComponent } from './print-maintenance-indexation-building-new/print-maintenance-indexation-building-new.component';
import { PrintMaintenanceIndexationBuildingViewComponent } from './print-maintenance-indexation-building-view/print-maintenance-indexation-building-view.component';
import { PrintMaintenanceIndexationBuildingRoutingModule } from './print-maintenance-indexation-building.routing.module';
import { PrintMaintenanceIndexationBuildingService } from './shared/print-maintenance-indexation-building.service';
import { PrintMaintenanceIndexationBuildingGuard } from './shared/print-maintenance-indexation-building.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PrintMaintenanceIndexationBuildingListComponent,
    PrintMaintenanceIndexationBuildingNewComponent,
    PrintMaintenanceIndexationBuildingEditComponent,
    PrintMaintenanceIndexationBuildingViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PrintMaintenanceIndexationBuildingRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PrintMaintenanceIndexationBuildingService,
    PrintMaintenanceIndexationBuildingGuard
  ],
  entryComponents: [
    PrintMaintenanceIndexationBuildingNewComponent,
    PrintMaintenanceIndexationBuildingEditComponent,
    PrintMaintenanceIndexationBuildingViewComponent
  ]
})

export class PrintMaintenanceIndexationBuildingModule {
}
