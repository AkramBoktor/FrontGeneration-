import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DraftAnnualPlanListComponent } from './draft-annual-plan-list/draft-annual-plan-list.component';
import { DraftAnnualPlanEditComponent } from './draft-annual-plan-edit/draft-annual-plan-edit.component';
import { DraftAnnualPlanNewComponent } from './draft-annual-plan-new/draft-annual-plan-new.component';
import { DraftAnnualPlanViewComponent } from './draft-annual-plan-view/draft-annual-plan-view.component';
import { DraftAnnualPlanRoutingModule } from './draft-annual-plan.routing.module';
import { DraftAnnualPlanService } from './shared/draft-annual-plan.service';
import { DraftAnnualPlanGuard } from './shared/draft-annual-plan.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DraftAnnualPlanListComponent,
    DraftAnnualPlanNewComponent,
    DraftAnnualPlanEditComponent,
    DraftAnnualPlanViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DraftAnnualPlanRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DraftAnnualPlanService,
    DraftAnnualPlanGuard
  ],
  entryComponents: [
    DraftAnnualPlanNewComponent,
    DraftAnnualPlanEditComponent,
    DraftAnnualPlanViewComponent
  ]
})

export class DraftAnnualPlanModule {
}
