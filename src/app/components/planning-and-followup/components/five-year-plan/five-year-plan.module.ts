import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { FiveYearPlanListComponent } from './five-year-plan-list/five-year-plan-list.component';
import { FiveYearPlanEditComponent } from './five-year-plan-edit/five-year-plan-edit.component';
import { FiveYearPlanNewComponent } from './five-year-plan-new/five-year-plan-new.component';
import { FiveYearPlanViewComponent } from './five-year-plan-view/five-year-plan-view.component';
import { FiveYearPlanRoutingModule } from './five-year-plan.routing.module';
import { FiveYearPlanService } from './shared/five-year-plan.service';
import { FiveYearPlanGuard } from './shared/five-year-plan.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    FiveYearPlanListComponent,
    FiveYearPlanNewComponent,
    FiveYearPlanEditComponent,
    FiveYearPlanViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    FiveYearPlanRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    FiveYearPlanService,
    FiveYearPlanGuard
  ],
  entryComponents: [
    FiveYearPlanNewComponent,
    FiveYearPlanEditComponent,
    FiveYearPlanViewComponent
  ]
})

export class FiveYearPlanModule {
}
