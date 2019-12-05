import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AbstractStatementMaintenanceListComponent } from './abstract-statement-maintenance-list/abstract-statement-maintenance-list.component';
import { AbstractStatementMaintenanceEditComponent } from './abstract-statement-maintenance-edit/abstract-statement-maintenance-edit.component';
import { AbstractStatementMaintenanceNewComponent } from './abstract-statement-maintenance-new/abstract-statement-maintenance-new.component';
import { AbstractStatementMaintenanceViewComponent } from './abstract-statement-maintenance-view/abstract-statement-maintenance-view.component';
import { AbstractStatementMaintenanceRoutingModule } from './abstract-statement-maintenance.routing.module';
import { AbstractStatementMaintenanceService } from './shared/abstract-statement-maintenance.service';
import { AbstractStatementMaintenanceGuard } from './shared/abstract-statement-maintenance.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AbstractStatementMaintenanceListComponent,
    AbstractStatementMaintenanceNewComponent,
    AbstractStatementMaintenanceEditComponent,
    AbstractStatementMaintenanceViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AbstractStatementMaintenanceRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AbstractStatementMaintenanceService,
    AbstractStatementMaintenanceGuard
  ],
  entryComponents: [
    AbstractStatementMaintenanceNewComponent,
    AbstractStatementMaintenanceEditComponent,
    AbstractStatementMaintenanceViewComponent
  ]
})

export class AbstractStatementMaintenanceModule {
}
