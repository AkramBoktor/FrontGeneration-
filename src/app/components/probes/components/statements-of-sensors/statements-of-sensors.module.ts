import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { StatementsOfSensorsListComponent } from './statements-of-sensors-list/statements-of-sensors-list.component';
import { StatementsOfSensorsEditComponent } from './statements-of-sensors-edit/statements-of-sensors-edit.component';
import { StatementsOfSensorsNewComponent } from './statements-of-sensors-new/statements-of-sensors-new.component';
import { StatementsOfSensorsViewComponent } from './statements-of-sensors-view/statements-of-sensors-view.component';
import { StatementsOfSensorsRoutingModule } from './statements-of-sensors.routing.module';
import { StatementsOfSensorsService } from './shared/statements-of-sensors.service';
import { StatementsOfSensorsGuard } from './shared/statements-of-sensors.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    StatementsOfSensorsListComponent,
    StatementsOfSensorsNewComponent,
    StatementsOfSensorsEditComponent,
    StatementsOfSensorsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    StatementsOfSensorsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    StatementsOfSensorsService,
    StatementsOfSensorsGuard
  ],
  entryComponents: [
    StatementsOfSensorsNewComponent,
    StatementsOfSensorsEditComponent,
    StatementsOfSensorsViewComponent
  ]
})

export class StatementsOfSensorsModule {
}
