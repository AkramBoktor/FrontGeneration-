import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AddTheImplementationOfAirConditioningMaintenanceListComponent } from './add-the-implementation-of-air-conditioning-maintenance-list/add-the-implementation-of-air-conditioning-maintenance-list.component';
import { AddTheImplementationOfAirConditioningMaintenanceEditComponent } from './add-the-implementation-of-air-conditioning-maintenance-edit/add-the-implementation-of-air-conditioning-maintenance-edit.component';
import { AddTheImplementationOfAirConditioningMaintenanceNewComponent } from './add-the-implementation-of-air-conditioning-maintenance-new/add-the-implementation-of-air-conditioning-maintenance-new.component';
import { AddTheImplementationOfAirConditioningMaintenanceViewComponent } from './add-the-implementation-of-air-conditioning-maintenance-view/add-the-implementation-of-air-conditioning-maintenance-view.component';
import { AddTheImplementationOfAirConditioningMaintenanceRoutingModule } from './add-the-implementation-of-air-conditioning-maintenance.routing.module';
import { AddTheImplementationOfAirConditioningMaintenanceService } from './shared/add-the-implementation-of-air-conditioning-maintenance.service';
import { AddTheImplementationOfAirConditioningMaintenanceGuard } from './shared/add-the-implementation-of-air-conditioning-maintenance.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AddTheImplementationOfAirConditioningMaintenanceListComponent,
    AddTheImplementationOfAirConditioningMaintenanceNewComponent,
    AddTheImplementationOfAirConditioningMaintenanceEditComponent,
    AddTheImplementationOfAirConditioningMaintenanceViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AddTheImplementationOfAirConditioningMaintenanceRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AddTheImplementationOfAirConditioningMaintenanceService,
    AddTheImplementationOfAirConditioningMaintenanceGuard
  ],
  entryComponents: [
    AddTheImplementationOfAirConditioningMaintenanceNewComponent,
    AddTheImplementationOfAirConditioningMaintenanceEditComponent,
    AddTheImplementationOfAirConditioningMaintenanceViewComponent
  ]
})

export class AddTheImplementationOfAirConditioningMaintenanceModule {
}
