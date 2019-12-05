import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AvailableLandPositionListComponent } from './available-land-position-list/available-land-position-list.component';
import { AvailableLandPositionEditComponent } from './available-land-position-edit/available-land-position-edit.component';
import { AvailableLandPositionNewComponent } from './available-land-position-new/available-land-position-new.component';
import { AvailableLandPositionViewComponent } from './available-land-position-view/available-land-position-view.component';
import { AvailableLandPositionRoutingModule } from './available-land-position.routing.module';
import { AvailableLandPositionService } from './shared/available-land-position.service';
import { AvailableLandPositionGuard } from './shared/available-land-position.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AvailableLandPositionListComponent,
    AvailableLandPositionNewComponent,
    AvailableLandPositionEditComponent,
    AvailableLandPositionViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AvailableLandPositionRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AvailableLandPositionService,
    AvailableLandPositionGuard
  ],
  entryComponents: [
    AvailableLandPositionNewComponent,
    AvailableLandPositionEditComponent,
    AvailableLandPositionViewComponent
  ]
})

export class AvailableLandPositionModule {
}
