import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EquipmentMaintenancePlanDataListComponent } from './equipment-maintenance-plan-data-list/equipment-maintenance-plan-data-list.component';
import { EquipmentMaintenancePlanDataEditComponent } from './equipment-maintenance-plan-data-edit/equipment-maintenance-plan-data-edit.component';
import { EquipmentMaintenancePlanDataNewComponent } from './equipment-maintenance-plan-data-new/equipment-maintenance-plan-data-new.component';
import { EquipmentMaintenancePlanDataViewComponent } from './equipment-maintenance-plan-data-view/equipment-maintenance-plan-data-view.component';
import { EquipmentMaintenancePlanDataRoutingModule } from './equipment-maintenance-plan-data.routing.module';
import { EquipmentMaintenancePlanDataService } from './shared/equipment-maintenance-plan-data.service';
import { EquipmentMaintenancePlanDataGuard } from './shared/equipment-maintenance-plan-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EquipmentMaintenancePlanDataListComponent,
    EquipmentMaintenancePlanDataNewComponent,
    EquipmentMaintenancePlanDataEditComponent,
    EquipmentMaintenancePlanDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EquipmentMaintenancePlanDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EquipmentMaintenancePlanDataService,
    EquipmentMaintenancePlanDataGuard
  ],
  entryComponents: [
    EquipmentMaintenancePlanDataNewComponent,
    EquipmentMaintenancePlanDataEditComponent,
    EquipmentMaintenancePlanDataViewComponent
  ]
})

export class EquipmentMaintenancePlanDataModule {
}
