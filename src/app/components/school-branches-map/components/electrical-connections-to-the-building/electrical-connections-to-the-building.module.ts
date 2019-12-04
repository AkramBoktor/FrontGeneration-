import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ElectricalConnectionsToTheBuildingListComponent } from './electrical-connections-to-the-building-list/electrical-connections-to-the-building-list.component';
import { ElectricalConnectionsToTheBuildingEditComponent } from './electrical-connections-to-the-building-edit/electrical-connections-to-the-building-edit.component';
import { ElectricalConnectionsToTheBuildingNewComponent } from './electrical-connections-to-the-building-new/electrical-connections-to-the-building-new.component';
import { ElectricalConnectionsToTheBuildingViewComponent } from './electrical-connections-to-the-building-view/electrical-connections-to-the-building-view.component';
import { ElectricalConnectionsToTheBuildingRoutingModule } from './electrical-connections-to-the-building.routing.module';
import { ElectricalConnectionsToTheBuildingService } from './shared/electrical-connections-to-the-building.service';
import { ElectricalConnectionsToTheBuildingGuard } from './shared/electrical-connections-to-the-building.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ElectricalConnectionsToTheBuildingListComponent,
    ElectricalConnectionsToTheBuildingNewComponent,
    ElectricalConnectionsToTheBuildingEditComponent,
    ElectricalConnectionsToTheBuildingViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ElectricalConnectionsToTheBuildingRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ElectricalConnectionsToTheBuildingService,
    ElectricalConnectionsToTheBuildingGuard
  ],
  entryComponents: [
    ElectricalConnectionsToTheBuildingNewComponent,
    ElectricalConnectionsToTheBuildingEditComponent,
    ElectricalConnectionsToTheBuildingViewComponent
  ]
})

export class ElectricalConnectionsToTheBuildingModule {
}
