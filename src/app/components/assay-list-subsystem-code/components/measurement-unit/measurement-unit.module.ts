import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { MeasurementUnitListComponent } from './measurement-unit-list/measurement-unit-list.component';
import { MeasurementUnitEditComponent } from './measurement-unit-edit/measurement-unit-edit.component';
import { MeasurementUnitNewComponent } from './measurement-unit-new/measurement-unit-new.component';
import { MeasurementUnitViewComponent } from './measurement-unit-view/measurement-unit-view.component';
import { MeasurementUnitRoutingModule } from './measurement-unit.routing.module';
import { MeasurementUnitService } from './shared/measurement-unit.service';
import { MeasurementUnitGuard } from './shared/measurement-unit.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    MeasurementUnitListComponent,
    MeasurementUnitNewComponent,
    MeasurementUnitEditComponent,
    MeasurementUnitViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    MeasurementUnitRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    MeasurementUnitService,
    MeasurementUnitGuard
  ],
  entryComponents: [
    MeasurementUnitNewComponent,
    MeasurementUnitEditComponent,
    MeasurementUnitViewComponent
  ]
})

export class MeasurementUnitModule {
}
