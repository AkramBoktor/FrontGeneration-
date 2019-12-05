import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PositionOfLeasedBuildingsListComponent } from './position-of-leased-buildings-list/position-of-leased-buildings-list.component';
import { PositionOfLeasedBuildingsEditComponent } from './position-of-leased-buildings-edit/position-of-leased-buildings-edit.component';
import { PositionOfLeasedBuildingsNewComponent } from './position-of-leased-buildings-new/position-of-leased-buildings-new.component';
import { PositionOfLeasedBuildingsViewComponent } from './position-of-leased-buildings-view/position-of-leased-buildings-view.component';
import { PositionOfLeasedBuildingsRoutingModule } from './position-of-leased-buildings.routing.module';
import { PositionOfLeasedBuildingsService } from './shared/position-of-leased-buildings.service';
import { PositionOfLeasedBuildingsGuard } from './shared/position-of-leased-buildings.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PositionOfLeasedBuildingsListComponent,
    PositionOfLeasedBuildingsNewComponent,
    PositionOfLeasedBuildingsEditComponent,
    PositionOfLeasedBuildingsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PositionOfLeasedBuildingsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PositionOfLeasedBuildingsService,
    PositionOfLeasedBuildingsGuard
  ],
  entryComponents: [
    PositionOfLeasedBuildingsNewComponent,
    PositionOfLeasedBuildingsEditComponent,
    PositionOfLeasedBuildingsViewComponent
  ]
})

export class PositionOfLeasedBuildingsModule {
}
