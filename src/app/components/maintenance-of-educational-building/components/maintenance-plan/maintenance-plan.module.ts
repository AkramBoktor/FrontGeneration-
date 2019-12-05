import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { MaintenancePlanListComponent } from './maintenance-plan-list/maintenance-plan-list.component';
import { MaintenancePlanEditComponent } from './maintenance-plan-edit/maintenance-plan-edit.component';
import { MaintenancePlanNewComponent } from './maintenance-plan-new/maintenance-plan-new.component';
import { MaintenancePlanViewComponent } from './maintenance-plan-view/maintenance-plan-view.component';
import { MaintenancePlanRoutingModule } from './maintenance-plan.routing.module';
import { MaintenancePlanService } from './shared/maintenance-plan.service';
import { MaintenancePlanGuard } from './shared/maintenance-plan.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    MaintenancePlanListComponent,
    MaintenancePlanNewComponent,
    MaintenancePlanEditComponent,
    MaintenancePlanViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    MaintenancePlanRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    MaintenancePlanService,
    MaintenancePlanGuard
  ],
  entryComponents: [
    MaintenancePlanNewComponent,
    MaintenancePlanEditComponent,
    MaintenancePlanViewComponent
  ]
})

export class MaintenancePlanModule {
}
