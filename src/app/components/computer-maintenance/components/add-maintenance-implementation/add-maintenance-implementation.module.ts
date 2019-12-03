import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AddMaintenanceImplementationListComponent } from './add-maintenance-implementation-list/add-maintenance-implementation-list.component';
import { AddMaintenanceImplementationEditComponent } from './add-maintenance-implementation-edit/add-maintenance-implementation-edit.component';
import { AddMaintenanceImplementationNewComponent } from './add-maintenance-implementation-new/add-maintenance-implementation-new.component';
import { AddMaintenanceImplementationViewComponent } from './add-maintenance-implementation-view/add-maintenance-implementation-view.component';
import { AddMaintenanceImplementationRoutingModule } from './add-maintenance-implementation.routing.module';
import { AddMaintenanceImplementationService } from './shared/add-maintenance-implementation.service';
import { AddMaintenanceImplementationGuard } from './shared/add-maintenance-implementation.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AddMaintenanceImplementationListComponent,
    AddMaintenanceImplementationNewComponent,
    AddMaintenanceImplementationEditComponent,
    AddMaintenanceImplementationViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AddMaintenanceImplementationRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AddMaintenanceImplementationService,
    AddMaintenanceImplementationGuard
  ],
  entryComponents: [
    AddMaintenanceImplementationNewComponent,
    AddMaintenanceImplementationEditComponent,
    AddMaintenanceImplementationViewComponent
  ]
})

export class AddMaintenanceImplementationModule {
}
