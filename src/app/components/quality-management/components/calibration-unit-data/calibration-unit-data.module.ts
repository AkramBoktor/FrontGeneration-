import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CalibrationUnitDataListComponent } from './calibration-unit-data-list/calibration-unit-data-list.component';
import { CalibrationUnitDataEditComponent } from './calibration-unit-data-edit/calibration-unit-data-edit.component';
import { CalibrationUnitDataNewComponent } from './calibration-unit-data-new/calibration-unit-data-new.component';
import { CalibrationUnitDataViewComponent } from './calibration-unit-data-view/calibration-unit-data-view.component';
import { CalibrationUnitDataRoutingModule } from './calibration-unit-data.routing.module';
import { CalibrationUnitDataService } from './shared/calibration-unit-data.service';
import { CalibrationUnitDataGuard } from './shared/calibration-unit-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CalibrationUnitDataListComponent,
    CalibrationUnitDataNewComponent,
    CalibrationUnitDataEditComponent,
    CalibrationUnitDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CalibrationUnitDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CalibrationUnitDataService,
    CalibrationUnitDataGuard
  ],
  entryComponents: [
    CalibrationUnitDataNewComponent,
    CalibrationUnitDataEditComponent,
    CalibrationUnitDataViewComponent
  ]
})

export class CalibrationUnitDataModule {
}
