import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AnnualPlan2ListComponent } from './annual-plan-2-list/annual-plan-2-list.component';
import { AnnualPlan2EditComponent } from './annual-plan-2-edit/annual-plan-2-edit.component';
import { AnnualPlan2NewComponent } from './annual-plan-2-new/annual-plan-2-new.component';
import { AnnualPlan2ViewComponent } from './annual-plan-2-view/annual-plan-2-view.component';
import { AnnualPlan2RoutingModule } from './annual-plan-2.routing.module';
import { AnnualPlan2Service } from './shared/annual-plan-2.service';
import { AnnualPlan2Guard } from './shared/annual-plan-2.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AnnualPlan2ListComponent,
    AnnualPlan2NewComponent,
    AnnualPlan2EditComponent,
    AnnualPlan2ViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AnnualPlan2RoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AnnualPlan2Service,
    AnnualPlan2Guard
  ],
  entryComponents: [
    AnnualPlan2NewComponent,
    AnnualPlan2EditComponent,
    AnnualPlan2ViewComponent
  ]
})

export class AnnualPlan2Module {
}
