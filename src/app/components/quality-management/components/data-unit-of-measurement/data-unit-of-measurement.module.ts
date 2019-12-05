import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataUnitOfMeasurementListComponent } from './data-unit-of-measurement-list/data-unit-of-measurement-list.component';
import { DataUnitOfMeasurementEditComponent } from './data-unit-of-measurement-edit/data-unit-of-measurement-edit.component';
import { DataUnitOfMeasurementNewComponent } from './data-unit-of-measurement-new/data-unit-of-measurement-new.component';
import { DataUnitOfMeasurementViewComponent } from './data-unit-of-measurement-view/data-unit-of-measurement-view.component';
import { DataUnitOfMeasurementRoutingModule } from './data-unit-of-measurement.routing.module';
import { DataUnitOfMeasurementService } from './shared/data-unit-of-measurement.service';
import { DataUnitOfMeasurementGuard } from './shared/data-unit-of-measurement.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataUnitOfMeasurementListComponent,
    DataUnitOfMeasurementNewComponent,
    DataUnitOfMeasurementEditComponent,
    DataUnitOfMeasurementViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataUnitOfMeasurementRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataUnitOfMeasurementService,
    DataUnitOfMeasurementGuard
  ],
  entryComponents: [
    DataUnitOfMeasurementNewComponent,
    DataUnitOfMeasurementEditComponent,
    DataUnitOfMeasurementViewComponent
  ]
})

export class DataUnitOfMeasurementModule {
}
