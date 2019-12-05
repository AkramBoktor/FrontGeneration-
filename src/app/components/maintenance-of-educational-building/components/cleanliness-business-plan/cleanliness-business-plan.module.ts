import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CleanlinessBusinessPlanListComponent } from './cleanliness-business-plan-list/cleanliness-business-plan-list.component';
import { CleanlinessBusinessPlanEditComponent } from './cleanliness-business-plan-edit/cleanliness-business-plan-edit.component';
import { CleanlinessBusinessPlanNewComponent } from './cleanliness-business-plan-new/cleanliness-business-plan-new.component';
import { CleanlinessBusinessPlanViewComponent } from './cleanliness-business-plan-view/cleanliness-business-plan-view.component';
import { CleanlinessBusinessPlanRoutingModule } from './cleanliness-business-plan.routing.module';
import { CleanlinessBusinessPlanService } from './shared/cleanliness-business-plan.service';
import { CleanlinessBusinessPlanGuard } from './shared/cleanliness-business-plan.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CleanlinessBusinessPlanListComponent,
    CleanlinessBusinessPlanNewComponent,
    CleanlinessBusinessPlanEditComponent,
    CleanlinessBusinessPlanViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CleanlinessBusinessPlanRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CleanlinessBusinessPlanService,
    CleanlinessBusinessPlanGuard
  ],
  entryComponents: [
    CleanlinessBusinessPlanNewComponent,
    CleanlinessBusinessPlanEditComponent,
    CleanlinessBusinessPlanViewComponent
  ]
})

export class CleanlinessBusinessPlanModule {
}
