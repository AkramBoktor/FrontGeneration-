import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { IndexationBuildingMaintenanceListComponent } from './indexation-building-maintenance-list/indexation-building-maintenance-list.component';
import { IndexationBuildingMaintenanceEditComponent } from './indexation-building-maintenance-edit/indexation-building-maintenance-edit.component';
import { IndexationBuildingMaintenanceNewComponent } from './indexation-building-maintenance-new/indexation-building-maintenance-new.component';
import { IndexationBuildingMaintenanceViewComponent } from './indexation-building-maintenance-view/indexation-building-maintenance-view.component';
import { IndexationBuildingMaintenanceRoutingModule } from './indexation-building-maintenance.routing.module';
import { IndexationBuildingMaintenanceService } from './shared/indexation-building-maintenance.service';
import { IndexationBuildingMaintenanceGuard } from './shared/indexation-building-maintenance.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    IndexationBuildingMaintenanceListComponent,
    IndexationBuildingMaintenanceNewComponent,
    IndexationBuildingMaintenanceEditComponent,
    IndexationBuildingMaintenanceViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    IndexationBuildingMaintenanceRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    IndexationBuildingMaintenanceService,
    IndexationBuildingMaintenanceGuard
  ],
  entryComponents: [
    IndexationBuildingMaintenanceNewComponent,
    IndexationBuildingMaintenanceEditComponent,
    IndexationBuildingMaintenanceViewComponent
  ]
})

export class IndexationBuildingMaintenanceModule {
}
