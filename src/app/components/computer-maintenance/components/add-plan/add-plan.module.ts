import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AddPlanListComponent } from './add-plan-list/add-plan-list.component';
import { AddPlanEditComponent } from './add-plan-edit/add-plan-edit.component';
import { AddPlanNewComponent } from './add-plan-new/add-plan-new.component';
import { AddPlanViewComponent } from './add-plan-view/add-plan-view.component';
import { AddPlanRoutingModule } from './add-plan.routing.module';
import { AddPlanService } from './shared/add-plan.service';
import { AddPlanGuard } from './shared/add-plan.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AddPlanListComponent,
    AddPlanNewComponent,
    AddPlanEditComponent,
    AddPlanViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AddPlanRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AddPlanService,
    AddPlanGuard
  ],
  entryComponents: [
    AddPlanNewComponent,
    AddPlanEditComponent,
    AddPlanViewComponent
  ]
})

export class AddPlanModule {
}
