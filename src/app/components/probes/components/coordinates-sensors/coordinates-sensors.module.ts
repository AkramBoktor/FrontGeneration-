import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CoordinatesSensorsListComponent } from './coordinates-sensors-list/coordinates-sensors-list.component';
import { CoordinatesSensorsEditComponent } from './coordinates-sensors-edit/coordinates-sensors-edit.component';
import { CoordinatesSensorsNewComponent } from './coordinates-sensors-new/coordinates-sensors-new.component';
import { CoordinatesSensorsViewComponent } from './coordinates-sensors-view/coordinates-sensors-view.component';
import { CoordinatesSensorsRoutingModule } from './coordinates-sensors.routing.module';
import { CoordinatesSensorsService } from './shared/coordinates-sensors.service';
import { CoordinatesSensorsGuard } from './shared/coordinates-sensors.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CoordinatesSensorsListComponent,
    CoordinatesSensorsNewComponent,
    CoordinatesSensorsEditComponent,
    CoordinatesSensorsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CoordinatesSensorsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CoordinatesSensorsService,
    CoordinatesSensorsGuard
  ],
  entryComponents: [
    CoordinatesSensorsNewComponent,
    CoordinatesSensorsEditComponent,
    CoordinatesSensorsViewComponent
  ]
})

export class CoordinatesSensorsModule {
}
