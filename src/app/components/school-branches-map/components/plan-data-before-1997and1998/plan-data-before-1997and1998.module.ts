import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PlanDataBefore1997and1998ListComponent } from './plan-data-before-1997and1998-list/plan-data-before-1997and1998-list.component';
import { PlanDataBefore1997and1998EditComponent } from './plan-data-before-1997and1998-edit/plan-data-before-1997and1998-edit.component';
import { PlanDataBefore1997and1998NewComponent } from './plan-data-before-1997and1998-new/plan-data-before-1997and1998-new.component';
import { PlanDataBefore1997and1998ViewComponent } from './plan-data-before-1997and1998-view/plan-data-before-1997and1998-view.component';
import { PlanDataBefore1997and1998RoutingModule } from './plan-data-before-1997and1998.routing.module';
import { PlanDataBefore1997and1998Service } from './shared/plan-data-before-1997and1998.service';
import { PlanDataBefore1997and1998Guard } from './shared/plan-data-before-1997and1998.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PlanDataBefore1997and1998ListComponent,
    PlanDataBefore1997and1998NewComponent,
    PlanDataBefore1997and1998EditComponent,
    PlanDataBefore1997and1998ViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PlanDataBefore1997and1998RoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PlanDataBefore1997and1998Service,
    PlanDataBefore1997and1998Guard
  ],
  entryComponents: [
    PlanDataBefore1997and1998NewComponent,
    PlanDataBefore1997and1998EditComponent,
    PlanDataBefore1997and1998ViewComponent
  ]
})

export class PlanDataBefore1997and1998Module {
}
