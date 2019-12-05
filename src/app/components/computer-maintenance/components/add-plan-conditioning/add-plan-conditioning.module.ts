import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AddPlanConditioningListComponent } from './add-plan-conditioning-list/add-plan-conditioning-list.component';
import { AddPlanConditioningEditComponent } from './add-plan-conditioning-edit/add-plan-conditioning-edit.component';
import { AddPlanConditioningNewComponent } from './add-plan-conditioning-new/add-plan-conditioning-new.component';
import { AddPlanConditioningViewComponent } from './add-plan-conditioning-view/add-plan-conditioning-view.component';
import { AddPlanConditioningRoutingModule } from './add-plan-conditioning.routing.module';
import { AddPlanConditioningService } from './shared/add-plan-conditioning.service';
import { AddPlanConditioningGuard } from './shared/add-plan-conditioning.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AddPlanConditioningListComponent,
    AddPlanConditioningNewComponent,
    AddPlanConditioningEditComponent,
    AddPlanConditioningViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AddPlanConditioningRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AddPlanConditioningService,
    AddPlanConditioningGuard
  ],
  entryComponents: [
    AddPlanConditioningNewComponent,
    AddPlanConditioningEditComponent,
    AddPlanConditioningViewComponent
  ]
})

export class AddPlanConditioningModule {
}
