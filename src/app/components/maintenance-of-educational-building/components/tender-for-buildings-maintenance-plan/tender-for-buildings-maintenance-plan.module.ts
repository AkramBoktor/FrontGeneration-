import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TenderForBuildingsMaintenancePlanListComponent } from './tender-for-buildings-maintenance-plan-list/tender-for-buildings-maintenance-plan-list.component';
import { TenderForBuildingsMaintenancePlanEditComponent } from './tender-for-buildings-maintenance-plan-edit/tender-for-buildings-maintenance-plan-edit.component';
import { TenderForBuildingsMaintenancePlanNewComponent } from './tender-for-buildings-maintenance-plan-new/tender-for-buildings-maintenance-plan-new.component';
import { TenderForBuildingsMaintenancePlanViewComponent } from './tender-for-buildings-maintenance-plan-view/tender-for-buildings-maintenance-plan-view.component';
import { TenderForBuildingsMaintenancePlanRoutingModule } from './tender-for-buildings-maintenance-plan.routing.module';
import { TenderForBuildingsMaintenancePlanService } from './shared/tender-for-buildings-maintenance-plan.service';
import { TenderForBuildingsMaintenancePlanGuard } from './shared/tender-for-buildings-maintenance-plan.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TenderForBuildingsMaintenancePlanListComponent,
    TenderForBuildingsMaintenancePlanNewComponent,
    TenderForBuildingsMaintenancePlanEditComponent,
    TenderForBuildingsMaintenancePlanViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TenderForBuildingsMaintenancePlanRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TenderForBuildingsMaintenancePlanService,
    TenderForBuildingsMaintenancePlanGuard
  ],
  entryComponents: [
    TenderForBuildingsMaintenancePlanNewComponent,
    TenderForBuildingsMaintenancePlanEditComponent,
    TenderForBuildingsMaintenancePlanViewComponent
  ]
})

export class TenderForBuildingsMaintenancePlanModule {
}
