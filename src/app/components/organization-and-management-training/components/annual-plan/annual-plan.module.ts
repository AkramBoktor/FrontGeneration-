import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AnnualPlanListComponent } from './annual-plan-list/annual-plan-list.component';
import { AnnualPlanEditComponent } from './annual-plan-edit/annual-plan-edit.component';
import { AnnualPlanNewComponent } from './annual-plan-new/annual-plan-new.component';
import { AnnualPlanViewComponent } from './annual-plan-view/annual-plan-view.component';
import { AnnualPlanRoutingModule } from './annual-plan.routing.module';
import { AnnualPlanService } from './shared/annual-plan.service';
import { AnnualPlanGuard } from './shared/annual-plan.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AnnualPlanListComponent,
    AnnualPlanNewComponent,
    AnnualPlanEditComponent,
    AnnualPlanViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AnnualPlanRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AnnualPlanService,
    AnnualPlanGuard
  ],
  entryComponents: [
    AnnualPlanNewComponent,
    AnnualPlanEditComponent,
    AnnualPlanViewComponent
  ]
})

export class AnnualPlanModule {
}
