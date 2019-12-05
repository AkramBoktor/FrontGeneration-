import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CancelFromTheMaintenancePlanListComponent } from './cancel-from-the-maintenance-plan-list/cancel-from-the-maintenance-plan-list.component';
import { CancelFromTheMaintenancePlanEditComponent } from './cancel-from-the-maintenance-plan-edit/cancel-from-the-maintenance-plan-edit.component';
import { CancelFromTheMaintenancePlanNewComponent } from './cancel-from-the-maintenance-plan-new/cancel-from-the-maintenance-plan-new.component';
import { CancelFromTheMaintenancePlanViewComponent } from './cancel-from-the-maintenance-plan-view/cancel-from-the-maintenance-plan-view.component';
import { CancelFromTheMaintenancePlanRoutingModule } from './cancel-from-the-maintenance-plan.routing.module';
import { CancelFromTheMaintenancePlanService } from './shared/cancel-from-the-maintenance-plan.service';
import { CancelFromTheMaintenancePlanGuard } from './shared/cancel-from-the-maintenance-plan.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CancelFromTheMaintenancePlanListComponent,
    CancelFromTheMaintenancePlanNewComponent,
    CancelFromTheMaintenancePlanEditComponent,
    CancelFromTheMaintenancePlanViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CancelFromTheMaintenancePlanRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CancelFromTheMaintenancePlanService,
    CancelFromTheMaintenancePlanGuard
  ],
  entryComponents: [
    CancelFromTheMaintenancePlanNewComponent,
    CancelFromTheMaintenancePlanEditComponent,
    CancelFromTheMaintenancePlanViewComponent
  ]
})

export class CancelFromTheMaintenancePlanModule {
}
