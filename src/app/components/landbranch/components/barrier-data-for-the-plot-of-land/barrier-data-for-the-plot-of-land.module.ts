import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BarrierDataForThePlotOfLandListComponent } from './barrier-data-for-the-plot-of-land-list/barrier-data-for-the-plot-of-land-list.component';
import { BarrierDataForThePlotOfLandEditComponent } from './barrier-data-for-the-plot-of-land-edit/barrier-data-for-the-plot-of-land-edit.component';
import { BarrierDataForThePlotOfLandNewComponent } from './barrier-data-for-the-plot-of-land-new/barrier-data-for-the-plot-of-land-new.component';
import { BarrierDataForThePlotOfLandViewComponent } from './barrier-data-for-the-plot-of-land-view/barrier-data-for-the-plot-of-land-view.component';
import { BarrierDataForThePlotOfLandRoutingModule } from './barrier-data-for-the-plot-of-land.routing.module';
import { BarrierDataForThePlotOfLandService } from './shared/barrier-data-for-the-plot-of-land.service';
import { BarrierDataForThePlotOfLandGuard } from './shared/barrier-data-for-the-plot-of-land.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BarrierDataForThePlotOfLandListComponent,
    BarrierDataForThePlotOfLandNewComponent,
    BarrierDataForThePlotOfLandEditComponent,
    BarrierDataForThePlotOfLandViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BarrierDataForThePlotOfLandRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BarrierDataForThePlotOfLandService,
    BarrierDataForThePlotOfLandGuard
  ],
  entryComponents: [
    BarrierDataForThePlotOfLandNewComponent,
    BarrierDataForThePlotOfLandEditComponent,
    BarrierDataForThePlotOfLandViewComponent
  ]
})

export class BarrierDataForThePlotOfLandModule {
}
