import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DraftFiveYearPlanListComponent } from './draft-five-year-plan-list/draft-five-year-plan-list.component';
import { DraftFiveYearPlanEditComponent } from './draft-five-year-plan-edit/draft-five-year-plan-edit.component';
import { DraftFiveYearPlanNewComponent } from './draft-five-year-plan-new/draft-five-year-plan-new.component';
import { DraftFiveYearPlanViewComponent } from './draft-five-year-plan-view/draft-five-year-plan-view.component';
import { DraftFiveYearPlanRoutingModule } from './draft-five-year-plan.routing.module';
import { DraftFiveYearPlanService } from './shared/draft-five-year-plan.service';
import { DraftFiveYearPlanGuard } from './shared/draft-five-year-plan.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DraftFiveYearPlanListComponent,
    DraftFiveYearPlanNewComponent,
    DraftFiveYearPlanEditComponent,
    DraftFiveYearPlanViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DraftFiveYearPlanRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DraftFiveYearPlanService,
    DraftFiveYearPlanGuard
  ],
  entryComponents: [
    DraftFiveYearPlanNewComponent,
    DraftFiveYearPlanEditComponent,
    DraftFiveYearPlanViewComponent
  ]
})

export class DraftFiveYearPlanModule {
}
