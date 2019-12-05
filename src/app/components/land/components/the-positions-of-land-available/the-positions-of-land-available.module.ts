import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ThePositionsOfLandAvailableListComponent } from './the-positions-of-land-available-list/the-positions-of-land-available-list.component';
import { ThePositionsOfLandAvailableEditComponent } from './the-positions-of-land-available-edit/the-positions-of-land-available-edit.component';
import { ThePositionsOfLandAvailableNewComponent } from './the-positions-of-land-available-new/the-positions-of-land-available-new.component';
import { ThePositionsOfLandAvailableViewComponent } from './the-positions-of-land-available-view/the-positions-of-land-available-view.component';
import { ThePositionsOfLandAvailableRoutingModule } from './the-positions-of-land-available.routing.module';
import { ThePositionsOfLandAvailableService } from './shared/the-positions-of-land-available.service';
import { ThePositionsOfLandAvailableGuard } from './shared/the-positions-of-land-available.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ThePositionsOfLandAvailableListComponent,
    ThePositionsOfLandAvailableNewComponent,
    ThePositionsOfLandAvailableEditComponent,
    ThePositionsOfLandAvailableViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ThePositionsOfLandAvailableRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ThePositionsOfLandAvailableService,
    ThePositionsOfLandAvailableGuard
  ],
  entryComponents: [
    ThePositionsOfLandAvailableNewComponent,
    ThePositionsOfLandAvailableEditComponent,
    ThePositionsOfLandAvailableViewComponent
  ]
})

export class ThePositionsOfLandAvailableModule {
}
