import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { OldPlansBefore97ListComponent } from './old-plans-before-97-list/old-plans-before-97-list.component';
import { OldPlansBefore97EditComponent } from './old-plans-before-97-edit/old-plans-before-97-edit.component';
import { OldPlansBefore97NewComponent } from './old-plans-before-97-new/old-plans-before-97-new.component';
import { OldPlansBefore97ViewComponent } from './old-plans-before-97-view/old-plans-before-97-view.component';
import { OldPlansBefore97RoutingModule } from './old-plans-before-97.routing.module';
import { OldPlansBefore97Service } from './shared/old-plans-before-97.service';
import { OldPlansBefore97Guard } from './shared/old-plans-before-97.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    OldPlansBefore97ListComponent,
    OldPlansBefore97NewComponent,
    OldPlansBefore97EditComponent,
    OldPlansBefore97ViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    OldPlansBefore97RoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    OldPlansBefore97Service,
    OldPlansBefore97Guard
  ],
  entryComponents: [
    OldPlansBefore97NewComponent,
    OldPlansBefore97EditComponent,
    OldPlansBefore97ViewComponent
  ]
})

export class OldPlansBefore97Module {
}
