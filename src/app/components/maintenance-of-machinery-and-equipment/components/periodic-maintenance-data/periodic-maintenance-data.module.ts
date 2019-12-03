import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PeriodicMaintenanceDataListComponent } from './periodic-maintenance-data-list/periodic-maintenance-data-list.component';
import { PeriodicMaintenanceDataEditComponent } from './periodic-maintenance-data-edit/periodic-maintenance-data-edit.component';
import { PeriodicMaintenanceDataNewComponent } from './periodic-maintenance-data-new/periodic-maintenance-data-new.component';
import { PeriodicMaintenanceDataViewComponent } from './periodic-maintenance-data-view/periodic-maintenance-data-view.component';
import { PeriodicMaintenanceDataRoutingModule } from './periodic-maintenance-data.routing.module';
import { PeriodicMaintenanceDataService } from './shared/periodic-maintenance-data.service';
import { PeriodicMaintenanceDataGuard } from './shared/periodic-maintenance-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PeriodicMaintenanceDataListComponent,
    PeriodicMaintenanceDataNewComponent,
    PeriodicMaintenanceDataEditComponent,
    PeriodicMaintenanceDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PeriodicMaintenanceDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PeriodicMaintenanceDataService,
    PeriodicMaintenanceDataGuard
  ],
  entryComponents: [
    PeriodicMaintenanceDataNewComponent,
    PeriodicMaintenanceDataEditComponent,
    PeriodicMaintenanceDataViewComponent
  ]
})

export class PeriodicMaintenanceDataModule {
}
