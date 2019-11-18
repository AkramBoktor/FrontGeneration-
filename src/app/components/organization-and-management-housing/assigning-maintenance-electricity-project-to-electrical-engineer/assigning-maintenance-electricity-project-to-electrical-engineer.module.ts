import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AssigningMaintenanceElectricityProjectToElectricalEngineerListComponent } from './assigning-maintenance-electricity-project-to-electrical-engineer-list/assigning-maintenance-electricity-project-to-electrical-engineer-list.component';
import { AssigningMaintenanceElectricityProjectToElectricalEngineerEditComponent } from './assigning-maintenance-electricity-project-to-electrical-engineer-edit/assigning-maintenance-electricity-project-to-electrical-engineer-edit.component';
import { AssigningMaintenanceElectricityProjectToElectricalEngineerNewComponent } from './assigning-maintenance-electricity-project-to-electrical-engineer-new/assigning-maintenance-electricity-project-to-electrical-engineer-new.component';
import { AssigningMaintenanceElectricityProjectToElectricalEngineerViewComponent } from './assigning-maintenance-electricity-project-to-electrical-engineer-view/assigning-maintenance-electricity-project-to-electrical-engineer-view.component';
import { AssigningMaintenanceElectricityProjectToElectricalEngineerRoutingModule } from './assigning-maintenance-electricity-project-to-electrical-engineer.routing.module';
import { AssigningMaintenanceElectricityProjectToElectricalEngineerService } from './shared/assigning-maintenance-electricity-project-to-electrical-engineer.service';
import { AssigningMaintenanceElectricityProjectToElectricalEngineerGuard } from './shared/assigning-maintenance-electricity-project-to-electrical-engineer.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AssigningMaintenanceElectricityProjectToElectricalEngineerListComponent,
    AssigningMaintenanceElectricityProjectToElectricalEngineerNewComponent,
    AssigningMaintenanceElectricityProjectToElectricalEngineerEditComponent,
    AssigningMaintenanceElectricityProjectToElectricalEngineerViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AssigningMaintenanceElectricityProjectToElectricalEngineerRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AssigningMaintenanceElectricityProjectToElectricalEngineerService,
    AssigningMaintenanceElectricityProjectToElectricalEngineerGuard
  ],
  entryComponents: [
    AssigningMaintenanceElectricityProjectToElectricalEngineerNewComponent,
    AssigningMaintenanceElectricityProjectToElectricalEngineerEditComponent,
    AssigningMaintenanceElectricityProjectToElectricalEngineerViewComponent
  ]
})

export class AssigningMaintenanceElectricityProjectToElectricalEngineerModule {
}
